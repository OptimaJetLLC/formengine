#!/usr/bin/env node
/**
 * Captures static-vs-dynamic-content screenshots:
 * - Static: MUI Select on Main with Items array editor highlighted
 * - Dynamic: RSuite dropdown with onLoadData → loadData (docs example form)
 *
 * Requires a running example-builder at localhost:5173.
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
const THEMES = ['light', 'dark'];
/** example-builder RSuite IndexedDB (see example-builder/src/RSuiteBuilder.tsx) */
const RSUITE_DB = {dbName: 'form-builder-store', storeName: 'form-store'};

/** @param {string} formFile @param {string} [view] */
function formUrl(formFile, view = 'mui') {
  const name = formFile.replace(/\.json$/i, '');
  const jsonText = readFileSync(path.join(formsRoot, `${name}.json`), 'utf8');
  const body = Buffer.from(JSON.stringify(JSON.parse(jsonText)), 'utf8').toString('base64url');
  const url = new URL(BUILDER_URL);
  url.searchParams.set('formBody', body);
  url.searchParams.set('formName', name);
  url.searchParams.set('view', view);
  return url.toString();
}

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove()).catch(() => {});
}

/**
 * @param {import('playwright').Page} page
 * @param {string} formName
 * @param {string} formJson
 * @param {{ dbName: string, storeName: string }} db
 */
async function saveFormToIndexedDb(page, formName, formJson, db) {
  await page.evaluate(
    async ({dbName, storeName, name, value}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          if (!database.objectStoreNames.contains(storeName)) {
            database.close();
            reject(new Error(`Object store "${storeName}" not found in ${dbName}`));
            return;
          }
          const tx = database.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).put(value, name);
          tx.oncomplete = () => {
            database.close();
            resolve(undefined);
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    {dbName: db.dbName, storeName: db.storeName, name: formName, value: formJson},
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} formFile
 */
async function gotoMuiForm(page, theme, formFile) {
  await page.goto(formUrl(formFile, 'mui'), {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(700);
}

/**
 * example-builder RSuite does not honor formBody; open via IndexedDB + Forms list.
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} formFile
 */
async function gotoRsuiteGuideForm(page, theme, formFile) {
  const formName = formFile.replace(/\.json$/i, '');
  const formJson = JSON.stringify(JSON.parse(readFileSync(path.join(formsRoot, `${formName}.json`), 'utf8')));

  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'rsuite-inject-css');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(800);

  await saveFormToIndexedDb(page, formName, formJson, RSUITE_DB);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(600);

  await clickLeftTab(page, 'Forms');
  await page.getByTestId(`form-list-open-item-${formName}`).click({force: true});
  await page.waitForTimeout(900);
  await dismissViteOverlay(page);
}

/** @param {import('playwright').Page} page @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = path.join(assetsRoot, section);
  await mkdir(dir, {recursive: true});
  const filePath = path.join(dir, `${basename}.${theme}.png`);
  await page.screenshot({path: filePath, fullPage: false});
  return filePath;
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
 * @param {{ x: number, y: number, width: number, height: number }} a
 * @param {{ x: number, y: number, width: number, height: number }} b
 */
function unionBoxes(a, b) {
  const left = Math.min(a.x, b.x);
  const top = Math.min(a.y, b.y);
  const right = Math.max(a.x + a.width, b.x + b.width);
  const bottom = Math.max(a.y + a.height, b.y + b.height);
  return {x: left, y: top, width: right - left, height: bottom - top};
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickLeftTab(page, name) {
  await dismissViteOverlay(page);
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(300);
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
  await page.waitForTimeout(300);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureStaticSelectItems(page, theme) {
  await gotoMuiForm(page, theme, 'static-select-options');
  await selectTreeItem(page, 'country');
  await clickRightTab(page, 'Main');

  const itemsWrapper = page.getByTestId('items-labeled-wrapper');
  await itemsWrapper.waitFor({state: 'visible', timeout: 10_000});
  await itemsWrapper.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const arrayTable = page.locator('.rs-table').first();
  await arrayTable.waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'data-driven', 'static-select-items-plain', theme);
  const labelBox = await measureLocator(itemsWrapper);
  const tableBox = await measureLocator(arrayTable);
  const block = unionBoxes(labelBox, tableBox);

  annotateZones(plainPath, path.join(assetsRoot, 'data-driven', `highlight-static-select-items.${theme}.png`), [
    {
      id: 1,
      label: 'Items',
      rect: [
        Math.round(block.x - 6),
        Math.round(block.y - 6),
        Math.round(block.width + 12),
        Math.round(block.height + 12),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ]);
  console.log(`static-select-items ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureDynamicDropdownActions(page, theme) {
  await gotoRsuiteGuideForm(page, theme, 'dynamic-dropdown-names');
  await selectTreeItem(page, 'name');
  await clickRightTab(page, 'Actions');

  const onLoadHeading = page.getByText('onLoadData', {exact: true}).first();
  await onLoadHeading.waitFor({state: 'visible', timeout: 10_000});
  await onLoadHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const loadDataRow = page.getByText('loadData', {exact: true}).first();
  await loadDataRow.waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'data-driven', 'dynamic-dropdown-onload-plain', theme);
  const headingBox = await measureLocator(onLoadHeading);
  const actionBox = await measureLocator(loadDataRow);
  let rect = unionBoxes(headingBox, actionBox);

  const addAction = page.getByText('Add an action', {exact: true}).first();
  if (await addAction.count()) {
    const addBox = await measureLocator(addAction);
    if (Math.abs(addBox.y - rect.y) < 140) {
      rect = unionBoxes(rect, addBox);
    }
  }

  annotateZones(plainPath, path.join(assetsRoot, 'data-driven', `highlight-dynamic-dropdown-onload.${theme}.png`), [
    {
      id: 1,
      label: 'onLoadData',
      rect: [
        Math.round(rect.x - 8),
        Math.round(rect.y - 8),
        Math.round(Math.max(rect.width, 280) + 16),
        Math.round(rect.height + 16),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
  ]);
  console.log(`dynamic-dropdown-onload ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureStaticSelectItems(page, theme);
    await captureDynamicDropdownActions(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
