#!/usr/bin/env node
/**
 * Captures workspace/json-form-view screenshots:
 * 1. Arrow to the header </> JSON button
 * 2. Open Edit JSON modal with arrow to the close button
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateArrow, visibleArrowToBox} from './measure-workspace-layout.mjs';

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

/**
 * Header button group for device modes + JSON (right of Preview).
 * @param {import('playwright').Page} page
 */
function viewModesGroup(page) {
  return page.locator('.rs-btn-group').filter({has: page.locator('button.rs-btn-icon')}).last();
}

/**
 * The </> JSON control is the last button in the view-modes group.
 * @param {import('playwright').Page} page
 */
function jsonViewButton(page) {
  return viewModesGroup(page).locator('button').last();
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureOpenJsonArrow(page, theme) {
  await gotoForm(page, theme);
  await page.getByTestId('Components_Tab').click({force: true});
  await page.waitForTimeout(300);

  const button = jsonViewButton(page);
  await button.waitFor({state: 'visible', timeout: 10_000});
  const plainPath = await shot(page, 'workspace', 'json-view-open-plain', theme);
  const box = await measureLocator(button);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'workspace', `highlight-json-view-open.${theme}.png`),
    visibleArrowToBox(box),
  );
  console.log(`json-view-open ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCloseJsonArrow(page, theme) {
  await gotoForm(page, theme);
  await page.getByTestId('Components_Tab').click({force: true});
  await page.waitForTimeout(300);

  await jsonViewButton(page).click({force: true});
  await page.getByRole('heading', {name: 'Edit JSON'}).waitFor({state: 'visible', timeout: 10_000});
  const closeButton = page.locator('.rs-modal-header-close');
  await closeButton.waitFor({state: 'visible', timeout: 5_000});
  // Dismiss lingering tooltip so it does not cover the close control.
  await page.mouse.move(700, 400);
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'workspace', 'json-view-close-plain', theme);
  const box = await measureLocator(closeButton);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'workspace', `highlight-json-view-close.${theme}.png`),
    visibleArrowToBox(box),
  );
  console.log(`json-view-close ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureOpenJsonArrow(page, theme);
    await captureCloseJsonArrow(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
