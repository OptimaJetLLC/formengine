/**
 * React 18+ uses this flag so updates wrapped by testing-library `act()` are recognized.
 * Without it, React logs "The current testing environment is not configured to support act(...)"
 * when MobX or other subscribers schedule updates, and vitest-fail-on-console fails the run.
 * @see https://react.dev/reference/react/act#setting-the-act-environment
 */
import {beforeEach} from 'vitest'

const setActEnvironment = () => {
  (globalThis as {IS_REACT_ACT_ENVIRONMENT?: boolean}).IS_REACT_ACT_ENVIRONMENT = true
}

setActEnvironment()

beforeEach(() => {
  setActEnvironment()
})
