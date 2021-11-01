import {ComponentStore} from "../stores/ComponentStore";
export type EventName = string
export type ArgumentName = string
export type Target = string

export type WeakActionDefinition = {
    targetKey: string | null
    actionName: string
    overArgs: OverArgs
    modifiers?: Modifiers
}

export type FullActionDefinition = {
    target: ComponentStore | null
    action: Action
    overArgs: OverArgs
    modifiers?: Modifiers
}

export type Modifiers = { name: string, params: any }

export type Action = {
    name: string,
    func: (...args: any[]) => any,
    args?: string[],
    description?: string
}

export type TransformativeArg = { type: TransformativeType, key: string, prop: string }

/**
* It will be transformed in arguments before passing in action.
*/
export type OverArgs = Record<ArgumentName, string | number | boolean | TransformativeArg>

export enum TransformativeType {
    Foreign = "Foreign"
}
