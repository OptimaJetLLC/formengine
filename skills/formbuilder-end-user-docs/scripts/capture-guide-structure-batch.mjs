#!/usr/bin/env node
/**
 * Captures structure, fields, and manage-forms guide screenshots.
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
const PRESET_NAME = 'Address block';

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

/** @param {import('playwright').Page} page @param {number} offsetIndex */
async function clickHeaderIconAfterPreview(page, offsetIndex) {
  const preview = page.getByRole('button', {name: /^(Preview|Edit)$/});
  const box = await preview.boundingBox();
  if (!box) {
    throw new Error('Preview/Edit button not found');
  }
  const x = box.x + box.width + 28 + offsetIndex * 30;
  await page.mouse.click(x, box.y + box.height / 2);
  await page.waitForTimeout(500);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} plainPath
 * @param {string} outputBasename
 * @param {string} searchTerm
 * @param {string} paletteTestId
 */
async function capturePaletteSearchHighlight(page, theme, plainPath, outputBasename, searchTerm, paletteTestId) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill(searchTerm);
  await page.waitForTimeout(500);
  const item = page.getByTestId(paletteTestId).first();
  if (await item.count()) {
    await item.waitFor({state: 'visible', timeout: 10000});
  }
  // Keep tooltips from covering the search hit before the plain capture.
  await page.mouse.move(700, 400);
  await page.waitForTimeout(200);
  // Plain source must include the filled search + filtered result.
  await page.screenshot({path: plainPath, fullPage: false});

  const searchBox = await measureLocator(page.getByPlaceholder('Search'));
  const zones = [
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
      showBadge: false,
    },
  ];
  if (await item.count()) {
    const itemBox = await measureLocator(item);
    zones.push({
      id: 2,
      label: searchTerm,
      rect: [
        Math.round(itemBox.x - 4),
        Math.round(itemBox.y - 4),
        Math.round(itemBox.width + 8),
        Math.round(itemBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(path.dirname(plainPath), `${outputBasename}.${theme}.png`), zones);
  await page.getByPlaceholder('Search').fill('');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string[]} rowTestIds
 * @param {string} basename
 */
async function captureTreeStructureHighlight(page, theme, rowTestIds, basename) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);
  const plainPath = await shot(page, 'structure', `${basename}-plain`, theme);
  const zones = [];
  for (let index = 0; index < rowTestIds.length; index++) {
    const testId = rowTestIds[index];
    const row = page.getByTestId(testId).first();
    if (!(await row.count())) {
      continue;
    }
    const box = await measureLocator(row);
    zones.push({
      id: index + 1,
      label: testId,
      rect: [
        Math.round(box.x - 4),
        Math.round(box.y - 2),
        Math.round(box.width + 200),
        Math.round(box.height + 4),
      ],
      color: index % 2 === 0 ? '#3B82F6' : '#F59E0B',
      showBadge: zones.length < 4,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-${basename}.${theme}.png`), zones, {
    noZoneLabels: true,
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureContainers(page, theme) {
  // Step 1 starts from an empty form; search Card in Components before building sections.
  await openGuideForm(page, 'add-fields-empty');
  const palettePlain = await shot(page, 'structure', 'containers-palette-plain', theme);
  await capturePaletteSearchHighlight(
    page,
    theme,
    palettePlain,
    'highlight-containers-palette',
    'Card',
    'MuiCard-palette-component',
  );
  await openGuideForm(page, 'event-registration');
  await shot(page, 'structure', 'containers-canvas-plain', theme);
  await captureTreeStructureHighlight(page, theme, [
    'contactSection',
    'contactStack',
    'fullName',
    'ticketSection',
    'ticketStack',
  ], 'containers-tree-final');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureRowsColumns(page, theme) {
  await openGuideForm(page, 'shipping-columns');
  const palettePlain = await shot(page, 'structure', 'rows-columns-palette-plain', theme);
  await capturePaletteSearchHighlight(
    page,
    theme,
    palettePlain,
    'highlight-rows-columns-palette',
    'Stack',
    'MuiStack-palette-component',
  );
  await shot(page, 'structure', 'rows-columns-canvas-plain', theme);
  await captureTreeStructureHighlight(page, theme, ['nameRow', 'firstName', 'lastName', 'cityRow', 'city', 'state'], 'rows-columns-tree-final');

  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await clickHeaderIconAfterPreview(page, 0);
  const desktopPlain = await shot(page, 'structure', 'rows-columns-preview-desktop-plain', theme);
  await clickHeaderIconAfterPreview(page, 1);
  await page.waitForTimeout(600);
  const mobilePlain = await shot(page, 'structure', 'rows-columns-preview-mobile-plain', theme);

  const previewButton = page.getByRole('button', {name: /^(Preview|Edit)$/});
  const previewBox = await measureLocator(previewButton);
  const deviceSelectorX = previewBox.x + previewBox.width + 28;
  annotateZones(
    mobilePlain,
    path.join(assetsRoot, 'structure', `highlight-rows-columns-device-modes.${theme}.png`),
    [
      {
        id: 1,
        label: 'Device modes',
        rect: [
          Math.round(deviceSelectorX - 8),
          Math.round(previewBox.y - 6),
          Math.round(96),
          Math.round(previewBox.height + 12),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  );
  annotateArrow(
    desktopPlain,
    path.join(assetsRoot, 'structure', `highlight-rows-columns-device-selector.${theme}.png`),
    visibleArrowToBox({
      x: deviceSelectorX,
      y: previewBox.y,
      width: 96,
      height: previewBox.height,
    }),
  );

  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSpacing(page, theme) {
  await openGuideForm(page, 'spacing-loose');
  await selectTreeItem(page, 'looseStack');
  await page.getByTestId('companyName-editable-wrapper').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const canvasPlain = await shot(page, 'structure', 'spacing-canvas-plain', theme);
  const companyBox = await measureLocator(page.getByTestId('companyName-editable-wrapper'));
  const departmentBox = await measureLocator(page.getByTestId('department-editable-wrapper'));
  const roleBox = await measureLocator(page.getByTestId('role-editable-wrapper'));
  annotateZones(canvasPlain, path.join(assetsRoot, 'structure', `highlight-spacing-canvas.${theme}.png`), [
    {
      id: 1,
      label: 'Company name',
      rect: [
        Math.round(companyBox.x - 6),
        Math.round(companyBox.y - 6),
        Math.round(companyBox.width + 12),
        Math.round(companyBox.height + 12),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Department',
      rect: [
        Math.round(departmentBox.x - 6),
        Math.round(departmentBox.y - 6),
        Math.round(departmentBox.width + 12),
        Math.round(departmentBox.height + 12),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
    {
      id: 3,
      label: 'Role',
      rect: [
        Math.round(roleBox.x - 6),
        Math.round(roleBox.y - 6),
        Math.round(roleBox.width + 12),
        Math.round(roleBox.height + 12),
      ],
      color: '#10B981',
      showBadge: false,
    },
  ], {noZoneLabels: true});

  await clickRightTab(page, 'Main');
  await page.waitForTimeout(300);
  const mainPlain = await shot(page, 'structure', 'spacing-main-plain', theme);
  const spacingWrapper = page.locator('[data-testid="spacing-labeled-wrapper"]').first();
  const spacingBox = await measureLocator(spacingWrapper);
  annotateZones(mainPlain, path.join(assetsRoot, 'structure', `highlight-spacing-properties.${theme}.png`), [
    {
      id: 1,
      label: 'Spacing',
      rect: [
        Math.round(spacingBox.x - 4),
        Math.round(spacingBox.y - 4),
        Math.round(spacingBox.width + 8),
        Math.round(spacingBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneLabels: true});

  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await shot(page, 'structure', 'spacing-preview-plain', theme);
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTabsSections(page, theme) {
  await openGuideForm(page, 'checkout-sections');
  const palettePlain = await shot(page, 'structure', 'tabs-sections-palette-plain', theme);
  await capturePaletteSearchHighlight(
    page,
    theme,
    palettePlain,
    'highlight-tabs-sections-palette',
    'Card',
    'MuiCard-palette-component',
  );
  await shot(page, 'structure', 'tabs-sections-canvas-plain', theme);
  await captureTreeStructureHighlight(page, theme, [
    'personalSection',
    'personalStack',
    'billingSection',
    'reviewSection',
  ], 'tabs-sections-tree-final');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await shot(page, 'structure', 'tabs-sections-preview-plain', theme);
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {string} propertyKey
 * @param {string} value
 */
async function fillMainStringProperty(page, propertyKey, value) {
  const wrapper = page.locator(`[data-testid="${propertyKey}-labeled-wrapper"]`);
  await wrapper.waitFor({state: 'visible', timeout: 15_000});
  const input = wrapper.locator('input, textarea').first();
  if (await input.count()) {
    await input.fill(value);
    return;
  }
  const rsInput = wrapper.locator('.rs-input input').first();
  if (await rsInput.count()) {
    await rsInput.fill(value);
    return;
  }
  throw new Error(`Could not find input for property: ${propertyKey}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureLabelsHelp(page, theme) {
  await openGuideForm(page, 'labels-demo');
  await selectTreeItem(page, 'workEmail');
  await clickRightTab(page, 'Main');
  await page.waitForTimeout(500);

  await fillMainStringProperty(page, 'label', 'Business email');
  await fillMainStringProperty(page, 'helperText', 'Use your work address.');
  await page.waitForTimeout(300);

  const mainPlain = await shot(page, 'fields-and-data', 'labels-main-plain', theme);
  const labelBox = await measureLocator(page.locator('[data-testid="label-labeled-wrapper"]').first());
  const helperBox = await measureLocator(page.locator('[data-testid="helperText-labeled-wrapper"]').first());
  annotateZones(mainPlain, path.join(assetsRoot, 'fields-and-data', `highlight-labels-main.${theme}.png`), [
    {
      id: 1,
      label: 'Label',
      rect: [
        Math.round(labelBox.x - 4),
        Math.round(labelBox.y - 4),
        Math.round(labelBox.width + 8),
        Math.round(labelBox.height + 8),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Helper text',
      rect: [
        Math.round(helperBox.x - 4),
        Math.round(helperBox.y - 4),
        Math.round(helperBox.width + 8),
        Math.round(helperBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneLabels: true});

  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  const previewPlain = await shot(page, 'fields-and-data', 'labels-preview-plain', theme);
  const labelOnCanvas = page.getByText('Business email', {exact: true}).first();
  if (await labelOnCanvas.count()) {
    const labelCanvasBox = await measureLocator(labelOnCanvas);
    annotateHighlight(previewPlain, path.join(assetsRoot, 'fields-and-data', `highlight-labels-preview.${theme}.png`), {
      rect: [
        Math.round(labelCanvasBox.x - 8),
        Math.round(labelCanvasBox.y - 8),
        Math.round(labelCanvasBox.width + 16),
        Math.round(labelCanvasBox.height + 40),
      ],
      label: 'Label in Preview',
      color: '#3B82F6',
    });
  }
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureParentChild(page, theme) {
  await openGuideForm(page, 'event-registration');
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('email').first().click({force: true});
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'structure', 'parent-child-tree-plain', theme);
  const treeRowBox = await measureLocator(page.getByTestId('email').first());
  const canvasBox = await measureLocator(page.getByTestId('email-editable-wrapper').first());
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-parent-child-tree.${theme}.png`), [
    {
      id: 1,
      label: 'Tree row',
      rect: [
        Math.round(treeRowBox.x - 4),
        Math.round(treeRowBox.y - 2),
        Math.round(treeRowBox.width + 180),
        Math.round(treeRowBox.height + 4),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Canvas selection',
      rect: [
        Math.round(canvasBox.x - 6),
        Math.round(canvasBox.y - 6),
        Math.round(canvasBox.width + 12),
        Math.round(canvasBox.height + 12),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneLabels: true});
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureMultipleForms(page, theme) {
  await saveFormToIndexedDB(page, 'EventRegistration', readGuideForm('event-registration.json'));
  await saveFormToIndexedDB(page, 'ShippingColumns', readGuideForm('shipping-columns.json'));
  await saveFormToIndexedDB(page, 'FeedbackSurvey', readGuideForm('feedback-survey.json'));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  await page.waitForTimeout(600);

  const listPlain = await shot(page, 'manage-forms', 'forms-list-multiple-plain', theme);
  const editBox = await measureLocator(
    page.locator('[data-testid="form-list-item-EventRegistration"] button').first(),
  );
  const removeBox = await measureLocator(
    page.locator('[data-testid="form-list-item-FeedbackSurvey"] button').nth(1),
  );
  annotateZones(listPlain, path.join(assetsRoot, 'manage-forms', `highlight-forms-list-multiple.${theme}.png`), [
    {
      id: 1,
      label: 'EventRegistration',
      rect: [
        Math.round((await measureLocator(page.locator('[data-testid="form-list-item-EventRegistration"]').first())).x - 4),
        Math.round((await measureLocator(page.locator('[data-testid="form-list-item-EventRegistration"]').first())).y - 2),
        Math.round((await measureLocator(page.locator('[data-testid="form-list-item-EventRegistration"]').first())).width + 8),
        Math.round((await measureLocator(page.locator('[data-testid="form-list-item-EventRegistration"]').first())).height + 4),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
  ], {noZoneLabels: true});

  const editPlain = await shot(page, 'manage-forms', 'forms-edit-button-plain', theme);
  annotateArrow(
    editPlain,
    path.join(assetsRoot, 'manage-forms', `highlight-forms-edit-button.${theme}.png`),
    visibleArrowToBox(editBox),
  );

  const removePlain = await shot(page, 'manage-forms', 'forms-remove-button-plain', theme);
  annotateArrow(
    removePlain,
    path.join(assetsRoot, 'manage-forms', `highlight-forms-remove-button.${theme}.png`),
    visibleArrowToBox(removeBox),
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureMenuHighlights(page, theme) {
  const menuItems = [
    {item: 'save', basename: 'header-menu-save'},
    {item: 'download', basename: 'header-menu-download'},
    {item: 'exportForms', basename: 'header-menu-export-forms'},
    {item: 'importForms', basename: 'header-menu-import-forms'},
    {item: 'upload', basename: 'header-menu-upload'},
    {item: 'saveAs', basename: 'header-menu-save-as'},
    {item: 'clear', basename: 'header-menu-clear'},
    {item: 'print', basename: 'header-menu-print'},
  ];
  for (const {item, basename} of menuItems) {
    await openMainMenu(page);
    const plainPath = await shot(page, 'manage-forms', `${basename}-plain`, theme);
    await annotateSingleHeaderMenuItem(page, theme, plainPath, item);
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);
  }
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePresetWorkflow(page, theme) {
  await page.evaluate((presetName) => {
    const presets = JSON.parse(localStorage.getItem('presetComponents') ?? '{}');
    for (const key of Object.keys(presets)) {
      if (key === presetName) {
        delete presets[key];
      }
    }
    localStorage.setItem('presetComponents', JSON.stringify(presets));
  }, PRESET_NAME);

  await openGuideForm(page, 'preset-address');
  await clickLeftTab(page, 'Components');
  await page.getByTestId('street-editable-wrapper').click({force: true});
  await page.waitForTimeout(200);
  await page.getByTestId('city-editable-wrapper').click({modifiers: ['Control'], force: true});
  await page.waitForTimeout(500);

  const selectPlain = await shot(page, 'manage-forms', 'preset-multi-select-plain', theme);
  const streetBox = await measureLocator(page.getByTestId('street-editable-wrapper'));
  const cityBox = await measureLocator(page.getByTestId('city-editable-wrapper'));
  annotateZones(selectPlain, path.join(assetsRoot, 'manage-forms', `highlight-preset-multi-select.${theme}.png`), [
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

  await page.locator('.create-preset-button').first().click({force: true});
  await page.waitForSelector('[data-testid="preset-category-picker"]', {timeout: 10_000});
  await page.waitForTimeout(300);
  const dialogPlain = await shot(page, 'manage-forms', 'preset-dialog-plain', theme);
  const nameField = page.locator('input').filter({hasNot: page.locator('[data-testid="preset-category-picker"]')}).first();
  if (await nameField.count()) {
    await nameField.fill(PRESET_NAME);
  }
  annotateHighlight(dialogPlain, path.join(assetsRoot, 'manage-forms', `highlight-preset-dialog.${theme}.png`), {
    rect: [420, 180, 520, 280],
    label: 'Preset options',
    color: '#F59E0B',
  });

  await page.getByTestId('modal-ok-button').click({force: true});
  await page.waitForTimeout(800);
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill(PRESET_NAME);
  await page.waitForTimeout(500);
  const palettePlain = await shot(page, 'manage-forms', 'preset-palette-plain', theme);
  const presetItem = page.locator('.FE_LeftPanel').getByText(PRESET_NAME, {exact: true}).first();
  if (await presetItem.count()) {
    const presetBox = await measureLocator(presetItem);
    annotateHighlight(palettePlain, path.join(assetsRoot, 'manage-forms', `highlight-preset-palette.${theme}.png`), {
      rect: [
        Math.round(presetBox.x - 4),
        Math.round(presetBox.y - 4),
        Math.round(presetBox.width + 8),
        Math.round(presetBox.height + 8),
      ],
      label: PRESET_NAME,
      color: '#3B82F6',
    });
  }
  await page.getByPlaceholder('Search').fill('');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureStructureBatch(page, theme) {
  await captureContainers(page, theme);
  await captureRowsColumns(page, theme);
  await captureSpacing(page, theme);
  await captureTabsSections(page, theme);
  await captureLabelsHelp(page, theme);
  await captureParentChild(page, theme);
  await captureMultipleForms(page, theme);
  await captureMenuHighlights(page, theme);
  await capturePresetWorkflow(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing structure/manage-forms batch (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureStructureBatch(page, theme);
  }

  await browser.close();
  console.log(`Structure batch screenshots saved under ${assetsRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
