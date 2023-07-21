import {ActionDefinition, ActionEventHandler, ParameterType} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

//TODO hint field for unparameterized action
/**
 * Creates action function metadata.
 * @param name the function name.
 * @param func the action function.
 * @returns the action function metadata.
 */
export function defineAction(name: string, func: ActionEventHandler): ActionDefinition
export function defineAction<T>(name: string, func: ActionHandler<T>, params: ParametersDefinition<T>[], description?: string): ActionDefinition

/**
 * Creates action function metadata.
 * @param name the function name.
 * @param func the action function.
 * @param params the description of function parameters.
 * @param description the a human-readable description of the action function.
 * @returns the action function metadata.
 */
export function defineAction<T>(
  name: string,
  func: ActionEventHandler | ActionHandler<T>,
  params?: ParametersDefinition<T>[],
  description?: string
): ActionDefinition {
  return {name, func, params, description}
}

/**
 * The {@link defineAction} type.
 */
export type DefineActionHelper = typeof defineAction

// todo rename ParametersDefinition => ParameterDefinition
/**
 * The type to describe the action parameter.
 */
export type ParametersDefinition<T> = PropertyKey<T> | TypedKey<T>

/**
 * Component property key type.
 */
export type PropertyKey<T> = keyof T & string

type TypedKey<T> = [PropertyKey<T>, ParameterType]

/**
 * Action function type.
 */
export type ActionHandler<T> = (params: { [k in keyof T]: any }, e: ActionEventArgs) => void
