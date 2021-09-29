import {FunctionComponent} from "react";
import {Paths} from "./UtilityTypes";
import {ComponentStore} from "../stores/ComponentStore";

export enum Control {
    Input,
    Button,
    Header,
    TextArea,
    Dropdown,
    Container
}

//TODO instead one enum use interface (or type) with type of control with enum?
//If
interface Component {
    control: Control
    //layout: Layout
    //collection:
}

/**
 * Control enum in string view
 */
export type ControlString = keyof typeof Control

/**
 * Type for correlation between name of control and their model
 */
export type TypeToClass = {
    [key in keyof typeof Control]: new (key: string) => ComponentStore
};


export type PropDescription = {
    title: string
    type?: string
    defaultValue: any
    description?: string
}

export type AllKeysOf<T extends object> = {
    [keys in Paths<T> | 'key']: PropDescription | null;
};

export type accumulator<U> = Record<string, U>

export default interface ComponentDefinition<T extends object> {
    type: string
    view: FunctionComponent<T>;
    description: Partial<AllKeysOf<T>>;
    // todo event types
    // todo styles
}
