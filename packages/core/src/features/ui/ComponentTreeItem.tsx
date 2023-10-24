import {Fragment} from 'react'
import {namedObserver} from '../../utils'
import {ComponentData, ComponentDataProvider} from '../../utils/contexts/ComponentDataContext'
import {useViewerProps} from '../form-viewer/components/ViewerPropsContext'
import {TooltipWrapper} from '../tooltip/TooltipWrapper'
import {Erroneous} from '../validation'
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
export const ComponentTreeItem = namedObserver('ComponentTreeItem', ({componentData}: ComponentTreeItemProps) => {
  const props = useViewerProps()

  const Wrapper = props.componentWrapper || Fragment
  const Tooltip = componentData.store.tooltipProps ? TooltipWrapper : Fragment

  return (
    <ComponentDataProvider value={componentData}>
      <Wrapper>
        <Tooltip>
          <Erroneous>
            <ComponentViewer/>
          </Erroneous>
        </Tooltip>
      </Wrapper>
    </ComponentDataProvider>
  )
})
