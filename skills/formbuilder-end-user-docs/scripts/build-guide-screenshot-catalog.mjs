#!/usr/bin/env node
/**
 * Builds `data/guide-screenshot-catalog.json`: the single map that ties Form Author Guide
 * screenshots, markdown articles, guide-forms fixtures, and capture scripts together.
 *
 * Each screenshot entry includes a `regenerationPrompt` suitable for asking the
 * `formbuilder-end-user-docs` skill to retake or produce a similar capture.
 *
 * Usage (from repo root or this scripts/ dir):
 *   node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs
 *   node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs --check
 */
import {existsSync, readFileSync, readdirSync, writeFileSync} from 'node:fs'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const skillRoot = path.resolve(__dirname, '..')
const repoRoot = path.resolve(skillRoot, '../..')
const assetsRoot = path.join(repoRoot, 'designer-guide/public/assets/guide')
const contentRoot = path.join(repoRoot, 'designer-guide/content')
const formsDir = path.join(skillRoot, 'data/guide-forms')
const outPath = path.join(skillRoot, 'data/guide-screenshot-catalog.json')
const overridesPath = path.join(skillRoot, 'data/guide-screenshot-prompt-overrides.json')
const screenshotMapPath = path.join(skillRoot, 'data/guide-screenshot-map.json')
const demoFormsPath = path.join(repoRoot, 'designer-guide/data/demo-article-forms.json')
const labelMapPath = path.join(__dirname, 'annotation-label-map.json')

