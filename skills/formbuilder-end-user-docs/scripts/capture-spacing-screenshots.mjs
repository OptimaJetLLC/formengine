#!/usr/bin/env node
/**
 * Captures spacing-and-alignment guide screenshots only.
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
    {dbName: 'example-mui-db', storeName: 'example-store', name: formName, value: formValue},
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
  const spacingBox = await measureLocator(page.locator('[data-testid="spacing-labeled-wrapper"]').first());
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

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing spacing screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureSpacing(page, theme);
  }

  await browser.close();
  console.log(`Spacing screenshots saved under ${path.join(assetsRoot, 'structure')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
