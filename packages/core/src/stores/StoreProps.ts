import {ComponentType} from 'react'
import {View} from '../features/define'
import {ActionDefinition} from '../features/event'
import {ViewMode} from '../types'
import {ComponentStore} from './ComponentStore'

/**
 * The form viewer properties.
 */
export interface StoreProps {

  /**
   * Loads the form.
   * @param name the form name.
   * @returns the object or {@link Promise} with the form.
   */
  getForm?: (name?: string) => ComponentStore | Promise<ComponentStore>

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
}
