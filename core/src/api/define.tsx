import {FunctionComponent} from "react";
import {Annotations, ComponentDefinition} from "./types";
import _ from "lodash";
import {Annotation} from "./annotation/Annotation";
import {key, string, style} from "./annotation";
import {Action} from "../utils/Types";

export const define = <T extends object>(name: string, view: FunctionComponent<T>, annotations: Annotations<T>, actions?: Action[])
    : ComponentDefinition<any> => {
    if (_.isEmpty(name)) throw Error("Name cannot be empty!")

    let properties = {} as Record<string, Annotation<any>>

    properties["key"] = key.build("key");
    properties["style"] = style.build("style");

    _.forIn(annotations, (value, key) => {
        properties[key] = value?.build(key) ?? string.build(key)
    })

    return ({
        name, view,
        annotations: properties,
        actions
    })
}
