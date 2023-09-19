import {createElement, ReactNode, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {ComponentStore} from '../../stores/ComponentStore'
import {namedObserver} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useTooltipType} from '../../utils/useTooltipType'
import {Model} from '../define'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'

/**
 * Tooltip React component wrapper properties.
 */
export interface TooltipWrapperProps {
  children: ReactNode
}

/**
 * Tooltip React component properties.
 */
interface ComponentTooltipProps {
  tooltipDefinition: Model
  children: ReactNode
}

function useTooltipComponent() {
  const formViewerProps = useViewerProps()
  const selectedTooltipType = useTooltipType()
  if (!selectedTooltipType) return
  return formViewerProps.view.get(selectedTooltipType)
}

/**
 * Tooltip React component wrapper.
 */
export const TooltipWrapper = namedObserver('TooltipWrapper', ({children}: TooltipWrapperProps) => {
  const tooltipDefinition = useTooltipComponent()
  if (!tooltipDefinition) return <>{children}</>
  return <ComponentTooltip tooltipDefinition={tooltipDefinition}>{children}</ComponentTooltip>
})

const ComponentTooltip = namedObserver('ComponentTooltip', ({tooltipDefinition, children}: ComponentTooltipProps) => {
  const viewerStore = useStore()
  const wrappedComponentData = useComponentData()
  const wrappedComponentStore = wrappedComponentData.store
  const localize = viewerStore.localizeComponent.bind(viewerStore, 'tooltip')
  const tooltipKey = wrappedComponentData.key

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
