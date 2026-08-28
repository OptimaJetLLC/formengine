#!/usr/bin/env node
/**
 * Captures behavior/events-and-actions-concept screenshots:
 * 1. onClick Add an action popover (actions menu)
 * 2. Common submenu open
 * 3. Code submenu open
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateHighlight} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];
const FORM_FILE = 'add-fields-with-button.json';
const CODE_FORM_FILE = 'button-alert-action.json';

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
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} [formFile]
 */
async function gotoForm(page, theme, formFile = FORM_FILE) {
  await page.goto(formUrl(formFile), {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(700);
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

/**
 * Opens Actions → onClick → Add an action popover.
 * @param {import('playwright').Page} page
 */
async function openOnClickActionsMenu(page) {
  await selectTreeItem(page, 'save');
  await clickRightTab(page, 'Actions');
  await page.getByTestId('onClick-add-button').click({force: true});
  await page.waitForTimeout(400);
  const popover = page.locator('.rs-popover.rs-popover-full').last();
  await popover.waitFor({state: 'visible', timeout: 5_000});
  return popover;
}

/**
 * @param {string} plainPath
 * @param {string} outputBasename
 * @param {'light' | 'dark'} theme
 * @param {{ x: number, y: number, width: number, height: number }} box
 * @param {string} label
 */
function highlightBox(plainPath, outputBasename, theme, box, label) {
  annotateHighlight(plainPath, path.join(assetsRoot, 'behavior', `${outputBasename}.${theme}.png`), {
    label,
    rect: [
      Math.round(box.x - 4),
      Math.round(box.y - 4),
      Math.round(box.width + 8),
      Math.round(box.height + 8),
    ],
    color: '#F59E0B',
    showLabel: false,
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureOnClickActionsMenu(page, theme) {
  await gotoForm(page, theme);
  const popover = await openOnClickActionsMenu(page);
  const plainPath = await shot(page, 'behavior', 'onclick-actions-menu-plain', theme);
  const box = await measureLocator(popover);
  highlightBox(plainPath, 'highlight-onclick-actions-menu', theme, box, 'Actions menu');
  console.log(`onclick-actions-menu ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCommonActionsSubmenu(page, theme) {
  await gotoForm(page, theme);
  const popover = await openOnClickActionsMenu(page);
  const commonToggle = popover.getByText('Common', {exact: true}).first();
  await commonToggle.hover();
  await page.waitForTimeout(400);

  const commonMenu = page.locator('.rs-dropdown-menu').filter({hasText: 'validate'}).filter({hasText: 'clear'}).last();
  await commonMenu.waitFor({state: 'visible', timeout: 5_000});

  const plainPath = await shot(page, 'behavior', 'common-actions-submenu-plain', theme);
  const toggleBox = await measureLocator(commonToggle);
  const menuBox = await measureLocator(commonMenu);
  highlightBox(plainPath, 'highlight-common-actions-submenu', theme, unionBoxes(toggleBox, menuBox), 'Common');
  console.log(`common-actions-submenu ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCodeActionsSubmenu(page, theme) {
  // Form with a registered code action so the Code submenu lists more than "Add".
  await gotoForm(page, theme, CODE_FORM_FILE);
  const popover = await openOnClickActionsMenu(page);
  const codeToggle = popover.getByText('Code', {exact: true}).first();
  await codeToggle.hover();
  await page.waitForTimeout(400);

  const codeMenu = page.getByTestId('dropdown-menu-code-actions');
  await codeMenu.waitFor({state: 'visible', timeout: 5_000});
  await page.getByText('showAlert', {exact: true}).first().waitFor({state: 'visible', timeout: 5_000});

  const plainPath = await shot(page, 'behavior', 'code-actions-submenu-plain', theme);
  const toggleBox = await measureLocator(codeToggle);
  const menuBox = await measureLocator(codeMenu);
  highlightBox(plainPath, 'highlight-code-actions-submenu', theme, unionBoxes(toggleBox, menuBox), 'Code');
  console.log(`code-actions-submenu ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureOnClickActionsMenu(page, theme);
    await captureCommonActionsSubmenu(page, theme);
    await captureCodeActionsSubmenu(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
