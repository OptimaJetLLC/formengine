import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {namedObserver} from '../../utils'
import {ComponentTreeContextProvider} from './ComponentTreeContext'
import {ComponentTreeItem} from './ComponentTreeItem'

/**
 * The React component that displays an array of ComponentData.
 */
export const ComponentTree = namedObserver('ComponentTree', ({data}: ComponentTreeProps) => {
  return <ComponentTreeContextProvider value={ComponentTree}>
    {data.map(cd => <ComponentTreeItem key={cd.id} componentData={cd}/>)}
  </ComponentTreeContextProvider>
})
