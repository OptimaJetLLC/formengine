import {namedObserver} from '@react-form-builder/core'
import {Draggable} from './Editable/components/Draggable'
import {TreeNode} from './Editable/components/TreeNode'
import {useSelection} from './Editable/hooks/useSelection'

const _DraggableTreeNode = () => {
  const [_, selectionHandlers, selectionClassName] = useSelection()
  return (
    <Draggable {...selectionHandlers} isTree={true} style={{width: '100%'}}>
      <TreeNode className={selectionClassName}/>
    </Draggable>
  )
}

export const DraggableTreeNode = namedObserver('DraggableTreeNode', _DraggableTreeNode)
