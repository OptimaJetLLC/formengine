#!/usr/bin/env node
/**
 * Captures preset-components guide screenshots.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateArrow, annotateZones, ensureToolbarActionsVisible} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name';
const THEME_KEY = process.env.BUILDER_THEME_KEY ?? 'example-mui-theme';
const PRESET_STORAGE_KEY = 'example-mui-presetComponents';
const DB_NAME = 'example-mui-db';
const STORE_NAME = 'example-store';
const FORM_NAME = 'preset-address';
const PRESET_NAME = 'Address block';
const PRESET_CATEGORY = 'Presets';
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
    {viewKey: VIEW_KEY, themeKey: THEME_KEY},
  );
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function setBuilderTheme(page, theme) {
  await page.evaluate(({themeKey, value}) => localStorage.setItem(themeKey, value), {
    themeKey: THEME_KEY,
    value: theme,
  });
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
async function clearSavedPresets(page) {
  await page.evaluate(
    ({storageKey, presetName}) => {
      const presets = JSON.parse(localStorage.getItem(storageKey) ?? '{}');
      for (const key of Object.keys(presets)) {
        if (key === presetName) {
          delete presets[key];
        }
      }
      localStorage.setItem(storageKey, JSON.stringify(presets));
    },
    {storageKey: PRESET_STORAGE_KEY, presetName: PRESET_NAME},
  );
}

/** @param {import('playwright').Page} page */
async function openPresetAddressForm(page) {
  await saveFormToIndexedDB(page, FORM_NAME, readGuideForm(`${FORM_NAME}.json`));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const openItem = page.getByTestId(`form-list-open-item-${FORM_NAME}`);
  if (await openItem.count()) {
    await openItem.click({force: true});
  } else {
    await page.getByTestId('form-list-open-item-MuiForm').click({force: true});
  }
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/** @param {import('playwright').Page} page */
async function multiSelectStreetAndCity(page) {
  await clickLeftTab(page, 'Components');
  await page.getByTestId('street-editable-wrapper').click({force: true});
  await page.waitForTimeout(200);
  await page.getByTestId('city-editable-wrapper').click({modifiers: ['Control'], force: true});
  await page.waitForTimeout(500);
}

/**
 * @param {import('playwright').Page} page
 * @returns {Promise<{start: number[], end: number[]}>}
 */
async function measurePresetButtonArrow(page) {
  const streetBox = await measureLocator(page.getByTestId('street-editable-wrapper'));
  const cityBox = await measureLocator(page.getByTestId('city-editable-wrapper'));
  await ensureToolbarActionsVisible(page);
  const presetButton = page
    .locator('.FE_Component_Toolbar_PresetComponentButton .create-preset-button, .create-preset-button, [data-testid="toolbar-create-preset-button"]')
    .locator('visible=true')
    .first();
  const presetBox = await measureLocator(presetButton);
  const selectionCenterX = Math.round((streetBox.x + cityBox.x + cityBox.width) / 2);
  const selectionCenterY = Math.round((streetBox.y + streetBox.y + streetBox.height) / 2);
  return {
    start: [selectionCenterX, selectionCenterY],
    end: [
      Math.round(presetBox.x + presetBox.width / 2),
      Math.round(presetBox.y + presetBox.height / 2),
    ],
  };
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSelectComponents(page, theme) {
  const plainPath = await shot(page, 'manage-forms', 'preset-select-plain', theme);
  const streetBox = await measureLocator(page.getByTestId('street-editable-wrapper'));
  const cityBox = await measureLocator(page.getByTestId('city-editable-wrapper'));
  annotateZones(plainPath, path.join(assetsRoot, 'manage-forms', `highlight-preset-select.${theme}.png`), [
    {
      id: 1,
      label: 'Street',
      rect: [
        Math.round(streetBox.x - 4),
        Math.round(streetBox.y - 4),
        Math.round(streetBox.width + 8),
        Math.round(streetBox.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'City',
      rect: [
        Math.round(cityBox.x - 4),
        Math.round(cityBox.y - 4),
        Math.round(cityBox.width + 8),
        Math.round(cityBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneLabels: true});
  console.log('  step 1: multi-select Street and City');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePresetToolbarButton(page, theme) {
  await ensureToolbarActionsVisible(page);
  const plainPath = await shot(page, 'manage-forms', 'preset-toolbar-button-plain', theme);
  const arrow = await measurePresetButtonArrow(page);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'manage-forms', `highlight-preset-toolbar-button.${theme}.png`),
    arrow,
  );
  console.log('  step 2: arrow to preset toolbar button');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePresetDialog(page, theme) {
  await ensureToolbarActionsVisible(page);
  await page
    .locator('.FE_Component_Toolbar_PresetComponentButton .create-preset-button, .create-preset-button, [data-testid="toolbar-create-preset-button"]')
    .locator('visible=true')
    .first()
    .click({force: true});
  await page.waitForSelector('[data-testid="preset-category-picker"]', {timeout: 10_000});
  await page.waitForTimeout(300);
  await page.getByTestId('modal-name-input').fill(PRESET_NAME);
  const categoryPicker = page.getByTestId('preset-category-picker');
  await categoryPicker.click({force: true});
  await page.waitForTimeout(200);
  await page.keyboard.type(PRESET_CATEGORY);
  await page.waitForTimeout(200);
  const categoryOption = page
    .locator('.rs-picker-list-item, .rs-picker-select-menu-item, [role="option"]')
    .filter({hasText: PRESET_CATEGORY})
    .first();
  if (await categoryOption.count()) {
    await categoryOption.click({force: true});
  }
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'manage-forms', 'preset-dialog-plain', theme);
  const nameField = page.getByTestId('modal-name-input');
  const categoryField = page.getByTestId('preset-category-picker');
  const nameBox = await measureLocator(nameField);
  const categoryBox = await measureLocator(categoryField);
  annotateZones(plainPath, path.join(assetsRoot, 'manage-forms', `highlight-preset-dialog.${theme}.png`), [
    {
      id: 1,
      label: 'Name',
      rect: [
        Math.round(nameBox.x - 4),
        Math.round(nameBox.y - 28),
        Math.round(nameBox.width + 8),
        Math.round(nameBox.height + 32),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Category',
      rect: [
        Math.round(categoryBox.x - 4),
        Math.round(categoryBox.y - 28),
        Math.round(categoryBox.width + 8),
        Math.round(categoryBox.height + 32),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneLabels: true});
  console.log('  step 3: preset dialog options');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePresetInPalette(page, theme) {
  await page.getByTestId('modal-ok-button').click({force: true});
  await page.waitForTimeout(800);
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill(PRESET_NAME);
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'manage-forms', 'preset-palette-plain', theme);
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  const presetItem = page.locator('.FE_LeftPanel').getByText(PRESET_NAME, {exact: true}).first();
  const zones = [
    {
      id: 1,
      label: 'Components',
      rect: [
        Math.round(componentsTab.x - 4),
        Math.round(componentsTab.y - 4),
        Math.round(componentsTab.width + 8),
        Math.round(componentsTab.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
  ];
  if (await presetItem.count()) {
    const presetBox = await measureLocator(presetItem);
    zones.push({
      id: 2,
      label: PRESET_NAME,
      rect: [
        Math.round(presetBox.x - 4),
        Math.round(presetBox.y - 4),
        Math.round(presetBox.width + 8),
        Math.round(presetBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'manage-forms', `highlight-preset-palette.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  await page.getByPlaceholder('Search').fill('');
  console.log('  step 4: preset in Components palette');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePresetWorkflow(page, theme) {
  await clearSavedPresets(page);
  await openPresetAddressForm(page);
  await multiSelectStreetAndCity(page);
  await captureSelectComponents(page, theme);
  await capturePresetToolbarButton(page, theme);
  await capturePresetDialog(page, theme);
  await capturePresetInPalette(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing preset-components screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await capturePresetWorkflow(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'manage-forms')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
