export type CiFailureReportSuite = 'module' | 'component' | 'e2e'

export type CiFailureReportCaseKind = 'assertion' | 'thrown-error' | 'async-rejection' | 'console-on-failure' | 'console-warn'

interface CiFailureReportCase {
  kind: CiFailureReportCaseKind
  title: string
  suites: readonly CiFailureReportSuite[]
}

const CI_FAILURE_REPORT_CASES: readonly CiFailureReportCase[] = [
  {
    kind: 'assertion',
    title: 'reports an assertion failure',
    suites: ['module', 'component', 'e2e'],
  },
  {
    kind: 'thrown-error',
    title: 'reports a thrown error',
    suites: ['module', 'component', 'e2e'],
  },
  {
    kind: 'async-rejection',
    title: 'reports an async rejection',
    suites: ['module', 'component'],
  },
  {
    kind: 'console-on-failure',
    title: 'reports buffered console output on failure',
    suites: ['module', 'component', 'e2e'],
  },
  {
    kind: 'console-warn',
    title: 'reports a console.warn failure',
    suites: ['component'],
  },
]

/**
 * Returns demo failure cases for the given test suite.
 * @param suite test suite identifier
 */
export function getCiFailureReportCasesForSuite(suite: CiFailureReportSuite): CiFailureReportCase[] {
  return CI_FAILURE_REPORT_CASES.filter(testCase => testCase.suites.includes(suite))
}
