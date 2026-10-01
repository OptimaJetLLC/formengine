#!/usr/bin/env node
/**
 * Captures floating-toolbar / add-button / clone / delete screenshots after FE-2239.
 * Requires a running MUI builder (BUILDER_URL, default http://localhost:5173/).
 *
 * Outputs (light + dark):
 * - workspace/floating-toolbar-plain
 * - workspace/toolbar-actions-plain + highlight-toolbar-clone / highlight-toolbar-delete / highlight-toolbar-add
 * - workspace/components-add-button-hover-plain
 * - workspace/components-add-modal-plain
 */
import {createRequire} from 'node:module'
import {readFileSync} from 'node:fs'
import {mkdir} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import {createGuideCapturePage} from './capture-env.mjs'
import {
  annotateArrow,
  measureComponentToolbarArrow,
  revealComponentToolbarActions,
  writeMeasurementPreset,
} from './measure-workspace-layout.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))
const {chromium} = require('playwright')

const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide')
const formsRoot = path.join(__dirname, '../data/guide-forms')
const BUILDER_URL = process.env.BUILDER_URL ?? 'http://localhost:5173/'
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const THEMES = ['light', 'dark']
const EVENT_FORM = 'event-registration.json'
const ADD_FORM = 'add-fields-two-fields.json'

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
 * @param {string} formFile
 * @param {'light' | 'dark'} theme
 */
async function gotoForm(page, formFile, theme) {
  await page.goto(formUrl(formFile), {waitUntil: 'domcontentloaded', timeout: 60_000})
  await page.evaluate(value => {
    localStorage.setItem('example-view-name', 'mui')
    localStorage.setItem('example-mui-theme', value)
  }, theme)
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await dismissLicenseBanner(page)
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

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureFloatingToolbar(page, theme) {
  await gotoForm(page, EVENT_FORM, theme)
  await page.getByTestId('email-editable-wrapper').click({force: true})
  await page.waitForTimeout(400)
  await revealComponentToolbarActions(page)
  await shot(page, 'workspace', 'floating-toolbar-plain', theme)
  console.log(`floating-toolbar ${theme}`)
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureCloneDeleteAndAdd(page, theme) {
  await gotoForm(page, ADD_FORM, theme)
  const field = page.getByTestId('fullName-editable-wrapper')
  await field.click({force: true})
  await page.waitForTimeout(400)
  await revealComponentToolbarActions(page)

  const plainPath = await shot(page, 'workspace', 'toolbar-actions-plain', theme)
  const key = 'fullName'
  const cloneArrow = await measureComponentToolbarArrow(page, key, 'clone')
  const deleteArrow = await measureComponentToolbarArrow(page, key, 'delete')
  const addArrow = await measureComponentToolbarArrow(page, key, 'add')

  if (theme === 'light') {
    writeMeasurementPreset(path.join(__dirname, 'arrows-toolbar-actions-1440x900.json'), {
      viewport: '1440x900',
      description: 'Arrow coordinates from selected field to toolbar clone/delete/add buttons (FE-2239 hub strip open).',
      arrows: {
        clone: cloneArrow,
        delete: deleteArrow,
        add: addArrow,
      },
    })
  }

  annotateArrow(plainPath, path.join(assetsRoot, 'workspace', `highlight-toolbar-clone.${theme}.png`), cloneArrow)
  annotateArrow(plainPath, path.join(assetsRoot, 'workspace', `highlight-toolbar-delete.${theme}.png`), deleteArrow)
  annotateArrow(plainPath, path.join(assetsRoot, 'workspace', `highlight-toolbar-add.${theme}.png`), addArrow)
  console.log(`toolbar clone/delete/add ${theme}`)

  await revealComponentToolbarActions(page)
  const addButton = page.locator('.FE_Component_Toolbar_AddButton button, .FE_Component_Toolbar_AddButton .add-button').first()
  await addButton.click()
  await page.waitForTimeout(400)
  await page.getByRole('button', {name: 'Before'}).waitFor({state: 'visible', timeout: 5_000})
  await shot(page, 'workspace', 'components-add-button-hover-plain', theme)
  console.log(`add-button Before/After ${theme}`)

  await page.getByRole('button', {name: 'Before'}).click()
  await page.getByText('Click to add control').waitFor({state: 'visible', timeout: 5_000})
  await page.waitForTimeout(400)
  await shot(page, 'workspace', 'components-add-modal-plain', theme)
  console.log(`add-modal ${theme}`)
  await page.keyboard.press('Escape')
  await page.waitForTimeout(300)
}

async function main() {
  const browser = await chromium.launch({executablePath: CHROME_PATH, headless: true})
  const page = await createGuideCapturePage(browser)
  for (const theme of THEMES) {
    await captureFloatingToolbar(page, theme)
    await captureCloneDeleteAndAdd(page, theme)
  }
  await browser.close()
  console.log('Done: floating toolbar / add-button / clone / delete screenshots')
}

main().catch(error => {
  console.error(error)
  process.exitCode = 1
})
