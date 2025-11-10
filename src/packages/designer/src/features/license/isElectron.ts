// https://github.com/cheton/is-electron

/**
 * Checks if app running in Electron.
 * @returns true if app running in Electron, false otherwise.
 */
export function isElectron() {
  //@ts-ignore Electron specific
  if (typeof window !== 'undefined' && typeof window.process === 'object' && window.process.type === 'renderer') {
    return true
  }

  if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
    return true
  }

  if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
    return true
  }

  return false
}
