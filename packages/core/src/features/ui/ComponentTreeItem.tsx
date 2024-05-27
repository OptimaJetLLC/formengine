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
 * @param props the React component properties.
 * @param props.componentData the data required to display the component.
 * @returns the React element.
 */
const _ComponentTreeItem = ({componentData}: ComponentTreeItemProps) => (
  <ComponentDataProvider value={componentData}>
    <ComponentViewer/>
  </ComponentDataProvider>
)

export const ComponentTreeItem = namedObserver('ComponentTreeItem', _ComponentTreeItem)
