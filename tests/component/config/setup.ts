import {configure} from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
import {Canvas} from 'skia-canvas'
import {beforeAll} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'
// @ts-ignore
import {Crypto} from 'webcrypto-liner'

import {addMatchMediaFunctionToWindow} from './matchMedia'

Object.defineProperty(window, 'crypto', {
  value: new Crypto(),
})

addMatchMediaFunctionToWindow()
failOnConsole({
  shouldFailOnWarn: true,
  silenceMessage: (errorMessage) => {
    return /act\(/.test(errorMessage)
  },
})

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation((msg, b, c) => {
    console.log('ERROR:', msg)
  })

  // @ts-ignore use skia-canvas as a mock for canvas
  vi.spyOn(global.HTMLCanvasElement.prototype, 'getContext').mockImplementation(() => {
    const canvas = new Canvas()
    return canvas.getContext('2d')
  })

})

configure({asyncUtilTimeout: 5000}) // 5 seconds
