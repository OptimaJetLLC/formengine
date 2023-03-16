import {observer} from 'mobx-react'
import {ReactNode, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentData, useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {getKey} from '../../utils/getKey'

export interface TooltipWrapperProps {
  children: ReactNode
}

export const _TooltipWrapper = ({children}: TooltipWrapperProps) => {
  const wrappedComponentData = useComponentData()
  const wrappedComponentStore = wrappedComponentData.componentStore
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

  const tooltipModel = tooltipDefinition.init(tooltipComponentStore)

  const tooltipData = {
    componentStore: tooltipComponentStore,
    model: tooltipModel,
    parentStore: wrappedComponentData.parentStore,
    field: undefined
  } as ComponentData

  const componentState = useMemo(() => new ComponentState(tooltipData, viewerStore, tooltipDefinition.view),
    [tooltipData, viewerStore, tooltipDefinition])

  const props = componentState.get
  const View = tooltipDefinition.view
  return <View {...props}>{children}</View>
}

export const TooltipWrapper = observer(_TooltipWrapper)

