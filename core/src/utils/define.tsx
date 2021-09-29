import {FunctionComponent} from "react";
import ComponentDefinition, {AllKeysOf} from "./constants";

export const define = <T extends object>(view: FunctionComponent<T>, description: Partial<AllKeysOf<T>>)
    : ComponentDefinition<any> => {
    return ({
        type: view.name || view.displayName || "Component",
        view,
        description
    })
}
