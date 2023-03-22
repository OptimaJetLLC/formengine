import {ComponentStore} from '../../stores/ComponentStore'
import {namedObserver} from '../../utils'
import {ComponentTreeItem} from './ComponentTreeItem'
import {ComponentTreeProvider} from './ComponentTreeProvider'

interface ComponentTreeProps {
  parentStore?: ComponentStore
  data: ComponentStore[]
}

export const ComponentTree = namedObserver('ComponentTree', ({parentStore, data}: ComponentTreeProps) => {
  return <>
    <ComponentTreeProvider value={ComponentTree}>
      {data.map(cs => <ComponentTreeItem key={cs.key} componentStore={cs} parentStore={parentStore}/>)}
    </ComponentTreeProvider>
  </>
})