/** @type {Record<string, string>} section or basename prefix → capture script */
const CAPTURE_SCRIPT_BY_PREFIX = {
  'first-form/add-fields-with-button': 'capture-preview-your-first-form-screenshots.mjs',
  'first-form/open-preview': 'capture-preview-your-first-form-screenshots.mjs',
  'first-form/preview-mode': 'capture-preview-your-first-form-screenshots.mjs',
  'first-form/highlight-preview': 'capture-preview-your-first-form-screenshots.mjs',
  'first-form/highlight-edit-button': 'capture-preview-your-first-form-screenshots.mjs',
  'first-form/select-validation-field': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/add-fields-validated-plain': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/highlight-select-validation': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/rules-tab-plain': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/highlight-rules-tab': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/validation-add-rule': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/highlight-validation-add-rule': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/validation-preview-errors': 'capture-add-validation-on-your-first-form-screenshots.mjs',
  'first-form/add-fields': 'capture-add-fields-screenshots.mjs',
  'first-form/highlight-add-fields': 'capture-add-fields-screenshots.mjs',
  'first-form/components-search': 'capture-guide-docs-fixes.mjs',
  'first-form/highlight-components-search': 'capture-guide-docs-fixes.mjs',
  'first-form/validation': 'capture-guide-docs-fixes.mjs',
  'first-form/highlight-validation': 'capture-guide-docs-fixes.mjs',
  'first-form/rules': 'capture-guide-screenshots.mjs',
  'first-form/highlight-rules': 'capture-guide-screenshots.mjs',
  'first-form/canvas': 'capture-guide-screenshots.mjs',
  'structure/spacing': 'capture-spacing-screenshots.mjs',
  'structure/highlight-spacing': 'capture-spacing-screenshots.mjs',
  'structure/rows-columns': 'capture-rows-columns-screenshots.mjs',
  'structure/highlight-rows-columns': 'capture-rows-columns-screenshots.mjs',
  'structure/tabs-sections': 'capture-tabs-and-steps-screenshots.mjs',
  'structure/highlight-tabs-sections': 'capture-tabs-and-steps-screenshots.mjs',
  'structure/wizard-sections': 'capture-wizard-and-steps-screenshots.mjs',
  'structure/highlight-wizard-sections': 'capture-wizard-and-steps-screenshots.mjs',
  'structure/parent-child': 'capture-parent-child-screenshots.mjs',
  'structure/highlight-parent-child': 'capture-parent-child-screenshots.mjs',
  'structure/containers': 'capture-guide-structure-batch.mjs',
  'structure/highlight-containers': 'capture-guide-structure-batch.mjs',
  'fields-and-data/labels': 'capture-guide-structure-batch.mjs',
  'fields-and-data/highlight-labels': 'capture-guide-structure-batch.mjs',
  'fields-and-data/labels-select': 'capture-labels-and-help-screenshots.mjs',
  'fields-and-data/highlight-labels-select': 'capture-labels-and-help-screenshots.mjs',
  'fields-and-data/tables-repeaters': 'capture-tables-and-repeaters-screenshots.mjs',
  'fields-and-data/highlight-tables-repeaters': 'capture-tables-and-repeaters-screenshots.mjs',
  'data-driven/value-edit-icon': 'capture-calculated-fields-screenshots.mjs',
  'data-driven/highlight-value-edit-icon': 'capture-calculated-fields-screenshots.mjs',
  'data-driven/computed-property-example': 'capture-calculated-fields-screenshots.mjs',
  'data-driven/highlight-computed-property-example': 'capture-calculated-fields-screenshots.mjs',
  'data-driven/calculated-full-name-preview': 'capture-calculated-fields-screenshots.mjs',
  'data-driven/highlight-calculated-full-name-preview': 'capture-calculated-fields-screenshots.mjs',
  'data-driven/': 'capture-guide-page-screenshots.mjs',
  'appearance/localization': 'capture-guide-page-screenshots.mjs',
  'appearance/header-language': 'capture-guide-page-screenshots.mjs',
  'appearance/highlight-header-language': 'capture-guide-page-screenshots.mjs',
  'appearance/highlight-localization': 'capture-guide-page-screenshots.mjs',
  'appearance/style': 'capture-guide-page-screenshots.mjs',
  'appearance/highlight-style': 'capture-guide-page-screenshots.mjs',
  'appearance/settings': 'capture-guide-docs-fixes.mjs',
  'appearance/highlight-settings': 'capture-guide-docs-fixes.mjs',
  'manage-forms/header-menu': 'capture-save-export-import-screenshots.mjs',
  'manage-forms/highlight-header-menu': 'capture-save-export-import-screenshots.mjs',
  'manage-forms/forms-': 'capture-work-with-multiple-forms-screenshots.mjs',
  'manage-forms/highlight-forms': 'capture-work-with-multiple-forms-screenshots.mjs',
  'manage-forms/preset': 'capture-preset-components-screenshots.mjs',
  'manage-forms/highlight-preset': 'capture-preset-components-screenshots.mjs',
  'manage-forms/header-menu-print': 'capture-special-components-screenshots.mjs',
  'manage-forms/highlight-header-menu-print': 'capture-special-components-screenshots.mjs',
  'components-by-task/special': 'capture-special-components-screenshots.mjs',
  'preview-and-handoff/print-page-break': 'capture-special-components-screenshots.mjs',
  'preview-and-handoff/': 'capture-audit-screenshots.mjs',
  'workspace/': 'capture-guide-screenshots.mjs',
  'help/faq-preview-mode': 'capture-faq-for-form-authors-screenshots.mjs',
  'help/component-library': 'capture-faq-for-form-authors-screenshots.mjs',
  'help/highlight-component-library': 'capture-faq-for-form-authors-screenshots.mjs',
  'workspace/json-view-open': 'capture-json-form-view-screenshots.mjs',
  'workspace/highlight-json-view-open': 'capture-json-form-view-screenshots.mjs',
  'workspace/json-view-close': 'capture-json-form-view-screenshots.mjs',
  'workspace/highlight-json-view-close': 'capture-json-form-view-screenshots.mjs',
  'workspace/undo-redo': 'capture-undo-and-redo-screenshots.mjs',
  'workspace/highlight-undo-redo': 'capture-undo-and-redo-screenshots.mjs',
  'workspace/theme-toggle': 'capture-theme-light-and-dark-screenshots.mjs',
  'workspace/highlight-theme-toggle': 'capture-theme-light-and-dark-screenshots.mjs',
  'workspace/canvas-drag-palette': 'capture-canvas-drag-and-drop-screenshots.mjs',
  'workspace/highlight-canvas-drag-palette': 'capture-canvas-drag-and-drop-screenshots.mjs',
  'workspace/canvas-reorder': 'capture-canvas-drag-and-drop-screenshots.mjs',
  'workspace/canvas-multi-select': 'capture-canvas-drag-and-drop-screenshots.mjs',
  'workspace/floating-toolbar': 'capture-canvas-drag-and-drop-screenshots.mjs',
  'workspace/tree-expanded-nested': 'capture-component-tree-screenshots.mjs',
  'workspace/tree-select': 'capture-component-tree-screenshots.mjs',
  'workspace/highlight-tree-select': 'capture-component-tree-screenshots.mjs',
  'workspace/tree-toolbar': 'capture-component-tree-screenshots.mjs',
  'workspace/highlight-tree-toolbar': 'capture-component-tree-screenshots.mjs',
  'workspace/tree-expand-all': 'capture-component-tree-screenshots.mjs',
  'workspace/highlight-tree-expand-all': 'capture-component-tree-screenshots.mjs',
  'workspace/highlight-toolbar-add': 'capture-guide-screenshots.mjs',
  'workspace/highlight-toolbar-clone': 'capture-guide-screenshots.mjs',
  'workspace/highlight-toolbar-delete': 'capture-guide-screenshots.mjs',
  'workspace/toolbar-actions': 'capture-guide-screenshots.mjs',
  'workspace/components-add-button-hover': 'capture-guide-screenshots.mjs',
  'workspace/components-add-modal': 'capture-guide-screenshots.mjs',
  'workspace/right-panel-select': 'capture-right-panel-screenshots.mjs',
  'workspace/highlight-right-panel-select': 'capture-right-panel-screenshots.mjs',
  'workspace/right-panel-main': 'capture-right-panel-screenshots.mjs',
  'workspace/highlight-right-panel-main': 'capture-right-panel-screenshots.mjs',
  'workspace/right-panel-style': 'capture-right-panel-screenshots.mjs',
  'workspace/highlight-right-panel-style': 'capture-right-panel-screenshots.mjs',
  'workspace/right-panel-actions': 'capture-right-panel-screenshots.mjs',
  'workspace/highlight-right-panel-actions': 'capture-right-panel-screenshots.mjs',
  'workspace/right-panel-rules': 'capture-right-panel-screenshots.mjs',
  'workspace/highlight-right-panel-rules': 'capture-right-panel-screenshots.mjs',
  'workspace/right-panel-settings': 'capture-right-panel-screenshots.mjs',
  'workspace/highlight-right-panel-settings': 'capture-right-panel-screenshots.mjs',
  'behavior/custom-error-message': 'capture-custom-error-messages-screenshots.mjs',
  'behavior/highlight-custom-error-message': 'capture-custom-error-messages-screenshots.mjs',
  'behavior/onclick-actions-menu': 'capture-events-and-actions-concept-screenshots.mjs',
  'behavior/highlight-onclick-actions-menu': 'capture-events-and-actions-concept-screenshots.mjs',
  'behavior/common-actions-submenu': 'capture-events-and-actions-concept-screenshots.mjs',
  'behavior/highlight-common-actions-submenu': 'capture-events-and-actions-concept-screenshots.mjs',
  'behavior/code-actions-submenu': 'capture-events-and-actions-concept-screenshots.mjs',
  'behavior/highlight-code-actions-submenu': 'capture-events-and-actions-concept-screenshots.mjs',
  'behavior/add-form-code-action': 'capture-form-level-actions-screenshots.mjs',
  'behavior/highlight-add-form-code-action': 'capture-form-level-actions-screenshots.mjs',
  'behavior/form-action-code-editor': 'capture-form-level-actions-screenshots.mjs',
  'behavior/highlight-form-action-code-editor': 'capture-form-level-actions-screenshots.mjs',
  'behavior/form-validator-edit': 'capture-form-level-actions-screenshots.mjs',
  'behavior/highlight-form-validator-edit': 'capture-form-level-actions-screenshots.mjs',
  'behavior/form-validator-code-editor': 'capture-form-level-actions-screenshots.mjs',
  'behavior/highlight-form-validator-code-editor': 'capture-form-level-actions-screenshots.mjs',
  'behavior/action-order-validate': 'capture-action-order-on-buttons-screenshots.mjs',
  'behavior/highlight-action-order-validate': 'capture-action-order-on-buttons-screenshots.mjs',
  'behavior/action-order-reorder': 'capture-action-order-on-buttons-screenshots.mjs',
  'behavior/highlight-action-order-reorder': 'capture-action-order-on-buttons-screenshots.mjs',
  'behavior/components-search-modal': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-components-search-modal': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-forms': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-forms': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-confirm': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-confirm': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-close': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-close': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-settings': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-settings': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-template': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-template': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-open': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-open': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/modals-preview': 'capture-modals-for-authors-screenshots.mjs',
  'behavior/highlight-modals-preview': 'capture-modals-for-authors-screenshots.mjs',
  'first-form/button-actions': 'capture-button-actions-screenshots.mjs',
  'first-form/highlight-button-actions': 'capture-button-actions-screenshots.mjs',
}

