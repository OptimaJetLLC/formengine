import {FunctionComponent} from "react";
import {Annotations, ComponentDefinition} from "./types";
import _ from "lodash";
import {Annotation} from "./Annotation";
import {key, string, style, validation} from "./index";
import {Action} from "../../utils/Types";

export const define = <T extends object>(
    name: string,
    view: FunctionComponent<T>,
    annotations: Annotations<T>,
    actions?: Action[]
): ComponentDefinition<any> => {
    if (_.isEmpty(name)) throw Error("Name cannot be empty!")

    const properties: Annotation<any>[] = []

    properties.push(key.build("key"))
    properties.push(style.build("style"))
    properties.push(validation.build("validation"))

    _.forIn(annotations, (value, key) => {
        properties.push(value?.build(key) ?? string.build(key))
    })

    return ({
        name,
        view,
        annotations: properties,
        actions
    })
}
