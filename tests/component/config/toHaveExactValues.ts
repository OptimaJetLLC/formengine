import {expect} from 'vitest'

expect.extend({
  toHaveExactValues(received: HTMLElement[], expected: any[]) {
    const actualValues = received.map(el => el.getAttribute('value'))
    const pass = this.equals(actualValues, expected)

    if (pass) {
      return {
        message: () => `expected ${this.utils.printReceived(actualValues)} to have values ${this.utils.printExpected(expected)}`,
        pass: true,
      }
    }

    return {
      message: () => `expected ${this.utils.printReceived(actualValues)} to have only values ${this.utils.printExpected(expected)}`,
      pass: false,
    }
  },
})

declare module 'vitest' {
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    toHaveExactValues(expected: any[]): R
  }
}
