import {KeySymbol} from '../../consts'
import {ActionEventArgs} from './utils/ActionEventArgs'

/**
 * The type for the event name.
 */
export type EventName = string

/**
 * The type for the parameter name.
 */
export type ParameterName = string

/**
 * Parameter type.
 */
export type ParameterType = 'string' | 'number' | 'boolean'

/**
 * Function parameter.
 */
export type Parameter = ParameterName | [ParameterName, ParameterType]

/**
 * The type of the argument value of the function.
 */
export type ArgumentValue = string | number | boolean

/**
 * Action type.
 */
export type ActionType = 'common' | 'custom'

/**
 * It will be transformed in arguments before passing in action.
 */
export type Arguments = Record<ParameterName, ArgumentValue>

/**
 * Action Storage.
 * Used for add a new action, store information about it.
 */
export type ActionData = {
  [KeySymbol]?: string
  name: string
  type: ActionType
  args?: Arguments
}

/**
 * Description of the basic action handler.
 */
export interface BaseActionDefinition {
  name: string
  params?: Parameter[]
  description?: string
}

/**
 * Description of the custom action handler.
 */
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

/**
 * The type of arbitrary function that returns void or Promise<void>.
 */
export type Func = (...arg: any[]) => void | Promise<void>

/**
 * Event handler function type.
 */
export type ActionEventHandler = (e: ActionEventArgs) => void | Promise<void>