/** Heuristic form links by screenshot id prefix when capture scripts open fixtures. */
const FORM_HINTS = [
  {match: /add-fields-with-button-plain|first-form\/highlight-preview|first-form\/highlight-edit-button|first-form\/open-preview|first-form\/preview-mode/, forms: ['add-fields-validated', 'add-fields-with-button']},
  {match: /select-validation-field|add-fields-validated-plain|highlight-select-validation|rules-tab-plain|highlight-rules-tab|validation-add-rule/, forms: ['add-fields-two-fields']},
  {match: /validation-preview-errors/, forms: ['add-fields-validated']},
  {match: /add-fields-empty|create-form|highlight-add-fields-empty/, forms: ['add-fields-empty']},
  {match: /add-fields-one|add-fields-main-tab/, forms: ['add-fields-one-field']},
  {
    match: /^first-form\/(?:add-fields-two|add-fields-preview|validation|rules-tab|button-actions|first-form-checklist|name-fields)/,
    forms: ['add-fields-two-fields'],
  },
  {match: /show-hide|render-when/, forms: ['show-hide-fields']},
  {match: /prefill/, forms: ['prefill-static']},
  {match: /localization|header-language/, forms: ['localization-authors']},
  {match: /style-bold|style-tab/, forms: ['style-bold']},
  {match: /spacing/, forms: ['spacing-loose']},
  {match: /rows-columns|shipping/, forms: ['shipping-columns']},
  {match: /tabs-sections/, forms: ['employee-onboarding-tabs']},
  {match: /wizard-sections/, forms: ['employee-onboarding-wizard']},
  {match: /labels-/, forms: ['labels-demo']},
  {match: /tables-repeaters-table|team-directory/, forms: ['team-directory-table']},
  {match: /tables-repeaters-repeater|invoice/, forms: ['invoice-line-items']},
  {match: /preset/, forms: ['preset-address']},
  {match: /containers|checkout/, forms: ['checkout-sections']},
  {match: /parent-child|event-registration/, forms: ['event-registration']},
  {match: /example-contact-lead|introduction\/example-contact-lead/, forms: ['contact-lead']},
  {match: /example-account-registration|introduction\/example-account-registration/, forms: ['account-registration']},
  {match: /example-feedback|introduction\/example-feedback/, forms: ['feedback-survey']},
  {match: /custom-error-message/, forms: ['custom-error-messages']},
  {match: /button-actions/, forms: ['button-alert-action']},
  {match: /onclick-actions-menu|common-actions-submenu/, forms: ['add-fields-with-button']},
  {match: /code-actions-submenu/, forms: ['button-alert-action']},
  {match: /add-form-code-action|form-action-code-editor|form-validator-edit|form-validator-code-editor/, forms: ['empty']},
  {match: /action-order-validate/, forms: ['action-order-validate']},
  {match: /action-order-reorder/, forms: ['action-order-reorder']},
  {match: /components-search-modal|modals-forms|modals-confirm|modals-close|modals-settings|modals-template|modals-open|modals-preview/, forms: ['confirm-dialog', 'main-with-modal']},
  {match: /faq-preview-mode|component-library|highlight-component-library/, forms: ['event-registration']},
  {match: /special-singleton|special-non-visual|print-page-break|header-menu-print/, forms: ['print-settings-demo']},
  {match: /json-view-open|json-view-close/, forms: ['event-registration']},
  {match: /undo-redo/, forms: ['event-registration']},
  {match: /theme-toggle/, forms: ['event-registration']},
  {match: /canvas-drag-palette|canvas-reorder|canvas-multi-select|floating-toolbar/, forms: ['event-registration']},
  {match: /tree-panel-plain|tree-expanded-nested|tree-select|tree-expand-all/, forms: ['event-registration']},
  {match: /right-panel-select|right-panel-main|right-panel-style|right-panel-actions|right-panel-rules|right-panel-settings/, forms: ['checkout-sections']},
]

