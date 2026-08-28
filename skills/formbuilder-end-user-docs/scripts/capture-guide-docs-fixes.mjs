#!/usr/bin/env node
/**
 * Captures targeted designer-guide screenshot fixes.
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
  annotateHighlight,
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

/** @param {import('playwright').Page} page */
async function openMainMenu(page) {
  await dismissViteOverlay(page);
  await page.locator('[aria-haspopup="menu"]').first().click({force: true});
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {string} formName */
async function openGuideForm(page, formName) {
  const formValue = readFileSync(path.join(formsRoot, `${formName}.json`), 'utf8');
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
async function captureShowHidePreview(page, theme) {
  await openGuideForm(page, 'show-hide-fields');
  await dismissViteOverlay(page);
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await page.getByRole('radio', {name: 'Business'}).click({force: true});
  await page.waitForTimeout(500);

  const previewPlain = await shot(page, 'data-driven', 'show-hide-preview-plain', theme);
  const accountTypeBox = await measureLocator(page.getByText('Account type', {exact: true}).first());
  const taxIdBox = await measureLocator(page.getByLabel('Tax ID', {exact: false}).first());
  annotateZones(
    previewPlain,
    path.join(assetsRoot, 'data-driven', `highlight-show-hide-preview.${theme}.png`),
    [
      {
        id: 1,
        label: 'Account type',
        rect: [
          Math.round(accountTypeBox.x - 8),
          Math.round(accountTypeBox.y - 8),
          Math.round(220),
          Math.round(72),
        ],
        color: '#3B82F6',
      },
      {
        id: 2,
        label: 'Tax ID',
        rect: [
          Math.round(taxIdBox.x - 4),
          Math.round(taxIdBox.y - 4),
          Math.round(taxIdBox.width + 8),
          Math.round(taxIdBox.height + 8),
        ],
        color: '#F59E0B',
      },
    ],
    {noZoneLabels: true},
  );

  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSettingsArrows(page, theme) {
  await clickLeftTab(page, 'Settings');

  const blocks = [
    {label: 'Error settings', testId: 'errorType-labeled-wrapper', basename: 'settings-error-block'},
    {label: 'Tooltip', testId: 'tooltipType-labeled-wrapper', basename: 'settings-tooltip'},
    {label: 'Modal', testId: 'modalType-labeled-wrapper', basename: 'settings-modal'},
  ];

  for (const block of blocks) {
    const heading = page.getByText(block.label, {exact: false}).first();
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    if (block.label === 'Error settings') {
      const showCheckbox = page.locator('.FE_LeftPanel input[type="checkbox"]').first();
      if (!(await showCheckbox.isChecked())) {
        await showCheckbox.click({force: true});
        await page.waitForTimeout(300);
      }
    }

    const plainPath = await shot(page, 'appearance', `${block.basename}-plain`, theme);
    const controlBox = await measureLocator(page.locator(`[data-testid="${block.testId}"]`).first());
    annotateArrow(
      plainPath,
      path.join(assetsRoot, 'appearance', `highlight-${block.basename}.${theme}.png`),
      visibleArrowToBox(controlBox),
    );
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureHeaderMenuHighlights(page, theme) {
  const items = ['save', 'download', 'exportForms', 'addNewForm'];
  for (const item of items) {
    await openMainMenu(page);
    const plainPath = await shot(page, 'manage-forms', `header-menu-${item}-plain`, theme);
    await annotateSingleHeaderMenuItem(page, theme, plainPath, item);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  }
}

/** @param {import('playwright').Page} page */
async function openDefaultForm(page) {
  await clickLeftTab(page, 'Forms');
  await page.getByTestId('form-list-open-item-MuiForm').click({force: true});
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureValidationAddRule(page, theme) {
  await openDefaultForm(page);
  await selectTreeItem(page, 'First name');
  await clickRightTab(page, 'Rules');
  await page.waitForSelector('[data-testid="existing-rule-internal-required"]', {timeout: 10_000});
  await page.getByTestId('add-rule-button').click({force: true});
  await page.waitForTimeout(400);
  await page.waitForSelector('[data-testid="rule-menu-item-internal-nonEmpty"]', {state: 'visible', timeout: 5000});

  const plainPath = await shot(page, 'first-form', 'validation-add-rule-plain', theme);
  const existingRuleBox = await measureLocator(page.getByTestId('existing-rule-internal-required'));
  const menuBox = await measureLocator(page.locator('.rs-dropdown-menu').last());
  annotateZones(plainPath, path.join(assetsRoot, 'first-form', `highlight-validation-add-rule.${theme}.png`), [
    {
      id: 1,
      label: 'Required rule',
      rect: [
        Math.round(existingRuleBox.x - 4),
        Math.round(existingRuleBox.y - 4),
        Math.round(existingRuleBox.width + 8),
        Math.round(existingRuleBox.height + 8),
      ],
      color: '#3B82F6',
    },
    {
      id: 2,
      label: 'Rule picker',
      rect: [
        Math.round(menuBox.x - 4),
        Math.round(menuBox.y - 4),
        Math.round(menuBox.width + 8),
        Math.round(menuBox.height + 8),
      ],
      color: '#F59E0B',
    },
  ], {noZoneLabels: true});

  await page.keyboard.press('Escape');
  await page.waitForTimeout(200);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureButtonPalette(page, theme) {
  await openDefaultForm(page);
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('button');
  await page.waitForTimeout(500);
  const plainPath = await shot(page, 'first-form', 'components-search-button-plain', theme);
  const searchBox = await measureLocator(page.getByPlaceholder('Search'));
  const buttonItem = page.getByTestId('MuiButton-palette-component').first();
  if (await buttonItem.count()) {
    const buttonBox = await measureLocator(buttonItem);
    annotateZones(plainPath, path.join(assetsRoot, 'first-form', `highlight-components-search-button.${theme}.png`), [
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
        label: 'Button',
        rect: [
          Math.round(buttonBox.x - 4),
          Math.round(buttonBox.y - 4),
          Math.round(buttonBox.width + 8),
          Math.round(buttonBox.height + 8),
        ],
        color: '#F59E0B',
      },
    ], {noZoneLabels: true});
  }
  await page.getByPlaceholder('Search').fill('');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureDocsFixes(page, theme) {
  await captureShowHidePreview(page, theme);
  await captureSettingsArrows(page, theme);
  await captureHeaderMenuHighlights(page, theme);
  await captureValidationAddRule(page, theme);
  await captureButtonPalette(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing docs fixes (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureDocsFixes(page, theme);
  }

  await browser.close();
  console.log(`Docs fix screenshots saved under ${assetsRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
