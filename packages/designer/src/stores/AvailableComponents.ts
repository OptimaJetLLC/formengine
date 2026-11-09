import type {BuilderComponent, IDisposable, Model, Store} from '@react-form-builder/core'
import {ComponentData, ComponentStore, getKey} from '@react-form-builder/core'
import {runInAction} from 'mobx'
import {EmptyComponentCategory} from './EmptyComponentCategory'
import type {IComponentMetadataProvider} from './IComponentMetadataProvider'

/**
 * Creates the new component data for the added component without a Field.
 * @param store the viewer store.
 * @param componentStore the component store.
 * @returns the created component data.
 */
const createComponentData = (store: Store, componentStore: ComponentStore): ComponentData => {
  const model = store.getModel(componentStore.type)
  const factory = (cs: ComponentStore) => createComponentData(store, cs)
  return new ComponentData(componentStore, model, factory)
}

/**
 * Creates the component store for a component being added, applying its initial JSON.
 * @param model the component model.
 * @param componentMetadataProvider the component metadata provider.
 * @returns the component store.
 */
export const createAddedComponentStore = (model: Model, componentMetadataProvider: IComponentMetadataProvider): ComponentStore => {
  const componentStore = new ComponentStore(`${model.type} ${getKey()}`, model.type)
  const componentMetadata = componentMetadataProvider.getComponentMetadata(model.type)

  if (componentMetadata.initialJson) {
    try {
      const parsed = JSON.parse(componentMetadata.initialJson)
      Object.assign(componentStore, parsed)
    } catch (e) {
      console.warn(`Failed to parse initialJson '${componentMetadata.initialJson}'`, e)
    }
  }

  return componentStore
}

/**
 * Creates component data for components palette.
 * @param model the component model.
 * @param componentMetadataProvider the component metadata provider.
 * @param store the viewer store.
 * @returns component data.
 * @ignore
 */
export const createAddedComponentData = (
  model: Model,
  componentMetadataProvider: IComponentMetadataProvider,
  store: Store
): ComponentData => createComponentData(store, createAddedComponentStore(model, componentMetadataProvider))

/**
 * Creates component data for component palette.
 */
export class AvailableComponents implements IDisposable {
  readonly byCategory: Record<string, ComponentData[]> = {}

  /**
   * Creates component data for component palette.
   * @param store the viewer store.
   * @param componentMetadataProvider the component metadata provider.
   * @param builderComponents the builder components.
   */
  constructor(store: Store, componentMetadataProvider: IComponentMetadataProvider, builderComponents: BuilderComponent[]) {
    runInAction(() => {
      builderComponents.forEach(component => {
        const category = component.category ?? EmptyComponentCategory
        const components = this.byCategory[category] ?? []
        const componentData = createAddedComponentData(component.model, componentMetadataProvider, store)
        components.push(componentData)
        this.byCategory[category] = components.sort((a, b) => a.model.name.localeCompare(b.model.name))
      })
    })
  }

  /**
   * @inheritDoc
   */
  dispose(): void {
    runInAction(() => {
      for (const category in this.byCategory) {
        const components = this.byCategory[category]
        components.forEach(component => {
          component.dispose()
        })
        delete this.byCategory[category]
      }
    })
  }
}
