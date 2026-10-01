#!/usr/bin/env node
/**
 * Captures tables-and-repeaters guide screenshots.
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
const MUI_THEME_KEY = process.env.BUILDER_THEME_KEY ?? 'example-mui-theme';
const RSUITE_THEME_KEY = process.env.BUILDER_RSUITE_THEME_KEY ?? 'example-rsuite-theme';
const RSUITE_VIEW = process.env.BUILDER_RSUITE_VIEW ?? 'rsuite-inject-css';
const MUI_DB = 'example-mui-db';
const RSUITE_DB = 'form-builder-store';
const STORE_NAME = 'example-store';
const RSUITE_STORE = 'form-store';
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
}

/** @param {import('playwright').Page} page @param {'mui' | 'rsuite'} library @param {'light' | 'dark'} theme */
async function prepareBuilder(page, library, theme = 'light') {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate(
    ({viewKey, muiThemeKey, rsuiteThemeKey, view, themeValue}) => {
      localStorage.setItem(viewKey, view);
      localStorage.setItem(muiThemeKey, themeValue);
      localStorage.setItem(rsuiteThemeKey, themeValue);
    },
    {
      viewKey: VIEW_KEY,
      muiThemeKey: MUI_THEME_KEY,
      rsuiteThemeKey: RSUITE_THEME_KEY,
      view: library === 'rsuite' ? RSUITE_VIEW : 'mui',
      themeValue: theme,
    },
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

/** @param {import('playwright').Locator} locator @param {number} expected @param {string} description */
async function assertLocatorCount(locator, expected, description) {
  const actual = await locator.count();
  if (actual !== expected) {
    throw new Error(`${description}: expected ${expected}, received ${actual}`);
  }
}

/** @param {string} fileName */
function readGuideForm(fileName) {
  return JSON.parse(readFileSync(path.join(formsRoot, fileName), 'utf8'));
}

/** @param {import('playwright').Page} page @param {string} dbName @param {string} storeName @param {string} formName @param {object} formJson */
async function saveFormToIndexedDB(page, dbName, storeName, formName, formJson) {
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
    {db: dbName, store: storeName, name: formName, value: formValue},
  );
}

/** @param {import('playwright').Page} page @param {'mui' | 'rsuite'} library @param {string} formName @param {string} fixtureFile */
async function openGuideForm(page, library, formName, fixtureFile) {
  const dbName = library === 'rsuite' ? RSUITE_DB : MUI_DB;
  const storeName = library === 'rsuite' ? RSUITE_STORE : STORE_NAME;
  await saveFormToIndexedDB(page, dbName, storeName, formName, readGuideForm(fixtureFile));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const openItem = page.getByTestId(`form-list-open-item-${formName}`);
  if (await openItem.count()) {
    await openItem.click({force: true});
  } else {
    const fallback = library === 'rsuite' ? 'RSuiteForm' : 'MuiForm';
    await page.getByTestId(`form-list-open-item-${fallback}`).click({force: true});
  }
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureChoosePattern(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Repeater');
  await page.waitForTimeout(500);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-pattern-plain', theme);
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  const searchBox = await measureLocator(page.getByPlaceholder('Search'));
  const repeaterItem = page.getByTestId('Repeater-palette-component').first();
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
  if (await repeaterItem.count()) {
    const repeaterBox = await measureLocator(repeaterItem);
    zones.push({
      id: 3,
      label: 'Repeater',
      rect: [
        Math.round(repeaterBox.x - 4),
        Math.round(repeaterBox.y - 4),
        Math.round(repeaterBox.width + 8),
        Math.round(repeaterBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-pattern.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  await page.getByPlaceholder('Search').fill('');
  console.log('  pattern: Components + Repeater');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterPalette(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Repeater');
  await page.waitForTimeout(500);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-repeater-palette-plain', theme);
  const repeaterItem = page.getByTestId('Repeater-palette-component').first();
  if (await repeaterItem.count()) {
    const repeaterBox = await measureLocator(repeaterItem);
    annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-repeater-palette.${theme}.png`), [
      {
        id: 1,
        label: 'Repeater',
        rect: [
          Math.round(repeaterBox.x - 4),
          Math.round(repeaterBox.y - 4),
          Math.round(repeaterBox.width + 8),
          Math.round(repeaterBox.height + 8),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ], {noZoneLabels: true});
  }
  await page.getByPlaceholder('Search').fill('');
  console.log('  repeater step 1: palette');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterRowTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('lineItemRow').first().click({force: true});
  await page.waitForTimeout(500);
  await waitForToolbarHub(page);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-repeater-row-tree-plain', theme);
  const treeTab = await measureLocator(page.getByTestId('Tree_Tab'));
  const rowTestIds = ['lineItemsRepeater', 'lineItemRow', 'itemName', 'quantity', 'unitPrice', 'removeLineItem'];
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
  const rowCanvas = page.getByTestId('lineItemRow-editable-wrapper').first();
  if (await rowCanvas.count()) {
    const canvasBox = await measureLocator(rowCanvas);
    zones.push({
      id: zones.length + 1,
      label: 'Line item row canvas',
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
  annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-repeater-row-tree.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  console.log('  repeater step 3: row template tree');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterRemoveButton(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.getByTestId('removeLineItem').first().click({force: true});
  await waitForToolbarHub(page);
  await page.getByTestId('Actions_Tab').click({force: true});
  const removeAction = page.getByTestId('bound-action-onClick-common-removeRow');
  await removeAction.waitFor({state: 'visible', timeout: 10_000});
  await removeAction.getByRole('button', {name: 'Arguments'}).click();
  await removeAction.getByText('min', {exact: true}).waitFor({state: 'visible', timeout: 10_000});
  await page.waitForTimeout(300);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-repeater-remove-button-plain', theme);
  const removeButton = page.getByTestId('removeLineItem-editable-wrapper').first();
  const buttonBox = await measureLocator(removeButton);
  const actionBox = await measureLocator(removeAction);
  annotateZones(
    plainPath,
    path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-repeater-remove-button.${theme}.png`),
    [
      {
        id: 1,
        label: 'Remove line item',
        rect: [
          Math.round(buttonBox.x - 6),
          Math.round(buttonBox.y - 6),
          Math.round(buttonBox.width + 12),
          Math.round(buttonBox.height + 12),
        ],
        color: '#EF4444',
        showBadge: false,
      },
      {
        id: 2,
        label: 'removeRow',
        rect: [
          Math.round(actionBox.x - 6),
          Math.round(actionBox.y - 6),
          Math.round(actionBox.width + 12),
          Math.round(actionBox.height + 12),
        ],
        color: '#8B5CF6',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  );
  console.log('  repeater step 4: remove button inside row');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterCanvas(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.getByTestId('addLineItem').first().click({force: true});
  await waitForToolbarHub(page);
  await page.getByTestId('Actions_Tab').click({force: true});
  const addAction = page.getByTestId('bound-action-onClick-common-addRow');
  await addAction.waitFor({state: 'visible', timeout: 10_000});
  await addAction.getByRole('button', {name: 'Arguments'}).click();
  await addAction.getByText('dataKey', {exact: true}).waitFor({state: 'visible', timeout: 10_000});
  await page.waitForTimeout(300);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-repeater-canvas-plain', theme);
  const addButton = page.getByTestId('addLineItem-editable-wrapper').first();
  const buttonBox = await measureLocator(addButton);
  const actionBox = await measureLocator(addAction);
  annotateZones(
    plainPath,
    path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-repeater-canvas.${theme}.png`),
    [
      {
        id: 1,
        label: 'Add line item',
        rect: [
          Math.round(buttonBox.x - 6),
          Math.round(buttonBox.y - 6),
          Math.round(buttonBox.width + 12),
          Math.round(buttonBox.height + 12),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
      {
        id: 2,
        label: 'addRow',
        rect: [
          Math.round(actionBox.x - 6),
          Math.round(actionBox.y - 6),
          Math.round(actionBox.width + 12),
          Math.round(actionBox.height + 12),
        ],
        color: '#8B5CF6',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  );
  console.log('  repeater step 5: canvas with add button');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterTreeFinal(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-repeater-tree-final-plain', theme);
  copyFileSync(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-repeater-tree-final.${theme}.png`));
  console.log('  repeater step 6: final tree');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterPreview(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  const addButton = page.getByRole('button', {name: 'Add line item', exact: true});
  const itemNameFields = page.getByRole('textbox', {name: 'Item name', exact: true});
  const removeButtons = page.getByRole('button', {name: 'Remove line item', exact: true});

  await assertLocatorCount(addButton, 1, 'Add line item button count before adding rows');
  await assertLocatorCount(itemNameFields, 1, 'Item name field count before adding rows');
  await assertLocatorCount(removeButtons, 1, 'Remove line item button count before adding rows');

  await addButton.click({force: true});
  await page.waitForTimeout(300);
  await addButton.click({force: true});
  await page.waitForTimeout(300);
  await assertLocatorCount(itemNameFields, 3, 'Item name field count after adding two rows');
  await assertLocatorCount(removeButtons, 3, 'Remove line item button count after adding two rows');

  for (const [index, value] of ['Notebook', 'Keyboard', 'Monitor'].entries()) {
    await itemNameFields.nth(index).fill(value);
  }
  await removeButtons.nth(1).click({force: true});
  await page.waitForTimeout(400);
  await assertLocatorCount(itemNameFields, 2, 'Item name field count after removing the middle row');
  await assertLocatorCount(removeButtons, 2, 'Remove line item button count after removing the middle row');
  const itemNames = await itemNameFields.evaluateAll((inputs) => inputs.map((input) => input.value));
  if (itemNames.join('|') !== 'Notebook|Monitor') {
    throw new Error(`Removing the middle row kept unexpected item names: ${itemNames.join('|')}`);
  }

  await shot(page, 'fields-and-data', 'tables-repeaters-repeater-preview-plain', theme);
  await removeButtons.first().click({force: true});
  await page.waitForTimeout(300);
  await assertLocatorCount(itemNameFields, 1, 'Item name field count after removing down to the configured minimum');
  await removeButtons.first().click({force: true});
  await page.waitForTimeout(300);
  await assertLocatorCount(itemNameFields, 1, 'Item name field count after attempting to remove the final row');
  console.log('  repeater step 7: add, targeted remove, and minimum-row assertions');
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTableLibrary(page, theme) {
  await clickLeftTab(page, 'Components');
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-table-library-plain', theme);
  const librarySelect = page.locator('select[aria-label="Component library"]');
  const libraryBox = await measureLocator(librarySelect);
  annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-table-library.${theme}.png`), [
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
  console.log('  table: RSuite library');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTablePalette(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Table');
  await page.waitForTimeout(500);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-table-palette-plain', theme);
  const tableItem = page.getByTestId('RsTable-palette-component').first();
  if (await tableItem.count()) {
    const tableBox = await measureLocator(tableItem);
    annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-table-palette.${theme}.png`), [
      {
        id: 1,
        label: 'Table',
        rect: [
          Math.round(tableBox.x - 4),
          Math.round(tableBox.y - 4),
          Math.round(tableBox.width + 8),
          Math.round(tableBox.height + 8),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ], {noZoneLabels: true});
  }
  await page.getByPlaceholder('Search').fill('');
  console.log('  table step 1: palette');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTableTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-table-tree-plain', theme);
  const treeTab = await measureLocator(page.getByTestId('Tree_Tab'));
  const rowTestIds = [
    'teamTable',
    'nameColumn',
    'nameHeader',
    'departmentColumn',
    'emailColumn',
  ];
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
  annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-table-tree.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  console.log('  table step 2: column tree');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTableCanvas(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.waitForTimeout(300);
  const plainPath = await shot(page, 'fields-and-data', 'tables-repeaters-table-canvas-plain', theme);
  copyFileSync(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-tables-repeaters-table-canvas.${theme}.png`));
  console.log('  table step 3: canvas');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTablePreview(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await shot(page, 'fields-and-data', 'tables-repeaters-table-preview-plain', theme);
  console.log('  table preview');
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRepeaterWorkflow(page, theme) {
  await openGuideForm(page, 'mui', 'invoice-line-items', 'invoice-line-items.json');
  await captureChoosePattern(page, theme);
  await captureRepeaterPalette(page, theme);
  await captureRepeaterTreeFinal(page, theme);
  await captureRepeaterRowTree(page, theme);
  await captureRepeaterRemoveButton(page, theme);
  await captureRepeaterCanvas(page, theme);
  await captureRepeaterPreview(page, theme);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTableWorkflow(page, theme) {
  await openGuideForm(page, 'rsuite', 'team-directory-table', 'team-directory-table.json');
  await captureTableLibrary(page, theme);
  await captureTablePalette(page, theme);
  await captureTableTree(page, theme);
  await captureTableCanvas(page, theme);
  await captureTablePreview(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);

  for (const theme of THEMES) {
    console.log(`Capturing tables-and-repeaters screenshots (${theme})...`);
    await prepareBuilder(page, 'mui', theme);
    await captureRepeaterWorkflow(page, theme);
    await prepareBuilder(page, 'rsuite', theme);
    await captureTableWorkflow(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'fields-and-data')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
