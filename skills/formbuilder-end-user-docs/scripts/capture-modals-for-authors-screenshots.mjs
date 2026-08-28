#!/usr/bin/env node
/**
 * Captures behavior/modals-for-authors full guide screenshots.
 * Seeds IndexedDB with confirm-dialog + MainForm, then captures designer steps.
 *
 * Requires a running MUI builder at localhost:5173 (example app).
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
const MODAL_FORM = 'confirm-dialog';
const MAIN_FORM = 'MainForm';

/** @param {string} fileName */
function readGuideForm(fileName) {
  return JSON.parse(readFileSync(path.join(formsRoot, fileName), 'utf8'));
}

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove()).catch(() => {});
}

/** @param {import('playwright').Page} page */
async function clearIndexedDBStore(page) {
  await page.evaluate(
    async ({dbName, storeName}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          if (![...db.objectStoreNames].includes(storeName)) {
            db.close();
            resolve(undefined);
            return;
          }
          const tx = db.transaction(storeName, 'readwrite');
          tx.objectStore(storeName).clear();
          tx.oncomplete = () => {
            db.close();
            resolve(undefined);
          };
          tx.onerror = () => reject(tx.error);
        };
      });
    },
    {dbName: DB_NAME, storeName: STORE_NAME},
  );
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
 * @param {'light' | 'dark'} theme
 */
async function prepareBuilder(page, theme) {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui');
    localStorage.setItem('example-mui-theme', value);
  }, theme);
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clearIndexedDBStore(page);
  await saveFormToIndexedDB(page, MODAL_FORM, readGuideForm('confirm-dialog.json'));
  await saveFormToIndexedDB(page, MAIN_FORM, readGuideForm('main-with-modal.json'));
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

/** @param {import('playwright').Locator} locator */
async function measureLocator(locator) {
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error('Element not found for measurement');
  }
  return box;
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickLeftTab(page, name) {
  await dismissViteOverlay(page);
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(350);
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickRightTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click({force: true});
  await page.waitForTimeout(300);
}

/** @param {import('playwright').Page} page @param {string} formName */
async function openStoredForm(page, formName) {
  await clickLeftTab(page, 'Forms');
  await page.getByTestId(`form-list-item-${formName}`).waitFor({state: 'visible', timeout: 15_000});
  await page.getByTestId(`form-list-open-item-${formName}`).click({force: true});
  await page.waitForTimeout(1000);
  await dismissViteOverlay(page);
}

/** @param {import('playwright').Page} page @param {string} testId */
async function selectTreeItem(page, testId) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId(testId).first().click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {string} plainPath
 * @param {string} outputBasename
 * @param {'light' | 'dark'} theme
 * @param {{ x: number, y: number, width: number, height: number }} box
 * @param {string} label
 * @param {boolean} [showLabel]
 */
