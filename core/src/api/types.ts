import {FunctionComponent} from "react";
import {AnnotationBuilder} from "./annotation/AnnotationBuilder";
import {ComponentStore} from "../stores/ComponentStore";
import {Annotation} from "./annotation/Annotation";
import {Action} from "../utils/Types";
import {FormikHandlers} from "formik/dist/types";
import * as React from "react";

type validated = AnnotationBuilder<Function | undefined>

export type Annotations<T extends object> =
    {
        [key in keyof OmitUnimportant<T> ]:
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

/** Interface for property editor */
export interface PropertyEditorProps<T> {
    componentStore: ComponentStore
    annotation: Annotation<T>

    value?: any;
    onChange?: (...args: any[]) => void
    onBlur?: (...args: any[]) => void
}
