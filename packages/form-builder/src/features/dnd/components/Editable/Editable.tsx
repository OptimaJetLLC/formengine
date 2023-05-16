import {OverridesProvider, WrapperProps} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useDragLayer} from 'react-dnd'
import {useEventReactions} from '../../../event/utils/useEventReactions'
import {Draggable} from './components/Draggable'
import {Resizers} from './components/Resizers'
import {Toolbar} from './components/Toolbar'
import {useInnerDropZone} from './hooks/useInnerDropZone'
import {useSelection} from './hooks/useSelection'

export const Editable = observer(({children}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const overrides = useInnerDropZone()

  useEventReactions()

  const toolbars = selected && !isDragging && <>
    <Toolbar/>
    <Resizers show={selected}/>
  </>

  return (
    <Draggable {...selectionHandlers} className={selectionClassName} viewForDragPreview={children}>
      <OverridesProvider value={overrides}>
        {children}
        {toolbars}
      </OverridesProvider>
    </Draggable>
  )
})
