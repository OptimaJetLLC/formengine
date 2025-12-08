import {findByTestId} from '@testing-library/react'
import {expect} from 'vitest'

expect.extend({
  async toAllSelectsHaveValues(received: HTMLElement[], expected: any[]) {
    const actualValues: Array<string | null> = []
    for (let i = 0; i < received.length; i++) {
      const select = await findByTestId(received[i], 'picker-toggle-input')
      actualValues.push(select.getAttribute('value'))
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
    toAllSelectsHaveValues(expected: any[]): Promise<void>;
  }
}
