import {observer} from 'mobx-react'
import {ComponentStore} from '../../stores/ComponentStore'
import {ComponentTreeItem} from './ComponentTreeItem'
import {ComponentTreeProvider} from './ComponentTreeProvider'

interface ComponentTreeProps {
  parentStore?: ComponentStore
  data: ComponentStore[]
}

const _ComponentTree = ({parentStore, data}: ComponentTreeProps) => {
  return <>
    <ComponentTreeProvider value={ComponentTree}>
      {data.map(cs => <ComponentTreeItem key={cs.key} componentStore={cs} parentStore={parentStore}/>)}
    </ComponentTreeProvider>
  </>
}

export const ComponentTree = observer(_ComponentTree)
