import {FunctionComponent} from "react";
import ComponentDefinition, {Annotations, Annotations1} from "./constants";
import _ from "lodash";
import {Annotation, key, string} from "./AnnotationBuilder";

//Old. Remove
/*export const define = <T extends object>(view: FunctionComponent<T>, annotations: Annotations<T>)
    : ComponentDefinition<any> => {
    return ({
        type: view.name || view.displayName || "Component",
        view,
        annotations
    })
}*/

export const define = <T extends object>(view: FunctionComponent<T>, annotations1: Annotations1<T>)
    : ComponentDefinition<any> => {

    let annotations = {} as Record<string, Annotation<any>>

    annotations["key"] = key.build("key")

    _.forIn(annotations1, (value, key) => {
        annotations[key] = value?.build(key) ?? string.build(key)
    })

    return ({
        type: view.name || view.displayName || "Component",
        view,
        annotations
    })
}
