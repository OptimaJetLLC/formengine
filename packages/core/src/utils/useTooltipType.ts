import {useViewerProps} from '../features/form-viewer/components/ViewerPropsContext'
import {useStore} from './contexts/StoreContext'

/**
 * @returns the type of React component used to display the tooltip.
 */
export const useTooltipType = (): string | undefined => {
  const viewerStore = useStore()
  const viewerProps = useViewerProps()
  const rootComponentStore = viewerStore.rootComponentData.store
  return rootComponentStore.props['tooltip']?.value ?? viewerProps.view.tooltips[0]
}
