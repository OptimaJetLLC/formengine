import {ActionEventArgs} from './utils/ActionEventArgs'

export type EventName = string

export type ParameterName = string
export type ParameterType = 'string' | 'number' | 'boolean'
export type Parameter = ParameterName | [ParameterName, ParameterType]
export type ArgumentValue = string | number | boolean

export type ActionType = 'common' | 'linked' | 'custom'

/**
 * It will be transformed in arguments before passing in action.
 */
export type Arguments = Record<ParameterName, ArgumentValue>

/**
 * Action Storage
 * Used for add a new action, store information about it
 */
export type ActionData = {
  name: string
  type: ActionType
  target?: string
  args?: Arguments
}

export interface BaseActionDefinition {
  name: string
  params?: Parameter[]
  description?: string
}

export interface CustomActionDefinition extends BaseActionDefinition {
  body: string
}

/**
 * Action definition for runtime execution.
 * Used for link and common straight or convert custom to it.
 */
export interface ActionDefinition extends BaseActionDefinition {
  func: Func,
}

export type Func = (...arg: any[]) => void
export type ActionEventHandler = (e: ActionEventArgs) => void

