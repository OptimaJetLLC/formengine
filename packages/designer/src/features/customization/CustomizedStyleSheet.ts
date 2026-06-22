import {isUndefined, reactStylesToCss} from '@react-form-builder/core'
import type {CSSProperties} from 'react'

/**
 * Creates a style HTML element with the provided CSS rule.
 * Returns `undefined` if the document or document.head is not available (e.g., in SSR).
 * @param className class name that will be used as a data attribute for identification.
 * @param rule CSS rule string.
 * @returns created style element or `undefined`.
 */
function createStyleTag(className: string, rule: string) {
  if (isUndefined(document) || !document.head) return

  const style = document.createElement('style')
  style.setAttribute('data-customization', className)
  style.textContent = rule
  return style
}

/**
 * Appends a style element to the document head.
 * Does nothing if the style element is undefined.
 * @param style style element to append.
 */
function addStyleTag(style?: HTMLStyleElement) {
  if (style) document.head.appendChild(style)
}

/**
 * Removes a style element from the document head.
 * Does nothing if the style element is undefined.
 * @param style style element to remove.
 */
function removeStyleTag(style?: HTMLStyleElement) {
  if (style) document.head.removeChild(style)
}

/**
 * Creates a new constructable stylesheet when supported.
 * Returns `undefined` when the Adopted StyleSheet API is not available (for example in some test environments).
 * @param rule the CSS rule.
 * @returns created {@link CSSStyleSheet}.
 */
function createAdoptedStyleSheet(rule: string) {
  if (
    typeof document === 'undefined'
    || typeof CSSStyleSheet === 'undefined'
    || !('adoptedStyleSheets' in document)
  ) {
    console.warn('Adopted stylesheets not supported')
    return
  }

  const sheet = new CSSStyleSheet()
  sheet.replaceSync(rule)
  return sheet
}

/**
 * Adds a constructable stylesheet to the document's adopted style sheets.
 * Does nothing if the sheet is undefined.
 * @param sheet stylesheet to add.
 */
function addAdoptedStyleSheet(sheet?: CSSStyleSheet) {
  if (sheet) document.adoptedStyleSheets.push(sheet)
}

/**
 * Removes a constructable stylesheet from the document's adopted style sheets.
 * Does nothing if the sheet is undefined.
 * @param sheet stylesheet to remove.
 */
function removeAdoptedStyleSheet(sheet?: CSSStyleSheet) {
  if (!sheet) return

  document.adoptedStyleSheets = document.adoptedStyleSheets
    .filter(existing => existing !== sheet)
}

let customStyleCounter = 0

/**
 * Converts a React CSS properties object or a CSS string into a CSS rule.
 * Handles nested CSS (if the rule already contains braces) by replacing '&' with the class name.
 * @param className class name that will be used as the selector.
 * @param style React CSS properties object or CSS string.
 * @returns CSS rule string or `undefined` if style is empty or invalid.
 */
function styleToRule(className: string, style?: CSSProperties | string) {
  if (!style) return

  const cssText = typeof style === 'string'
    ? style
    : reactStylesToCss(style as Record<string, string | number>)

  const trimmed = cssText.trim()
  if (!trimmed) return

  const hasNesting = trimmed.includes('{')
  return hasNesting
    ? trimmed.replace(/&/g, `.${className}`)
    : `.${className} { ${trimmed} }`
}

/**
 * Manages a custom stylesheet that can be inserted and removed from the document.
 * Automatically chooses between constructable stylesheets (adoptedStyleSheets) and traditional style tags
 * based on browser support.
 */
export class CustomizedStyleSheet {
  #cssStyleSheet?: CSSStyleSheet
  #htmlStyleElement?: HTMLStyleElement

  /**
   * Generated class name that can be applied to DOM elements to receive the custom styles.
   * `undefined` if no style was provided or the style was empty.
   */
  public className?: string

  /**
   * Creates a new customized style sheet.
   * @param style React CSS properties object or CSS string; if undefined or empty, no stylesheet is created.
   */
  constructor(style?: CSSProperties | string) {
    const className = `fe-custom-${(customStyleCounter++).toString(36)}`
    const rule = styleToRule(className, style)

    if (!rule) return

    this.className = className

    try {
      this.#cssStyleSheet = createAdoptedStyleSheet(rule)

      if (!this.#cssStyleSheet) {
        this.#htmlStyleElement = createStyleTag(this.className, rule)
      }
    } catch {
      this.#htmlStyleElement = createStyleTag(this.className, rule)
    }
  }

  /**
   * Inserts the stylesheet into the document.
   * If a constructable stylesheet is available, it is added to document.adoptedStyleSheets;
   * otherwise a traditional style tag is appended to the document head.
   */
  insertStyleSheet() {
    addStyleTag(this.#htmlStyleElement)
    addAdoptedStyleSheet(this.#cssStyleSheet)
  }

  /**
   * Removes the stylesheet from the document.
   * If a constructable stylesheet was used, it is removed from document.adoptedStyleSheets;
   * otherwise the style tag is removed from the document head.
   */
  removeStyleSheet() {
    removeAdoptedStyleSheet(this.#cssStyleSheet)
    removeStyleTag(this.#htmlStyleElement)
  }
}