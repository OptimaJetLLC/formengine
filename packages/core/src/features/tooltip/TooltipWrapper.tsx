import {createElement, ReactNode, useCallback} from 'react'
import {namedObserver} from '../../utils'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useTooltipType} from '../../utils/useTooltipType'
import {useWrapperState} from '../../utils/useWrapperState'
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
  const localize = useCallback(viewerStore.localizeComponent.bind(viewerStore, 'tooltip'), [viewerStore])
  const componentState = useWrapperState(wrappedComponentData.key, tooltipDefinition, wrappedComponentStore.tooltipProps, localize)
  return createElement(tooltipDefinition.component, componentState.get, children)
})
