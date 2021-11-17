import {ComponentStore} from "../../ComponentStore";
import {mapper} from "../../../views";
import _ from "lodash";

export function removeEventAndDefaultValue(store: ComponentStore) {
    const definition = mapper[store.type];

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        //TODO delete react element
        if (typeof value === "function" || store.props[key] === value.defaultValue) store.props[key] = undefined
    })

    if (store.children)
        store.children.map(removeEventAndDefaultValue)
}