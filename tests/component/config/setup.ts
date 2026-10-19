import {cleanup, configure} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import {Canvas} from 'skia-canvas'
import {afterEach, beforeAll} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'
import {mockAdoptedStyles} from './adoptedStylesheets'
import {isBrowserMode} from './isBrowserMode'
import {addMatchMediaFunctionToWindow} from './matchMedia'

if (!isBrowserMode()) {
  addMatchMediaFunctionToWindow()

  // Polyfill before suite imports — @dnd-kit/dom reads these at module load / drag start.
  if (typeof globalThis.ResizeObserver === 'undefined') {
    globalThis.ResizeObserver = class ResizeObserver {
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()

      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor(_callback: ResizeObserverCallback) {}
    } as unknown as typeof ResizeObserver
  }

  if (typeof globalThis.IntersectionObserver === 'undefined') {
    globalThis.IntersectionObserver = class IntersectionObserver {
      root = null
      rootMargin = ''
      thresholds: number[] = []
      observe = vi.fn()
      unobserve = vi.fn()
      disconnect = vi.fn()
      takeRecords = () => []

      // eslint-disable-next-line @typescript-eslint/no-useless-constructor
      constructor(_callback: IntersectionObserverCallback, _options?: IntersectionObserverInit) {}
    } as unknown as typeof IntersectionObserver
  }

  const originalGetComputedStyle = globalThis.getComputedStyle
  vi.spyOn(global, 'getComputedStyle').mockImplementation(elem => {
    return originalGetComputedStyle(elem)
  })

  mockAdoptedStyles()
}

failOnConsole({
  shouldFailOnWarn: true,
})

// fixes click on svg elements, fireEvent also affected
// @ts-ignore
if (!SVGElement.prototype.click) {
  // @ts-ignore
  SVGElement.prototype.click = function () {
    const event = new MouseEvent('click', {bubbles: true})
    this.dispatchEvent(event)
  }
}

if (!globalThis.removeEventListener) {
  globalThis.removeEventListener = () => {
    // do nothing
  }
}

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation((msg, b, c) => {
    console.log('ERROR:', msg)
  })

  if (!isBrowserMode()) {
    // @ts-ignore use skia-canvas as a mock for canvas
    vi.spyOn(global.HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
      const canvas = new Canvas()
      return canvas.getContext('2d')
    })
  } else {
    // disable local storage for the designer
    globalThis.FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE = 'true'
  }

  // disable i18n logging
  globalThis.FORM_BUILDER_I18N_DISABLE_LOGGING = 'true'
})

configure({asyncUtilTimeout: 5000}) // 5 seconds

afterEach(() => {
  cleanup()
  localStorage.clear()
  document.documentElement.removeAttribute('lang')
  document.documentElement.removeAttribute('dir')
})
