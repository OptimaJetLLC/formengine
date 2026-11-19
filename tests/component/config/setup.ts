import {cleanup, configure} from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import {afterEach, beforeAll, vi} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'
import {isBrowserMode} from './isBrowserMode'

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

  if (isBrowserMode()) {
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
