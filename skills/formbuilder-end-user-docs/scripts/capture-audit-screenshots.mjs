#!/usr/bin/env node
/**
 * Captures screenshots identified by the designer-guide audit (mismatched sections).
 * Requires a running builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {
  annotateHighlight,
  writeMeasurementPreset,
} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
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

/** @param {import('playwright').Locator} locator */
async function measureLocator(locator) {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element not found for measurement');
  }
  return box;
}

/** @param {import('playwright').Page} page */
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

/** @param {import('playwright').Page} page */
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
 */
async function captureAuditScreenshots(page, theme) {
  // Canvas: single selected component
  await clickLeftTab(page, 'Components');
  await page.getByTestId('First name-editable-wrapper').click({force: true});
  await page.waitForTimeout(400);
  await shot(page, 'workspace', 'canvas-selected-plain', theme);

  // Render When on Main
  await page.getByTestId('Main_Tab').click({force: true});
  await page.waitForTimeout(300);
  const renderWhenPlain = await shot(page, 'workspace', 'render-when-plain', theme);
  const renderWhenBox = await measureLocator(page.locator('[data-testid="renderWhen-labeled-wrapper"]'));
  annotateHighlight(renderWhenPlain, path.join(assetsRoot, 'workspace', `highlight-render-when.${theme}.png`), {
    rect: [
      Math.round(renderWhenBox.x),
      Math.round(renderWhenBox.y),
      Math.round(renderWhenBox.width),
      Math.round(renderWhenBox.height),
    ],
    label: 'Render When',
    color: '#F59E0B',
  });

  // Settings: tooltip and modal blocks
  await clickLeftTab(page, 'Settings');
  const errorBlock = page.getByText('Error settings', {exact: false}).first();
  await errorBlock.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, 'appearance', 'settings-error-block-plain', theme);

  const tooltipBlock = page.getByText('Tooltip', {exact: true}).first();
  await tooltipBlock.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, 'appearance', 'settings-tooltip-plain', theme);

  const modalBlock = page.getByText('Modal', {exact: true}).first();
  await modalBlock.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await shot(page, 'appearance', 'settings-modal-plain', theme);

  // Highlight Settings tab panel for form-settings-authors
  const settingsTabPlain = await shot(page, 'workspace', 'settings-tab-plain', theme);
  const leftPanelBox = await measureLocator(page.locator('.FE_LeftPanel'));
  annotateHighlight(settingsTabPlain, path.join(assetsRoot, 'workspace', `highlight-settings-tab.${theme}.png`), {
    rect: [
      Math.round(leftPanelBox.x),
      Math.round(leftPanelBox.y),
      Math.round(leftPanelBox.width),
      Math.round(leftPanelBox.height),
    ],
    label: 'Settings',
    color: '#3B82F6',
  });

  // Preview tools
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);

  // Fill a field so Data updates
  const firstNameField = page.getByLabel('First name', {exact: false}).first();
  if (await firstNameField.count()) {
    await firstNameField.fill('Alex');
  } else {
    await page.locator('.FE_CentralPanel input:not([readonly])').first().fill('Alex');
  }
  await page.waitForTimeout(400);

  const previewDataPlain = await shot(page, 'preview-and-handoff', 'preview-data-filled-plain', theme);
  const dataHeader = page.getByText('Data', {exact: true}).first();
  const dataBox = await measureLocator(dataHeader);
  annotateHighlight(previewDataPlain, path.join(assetsRoot, 'preview-and-handoff', `highlight-preview-data.${theme}.png`), {
    rect: [
      Math.round(dataBox.x - 8),
      Math.round(dataBox.y - 4),
      Math.round(280),
      Math.round(220),
    ],
    label: 'Data',
    color: '#10B981',
  });

  await page.locator('button').filter({hasText: /^Validate$/}).first().click({force: true});
  await page.waitForTimeout(500);
  await shot(page, 'preview-and-handoff', 'preview-validate-errors-plain', theme);

  const previewPlain = await shot(page, 'preview-and-handoff', 'preview-mode-plain', theme);
  const editBox = await measureLocator(page.getByRole('button', {name: 'Edit'}));
  annotateHighlight(previewPlain, path.join(assetsRoot, 'workspace', `highlight-edit-button.${theme}.png`), {
    rect: [
      Math.round(editBox.x),
      Math.round(editBox.y),
      Math.round(editBox.width),
      Math.round(editBox.height),
    ],
    label: 'Edit',
    color: '#8B5CF6',
  });

  // Mobile preview interactions
  await clickHeaderIconAfterPreview(page, 1);
  await page.waitForTimeout(400);
  await shot(page, 'preview-and-handoff', 'device-mobile-preview-plain', theme);

  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);

  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'audit-screenshots-manifest.json'), {
      viewport: '1440x900',
      description: 'Audit screenshot basenames generated by capture-audit-screenshots.mjs',
      files: [
        'workspace/canvas-selected-plain',
        'workspace/highlight-render-when',
        'appearance/settings-error-block-plain',
        'appearance/settings-tooltip-plain',
        'appearance/settings-modal-plain',
        'workspace/highlight-settings-tab',
        'preview-and-handoff/preview-data-filled-plain',
        'preview-and-handoff/highlight-preview-data',
        'preview-and-handoff/preview-validate-errors-plain',
        'workspace/highlight-edit-button',
        'preview-and-handoff/device-mobile-preview-plain',
      ],
    });
  }
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing audit screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureAuditScreenshots(page, theme);
  }

  await browser.close();
  console.log(`Audit screenshots saved under ${assetsRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
