#!/usr/bin/env node
/**
 * Captures wizard-and-multi-step guide screenshots using RSuite Wizard components.
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
const THEME_KEY = process.env.BUILDER_RSUITE_THEME_KEY ?? 'example-rsuite-theme';
const RSUITE_VIEW = process.env.BUILDER_RSUITE_VIEW ?? 'rsuite-inject-css';
const DB_NAME = 'form-builder-store';
const STORE_NAME = 'form-store';
const FORM_NAME = 'employee-onboarding-wizard';
const THEMES = ['light', 'dark'];

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove());
}

/** @param {import('playwright').Page} page */
async function prepareBuilder(page) {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000});
  await page.evaluate(
    ({viewKey, themeKey, view, theme}) => {
      localStorage.setItem(viewKey, view);
      localStorage.setItem(themeKey, theme);
    },
    {viewKey: VIEW_KEY, themeKey: THEME_KEY, view: RSUITE_VIEW, theme: 'light'},
  );
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await page.waitForSelector('select[aria-label="Component library"]', {timeout: 60_000});
  await page.waitForTimeout(600);
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function setBuilderTheme(page, theme) {
  await page.evaluate(({themeKey, value}) => localStorage.setItem(themeKey, value), {
    themeKey: THEME_KEY,
    value: theme,
  });
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

/** @param {import('playwright').Page} page */
async function openOnboardingForm(page) {
  await saveFormToIndexedDB(page, FORM_NAME, readGuideForm('employee-onboarding-wizard.json'));
  await page.reload({waitUntil: 'domcontentloaded'});
  await dismissViteOverlay(page);
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000});
  await clickLeftTab(page, 'Forms');
  const openItem = page.getByTestId(`form-list-open-item-${FORM_NAME}`);
  if (await openItem.count()) {
    await openItem.click({force: true});
  } else {
    await page.getByTestId('form-list-open-item-RSuiteForm').click({force: true});
  }
  await page.waitForTimeout(800);
  await dismissViteOverlay(page);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureLibraryPicker(page, theme) {
  await clickLeftTab(page, 'Components');
  const plainPath = await shot(page, 'structure', 'wizard-sections-library-plain', theme);
  const librarySelect = page.locator('select[aria-label="Component library"]');
  const libraryBox = await measureLocator(librarySelect);
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-wizard-sections-library.${theme}.png`), [
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
  console.log('  library: RSuite UI selected in top menu');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePalette(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByPlaceholder('Search').fill('Wizard');
  await page.waitForTimeout(500);

  const plainPath = await shot(page, 'structure', 'wizard-sections-palette-plain', theme);
  const searchBox = await measureLocator(page.getByPlaceholder('Search'));
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  const wizardItem = page.getByTestId('RsWizard-palette-component').first();
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
  if (await wizardItem.count()) {
    const wizardBox = await measureLocator(wizardItem);
    zones.push({
      id: 3,
      label: 'Wizard',
      rect: [
        Math.round(wizardBox.x - 4),
        Math.round(wizardBox.y - 4),
        Math.round(wizardBox.width + 8),
        Math.round(wizardBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    });
  }
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-wizard-sections-palette.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  await page.getByPlaceholder('Search').fill('');
  console.log('  palette: Components tab + Wizard');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureProfileStepTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('profileStep').first().click({force: true});
  await page.waitForTimeout(500);
  await waitForToolbarHub(page);

  const plainPath = await shot(page, 'structure', 'wizard-sections-profile-tree-plain', theme);
  const treeTab = await measureLocator(page.getByTestId('Tree_Tab'));
  const rowTestIds = ['onboardingWizard', 'profileStep', 'fullName', 'workEmail', 'phone'];
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
  const stepCanvas = page.getByTestId('profileStep-editable-wrapper').first();
  if (await stepCanvas.count()) {
    const canvasBox = await measureLocator(stepCanvas);
    zones.push({
      id: zones.length + 1,
      label: 'Profile step canvas',
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
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-wizard-sections-profile-tree.${theme}.png`), zones, {
    noZoneLabels: true,
  });
  console.log('  profile step: Tree tab + nested fields');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCanvas(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.waitForTimeout(300);
  const plainPath = await shot(page, 'structure', 'wizard-sections-canvas-plain', theme);
  const componentsTab = await measureLocator(page.getByTestId('Components_Tab'));
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-wizard-sections-canvas.${theme}.png`), [
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
  ], {noZoneLabels: true});
  console.log('  canvas: Components tab + onboarding wizard');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFullTree(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(400);

  const plainPath = await shot(page, 'structure', 'wizard-sections-tree-final-plain', theme);
  const highlightPath = path.join(assetsRoot, 'structure', `highlight-wizard-sections-tree-final.${theme}.png`);
  copyFileSync(plainPath, highlightPath);
  console.log('  final tree: full component hierarchy (no left-panel highlights)');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureValidationSettings(page, theme) {
  await clickLeftTab(page, 'Tree');
  await page.getByRole('button', {name: 'Expand all'}).click({force: true});
  await page.waitForTimeout(300);
  await page.getByTestId('onboardingWizard').first().click({force: true});
  await waitForToolbarHub(page);
  await clickRightTab(page, 'Main');

  const validateOnNext = page.getByTestId('validateOnNext-labeled-wrapper');
  const validateOnFinish = page.getByTestId('validateOnFinish-labeled-wrapper');
  await validateOnFinish.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);

  for (const [label, wrapper] of [
    ['Validate on next', validateOnNext],
    ['Validate on finish', validateOnFinish],
  ]) {
    const checkbox = wrapper.locator('input[type="checkbox"]').first();
    if (!(await checkbox.isChecked())) {
      throw new Error(`${label} must be enabled in the completed wizard fixture`);
    }
  }

  const plainPath = await shot(page, 'structure', 'wizard-sections-validation-settings-plain', theme);
  const nextBox = await measureLocator(validateOnNext);
  const finishBox = await measureLocator(validateOnFinish);
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-wizard-sections-validation-settings.${theme}.png`), [
    {
      id: 1,
      label: 'Validate on next',
      rect: [Math.round(nextBox.x - 4), Math.round(nextBox.y - 4), Math.round(nextBox.width + 8), Math.round(nextBox.height + 8)],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Validate on finish',
      rect: [
        Math.round(finishBox.x - 4),
        Math.round(finishBox.y - 4),
        Math.round(finishBox.width + 8),
        Math.round(finishBox.height + 8),
      ],
      color: '#F59E0B',
      showBadge: false,
    },
  ], {noZoneLabels: true});
  console.log('  validation settings: Validate on next + Validate on finish');
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureValidationFlow(page, theme) {
  await clickLeftTab(page, 'Components');
  await page.getByRole('button', {name: 'Preview'}).click({force: true});
  await page.waitForTimeout(800);
  await page.getByTestId('viewer-clear-button').click({force: true});
  await page.waitForTimeout(400);
  await shot(page, 'structure', 'wizard-sections-preview-plain', theme);

  await page.getByRole('button', {name: 'Next', exact: true}).click({force: true});
  const requiredMessage = page.getByText('Required', {exact: true}).first();
  await requiredMessage.waitFor({state: 'visible', timeout: 10_000});
  const fullName = page.getByLabel('Full name', {exact: false}).first();
  if (!(await fullName.isVisible())) {
    throw new Error('The Profile step advanced despite an empty required Full name');
  }

  const plainPath = await shot(page, 'structure', 'wizard-sections-validation-blocked-plain', theme);
  const profileBox = await measureLocator(page.getByText('Profile', {exact: true}).first());
  const requiredBox = await measureLocator(requiredMessage);
  annotateZones(plainPath, path.join(assetsRoot, 'structure', `highlight-wizard-sections-validation-blocked.${theme}.png`), [
    {
      id: 1,
      label: 'Profile stays active',
      rect: [
        Math.round(profileBox.x - 12),
        Math.round(profileBox.y - 8),
        Math.round(profileBox.width + 24),
        Math.round(profileBox.height + 16),
      ],
      color: '#3B82F6',
      showBadge: false,
    },
    {
      id: 2,
      label: 'Required',
      rect: [
        Math.round(requiredBox.x - 8),
        Math.round(requiredBox.y - 6),
        Math.round(requiredBox.width + 16),
        Math.round(requiredBox.height + 12),
      ],
      color: '#EF4444',
      showBadge: false,
    },
  ], {noZoneLabels: true});

  await fullName.fill('Ada Lovelace');
  await page.getByRole('button', {name: 'Next', exact: true}).click({force: true});
  const department = page.getByLabel('Department', {exact: false}).first();
  await department.waitFor({state: 'visible', timeout: 10_000});
  await page.getByRole('button', {name: 'Next', exact: true}).click({force: true});
  await page.getByText('Required', {exact: true}).first().waitFor({state: 'visible', timeout: 10_000});
  if (!(await department.isVisible())) {
    throw new Error('The Job details step advanced despite an empty required Department');
  }
  await department.fill('Engineering');
  await page.getByRole('button', {name: 'Next', exact: true}).click({force: true});
  const idDocument = page.getByLabel('ID document number', {exact: false}).first();
  await idDocument.waitFor({state: 'visible', timeout: 10_000});
  await page.getByRole('button', {name: 'Submit onboarding', exact: true}).click({force: true});
  await page.getByText('Required', {exact: true}).first().waitFor({state: 'visible', timeout: 10_000});
  if (!(await idDocument.isVisible())) {
    throw new Error('The Documents step did not remain active after failed finish validation');
  }
  await idDocument.fill('ID-2048');
  await page.waitForTimeout(300);
  await page.getByRole('button', {name: 'Submit onboarding', exact: true}).click({force: true});
  await page.waitForTimeout(300);
  if (await page.getByText('Required', {exact: true}).first().isVisible().catch(() => false)) {
    throw new Error('Finish validation did not clear after the required ID document number was entered');
  }

  console.log('  validation flow: Next and Finish block invalid fields');
  await page.getByRole('button', {name: 'Edit'}).click({force: true});
  await page.waitForTimeout(400);
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureWizardAndSteps(page, theme) {
  await openOnboardingForm(page);
  await captureLibraryPicker(page, theme);
  await capturePalette(page, theme);
  await captureFullTree(page, theme);
  await captureProfileStepTree(page, theme);
  await captureCanvas(page, theme);
  await captureValidationSettings(page, theme);
  await captureValidationFlow(page, theme);
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH});
  const page = await createGuideCapturePage(browser);
  await prepareBuilder(page);

  for (const theme of THEMES) {
    console.log(`Capturing wizard-and-multi-step screenshots (${theme})...`);
    await setBuilderTheme(page, theme);
    await captureWizardAndSteps(page, theme);
  }

  await browser.close();
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'structure')}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