/**
 * @param {string} dir
 * @param {(name: string) => boolean} [filter]
 * @returns {string[]}
 */
function walkFiles(dir, filter = () => true) {
  if (!existsSync(dir)) {
    return []
  }
  /** @type {string[]} */
  const out = []
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      out.push(...walkFiles(full, filter))
    } else if (filter(entry.name)) {
      out.push(full)
    }
  }
  return out
}

/**
 * @param {string} id relative path without theme suffix, e.g. first-form/highlight-add-fields-empty-palette
 */
function resolveCaptureScript(id) {
  const keys = Object.keys(CAPTURE_SCRIPT_BY_PREFIX).sort((a, b) => b.length - a.length)
  for (const key of keys) {
    if (id.startsWith(key) || id.includes(key)) {
      return CAPTURE_SCRIPT_BY_PREFIX[key]
    }
  }
  return 'capture-all-guide-screenshots.mjs'
}

/**
 * @param {string} id
 * @returns {string[]}
 */
function resolveForms(id) {
  /** @type {string[]} */
  const forms = []
  for (const hint of FORM_HINTS) {
    if (hint.match.test(id)) {
      forms.push(...hint.forms)
    }
  }
  return [...new Set(forms)]
}

/**
 * @param {string} basename
 */
function screenshotKind(basename) {
  if (basename.startsWith('highlight-')) {
    return 'highlight'
  }
  if (basename.includes('-zones') || basename.endsWith('-zones')) {
    return 'zones'
  }
  if (basename.startsWith('example-')) {
    return 'example'
  }
  if (basename.endsWith('-plain') || basename.includes('-plain')) {
    return 'plain'
  }
  return 'screenshot'
}

/**
 * @param {string} id
 * @param {string} kind
 */
function inferPlainSource(id, kind) {
  if (kind !== 'highlight' && kind !== 'zones') {
    return undefined
  }
  const section = id.split('/')[0]
  const name = id.slice(section.length + 1)
  if (name.startsWith('highlight-')) {
    return `${section}/${name.slice('highlight-'.length)}-plain`
  }
  if (name.endsWith('-zones')) {
    return `${section}/${name.replace(/-zones$/, '-plain')}`
  }
  return undefined
}

