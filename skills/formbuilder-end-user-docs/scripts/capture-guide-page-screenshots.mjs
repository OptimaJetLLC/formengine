#!/usr/bin/env node
/**
 * Captures page-specific Form Author Guide screenshots (custom forms + annotations).
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

/**
 * @param {{ x: number, y: number, width: number, height: number }} targetBox
 * @param {'below' | 'left'} [origin]
 * @deprecated Use visibleArrowToBox instead.
 */
function arrowToBox(targetBox, origin = 'below') {
  return visibleArrowToBox(targetBox);
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

/** @param {import('playwright').Page} page */
async function closeBottomPanel(page) {
  const closeButton = page.getByRole('button', {name: 'Close'});
  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(300);
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureShowHideFields(page, theme) {
  await openGuideForm(page, 'show-hide-fields');

  await clickLeftTab(page, 'Components');
  await page.getByTestId('accountType-editable-wrapper').click({force: true});
  await page.waitForTimeout(400);
  const canvasPlain = await shot(page, 'data-driven', 'show-hide-canvas-plain', theme);

  await selectTreeItem(page, 'taxId');
  await clickRightTab(page, 'Main');
  await page.locator('[data-testid="renderWhen-labeled-wrapper"] button').first().click();
  await page.waitForTimeout(600);
  await page.getByText('Calculable value', {exact: true}).click();
  await page.waitForSelector('.monaco-editor', {timeout: 10_000});
  await page.waitForTimeout(500);

  const renderWhenPlain = await shot(page, 'data-driven', 'render-when-editor-plain', theme);
  const renderWhenEditBox = await measureLocator(
    page.locator('[data-testid="renderWhen-labeled-wrapper"] button').first(),
  );
  const editorBox = await measureLocator(page.locator('.monaco-editor').first());
  annotateZones(
    renderWhenPlain,
    path.join(assetsRoot, 'data-driven', `highlight-render-when-editor.${theme}.png`),
    [
      {
        id: 1,
        label: 'Render When',
        rect: [
          Math.round(renderWhenEditBox.x - 4),
          Math.round(renderWhenEditBox.y - 4),
          Math.round(renderWhenEditBox.width + 8),
          Math.round(renderWhenEditBox.height + 8),
        ],
        color: '#3B82F6',
      },
      {
        id: 2,
        label: 'Condition editor',
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

  const accountBox = await measureLocator(page.getByTestId('accountType-editable-wrapper'));
  const taxBox = await measureLocator(page.getByTestId('taxId-editable-wrapper'));
  annotateZones(canvasPlain, path.join(assetsRoot, 'data-driven', `highlight-show-hide-canvas.${theme}.png`), [
    {
      id: 1,
      label: 'Account type',
      rect: [
        Math.round(accountBox.x - 4),
        Math.round(accountBox.y - 4),
        Math.round(accountBox.width + 8),
        Math.round(accountBox.height + 8),
      ],
      color: '#3B82F6',
    },
    {
      id: 2,
      label: 'Tax ID',
      rect: [
        Math.round(taxBox.x - 4),
        Math.round(taxBox.y - 4),
        Math.round(taxBox.width + 8),
        Math.round(taxBox.height + 8),
      ],
      color: '#F59E0B',
    },
  ], {noZoneLabels: true});

  await closeBottomPanel(page);

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
async function capturePrefillStatic(page, theme) {
  await openGuideForm(page, 'prefill-static');
  await selectTreeItem(page, 'email');
  await clickRightTab(page, 'Main');
  const plainPath = await shot(page, 'data-driven', 'prefill-static-value-plain', theme);
  const valueBox = await measureLocator(page.locator('[data-testid="value-labeled-wrapper"]'));
  annotateHighlight(plainPath, path.join(assetsRoot, 'data-driven', `highlight-prefill-static-value.${theme}.png`), {
    rect: [
      Math.round(valueBox.x - 4),
      Math.round(valueBox.y - 4),
      Math.round(valueBox.width + 8),
      Math.round(valueBox.height + 8),
    ],
    label: 'Value',
    color: '#F59E0B',
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureLocalizationAuthors(page, theme) {
  await openGuideForm(page, 'localization-authors');

  const headerPlain = await shot(page, 'appearance', 'header-language-plain', theme);
  const languageBox = await measureLocator(page.locator('[data-testid="designer-form-language"]'));
  annotateArrow(
    headerPlain,
    path.join(assetsRoot, 'appearance', `highlight-header-language.${theme}.png`),
    arrowToBox(languageBox),
  );

  await selectTreeItem(page, 'companyName');
  await clickRightTab(page, 'Main');
  await page.locator('[data-testid="label-labeled-wrapper"] button').first().click();
  await page.waitForTimeout(800);
  await page.getByText('Localization', {exact: true}).click();
  await page.waitForSelector('[data-testid="localization-editor-language"]', {timeout: 10_000});
  await page.waitForTimeout(500);

  const localizationPlain = await shot(page, 'appearance', 'localization-editor-plain', theme);
  const labelEditBox = await measureLocator(page.locator('[data-testid="label-labeled-wrapper"] button').first());
  const editorBox = await measureLocator(page.locator('.monaco-editor').first());
  annotateZones(
    localizationPlain,
    path.join(assetsRoot, 'appearance', `highlight-localization-editor.${theme}.png`),
    [
      {
        id: 1,
        label: 'Label',
        rect: [
          Math.round(labelEditBox.x - 4),
          Math.round(labelEditBox.y - 4),
          Math.round(labelEditBox.width + 8),
          Math.round(labelEditBox.height + 8),
        ],
        color: '#3B82F6',
      },
      {
        id: 2,
        label: 'Localization editor',
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

  await closeBottomPanel(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} blockLabel
 * @param {string} controlTestId
 * @param {string} basename
 */
async function captureSettingsBlockArrow(page, theme, blockLabel, controlTestId, basename) {
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

  const plainPath = await shot(page, 'appearance', `${basename}-plain`, theme);
  const controlBox = await measureLocator(page.locator(`[data-testid="${controlTestId}"]`).first());
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'appearance', `highlight-${basename}.${theme}.png`),
    visibleArrowToBox(controlBox),
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormWideSettings(page, theme) {
  await openGuideForm(page, 'prefill-static');
  await captureSettingsBlockArrow(page, theme, 'Error settings', 'errorType-labeled-wrapper', 'settings-error-block');
  await captureSettingsBlockArrow(page, theme, 'Tooltip', 'tooltipType-labeled-wrapper', 'settings-tooltip');
  await captureSettingsBlockArrow(page, theme, 'Modal', 'modalType-labeled-wrapper', 'settings-modal');
}

/** @param {import('playwright').Page} page */
async function ensureRightPanelOpen(page) {
  const rightPanel = page.locator('.FE_RightPanel');
  const isCollapsed = await rightPanel.evaluate((el) => el.className.includes('collapsed'));
  if (isCollapsed) {
    await page.locator('.FE_RightPanel [class*="hideButton"]').click();
    await page.waitForTimeout(500);
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureStyleBold(page, theme) {
  await openGuideForm(page, 'style-bold');
  await selectTreeItem(page, 'sectionTitle');
  await ensureRightPanelOpen(page);
  await clickRightTab(page, 'Style');
  await page.locator('.FE_RightPanel .monaco-editor').first().waitFor({state: 'visible', timeout: 15_000});
  await page.waitForTimeout(400);
  const stylePlain = await shot(page, 'appearance', 'style-bold-plain', theme);
  const editorBox = await measureLocator(page.locator('.FE_RightPanel .monaco-editor').first());
  annotateHighlight(stylePlain, path.join(assetsRoot, 'appearance', `highlight-style-bold.${theme}.png`), {
    rect: [
      Math.round(editorBox.x - 4),
      Math.round(editorBox.y - 4),
      Math.round(editorBox.width + 8),
      Math.round(editorBox.height + 8),
    ],
    label: 'font-weight: bold',
    color: '#F59E0B',
  });

  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await shot(page, 'appearance', 'style-bold-preview-plain', theme);
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePageScreenshots(page, theme) {
  await captureShowHideFields(page, theme);
  await capturePrefillStatic(page, theme);
  await captureLocalizationAuthors(page, theme);
  await captureFormWideSettings(page, theme);
  await captureStyleBold(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing page screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await capturePageScreenshots(page, theme);
  }

  await browser.close();
  console.log(`Page screenshots saved under ${assetsRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
