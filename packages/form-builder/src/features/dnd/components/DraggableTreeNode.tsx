import {namedObserver, WrapperProps} from '@react-form-builder/core'
import {useEventReactions} from '../../event/utils/useEventReactions'
import {Draggable} from './Editable/components/Draggable'
import {TreeNode} from './Editable/components/TreeNode'
import {useSelection} from './Editable/hooks/useSelection'

export const DraggableTreeNode = namedObserver('DraggableTreeNode', ({children}: WrapperProps) => {
  const [_, selectionHandlers, selectionClassName] = useSelection()

  useEventReactions()

  return (
    <Draggable {...selectionHandlers} viewForDragPreview={children} isTree={true}>
      <TreeNode className={selectionClassName}/>
    </Draggable>
  )
})
