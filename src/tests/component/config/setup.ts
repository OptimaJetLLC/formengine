import {configure} from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
import {Canvas} from 'skia-canvas'
import {beforeAll} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'
import {isBrowserMode} from './isBrowserMode'

import {addMatchMediaFunctionToWindow} from './matchMedia'

if (!isBrowserMode()) {
  addMatchMediaFunctionToWindow()
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

    // Mock ResizeObserver for jsdom environment
    if (typeof global.ResizeObserver === 'undefined') {
      global.ResizeObserver = class ResizeObserver {
        observe = vi.fn()
        unobserve = vi.fn()
        disconnect = vi.fn()

        constructor(callback: ResizeObserverCallback) {
          // Store callback if needed
        }
      } as any
    }
  } else {
    // disable local storage for the designer
    globalThis.FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE = 'true'
  }

  // disable i18n logging
  globalThis.FORM_BUILDER_I18N_DISABLE_LOGGING = 'true'
})

configure({asyncUtilTimeout: 5000}) // 5 seconds
