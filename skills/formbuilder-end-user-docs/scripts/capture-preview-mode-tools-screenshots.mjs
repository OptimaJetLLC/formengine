#!/usr/bin/env node
/**
 * Captures Preview mode tool highlights for preview-and-handoff/preview-mode-tools.md.
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module'
import {readFileSync} from 'node:fs'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createGuideCapturePage} from './capture-env.mjs'
import {annotateHighlight} from './measure-workspace-layout.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))
const {chromium} = require('playwright')

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide')
const formsRoot = path.join(__dirname, '../data/guide-forms')
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/'
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const THEMES = ['light', 'dark']
/** Validated two-field form so Validate produces visible errors. */
const FORM_FILE = 'add-fields-validated.json'

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
  await page.evaluate((value) => {
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

/**
 * @param {string} plainPath
 * @param {string} outPath
 * @param {{x:number,y:number,width:number,height:number}} box
 * @param {string} label
 * @param {string} color
 */
function highlightBox(plainPath, outPath, box, label, color) {
  annotateHighlight(plainPath, outPath, {
    rect: [
      Math.round(box.x - 4),
      Math.round(box.y - 4),
      Math.round(box.width + 8),
      Math.round(box.height + 8),
    ],
    label,
    color,
  })
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTheme(page, theme) {
  await gotoForm(page, theme)
  await page.getByTestId('Components_Tab').click({force: true})
  await page.waitForTimeout(300)

  // --- Open Preview: Edit mode, highlight Preview button ---
  await page.mouse.move(40, 120)
  await page.waitForTimeout(200)
  const editPlain = await shot(page, 'preview-and-handoff', 'preview-before-plain', theme)
  const previewBox = await measureLocator(page.getByRole('button', {name: 'Preview'}))
  highlightBox(
    editPlain,
    path.join(assetsRoot, 'preview-and-handoff', `highlight-preview-button.${theme}.png`),
    previewBox,
    'Preview',
    '#8B5CF6',
  )
  // Also refresh shared workspace highlight used elsewhere
  highlightBox(
    editPlain,
    path.join(assetsRoot, 'workspace', `highlight-preview.${theme}.png`),
    previewBox,
    'Preview',
    '#8B5CF6',
  )
  console.log(`  ${theme}: Preview button (Edit mode)`)

  // Enter Preview
  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(900)
  await page.getByTestId('viewer-validate-button').waitFor({state: 'visible', timeout: 10_000})

  // Refresh plain Preview panel (Data / Errors tools visible)
  const panelPlain = await shot(page, 'preview-and-handoff', 'preview-data-panel-plain', theme)
  console.log(`  ${theme}: preview data panel plain`)

  // --- Run Validate: highlight Validate, then capture errors state ---
  const validateBox = await measureLocator(page.getByTestId('viewer-validate-button'))
  highlightBox(
    panelPlain,
    path.join(assetsRoot, 'preview-and-handoff', `highlight-preview-validate.${theme}.png`),
    validateBox,
    'Validate',
    '#3B82F6',
  )
  console.log(`  ${theme}: Validate highlight`)

  await page.getByTestId('viewer-validate-button').click({force: true})
  await page.waitForTimeout(600)
  await shot(page, 'preview-and-handoff', 'preview-validate-errors-plain', theme)
  console.log(`  ${theme}: validate errors plain`)

  // --- Reset or Clear: highlight Clear (tools still visible after validate) ---
  const clearPlain = await shot(page, 'preview-and-handoff', 'preview-clear-tools-plain', theme)
  const clearBox = await measureLocator(page.getByTestId('viewer-clear-button'))
  highlightBox(
    clearPlain,
    path.join(assetsRoot, 'preview-and-handoff', `highlight-preview-clear.${theme}.png`),
    clearBox,
    'Clear',
    '#F59E0B',
  )
  console.log(`  ${theme}: Clear highlight`)

  // Also capture Reset highlight as optional plain sibling (same toolbar)
  const resetBox = await measureLocator(page.getByTestId('viewer-reset-button'))
  highlightBox(
    clearPlain,
    path.join(assetsRoot, 'preview-and-handoff', `highlight-preview-reset.${theme}.png`),
    resetBox,
    'Reset to default',
    '#10B981',
  )

  // Fill a value so Data panel is useful for highlight-preview-data
  const fullName = page.getByLabel('Full name', {exact: false}).first()
  if (await fullName.count()) {
    await fullName.fill('Alex')
  }
  await page.waitForTimeout(400)
  const filledPlain = await shot(page, 'preview-and-handoff', 'preview-data-filled-plain', theme)
  const dataHeader = page.getByText('Data', {exact: true}).first()
  const dataBox = await measureLocator(dataHeader)
  annotateHighlight(filledPlain, path.join(assetsRoot, 'preview-and-handoff', `highlight-preview-data.${theme}.png`), {
    rect: [Math.round(dataBox.x - 8), Math.round(dataBox.y - 4), Math.round(280), Math.round(220)],
    label: 'Data',
    color: '#10B981',
  })
  console.log(`  ${theme}: Data panel highlight`)

  // Edit button highlight for Return to Edit
  const previewModePlain = await shot(page, 'preview-and-handoff', 'preview-mode-plain', theme)
  const editBox = await measureLocator(page.getByRole('button', {name: 'Edit'}))
  highlightBox(
    previewModePlain,
    path.join(assetsRoot, 'workspace', `highlight-edit-button.${theme}.png`),
    editBox,
    'Edit',
    '#8B5CF6',
  )
  console.log(`  ${theme}: Edit button`)
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true})
  const page = await createGuideCapturePage(browser)
  for (const theme of THEMES) {
    console.log(`theme ${theme}`)
    await captureTheme(page, theme)
  }
  await browser.close()
  console.log('Done.')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
