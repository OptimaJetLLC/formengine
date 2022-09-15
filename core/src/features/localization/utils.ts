import {defaultLanguage, languages} from './consts'
import {initI18n} from './index'
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
