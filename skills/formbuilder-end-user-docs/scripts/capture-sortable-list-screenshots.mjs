#!/usr/bin/env node
/**
 * Captures sortable-list guide screenshots (RSuite + Sortable list).
 * Requires a running example builder at localhost:5173.
 */
import {createRequire} from 'node:module'
import {readFileSync} from 'node:fs'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createGuideCapturePage} from './capture-env.mjs'
import {annotateZones, ensureToolbarActionsVisible} from './measure-workspace-layout.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))
const {chromium} = require('playwright')

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide')
const formsRoot = path.join(__dirname, '../data/guide-forms')
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/'
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const VIEW_KEY = process.env.BUILDER_VIEW_KEY ?? 'example-view-name'
const RSUITE_THEME_KEY = process.env.BUILDER_RSUITE_THEME_KEY ?? 'example-rsuite-theme'
const RSUITE_VIEW = process.env.BUILDER_RSUITE_VIEW ?? 'rsuite-inject-css'
const RSUITE_DB = 'form-builder-store'
const RSUITE_STORE = 'form-store'
const FORM_NAME = 'priority-tasks-sortable'
const FIXTURE = 'priority-tasks-sortable.json'
const THEMES = ['light', 'dark']

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove())
}

/** @param {import('playwright').Page} page @param {'light' | 'dark'} theme */
async function prepareBuilder(page, theme = 'light') {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000})
  await page.evaluate(
    ({viewKey, themeKey, view, themeValue}) => {
      localStorage.setItem(viewKey, view)
      localStorage.setItem(themeKey, themeValue)
    },
    {viewKey: VIEW_KEY, themeKey: RSUITE_THEME_KEY, view: RSUITE_VIEW, themeValue: theme},
  )
  await page.reload({waitUntil: 'domcontentloaded'})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await page.waitForTimeout(600)
}

/** @param {import('playwright').Page} page @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = path.join(assetsRoot, section)
  await mkdir(dir, {recursive: true})
  const filePath = path.join(dir, `${basename}.${theme}.png`)
  await page.screenshot({path: filePath, fullPage: false})
  return filePath
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickLeftTab(page, name) {
  await dismissViteOverlay(page)
  await page.getByTestId(`${name}_Tab`).click({force: true})
  await page.waitForTimeout(400)
}

/** @param {import('playwright').Locator} locator */
async function measureLocator(locator) {
  const box = await locator.boundingBox()
  if (!box) {
    throw new Error('Element not found for measurement')
  }
  return box
}

/** @param {string} fileName */
function readGuideForm(fileName) {
  return JSON.parse(readFileSync(path.join(formsRoot, fileName), 'utf8'))
}

/** @param {import('playwright').Page} page @param {string} formName @param {object} formJson */
async function saveFormToIndexedDB(page, formName, formJson) {
  const formValue = JSON.stringify(formJson)
  await page.evaluate(
    async ({db, store, name, value}) => {
      await new Promise((resolve, reject) => {
        const request = indexedDB.open(db)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => {
          const database = request.result
          const tx = database.transaction(store, 'readwrite')
          tx.objectStore(store).put(value, name)
          tx.oncomplete = () => {
            database.close()
            resolve(undefined)
          }
          tx.onerror = () => reject(tx.error)
        }
      })
    },
    {db: RSUITE_DB, store: RSUITE_STORE, name: formName, value: formValue},
  )
}

