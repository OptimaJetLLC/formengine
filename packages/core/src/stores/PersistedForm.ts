import type {ActionValues} from '../features/event'
import {Language} from '../features/localization/types'
import {ComponentStore} from './ComponentStore'
import {LocalizationValue} from './LocalizationStore'

/**
 * The format for saving a form designed in Form Builder.
 */
export interface PersistedForm {

  /**
   * Represents a set of action definitions.
   */
  actions?: ActionValues,

  /**
   * Properties of the component displaying the error.
   */
  errorProps?: any,

  /**
   * Name of the type of component that displays the tooltip.
   */
  tooltipType?: string,

  /**
   * Name of the type of component displaying the error.
   */
  errorType?: string,

  /**
   * Settings for components that display the form.
   */
  form: ComponentStore,

  /**
   * Localization of the form.
   */
  localization: LocalizationValue,

  /**
   * Form languages.
   */
  languages: Language[],

  /**
   * The default form language.
   */
  defaultLanguage: string
}
