import {ComponentType} from 'react'
import {View} from '../features/define'
import {ActionDefinition} from '../features/event'
import {ViewMode} from '../types'
import {ComponentStore} from './ComponentStore'

export interface StoreProps {
  getForm?: () => ComponentStore | Promise<ComponentStore>
  view: View
  actions?: ActionDefinition[]
  data?: Record<string, unknown>
  /** No use a error wrap component. */
  erroneous?: boolean
  componentWrapper?: ComponentType<any>
  viewMode?: ViewMode
}
