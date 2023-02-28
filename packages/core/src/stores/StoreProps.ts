import {ComponentType, ReactElement} from 'react'
import {View} from '../features/define'
import {ActionDefinition} from '../features/event'
import {ComponentStore} from './ComponentStore'

export interface StoreProps {
  getForm?: () => ComponentStore
  view: View
  actions?: ActionDefinition[]
  data?: Record<string, unknown>
  /** No use a error wrap component. */
  erroneous?: boolean
  componentWrapper?: ComponentType<any>
  dropZone?: ReactElement
}
