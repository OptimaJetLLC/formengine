import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import {initReactI18next} from 'react-i18next'
import {defaultLanguage, languages} from './consts'
import {Language, OnInitCallback} from './types'

export function getFullLangCode(lang: Language): string {
  return `${lang.code}-${lang.dialect}`
}

let firstLang: string | undefined
let callbacks: OnInitCallback[] = []

export function onI18nInit(callback: OnInitCallback) {
  if (firstLang) {
    callback(firstLang)
    return
  }
  callbacks.push(callback)
}

function onInit(language: string) {
  if (!firstLang) {
    firstLang = language
  }
  while (callbacks.length) {
    const callback = callbacks.pop()
    callback && callback(firstLang)
  }
}

export function initI18n(onInit: OnInitCallback) {
  i18next
    //.use(XHR)
    .use(resourcesToBackend((language, namespace, callback) => {
      import(`../../../public/locales/${language}/${namespace}.json`)
        .then((resources) => {
          callback(null, resources)
        })
        .catch((error) => {
          callback(error, null)
        })
    }) as any)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        // todo отключать в продуктивной сборке
        //debug: true,
        fallbackLng: 'en-US',
        load: 'currentOnly',
        interpolation: {
          escapeValue: false,
        },
      },
      (error) => {
        if (error) {
          console.log('An error occurred while initializing the language', error)
          return
        }
        onInit(i18next.language)
      })
  return i18next
}

export const i18n = initI18n(onInit)

export async function onLanguageChange(lang: Language) {
  const langCode = getFullLangCode(lang)
  document.documentElement.lang = langCode
  document.documentElement.dir = lang.bidi
  await i18n.changeLanguage(langCode)
}

function findLanguageByCode(code: string, dialect?: string): Language | undefined {
  if (dialect) {
    return languages.find(lang => lang.code === code && lang.dialect === dialect)
  }
  return languages.find(lang => lang.code === code)
}

export function findLanguage(language: string): Language {
  const codes = language.split('-')
  if (codes.length > 1) {
    const code = codes[0]
    const dialect = codes[1]
    const langByFullCode = findLanguageByCode(code, dialect)
    if (langByFullCode) {
      return langByFullCode
    }
    let languageByCode = findLanguageByCode(code)
    if (languageByCode) {
      return languageByCode
    }
  }
  return findLanguageByCode(language) || defaultLanguage
}
