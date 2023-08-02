import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {namedObserver} from '../../utils'
import {ComponentTreeProvider} from './ComponentTreeContext'
import {ComponentTreeItem} from './ComponentTreeItem'

export const ComponentTree = namedObserver('ComponentTree', ({data}: ComponentTreeProps) => {
  return <>
    <ComponentTreeProvider value={ComponentTree}>
      {data.map((cd, index) => <ComponentTreeItem key={index} componentData={cd}/>)}
    </ComponentTreeProvider>
  </>
})
