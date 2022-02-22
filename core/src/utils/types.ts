import {ComponentStore} from "../stores/ComponentStore";
import {ComponentType} from "react";
import {ComponentData} from "./ComponenDataContext";

export type EventName = string
export type ArgumentName = string
export type Target = string

export type WeakActionDefinition = {
    targetKey: string | null
    actionName: string | null
    overArgs: OverArgs
    modifiers?: Modifiers
}

export type Func = (...arg: any[]) => void

export type FullActionDefinition = {
    target: ComponentStore | null
    action: Action | null
    overArgs: OverArgs
    modifiers?: Modifiers
}

export type Modifiers = { name: string, params: any }

export type Action = {
    name: string,
    func: Func,
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

export interface WrapperProps {
    View: ComponentType<any>
    viewProps: Record<string, any>
}

export type Wrapper = ComponentType<WrapperProps>
export type ComponentMove = Omit<ComponentData, 'definition'>