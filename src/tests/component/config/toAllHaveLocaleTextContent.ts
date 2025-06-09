import {expect} from 'vitest'

const localeComparator = (a: Array<string | undefined>, b: Array<string | undefined>) => {
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    const actualValue = a[i]
    const expectedValue = b[i]

    if (typeof actualValue === 'string' && typeof expectedValue === 'string'
      && actualValue.localeCompare(expectedValue) === 0) {
      continue
    }

    if (typeof actualValue === 'undefined' && typeof expectedValue === 'undefined') {
      continue
    }

    return false
  }

  return true
}

expect.extend({
  toAllHaveLocaleTextContent(received: HTMLElement[], expected: string[]) {
    const actualValues = received.map(el => el.textContent)
    const pass = this.equals(actualValues, expected, [localeComparator])

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
  interface Assertion {
    toAllHaveLocaleTextContent(expected: string[]): void;
  }
}
