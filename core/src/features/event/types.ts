import {ComponentStore} from "../../stores/ComponentStore";
import {ActionEvent} from "./utils/ActionEvent";

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

export type ArgumentType = "string" | "number" | "boolean"

export type Arg = ArgumentName | [ArgumentName, ArgumentType]

export type Func = (...arg: any[]) => void

export type Modifiers = { name: string, params: any }

export type ArgumentValue = string | number | boolean

/**
 * It will be transformed in arguments before passing in action.
 */
export type WeakArgs = Record<ArgumentName, ArgumentValue>

export type EventTuple = [
    handlers: Record<EventName, Function>,
    actionsMap: Record<EventName, ((e: ActionEvent) => void)[]>,
]

export interface ListenerOptions {
    readonly target?: string
    readonly eventName?: string
}

export type NotifyTarget = Pick<ListenerOptions, "target" | "eventName">

export type ActionHandler<T> = (params: { [k in keyof T]: any }, e: ActionEvent) => void

export type ArgsDefinition<T> = (Key<T> | TypedKey<T>)

type Key<T> = (keyof T & string)

type TypedKey<T> = [Key<T>, ArgumentType]

export type ActionEventHandler = (e: ActionEvent) => void

export type EventListener = ActionEventHandler & {
    target?: string
}