#!/usr/bin/env node
/**
 * Captures workspace/use-the-component-tree screenshots on Event registration:
 * 1. Tree tab open (default expand state)
 * 2. Expand all highlighted
 * 3. Email selected in Tree + canvas
 * 4. Phone dragged above Email (reorder result)
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateHighlight, annotateZones} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];
const FORM_FILE = 'event-registration.json';
const FIELD_KEY = 'email';

/** @param {string} formFile */
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

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove()).catch(() => {});
}

/**
 * Hides license / domain-restriction banners so captures match the published product chrome.
 * @param {import('playwright').Page} page
 */
async function dismissLicenseBanner(page) {
  await page
    .evaluate(() => {
      const nodes = document.querySelectorAll('[class*="Alert"], [role="alert"], [class*="license"], [class*="License"]');
      for (const node of nodes) {
        const text = node.textContent ?? '';
        if (/license|non-commercial/i.test(text)) {
          node.remove();
        }
      }
    })
    .catch(() => {});
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function gotoForm(page, theme) {
  await page.goto(formUrl(FORM_FILE), {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await dismissLicenseBanner(page);
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
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTheme(page, theme) {
  await gotoForm(page, theme);
  await page.getByTestId('Tree_Tab').click({force: true});
  await page.waitForTimeout(400);
  await dismissLicenseBanner(page);
  await page.mouse.move(40, 120);
  await page.waitForTimeout(300);

  await shot(page, 'workspace', 'tree-panel-plain', theme);
  console.log(`tree-panel ${theme}`);

  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);
  await page.getByTestId(FIELD_KEY).first().waitFor({state: 'visible', timeout: 5_000});
  await page.mouse.move(40, 120);
  await page.waitForTimeout(200);

  const expandAll = page.getByRole('button', {name: 'Expand all'});
  const expandPlain = await shot(page, 'workspace', 'tree-expand-all-plain', theme);
  const expandBox = await measureLocator(expandAll);
  annotateHighlight(expandPlain, path.join(assetsRoot, 'workspace', `highlight-tree-expand-all.${theme}.png`), {
    label: 'Expand all',
    rect: [
      Math.round(expandBox.x - 4),
      Math.round(expandBox.y - 4),
      Math.round(expandBox.width + 8),
      Math.round(expandBox.height + 8),
    ],
    color: '#F59E0B',
    showLabel: false,
  });
  console.log(`tree-expand-all ${theme}`);

  await page.getByTestId(FIELD_KEY).first().click({force: true});
  await page.waitForTimeout(400);
  await page.mouse.move(40, 120);
  await page.waitForTimeout(200);

  const treeRow = page.getByTestId(FIELD_KEY).first();
  const canvas = page.getByTestId(`${FIELD_KEY}-editable-wrapper`).first();
  await treeRow.waitFor({state: 'visible', timeout: 10_000});
  await canvas.waitFor({state: 'visible', timeout: 10_000});

  const selectPlain = await shot(page, 'workspace', 'tree-select-plain', theme);
  const treeBox = await measureLocator(treeRow);
  const canvasBox = await measureLocator(canvas);
  annotateZones(
    selectPlain,
    path.join(assetsRoot, 'workspace', `highlight-tree-select.${theme}.png`),
    [
      {
        id: 1,
        label: 'Tree',
        rect: [
          Math.round(treeBox.x - 4),
          Math.round(treeBox.y - 2),
          Math.round(treeBox.width + 200),
          Math.round(treeBox.height + 4),
        ],
        color: '#3B82F6',
        showBadge: false,
      },
      {
        id: 2,
        label: 'Canvas',
        rect: [
          Math.round(canvasBox.x - 6),
          Math.round(canvasBox.y - 6),
          Math.round(canvasBox.width + 12),
          Math.round(canvasBox.height + 12),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  );
  console.log(`tree-select ${theme}`);

  await page.getByTestId(FIELD_KEY).first().hover({force: true});
  await page.waitForTimeout(400);
  const treeToolbar = page.locator('.FE_Component_Toolbar.compact, .FE_Component_Toolbar').locator('visible=true').first();
  await treeToolbar.waitFor({state: 'visible', timeout: 5_000});
  const toolbarPlain = await shot(page, 'workspace', 'tree-toolbar-plain', theme);
  const toolbarBox = await measureLocator(treeToolbar);
  annotateHighlight(toolbarPlain, path.join(assetsRoot, 'workspace', `highlight-tree-toolbar.${theme}.png`), {
    label: 'Tree toolbar',
    rect: [
      Math.round(toolbarBox.x - 4),
      Math.round(toolbarBox.y - 4),
      Math.round(toolbarBox.width + 8),
      Math.round(toolbarBox.height + 8),
    ],
    color: '#8B5CF6',
    showLabel: false,
  });
  console.log(`tree-toolbar ${theme}`);

  await page.getByTestId('phone').first().dragTo(page.getByTestId('email').first(), {
    force: true,
    targetPosition: {x: 8, y: 8},
  });
  await page.waitForTimeout(900);
  const phoneBox = await measureLocator(page.getByTestId('phone').first());
  const emailBox = await measureLocator(page.getByTestId('email').first());
  if (phoneBox.y >= emailBox.y) {
    throw new Error(`Reorder failed: Phone y=${phoneBox.y} should be above Email y=${emailBox.y}`);
  }
  await page.getByTestId('screen1').first().click({force: true});
  await page.waitForTimeout(300);
  await page.mouse.move(40, 120);
  await page.waitForTimeout(300);

  await shot(page, 'workspace', 'tree-expanded-nested-plain', theme);
  console.log(`tree-expanded-nested ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureTheme(page, theme);
  }
  await browser.close();
  console.log('Done: workspace/use-the-component-tree screenshots');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
