import {ComponentStore} from '../../stores/ComponentStore'
import {defineAction} from './defineAction'
import {ActionEventArgs} from './utils/ActionEventArgs'

export type EventName = string
export type ArgumentName = string

export type WeakActionData = {
  targetKey?: string
  actionName: string
  weakArgs?: WeakArgs
  modifiers?: Modifiers
}

export type NewActionData = Pick<ActionData, 'action' | 'target'>
export type ActionData = {
  target?: ComponentStore
  action: ActionDefinition
  weakArgs?: WeakArgs
  modifiers?: Modifiers
}

export type ActionDefinition = {
  name: string,
  func: Func,
  args?: Arg[]
  description?: string
}

export type ArgumentType = 'string' | 'number' | 'boolean'

export type Arg = ArgumentName | [ArgumentName, ArgumentType]

export type Func = (...arg: any[]) => void

export type Modifiers = { name: string, params: any }

export type ArgumentValue = string | number | boolean

/**
 * It will be transformed in arguments before passing in action.
 */
export type WeakArgs = Record<ArgumentName, ArgumentValue>

export interface EventFilter {
  readonly target?: string
  readonly type?: string
}

export type ActionHandler<T> = (params: { [k in keyof T]: any }, e: ActionEventArgs) => void

export type ArgsDefinition<T> = (Key<T> | TypedKey<T>)

type Key<T> = (keyof T & string)

type TypedKey<T> = [Key<T>, ArgumentType]

export type ActionEventHandler = (e: ActionEventArgs) => void

export type EventListener = ActionEventHandler & {
  target?: string
}

export type DefineActionHelper = typeof defineAction
