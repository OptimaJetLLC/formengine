import {FunctionComponent} from "react";
import {Annotations, ComponentDefinition} from "./types";
import _ from "lodash";
import {Annotation} from "./Annotation";
import {key, string, style, validation} from "./index";
import {Action} from "../../utils/Types";

export const define = <T extends object>(
    name: string, view: FunctionComponent<T>,
    annotations: Annotations<T>, actions?: Action[],
    isContainer?: boolean
): ComponentDefinition<any> => {
    if (_.isEmpty(name)) throw Error("Name cannot be empty!")

    let properties = {} as Record<string, Annotation<any>>

    properties["key"] = key.build("key")
    properties["style"] = style.build("style");
    properties["validation"] = validation.build("validation")

    _.forIn(annotations, (value, key) => {
        properties[key] = value?.build(key) ?? string.build(key)
    })

    let result = ({
        name, view,
        annotations: properties,
        actions, isContainer
    })
    return result
}
