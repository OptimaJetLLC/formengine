import type {BuilderTheme} from '@react-form-builder/core'

/**
 * @returns the {@link BuilderTheme} from the current browser settings.
 */
export const getSystemTheme = (): BuilderTheme => {
  return globalThis.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? 'dark' : 'light'
}
