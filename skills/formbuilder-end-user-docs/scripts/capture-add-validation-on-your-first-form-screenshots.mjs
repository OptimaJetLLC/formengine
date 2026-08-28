#!/usr/bin/env node
/**
 * Captures screenshots for first-form/add-validation-on-your-first-form.md:
 * 1. Tree with Full name selected (starting two-field form)
 * 2. Rules tab highlighted
 * 3. Add a validation rule picker open
 * 4. Preview after Validate with required errors
 *
 * Requires a running MUI builder at localhost:5173.
 */
import {createRequire} from 'node:module'
import {readFileSync} from 'node:fs'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createGuideCapturePage} from './capture-env.mjs'
import {annotateHighlight, annotateZones} from './measure-workspace-layout.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))
const {chromium} = require('playwright')

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide')
const formsRoot = path.join(__dirname, '../data/guide-forms')
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/'
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const THEMES = ['light', 'dark']
const START_FORM = 'add-fields-two-fields.json'
const VALIDATED_FORM = 'add-fields-validated.json'

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

/** @param {import('playwright').Page} page */
async function selectFullNameInTree(page) {
  await page.getByTestId('Tree_Tab').click({force: true})
  await page.waitForTimeout(300)
  const expandAll = page.getByRole('button', {name: 'Expand all'})
  if (await expandAll.count()) {
    await expandAll.click({force: true})
    await page.waitForTimeout(300)
  }
  await page.getByTestId('fullName').first().click({force: true})
  await page.waitForTimeout(400)
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTheme(page, theme) {
  await gotoThemeUrl(page, theme, formUrl(START_FORM))
  await selectFullNameInTree(page)
  await dismissLicenseBanner(page)

  const selectPlain = await shot(page, 'first-form', 'select-validation-field-plain', theme)
  await shot(page, 'first-form', 'add-fields-validated-plain', theme)
  const treeRowBox = await measureLocator(page.getByTestId('fullName').first())
  highlightBox(
    selectPlain,
    path.join(assetsRoot, 'first-form', `highlight-select-validation-field.${theme}.png`),
    treeRowBox,
    'Full name',
    '#3B82F6',
  )
  console.log(`  ${theme}: Full name selected in Tree`)

  await page.getByTestId('Rules_Tab').click({force: true})
  await page.waitForTimeout(400)
  const rulesPlain = await shot(page, 'first-form', 'rules-tab-plain', theme)
  const rulesTabBox = await measureLocator(page.getByTestId('Rules_Tab'))
  highlightBox(
    rulesPlain,
    path.join(assetsRoot, 'first-form', `highlight-rules-tab.${theme}.png`),
    rulesTabBox,
    'Rules',
    '#F59E0B',
  )
  console.log(`  ${theme}: Rules tab`)

  await page.getByTestId('add-rule-button').click({force: true})
  await page.getByTestId('rule-menu-item-internal-nonEmpty').waitFor({state: 'visible', timeout: 8_000})
  await page.waitForTimeout(200)
  const addRulePlain = await shot(page, 'first-form', 'validation-add-rule-plain', theme)
  const addButtonBox = await measureLocator(page.getByTestId('add-rule-button'))
  const rsuiteMenu = page.locator('.rs-dropdown-menu').last()
  const roleMenu = page.locator('[role="menu"]').last()
  const menuBox = (await rsuiteMenu.boundingBox()) ?? (await roleMenu.boundingBox())
  if (!menuBox) {
    throw new Error('Validation rule picker menu not found')
  }
  annotateZones(
    addRulePlain,
    path.join(assetsRoot, 'first-form', `highlight-validation-add-rule.${theme}.png`),
    [
      {
        id: 1,
        label: 'Add a validation rule',
        rect: [
          Math.round(addButtonBox.x - 4),
          Math.round(addButtonBox.y - 4),
          Math.round(addButtonBox.width + 8),
          Math.round(addButtonBox.height + 8),
        ],
        color: '#3B82F6',
      },
      {
        id: 2,
        label: 'Non empty',
        rect: [Math.round(menuBox.x - 4), Math.round(menuBox.y - 4), Math.round(menuBox.width + 8), Math.round(menuBox.height + 8)],
        color: '#F59E0B',
      },
    ],
    {noZoneLabels: true},
  )
  await page.keyboard.press('Escape')
  console.log(`  ${theme}: Add a validation rule picker`)

  await gotoThemeUrl(page, theme, formUrl(VALIDATED_FORM))
  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(900)
  await page.getByTestId('viewer-validate-button').waitFor({state: 'visible', timeout: 10_000})
  await page.getByTestId('viewer-validate-button').click({force: true})
  await page.waitForTimeout(600)
  await dismissLicenseBanner(page)
  await page.mouse.move(40, 120)
  await page.waitForTimeout(200)
  await shot(page, 'first-form', 'validation-preview-errors-plain', theme)
  console.log(`  ${theme}: Preview validation errors`)
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true})
  const page = await createGuideCapturePage(browser)
  for (const theme of THEMES) {
    console.log(`theme ${theme}`)
    await captureTheme(page, theme)
  }
  await browser.close()
  console.log('Done: first-form/add-validation-on-your-first-form screenshots')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
