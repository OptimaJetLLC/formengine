const CI_DEMO_FAILURES_KEY = 'CI_DEMO_FAILURES'

/**
 * When set, demo failure specs run to exercise CI reporters and failure-only console output.
 */
function isCiFailureReportDemoEnabled(): boolean {
  const value = process.env[CI_DEMO_FAILURES_KEY]
  return value === '1' || value === 'true'
}

/**
 * Returns the enabled value when CI_DEMO_FAILURES is set, otherwise the disabled value.
 * @param enabled value to use when demo mode is on
 * @param disabled value to use when demo mode is off
 */
export function whenCiFailureReportDemoEnabled<T>(enabled: T, disabled: T): T {
  return isCiFailureReportDemoEnabled() ? enabled : disabled
}
