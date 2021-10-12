import {FunctionComponent} from "react";
import {AnnotationBuilder} from "./annotation/AnnotationBuilder";
import {ComponentStore} from "../stores/ComponentStore";
import {Annotation} from "./annotation/Annotation";

export type Annotations<T extends object> =
    {
        [key in keyof OmitUnimportant<T>]: undefined | AnnotationBuilder<T[key]>;
    };

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, "style" | "className" | "classPrefix">

export interface ComponentDefinition<T extends object> {
    type: string
    view: FunctionComponent<T>;
    annotations: Record<string, Annotation<T>>;
    groupBy?: string;
}

/** Interface for property editor */
export interface PropertyEditorProps<T> {
    model: ComponentStore
    annotation: Annotation<T>
}
