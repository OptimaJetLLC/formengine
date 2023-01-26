import {ActionDefinition} from './actionDefinition'
import {ActionEventHandler} from './actionEventHandler'
import {ArgumentType} from './args'
import {ActionEventArgs} from './utils/ActionEventArgs'

//TODO hint field for unparameterized action
export function defineAction(name: string, func: ActionEventHandler): ActionDefinition
export function defineAction<T>(name: string, func: ActionHandler<T>, args: ArgsDefinition<T>[], description?: string): ActionDefinition
export function defineAction<T>(
  name: string,
  func: ActionEventHandler | ActionHandler<T>,
  args?: ArgsDefinition<T>[],
  description?: string
): ActionDefinition {
  return {name, func, args, description}
}

export type DefineActionHelper = typeof defineAction

export type ArgsDefinition<T> = (Key<T> | TypedKey<T>)

type Key<T> = (keyof T & string)

type TypedKey<T> = [Key<T>, ArgumentType]

export type ActionHandler<T> = (params: { [k in keyof T]: any }, e: ActionEventArgs) => void
