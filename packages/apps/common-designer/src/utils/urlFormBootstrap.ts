/**
 * URL bootstrap for demo / formbuilder apps.
 *
 * Supported query params:
 *   ?form={}                 - open a blank Screen form
 *   ?form=<bundledName>      - open a seeded/bundled form name (e.g. MuiForm)
 *   ?formBody=<encoded>      - open a form from an encoded JSON body (minified UTF-8)
 *   ?formName=<displayName>  - optional storage/display name when using formBody
 *   ?view=mui|mantine|rsuite-inject-css|rsuite-import-css - force UI kit
 *
 * When a form-related param is present, form-name persistence is disabled so localStorage
 * does not override the URL.
 */
import type {ViewType} from '@react-form-builder/apps-common'

/** How the demo URL selects which form to open. */
export type DemoUrlFormMode = 'empty' | 'named' | 'body'

/** Parsed form-related query params for demo URL bootstrap. */
export type DemoUrlFormBootstrap = {
  /** How the URL selects the form payload. */
  mode: DemoUrlFormMode
  /** Active form name to open after prepare. */
  formName: string
  /** When mode is `named`, the bundled/storage form name. */
  namedForm?: string
  /** When mode is `body`, the decoded form JSON string. */
  formJson?: string
  /** Disables persisting the form name when the URL drives bootstrap. */
  persistFormName: false
}

/** Parsed demo URL overrides (form and/or view). */
export type DemoUrlBootstrap = {
  /** Form bootstrap parsed from the URL, when present. */
  form?: DemoUrlFormBootstrap
  /** UI kit override parsed from the URL, when present. */
  view?: ViewType
}

const VIEW_VALUES: ReadonlySet<string> = new Set(['mui', 'mantine', 'rsuite-inject-css', 'rsuite-import-css'])

const EMPTY_FORM_NAME = 'Empty form'
const DEFAULT_BODY_FORM_NAME = 'Guide form'

const EMPTY_FORM_JSON = JSON.stringify(
  {
    form: {
      key: 'screen',
      type: 'Screen',
      props: {},
      children: [],
    },
    localization: {},
    languages: [
      {
        code: 'en',
        dialect: 'US',
        name: 'English',
        description: 'American English',
        bidi: 'ltr',
      },
    ],
    defaultLanguage: 'en-US',
  },
  undefined,
  2
)

function utf8ToBase64Url(text: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(text, 'utf8').toString('base64url')
  }
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  for (const byte of bytes) {
    binary += String.fromCharCode(byte)
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/u, '')
}

function base64UrlToUtf8(encoded: string): string {
  const normalized = encoded.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (normalized.length % 4)) % 4
  const padded = normalized + '='.repeat(padLength)

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(padded, 'base64').toString('utf8')
  }

  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

/**
 * Minifies form JSON and encodes it as base64url (no padding) for the formBody query param.
 * @param jsonText form JSON text (pretty or minified)
 * @returns base64url payload
 */
export function encodeFormBody(jsonText: string): string {
  const mini = JSON.stringify(JSON.parse(jsonText))
  return utf8ToBase64Url(mini)
}

/**
 * Decodes a formBody query payload into form JSON text.
 * @param encoded base64url (padding optional) or legacy base64
 * @returns validated form JSON string (minified)
 */
export function decodeFormBody(encoded: string): string {
  const text = base64UrlToUtf8(encoded.trim())
  return JSON.stringify(JSON.parse(text))
}

/**
 * @param search `window.location.search` (including `?`) or empty string
 * @returns bootstrap config, or null when URL has no supported overrides
 */
export function parseDemoUrlBootstrap(search: string): DemoUrlBootstrap | null {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const viewParam = params.get('view')?.trim()
  const view = viewParam && VIEW_VALUES.has(viewParam) ? (viewParam as ViewType) : undefined

  const formBodyRaw = params.get('formBody')?.trim()
  const formRaw = params.get('form')?.trim()
  const formNameParam = params.get('formName')?.trim()

  let form: DemoUrlFormBootstrap | undefined = undefined

  if (formBodyRaw) {
    const formJson = decodeFormBody(formBodyRaw)
    form = {
      mode: 'body',
      formName: formNameParam || DEFAULT_BODY_FORM_NAME,
      formJson,
      persistFormName: false,
    }
  } else if (formRaw) {
    if (formRaw === '{}' || formRaw.toLowerCase() === 'empty') {
      form = {
        mode: 'empty',
        formName: EMPTY_FORM_NAME,
        persistFormName: false,
      }
    } else {
      form = {
        mode: 'named',
        formName: formRaw,
        namedForm: formRaw,
        persistFormName: false,
      }
    }
  }

  if (!form && !view) {
    return null
  }

  return {form, view}
}

/**
 * Loads or creates the form described by the bootstrap config and returns its JSON.
 * @param bootstrap form bootstrap from {@link parseDemoUrlBootstrap}
 * @returns form JSON text
 */
export function loadBootstrapFormJson(bootstrap: DemoUrlFormBootstrap): string {
  if (bootstrap.mode === 'empty') {
    return EMPTY_FORM_JSON
  }

  if (bootstrap.mode === 'body' && bootstrap.formJson) {
    return bootstrap.formJson
  }

  throw new Error('Bootstrap form JSON is only available for empty and formBody modes')
}

export {DEFAULT_BODY_FORM_NAME, EMPTY_FORM_JSON, EMPTY_FORM_NAME}
