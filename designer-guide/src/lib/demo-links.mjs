/**
 * Demo deep-link helpers for Form Author Guide articles.
 * Demo app: packages/apps/demo (https://demo.formengine.io/ ; local Vite http://localhost:5173/)
 *
 * Query params (implemented in apps-common-designer):
 *   form=empty | <bundledName>
 *   formBody=<base64url minified JSON>
 *   formName=<optional display name>
 *   view=mui | mantine | rsuite-inject-css | rsuite-import-css
 *
 * Injected markdown always uses the production host; Astro rewrites to the local
 * Vite URL during `astro dev` (see `src/lib/demo-base.mjs`).
 */
import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import {PRODUCTION_DEMO_BASE_URL} from './demo-base.mjs'

const DEMO_BASE_URL = PRODUCTION_DEMO_BASE_URL

const __dirname = dirname(fileURLToPath(import.meta.url))
const GUIDE_FORMS_DIR = join(__dirname, '../../../skills/formbuilder-end-user-docs/data/guide-forms')


function encodeFormBody(jsonText) {
  const mini = JSON.stringify(JSON.parse(jsonText))
  return Buffer.from(mini, 'utf8').toString('base64url')
}

function loadGuideFormBody(formFile) {
  const name = formFile.replace(/\.json$/i, '').split(/[/\\]/).pop()
  const fileName = formFile.endsWith('.json') ? formFile.split(/[/\\]/).pop() : `${name}.json`
  const jsonText = readFileSync(join(GUIDE_FORMS_DIR, fileName), 'utf8')
  return {body: encodeFormBody(jsonText), formName: name}
}

function buildDemoUrl(options = {}) {
  const url = new URL(DEMO_BASE_URL)
  if (options.form) {
    url.searchParams.set('form', options.form)
  }
  if (options.formFile) {
    const {body, formName} = loadGuideFormBody(options.formFile)
    url.searchParams.set('formBody', body)
    url.searchParams.set('formName', options.formName ?? formName)
  } else if (options.formBody) {
    url.searchParams.set('formBody', options.formBody)
    if (options.formName) {
      url.searchParams.set('formName', options.formName)
    }
  }
  if (options.view) {
    url.searchParams.set('view', options.view)
  }
  return url.toString()
}

function escapeForSingleQuotedJs(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

function demoAnchor(href, label) {
  const safeUrl = escapeForSingleQuotedJs(href)
  // MDX requires the opening tag, label, and `</a>` on one line. A wrap after `>` (Biome lineWidth
  // 140) becomes a paragraph and fails `check:docs-mdx`. Leave formBody URLs unwrapped.
  return `<a href="#" onclick="openMinimalWindow('${safeUrl}'); return false;">${label}</a>`
}

/**
 * Renders generic start tip for demo.
 * @param options options object.
 * @returns tip as string.
 */
export function demoStartTip(options) {
  const href = buildDemoUrl(options)
  const label = options.label ?? 'Open starting form in demo'
  return [
    ':::tip Try it',
    '',
    `${demoAnchor(href, label)} - opens the FormEngine demo in a popup window with the form this article starts from.`,
    '',
    ':::',
    '',
    '',
  ].join('\n')
}

/**
 * Renders end tip for demo.
 * @param options options object.
 * @returns tip as string.
 */
export function demoEndTip(options) {
  const href = buildDemoUrl(options)
  const label = options.label ?? 'Open finished form in demo'
  return [
    ':::tip Try it',
    '',
    `${demoAnchor(href, label)} - opens the FormEngine demo in a popup window with the completed form from this article.`,
    '',
    ':::',
    '',
    '',
  ].join('\n')
}
