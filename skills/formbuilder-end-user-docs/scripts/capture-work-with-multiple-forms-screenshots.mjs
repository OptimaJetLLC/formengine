#!/usr/bin/env node
/**
 * Captures Forms tab screenshots for work-with-multiple-forms guide page.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {
  annotateArrow,
  annotateSingleHeaderMenuItem,
  annotateZones,
  visibleArrowToBox,
} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const DB_NAME = 'example-mui-db';
const STORE_NAME = 'example-store';
const THEMES = ['light', 'dark'];

const STORED_FORMS = [
  {name: 'EventRegistration', file: 'event-registration.json'},
  {name: 'ShippingColumns', file: 'shipping-columns.json'},
  {name: 'FeedbackSurvey', file: 'feedback-survey.json'},
  {name: 'LabelsDemo', file: 'labels-demo.json'},
];

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
}

/** @param {import('playwright').Page} page */
async function prepareBuilder(page) {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate(() => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', 'light');
  });
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function setBuilderTheme(page, theme) {
  await page.evaluate((value) => localStorage.setItem('example-mui-theme', value), theme);
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

/** @param {import('playwright').Locator} locator */
async function measureLocator(locator) {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element not found for measurement');
  }
  return box;
}

/** @param {string} fileName */
function readGuideForm(fileName) {
  return JSON.parse(readFileSync(path.join(formsRoot, fileName), 'utf8'));
}

/** @param {import('playwright').Page} page */
async function clearIndexedDBStore(page) {
  await page.evaluate(
    async ({dbName, storeName}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).clear();
          tx.oncomplete = () => {
            db.close();
            resolve(undefined);
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    {dbName: DB_NAME, storeName: STORE_NAME},
  );
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

/** @param {import('playwright').Page} page */
async function seedMultipleForms(page) {
  await clearIndexedDBStore(page);
  for (const {name, file} of STORED_FORMS) {
    await saveFormToIndexedDB(page, name, readGuideForm(file));
  }
}

/** @param {import('playwright').Page} page @param {string} formName */
async function removeFormFromIndexedDB(page, formName) {
  await page.evaluate(
    async ({dbName, storeName, name}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).delete(name);
          tx.oncomplete = () => {
            db.close();
            resolve(undefined);
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    {dbName: DB_NAME, storeName: STORE_NAME, name: formName},
  );
}

/** @param {import('playwright').Page} page */
async function openFormsTab(page) {
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  await page.waitForSelector('[data-testid="form-list-item-EventRegistration"]', {timeout: 10_000});
  await removeFormFromIndexedDB(page, 'MuiForm');
  await clickLeftTab(page, 'Components');
  await clickLeftTab(page, 'Forms');
  await page.waitForSelector('[data-testid="form-list-item-EventRegistration"]', {timeout: 10_000});
  await page.waitForSelector('[data-testid="form-list-item-MuiForm"]', {state: 'detached', timeout: 5000}).catch(() => undefined);
  await page.waitForTimeout(500);
}

/** @param {import('playwright').Page} page */
async function openMainMenu(page) {
  await dismissViteOverlay(page);
  await page.locator('[aria-haspopup="menu"]').first().click({force: true});
  await page.waitForTimeout(500);
  await page.locator('.rs-dropdown-menu').first().waitFor({state: 'visible', timeout: 10_000});
}

/** @param {import('playwright').Page} page */
async function closeMainMenu(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormsList(page, theme) {
  const listPlain = await shot(page, 'manage-forms', 'forms-list-multiple-plain', theme);
  const listZones = [];
  for (const {name} of STORED_FORMS) {
    const row = page.locator(`[data-testid="form-list-item-${name}"]`).first();
    const rowBox = await measureLocator(row);
    listZones.push({
      id: listZones.length + 1,
      label: name,
      rect: [
        Math.round(rowBox.x - 4),
        Math.round(rowBox.y - 2),
        Math.round(rowBox.width + 8),
        Math.round(rowBox.height + 4),
      ],
      color: '#3B82F6',
      showBadge: false,
    });
  }
  annotateZones(
    listPlain,
    path.join(assetsRoot, 'manage-forms', `highlight-forms-list-multiple.${theme}.png`),
    listZones,
    {noZoneLabels: true},
  );
  console.log('  forms list with multiple saved forms');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormsSearch(page, theme) {
  const searchInput = page.getByPlaceholder('Search...');
  await searchInput.fill('Feedback');
  await page.waitForTimeout(400);
  await page.waitForSelector('[data-testid="form-list-item-FeedbackSurvey"]', {timeout: 5000});
  await page.waitForSelector('[data-testid="form-list-item-EventRegistration"]', {state: 'hidden', timeout: 5000});

  const searchPlain = await shot(page, 'manage-forms', 'forms-search-plain', theme);
  const searchBox = await measureLocator(searchInput);
  const filteredRow = await measureLocator(page.locator('[data-testid="form-list-item-FeedbackSurvey"]').first());
  annotateZones(
    searchPlain,
    path.join(assetsRoot, 'manage-forms', `highlight-forms-search.${theme}.png`),
    [
      {
        id: 1,
        label: 'Search',
        rect: [
          Math.round(searchBox.x - 4),
          Math.round(searchBox.y - 4),
          Math.round(searchBox.width + 8),
          Math.round(searchBox.height + 8),
        ],
        color: '#3B82F6',
      },
      {
        id: 2,
        label: 'FeedbackSurvey',
        rect: [
          Math.round(filteredRow.x - 4),
          Math.round(filteredRow.y - 2),
          Math.round(filteredRow.width + 8),
          Math.round(filteredRow.height + 4),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  );
  console.log('  forms search with filled input');

  await searchInput.fill('');
  await page.waitForTimeout(300);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureEditButton(page, theme) {
  const editButton = page.getByTestId('form-list-open-item-ShippingColumns');
  const editBox = await measureLocator(editButton);
  const editPlain = await shot(page, 'manage-forms', 'forms-edit-button-plain', theme);
  annotateArrow(
    editPlain,
    path.join(assetsRoot, 'manage-forms', `highlight-forms-edit-button.${theme}.png`),
    visibleArrowToBox(editBox),
  );
  console.log('  edit button arrow');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRemoveButton(page, theme) {
  const removeButton = page.locator('[data-testid="form-list-item-FeedbackSurvey"] button').nth(1);
  const removeBox = await measureLocator(removeButton);
  const removePlain = await shot(page, 'manage-forms', 'forms-remove-button-plain', theme);
  annotateArrow(
    removePlain,
    path.join(assetsRoot, 'manage-forms', `highlight-forms-remove-button.${theme}.png`),
    visibleArrowToBox(removeBox),
  );
  console.log('  remove button arrow');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureAddNewFormMenu(page, theme) {
  await openMainMenu(page);
  const plainPath = await shot(page, 'manage-forms', 'header-menu-add-new-form-plain', theme);
  await annotateSingleHeaderMenuItem(page, theme, plainPath, 'addNewForm');
  console.log('  add new form menu highlight');
  await closeMainMenu(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureWorkWithMultipleForms(page, theme) {
  await seedMultipleForms(page);
  await openFormsTab(page);
  await captureFormsList(page, theme);
  await captureFormsSearch(page, theme);
  await captureEditButton(page, theme);
  await captureRemoveButton(page, theme);
  await captureAddNewFormMenu(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing work-with-multiple-forms screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureWorkWithMultipleForms(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'manage-forms')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
