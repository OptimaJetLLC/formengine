import {expect, it} from 'vitest'
import {whenCiFailureReportDemoEnabled} from './ci-failure-report'
import type {CiFailureReportCaseKind, CiFailureReportSuite} from './ci-failure-report.cases'
import {getCiFailureReportCasesForSuite} from './ci-failure-report.cases'

function runVitestCase(kind: CiFailureReportCaseKind, suite: CiFailureReportSuite): void | Promise<void> {
  switch (kind) {
    case 'assertion':
      expect('actual-value').toBe('expected-value')
      return
    case 'thrown-error':
      throw new Error(`Demo thrown error from ${suite} test`)
    case 'async-rejection':
      return Promise.reject(new Error(`Demo async rejection from ${suite} test`))
    case 'console-on-failure':
      console.log(`${suite} demo diagnostic`, {step: 'before-assertion', tags: ['fnArg', 'stdout']})
      expect(true).toBe(false)
      return
    case 'console-warn':
      console.warn('Demo console.warn that should fail the test')
      expect(true).toBe(true)
      return
  }
}

/**
 * Registers intentional failing vitest cases for CI reporter validation.
 * @param describeFn vitest describe function
 * @param suite test suite identifier
 */
export function registerVitestCiFailureReportDemo(
  describeFn: typeof import('vitest').describe,
  suite: CiFailureReportSuite,
): void {
  const demoSuite = whenCiFailureReportDemoEnabled(describeFn, describeFn.skip)

  demoSuite(`CI failure report demo (${suite})`, () => {
    for (const testCase of getCiFailureReportCasesForSuite(suite)) {
      it(testCase.title, () => runVitestCase(testCase.kind, suite))
    }
  })
}
