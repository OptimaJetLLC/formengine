import {ComponentStore} from "../stores/ComponentStore";
export type EventName = string
export type ArgumentName = string
export type Target = string

export type WeakEvent = {
    targetKey: string | null
    actionName: string
    args: Args
    modifiers?: Modifiers
}

export type FullEvent = {
    target: ComponentStore | null
    action: Action
    args: Args
    modifiers?: Modifiers
}

export type Modifiers = { name: string, params: any }

export type Action = {
    name: string,
    func: (...args: any[]) => any,
    args?: string[],
    description?: string
}

export type ArgDef = { type: ArgType, key: string, prop: string }
export type Args = Record<ArgumentName, string | number | boolean | ArgDef>

export enum ArgType {
    Foreign = "Foreign"
}
