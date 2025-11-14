import type {BuilderTheme} from '@react-form-builder/core'
import type {FormBuilderTheme} from '../FormBuilderTheme'
import {getSystemTheme} from './getSystemTheme'

/**
 * Determines the theme based on the given theme preference.
 * @param theme the theme preference.
 * @returns the {@link BuilderTheme} based on the given theme preference.
 */
export const determineTheme = (theme?: FormBuilderTheme): BuilderTheme => {
  return theme === 'system' ? getSystemTheme() : (theme ?? getSystemTheme())
}
