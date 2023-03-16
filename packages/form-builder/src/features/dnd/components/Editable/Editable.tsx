import {cx} from '@emotion/css'
import {observer} from 'mobx-react'
import {useDragLayer} from 'react-dnd'
import {useEventReactions} from '../../../event/utils/useEventReactions'
import {Draggable} from './components/Draggable'
import {Resizers} from './components/Resizers'
import {Toolbar} from './components/Toolbar'
//import {useInnerDropZone} from './hooks/useInnerDropZone'
import {useSelection} from './hooks/useSelection'

//TODO По двойному клику выделять компонент, в который вложен компонент?
export const Editable = observer(({children}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()

  //useInnerDropZone(viewProps)
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  useEventReactions()

  return (
    <Draggable {...selectionHandlers} className={cx(selectionClassName)} viewForDragPreview={children}>
      {children}
      {selected && !isDragging &&
        <>
          <Toolbar/>
          <Resizers show={selected}/>
        </>
      }
    </Draggable>
  )
})

