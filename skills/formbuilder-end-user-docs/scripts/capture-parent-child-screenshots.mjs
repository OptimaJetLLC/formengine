#!/usr/bin/env node
/**
 * Captures parent-and-child-in-tree guide screenshots.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateZones} from './measure-workspace-layout.mjs';

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

/**
 * @param {import('playwright').Page} page
 * @param {string} formFile
 */
async function openGuideForm(page, formFile) {
  const formName = path.basename(formFile, '.json');
  await saveFormToIndexedDB(page, formName, readGuideForm(formFile));
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

/** @param {import('playwright').Page} page */
async function expandTree(page) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {string} treeTestId
 */
async function selectTreeComponent(page, treeTestId) {
  await page.getByTestId(treeTestId).first().click({force: true});
  await page.waitForTimeout(500);
}

/**
 * @param {import('playwright').Page} page
 * @param {string} sourceTestId
 * @param {string} targetTestId
 */
async function dragTreeRow(page, sourceTestId, targetTestId) {
  await page.getByTestId(sourceTestId).first().dragTo(page.getByTestId(targetTestId).first(), {
    force: true,
    targetPosition: {x: 8, y: 8},
  });
  await page.waitForTimeout(900);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} plainBasename
 * @param {string} outputBasename
 * @param {Array<{treeTestId: string, canvasTestId?: string, color: string}>} highlights
 */
async function captureTreeCanvasHighlight(page, theme, plainBasename, outputBasename, highlights) {
  const plainPath = await shot(page, 'structure', plainBasename, theme);
  const zones = [];
  for (let index = 0; index < highlights.length; index++) {
    const {treeTestId, canvasTestId, color} = highlights[index];
    const treeRow = page.getByTestId(treeTestId).first();
    const treeBox = await measureLocator(treeRow);
    zones.push({
      id: zones.length + 1,
      label: treeTestId,
      rect: [
        Math.round(treeBox.x - 4),
        Math.round(treeBox.y - 2),
        Math.round(treeBox.width + 200),
        Math.round(treeBox.height + 4),
      ],
      color,
      showBadge: false,
    });
    if (canvasTestId) {
      const canvas = page.getByTestId(canvasTestId).first();
      const canvasBox = await measureLocator(canvas);
      zones.push({
        id: zones.length + 1,
        label: canvasTestId,
        rect: [
          Math.round(canvasBox.x - 6),
          Math.round(canvasBox.y - 6),
          Math.round(canvasBox.width + 12),
          Math.round(canvasBox.height + 12),
        ],
        color: color === '#3B82F6' ? '#F59E0B' : '#3B82F6',
        showBadge: false,
      });
    }
  }
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `${outputBasename}.${theme}.png`), zones, {
    noZoneLabels: true,
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureParentSelection(page, theme) {
  await openGuideForm(page, 'event-registration.json');
  await expandTree(page);
  await selectTreeComponent(page, 'contactSection');
  await captureTreeCanvasHighlight(page, theme, 'parent-child-parent-plain', 'highlight-parent-child-parent', [
    {treeTestId: 'contactSection', canvasTestId: 'contactSection-editable-wrapper', color: '#3B82F6'},
  ]);
  console.log('  parent selection: Contact section');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureChildSelection(page, theme) {
  await openGuideForm(page, 'event-registration.json');
  await expandTree(page);
  await selectTreeComponent(page, 'email');
  await captureTreeCanvasHighlight(page, theme, 'parent-child-child-plain', 'highlight-parent-child-child', [
    {treeTestId: 'email', canvasTestId: 'email-editable-wrapper', color: '#3B82F6'},
  ]);
  console.log('  child selection: Email');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureMoveField(page, theme) {
  await openGuideForm(page, 'event-registration-misplaced-phone.json');
  await expandTree(page);
  await dragTreeRow(page, 'phone', 'fullName');
  await selectTreeComponent(page, 'phone');
  await captureTreeCanvasHighlight(page, theme, 'parent-child-move-plain', 'highlight-parent-child-move', [
    {treeTestId: 'phone', canvasTestId: 'phone-editable-wrapper', color: '#3B82F6'},
    {treeTestId: 'contactStack', color: '#22C55E'},
  ]);
  console.log('  move field: Phone dragged into Contact stack');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureEditChild(page, theme) {
  await openGuideForm(page, 'event-registration.json');
  await expandTree(page);
  await selectTreeComponent(page, 'email');
  await clickRightTab(page, 'Main');
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'structure', 'parent-child-edit-plain', theme);
  const treeBox = await measureLocator(page.getByTestId('email').first());
  const keyBox = await measureLocator(page.locator('[data-testid="key-labeled-wrapper"]').first());
  const labelBox = await measureLocator(page.locator('[data-testid="label-labeled-wrapper"]').first());
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-parent-child-edit.${theme}.png`), [
    {
      id: 1,
      label: 'Email',
      rect: [
        Math.round(treeBox.x - 4),
        Math.round(treeBox.y - 2),
        Math.round(treeBox.width + 200),
        Math.round(treeBox.height + 4),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Key',
      rect: [
        Math.round(keyBox.x - 4),
        Math.round(keyBox.y - 4),
        Math.round(keyBox.width + 8),
        Math.round(keyBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
    {
      id: 3,
      label: 'Label',
      rect: [
        Math.round(labelBox.x - 4),
        Math.round(labelBox.y - 4),
        Math.round(labelBox.width + 8),
        Math.round(labelBox.height + 8),
      ],
      color: '#22C55E',
      showBadge: false,
    },
  ], {noZoneLabels: true});
  console.log('  edit child: Email Key and Label');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureParentChildScreenshots(page, theme) {
  await captureParentSelection(page, theme);
  await captureChildSelection(page, theme);
  await captureMoveField(page, theme);
  await captureEditChild(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing parent-and-child-in-tree screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureParentChildScreenshots(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'structure')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
