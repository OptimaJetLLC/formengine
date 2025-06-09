import type {FormBuilderTheme} from '../FormBuilderTheme'
import {getSystemTheme} from './getSystemTheme'
import type {BuilderTheme} from './types'

/**
 * Determines the theme based on the given theme preference.
 * @param theme the theme preference.
 * @returns the {@link BuilderTheme} based on the given theme preference.
 */
export const determineTheme = (theme?: FormBuilderTheme): BuilderTheme => {
  return theme === 'system' ? getSystemTheme() : (theme ?? getSystemTheme())
}
