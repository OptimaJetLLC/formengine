#!/usr/bin/env node
/**
 * Captures FAQ screenshots for help/faq-for-form-authors.md:
 * 1. Preview mode (Edit button, Data/Validate) on Event registration
 * 2. Red arrow to the header Component library dropdown
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
async function capturePreviewMode(page, theme) {
  await gotoForm(page, theme);
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(900);
  await page.getByRole('button', {name: 'Edit'}).waitFor({state: 'visible', timeout: 10_000});
  await dismissLicenseBanner(page);
  await page.mouse.move(40, 120);
  await page.waitForTimeout(300);

  await shot(page, 'help', 'faq-preview-mode-plain', theme);
  console.log(`faq-preview-mode ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureComponentLibraryArrow(page, theme) {
  await gotoForm(page, theme);
  await page.getByTestId('Components_Tab').click({force: true});
  const librarySelect = page.locator('select[aria-label="Component library"]');
  await librarySelect.waitFor({state: 'visible', timeout: 10_000});
  await dismissLicenseBanner(page);
  await page.mouse.move(40, 120);
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'help', 'component-library-plain', theme);
  const box = await measureLocator(librarySelect);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'help', `highlight-component-library.${theme}.png`),
    visibleArrowToBox(box),
  );
  console.log(`highlight-component-library ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await capturePreviewMode(page, theme);
    await captureComponentLibraryArrow(page, theme);
  }
  await browser.close();
  console.log('Done: help/faq-for-form-authors screenshots');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
