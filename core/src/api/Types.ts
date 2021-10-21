import {FunctionComponent} from "react";
import {AnnotationBuilder} from "./annotation/AnnotationBuilder";
import {ComponentStore} from "../stores/ComponentStore";
import {Annotation} from "./annotation/Annotation";

export type Annotations<T extends object> =
    {
        [key in keyof OmitUnimportant<T>]:
            T[key] extends (Function | undefined) ?
                AnnotationBuilder<Function | undefined> :
                AnnotationBuilder<T[key]> | undefined
    };

/** Remove some useless property for annotation defining which we define automatics */
type OmitUnimportant<T extends object> = Omit<T, "style" | "className" | "classPrefix">

export interface ComponentDefinition<T extends object> {
    name: string
    view: FunctionComponent<T>;
    annotations: Record<string, Annotation<T>>;
    actions?: Action[];
    groupBy?: string;
}

export type Action = { name: string, func: (...args: any[]) => any, args?: string[], description?: string }

/** Interface for property editor */
export interface PropertyEditorProps<T> {
    model: ComponentStore
    annotation: Annotation<T>
}
