import styled from '@emotion/styled'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {Draggable} from './Editable/components/Draggable'
import {TreeNode} from './Editable/components/TreeNode'
import {useSelection} from './Editable/hooks/useSelection'

export const DraggableTreeNode = namedObserver('DraggableTreeNode', () => {
  const [_, selectionHandlers, selectionClassName] = useSelection()
  const {key} = useComponentData()
  return (
    <Draggable {...selectionHandlers} viewForDragPreview={<DragPreview>{key}</DragPreview>} isTree={true}>
      <TreeNode className={selectionClassName}/>
    </Draggable>
  )
})

const DragPreview = styled.div`
  width: 200px;
  height: 40px;
  padding: 8px;
  border-radius: 6px;
`