/**
 * Human-readable goal when markdown alt text is missing (e.g. plain capture sources).
 * @param {string} id
 * @param {string} kind
 * @param {string[]} altTexts
 * @param {{labels?: string[]} | undefined} annotation
 */
function describeGoal(id, kind, altTexts, annotation) {
  if (altTexts[0]?.trim()) {
    return altTexts[0].trim()
  }
  const labels = annotation?.labels?.filter(Boolean) ?? []
  if (labels.length) {
    return `Highlight or call out: ${labels.join('; ')} (${id}).`
  }
  const base = id.split('/').pop() ?? id
  const words = base
    .replace(/^highlight-/, '')
    .replace(/-plain$/, '')
    .replace(/-zones$/, '')
    .replace(/-/g, ' ')
  if (kind === 'plain') {
    return `Plain (unannotated) capture of ${words} for annotation source and reuse.`
  }
  if (kind === 'zones') {
    return `Numbered workspace zones overlay for ${words}.`
  }
  if (kind === 'highlight') {
    return `Annotated highlight of ${words} in the Form Builder UI.`
  }
  if (kind === 'example') {
    return `Example form screenshot: ${words}.`
  }
  return `Form Builder UI screenshot: ${words}.`
}

/**
 * @param {{
 *   id: string,
 *   kind: string,
 *   articles: string[],
 *   forms: string[],
 *   altTexts: string[],
 *   captureScript: string,
 *   view?: string,
 *   override?: string,
 *   annotation?: {labels?: string[], noZoneLabels?: boolean},
 *   plainSource?: string,
 * }} args
 */
function buildRegenerationPrompt(args) {
  if (args.override?.trim()) {
    return args.override.trim()
  }

  const articleList = args.articles.length
    ? args.articles.map((a) => `designer-guide/content/${a}.md`).join(', ')
    : '(plain/source asset - not embedded directly; used by annotated sibling)'
  const formList = args.forms.length
    ? args.forms.map((f) => `skills/formbuilder-end-user-docs/data/guide-forms/${f}.json`).join(', ')
    : 'empty Screen (or default builder form)'
  const goal = describeGoal(args.id, args.kind, args.altTexts, args.annotation)
  const kindHint =
    args.kind === 'highlight'
      ? 'Produce a highlight annotation (colored stroke + fill inside the target only; no grey dim outside). Keep a matching *-plain.png source.'
      : args.kind === 'zones'
        ? 'Produce a numbered zones overlay. Keep a matching *-plain.png source.'
        : args.kind === 'plain'
          ? 'Capture a plain (unannotated) PNG at 1440×900 CSS / deviceScaleFactor 2.'
          : 'Capture the screenshot at 1440×900 CSS / deviceScaleFactor 2.'
  const annotationLine =
    args.annotation?.labels?.length
      ? `Annotation labels: ${args.annotation.labels.join('; ')}.`
      : undefined

  return [
    `Regenerate Form Author Guide screenshot \`${args.id}\` using the formbuilder-end-user-docs skill.`,
    ``,
    `Goal / what the reader should see: ${goal}`,
    ``,
    `Article(s): ${articleList}`,
    `Form fixture(s): ${formList}`,
    args.view ? `UI kit / view: ${args.view}` : `UI kit / view: mui (unless article demo map says otherwise)`,
    `Capture script: skills/formbuilder-end-user-docs/scripts/${args.captureScript}`,
    `Output assets: designer-guide/public/assets/guide/${args.id}.light.png and .dark.png (plus WebP via npm run optimize:images --prefix designer-guide)`,
    args.plainSource ? `Plain source id: ${args.plainSource}` : undefined,
    annotationLine,
    ``,
    kindHint,
    `Follow SKILL.md screenshot rules: createGuideCapturePage(), real UI labels, no PII, update guide-screenshot-map.json and rebuild guide-screenshot-catalog.json if paths change.`,
  ]
    .filter((line) => line !== undefined)
    .join('\n')
}

/**
 * @returns {Map<string, {articles: Set<string>, alts: Set<string>}>}
 */
