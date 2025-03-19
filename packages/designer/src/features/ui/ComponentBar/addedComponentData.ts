import type { Model} from '@react-form-builder/core'
import {ComponentData, ComponentStore, getKey} from '@react-form-builder/core'
import type {Store} from '@react-form-builder/core'
import type {BuilderStore} from '../../../stores/BuilderStore'

/**
 * Creates the new component data for the added component without a Field.
 * @param store the viewer store.
 * @param componentStore the component store.
 * @returns the created component data.
 */
const createComponentData = (store: Store, componentStore: ComponentStore): ComponentData => {
    const model = store.getModel(componentStore.type)
    const factory = (cs: ComponentStore) => createComponentData(store, cs)
    return new ComponentData(componentStore, model, undefined, factory)
}

/**
 * Creates component data for components palette.
 * @param model the component model.
 * @param builderStore builder store.
 * @returns component data.
 */
export const createAddedComponentData = (model: Model, builderStore: BuilderStore): ComponentData => {
    const componentStore = new ComponentStore(`${model.type} ${getKey()}`, model.type)
    const componentMetadata = builderStore.getComponentMetadata(model.type)

    if (componentMetadata.initialJson) {
        try {
            const parsed = JSON.parse(componentMetadata.initialJson)
            Object.assign(componentStore, parsed)
        } catch (e) {
            console.warn(`Failed to parse initialJson '${componentMetadata.initialJson}'`, e)
        }
    }

    return createComponentData(builderStore.viewer, componentStore)
}
