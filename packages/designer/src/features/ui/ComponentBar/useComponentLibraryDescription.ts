import type {ComponentLibraryDescription, LanguageFullCode} from '@react-form-builder/core'
import {coreComponentsDescriptions} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'

/**
 * @returns the function to get a component library description element in accordance with the selected language.
 */
export const useComponentLibraryDescription = () => {
  const {i18n} = useTranslation()
  const currentLanguageCode = i18n.language as LanguageFullCode
  const {view, defaultLanguage} = useBuilderStore()
  const {i18nDescriptions} = view
  const defaultLanguageCode = defaultLanguage.fullCode

  return useCallback((selector: (libraryDescription?: ComponentLibraryDescription) => string | undefined) => {
    if (!i18nDescriptions) return

    for (let i = 0; i < i18nDescriptions.length; i++) {
      const item = i18nDescriptions[i]
      const result = selector(item[currentLanguageCode]) ?? selector(item[defaultLanguageCode])
      if (result) return result
    }

    return selector(coreComponentsDescriptions[currentLanguageCode])
      ?? selector(coreComponentsDescriptions[defaultLanguageCode])
  }, [currentLanguageCode, defaultLanguageCode, i18nDescriptions])
}
