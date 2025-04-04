import {BiDi, globalDefaultLanguage, Language} from '@react-form-builder/core'
import {merge} from 'lodash-es'
import {arEG, deDE, enUS, esES, faIR, frFR, itIT, zhCN} from 'rsuite/esm/locales/index.js'
import enUsTranslation from '../../../public/locales/en-US.json'
import type {FormBuilderI18n, FormBuilderI18nData} from './FormBuilderLanguage'

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

const defaultData: FormBuilderI18nData = {
  data: enUsTranslation,
  componentsLocale: defaultComponentsLocale
}

export const builtInLanguages: FormBuilderI18n = {
  languages: [
    globalDefaultLanguage,
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
 * Full language code.
 */
export type LanguageFullCode = `${string}-${string}`

/**
 * Finds {@link Language} by language code.
 * @param i18n FormBuilderI18n.
 * @param language the language code.
 * @returns found {@link Language}, or the default Language if no Language exists for the language code.
 */
function findLanguage(i18n: FormBuilderI18n, language: LanguageFullCode): Language | undefined {
  const [code, dialect] = language.split('-')
  const {languages} = i18n

  if (dialect) {
    const langByFullCode = languages
      .find(language => language.code === code && language.dialect === dialect)
    if (langByFullCode) return langByFullCode
    const languageByCode = findLanguageByCode(languages, code)
    if (languageByCode) return languageByCode
  }

  return findLanguageByCode(languages, language)
}

const loadLanguage = async (i18n: FormBuilderI18n, language: LanguageFullCode) => {
  try {
    return await i18n.getData(language)
  } catch (error) {
    if (process.env.FORM_BUILDER_I18N_DISABLE_LOGGING !== 'true') {
      console.warn(`Error loading language ${language}:`, error)
    }
  }
}

/**
 * Loads the translation for the specified language.
 * @param i18n the i18n object.
 * @param language the language code.
 * @returns the translation data.
 */
export const loadTranslation = async (i18n: FormBuilderI18n,
                                      language: LanguageFullCode): Promise<FormBuilderI18nData> => {
  const found = [defaultData]

  if (i18n !== builtInLanguages && findLanguage(builtInLanguages, language)) {
    const builtin = await loadLanguage(builtInLanguages, language)
    if (builtin) found.push(builtin)
  }

  const user = await loadLanguage(i18n, language)
  if (user) found.push(user)

  // we need to create a copy of the objects to prevent them from being modified
  const items = found.map(item => JSON.parse(JSON.stringify(item)))
  return merge({}, ...items)
}
