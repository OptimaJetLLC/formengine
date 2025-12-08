import {expect} from 'vitest'

expect.extend({
  toAllHaveTextContent(received: HTMLElement[], expected: string[]) {
    const actualValues = received.map(el => el.textContent)
    const pass = this.equals(actualValues, expected)

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(actualValues)} to have values ${this.utils.printExpected(expected)}`,
        pass: true,
      }
    }

    return {
      message: () =>
        `expected ${this.utils.printReceived(actualValues)} to have only values ${this.utils.printExpected(expected)}`,
      pass: false,
    }
  }
})

declare module '@vitest/expect' {
  interface Assertion {
    toAllHaveTextContent(expected: string[]): void;
  }
}
