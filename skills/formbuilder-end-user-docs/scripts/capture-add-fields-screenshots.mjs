#!/usr/bin/env node
/**
 * Captures progressive screenshots for first-form/add-fields.md.
 * Starts from an empty form and extends the layout step by step.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateHighlight, measureWorkspaceHighlights} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const BUILDER_VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name';
const BUILDER_THEME_KEY = process.env.BUILDER_THEME_KEY ?? 'example-mui-theme';
const DB_NAME = 'example-mui-db';
const STORE_NAME = 'example-store';
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
}

/** @param {import('playwright').Page} page */
async function prepareBuilder(page) {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate(
    ({viewKey, themeKey}) => {
      localStorage.setItem(viewKey, 'mui');
      localStorage.setItem(themeKey, 'light');
    },
    {viewKey: BUILDER_VIEW_KEY, themeKey: BUILDER_THEME_KEY},
  );
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function setBuilderTheme(page, theme) {
  await page.evaluate(
    ({themeKey, value}) => {
      localStorage.setItem(themeKey, value);
    },
    {themeKey: BUILDER_THEME_KEY, value: theme},
  );
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(600);
}

/** @param {import('playwright').Page} page @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = path.join(assetsRoot, section);
  await mkdir(dir, {recursive: true});
  const filePath = path.join(dir, `${basename}.${theme}.png`);
  await page.screenshot({path: filePath, fullPage: false});
  return filePath;
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickLeftTab(page, name) {
  await dismissViteOverlay(page);
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickRightTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {string} testId */
async function selectTreeItem(page, testId) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId(testId).first().click({force: true});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {string} formName @param {object} formJson */
async function saveFormToIndexedDB(page, formName, formJson) {
  const formValue = JSON.stringify(formJson);
  await page.evaluate(
    async ({dbName, storeName, name, value}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.close();
            reject(new Error(`Object store "${storeName}" not found`));
            return;
          }
          const tx = db.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).put(value, name);
          tx.oncomplete = () => {
            db.close();
            resolve(undefined);
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    {dbName: DB_NAME, storeName: STORE_NAME, name: formName, value: formValue},
  );
}

/** @param {string} fileName */
function readGuideForm(fileName) {
  return JSON.parse(readFileSync(path.join(formsRoot, fileName), 'utf8'));
}

/** @param {import('playwright').Page} page @param {string} formName */
async function openGuideForm(page, formName) {
  await saveFormToIndexedDB(page, formName, readGuideForm(`${formName}.json`));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  await page.getByTestId(`form-list-open-item-${formName}`).click({force: true});
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureAddFieldsProgression(page, theme) {
  await openGuideForm(page, 'add-fields-empty');
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('text');
  await page.waitForTimeout(400);
  const emptyPlain = await shot(page, 'first-form', 'add-fields-empty-palette-plain', theme);
  const highlights = await measureWorkspaceHighlights(page);
  annotateHighlight(
    emptyPlain,
    path.join(assetsRoot, 'first-form', `highlight-add-fields-empty-palette.${theme}.png`),
    {
      ...highlights['component-palette'],
      label: 'Inputs / Text field',
    },
  );
  await page.getByPlaceholder('Search').fill('');

  await openGuideForm(page, 'add-fields-one-field');
  await selectTreeItem(page, 'fullName');
  await clickRightTab(page, 'Main');
  const oneFieldPlain = await shot(page, 'first-form', 'add-fields-main-tab-plain', theme);
  const oneFieldHighlights = await measureWorkspaceHighlights(page);
  annotateHighlight(
    oneFieldPlain,
    path.join(assetsRoot, 'first-form', `highlight-add-fields-main-tab.${theme}.png`),
    oneFieldHighlights['properties-panel'],
  );

  await openGuideForm(page, 'add-fields-two-fields');
  await clickLeftTab(page, 'Components');
  const twoFieldsPlain = await shot(page, 'first-form', 'add-fields-two-fields-plain', theme);
  const twoFieldsHighlights = await measureWorkspaceHighlights(page);
  annotateHighlight(
    twoFieldsPlain,
    path.join(assetsRoot, 'first-form', `highlight-add-fields-two-fields.${theme}.png`),
    twoFieldsHighlights['component-palette'],
  );

  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await shot(page, 'first-form', 'add-fields-preview-plain', theme);
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing add-fields screenshots (${theme})…`);
    await setBuilderTheme(page, theme);
    await captureAddFieldsProgression(page, theme);
  }

  await browser.close();
  console.log('Done: first-form/add-fields progressive screenshots');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
