import {configure} from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
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
})

configure({asyncUtilTimeout: 5000}) // 5 seconds
