#!/usr/bin/env node
/**
 * Captures special-components and print-your-form guide screenshots.
 * Requires a running example builder at localhost:5173 with RSuite + print components.
 */
import {createRequire} from 'node:module';
import {readFileSync, copyFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateSingleHeaderMenuItem, annotateZones} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name';
const RSUITE_THEME_KEY = process.env.BUILDER_RSUITE_THEME_KEY ?? 'example-rsuite-theme';
const RSUITE_VIEW = process.env.BUILDER_RSUITE_VIEW ?? 'rsuite-inject-css';
const RSUITE_DB = 'form-builder-store';
const RSUITE_STORE = 'form-store';
const FORM_NAME = 'print-settings-demo';
const FIXTURE = 'print-settings-demo.json';
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function prepareBuilder(page, theme = 'light') {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate(
    ({viewKey, themeKey, view, themeValue}) => {
      localStorage.setItem(viewKey, view);
      localStorage.setItem(themeKey, themeValue);
    },
    {viewKey: VIEW_KEY, themeKey: RSUITE_THEME_KEY, view: RSUITE_VIEW, themeValue: theme},
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
    async ({db, store, name, value}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(db);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const tx = database.transaction(store, 'readwrite');
          tx.objectStore(store).put(value, name);
          tx.oncomplete = () => {
            database.close();
            resolve(undefined);
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    {db: RSUITE_DB, store: RSUITE_STORE, name: formName, value: formValue},
  );
}

/** @param {import('playwright').Page} page */
async function openPrintDemoForm(page) {
  await saveFormToIndexedDB(page, FORM_NAME, readGuideForm(FIXTURE));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const openItem = page.getByTestId(`form-list-open-item-${FORM_NAME}`);
  if (await openItem.count()) {
    await openItem.click({force: true});
  } else {
    await page.getByTestId('form-list-open-item-RSuiteForm').click({force: true});
  }
  await page.waitForTimeout(900);
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="non-visual-bar"]', {timeout: 30_000});
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSingletonPalette(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Print settings');
  await page.waitForTimeout(500);
  const item = page.getByTestId('PrintSettings-palette-component').first();
  await item.hover({force: true});
  await page.waitForTimeout(700);
  await page.getByRole('tooltip').waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'components-by-task', 'special-singleton-palette-disabled-plain', theme);
  const itemBox = await measureLocator(item);
  const outPath = path.join(assetsRoot, 'components-by-task', `special-singleton-palette-disabled.${theme}.png`);
  annotateZones(plainPath, outPath, [
    {
      id: 1,
      label: 'Disabled',
      labelPlacement: 'callout',
      rect: [
        Math.round(itemBox.x - 4),
        Math.round(itemBox.y - 4),
        Math.round(itemBox.width + 8),
        Math.round(itemBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneNumbers: true});
  copyFileSync(outPath, path.join(assetsRoot, 'components-by-task', 'special-singleton-palette-disabled.png'));
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureNonVisualBar(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('');
  await page.waitForTimeout(200);
  const chip = page.getByTestId('PrintSettings-non-visual-chip');
  await chip.click({force: true});
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'components-by-task', 'special-non-visual-bar-plain', theme);
  const barBox = await measureLocator(page.getByTestId('non-visual-bar'));
  const outPath = path.join(assetsRoot, 'components-by-task', `special-non-visual-bar.${theme}.png`);
  annotateZones(plainPath, outPath, [
    {
      id: 1,
      label: 'Non-visual bar',
      labelPlacement: 'callout',
      rect: [
        Math.round(barBox.x - 6),
        Math.round(barBox.y - 6),
        Math.round(barBox.width + 12),
        Math.round(barBox.height + 12),
      ],
      color: '#10B981',
      showBadge: false,
    },
  ], {noZoneNumbers: true});
  copyFileSync(outPath, path.join(assetsRoot, 'components-by-task', 'special-non-visual-bar.png'));
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureNonVisualTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.waitForTimeout(400);
  const group = page.getByTestId('non-visual-tree-group');
  await group.waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'components-by-task', 'special-non-visual-tree-plain', theme);
  const groupBox = await measureLocator(group);
  const outPath = path.join(assetsRoot, 'components-by-task', `special-non-visual-tree.${theme}.png`);
  annotateZones(plainPath, outPath, [
    {
      id: 1,
      label: 'Non-visual',
      labelPlacement: 'callout',
      rect: [
        Math.round(groupBox.x - 4),
        Math.round(groupBox.y - 4),
        Math.round(groupBox.width + 8),
        Math.round(groupBox.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
  ], {noZoneNumbers: true});
  copyFileSync(outPath, path.join(assetsRoot, 'components-by-task', 'special-non-visual-tree.png'));
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePrintPageBreakAndSettings(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByTestId('PrintSettings-non-visual-chip').click({force: true});
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'preview-and-handoff', 'print-page-break-and-settings-plain', theme);
  const breakBox = await measureLocator(page.getByTestId('page-break-placeholder'));
  const barBox = await measureLocator(page.getByTestId('non-visual-bar'));
  const propsPanel = page.locator('.FE_RightPanel').first();
  const propsBox = await measureLocator(propsPanel);
  const outPath = path.join(assetsRoot, 'preview-and-handoff', `print-page-break-and-settings.${theme}.png`);
  annotateZones(plainPath, outPath, [
    {
      id: 1,
      label: 'Page break',
      labelPlacement: 'callout',
      rect: [
        Math.round(breakBox.x - 4),
        Math.round(breakBox.y - 4),
        Math.round(breakBox.width + 8),
        Math.round(breakBox.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Print settings',
      labelPlacement: 'callout',
      rect: [
        Math.round(barBox.x - 6),
        Math.round(barBox.y - 6),
        Math.round(barBox.width + 12),
        Math.round(barBox.height + 12),
      ],
      color: '#10B981',
      showBadge: false,
    },
    {
      id: 3,
      label: 'Properties',
      labelPlacement: 'callout',
      rect: [
        Math.round(propsBox.x),
        Math.round(propsBox.y),
        Math.round(propsBox.width),
        Math.round(propsBox.height),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneNumbers: true});
  copyFileSync(outPath, path.join(assetsRoot, 'preview-and-handoff', 'print-page-break-and-settings.png'));
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePrintMenu(page, theme) {
  await dismissViteOverlay(page);
  await page.locator('[aria-haspopup="menu"]').first().click({force: true});
  await page.waitForTimeout(500);
  await page.locator('.rs-dropdown-menu').first().waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'manage-forms', 'header-menu-print-plain', theme);
  await annotateSingleHeaderMenuItem(page, theme, plainPath, 'print');
  copyFileSync(
    path.join(assetsRoot, 'manage-forms', `highlight-header-menu-print.${theme}.png`),
    path.join(assetsRoot, 'manage-forms', 'highlight-header-menu-print.png'),
  );
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
}

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });
  const page = await createGuideCapturePage(browser);

  try {
    for (const theme of THEMES) {
      console.log(`Capturing special/print screenshots (${theme})...`);
      await prepareBuilder(page, theme);
      await openPrintDemoForm(page);
      await captureSingletonPalette(page, theme);
      await captureNonVisualBar(page, theme);
      await captureNonVisualTree(page, theme);
      await capturePrintPageBreakAndSettings(page, theme);
      await capturePrintMenu(page, theme);
    }
    console.log('Done.');
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
