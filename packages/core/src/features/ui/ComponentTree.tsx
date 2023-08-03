import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {namedObserver} from '../../utils'
import {ComponentTreeItem} from './ComponentTreeItem'

/**
 * The React component that displays an array of {@link ComponentData}.
 */
export const ComponentTree = namedObserver('ComponentTree', ({data}: ComponentTreeProps) => {
  return <>
    {data.map((cd, index) => <ComponentTreeItem key={index} componentData={cd}/>)}
  </>
})
