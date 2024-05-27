import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {namedObserver} from '../../utils'
import {ComponentTreeContextProvider} from './ComponentTreeContext'
import {ComponentTreeItem} from './ComponentTreeItem'

/**
 * The React component that displays an array of ComponentData. **Internal use only.**
 * @param props the React component properties.
 * @param props.data the array of child elements of the tree.
 * @returns the React element.
 */
const _ComponentTree = ({data}: ComponentTreeProps) => {
  return <ComponentTreeContextProvider value={ComponentTree}>
    {data.map(cd => <ComponentTreeItem key={cd.id} componentData={cd}/>)}
  </ComponentTreeContextProvider>
}

export const ComponentTree = namedObserver('ComponentTree', _ComponentTree)
