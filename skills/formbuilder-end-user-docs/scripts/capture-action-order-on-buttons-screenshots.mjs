#!/usr/bin/env node
/**
 * Captures behavior/action-order-on-buttons screenshots:
 * 1. onClick with validate highlighted
 * 2. onClick with validate + clear (reorderable list) highlighted
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
const VALIDATE_FORM = 'action-order-validate.json';
const REORDER_FORM = 'action-order-reorder.json';

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
 * @param {string} formFile
 */
async function gotoForm(page, theme, formFile) {
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
async function captureValidateAction(page, theme) {
  await gotoForm(page, theme, VALIDATE_FORM);
  await selectTreeItem(page, 'save');
  await clickRightTab(page, 'Actions');

  const validateItem = page.getByTestId('bound-action-onClick-common-validate');
  await validateItem.waitFor({state: 'visible', timeout: 10_000});
  await validateItem.getByRole('button', {name: 'Arguments'}).click();
  await validateItem.getByText('failOnError', {exact: true}).waitFor({state: 'visible', timeout: 10_000});
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'behavior', 'action-order-validate-plain', theme);
  const box = await measureLocator(validateItem);
  highlightBox(plainPath, 'highlight-action-order-validate', theme, box, 'validate');
  console.log(`action-order-validate ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureReorderActions(page, theme) {
  await gotoForm(page, theme, REORDER_FORM);
  await selectTreeItem(page, 'save');
  await clickRightTab(page, 'Actions');

  const validateItem = page.getByTestId('bound-action-onClick-common-validate');
  const clearItem = page.getByTestId('bound-action-onClick-common-clear');
  await validateItem.waitFor({state: 'visible', timeout: 10_000});
  await clearItem.waitFor({state: 'visible', timeout: 10_000});
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'behavior', 'action-order-reorder-plain', theme);
  const validateBox = await measureLocator(validateItem);
  const clearBox = await measureLocator(clearItem);
  highlightBox(plainPath, 'highlight-action-order-reorder', theme, unionBoxes(validateBox, clearBox), 'Actions');
  console.log(`action-order-reorder ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureValidateAction(page, theme);
    await captureReorderActions(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
