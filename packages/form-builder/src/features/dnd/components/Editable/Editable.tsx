import {cx} from '@emotion/css'
import {OverridesProvider, WrapperProps} from 'fb-core'
import {observer} from 'mobx-react'
import {useDragLayer} from 'react-dnd'
import {useIsTree} from '../../../../utils/IsTreeContext'
import {useEventReactions} from '../../../event/utils/useEventReactions'
import {Draggable} from './components/Draggable'
import {Resizers} from './components/Resizers'
import {Toolbar} from './components/Toolbar'
import {TreeNode} from './components/TreeNode'
import {useInnerDropZone} from './hooks/useInnerDropZone'
import {useSelection} from './hooks/useSelection'

export const Editable = observer(({children}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  const isTreeStruct = useIsTree()
  const overrides = useInnerDropZone()

  useEventReactions()

  return (
    <Draggable {...selectionHandlers} className={cx(selectionClassName)} viewForDragPreview={children}>
      {
        isTreeStruct
          ? <TreeNode/>
          : (
            <OverridesProvider value={overrides}>
              {children}
              {selected && !isDragging &&
                <>
                  <Toolbar/>
                  <Resizers show={selected}/>
                </>
              }
            </OverridesProvider>
          )
      }
    </Draggable>
  )
})
