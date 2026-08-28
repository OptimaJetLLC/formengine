#!/usr/bin/env node
/**
 * Captures calculated-fields-overview screenshots from the calculated Full name fixture.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateArrow, annotateHighlight, annotateZones, visibleArrowToBox} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];
const FORM_FILE = 'calculated-full-name.json';
const FIELD_TEST_ID = 'fullName';

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

/** @param {import('playwright').Page} page @param {string} name */
async function clickRightTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(300);
}

/**
 * Main tab with an arrow to the edit icon beside the calculated Full name Value.
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureValueEditIconArrow(page, theme) {
  await gotoForm(page, theme);
  await selectTreeItem(page, FIELD_TEST_ID);
  await clickRightTab(page, 'Main');

  const editButton = page.locator('[data-testid="value-labeled-wrapper"] button').first();
  await editButton.waitFor({state: 'visible', timeout: 10_000});
  await editButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'data-driven', 'value-edit-icon-plain', theme);
  const editBox = await measureLocator(editButton);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'data-driven', `highlight-value-edit-icon.${theme}.png`),
    visibleArrowToBox(editBox),
  );
  console.log(`value-edit-icon ${theme}`);
}

/**
 * Full name Value editor with the saved calculation visible.
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureComputedPropertyExample(page, theme) {
  await gotoForm(page, theme);
  await selectTreeItem(page, FIELD_TEST_ID);
  await clickRightTab(page, 'Main');

  const editButton = page.locator('[data-testid="value-labeled-wrapper"] button').first();
  await editButton.click({force: true});
  await page.waitForTimeout(600);

  const calculableValue = page.getByText('Calculable value', {exact: true});
  if (await calculableValue.isVisible()) {
    await calculableValue.click({force: true});
  }
  const editor = page.locator('.monaco-editor').first();
  await editor.waitFor({state: 'visible', timeout: 10_000});
  await page.waitForTimeout(500);

  const editorText = await editor.innerText();
  if (!editorText.includes('form.data.firstName') || !editorText.includes('form.data.lastName')) {
    throw new Error('The calculated Full name formula is not visible in the editor.');
  }

  const plainPath = await shot(page, 'data-driven', 'computed-property-example-plain', theme);
  const editBox = await measureLocator(editButton);
  const editorBox = await measureLocator(editor);
  annotateZones(
    plainPath,
    path.join(assetsRoot, 'data-driven', `highlight-computed-property-example.${theme}.png`),
    [
      {
        id: 1,
        label: 'Calculable value',
        rect: [
          Math.round(editBox.x - 4),
          Math.round(editBox.y - 4),
          Math.round(editBox.width + 8),
          Math.round(editBox.height + 8),
        ],
        color: '#3B82F6',
      },
      {
        id: 2,
        label: 'Formula editor',
        rect: [
          Math.round(editorBox.x - 8),
          Math.round(editorBox.y - 40),
          Math.round(editorBox.width + 16),
          Math.round(editorBox.height + 48),
        ],
        color: '#F59E0B',
      },
    ],
    {noZoneLabels: true},
  );
  console.log(`computed-property-example ${theme}`);
}

/**
 * Preview with source names filled and the read-only Full name calculated.
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCalculatedFullNamePreview(page, theme) {
  await gotoForm(page, theme);
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(600);

  await page.getByLabel('First name', {exact: true}).fill('Ada');
  await page.getByLabel('Last name', {exact: true}).fill('Lovelace');
  const fullName = page.getByLabel('Full name', {exact: true});
  await page.waitForTimeout(500);

  const value = await fullName.inputValue();
  if (value !== 'Ada Lovelace') {
    throw new Error(`Expected the calculated Full name to be "Ada Lovelace", received "${value}".`);
  }
  if (await fullName.isEditable()) {
    throw new Error('The calculated Full name field must be read-only.');
  }

  const plainPath = await shot(page, 'data-driven', 'calculated-full-name-preview-plain', theme);
  const fullNameBox = await measureLocator(fullName);
  annotateHighlight(
    plainPath,
    path.join(assetsRoot, 'data-driven', `highlight-calculated-full-name-preview.${theme}.png`),
    {
      rect: [
        Math.round(fullNameBox.x - 10),
        Math.round(fullNameBox.y - 16),
        Math.round(fullNameBox.width + 20),
        Math.round(fullNameBox.height + 32),
      ],
      label: 'Read-only calculated value',
      color: '#F59E0B',
    },
  );
  console.log(`calculated-full-name-preview ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureValueEditIconArrow(page, theme);
    await captureComputedPropertyExample(page, theme);
    await captureCalculatedFullNamePreview(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
