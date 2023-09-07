import {ActionDefinition, ParameterType} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

/**
 * The defineAction helper type.
 */
export type DefineActionHelper = <T>(name: string, func: ActionHandler<T>, params?: ParametersDefinition<T>[], description?: string) => ActionDefinition

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
export type ActionHandler<T> = (e: ActionEventArgs, params: { [k in keyof T]: any }) => void | Promise<void>
