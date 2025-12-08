import {expect} from 'vitest'

expect.extend({
  toAllHaveInnerHtml(received: HTMLElement[], expected: string[]) {
    const actualValues = received.map(el => el.innerHTML)
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
    toAllHaveInnerHtml(expected: string[]): void;
  }
}
