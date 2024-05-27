import {namedObserver} from '../../utils'
import {ComponentData, ComponentDataProvider} from '../../utils/contexts/ComponentDataContext'
import {ComponentViewer} from './ComponentViewer'

/**
 * Properties of the React component {@link ComponentTreeItem}.
 */
export interface ComponentTreeItemProps {
  /**
   * The data required to display the component.
   */
  componentData: ComponentData
}

/**
 * The React form viewer component that displays an item from the component tree.
 * @returns the React element.
 */
export const ComponentTreeItem = namedObserver('ComponentTreeItem', ({componentData}: ComponentTreeItemProps) => (
  <ComponentDataProvider value={componentData}>
    <ComponentViewer/>
  </ComponentDataProvider>
))
