import ar from './locales/ar-EG.json'
import de from './locales/de-DE.json'
import en from './locales/en-US.json'
import es from './locales/es-ES.json'
import fa from './locales/fa-IR.json'
import fr from './locales/fr-FR.json'
import hi from './locales/hi-IN.json'
import it from './locales/it-IT.json'
import ja from './locales/ja-JP.json'
import ko from './locales/ko-KR.json'
import sr from './locales/sr-RS.json'
import zh from './locales/zh-CN.json'

const translations = {
  ar,
  de,
  en,
  es,
  fa,
  fr,
  hi,
  it,
  ja,
  ko,
  sr,
  zh
}

type AvailableLanguage = keyof typeof translations

const fallbackLanguage: AvailableLanguage = 'en'

type Translation = {
  [key: string]: any;
}

type Options = {
  lng?: string
}

const i18n = (() => {
  let currentLanguage: AvailableLanguage = 'en'

  return {
    init: (options: Options = {}) => {
      currentLanguage = options.lng as AvailableLanguage || 'en'
    },

    t: (key: string, options: Translation = {}): string => {
      const keyParts = key.split('.')
      let value: any = translations[currentLanguage]

      for (const part of keyParts) {
        value = value?.[part]
        if (typeof value === 'undefined') break
      }

      if (typeof value === 'undefined' && currentLanguage !== fallbackLanguage) {
        value = translations[fallbackLanguage]
        for (const part of keyParts) {
          value = value?.[part]
          if (typeof value === 'undefined') break
        }
      }

      if (typeof value === 'undefined') return key

      if (options && typeof value === 'string') {
        return value.replace(/\{\{(.*?)\}\}/g, (match, p1) => options[p1.trim()] ?? match)
      }

      return value
    },
  }
})()

export default i18n
