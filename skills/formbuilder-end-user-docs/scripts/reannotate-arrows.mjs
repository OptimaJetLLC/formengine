#!/usr/bin/env node
/**
 * Re-applies arrow annotations on existing plain screenshots after arrow length changes.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {
  annotateArrow,
  measureComponentToolbarArrow,
  revealComponentToolbarActions,
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
const BUILDER_VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name';
const BUILDER_THEME_KEY = process.env.BUILDER_THEME_KEY ?? 'example-mui-theme';
const DB_NAME = 'example-mui-db';
const STORE_NAME = 'example-store';
const STORED_FORMS = [
  {name: 'EventRegistration', file: 'event-registration.json'},
  {name: 'ShippingColumns', file: 'shipping-columns.json'},
  {name: 'FeedbackSurvey', file: 'feedback-survey.json'},
  {name: 'LabelsDemo', file: 'labels-demo.json'},
];
const THEMES = ['light', 'dark'];

/** @param {string} fileName */
function readGuideForm(fileName) {
  return JSON.parse(readFileSync(path.join(formsRoot, fileName), 'utf8'));
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

/** @param {import('playwright').Page} page @param {string} formName */
async function openGuideForm(page, formName) {
  await saveFormToIndexedDB(page, formName, readGuideForm(`${formName}.json`));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const openItem = page.getByTestId(`form-list-open-item-${formName}`);
  if (await openItem.count()) {
    await openItem.click({force: true});
  } else {
    await page.getByTestId('form-list-open-item-MuiForm').click({force: true});
  }
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/** @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
function plainPath(section, basename, theme) {
  return path.join(assetsRoot, section, `${basename}.${theme}.png`);
}

/** @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
function highlightPath(section, basename, theme) {
  return path.join(assetsRoot, section, `${basename}.${theme}.png`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
/** @type {{ clone?: { start: number[], end: number[] }, delete?: { start: number[], end: number[] } }} */
const cachedToolbarArrows = {};

async function ensureDefaultFormWithFirstName(page) {
  const firstName = page.getByTestId('First name-editable-wrapper');
  if (await firstName.count()) {
    return;
  }
  await page.evaluate(
    ({viewKey}) => {
      localStorage.setItem(viewKey, 'mui');
    },
    {viewKey: BUILDER_VIEW_KEY},
  );
  await clearIndexedDBStore(page);
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const muiForm = page.getByTestId('form-list-open-item-MuiForm');
  if (await muiForm.count()) {
    await muiForm.click({force: true});
    await page.waitForTimeout(800);
  }
  await clickLeftTab(page, 'Components');
  await page.waitForSelector('[data-testid="First name-editable-wrapper"]', {timeout: 60_000});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotateToolbarArrows(page, theme) {
  let cloneArrow = cachedToolbarArrows.clone;
  let deleteArrow = cachedToolbarArrows.delete;

  if (!cloneArrow || !deleteArrow) {
    await ensureDefaultFormWithFirstName(page);
    await clickLeftTab(page, 'Components');
    await page.getByTestId('First name-editable-wrapper').click({force: true});
    await page.waitForTimeout(400);
    cloneArrow = await measureComponentToolbarArrow(page, 'First name', 'clone');
    deleteArrow = await measureComponentToolbarArrow(page, 'First name', 'delete');
    cachedToolbarArrows.clone = cloneArrow;
    cachedToolbarArrows.delete = deleteArrow;
  }

  const plain = plainPath('workspace', 'toolbar-actions-plain', theme);
  annotateArrow(plain, highlightPath('workspace', 'highlight-toolbar-clone', theme), cloneArrow);
  annotateArrow(plain, highlightPath('workspace', 'highlight-toolbar-delete', theme), deleteArrow);
  console.log('  workspace toolbar clone/delete');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotatePresetToolbarArrow(page, theme) {
  await openGuideForm(page, 'preset-address');
  await clickLeftTab(page, 'Components');
  await page.getByTestId('Street-editable-wrapper').click({force: true});
  await page.waitForTimeout(200);
  await page.getByTestId('City-editable-wrapper').click({modifiers: ['Control'], force: true});
  await page.waitForTimeout(500);

  const streetBox = await measureLocator(page.getByTestId('Street-editable-wrapper'));
  const cityBox = await measureLocator(page.getByTestId('City-editable-wrapper'));
  await revealComponentToolbarActions(page);
  const presetButton = page.getByTestId('toolbar-create-preset-button').locator('visible=true').first();
  const presetBox = await measureLocator(presetButton);
  const selectionCenterX = Math.round((streetBox.x + cityBox.x + cityBox.width) / 2);
  const selectionCenterY = Math.round((streetBox.y + streetBox.y + streetBox.height) / 2);
  const arrow = {
    start: [selectionCenterX, selectionCenterY],
    end: [
      Math.round(presetBox.x + presetBox.width / 2),
      Math.round(presetBox.y + presetBox.height / 2),
    ],
  };

  annotateArrow(
    plainPath('manage-forms', 'preset-toolbar-button-plain', theme),
    highlightPath('manage-forms', 'highlight-preset-toolbar-button', theme),
    arrow,
  );
  console.log('  manage-forms preset toolbar button');
}

/** @param {import('playwright').Page} page */
async function seedMultipleForms(page) {
  await clearIndexedDBStore(page);
  for (const {name, file} of STORED_FORMS) {
    await saveFormToIndexedDB(page, name, readGuideForm(file));
  }
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
  await page.waitForTimeout(500);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotateFormsArrows(page, theme) {
  await seedMultipleForms(page);
  await openFormsTab(page);

  const editBox = await measureLocator(page.getByTestId('form-list-open-item-ShippingColumns'));
  annotateArrow(
    plainPath('manage-forms', 'forms-edit-button-plain', theme),
    highlightPath('manage-forms', 'highlight-forms-edit-button', theme),
    visibleArrowToBox(editBox),
  );

  const removeBox = await measureLocator(page.locator('[data-testid="form-list-item-FeedbackSurvey"] button').nth(1));
  annotateArrow(
    plainPath('manage-forms', 'forms-remove-button-plain', theme),
    highlightPath('manage-forms', 'highlight-forms-remove-button', theme),
    visibleArrowToBox(removeBox),
  );
  console.log('  manage-forms edit/remove buttons');
}

/** @param {import('playwright').Page} page @param {'desktop' | 'mobile'} mode */
async function clickDeviceMode(page, mode) {
  const index = {desktop: 0, mobile: 1}[mode];
  await page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(index).click({force: true});
  await page.waitForTimeout(500);
}

/** @param {import('playwright').Page} page @param {'desktop' | 'mobile'} mode */
async function measureDeviceButton(page, mode) {
  const index = {desktop: 0, mobile: 1}[mode];
  return measureLocator(page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(index));
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotatePreviewDeviceArrows(page, theme) {
  await openGuideForm(page, 'shipping-columns');
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);

  await clickDeviceMode(page, 'desktop');
  const desktopBox = await measureDeviceButton(page, 'desktop');
  annotateArrow(
    plainPath('structure', 'rows-columns-preview-desktop-plain', theme),
    highlightPath('structure', 'highlight-rows-columns-preview-desktop', theme),
    visibleArrowToBox(desktopBox),
  );

  await clickDeviceMode(page, 'mobile');
  const mobileBox = await measureDeviceButton(page, 'mobile');
  annotateArrow(
    plainPath('structure', 'rows-columns-preview-mobile-plain', theme),
    highlightPath('structure', 'highlight-rows-columns-preview-mobile', theme),
    visibleArrowToBox(mobileBox),
  );
  console.log('  structure preview desktop/mobile device buttons');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotateHeaderLanguageArrow(page, theme) {
  await openGuideForm(page, 'localization-authors');
  const languageBox = await measureLocator(page.locator('[data-testid="designer-form-language"]'));
  annotateArrow(
    plainPath('appearance', 'header-language-plain', theme),
    highlightPath('appearance', 'highlight-header-language', theme),
    visibleArrowToBox(languageBox),
  );
  console.log('  appearance header language');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} blockLabel
 * @param {string} controlTestId
 * @param {string} basename
 */
async function reannotateSettingsArrow(page, theme, blockLabel, controlTestId, basename) {
  await openGuideForm(page, 'prefill-static');
  await clickLeftTab(page, 'Settings');
  const block = page.getByText(blockLabel, {exact: false}).first();
  await block.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  if (blockLabel === 'Error settings') {
    const showCheckbox = page.locator('.FE_LeftPanel input[type="checkbox"]').first();
    if (!(await showCheckbox.isChecked())) {
      await showCheckbox.click({force: true});
      await page.waitForTimeout(300);
    }
  }

  const controlBox = await measureLocator(page.locator(`[data-testid="${controlTestId}"]`).first());
  annotateArrow(
    plainPath('appearance', `${basename}-plain`, theme),
    highlightPath('appearance', `highlight-${basename}`, theme),
    visibleArrowToBox(controlBox),
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotateSettingsArrows(page, theme) {
  await reannotateSettingsArrow(page, theme, 'Error settings', 'errorType-labeled-wrapper', 'settings-error-block');
  await reannotateSettingsArrow(page, theme, 'Tooltip', 'tooltipType-labeled-wrapper', 'settings-tooltip');
  await reannotateSettingsArrow(page, theme, 'Modal', 'modalType-labeled-wrapper', 'settings-modal');
  console.log('  appearance settings error/tooltip/modal');
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function resetBuilderForTheme(page, theme) {
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

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function reannotateAllArrows(page, theme) {
  await reannotateToolbarArrows(page, theme);
  await reannotatePresetToolbarArrow(page, theme);
  await reannotateFormsArrows(page, theme);
  await reannotatePreviewDeviceArrows(page, theme);
  await reannotateHeaderLanguageArrow(page, theme);
  await reannotateSettingsArrows(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Re-annotating arrows (${theme})...`);
    await resetBuilderForTheme(page, theme);
    await reannotateAllArrows(page, theme);
  }

  await browser.close();
  console.log('Arrow annotations updated.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
