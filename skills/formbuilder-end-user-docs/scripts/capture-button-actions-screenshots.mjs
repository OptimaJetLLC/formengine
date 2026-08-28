#!/usr/bin/env node
/**
 * Captures first-form/button-actions screenshots:
 * 1. Empty form + Components search "Button"
 * 2. Button Actions with onClick code action + alert in editor
 * 3. Preview after click with alert dialog visible
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateZones} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];
const ALERT_FORM = 'button-alert-action.json';

/** @param {string} formFile @param {string} [view] */
function formUrl(formFile, view = 'mui') {
  const name = formFile.replace(/\.json$/i, '');
  const jsonText = readFileSync(path.join(formsRoot, `${name}.json`), 'utf8');
  const body = Buffer.from(JSON.stringify(JSON.parse(jsonText)), 'utf8').toString('base64url');
  const url = new URL(BUILDER_URL);
  url.searchParams.set('formBody', body);
  url.searchParams.set('formName', name);
  url.searchParams.set('view', view);
  return url.toString();
}

function emptyFormUrl(view = 'mui') {
  const url = new URL(BUILDER_URL);
  url.searchParams.set('form', 'empty');
  url.searchParams.set('view', view);
  return url.toString();
}

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove()).catch(() => {});
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} url
 */
async function gotoThemeUrl(page, theme, url) {
  await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(700);
}

/** @param {import('playwright').Page} page @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = path.join(assetsRoot, section);
  await mkdir(dir, {recursive: true});
  const filePath = path.join(dir, `${basename}.${theme}.png`);
  await page.screenshot({path: filePath, fullPage: false});
  return filePath;
}

/** @param {import('playwright').Locator} locator */
async function measureLocator(locator) {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element not found for measurement');
  }
  return box;
}

/**
 * @param {{ x: number, y: number, width: number, height: number }} a
 * @param {{ x: number, y: number, width: number, height: number }} b
 */
function unionBoxes(a, b) {
  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);
  const right = Math.max(a.x + a.width, b.x + b.width);
  const bottom = Math.max(a.y + a.height, b.y + b.height);
  return {x: left, y: top, width: right - left, height: bottom - top};
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickLeftTab(page, name) {
  await dismissViteOverlay(page);
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(300);
}

/** @param {import('playwright').Page} page @param {string} testId */
async function selectTreeItem(page, testId) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId(testId).first().click({force: true});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickRightTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(300);
}

/** @param {import('playwright').Page} page */
async function closeBottomPanel(page) {
  const closeButton = page.getByRole('button', {name: 'Close'});
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
    await page.waitForTimeout(300);
  }
}

/**
 * Native alert() is not in page screenshots - render a visible dialog instead.
 * @param {import('playwright').Page} page
 */
