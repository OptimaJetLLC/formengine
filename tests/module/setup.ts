import {beforeAll, vi} from 'vitest'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole({
  shouldFailOnWarn: true,
})

beforeAll(() => {
  vi.spyOn(console, 'error').mockImplementation((msg, b, c) => {
    console.log('ERROR:', msg)
  })
})
