import type {Language, LanguageFullCode} from '@react-form-builder/core'
import {globalDefaultLanguage} from '@react-form-builder/core'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import {initReactI18next} from 'react-i18next'

/**
 * A callback function that returns JSON with a translation by the specified language.
 */
export type TranslationResolver = (language: LanguageFullCode) => Promise<any>

/**
 * I18n for the Form Builder.
 */
export class BuilderI18n {

  /**
   * Creates i18n for the form builder.
   * @param defaultLanguage the default language.
   * @param translationResolver the callback function that returns JSON with a translation by the specified language.
   */
  constructor(defaultLanguage: Language, translationResolver: TranslationResolver) {
    i18next
      .use(resourcesToBackend((language, _ns, callback) => {
        translationResolver(<LanguageFullCode>language)
          .then(resources => callback(null, resources))
          .catch(error => {
            console.error(error)
            callback(error, null)
          })
      }) as any)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
          lng: defaultLanguage.fullCode,
          fallbackLng: [globalDefaultLanguage.fullCode],
          load: 'currentOnly',
          interpolation: {
            escapeValue: false,
          },
          missingKeyNoValueFallbackToKey: false,
          saveMissing: process.env.NODE_ENV !== 'production',
          missingKeyHandler: (lng, ns, key, _fallbackValue) => {
            if (process.env.FORM_BUILDER_I18N_DISABLE_LOGGING !== 'true') {
              console.warn(`Missing translation: ${key}`, lng, ns)
            }
          }
        },
        this.onLoadError.bind(this)
      )
      .catch(e => console.error(e))
  }

  /**
   * Sets the language for the web page.
   * @param language the language.
   * @returns the {@link Promise} with the result of the language setting.
   */
  async changeWebDocumentLanguage(language: Language) {
    await i18next.changeLanguage(language.fullCode)
    document.documentElement.lang = language.fullCode
    document.documentElement.dir = language.bidi
  }

  private onLoadError(error: any) {
    // eslint-disable-next-line no-console
    if (error) console.log('An error occurred while initializing the language', error)
  }
}