function collectMarkdownUsages() {
  /** @type {Map<string, {articles: Set<string>, alts: Set<string>}>} */
  const map = new Map()
  const files = walkFiles(contentRoot, (name) => name.endsWith('.md') || name.endsWith('.mdx'))

  for (const file of files) {
    const rel = path.relative(contentRoot, file).replace(/\\/g, '/').replace(/\.(md|mdx)$/u, '')
    const text = readFileSync(file, 'utf8')
    const imgRe =
      /(?:src=["'](\/assets\/guide\/[^"']+?)(?:\.(?:light|dark))?\.(?:png|webp|jpe?g)["']|!\[([^\]]*)\]\((\/assets\/guide\/[^)]+?)(?:\.(?:light|dark))?\.(?:png|webp|jpe?g)\))/giu
    let match = imgRe.exec(text)
    while (match) {
      const src = (match[1] || match[3] || '').replace(/^\//, '')
      const alt = (match[2] || '').trim()
      const withoutPrefix = src.replace(/^assets\/guide\//u, '')
      const id = withoutPrefix.replace(/\.(preview|full)$/u, '').replace(/\.(png|webp|jpe?g)$/u, '')
      if (!map.has(id)) {
        map.set(id, {articles: new Set(), alts: new Set()})
      }
      const entry = map.get(id)
      entry.articles.add(rel)
      if (alt) {
        entry.alts.add(alt)
      }
      // Also capture HTML alt= near img tags
      match = imgRe.exec(text)
    }

    // <img ... alt="..." src="/assets/guide/...">
    const htmlRe =
      /<img\b[^>]*\bsrc=["']\/assets\/guide\/([^"']+?)(?:\.(?:light|dark))?\.(?:png|webp|jpe?g)["'][^>]*>/giu
    let htmlMatch = htmlRe.exec(text)
    while (htmlMatch) {
      const id = htmlMatch[1]
      const tag = htmlMatch[0]
      const altMatch = /\balt=["']([^"']*)["']/u.exec(tag)
      if (!map.has(id)) {
        map.set(id, {articles: new Set(), alts: new Set()})
      }
      const entry = map.get(id)
      entry.articles.add(rel)
      if (altMatch?.[1]) {
        entry.alts.add(altMatch[1])
      }
      htmlMatch = htmlRe.exec(text)
    }
  }

  return map
}

/**
 * @param {unknown} screenshotMap
 * @param {Map<string, {articles: Set<string>, alts: Set<string>}>} usages
 */
