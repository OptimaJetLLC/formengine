import {expect} from 'vitest'

expect.extend({
  toAllHaveExactAttributes(received: HTMLElement[], attributeName: string, expected: any[]) {
    const actualValues: Array<string | null> = []
    for (let i = 0; i < received.length; i++) {
      actualValues.push(received[i].getAttribute(attributeName))
    }

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
  interface Assertion<T = any> {
    toAllHaveExactAttributes(attributeName: string, expected: any[]): void
  }
}
