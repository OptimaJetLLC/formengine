import {ComponentType} from 'react'
import * as yup from 'yup'
import {ComponentStore} from '../../stores/ComponentStore'
import {ActionDefinition, ActionEventHandler, DefineActionHelper, EventName} from '../event'

//TODO типизация для пропсов
export type ActionsInitializer = (props: ComponentStore['props'], def: DefineActionHelper) => Record<EventName, ActionEventHandler | ActionDefinition>

export type PropertyAnnotations<T> = {
  [key in keyof T]: PropertyAnnotation<T[key] | Ancestor<T[key]>>
}

export interface ComponentDefinition<T extends object> {
  readonly typeName: string
  readonly view: ComponentType<T>
  readonly props: PropertyAnnotations<T>
}

export type Ancestor<T> = T extends infer R ? R : never;

export interface PropertyAnnotation<T> {
  readonly key: string
  readonly schema?: yup.AnySchema
  readonly valued: boolean
  readonly defaultValue: T
}

