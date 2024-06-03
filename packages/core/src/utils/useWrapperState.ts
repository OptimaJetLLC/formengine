import {useMemo} from 'react'
import {Model} from '../features/define'
import {ComponentState} from '../stores/ComponentState'
import {ComponentStore} from '../stores/ComponentStore'
import {Store} from '../stores/Store'
import {useStore} from './contexts/StoreContext'

/**
 * Represents a function that localizes components based on the supplied component store.
 */
export type ComponentLocalizer = (componentStore: ComponentStore) => Record<string, any>

/**
 * Generates the component state for the wrapper component. For example, a tooltip or error message.
 * @param componentKey the key of wrapper component.
 * @param componentModel the component metadata.
 * @param wrapperProps the wrapper component props.
 * @param localizer the function used to localize the component.
 * @returns the component state for the wrapper component
 */
export const useWrapperState = (componentKey: string, componentModel: Model, wrapperProps: any, localizer: ComponentLocalizer) => {
  const viewerStore = useStore()
  return useMemo(() => getWrapperState(viewerStore, componentKey, componentModel, wrapperProps, localizer),
    [viewerStore, componentKey, componentModel, wrapperProps, localizer])
}

const getWrapperState = (viewerStore: Store, componentKey: string, componentModel: Model,
                         wrapperProps: any, localizer: ComponentLocalizer) => {
  const componentStore = new ComponentStore(componentKey, componentModel.type)
  componentStore.props = wrapperProps
  const componentData = viewerStore.createComponentData(componentStore, false, componentModel)
  return new ComponentState(componentData, viewerStore, localizer, () => ({}))
}
