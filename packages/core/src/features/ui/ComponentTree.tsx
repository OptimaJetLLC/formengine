import {observer} from 'mobx-react'
import {ComponentType} from 'react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentTreeItemProps} from './ComponentTreeItemProps'

interface ComponentTreeProps {
  parentStore?: ComponentStore
  data: ComponentStore[]
  treeItem: ComponentType<ComponentTreeItemProps>
}

const _ComponentTree = ({parentStore, data, treeItem}: ComponentTreeProps) => {
  const TreeItem = treeItem
  return <>
    {data.map(cs => <TreeItem key={cs.key} componentStore={cs} parentStore={parentStore}/>)}
  </>
}

export const ComponentTree = observer(_ComponentTree)
