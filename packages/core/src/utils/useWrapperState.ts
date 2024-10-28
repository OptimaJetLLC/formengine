import {useMemo} from 'react'
import type {Model} from '../features/define'
import type {FormViewerProps} from '../features/form-viewer'
import {useViewerProps} from '../features/form-viewer/components/ViewerPropsContext'
import {ComponentState} from '../stores/ComponentState'
import type {ComponentStoreLocalizer} from '../stores/ComponentStoreLocalizer'
import {ComponentStore} from '../stores/ComponentStore'
import type {Store} from '../stores/Store'
import type {ComponentData} from './contexts/ComponentDataContext'
import {useStore} from './contexts/StoreContext'

/**
 * Generates the component state for the wrapper component. For example, a tooltip or error message.
 * @param wrappedComponentData the wrapped component.
 * @param componentModel the component metadata.
 * @param wrapperProps the wrapper component props.
 * @param localizer the function used to localize the component.
 * @returns the component state for the wrapper component
 */
export const useWrapperState = (wrappedComponentData: ComponentData, componentModel: Model,
                                wrapperProps: any, localizer: ComponentStoreLocalizer) => {
  const viewerStore = useStore()
  const viewerProps = useViewerProps()
  return useMemo(() => getWrapperState(viewerStore, wrappedComponentData, componentModel, wrapperProps, localizer, viewerProps),
    [viewerStore, wrappedComponentData, componentModel, wrapperProps, localizer, viewerProps])
}

const getWrapperState = (viewerStore: Store, wrappedComponentData: ComponentData, componentModel: Model,
                         wrapperProps: any, localizer: ComponentStoreLocalizer, viewerProps: FormViewerProps) => {
  const componentStore = new ComponentStore(wrappedComponentData.key, componentModel.type)
  componentStore.props = wrapperProps
  const componentData = viewerStore.createComponentData(componentStore, false, componentModel)
  componentData.dataRootProvider = wrappedComponentData.dataRootProvider
  return new ComponentState(componentData, viewerStore, localizer, () => ({}), viewerProps)
}
