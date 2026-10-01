#!/usr/bin/env node
/**
 * Captures Form Author Guide screenshots from a running builder at localhost:5173.
 * Saves light and dark variants: `{basename}.light.png` and `{basename}.dark.png`.
 *
 * Usage (from repo root, builder must be running):
 *   node skills/formbuilder-end-user-docs/scripts/capture-guide-screenshots.mjs
 */
import { createRequire } from 'node:module';
import { readdirSync, unlinkSync } from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {
  annotateHighlight,
  annotateArrow,
  annotateZones,
  ensureToolbarActionsVisible,
  measureComponentToolbarArrow,
  measureWorkspaceHighlights,
  measureWorkspaceZones,
  measureHeaderToolbarZones,
  measureHeaderMenuItem,
  annotateHeaderMenuItemHighlights,
  measurePanelCollapseZones,
  writeMeasurementPreset,
} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const { chromium } = require('playwright');

const assetsRoot = path.join(
  repoRoot,
  'designer-guide/public/assets/guide',
);

const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const BUILDER_VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name';
const BUILDER_THEME_KEY = process.env.BUILDER_THEME_KEY ?? 'example-mui-theme';
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function prepareBuilder(page) {
  await page.goto(BUILDER_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  await page.evaluate(
    ({ viewKey, themeKey }) => {
      localStorage.setItem(viewKey, 'mui');
      localStorage.setItem(themeKey, 'light');
    },
    { viewKey: BUILDER_VIEW_KEY, themeKey: BUILDER_THEME_KEY },
  );
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
  await page.waitForSelector('[data-testid="Components_Tab"]', { timeout: 30_000 });
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function setBuilderTheme(page, theme) {
  await page.evaluate(
    ({ themeKey, value }) => {
      localStorage.setItem(themeKey, value);
    },
    { themeKey: BUILDER_THEME_KEY, value: theme },
  );
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
  await page.waitForSelector('[data-testid="Components_Tab"]', { timeout: 30_000 });
  await page.waitForTimeout(600);
}

async function ensureDir(section) {
  const dir = path.join(assetsRoot, section);
  await mkdir(dir, { recursive: true });
  return dir;
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = await ensureDir(section);
  const filePath = path.join(dir, `${basename}.${theme}.png`);
  await page.screenshot({ path: filePath, fullPage: false });
  return filePath;
}

/** @param {import('playwright').Page} page */
async function clickLeftTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click();
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page */
async function expandTree(page) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', { name: 'Expand all' }).click();
  await page.waitForTimeout(300);
}

/** @param {import('playwright').Page} page */
async function selectTreeItem(page, testId) {
  await expandTree(page);
  await page.getByTestId(testId).first().click();
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page */
async function clickRightTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click();
  await page.waitForTimeout(400);
}

/** @param {import('playwright').Page} page */
async function captureCanvasMultiSelect(page) {
  await clickLeftTab(page, 'Components');
  await page.getByTestId('First name-editable-wrapper').click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('Last name-editable-wrapper').click({modifiers: ['Control'], force: true});
  await page.waitForTimeout(200);
  await page.getByTestId('Email-editable-wrapper').click({modifiers: ['Control'], force: true});
  await page.waitForTimeout(500);
}

/** @param {import('playwright').Page} page */
async function captureBottomPanelCalculable(page) {
  await selectTreeItem(page, 'First name');
  await clickRightTab(page, 'Main');
  await page.locator('[data-testid="value-labeled-wrapper"] button').first().click();
  await page.waitForTimeout(800);
  await page.getByText('Calculable value', {exact: true}).click();
  await page.waitForSelector('.monaco-editor', {timeout: 10_000});
  await page.waitForTimeout(600);
}

/** @param {import('playwright').Page} page */
async function closeBottomPanel(page) {
  const closeButton = page.getByRole('button', {name: 'Close'});
  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(300);
  }
}

