import {BuilderTheme} from './types'

export const getSystemTheme = (): BuilderTheme => {
  return window.matchMedia('(prefers-color-scheme: dark)')?.matches
    ? 'dark' : 'light'
}