async function installVisibleAlert(page) {
  await page.evaluate(() => {
    window.alert = (message) => {
      let host = document.getElementById('fe-guide-alert');
      if (!host) {
        host = document.createElement('div');
        host.id = 'fe-guide-alert';
        host.setAttribute('role', 'alertdialog');
        host.style.cssText = [
          'position:fixed',
          'inset:0',
          'z-index:2147483647',
          'display:flex',
          'align-items:center',
          'justify-content:center',
          'background:rgba(15,23,42,0.45)',
          'font-family:system-ui,-apple-system,sans-serif',
        ].join(';');
        host.innerHTML = `
          <div style="min-width:320px;max-width:420px;background:#fff;border-radius:8px;box-shadow:0 12px 40px rgba(0,0,0,.25);overflow:hidden">
            <div style="padding:16px 18px 8px;font-size:14px;font-weight:600;color:#0f172a">localhost:5173 says</div>
            <div data-alert-message style="padding:4px 18px 16px;font-size:14px;color:#334155;white-space:pre-wrap"></div>
            <div style="display:flex;justify-content:flex-end;padding:0 12px 12px">
              <button type="button" style="min-width:72px;padding:6px 14px;border:0;border-radius:6px;background:#2563eb;color:#fff;font-size:13px;cursor:pointer">OK</button>
            </div>
          </div>`;
        host.querySelector('button')?.addEventListener('click', () => {
          host.style.display = 'none';
        });
        document.body.appendChild(host);
      }
      const msg = host.querySelector('[data-alert-message]');
      if (msg) {
        msg.textContent = String(message);
      }
      host.style.display = 'flex';
    };
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureButtonPalette(page, theme) {
  await gotoThemeUrl(page, theme, emptyFormUrl());
  await clickLeftTab(page, 'Components');
  const search = page.getByPlaceholder('Search');
  await search.fill('Button');
  await page.waitForTimeout(500);
  const buttonItem = page.getByTestId('MuiButton-palette-component').first();
  await buttonItem.waitFor({state: 'visible', timeout: 10_000});
  await page.mouse.move(700, 400);
  await page.waitForTimeout(200);

  const plainPath = await shot(page, 'first-form', 'components-search-button-plain', theme);
  const searchBox = await measureLocator(search);
  const buttonBox = await measureLocator(buttonItem);

  annotateZones(plainPath, path.join(assetsRoot, 'first-form', `highlight-components-search-button.${theme}.png`), [
    {
      id: 1,
      label: 'Search',
      rect: [
        Math.round(searchBox.x - 4),
        Math.round(searchBox.y - 4),
        Math.round(searchBox.width + 8),
        Math.round(searchBox.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Button',
      rect: [
        Math.round(buttonBox.x - 4),
        Math.round(buttonBox.y - 4),
        Math.round(buttonBox.width + 8),
        Math.round(buttonBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ]);
  console.log(`button-palette ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureConfigureActions(page, theme) {
  await gotoThemeUrl(page, theme, formUrl(ALERT_FORM));
  await closeBottomPanel(page);
  await selectTreeItem(page, 'save');
  await clickRightTab(page, 'Actions');

  const editAction = page.getByTestId('edit-action-onClick-code-showAlert');
  await editAction.waitFor({state: 'visible', timeout: 10_000});
  await editAction.click({force: true});
  await page.waitForSelector('.monaco-editor', {timeout: 15_000});
  await page.waitForTimeout(600);

  const editor = page.locator('.monaco-editor').first();
  const editorLines = editor.locator('.view-lines');
  await editorLines.waitFor({state: 'visible', timeout: 10_000});
  const editorText = (await editorLines.innerText()).replaceAll('\u00a0', ' ');
  if (!editorText.includes("alert('Button clicked');")) {
    throw new Error('The showAlert action body is not visible in the code editor');
  }
  if ((editorText.match(/async\s+function\s+Action/g) ?? []).length !== 1) {
    throw new Error('The code editor contains a nested or missing Action function');
  }
  if (await editor.locator('.squiggly-error').count()) {
    throw new Error('The showAlert action contains a syntax error');
  }

  const plainPath = await shot(page, 'first-form', 'button-onclick-code-plain', theme);
  const onClickHeading = page.getByText('onClick', {exact: true}).first();
  const actionChip = page.getByText('showAlert', {exact: true}).first();
  const headingBox = await measureLocator(onClickHeading);
  const actionBox = await measureLocator(actionChip);
  const editorBox = await measureLocator(editor);
  const actionBlock = unionBoxes(headingBox, actionBox);

  annotateZones(plainPath, path.join(assetsRoot, 'first-form', `highlight-button-onclick-code.${theme}.png`), [
    {
      id: 1,
      label: 'onClick',
      rect: [
        Math.round(actionBlock.x - 8),
        Math.round(actionBlock.y - 8),
        Math.round(Math.max(actionBlock.width, 240) + 16),
        Math.round(actionBlock.height + 16),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Code editor',
      rect: [
        Math.round(editorBox.x - 8),
        Math.round(editorBox.y - 40),
        Math.round(editorBox.width + 16),
        Math.round(editorBox.height + 48),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ]);
  console.log(`button-onclick-code ${theme}`);
  await closeBottomPanel(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePreviewAlert(page, theme) {
  await gotoThemeUrl(page, theme, formUrl(ALERT_FORM));
  await closeBottomPanel(page);
  await installVisibleAlert(page);

  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(900);

  // In Preview, click the Save form button (not the designer chrome).
  const saveButton = page.locator('[data-testid="viewer-wrapper"] button', {hasText: 'Save'}).first();
  await saveButton.waitFor({state: 'visible', timeout: 10_000});
  await saveButton.click({force: true});
  await page.waitForSelector('#fe-guide-alert', {state: 'visible', timeout: 5_000});
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'first-form', 'button-preview-alert-plain', theme);
  const alertBox = await measureLocator(page.locator('#fe-guide-alert > div').first());
  annotateZones(plainPath, path.join(assetsRoot, 'first-form', `highlight-button-preview-alert.${theme}.png`), [
    {
      id: 1,
      label: 'Alert',
      rect: [
        Math.round(alertBox.x - 8),
        Math.round(alertBox.y - 8),
        Math.round(alertBox.width + 16),
        Math.round(alertBox.height + 16),
      ],
      color: '#EF4444',
      showBadge: false,
    },
  ]);
  console.log(`button-preview-alert ${theme}`);

  // Return to Edit for the next theme cycle.
  const editButton = page.getByRole('button', {name: 'Edit'});
  if (await editButton.isVisible().catch(() => false)) {
    await editButton.click({force: true});
    await page.waitForTimeout(500);
  }
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureButtonPalette(page, theme);
    await captureConfigureActions(page, theme);
    await capturePreviewAlert(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
