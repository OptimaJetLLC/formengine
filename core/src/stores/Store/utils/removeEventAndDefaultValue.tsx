import {ComponentStore} from "../../ComponentStore";
import _ from "lodash";
import {Store} from "../Store";

export function removeEventAndDefaultValue(store: Store, componentStore: ComponentStore) {

    const definition = store.view.get(componentStore.type);

    _.forIn(definition.annotations, (value, key) => {
        if (value.isSystem) return

        //TODO delete react element
        if (typeof value === "function" || componentStore.props[key] === value.defaultValue) componentStore.props[key] = undefined
    })

    if (componentStore.children)
        componentStore.children.map(removeEventAndDefaultValue.bind(null, store))
}