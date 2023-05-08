import {useComponentData} from 'fb-core'
import {merge} from 'lodash/fp'
import {RefObject, useMemo, useRef} from 'react'
import {useDrop} from 'react-dnd'
import {ComponentMove} from '../../../../../utils/types'
import {AcceptDrop, ItemType} from '../../../consts'
import {useDragWithPreview} from './useDragWithPreview'

interface DndState {
  isDragging: boolean,
  isActive: boolean,
  isOver: boolean,
  canDrop: boolean,
}

export const useDnd = (): [DndState, RefObject<any>] => {
  const dnd = useRef(null)
  const data = useComponentData()

  const [dropProps, drop] = useDrop({
    accept: AcceptDrop,
    canDrop: (item: ComponentMove, monitor) => data.store.key !== item.store.key,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isActive: monitor.isOver() && monitor.canDrop(),
    }),
  }, [])

  const [dragState, drag] = useDragWithPreview(ItemType.Component)
  const state: DndState = useMemo(() => (merge(dropProps, dragState)), [dropProps, dragState])

  drop(drag(dnd))

  return [state, dnd]
}
