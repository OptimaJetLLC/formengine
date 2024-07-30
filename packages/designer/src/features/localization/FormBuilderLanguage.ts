import type {Language} from '@react-form-builder/core'

/**
 * Data required to translate the form builder interface.
 */
export type FormBuilderI18nData = {

  /**
   * The JSON with translation.
   */
  data: any

  /**
   * The locale for translating rSuite components https://rsuitejs.com/guide/i18n/#supported-locales.
   */
  componentsLocale?: any
}

/**
 * The i18n data of the form builder.
 */
export type FormBuilderI18n = {

  /**
   * The languages.
   */
  languages: Language[]

  /**
   * The callback function called when loading data for i18n.
   * Accepts the full code (en-US, en-GB, etc.) of a language.
   */
  getData: (languageFullCode: string) => Promise<FormBuilderI18nData>
}
