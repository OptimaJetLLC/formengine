import type {LanguageFullCode} from '@react-form-builder/core'
import {BiDi, findLanguage, globalDefaultLanguage, Language} from '@react-form-builder/core'
import dfAR from 'date-fns/locale/ar-EG/index.js'
import dfDE from 'date-fns/locale/de/index.js'
import dfEN from 'date-fns/locale/en-US/index.js'
import dfES from 'date-fns/locale/es/index.js'
import dfFA from 'date-fns/locale/fa-IR/index.js'
import dfFR from 'date-fns/locale/fr/index.js'
import dfHI from 'date-fns/locale/hi/index.js'
import dfIT from 'date-fns/locale/it/index.js'
import dfJA from 'date-fns/locale/ja/index.js'
import dfKO from 'date-fns/locale/ko/index.js'
import dfSR from 'date-fns/locale/sr/index.js'
import dfCN from 'date-fns/locale/zh-CN/index.js'
import {merge} from 'lodash-es'
import {arEG, deDE, enUS, esES, faIR, frFR, itIT, jaJP, koKR, zhCN} from 'rsuite/esm/locales/index.js'
import enUsTranslation from '../../../public/locales/en-US.json'
import type {FormBuilderI18n, FormBuilderI18nData} from './FormBuilderLanguage'
import {hiIN} from './rsuite/hi-IN'
import {srRS} from './rsuite/sr-RS'

const rSuiteLocales: Record<string, any> = {
  'ar-EG': arEG,
  'de-DE': deDE,
  'en-US': enUS,
  'it-IT': itIT,
  'fa-IR': faIR,
  'fr-FR': frFR,
  'hi-IN': hiIN,
  'es-ES': esES,
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'sr-RS': srRS,
  'zh-CN': zhCN
}

export const dateFnsLocales: Record<string, any> = {
  'ar-EG': dfAR,
  'de-DE': dfDE,
  'en-US': dfEN,
  'it-IT': dfIT,
  'fa-IR': dfFA,
  'fr-FR': dfFR,
  'hi-IN': dfHI,
  'es-ES': dfES,
  'ja-JP': dfJA,
  'ko-KR': dfKO,
  'sr-RS': dfSR,
  'zh-CN': dfCN
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
    new Language('hi', 'IN', 'हिन्दी', 'Hindi (India)'),
    new Language('es', 'ES', 'Español', 'Spanish'),
    new Language('ja', 'JP', '日本語', 'Japanese'),
    new Language('ko', 'KR', '한국어', 'Korean'),
    new Language('sr', 'RS', 'Српски', 'Serbian'),
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

const loadLanguage = async (i18n: FormBuilderI18n, language: LanguageFullCode) => {
  try {
    return await i18n.getData(language)
  } catch (error) {
    if (globalThis.FORM_BUILDER_I18N_DISABLE_LOGGING !== 'true') {
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

  if (i18n !== builtInLanguages && findLanguage(builtInLanguages.languages, language)) {
    const builtin = await loadLanguage(builtInLanguages, language)
    if (builtin) found.push(builtin)
  }

  const user = await loadLanguage(i18n, language)
  if (user) found.push(user)

  // we need to create a copy of the objects to prevent them from being modified
  const items = found.map(item => JSON.parse(JSON.stringify(item)))
  return merge({}, ...items)
}
