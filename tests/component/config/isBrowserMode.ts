export const isBrowserMode = () => {
  // In Vitest 4 browser mode, process might not exist or env vars might not be available
  // Check for browser environment indicators
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    // Check if we're in a real browser (not jsdom)
    if (typeof process === 'undefined' || !process.env || typeof process.env.VITEST_BROWSER_DEBUG === 'undefined') {
      // In browser mode, we might have window but process.env might not be set
      // Check for Vitest browser context
      return (
        typeof (globalThis as any).__vitest_browser__ !== 'undefined' ||
        typeof (window as any).__vitest_browser__ !== 'undefined' ||
        (typeof process !== 'undefined' && process.env && typeof process.env.VITEST_BROWSER_DEBUG !== 'undefined')
      )
    }
    return typeof process.env.VITEST_BROWSER_DEBUG !== 'undefined'
  }
  return false
}
