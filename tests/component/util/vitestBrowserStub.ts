import type {UserEvent} from '@vitest/browser/context'

const unavailable = (): Promise<never> => Promise.reject(new Error('vitest/browser is available only in browser mode.'))

/**
 * Stand-in for the Vitest browser virtual module.
 * jsdom loads component tests that import `vitest/browser`, and the real module throws outside browser mode.
 */
export const userEvent = new Proxy({} as UserEvent, {
  get: (_target, property) => {
    if (property === 'setup') return () => userEvent
    return unavailable
  },
})

/**
 * Stand-in for the browser CDP session. Browser mode uses the real `vitest/browser` module instead.
 * @returns a rejected promise.
 */
export const cdp = (): Promise<never> => unavailable()