function highlightBox(plainPath, outputBasename, theme, box, label, showLabel = false) {
  annotateHighlight(plainPath, path.join(assetsRoot, 'behavior', `${outputBasename}.${theme}.png`), {
    label,
    rect: [
      Math.round(box.x - 4),
      Math.round(box.y - 4),
      Math.round(box.width + 8),
      Math.round(box.height + 8),
    ],
    color: '#F59E0B',
    showLabel,
  });
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFormsList(page, theme) {
  await prepareBuilder(page, theme);
  await clickLeftTab(page, 'Forms');
  await page.getByTestId(`form-list-item-${MODAL_FORM}`).waitFor({state: 'visible', timeout: 15_000});
  await page.getByTestId(`form-list-item-${MAIN_FORM}`).waitFor({state: 'visible', timeout: 15_000});

  const createButton = page.getByTestId('add-new-form-button');
  await createButton.waitFor({state: 'visible', timeout: 10_000});
  const plainPath = await shot(page, 'behavior', 'modals-forms-list-plain', theme);
  const box = await measureLocator(createButton);
  annotateArrow(plainPath, path.join(assetsRoot, 'behavior', `highlight-modals-forms-create.${theme}.png`), visibleArrowToBox(box));
  console.log(`modals-forms-list ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureModalFormContent(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MODAL_FORM);
  await page.getByTestId('message').or(page.getByText('Are you sure you want to continue?')).first().waitFor({
    state: 'visible',
    timeout: 15_000,
  });
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'behavior', 'modals-confirm-form-plain', theme);
  const message = page.getByTestId('message-editable-wrapper').or(page.getByTestId('message')).first();
  const ok = page.getByTestId('ok-editable-wrapper').or(page.getByTestId('ok')).first();
  const cancel = page.getByTestId('cancel-editable-wrapper').or(page.getByTestId('cancel')).first();
  await message.waitFor({state: 'visible', timeout: 10_000});
  const messageBox = await measureLocator(message);
  const okBox = await measureLocator(ok);
  const cancelBox = await measureLocator(cancel);

  annotateZones(plainPath, path.join(assetsRoot, 'behavior', `highlight-modals-confirm-form.${theme}.png`), [
    {
      id: 1,
      label: 'Message',
      rect: [Math.round(messageBox.x - 4), Math.round(messageBox.y - 4), Math.round(messageBox.width + 8), Math.round(messageBox.height + 8)],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'OK',
      rect: [Math.round(okBox.x - 4), Math.round(okBox.y - 4), Math.round(okBox.width + 8), Math.round(okBox.height + 8)],
      color: '#F59E0B',
      showBadge: false,
    },
    {
      id: 3,
      label: 'Cancel',
      rect: [Math.round(cancelBox.x - 4), Math.round(cancelBox.y - 4), Math.round(cancelBox.width + 8), Math.round(cancelBox.height + 8)],
      color: '#10B981',
      showBadge: false,
    },
  ]);
  console.log(`modals-confirm-form ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCloseModalAction(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MODAL_FORM);
  await selectTreeItem(page, 'ok');
  await clickRightTab(page, 'Actions');

  const closeAction = page.getByTestId('bound-action-onClick-common-closeModal');
  await closeAction.waitFor({state: 'visible', timeout: 10_000});
  await closeAction.getByRole('button', {name: 'Arguments'}).click({force: true}).catch(async () => {
    await closeAction.locator('button').filter({hasText: 'Arguments'}).click({force: true});
  });
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'behavior', 'modals-close-action-plain', theme);
  const box = await measureLocator(closeAction);
  highlightBox(plainPath, 'highlight-modals-close-action', theme, box, 'closeModal', false);
  console.log(`modals-close-action ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSettingsModalType(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MAIN_FORM);
  await clickLeftTab(page, 'Settings');
  const modalHeading = page.locator('h6').filter({hasText: 'Modal'}).first();
  await modalHeading.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const control = page.locator('[data-testid="modalType-labeled-wrapper"]').first();
  await control.waitFor({state: 'visible', timeout: 10_000});
  const plainPath = await shot(page, 'behavior', 'modals-settings-type-plain', theme);
  const box = await measureLocator(control);
  annotateArrow(plainPath, path.join(assetsRoot, 'behavior', `highlight-modals-settings-type.${theme}.png`), visibleArrowToBox(box));
  console.log(`modals-settings-type ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureModalPalette(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MAIN_FORM);
  await clickLeftTab(page, 'Components');
  const search = page.getByPlaceholder('Search');
  await search.fill('modal');
  await page.waitForTimeout(500);
  const modalItem = page.getByTestId('Modal-palette-component').first();
  await modalItem.waitFor({state: 'visible', timeout: 10_000});
  await page.mouse.move(700, 400);
  await page.waitForTimeout(200);

  const plainPath = await shot(page, 'behavior', 'components-search-modal-plain', theme);
  const searchBox = await measureLocator(search);
  const modalBox = await measureLocator(modalItem);
  annotateZones(plainPath, path.join(assetsRoot, 'behavior', `highlight-components-search-modal.${theme}.png`), [
    {
      id: 1,
      label: 'Search',
      rect: [Math.round(searchBox.x - 4), Math.round(searchBox.y - 4), Math.round(searchBox.width + 8), Math.round(searchBox.height + 8)],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Modal',
      rect: [Math.round(modalBox.x - 4), Math.round(modalBox.y - 4), Math.round(modalBox.width + 8), Math.round(modalBox.height + 8)],
      color: '#F59E0B',
      showBadge: false,
    },
  ]);
  console.log(`components-search-modal ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureModalTemplate(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MAIN_FORM);
  await selectTreeItem(page, 'confirmModal');
  await clickRightTab(page, 'Main');

  const template = page.locator('[data-testid="modalTemplate-labeled-wrapper"]').first();
  await template.waitFor({state: 'visible', timeout: 10_000});
  await template.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  const plainPath = await shot(page, 'behavior', 'modals-template-plain', theme);
  const box = await measureLocator(template);
  annotateArrow(plainPath, path.join(assetsRoot, 'behavior', `highlight-modals-template.${theme}.png`), visibleArrowToBox(box));
  console.log(`modals-template ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureOpenModalAction(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MAIN_FORM);
  await selectTreeItem(page, 'showConfirmation');
  await clickRightTab(page, 'Actions');

  const openAction = page.getByTestId('bound-action-onClick-common-openModal');
  await openAction.waitFor({state: 'visible', timeout: 10_000});
  await openAction.getByRole('button', {name: 'Arguments'}).click({force: true}).catch(async () => {
    await openAction.locator('button').filter({hasText: 'Arguments'}).click({force: true});
  });
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'behavior', 'modals-open-action-plain', theme);
  const box = await measureLocator(openAction);
  highlightBox(plainPath, 'highlight-modals-open-action', theme, box, 'openModal', false);
  console.log(`modals-open-action ${theme}`);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePreviewModal(page, theme) {
  await prepareBuilder(page, theme);
  await openStoredForm(page, MAIN_FORM);
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(900);

  const showButton = page.locator('[data-testid="viewer-wrapper"] button', {hasText: 'Show confirmation'}).first();
  await showButton.waitFor({state: 'visible', timeout: 10_000});
  await showButton.click({force: true});
  await page.waitForTimeout(800);

  // MUI dialog / modal content
  const dialog = page.locator('.MuiDialog-root, [role="dialog"]').first();
  await dialog.waitFor({state: 'visible', timeout: 10_000});

  const plainPath = await shot(page, 'behavior', 'modals-preview-open-plain', theme);
  const paper = page.locator('.MuiDialog-paper').first();
  const target = (await paper.count()) > 0 ? paper : dialog;
  const box = await measureLocator(target);
  highlightBox(plainPath, 'highlight-modals-preview-open', theme, box, 'Modal', false);
  console.log(`modals-preview-open ${theme}`);

  await page.getByRole('button', {name: 'Edit'}).click({force: true}).catch(() => {});
  await page.waitForTimeout(400);
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true});
  const page = await createGuideCapturePage(browser);
  for (const theme of THEMES) {
    await captureFormsList(page, theme);
    await captureModalFormContent(page, theme);
    await captureCloseModalAction(page, theme);
    await captureSettingsModalType(page, theme);
    await captureModalPalette(page, theme);
    await captureModalTemplate(page, theme);
    await captureOpenModalAction(page, theme);
    await capturePreviewModal(page, theme);
  }
  await browser.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
