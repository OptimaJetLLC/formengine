#!/usr/bin/env node
/**
 * Captures fields-and-data/labels-and-help screenshots after FE-2239:
 * 1. Tree + canvas select (hamburger hub)
 * 2. Main tab Label / Helper text highlights
 * 3. Preview with updated label
 *
 * Requires a running MUI builder (BUILDER_URL, default http://localhost:5173/).
 */
import {createRequire} from 'node:module'
import {readFileSync} from 'node:fs'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createGuideCapturePage} from './capture-env.mjs'
import {annotateHighlight, annotateZones, waitForToolbarHub} from './measure-workspace-layout.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))
const {chromium} = require('playwright')

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide')
const formsRoot = path.join(__dirname, '../data/guide-forms')
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/'
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const THEMES = ['light', 'dark']
const FORM_FILE = 'labels-demo.json'
const FIELD_KEY = 'workEmail'

/** @param {string} formFile */
function formUrl(formFile, view = 'mui') {
  const name = formFile.replace(/\.json$/i, '')
  const jsonText = readFileSync(path.join(formsRoot, `${name}.json`), 'utf8')
  const body = Buffer.from(JSON.stringify(JSON.parse(jsonText)), 'utf8').toString('base64url')
  const url = new URL(BUILDER_URL)
  url.searchParams.set('formBody', body)
  url.searchParams.set('formName', name)
  url.searchParams.set('view', view)
  return url.toString()
}

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove()).catch(() => {})
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function gotoForm(page, theme) {
  await page.goto(formUrl(FORM_FILE), {waitUntil: 'domcontentloaded', timeout: 60_000})
  await page.evaluate(value => {
    localStorage.setItem('example-view-name', 'mui')
    localStorage.setItem('example-mui-theme', value)
  }, theme)
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await page.waitForTimeout(700)
}

/** @param {import('playwright').Page} page @param {string} section @param {string} basename @param {'light' | 'dark'} theme */
async function shot(page, section, basename, theme) {
  const dir = path.join(assetsRoot, section)
  await mkdir(dir, {recursive: true})
  const filePath = path.join(dir, `${basename}.${theme}.png`)
  await page.screenshot({path: filePath, fullPage: false})
  return filePath
}

/** @param {import('playwright').Locator} locator */
async function measureLocator(locator) {
  const box = await locator.boundingBox()
  if (!box) {
    throw new Error('Element not found for measurement')
  }
  return box
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickLeftTab(page, name) {
  await dismissViteOverlay(page)
  await page.getByTestId(`${name}_Tab`).click({force: true})
  await page.waitForTimeout(300)
}

/** @param {import('playwright').Page} page @param {string} name */
async function clickRightTab(page, name) {
  await page.getByTestId(`${name}_Tab`).click({force: true})
  await page.waitForTimeout(300)
}

/** @param {import('playwright').Page} page @param {string} testId */
async function selectTreeItem(page, testId) {
  await clickLeftTab(page, 'Tree')
  await page.getByRole('button', {name: 'Expand all'}).click({force: true})
  await page.waitForTimeout(300)
  await page.getByTestId(testId).first().click({force: true})
  await page.waitForTimeout(400)
  await waitForToolbarHub(page)
}

/**
 * @param {import('playwright').Page} page
 * @param {string} propertyKey
 * @param {string} value
 */
async function fillMainStringProperty(page, propertyKey, value) {
  const wrapper = page.locator(`[data-testid="${propertyKey}-labeled-wrapper"]`).first()
  await wrapper.waitFor({state: 'visible', timeout: 10_000})
  const input = wrapper.locator('input, textarea').first()
  if (await input.count()) {
    await input.fill(value)
    return
  }
  const rsInput = wrapper.locator('.rs-input input').first()
  if (await rsInput.count()) {
    await rsInput.fill(value)
    return
  }
  throw new Error(`Could not find input for property: ${propertyKey}`)
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureSelectField(page, theme) {
  await gotoForm(page, theme)
  await selectTreeItem(page, FIELD_KEY)

  const treeRow = page.getByTestId(FIELD_KEY).first()
  const canvas = page.getByTestId(`${FIELD_KEY}-editable-wrapper`).first()
  const plainPath = await shot(page, 'fields-and-data', 'labels-select-plain', theme)
  const treeBox = await measureLocator(treeRow)
  const canvasBox = await measureLocator(canvas)

  annotateZones(
    plainPath,
    path.join(assetsRoot, 'fields-and-data', `highlight-labels-select.${theme}.png`),
    [
      {
        id: 1,
        label: 'Tree',
        rect: [
          Math.round(treeBox.x - 4),
          Math.round(treeBox.y - 2),
          Math.round(treeBox.width + 200),
          Math.round(treeBox.height + 4),
        ],
        color: '#3B82F6',
        showBadge: false,
      },
      {
        id: 2,
        label: 'Canvas',
        rect: [
          Math.round(canvasBox.x - 6),
          Math.round(canvasBox.y - 6),
          Math.round(canvasBox.width + 12),
          Math.round(canvasBox.height + 12),
        ],
        color: '#F59E0B',
        showBadge: false,
      },
    ],
    {noZoneLabels: true},
  )
  console.log(`labels-select ${theme}`)
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureMainAndPreview(page, theme) {
  await gotoForm(page, theme)
  await selectTreeItem(page, FIELD_KEY)
  await clickRightTab(page, 'Main')
  await page.waitForTimeout(500)

  await fillMainStringProperty(page, 'label', 'Business email')
  await fillMainStringProperty(page, 'helperText', 'Use your work address.')
  await page.waitForTimeout(300)
  await waitForToolbarHub(page)

  const mainPlain = await shot(page, 'fields-and-data', 'labels-main-plain', theme)
  const labelBox = await measureLocator(page.locator('[data-testid="label-labeled-wrapper"]').first())
  const helperBox = await measureLocator(page.locator('[data-testid="helperText-labeled-wrapper"]').first())
  annotateZones(
    mainPlain,
    path.join(assetsRoot, 'fields-and-data', `highlight-labels-main.${theme}.png`),
    [
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
    ],
    {noZoneLabels: true},
  )
  console.log(`labels-main ${theme}`)

  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(800)
  const previewPlain = await shot(page, 'fields-and-data', 'labels-preview-plain', theme)
  const labelOnCanvas = page.getByText('Business email', {exact: true}).first()
  if (await labelOnCanvas.count()) {
    const labelCanvasBox = await measureLocator(labelOnCanvas)
    annotateHighlight(previewPlain, path.join(assetsRoot, 'fields-and-data', `highlight-labels-preview.${theme}.png`), {
      rect: [
        Math.round(labelCanvasBox.x - 8),
        Math.round(labelCanvasBox.y - 8),
        Math.round(labelCanvasBox.width + 16),
        Math.round(labelCanvasBox.height + 40),
      ],
      label: 'Label in Preview',
      color: '#3B82F6',
    })
  }
  console.log(`labels-preview ${theme}`)
  await page.getByRole('button', {name: 'Edit'}).click({force: true})
  await page.waitForTimeout(400)
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true})
  const page = await createGuideCapturePage(browser)
  for (const theme of THEMES) {
    await captureSelectField(page, theme)
    await captureMainAndPreview(page, theme)
  }
  await browser.close()
  console.log('Done: labels-and-help screenshots')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
