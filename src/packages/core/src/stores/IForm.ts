import type {Language} from '../features/localization/language'
import type {ILocalizationStore} from './ILocalizationStore'

/**
 * A form.
 */
export type IForm = {
  /**
   * Localization of the form.
   */
  readonly localization: ILocalizationStore

  /**
   * Default localization language of the form.
   */
  readonly defaultLanguage: Language
}
