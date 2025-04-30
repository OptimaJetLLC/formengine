import {configure} from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
import {Canvas} from 'skia-canvas'
import {beforeAll} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'

import {addMatchMediaFunctionToWindow} from './matchMedia'

const isBrowserMode = () => {
  return typeof process.env.VITEST_BROWSER_DEBUG !== 'undefined'
}

if (!isBrowserMode()) {
  addMatchMediaFunctionToWindow()
}

failOnConsole({
  shouldFailOnWarn: true,
})

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
  }

  // disable i18n logging
  process.env.FORM_BUILDER_I18N_DISABLE_LOGGING = 'true'
})

configure({asyncUtilTimeout: 5000}) // 5 seconds
