import {ComponentType} from 'react'
import {View} from '../features/define'
import {ActionDefinition} from '../features/event'
import {ViewMode} from '../utils/types'
import {ComponentStore} from './ComponentStore'

export interface DropZoneProps {
  bindTo?: string
  bindCondition?: string
}

export interface StoreProps {
  getForm?: () => ComponentStore | Promise<ComponentStore>
  view: View
  actions?: ActionDefinition[]
  data?: Record<string, unknown>
  /** No use a error wrap component. */
  erroneous?: boolean
  componentWrapper?: ComponentType<any>
  dropZone?: ComponentType<DropZoneProps>
  viewMode?: ViewMode
}
