import {namedObserver} from '@react-form-builder/core'
import styles from './DraggableTreeNode.module.css'
import {Draggable} from './Editable/components/Draggable'
import {TreeNode} from './Editable/components/TreeNode'
import {useSelection} from './Editable/hooks/useSelection'

const RawDraggableTreeNode = () => {
  const [_, selectionHandlers, selectionClassName] = useSelection()
  return (
    <Draggable {...selectionHandlers} isTree={true} className={styles.draggableTreeNode}>
      {/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
      <TreeNode className={selectionClassName} componentDataViewer={DraggableTreeNode}/>
    </Draggable>
  )
}

export const DraggableTreeNode = namedObserver('DraggableTreeNode', RawDraggableTreeNode)
