import {useContext} from 'react'
import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {namedObserver} from '../../utils'
import {ComponentDataProvider} from '../../utils/contexts/ComponentDataContext'
import {ComponentTreeContext, ComponentTreeContextProvider} from './ComponentTreeContext'
import {ComponentViewer} from './ComponentViewer'

/**
 * The React component that displays an array of ComponentData. **Internal use only.**
 * @param props the React component properties.
 * @param props.data the array of child elements of the tree.
 * @returns the React element.
 */
const RawComponentTree = ({data}: ComponentTreeProps) => {
  const context = useContext(ComponentTreeContext)

  const children = data.map(cd => <ComponentDataProvider key={cd.id} value={cd}>
    <ComponentViewer/>
  </ComponentDataProvider>)

  return context
    ? <>{children}</>
    : <ComponentTreeContextProvider value={ComponentTree}>{children}</ComponentTreeContextProvider>
}

export const ComponentTree = namedObserver('ComponentTree', RawComponentTree)
