#!/usr/bin/env node
/**
 * Captures Signature component screenshots for developer docs:
 * documentation/docs/formengine-designer/components/signature.mdx
 *
 * Requires a running example-builder at BUILDER_URL (default http://127.0.0.1:5173/).
 *
 * Usage (from repo root):
 *   CHROME_PATH=/usr/bin/google-chrome node documentation/website/scripts/capture-signature-docs-screenshots.ts
 *   npm run compress-image --prefix documentation/website -- static/assets/formengine-designer/components/signature
 */
import {createRequire} from 'node:module'
import {mkdir, rm} from 'node:fs/promises'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../../..')
const require = createRequire(path.join(repoRoot, 'package.json'))
const {chromium} = require('playwright')

const BUILDER_URL = process.env.BUILDER_URL ?? 'http://127.0.0.1:5173/'
const CHROME_PATH = process.env.CHROME_PATH ?? '/usr/bin/google-chrome'
const OUT_DIR = path.join(repoRoot, 'documentation/website/static/assets/formengine-designer/components/signature')
const RSUITE_DB = 'form-builder-store'
const RSUITE_STORE = 'form-store'
const FORM_NAME = 'signature-demo'

const FORM = {
  errorType: 'RsErrorMessage',
  tooltipType: 'RsTooltip',
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'agreement',
        type: 'RsLabel',
        props: {
          text: {value: 'I confirm that the information on this form is accurate.'},
        },
      },
      {
        key: 'signature',
        type: 'RsSignature',
        props: {
          label: {value: 'Authorized signature'},
          clearButtonText: {value: 'Clear'},
          width: {value: 370},
          height: {value: 200},
          lineWidth: {value: 1.5},
          penColor: {value: 'rgba(0, 0, 0, 1)'},
          backgroundColor: {value: 'rgba(167, 167, 167, 0.1)'},
        },
      },
    ],
  },
}

/** @param {import('playwright').Page} page */
async function dismissViteOverlay(page) {
  await page.evaluate(() => document.querySelector('vite-error-overlay')?.remove()).catch(() => {})
}

/**
 * @param {import('playwright').Page} page
 * @param {string} formName
 * @param {object} formJson
 */
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
    {db: RSUITE_DB, store: RSUITE_STORE, name: formName, value: formValue}
  )
}

/** @param {import('playwright').Page} page */
async function prepareBuilder(page) {
  await page.goto(BUILDER_URL, {waitUntil: 'domcontentloaded', timeout: 60_000})
  await page.evaluate(() => {
    localStorage.setItem('example-view-name', 'rsuite-inject-css')
    localStorage.setItem('example-rsuite-theme', 'light')
  })
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await page.waitForTimeout(600)
}

/** @param {import('playwright').Page} page */
async function openSignatureForm(page) {
  await saveFormToIndexedDB(page, FORM_NAME, FORM)
  await page.reload({waitUntil: 'domcontentloaded', timeout: 60_000})
  await dismissViteOverlay(page)
  await page.waitForSelector('[data-testid="Components_Tab"]', {timeout: 60_000})
  await page.getByTestId('Forms_Tab').click({force: true})
  await page.waitForTimeout(500)
  const openItem = page.getByTestId(`form-list-open-item-${FORM_NAME}`)
  await openItem.waitFor({state: 'visible', timeout: 15_000})
  await openItem.click({force: true})
  await page.waitForTimeout(900)
  await dismissViteOverlay(page)
}

/**
 * Draw a simple cursive-like stroke on the signature canvas.
 * @param {import('playwright').Page} page
 */
async function drawSignature(page) {
  const canvas = page.locator('canvas').first()
  await canvas.waitFor({state: 'visible', timeout: 15_000})
  const box = await canvas.boundingBox()
  if (!box) {
    throw new Error('Signature canvas has no bounding box')
  }
  const startX = box.x + box.width * 0.15
  const startY = box.y + box.height * 0.55
  await page.mouse.move(startX, startY)
  await page.mouse.down()
  const points = [
    [0.18, 0.55],
    [0.22, 0.35],
    [0.28, 0.7],
    [0.34, 0.4],
    [0.4, 0.55],
    [0.48, 0.45],
    [0.55, 0.6],
    [0.62, 0.4],
    [0.7, 0.55],
    [0.78, 0.48],
    [0.85, 0.52],
  ]
  for (const [px, py] of points) {
    await page.mouse.move(box.x + box.width * px, box.y + box.height * py, {steps: 4})
  }
  await page.mouse.up()
  await page.waitForTimeout(400)
}

async function main() {
  await mkdir(OUT_DIR, {recursive: true})
  await rm(path.join(OUT_DIR, '.gitkeep'), {force: true})

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  })
  const page = await browser.newPage({
    viewport: {width: 1440, height: 900},
    deviceScaleFactor: 2,
  })

  await prepareBuilder(page)
  await openSignatureForm(page)

  // Select signature via Tree
  await page.getByTestId('Tree_Tab').click({force: true})
  await page.waitForTimeout(300)
  const expandAll = page.getByRole('button', {name: 'Expand all'})
  if ((await expandAll.count()) > 0) {
    await expandAll.click({force: true})
    await page.waitForTimeout(200)
  }
  await page.getByTestId('signature').first().click({force: true})
  await page.waitForTimeout(500)

  const mainTab = page.getByRole('tab', {name: 'Main'})
  if ((await mainTab.count()) > 0) {
    await mainTab.first().click({force: true})
    await page.waitForTimeout(300)
  }

  const shot1 = path.join(OUT_DIR, 'signature-01.png')
  await page.screenshot({path: shot1, fullPage: false})
  console.log('Wrote', shot1)

  // Palette filtered to Signature
  await page.getByTestId('Components_Tab').click({force: true})
  await page.waitForTimeout(400)
  const search = page.getByPlaceholder('Search')
  await search.fill('Signature')
  await page.waitForTimeout(500)
  const paletteItem = page.getByTestId('RsSignature-palette-component').or(page.getByText('Signature', {exact: true}).first())
  if ((await paletteItem.count()) > 0) {
    await paletteItem.first().hover({force: true}).catch(() => {})
  }

  const shot2 = path.join(OUT_DIR, 'signature-02.png')
  await page.screenshot({path: shot2, fullPage: false})
  console.log('Wrote', shot2)

  // Preview with drawn signature
  await page.getByRole('button', {name: 'Preview'}).click({force: true})
  await page.waitForTimeout(1000)
  await drawSignature(page)

  const shot3 = path.join(OUT_DIR, 'signature-03.png')
  await page.screenshot({path: shot3, fullPage: false})
  console.log('Wrote', shot3)

  await browser.close()
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
