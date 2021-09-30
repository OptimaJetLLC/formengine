import {FunctionComponent} from "react";
import ComponentDefinition, {AllKeysOf, Annotations} from "./constants";

export const define = <T extends object>(view: FunctionComponent<T>, annotations: Annotations<T>)
    : ComponentDefinition<any> => {
    return ({
        type: view.name || view.displayName || "Component",
        view,
        annotations
    })
}
