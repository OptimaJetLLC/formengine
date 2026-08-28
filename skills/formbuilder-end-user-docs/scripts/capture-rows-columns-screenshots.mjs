#!/usr/bin/env node
/**
 * Captures rows-columns-and-grids guide screenshots.
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
async function openShippingForm(page) {
  await saveFormToIndexedDB(page, 'shipping-columns', readGuideForm('shipping-columns.json'));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const openItem = page.getByTestId('form-list-open-item-shipping-columns');
  if (await openItem.count()) {
    await openItem.click({force: true});
  } else {
    await page.getByTestId('form-list-open-item-MuiForm').click({force: true});
  }
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/** @param {import('playwright').Page} page @param {'desktop' | 'mobile' | 'tablet'} mode */
async function clickDeviceMode(page, mode) {
  const index = {desktop: 0, mobile: 1, tablet: 2}[mode];
  const button = page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(index);
  await button.click({force: true});
  await page.waitForTimeout(500);
}

/** @param {import('playwright').Page} page @param {'desktop' | 'mobile' | 'tablet'} mode */
async function measureDeviceButton(page, mode) {
  const index = {desktop: 0, mobile: 1, tablet: 2}[mode];
  return measureLocator(page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(index));
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePalette(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Stack');
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'structure', 'rows-columns-palette-plain', theme);
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  const searchBox = await measureLocator(page.getByPlaceholder('Search'));
  const stackItem = page.getByTestId('MuiStack-palette-component').first();
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
  if (await stackItem.count()) {
    const stackBox = await measureLocator(stackItem);
    zones.push({
      id: 3,
      label: 'Stack',
      rect: [
        Math.round(stackBox.x - 4),
        Math.round(stackBox.y - 4),
        Math.round(stackBox.width + 8),
        Math.round(stackBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-rows-columns-palette.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  await page.getByPlaceholder('Search').fill('');
  console.log('  palette: Components tab + Stack search');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCanvas(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.waitForTimeout(300);
  const plainPath = await shot(page, 'structure', 'rows-columns-canvas-plain', theme);
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-rows-columns-canvas.${theme}.png`), [
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
  console.log('  canvas: Components tab');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'structure', 'rows-columns-tree-final-plain', theme);
  const treeTab = await measureLocator(page.getByTestId('Tree_Tab'));
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
  const rowTestIds = ['nameRow', 'firstName', 'lastName', 'cityRow', 'city', 'state'];
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
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-rows-columns-tree-final.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  console.log('  tree: Tree tab + hierarchy');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePreviewModes(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);

  await clickDeviceMode(page, 'desktop');
  const desktopPlain = await shot(page, 'structure', 'rows-columns-preview-desktop-plain', theme);
  const desktopButton = await measureDeviceButton(page, 'desktop');
  annotateArrow(
    desktopPlain,
    path.join(assetsRoot, 'structure', `highlight-rows-columns-preview-desktop.${theme}.png`),
    visibleArrowToBox(desktopButton),
  );
  console.log('  preview desktop + Desktop button arrow');

  await clickDeviceMode(page, 'mobile');
  await page.waitForTimeout(600);
  const mobilePlain = await shot(page, 'structure', 'rows-columns-preview-mobile-plain', theme);
  const mobileButton = await measureDeviceButton(page, 'mobile');
  annotateArrow(
    mobilePlain,
    path.join(assetsRoot, 'structure', `highlight-rows-columns-preview-mobile.${theme}.png`),
    visibleArrowToBox(mobileButton),
  );
  console.log('  preview mobile + Mobile button arrow');

  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRowsColumns(page, theme) {
  await openShippingForm(page);
  await capturePalette(page, theme);
  await captureCanvas(page, theme);
  await captureTree(page, theme);
  await capturePreviewModes(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing rows-columns-and-grids screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureRowsColumns(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'structure')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
