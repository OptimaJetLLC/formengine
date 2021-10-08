import {FunctionComponent} from "react";
import ComponentDefinition, {Annotations} from "./constants";
import _ from "lodash";
import {Annotation, key, string} from "./AnnotationBuilder";

export const define = <T extends object>(name: string, view: FunctionComponent<T>, annotations: Annotations<T>)
    : ComponentDefinition<any> => {
    if (_.isEmpty(name)) throw Error("Name cannot be empty!")

    let properties = {} as Record<string, Annotation<any>>

    properties["key"] = key.build("key")

    _.forIn(annotations, (value, key) => {
        properties[key] = value?.build(key) ?? string.build(key)
    })

    return ({
        type: name,
        view,
        annotations: properties
    })
}
