/**
 * Returns true when a license key from root `.env` is present and not empty.
 * Vite replaces missing keys with `""`; process.env may be `undefined`.
 * @param license license value from Vite define or `process.env`
 * @returns true if a test that depends on this license can run
 */
export function isLicenseDefined(license: unknown): boolean {
  return typeof license === 'string' && license.trim().length > 0
}
