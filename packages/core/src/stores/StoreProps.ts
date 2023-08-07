import {ComponentType} from 'react'
import {View} from '../features/define'
import {ActionDefinition} from '../features/event'
import {Language} from '../features/localization/types'
import {ViewMode} from '../types'
import {ComponentStore} from './ComponentStore'
import {PersistedForm} from './PersistedForm'

/**
 * The form viewer properties.
 */
export interface StoreProps {

  /**
   * Loads the form.
   * @param name the form name.
   * @returns the object or {@link Promise} with the form.
   */
  getForm?: (name?: string) => PersistedForm | Promise<PersistedForm>

  /**
   * the form name.
   */
  formName?: string

  /**
   * All the metadata of the components of the form viewer.
   */
  view: View

  /**
   * External actions for the form viewer.
   */
  actions?: ActionDefinition[]

  /**
   * The initial data of the form.
   */
  data?: Record<string, unknown>

  // todo change documentation
  /** No use a error wrap component. */
  erroneous?: boolean

  /**
   * The React component that wraps every component in a form.
   */
  componentWrapper?: ComponentType<any>

  /**
   * The React component that wraps a template slot.
   */
  slotWrapper?: ComponentType<any>

  /**
   * Display resolution type.
   */
  viewMode?: ViewMode

  /**
   * The language of form.
   */
  language?: string

  /**
   * The function to localize the properties of a component.
   * @param componentStore the component settings.
   * @param language the language selected in the form viewer.
   * @returns the {@link Record} with the localized properties of a component.
   */
  localize?: (componentStore: ComponentStore, language: Language) => Record<string, any>
}
