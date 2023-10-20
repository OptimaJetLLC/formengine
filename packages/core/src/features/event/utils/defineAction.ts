import {ActionDefinition, ParameterType} from '../types'
import {ActionEventArgs} from './ActionEventArgs'

/**
 * The defineAction helper type.
 */
export type DefineActionHelper = <T>(name: string, func: ActionHandler<T>, params?: ParameterDefinition<T>[], description?: string) => ActionDefinition

/**
 * The type to describe the action parameter.
 */
export type ParameterDefinition<T> = [PropertyKey<T>, ParameterType]

/**
 * Component property key type.
 */
export type PropertyKey<T> = keyof T & string

/**
 * Action function type.
 */
export type ActionHandler<T> = (e: ActionEventArgs, params: { [k in keyof T]: any }) => void | Promise<void>
