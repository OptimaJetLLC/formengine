import type {ComponentType} from 'react'
import {ForwardedRef} from 'react'
import type {ViewMode} from '../../types'
import type {ComputeChildren} from '../../utils/ComputeChildren'
import {IFormData} from '../../utils/IFormData'
import {View} from '../define'
import {EventStream} from '../event/utils/EventStream'
import {Language} from '../localization/types'
import type {ExternalValidators} from '../validation/types/ExternalValidationRules'
import type {ComponentLocalizer} from './ComponentLocalizer'
import type {ExternalActions} from './ExternalActions'
import type {ExternalFormValidators} from './ExternalFormValidators'

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
   * @returns the string or Promise with the form.
   */
  getForm?: (name?: string) => string | Promise<string>

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
  externalActions?: ExternalActions

  /**
   * The set of functions that validate the form data.
   */
  externalFormValidators?: ExternalFormValidators

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
  language?: Language

  /**
   * The function to localize the properties of a component.
   */
  localize?: ComponentLocalizer

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
