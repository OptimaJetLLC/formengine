import {ReactNode, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {ComponentStore} from '../../stores/ComponentStore'
import {namedObserver} from '../../utils'
import {ComponentData, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getKey} from '../../utils/getKey'

/**
 * Tooltip React component wrapper properties.
 */
export interface TooltipWrapperProps {
  children: ReactNode
}

/**
 * Tooltip React component wrapper.
 */
export const TooltipWrapper = namedObserver('TooltipWrapper', ({children}: TooltipWrapperProps) => {
  const wrappedComponentData = useComponentData()
  const wrappedComponentStore = wrappedComponentData.store
  const viewerStore = useStore()
  const tooltipDefinition = viewerStore.tooltipComponent

  if (!tooltipDefinition) {
    return <>{children}</>
  }

  const tooltipKey = getKey()
  const tooltipComponentStore = new ComponentStore(tooltipKey, tooltipDefinition.type)

  Object.keys(wrappedComponentStore.tooltipProps ?? {}).forEach(k => {
    tooltipComponentStore.props[k] = wrappedComponentStore.tooltipProps![k]
  })

  const tooltipData = {
    store: tooltipComponentStore,
    model: tooltipDefinition,
    parent: wrappedComponentData.parent,
    field: undefined
  } as ComponentData

  const componentState = useMemo(() => new ComponentState(tooltipData, viewerStore, tooltipDefinition.view),
    [tooltipData, viewerStore, tooltipDefinition])

  const props = componentState.get
  const View = tooltipDefinition.view
  return <View {...props}>{children}</View>
})
