import {observer} from 'mobx-react'
import {ComponentType, createElement, useMemo} from 'react'
import {ComponentState} from '../../stores/ComponentState'
import {useComponentData} from '../../utils/contexts/ComponentDataContext'
import {useStore} from '../../utils/contexts/StoreContext'
import {useActions} from '../event'
import {ComponentTreeItemProps} from './ComponentTreeItemProps'

export interface ComponentViewerProps {
  componentTreeItem: ComponentType<ComponentTreeItemProps>
}

const _ComponentViewer = ({componentTreeItem}: ComponentViewerProps) => {
  const store = useStore(), data = useComponentData()
  const componentState = useMemo(() => new ComponentState(data, store, componentTreeItem), [data, store])

  useActions()

  return createElement(data.model.view, componentState.get)
}

export const ComponentViewer = observer(_ComponentViewer)
