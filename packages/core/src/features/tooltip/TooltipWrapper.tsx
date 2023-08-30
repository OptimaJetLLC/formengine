import {createElement, ReactNode, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {ComponentStore} from '../../stores/ComponentStore'
import {namedObserver} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getKey} from '../../utils/getKey'
import {useTooltipType} from '../../utils/useTooltipType'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'

/**
 * Tooltip React component wrapper properties.
 */
export interface TooltipWrapperProps {
  children: ReactNode
}

function useTooltipComponent() {
  const formViewerProps = useViewerProps()
  const selectedTooltipType = useTooltipType()
  if (!selectedTooltipType) return
  return formViewerProps.view.getTooltipComponent(selectedTooltipType)
}

/**
 * Tooltip React component wrapper.
 */
export const TooltipWrapper = namedObserver('TooltipWrapper', ({children}: TooltipWrapperProps) => {
  const wrappedComponentData = useComponentData()
  const wrappedComponentStore = wrappedComponentData.store
  const viewerStore = useStore()
  const tooltipDefinition = useTooltipComponent()
  const localize = viewerStore.localizeComponent.bind(viewerStore)

  if (!tooltipDefinition) {
    return <>{children}</>
  }

  const tooltipKey = getKey()
  const tooltipComponentStore = new ComponentStore(tooltipKey, tooltipDefinition.type)

  Object.keys(wrappedComponentStore.tooltipProps ?? {}).forEach(k => {
    tooltipComponentStore.props[k] = wrappedComponentStore.tooltipProps![k]
  })

  const tooltipData = viewerStore.createComponentData(tooltipComponentStore)
  tooltipData.parent = wrappedComponentData.parent

  const componentState = useMemo(
    () => new ComponentState(tooltipData, viewerStore, localize, () => ({})),
    [tooltipData, viewerStore, tooltipDefinition])

  return createElement(tooltipDefinition.view, componentState.get, children)
})
