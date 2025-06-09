import {expect} from 'vitest'

expect.extend({
  toAllCheckboxesHaveExactValues(received: HTMLElement[], expected: any[]) {
    const actualValues = received.map(el => {
      const innerInput = el.querySelector('input[type="checkbox"]') as HTMLInputElement
      if (!innerInput) throw new Error('Expected input for element: ' + el)
      return innerInput.checked
    })

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

declare module 'vitest' {
  interface Assertion<T = any> {
    toAllCheckboxesHaveExactValues(expected: any[]): void;
  }
}
