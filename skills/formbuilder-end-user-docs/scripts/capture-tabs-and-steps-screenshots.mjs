#!/usr/bin/env node
/**
 * Captures tabs-and-steps guide screenshots using RSuite Tab components.
 * Requires a running example builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync, copyFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateZones, waitForToolbarHub} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name';
const THEME_KEY = process.env.BUILDER_RSUITE_THEME_KEY ?? 'example-rsuite-theme';
const RSUITE_VIEW = process.env.BUILDER_RSUITE_VIEW ?? 'rsuite-inject-css';
const DB_NAME = 'form-builder-store';
const STORE_NAME = 'form-store';
const FORM_NAME = 'employee-onboarding-tabs';
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
}

/** @param {import('playwright').Page} page */
async function prepareBuilder(page) {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate(
    ({viewKey, themeKey, view, theme}) => {
      localStorage.setItem(viewKey, view);
      localStorage.setItem(themeKey, theme);
    },
    {viewKey: VIEW_KEY, themeKey: THEME_KEY, view: RSUITE_VIEW, theme: 'light'},
  );
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForSelector('select[aria-label="Component library"]', {timeout: 60_000});
  await page.waitForTimeout(600);
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
async function openOnboardingForm(page) {
  await saveFormToIndexedDB(page, FORM_NAME, readGuideForm('employee-onboarding-tabs.json'));
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
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureLibraryPicker(page, theme) {
  await clickLeftTab(page, 'Components');
  const plainPath = await shot(page, 'structure', 'tabs-sections-library-plain', theme);
  const librarySelect = page.locator('select[aria-label="Component library"]');
  const libraryBox = await measureLocator(librarySelect);
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-tabs-sections-library.${theme}.png`), [
    {
      id: 1,
      label: 'RSuite UI',
      rect: [
        Math.round(libraryBox.x - 6),
        Math.round(libraryBox.y - 4),
        Math.round(libraryBox.width + 12),
        Math.round(libraryBox.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
  ], {noZoneLabels: true});
  console.log('  library: RSuite UI selected in top menu');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePalette(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Tab');
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'structure', 'tabs-sections-palette-plain', theme);
  const searchBox = await measureLocator(page.getByPlaceholder('Search'));
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  const tabItem = page.getByTestId('RsTab-palette-component').first();
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
    {
      id: 2,
      label: 'Search',
      rect: [
        Math.round(searchBox.x - 4),
        Math.round(searchBox.y - 4),
        Math.round(searchBox.width + 8),
        Math.round(searchBox.height + 8),
      ],
      color: '#8B5CF6',
      showBadge: false,
    },
  ];
  if (await tabItem.count()) {
    const tabBox = await measureLocator(tabItem);
    zones.push({
      id: 3,
      label: 'Tab',
      rect: [
        Math.round(tabBox.x - 4),
        Math.round(tabBox.y - 4),
        Math.round(tabBox.width + 8),
        Math.round(tabBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-tabs-sections-palette.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  await page.getByPlaceholder('Search').fill('');
  console.log('  palette: Components tab + Tab');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureProfilePaneTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('profilePane').first().click({force: true});
  await page.waitForTimeout(500);
  await waitForToolbarHub(page);

  const plainPath = await shot(page, 'structure', 'tabs-sections-personal-tree-plain', theme);
  const treeTab = await measureLocator(page.getByTestId('Tree_Tab'));
  const rowTestIds = ['onboardingTabs', 'profilePane', 'fullName', 'workEmail', 'phone'];
  const zones = [
    {
      id: 1,
      label: 'Tree',
      rect: [
        Math.round(treeTab.x - 4),
        Math.round(treeTab.y - 4),
        Math.round(treeTab.width + 8),
        Math.round(treeTab.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
  ];
  for (let index = 0; index < rowTestIds.length; index++) {
    const testId = rowTestIds[index];
    const row = page.getByTestId(testId).first();
    if (!(await row.count())) {
      continue;
    }
    const box = await measureLocator(row);
    zones.push({
      id: zones.length + 1,
      label: testId,
      rect: [
        Math.round(box.x - 4),
        Math.round(box.y - 2),
        Math.round(box.width + 200),
        Math.round(box.height + 4),
      ],
      color: index % 2 === 0 ? '#F59E0B' : '#22C55E',
      showBadge: false,
    });
  }
  const paneCanvas = page.getByTestId('profilePane-editable-wrapper').first();
  if (await paneCanvas.count()) {
    const canvasBox = await measureLocator(paneCanvas);
    zones.push({
      id: zones.length + 1,
      label: 'Profile pane canvas',
      rect: [
        Math.round(canvasBox.x - 6),
        Math.round(canvasBox.y - 6),
        Math.round(canvasBox.width + 12),
        Math.round(canvasBox.height + 12),
      ],
      color: '#8B5CF6',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-tabs-sections-personal-tree.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  console.log('  profile pane: Tree tab + nested fields');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCanvas(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.waitForTimeout(300);
  const plainPath = await shot(page, 'structure', 'tabs-sections-canvas-plain', theme);
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-tabs-sections-canvas.${theme}.png`), [
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
  ], {noZoneLabels: true});
  console.log('  canvas: Components tab + onboarding tabs');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFullTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'structure', 'tabs-sections-tree-final-plain', theme);
  const highlightPath = path.join(assetsRoot, 'structure', `highlight-tabs-sections-tree-final.${theme}.png`);
  copyFileSync(plainPath, highlightPath);
  console.log('  final tree: full component hierarchy (no left-panel highlights)');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePreview(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await shot(page, 'structure', 'tabs-sections-preview-plain', theme);
  console.log('  preview: employee onboarding tabs');
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTabsAndSteps(page, theme) {
  await openOnboardingForm(page);
  await captureLibraryPicker(page, theme);
  await capturePalette(page, theme);
  await captureFullTree(page, theme);
  await captureProfilePaneTree(page, theme);
  await captureCanvas(page, theme);
  await capturePreview(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing tabs-and-steps screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureTabsAndSteps(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'structure')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
