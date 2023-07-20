import {Language} from '../features/localization/types'
import {ComponentStore} from './ComponentStore'
import {LocalizationValue} from './LocalizationStore'

/**
 * The format for saving a form designed in Form Builder.
 */
export interface PersistedForm {
  form: ComponentStore,
  localization: LocalizationValue,
  languages: Language[],
  defaultLanguage: string
}
