import {ComponentType} from 'react'
import {View} from '../features/define'
import {ActionDefinition} from '../features/event'
import {ViewMode} from '../types'
import {ComponentStore} from './ComponentStore'

export interface StoreProps {
  getForm?: (name?: string) => ComponentStore | Promise<ComponentStore>
  formName?: string
  view: View
  actions?: ActionDefinition[]
  data?: Record<string, unknown>
  /** No use a error wrap component. */
  erroneous?: boolean
  componentWrapper?: ComponentType<any>
  viewMode?: ViewMode
}