function mergeScreenshotMap(screenshotMap, usages) {
  if (!screenshotMap || typeof screenshotMap !== 'object') {
    return
  }
  for (const [articleFile, steps] of Object.entries(screenshotMap)) {
    const article = articleFile.replace(/\.(md|mdx)$/u, '')
    if (!steps || typeof steps !== 'object') {
      continue
    }
    for (const step of Object.values(steps)) {
      if (!step || typeof step !== 'object' || typeof step.src !== 'string') {
        continue
      }
      const id = step.src.replace(/^\/assets\/guide\//u, '').replace(/\.(png|webp)$/u, '')
      if (!usages.has(id)) {
        usages.set(id, {articles: new Set(), alts: new Set()})
      }
      const entry = usages.get(id)
      entry.articles.add(article)
      if (typeof step.alt === 'string' && step.alt.trim()) {
        entry.alts.add(step.alt.trim())
      }
    }
  }
}

/**
 * @param {string} id
 * @param {Record<string, {start?: {view?: string, formFile?: string, form?: string}, end?: {view?: string, formFile?: string, form?: string}}>} articles
 */
function viewForArticles(id, articles, usageArticles) {
  for (const article of usageArticles) {
    const entry = articles[article]
    if (!entry) {
      continue
    }
    const view = entry.start?.view || entry.end?.view
    if (view) {
      return view
    }
  }
  if (/rsuite|wizard|tabs-sections|tables-repeaters|special-|print-page-break|header-menu-print/.test(id)) {
    return 'rsuite-inject-css'
  }
  return 'mui'
}

/**
 * @param {{start?: {formFile?: string, form?: string}, end?: {formFile?: string, form?: string}}} demo
 */
function formsFromDemo(demo) {
  /** @type {string[]} */
  const forms = []
  for (const side of [demo.start, demo.end]) {
    if (!side) {
      continue
    }
    if (side.formFile) {
      forms.push(side.formFile.replace(/\.json$/u, ''))
    } else if (side.form && side.form !== 'empty' && side.form !== '{}') {
      forms.push(side.form)
    }
  }
  return forms
}

function main() {
  const checkOnly = process.argv.includes('--check')
  const screenshotMap = existsSync(screenshotMapPath)
    ? JSON.parse(readFileSync(screenshotMapPath, 'utf8'))
    : {}
  const demoMap = existsSync(demoFormsPath) ? JSON.parse(readFileSync(demoFormsPath, 'utf8')) : {articles: {}}
  const labelMap = existsSync(labelMapPath) ? JSON.parse(readFileSync(labelMapPath, 'utf8')) : {}
  const overrides = existsSync(overridesPath) ? JSON.parse(readFileSync(overridesPath, 'utf8')) : {}

  const usages = collectMarkdownUsages()
  mergeScreenshotMap(screenshotMap, usages)

  const lightPngs = walkFiles(assetsRoot, (name) => name.endsWith('.light.png'))
  /** @type {Record<string, object>} */
  const screenshots = {}
  /** @type {Record<string, object>} */
  const forms = {}
  /** @type {Record<string, {screenshots: Set<string>, forms: Set<string>, captureScripts: Set<string>}>} */
  const articlesAgg = {}

  for (const formFile of readdirSync(formsDir).filter((name) => name.endsWith('.json'))) {
    const name = formFile.replace(/\.json$/u, '')
    forms[name] = {
      file: `skills/formbuilder-end-user-docs/data/guide-forms/${formFile}`,
      description: `Guide form fixture \`${name}\` used by Form Author Guide screenshots and Try it demo links.`,
      usedByArticles: [],
      usedByScreenshots: [],
    }
  }

  for (const [slug, demo] of Object.entries(demoMap.articles || {})) {
    for (const formName of formsFromDemo(demo)) {
      if (!forms[formName]) {
        forms[formName] = {
          file: `skills/formbuilder-end-user-docs/data/guide-forms/${formName}.json`,
          description: `Referenced by demo deep link for ${slug} (fixture may be external or empty).`,
          usedByArticles: [],
          usedByScreenshots: [],
        }
      }
      forms[formName].usedByArticles.push(slug)
    }
  }

  for (const lightPath of lightPngs) {
    const rel = path.relative(assetsRoot, lightPath).replace(/\\/g, '/')
    const id = rel.replace(/\.light\.png$/u, '')
    const section = id.split('/')[0]
    const basename = id.slice(section.length + 1)
    const kind = screenshotKind(basename)
    const darkPath = path.join(assetsRoot, `${id}.dark.png`)
    const usage = usages.get(id) || {articles: new Set(), alts: new Set()}
    const articles = [...usage.articles].sort()
    const altTexts = [...usage.alts]
    const captureScript = resolveCaptureScript(id)
    // Prefer capture-script form hints. For shared chrome shots reused on many pages,
    // do not attach every article demo form - leave forms empty unless a hint matches
    // or this asset is used by exactly one article.
    const hinted = resolveForms(id)
    const demoForms = articles.flatMap((a) => formsFromDemo(demoMap.articles?.[a] || {}))
    const linkedForms = [
      ...new Set(hinted.length ? hinted : articles.length === 1 ? demoForms : []),
    ].sort()
    const view = viewForArticles(id, demoMap.articles || {}, articles)
    const labelKey = basename.startsWith('highlight-') ? basename : undefined
    const annotation = labelKey && labelMap[labelKey] ? labelMap[labelKey] : undefined
    const plainSource = inferPlainSource(id, kind)

    screenshots[id] = {
      id,
      section,
      basename,
      kind,
      themes: existsSync(darkPath) ? ['light', 'dark'] : ['light'],
      assets: {
        light: `designer-guide/public/assets/guide/${id}.light.png`,
        ...(existsSync(darkPath) ? {dark: `designer-guide/public/assets/guide/${id}.dark.png`} : {}),
      },
      ...(plainSource ? {plainSource} : {}),
      articles,
      altTexts,
      forms: linkedForms,
      view,
      captureScript: `skills/formbuilder-end-user-docs/scripts/${captureScript}`,
      ...(annotation ? {annotation} : {}),
      description: '',
      // regenerationPrompt filled after plain↔highlight linking
      regenerationPrompt: '',
    }
  }

  // Link plains to annotated siblings: inherit articles / forms / alts when the plain is only a capture source.
  for (const shot of Object.values(screenshots)) {
    if (!shot.plainSource || !screenshots[shot.plainSource]) {
      continue
    }
    const plain = screenshots[shot.plainSource]
    plain.annotatedBy = [...new Set([...(plain.annotatedBy || []), shot.id])].sort()
    if (!plain.articles.length && shot.articles.length) {
      plain.articles = [...shot.articles]
    }
    if (!plain.forms.length && shot.forms.length) {
      plain.forms = [...shot.forms]
    }
    if (!plain.altTexts.length && shot.altTexts.length) {
      plain.altTexts = shot.altTexts.map((t) => `Plain source for: ${t}`)
    }
    if (plain.view === 'mui' && shot.view && shot.view !== 'mui') {
      plain.view = shot.view
    }
  }

  for (const shot of Object.values(screenshots)) {
    shot.description = describeGoal(shot.id, shot.kind, shot.altTexts, shot.annotation)
    shot.regenerationPrompt = buildRegenerationPrompt({
      id: shot.id,
      kind: shot.kind,
      articles: shot.articles,
      forms: shot.forms,
      altTexts: shot.altTexts,
      captureScript: path.basename(shot.captureScript),
      view: shot.view,
      override: overrides[shot.id],
      annotation: shot.annotation,
      plainSource: shot.plainSource,
    })

    for (const formName of shot.forms) {
      if (forms[formName]) {
        forms[formName].usedByScreenshots.push(shot.id)
        for (const article of shot.articles) {
          if (!forms[formName].usedByArticles.includes(article)) {
            forms[formName].usedByArticles.push(article)
          }
        }
      }
    }

    for (const article of shot.articles) {
      if (!articlesAgg[article]) {
        articlesAgg[article] = {screenshots: new Set(), forms: new Set(), captureScripts: new Set()}
      }
      articlesAgg[article].screenshots.add(shot.id)
      articlesAgg[article].captureScripts.add(path.basename(shot.captureScript))
      for (const formName of shot.forms) {
        articlesAgg[article].forms.add(formName)
      }
    }
  }

  for (const form of Object.values(forms)) {
    form.usedByArticles = [...new Set(form.usedByArticles)].sort()
    form.usedByScreenshots = [...new Set(form.usedByScreenshots)].sort()
  }

  /** @type {Record<string, object>} */
  const articles = {}
  for (const [slug, agg] of Object.entries(articlesAgg)) {
    const demo = demoMap.articles?.[slug]
    const demoForms = demo ? formsFromDemo(demo) : []
    // Article forms = demo deep-link fixtures + forms required by screenshots on this page only
    const pageForms = [...new Set([...demoForms, ...agg.forms])].sort()
    articles[slug] = {
      content: `designer-guide/content/${slug}.md`,
      screenshots: [...agg.screenshots].sort(),
      forms: pageForms,
      captureScripts: [...agg.captureScripts].map((s) => `skills/formbuilder-end-user-docs/scripts/${s}`).sort(),
      ...(demo ? {demo} : {}),
    }
    for (const formName of demoForms) {
      if (forms[formName] && !forms[formName].usedByArticles.includes(slug)) {
        forms[formName].usedByArticles.push(slug)
      }
    }
  }

  // Articles with demo forms but no screenshots yet
  for (const [slug, demo] of Object.entries(demoMap.articles || {})) {
    if (articles[slug]) {
      continue
    }
    const demoForms = formsFromDemo(demo)
    articles[slug] = {
      content: `designer-guide/content/${slug}.md`,
      screenshots: [],
      forms: demoForms,
      captureScripts: [],
      demo,
    }
    for (const formName of demoForms) {
      if (forms[formName] && !forms[formName].usedByArticles.includes(slug)) {
        forms[formName].usedByArticles.push(slug)
      }
    }
  }

  for (const form of Object.values(forms)) {
    form.usedByArticles = [...new Set(form.usedByArticles)].sort()
  }

  const catalog = {
    version: 1,
    description:
      'Canonical map of Form Author Guide screenshots, guide-forms fixtures, articles, and capture scripts. Use each screenshot.regenerationPrompt with the formbuilder-end-user-docs skill to retake or create a similar image.',
    updatedAt: new Date().toISOString().slice(0, 10),
    paths: {
      assetsDir: 'designer-guide/public/assets/guide',
      contentDir: 'designer-guide/content',
      formsDir: 'skills/formbuilder-end-user-docs/data/guide-forms',
      screenshotMap: 'skills/formbuilder-end-user-docs/data/guide-screenshot-map.json',
      demoArticleForms: 'designer-guide/data/demo-article-forms.json',
      captureAll: 'skills/formbuilder-end-user-docs/scripts/capture-all-guide-screenshots.mjs',
      promptOverrides: 'skills/formbuilder-end-user-docs/data/guide-screenshot-prompt-overrides.json',
    },
    howToRegenerate: {
      all: 'Start builder at localhost:5173, then: npm run designer-guide:screenshots',
      one: 'Pass screenshot.regenerationPrompt to the formbuilder-end-user-docs skill, or run the listed captureScript after preparing the form fixture and UI state described in the prompt.',
      rebuildCatalog: 'node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs',
    },
    stats: {
      screenshots: Object.keys(screenshots).length,
      forms: Object.keys(forms).length,
      articles: Object.keys(articles).length,
    },
    forms,
    articles,
    screenshots,
  }

  const serialized = `${JSON.stringify(catalog, null, 2)}\n`

  if (checkOnly) {
    if (!existsSync(outPath)) {
      console.error(`Missing catalog: ${outPath}`)
      process.exit(1)
    }
    const existing = readFileSync(outPath, 'utf8')
    // Compare without updatedAt drift
    const normalize = (text) => text.replace(/"updatedAt": "[^"]+"/u, '"updatedAt": "DATE"')
    if (normalize(existing) !== normalize(serialized)) {
      console.error('guide-screenshot-catalog.json is out of date. Run build-guide-screenshot-catalog.mjs')
      process.exit(1)
    }
    console.log(`Catalog OK (${catalog.stats.screenshots} screenshots, ${catalog.stats.forms} forms, ${catalog.stats.articles} articles)`)
    return
  }

  writeFileSync(outPath, serialized)
  console.log(
    `Wrote ${outPath} (${catalog.stats.screenshots} screenshots, ${catalog.stats.forms} forms, ${catalog.stats.articles} articles)`,
  )
}

main()
