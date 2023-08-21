import type {ComponentType} from 'react'
import {ForwardedRef} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import type {PersistedForm} from '../../stores/PersistedForm'
import type {ViewMode} from '../../types'
import type {ComputeChildren} from '../../utils/ComputeChildren'
import {IFormData} from '../../utils/IFormData'
import {View} from '../define'
import type {ActionDefinition} from '../event'
import {EventStream} from '../event/utils/EventStream'
import {Language} from '../localization/types'
import type {ExternalValidators} from '../validation/types/ExternalValidationRules'

/**
 * Form viewer React component properties.
 */
export interface FormViewerProps {

  /**
   * The function for processing form events.
   * @param stream the event stream of the form viewer.
   */
  event?: (stream: EventStream) => void

  /**
   * Loads the form.
   * @param name the form name.
   * @returns the object or {@link Promise} with the form.
   */
  getForm?: (name?: string) => PersistedForm | Promise<PersistedForm>

  /**
   * The form name.
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
  initialData?: Record<string, unknown>

  // todo change documentation
  /** No use a error wrap component. */
  erroneous?: boolean

  /**
   * The React component that wraps every component in a form.
   */
  componentWrapper?: ComponentType<any>

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

  /**
   * The set of metadata of external validation rules, grouped by the type of value being validated.
   */
  externalValidators?: ExternalValidators

  /**
   * Function that calculates all child properties of a component.
   */
  computeChildren?: ComputeChildren

  /**
   * The reference to {@link IFormViewer}.
   */
  viewerRef?: ForwardedRef<IFormViewer>

  /**
   * The event is called whenever a form data changes.
   * @param data the {@link IFormData} with all the form data.
   */
  onDataChange?: (data: IFormData) => void
}

/**
 * The form viewer settings interface.
 */
export interface IFormViewer {
  /**
   * @returns the {@link IFormData} with all the form data.
   */
  get formData(): IFormData
}
