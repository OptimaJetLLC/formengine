import createCache from '@emotion/cache'
import {arEG, enUS, ruRU} from 'rsuite/esm/locales/index.js'
import rtlPlugin from 'stylis-plugin-rtl'
import {BiDi} from './bidi'
import {Language} from './types'

export const defaultLanguage: Language =
  new Language('en', 'US', 'English', 'American English')

export const languages: Language[] = [
  defaultLanguage,
  new Language('ru', 'RU', 'Русский', 'Russian'),
  new Language('ar', 'EG', 'عرب', 'Arabic (Egypt)', BiDi.RTL),
]

export const emotionCache = {
  LTR: createCache({
    key: BiDi.LTR
  }),
  RTL: createCache({
    key: BiDi.RTL,
    stylisPlugins: [rtlPlugin],
    prepend: true
  }),
}

export const defaultRSuiteLanguage = enUS

export const rSuiteLanguages: { [key: string]: any } = {
  'en-US': enUS,
  'ru-RU': ruRU,
  'ar-EG': arEG,
  'en': enUS,
  'ru': ruRU,
  'ar': arEG
}

const cssFiles = import.meta.glob('../../../public/css/*', {as: 'url'})

export const cssUrls = {
  [BiDi.LTR]: cssFiles['../../../public/css/rsuite.min.css'],
  [BiDi.RTL]: cssFiles['../../../public/css/rsuite-rtl.min.css'],
}