/** @param {import('playwright').Page} page */
async function openGuideForm(page) {
  await saveFormToIndexedDB(page, FORM_NAME, readGuideForm(FIXTURE))
  await page.reload({waitUntil: 'domcontentloaded'})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await clickLeftTab(page, 'Forms')
  const openItem = page.getByTestId(`form-list-open-item-${FORM_NAME}`)
  if (await openItem.count()) {
    await openItem.click({force: true})
  } else {
    await page.getByTestId('form-list-open-item-RSuiteForm').click({force: true})
  }
  await page.waitForTimeout(900)
  await dismissViteOverlay(page)
  await page.getByTestId('taskList-editable-wrapper').first().waitFor({state: 'visible', timeout: 30_000})
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePalette(page, theme) {
  await clickLeftTab(page, 'Components')
  await page.getByPlaceholder('Search').fill('Sortable list')
  await page.waitForTimeout(500)
  const plainPath = await shot(page, 'fields-and-data', 'sortable-list-palette-plain', theme)
  const item = page.getByTestId('SortableList-palette-component').first()
  if (!(await item.count())) {
    throw new Error('SortableList palette item not found (is the commercial package wired into this builder?)')
  }
  const itemBox = await measureLocator(item)
  annotateZones(
    plainPath,
    path.join(assetsRoot, 'fields-and-data', `highlight-sortable-list-palette.${theme}.png`),
    [
      {
        id: 1,
        label: 'Sortable list',
        rect: [
          Math.round(itemBox.x - 4),
          Math.round(itemBox.y - 4),
          Math.round(itemBox.width + 8),
          Math.round(itemBox.height + 8),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  )
  await page.getByPlaceholder('Search').fill('')
  console.log('  palette')
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTree(page, theme) {
  await clickLeftTab(page, 'Tree')
  await page.getByRole('button', {name: 'Expand all'}).click({force: true})
  await page.waitForTimeout(300)
  await page.getByTestId('taskList').first().click({force: true})
  await page.waitForTimeout(400)
  await ensureToolbarActionsVisible(page)
  const plainPath = await shot(page, 'fields-and-data', 'sortable-list-tree-plain', theme)
  const treeTab = await measureLocator(page.getByTestId('Tree_Tab'))
  const rowTestIds = ['taskList', 'title', 'removeTask', 'addTask']
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
  ]
  for (let index = 0; index < rowTestIds.length; index++) {
    const testId = rowTestIds[index]
    const row = page.getByTestId(testId).first()
    if (!(await row.count())) continue
    const box = await measureLocator(row)
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
    })
  }
  annotateZones(plainPath, path.join(assetsRoot, 'fields-and-data', `highlight-sortable-list-tree.${theme}.png`), zones, {
    noZoneLabels: true,
  })
  console.log('  tree')
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureProperties(page, theme) {
  await clickLeftTab(page, 'Tree')
  await page.getByRole('button', {name: 'Expand all'}).click({force: true})
  await page.getByTestId('taskList').first().click({force: true})
  await ensureToolbarActionsVisible(page)
  await page.getByTestId('Main_Tab').click({force: true})
  await page.waitForTimeout(400)
  const plainPath = await shot(page, 'fields-and-data', 'sortable-list-properties-plain', theme)
  const rightPanel = page.locator('.FE_RightPanel').first()
  const panelBox = await measureLocator(rightPanel)
  annotateZones(
    plainPath,
    path.join(assetsRoot, 'fields-and-data', `highlight-sortable-list-properties.${theme}.png`),
    [
      {
        id: 1,
        label: 'Main',
        rect: [
          Math.round(panelBox.x - 4),
          Math.round(panelBox.y - 4),
          Math.round(panelBox.width + 8),
          Math.round(panelBox.height + 8),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  )
  console.log('  properties')
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function capturePreview(page, theme) {
  await clickLeftTab(page, 'Components')
  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(900)
  const handles = page.getByTestId('sortable-list-handle')
  const handleCount = await handles.count()
  if (handleCount < 3) {
    throw new Error(`Expected at least 3 reorder handles in Preview, found ${handleCount}`)
  }
  await shot(page, 'fields-and-data', 'sortable-list-preview-plain', theme)
  console.log('  preview')
  await page.getByRole('button', {name: 'Edit', exact: true}).click({force: true})
  await page.waitForTimeout(400)
}

async function main() {
  const browser = await chromium.launch({headless: true, executablePath: CHROME_PATH})
  const page = await createGuideCapturePage(browser)

  for (const theme of THEMES) {
    console.log(`Capturing sortable-list screenshots (${theme})...`)
    await prepareBuilder(page, theme)
    await openGuideForm(page)
    await capturePalette(page, theme)
    await captureTree(page, theme)
    await captureProperties(page, theme)
    await capturePreview(page, theme)
  }

  await browser.close()
  console.log(`Screenshots saved under ${path.join(assetsRoot, 'fields-and-data')}`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
