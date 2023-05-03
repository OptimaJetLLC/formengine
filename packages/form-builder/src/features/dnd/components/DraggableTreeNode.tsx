import {WrapperProps} from 'fb-core'
import {observer} from 'mobx-react'
import {useEventReactions} from '../../event/utils/useEventReactions'
import {Draggable} from './Editable/components/Draggable'
import {TreeNode} from './Editable/components/TreeNode'
import {useSelection} from './Editable/hooks/useSelection'

export const DraggableTreeNode = observer(({children}: WrapperProps) => {
  const [_, selectionHandlers, selectionClassName] = useSelection()

  useEventReactions()

  return (
    <Draggable {...selectionHandlers} viewForDragPreview={children}>
      <TreeNode className={selectionClassName}/>
    </Draggable>
  )
})
