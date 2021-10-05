import {FunctionComponent, ReactNode} from "react";
import {Paths} from "./UtilityTypes";
import {Annotation, AnnotationBuilder} from "./AnnotationBuilder";

export type AllKeysOf<T extends object> = {
    [keys in Paths<T> | 'key']: PropDescription | null;
};

export type Annotations<T extends object> = Partial<AllKeysOf<T>>


export type PropDescription = {
    title?: string
    type?: string
    section?: string
    input?: ReactNode
    defaultValue: any
    description?: string
}


export type Annotations1<T extends object> =
    {
        //[key in keyof OmitUnimportant<T>]: undefined | Annotation<T[key]> | AnnotationBuilder<T[key]>;
        [key in keyof OmitUnimportant<T>]: undefined | AnnotationBuilder<T[key]>;
    }


type OmitUnimportant<T extends object> = Omit<T, "style" | "className" | "classPrefix">

/*export type Property<T> = {
    title?: string
    type?: string
    section?: string
    input?: ReactNode
    defaultValue: T
    data?: T[] | Record<string, T>
    description?: string
}*/


export default interface ComponentDefinition<T extends object> {
    type: string
    view: FunctionComponent<T>;
    annotations: Record<string, Annotation<T>>;
    groupBy?: string;
    // todo event types
    // todo styles
}
