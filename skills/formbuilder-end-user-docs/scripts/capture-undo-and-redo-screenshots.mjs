#!/usr/bin/env node
/**
 * Captures workspace/undo-and-redo Toolbar screenshot:
 * one arrow pointing at the Undo / Redo header buttons.
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module';
import {readFileSync} from 'node:fs';
import {mkdir} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createGuideCapturePage} from './capture-env.mjs';
import {annotateArrow, visibleArrowToBox} from './measure-workspace-layout.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../..');
const require = createRequire(path.join(repoRoot, 'package.json'));
const {chromium} = require('playwright');

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide');
const formsRoot = path.join(__dirname, '../data/guide-forms');
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/';
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';
const THEMES = ['light', 'dark'];
const FORM_FILE = 'event-registration.json';

/** @param {string} formFile */
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
 * @param {'light' | 'dark'} theme
 */
async function gotoForm(page, theme) {
  await page.goto(formUrl(FORM_FILE), {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForTimeout(700);
}

/** @param {import('playwright').Page} page @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = path.join(assetsRoot, section);
  await mkdir(dir, {recursive: true});
  const filePath = path.join(dir, `${basename}.${theme}.png`);
  await page.screenshot({path: filePath, fullPage: false});
  return filePath;
}

/**
 * Union bounding box of Undo + Redo in the central header toolbar.
 * @param {import('playwright').Page} page
 */
async function measureUndoRedoBox(page) {
  const box = await page.evaluate(() => {
    const toolbar = document.querySelector('.FE_CentralPanel .FE_Header_Toolbar');
    if (!toolbar) {
      return null;
    }
    const buttons = [...toolbar.querySelectorAll('button')].filter(
      (button) => button.getAttribute('data-testid') !== 'header-save-form-button',
    );
    const undoRedo = buttons.slice(-2);
    if (undoRedo.length < 2) {
      return null;
    }
    const rects = undoRedo.map((button) => button.getBoundingClientRect());
    const x1 = Math.min(...rects.map((rect) => rect.x));
    const y1 = Math.min(...rects.map((rect) => rect.y));
    const x2 = Math.max(...rects.map((rect) => rect.x + rect.width));
    const y2 = Math.max(...rects.map((rect) => rect.y + rect.height));
    return {x: x1, y: y1, width: x2 - x1, height: y2 - y1};
  });
  if (!box) {
    throw new Error('Undo / Redo buttons not found');
  }
  return box;
}

/**
 * Make a small edit so Undo is enabled in the screenshot.
 * @param {import('playwright').Page} page
 */
async function enableUndoHistory(page) {
  await page.getByTestId('Tree_Tab').click({force: true});
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('fullName').first().click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('Main_Tab').click({force: true});
  await page.waitForTimeout(300);
  const labelInput = page.locator('[data-testid="label-property-input"]').first();
  if (await labelInput.count()) {
    await labelInput.click({force: true});
    await page.keyboard.type(' ');
    await page.waitForTimeout(200);
  }
  await page.getByTestId('Components_Tab').click({force: true});
  await page.waitForTimeout(300);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureUndoRedoArrow(page, theme) {
  await gotoForm(page, theme);
  await enableUndoHistory(page);

  const undoRedoBox = await measureUndoRedoBox(page);
  const plainPath = await shot(page, 'workspace', 'undo-redo-plain', theme);
  annotateArrow(
    plainPath,
    path.join(assetsRoot, 'workspace', `highlight-undo-redo.${theme}.png`),
    visibleArrowToBox(undoRedoBox),
  );
  console.log(`undo-redo ${theme}`);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureUndoRedoArrow(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
