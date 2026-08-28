#!/usr/bin/env node
/**
 * Captures Language settings (form-wide) highlight for appearance/localization-for-authors.md.
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
const FORM_FILE = 'localization-authors.json';

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

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureLanguageSettingsBlock(page, theme) {
  await gotoForm(page, theme);
  await dismissViteOverlay(page);
  await page.getByTestId('Settings_Tab').click({force: true});
  await page.waitForTimeout(400);

  const heading = page.getByText('Language settings', {exact: true}).first();
  await heading.waitFor({state: 'visible', timeout: 10_000});
  await heading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const languagePicker = page.getByTestId('defaultLanguage-labeled-wrapper').first();
  await languagePicker.waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'appearance', 'language-settings-plain', theme);
  const headingBox = await measureLocator(heading);
  const pickerBox = await measureLocator(languagePicker);
  const block = unionBoxes(headingBox, pickerBox);

  annotateZones(plainPath, path.join(assetsRoot, 'appearance', `highlight-language-settings.${theme}.png`), [
    {
      id: 1,
      label: 'Language settings',
      rect: [
        Math.round(block.x - 8),
        Math.round(block.y - 8),
        Math.round(Math.max(block.width, 280) + 16),
        Math.round(block.height + 16),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ]);
  console.log(`language-settings ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureLanguageSettingsBlock(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
