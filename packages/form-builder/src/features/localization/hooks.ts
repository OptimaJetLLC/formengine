import {useTranslation} from 'react-i18next'

/**
 * Returns the string translation method finding for string constants relative to the specified path.
 * @param path the relative path for finding string constants.
 * @returns the string translation method.
 */
export const useTranslationPart = (path: string) => {
  const [t, {exists}] = useTranslation()
  return (key: string) => {
    const fullPath = `${path}.${key}`
    return exists(fullPath) ? t(fullPath) : ''
  }
}
