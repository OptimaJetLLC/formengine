import {FunctionComponent} from "react";
import {Paths} from "./UtilityTypes";

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
    groupBy?: string;
    // todo event types
    // todo styles
}
