#!/usr/bin/env node
/**
 * Captures fields-and-data/labels-and-help Step 1:
 * select Work email on Tree/canvas using labels-demo.
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
const FORM_FILE = 'labels-demo.json';
const FIELD_KEY = 'workEmail';

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

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSelectField(page, theme) {
  await gotoForm(page, theme);
  await selectTreeItem(page, FIELD_KEY);

  const treeRow = page.getByTestId(FIELD_KEY).first();
  await treeRow.waitFor({state: 'visible', timeout: 10_000});
  const canvas = page.getByTestId(`${FIELD_KEY}-editable-wrapper`).first();
  await canvas.waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'fields-and-data', 'labels-select-plain', theme);
  const treeBox = await measureLocator(treeRow);
  const canvasBox = await measureLocator(canvas);

  annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-labels-select.${theme}.png`), [
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
  ], {noZoneLabels: true});

  console.log(`labels-select ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureSelectField(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
