#!/usr/bin/env node
/**
 * Captures screenshots for first-form/preview-your-first-form.md:
 * 1. Edit mode with Preview highlighted (starting validated form)
 * 2. Finished first form with Save button (plain)
 * 3. Preview mode with Edit highlighted
 *
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
const START_FORM = 'add-fields-validated.json'
const FINISHED_FORM = 'add-fields-with-button.json'

/**
 * @param {string} formFile
 * @param {string} [view]
 */
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
 * Hides license / domain-restriction banners so captures match the published product chrome.
 * @param {import('playwright').Page} page
 */
async function dismissLicenseBanner(page) {
  await page
    .evaluate(() => {
      const nodes = document.querySelectorAll('[class*="Alert"], [role="alert"], [class*="license"], [class*="License"]')
      for (const node of nodes) {
        const text = node.textContent ?? ''
        if (/license|non-commercial/i.test(text)) {
          node.remove()
        }
      }
    })
    .catch(() => {})
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 * @param {string} url
 */
async function gotoThemeUrl(page, theme, url) {
  await page.goto(url, {waitUntil: 'domcontentloaded', timeout: 60_000})
  await page.evaluate((value) => {
    localStorage.setItem('example-view-name', 'mui')
    localStorage.setItem('example-mui-theme', value)
  }, theme)
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await page.getByTestId('Components_Tab').click({force: true})
  await dismissLicenseBanner(page)
  await page.mouse.move(40, 120)
  await page.waitForTimeout(500)
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
    rect: [Math.round(box.x - 4), Math.round(box.y - 4), Math.round(box.width + 8), Math.round(box.height + 8)],
    label,
    color,
    showLabel: false,
  })
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTheme(page, theme) {
  await gotoThemeUrl(page, theme, formUrl(START_FORM))

  const openPreviewPlain = await shot(page, 'first-form', 'open-preview-plain', theme)
  const previewBox = await measureLocator(page.getByRole('button', {name: 'Preview'}))
  highlightBox(
    openPreviewPlain,
    path.join(assetsRoot, 'first-form', `highlight-preview.${theme}.png`),
    previewBox,
    'Preview',
    '#8B5CF6',
  )
  console.log(`  ${theme}: Preview button (validated form)`)

  await gotoThemeUrl(page, theme, formUrl(FINISHED_FORM))
  await shot(page, 'first-form', 'add-fields-with-button-plain', theme)
  console.log(`  ${theme}: finished form with Save button`)

  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(900)
  await page.getByRole('button', {name: 'Edit'}).waitFor({state: 'visible', timeout: 10_000})
  await dismissLicenseBanner(page)
  await page.mouse.move(40, 120)
  await page.waitForTimeout(300)

  const previewModePlain = await shot(page, 'first-form', 'preview-mode-plain', theme)
  const editBox = await measureLocator(page.getByRole('button', {name: 'Edit'}))
  highlightBox(
    previewModePlain,
    path.join(assetsRoot, 'first-form', `highlight-edit-button.${theme}.png`),
    editBox,
    'Edit',
    '#8B5CF6',
  )
  console.log(`  ${theme}: Edit button (Preview mode)`)
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true})
  const page = await createGuideCapturePage(browser)
  for (const theme of THEMES) {
    console.log(`theme ${theme}`)
    await captureTheme(page, theme)
  }
  await browser.close()
  console.log('Done: first-form/preview-your-first-form screenshots')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
