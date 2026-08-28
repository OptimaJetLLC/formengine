#!/usr/bin/env node
/**
 * Captures behavior/form-level-actions screenshots:
 * 1. Arrow to Settings → Actions → Add a code action
 * 2. Code editor after clicking Add a code action
 * 3. Arrow to Settings → Form validator → Edit code
 * 4. Code editor after clicking Edit code
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {
  annotateArrow,
  annotateHighlight,
  visibleArrowToBox,
} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];

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
 */
async function gotoEmptyForm(page, theme) {
  await page.goto(emptyFormUrl(), {waitUntil: 'domcontentloaded', timeout: 60_000});
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

/** @param {import('playwright').Page} page */
async function closeBottomPanel(page) {
  const closeButton = page.getByRole('button', {name: 'Close'});
  if (await closeButton.isVisible().catch(() => false)) {
    await closeButton.click();
    await page.waitForTimeout(300);
  }
}

/** @param {import('playwright').Page} page */
async function openSettings(page) {
  await clickLeftTab(page, 'Settings');
  await page.getByRole('button', {name: 'Add a code action'}).waitFor({state: 'visible', timeout: 10_000});
  await page.waitForTimeout(300);
}

/** @param {import('playwright').Page} page */
function formValidatorEditButton(page) {
  return page
    .locator('h6')
    .filter({hasText: 'Form validator'})
    .locator('xpath=..')
    .getByRole('button', {name: 'Edit code'});
}

/**
 * @param {string} plainPath
 * @param {string} outputBasename
 * @param {'light' | 'dark'} theme
 * @param {{ x: number, y: number, width: number, height: number }} box
 * @param {string} label
 */
function highlightEditor(plainPath, outputBasename, theme, box, label) {
  annotateHighlight(plainPath, path.join(assetsRoot, 'behavior', `${outputBasename}.${theme}.png`), {
    label,
    rect: [
      Math.round(box.x - 8),
      Math.round(box.y - 40),
      Math.round(box.width + 16),
      Math.round(box.height + 48),
    ],
    color: '#F59E0B',
    showLabel: false,
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureAddCodeActionArrow(page, theme) {
  await gotoEmptyForm(page, theme);
  await closeBottomPanel(page);
  await openSettings(page);

  const addButton = page.getByRole('button', {name: 'Add a code action'});
  await addButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  const plainPath = await shot(page, 'behavior', 'add-form-code-action-plain', theme);
  const box = await measureLocator(addButton);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'behavior', `highlight-add-form-code-action.${theme}.png`),
    visibleArrowToBox(box),
  );
  console.log(`add-form-code-action ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormActionCodeEditor(page, theme) {
  await gotoEmptyForm(page, theme);
  await closeBottomPanel(page);
  await openSettings(page);

  await page.getByRole('button', {name: 'Add a code action'}).click({force: true});
  await page.waitForSelector('.monaco-editor', {timeout: 15_000});
  await page.waitForTimeout(600);

  const plainPath = await shot(page, 'behavior', 'form-action-code-editor-plain', theme);
  const editorBox = await measureLocator(page.locator('.monaco-editor').first());
  highlightEditor(plainPath, 'highlight-form-action-code-editor', theme, editorBox, 'Code editor');
  console.log(`form-action-code-editor ${theme}`);
  await closeBottomPanel(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormValidatorEditArrow(page, theme) {
  await gotoEmptyForm(page, theme);
  await closeBottomPanel(page);
  await openSettings(page);

  const editButton = formValidatorEditButton(page);
  await editButton.scrollIntoViewIfNeeded();
  await page.waitForTimeout(200);

  const plainPath = await shot(page, 'behavior', 'form-validator-edit-plain', theme);
  const box = await measureLocator(editButton);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'behavior', `highlight-form-validator-edit.${theme}.png`),
    visibleArrowToBox(box),
  );
  console.log(`form-validator-edit ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormValidatorCodeEditor(page, theme) {
  await gotoEmptyForm(page, theme);
  await closeBottomPanel(page);
  await openSettings(page);

  await formValidatorEditButton(page).click({force: true});
  await page.waitForSelector('.monaco-editor', {timeout: 15_000});
  await page.getByText('Edit form validation code', {exact: true}).waitFor({state: 'visible', timeout: 5_000});
  await page.waitForTimeout(600);

  const plainPath = await shot(page, 'behavior', 'form-validator-code-editor-plain', theme);
  const editorBox = await measureLocator(page.locator('.monaco-editor').first());
  highlightEditor(plainPath, 'highlight-form-validator-code-editor', theme, editorBox, 'Code editor');
  console.log(`form-validator-code-editor ${theme}`);
  await closeBottomPanel(page);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureAddCodeActionArrow(page, theme);
    await captureFormActionCodeEditor(page, theme);
    await captureFormValidatorEditArrow(page, theme);
    await captureFormValidatorCodeEditor(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