/** @param {import('playwright').Page} page */
async function clickHeaderIconAfterPreview(page, offsetIndex) {
  const preview = page.getByRole('button', { name: 'Preview' });
  const box = await preview.boundingBox();
  if (!box) {
    throw new Error('Preview button not found');
  }
  const x = box.x + box.width + 28 + offsetIndex * 30;
  await page.mouse.click(x, box.y + box.height / 2);
  await page.waitForTimeout(500);
}

/** @param {import('playwright').Page} page */
async function openMainMenu(page) {
  await page.locator('[aria-haspopup="menu"]').first().click();
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} overviewPlainPath
 */
async function annotateWorkspaceOverview(page, theme, overviewPlainPath) {
  const workspaceZones = await measureWorkspaceZones(page);
  const workspaceHighlights = await measureWorkspaceHighlights(page);

  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'zones-overview-1440x900.json'), {
      viewport: '1440x900',
      description: 'Measured from live builder DOM during capture (light theme). Re-capture after layout changes.',
      zones: workspaceZones,
    });
    writeMeasurementPreset(path.join(__dirname, 'highlights-overview-1440x900.json'), {
      viewport: '1440x900',
      description: 'Measured from live builder DOM during capture (light theme). Re-capture after layout changes.',
      highlights: workspaceHighlights,
    });
  }

  annotateZones(
    overviewPlainPath,
    path.join(assetsRoot, 'workspace', `overview-zones.${theme}.png`),
    workspaceZones,
  );
  annotateHighlight(
    overviewPlainPath,
    path.join(assetsRoot, 'workspace', `highlight-palette.${theme}.png`),
    workspaceHighlights['component-palette'],
  );
  annotateHighlight(
    overviewPlainPath,
    path.join(assetsRoot, 'workspace', `highlight-preview.${theme}.png`),
    workspaceHighlights['preview-button'],
  );
  annotateHighlight(
    overviewPlainPath,
    path.join(assetsRoot, 'workspace', `highlight-properties.${theme}.png`),
    workspaceHighlights['properties-panel'],
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function annotatePanelCollapse(page, theme) {
  const rightPanel = page.locator('.FE_RightPanel');
  const rightCollapse = page.locator('.FE_RightPanel [class*="hideButton"]');
  const isCollapsed = await rightPanel.evaluate((el) => el.className.includes('collapsed'));
  if (isCollapsed) {
    await rightCollapse.click();
    await page.waitForTimeout(500);
  }

  await rightCollapse.click();
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'workspace', 'panels-collapse-plain', theme);
  const collapseZones = await measurePanelCollapseZones(page);

  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'zones-panel-collapse-1440x900.json'), {
      viewport: '1440x900',
      description:
        'Measured from live builder DOM during capture (light theme). Right panel collapsed before screenshot.',
      zones: collapseZones,
    });
  }

  annotateZones(
    plainPath,
    path.join(assetsRoot, 'workspace', `highlight-panel-collapse.${theme}.png`),
    collapseZones,
    {noZoneLabels: true},
  );

  await rightCollapse.click();
  await page.waitForTimeout(500);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function annotateToolbarActionArrows(page, theme, plainPath) {
  const addArrow = await measureComponentToolbarArrow(page, 'First name', 'add');
  const cloneArrow = await measureComponentToolbarArrow(page, 'First name', 'clone');
  const deleteArrow = await measureComponentToolbarArrow(page, 'First name', 'delete');

  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'arrows-toolbar-actions-1440x900.json'), {
      viewport: '1440x900',
      description: 'Arrow coordinates from selected First name field to toolbar add/clone/delete buttons.',
      arrows: {
        add: addArrow,
        clone: cloneArrow,
        delete: deleteArrow,
      },
    });
  }

  annotateArrow(plainPath, path.join(assetsRoot, 'workspace', `highlight-toolbar-add.${theme}.png`), addArrow);
  annotateArrow(plainPath, path.join(assetsRoot, 'workspace', `highlight-toolbar-clone.${theme}.png`), cloneArrow);
  annotateArrow(plainPath, path.join(assetsRoot, 'workspace', `highlight-toolbar-delete.${theme}.png`), deleteArrow);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function annotateCentralHeaderToolbar(page, theme) {
  const header = page.locator('.FE_CentralPanel .FE_Header');
  const plainPath = path.join(assetsRoot, 'workspace', `central-header-plain.${theme}.png`);
  await header.screenshot({path: plainPath});

  const toolbarZones = await measureHeaderToolbarZones(page);
  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'zones-central-header-1440x900.json'), {
      viewport: '1440x900',
      description:
        'Measured from live builder DOM during capture (light theme). Zones are relative to the central header crop.',
      zones: toolbarZones,
    });
  }

  annotateZones(
    plainPath,
    path.join(assetsRoot, 'workspace', `highlight-central-header.${theme}.png`),
    toolbarZones,
  );
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureGuideScreenshots(page, theme) {
  await clickLeftTab(page, 'Components');
  const overviewPlainPath = await shot(page, 'workspace', 'builder-overview-plain', theme);
  await annotateWorkspaceOverview(page, theme, overviewPlainPath);
  await annotatePanelCollapse(page, theme);

  await shot(page, 'workspace', 'components-tab-plain', theme);
  await clickLeftTab(page, 'Tree');
  await clickLeftTab(page, 'Settings');
  await shot(page, 'workspace', 'settings-tab-plain', theme);
  await clickLeftTab(page, 'Forms');
  await shot(page, 'manage-forms', 'forms-tab-plain', theme);

  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('text');
  await page.waitForTimeout(400);
  await shot(page, 'workspace', 'components-search-plain', theme);
  await page.getByPlaceholder('Search').fill('');

  await selectTreeItem(page, 'First name');
  await clickRightTab(page, 'Main');
  const mainTabPlainPath = await shot(page, 'workspace', 'main-tab-plain', theme);
  const propertiesHighlight = await measureWorkspaceHighlights(page);
  annotateHighlight(
    mainTabPlainPath,
    path.join(assetsRoot, 'workspace', `highlight-properties-main-tab.${theme}.png`),
    propertiesHighlight['properties-panel'],
  );
  await clickRightTab(page, 'Style');
  await shot(page, 'appearance', 'style-tab-plain', theme);
  await selectTreeItem(page, 'muiButton1');
  await clickRightTab(page, 'Actions');
  await shot(page, 'behavior', 'button-actions-tab-plain', theme);
  await selectTreeItem(page, 'First name');
  await clickRightTab(page, 'Rules');
  const rulesTabPlainPath = await shot(page, 'first-form', 'rules-tab-plain', theme);
  const rulesTabBox = await page.getByTestId('Rules_Tab').boundingBox();
  if (rulesTabBox) {
    annotateHighlight(rulesTabPlainPath, path.join(assetsRoot, 'first-form', `highlight-rules-tab.${theme}.png`), {
      rect: [
        Math.round(rulesTabBox.x),
        Math.round(rulesTabBox.y),
        Math.round(rulesTabBox.width),
        Math.round(rulesTabBox.height),
      ],
      label: 'Rules',
      color: '#F59E0B',
    });
  }

  await captureBottomPanelCalculable(page);
  await shot(page, 'workspace', 'bottom-panel-calculable-plain', theme);
  await closeBottomPanel(page);

  await clickLeftTab(page, 'Components');
  await shot(page, 'workspace', 'header-toolbar', theme);
  await annotateCentralHeaderToolbar(page, theme);

  await clickHeaderIconAfterPreview(page, 1);
  await shot(page, 'preview-and-handoff', 'device-mobile-plain', theme);
  await clickHeaderIconAfterPreview(page, 2);
  await shot(page, 'preview-and-handoff', 'device-tablet-plain', theme);
  await clickHeaderIconAfterPreview(page, 0);
  await shot(page, 'preview-and-handoff', 'device-desktop-plain', theme);

  await clickHeaderIconAfterPreview(page, 1);
  const previewBox = await page.getByRole('button', { name: 'Preview' }).boundingBox();
  if (previewBox) {
    await page.mouse.click(previewBox.x + previewBox.width + 12, previewBox.y + previewBox.height / 2);
    await page.waitForTimeout(400);
    await shot(page, 'preview-and-handoff', 'device-orientation-plain', theme);
  }

  await clickHeaderIconAfterPreview(page, 3);
  await page.waitForTimeout(600);
  await shot(page, 'workspace', 'json-view-modal-plain', theme);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  await clickLeftTab(page, 'Components');
  await shot(page, 'first-form', 'canvas-plain', theme);

  await page.getByTestId('First name-editable-wrapper').click({ force: true });
  await page.waitForTimeout(400);
  const toolbarActionsPlainPath = await shot(page, 'workspace', 'toolbar-actions-plain', theme);
  await annotateToolbarActionArrows(page, theme, toolbarActionsPlainPath);

  await ensureToolbarActionsVisible(page);
  const addButton = page.locator('.FE_Component_Toolbar_AddButton button, .FE_Component_Toolbar_AddButton .add-button').locator('visible=true').first();
  await addButton.scrollIntoViewIfNeeded();
  await addButton.click({force: true});
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: 'Before' }).waitFor({ state: 'visible', timeout: 5000 });
  await shot(page, 'workspace', 'components-add-button-hover-plain', theme);

  await page.getByRole('button', { name: 'Before' }).click();
  await page.getByText('Click to add control').waitFor({ state: 'visible', timeout: 5000 });
  await page.waitForTimeout(400);
  await shot(page, 'workspace', 'components-add-modal-plain', theme);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  await page.getByRole('button', { name: 'Preview' }).click();
  await page.waitForTimeout(800);
  await shot(page, 'preview-and-handoff', 'preview-data-panel-plain', theme);
  await shot(page, 'preview-and-handoff', 'preview-mode-plain', theme);
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.waitForTimeout(400);

  await clickLeftTab(page, 'Settings');
  await shot(page, 'appearance', 'settings-error-tooltip-plain', theme);
  await page.evaluate(() => {
    const panel = document.querySelector('[data-testid="Settings_Tab"]')?.closest('aside') ?? document.body;
    panel.querySelectorAll('[class*="scroll"], [style*="overflow"]').forEach((el) => {
      if (el.scrollHeight > el.clientHeight) {
        el.scrollTop = el.scrollHeight / 3;
      }
    });
    window.scrollBy(0, 200);
  });
  await page.waitForTimeout(300);
  await shot(page, 'behavior', 'form-level-actions-plain', theme);

  await openMainMenu(page);
  const headerMenuPlainPath = await shot(page, 'manage-forms', 'header-menu-plain', theme);
  await annotateHeaderMenuItemHighlights(page, theme, headerMenuPlainPath);
  await page.keyboard.press('Escape');

  await page.keyboard.press('Escape');
  await page.locator('body').click({ position: { x: 700, y: 80 } });
  await page.waitForTimeout(300);
  await shot(page, 'workspace', 'empty-properties-plain', theme);
}

function cleanupLegacyScreenshots(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanupLegacyScreenshots(fullPath);
      continue;
    }
    if (!entry.name.endsWith('.png')) {
      continue;
    }
    if (entry.name.endsWith('.light.png') || entry.name.endsWith('.dark.png')) {
      continue;
    }
    unlinkSync(fullPath);
  }
}

async function main() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: CHROME_PATH,
  });
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing ${theme} theme screenshots...`);
    await setBuilderTheme(page, theme);
    await captureGuideScreenshots(page, theme);
  }

  cleanupLegacyScreenshots(assetsRoot);
  await browser.close();
  console.log(`Screenshots saved under ${assetsRoot} (.light.png and .dark.png)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
