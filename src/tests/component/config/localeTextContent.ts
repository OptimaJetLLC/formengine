import {expect} from 'vitest'

const localeComparator = (a: string | undefined | null, b: string | undefined | null) => {
  if (typeof a === 'string' && typeof b === 'string' && a.localeCompare(b) === 0) {
    return true
  }

  if (a === null && b === null) {
    return true
  }

  return typeof a === 'undefined' && typeof b === 'undefined'
}

const localeArrayComparator = (a: Array<string | undefined | null>, b: Array<string | undefined | null>) => {
  if (a.length !== b.length) return false

  for (let i = 0; i < a.length; i++) {
    if (!localeComparator(a[i], b[i])) {
      return false
    }
  }

  return true
}

expect.extend({
  toHaveLocaleTextContent(received: HTMLElement, expected: string) {
    const actual = received.textContent
    const pass = localeComparator(actual, expected)

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(actual)} to have values ${this.utils.printExpected(expected)}`,
        pass: true,
      }
    }

    return {
      message: () =>
        `expected ${this.utils.printReceived(actual)} to have only values ${this.utils.printExpected(expected)}`,
      pass: false,
    }
  },
  toAllHaveLocaleTextContent(received: HTMLElement[], expected: string[]) {
    const actualValues = received.map(el => el.textContent)
    const pass = this.equals(actualValues, expected, [localeArrayComparator])

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
    toHaveLocaleTextContent(expected: string): void;

    toAllHaveLocaleTextContent(expected: string[]): void;
  }
}
