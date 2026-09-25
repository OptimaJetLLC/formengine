#!/usr/bin/env node
/**
 * Captures header menu highlights for save-export-import guide page.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateHeaderMenuItemHighlights} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];

/** Menu items used on manage-forms/save-export-import.md */
const MENU_ITEMS = [
  {item: 'save', basename: 'header-menu-save'},
  {item: 'saveAs', basename: 'header-menu-save-as'},
  {item: 'download', basename: 'header-menu-download'},
  {item: 'upload', basename: 'header-menu-upload'},
  {item: 'exportForms', basename: 'header-menu-export-forms'},
  {item: 'importForms', basename: 'header-menu-import-forms'},
  {item: 'clear', basename: 'header-menu-clear'},
  {item: 'print', basename: 'header-menu-print'},
  {item: 'addNewForm', basename: 'header-menu-add-new-form'},
];

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

/** @param {import('playwright').Page} page */
async function openMainMenu(page) {
  await dismissViteOverlay(page);
  await page.locator('[aria-haspopup="menu"]').first().click({force: true});
  await page.waitForTimeout(500);
  await page.locator('.rs-dropdown-menu').first().waitFor({state: 'visible', timeout: 10_000});
}

/** @param {import('playwright').Page} page */
async function closeMainMenu(page) {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSaveExportImportMenus(page, theme) {
  await openMainMenu(page);
  const plainPath = await shot(page, 'manage-forms', 'header-menu-plain', theme);
  await annotateHeaderMenuItemHighlights(
    page,
    theme,
    plainPath,
    MENU_ITEMS.map(({item}) => item),
  );
  for (const {item} of MENU_ITEMS) {
    console.log(`  highlight-header-menu: ${item}`);
  }
  await closeMainMenu(page);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing save-export-import menu highlights (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureSaveExportImportMenus(page, theme);
  }

  await browser.close();
  console.log(`Menu screenshots saved under ${path.join(assetsRoot, 'manage-forms')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
