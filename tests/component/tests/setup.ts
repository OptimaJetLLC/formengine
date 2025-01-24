// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom'
import failOnConsole from 'vitest-fail-on-console'

import {addMatchMediaFunctionToWindow} from './matchMedia'

addMatchMediaFunctionToWindow()
failOnConsole({
  shouldFailOnWarn: false,
  silenceMessage: (errorMessage) => {
    return /act\(/.test(errorMessage)
  },
})
