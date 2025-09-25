import type {BuilderTheme} from './types'

/**
 * @returns the {@link BuilderTheme} from the current browser settings.
 */
export const getSystemTheme = (): BuilderTheme => {
  return globalThis.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? 'dark' : 'light'
}
