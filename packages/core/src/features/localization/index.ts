import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import {initReactI18next} from 'react-i18next'
import {LangSwitch} from './components/LangSwitch'
import {Localization} from './components/Localization'
import {OnInitCallback} from './types'

export function initI18n(onInit: OnInitCallback) {
  i18n
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
        debug: true,
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
        onInit(i18n.language)
      })
  return i18n
}

export {Localization, LangSwitch}
