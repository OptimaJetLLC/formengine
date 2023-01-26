import {observer} from 'mobx-react'
import {ComponentType, createElement, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {useEventBus} from '../../utils/contexts/EventBusContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useActions} from '../event/useActions'
import {ComponentNodeProps} from './ComponentNodeProps'

export interface ComponentViewerProps {
  component: ComponentType<ComponentNodeProps>
}

const _ComponentViewer = ({component}: ComponentViewerProps) => {
  const store = useStore(), data = useComponentData()
  const eventBus = useEventBus()
  const componentState = useMemo(() => new ComponentState(data, store, eventBus, component),
    [data, store, eventBus])

  useActions()

  return createElement(data.model.view, componentState.get)
}

export const ComponentViewer = observer(_ComponentViewer)
