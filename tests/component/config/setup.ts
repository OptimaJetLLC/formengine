import {configure} from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
import failOnConsole from 'vitest-fail-on-console'
import {beforeAll} from 'vitest'

import {addMatchMediaFunctionToWindow} from './matchMedia'

addMatchMediaFunctionToWindow()
failOnConsole({
  shouldFailOnWarn: false,
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
