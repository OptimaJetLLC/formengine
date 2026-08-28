#!/usr/bin/env node
/**
 * Captures device mode + orientation highlights for preview-and-handoff/device-preview.md.
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
const FORM_FILE = 'shipping-columns.json'

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

/** @param {import('playwright').Page} page @param {'desktop' | 'mobile' | 'tablet'} mode */
async function clickDeviceMode(page, mode) {
  const index = {desktop: 0, mobile: 1, tablet: 2}[mode]
  const button = page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(index)
  await button.click({force: true})
  await page.waitForTimeout(600)
  // Confirm active color on the target icon (light and dark theme selected blues differ).
  await page.waitForFunction(
    (i) => {
      const el = document.querySelectorAll('.FE_ResolutionSelect .rs-btn-group button')[i]
      const icon = el?.querySelector('svg, .rs-icon')
      if (!icon) return false
      const color = getComputedStyle(icon).color
      return /rgb\(\s*22,\s*117,\s*224\s*\)/.test(color) || /rgb\(\s*52,\s*195,\s*255\s*\)/.test(color)
    },
    index,
    {timeout: 5_000},
  )
}

/**
 * Union of Desktop + Mobile + Tablet buttons (excludes JSON view).
 * @param {import('playwright').Page} page
 */
async function measureDeviceModeSelector(page) {
  const desktop = await measureLocator(page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(0))
  const tablet = await measureLocator(page.locator('.FE_ResolutionSelect .rs-btn-group button').nth(2))
  const x = Math.min(desktop.x, tablet.x)
  const y = Math.min(desktop.y, tablet.y)
  const right = Math.max(desktop.x + desktop.width, tablet.x + tablet.width)
  const bottom = Math.max(desktop.y + desktop.height, tablet.y + tablet.height)
  return {
    x: x - 4,
    y: y - 4,
    width: right - x + 8,
    height: bottom - y + 8,
  }
}

/**
 * Orientation IconButton is the direct child button before the device btn-group.
 * @param {import('playwright').Page} page
 */
async function measureOrientationButton(page) {
  const button = page.locator('.FE_ResolutionSelect > button').first()
  await button.waitFor({state: 'visible', timeout: 10_000})
  return measureLocator(button)
}

/**
 * @param {import('playwright').Page} page
 * @param {'light' | 'dark'} theme
 */
async function captureTheme(page, theme) {
  await gotoForm(page, theme)
  await page.getByTestId('Components_Tab').click({force: true})
  await page.waitForTimeout(300)

  // --- Choose a device mode: Mobile active, highlight Desktop/Mobile/Tablet group ---
  await clickDeviceMode(page, 'mobile')
  // Dismiss tooltip so it does not cover the highlight
  await page.mouse.move(40, 120)
  await page.waitForTimeout(300)
  const modesPlain = await shot(page, 'preview-and-handoff', 'device-mobile-plain', theme)
  const modesBox = await measureDeviceModeSelector(page)
  annotateHighlight(modesPlain, path.join(assetsRoot, 'preview-and-handoff', `highlight-device-mode-selector.${theme}.png`), {
    rect: [Math.round(modesBox.x), Math.round(modesBox.y), Math.round(modesBox.width), Math.round(modesBox.height)],
    label: 'Device modes',
    color: '#8B5CF6',
  })
  console.log(`  ${theme}: device mode selector`)

  // --- Toggle orientation: Tablet active, highlight Orientation control ---
  await clickDeviceMode(page, 'tablet')
  await page.locator('body').click({position: {x: 40, y: 200}, force: true})
  await page.waitForTimeout(400)
  const orientationPlain = await shot(page, 'preview-and-handoff', 'device-orientation-plain', theme)
  const orientationBox = await measureOrientationButton(page)
  annotateHighlight(
    orientationPlain,
    path.join(assetsRoot, 'preview-and-handoff', `highlight-device-orientation.${theme}.png`),
    {
      rect: [
        Math.round(orientationBox.x - 4),
        Math.round(orientationBox.y - 4),
        Math.round(orientationBox.width + 8),
        Math.round(orientationBox.height + 8),
      ],
      label: 'Orientation',
      color: '#F59E0B',
    },
  )
  console.log(`  ${theme}: orientation (tablet)`)

  // Keep Preview interaction shot in sync with the same form
  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(800)
  await clickDeviceMode(page, 'mobile')
  await shot(page, 'preview-and-handoff', 'device-mobile-preview-plain', theme)
  console.log(`  ${theme}: mobile preview`)
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
