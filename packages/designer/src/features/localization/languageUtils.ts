import {BiDi, Language} from '@react-form-builder/core'
import {arEG, deDE, enUS, esES, faIR, frFR, itIT, zhCN} from 'rsuite/esm/locales/index.js'
import type {FormBuilderI18n} from './FormBuilderLanguage'

const rSuiteLocales: Record<string, any> = {
  'ar-EG': arEG,
  'de-DE': deDE,
  'en-US': enUS,
  'it-IT': itIT,
  'fa-IR': faIR,
  'fr-FR': frFR,
  'es-ES': esES,
  'zh-CN': zhCN
}

export const defaultComponentsLocale = enUS

export const builtInLanguages: FormBuilderI18n = {
  languages: [
    new Language('en', 'US', 'English', 'American English'),
    new Language('de', 'DE', 'Deutsch', 'German'),
    new Language('ar', 'EG', 'عرب', 'Arabic (Egypt)', BiDi.RTL),
    new Language('it', 'IT', 'Italiano', 'Italian'),
    new Language('fa', 'IR', 'فارسی', 'Persian', BiDi.RTL),
    new Language('fr', 'FR', 'Français', 'French'),
    new Language('es', 'ES', 'Español', 'Spanish'),
    new Language('zh', 'CN', '中文', 'Chinese')
  ],
  getData: async languageFullCode => {
    const data = await import(`../../../public/locales/${languageFullCode}.json`)
    return {
      data: data,
      componentsLocale: rSuiteLocales[languageFullCode]
    }
  }
}

function findLanguageByCode(availableLanguages: Language[], code: string) {
  return availableLanguages.find(language => language.code === code)
}

/**
 * Finds {@link Language} by language code.
 * @param availableLanguages the available languages.
 * @param language the language code.
 * @returns found {@link Language}, or the default Language if no Language exists for the language code.
 */
export function findLanguage(availableLanguages: Language[], language: string): Language | undefined {
  const codes = language.split('-')

  if (codes.length > 1) {
    const code = codes[0]
    const dialect = codes[1]
    const langByFullCode = availableLanguages
      .find(language => language.code === code && language.dialect === dialect)
    if (langByFullCode) return langByFullCode
    const languageByCode = findLanguageByCode(availableLanguages, code)
    if (languageByCode) return languageByCode
  }

  return findLanguageByCode(availableLanguages, language)
}
