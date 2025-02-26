import {configure} from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {beforeAll} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'

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

i18n.use(initReactI18next).init({resources: {}}).catch(console.error)
