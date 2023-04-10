import {ComponentTreeProps} from '../../types'
import {namedObserver} from '../../utils'
import {ComponentTreeProvider} from './ComponentTreeContext'
import {ComponentTreeItem} from './ComponentTreeItem'

export const ComponentTree = namedObserver('ComponentTree', ({parentStore, data}: ComponentTreeProps) => {
  if (!data) return null

  return <>
    <ComponentTreeProvider value={ComponentTree}>
      {data.map(cs => <ComponentTreeItem key={cs.key} componentStore={cs} parentStore={parentStore}/>)}
    </ComponentTreeProvider>
  </>
})
