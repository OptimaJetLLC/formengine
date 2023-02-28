import {ActionDefinition, ActionEventHandler, ParameterType} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

//TODO hint field for unparameterized action
export function defineAction(name: string, func: ActionEventHandler): ActionDefinition
export function defineAction<T>(name: string, func: ActionHandler<T>, params: ParametersDefinition<T>[], description?: string): ActionDefinition
export function defineAction<T>(
  name: string,
  func: ActionEventHandler | ActionHandler<T>,
  params?: ParametersDefinition<T>[],
  description?: string
): ActionDefinition {
  return {name, func, params, description}
}

export type DefineActionHelper = typeof defineAction

export type ParametersDefinition<T> = (Key<T> | TypedKey<T>)

type Key<T> = (keyof T & string)

type TypedKey<T> = [Key<T>, ParameterType]

export type ActionHandler<T> = (params: { [k in keyof T]: any }, e: ActionEventArgs) => void
