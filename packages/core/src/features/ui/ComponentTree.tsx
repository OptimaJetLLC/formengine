import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {namedObserver} from '../../utils'
import {ComponentDataProvider} from '../../utils/contexts/ComponentDataContext'
import {ComponentViewer} from './ComponentViewer'

/**
 * The React component that displays an array of ComponentData. **Internal use only.**
 * @param props the React component properties.
 * @param props.data the array of child elements of the tree.
 * @returns the React element.
 */
const RawComponentTree = ({data}: ComponentTreeProps) => {
  const children = data.map(cd => <ComponentDataProvider key={cd.id} value={cd}>
    <ComponentViewer/>
  </ComponentDataProvider>)

  return <>{children}</>
}

export const ComponentTree = namedObserver('ComponentTree', RawComponentTree)
