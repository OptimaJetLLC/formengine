export const isBrowserMode = () => {
  return typeof process.env.VITEST_BROWSER_DEBUG !== 'undefined'
}
