import {FunctionComponent, ReactNode} from "react";
import {Paths} from "./UtilityTypes";

export type PropDescription = {
    title: string
    type?: string
    section?: string
    input?: ReactNode
    defaultValue: any
    description?: string
}

export type AllKeysOf<T extends object> = {
    [keys in Paths<T> | 'key']: PropDescription | null;
};

export type accumulator<U> = Record<string, U>

export type Annotations<T extends object> = Partial<AllKeysOf<T>>

export default interface ComponentDefinition<T extends object> {
    type: string
    view: FunctionComponent<T>;
    annotations: Annotations<T>;
    groupBy?: string;
    // todo event types
    // todo styles
}
