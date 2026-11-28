import {useComponentData} from '@react-form-builder/core'
import type {RefCallback} from 'react'
import {useEffect} from 'react'
import {useDrag} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import type {ItemType} from '../../../consts'
import {canDragOwned} from '../dragOwner'
import {useConnectAsRef} from './useConnectAsRef'

interface DragState {
  isDragging: boolean
}

/**
 * Returns the array with the drag state and a ref callback for the dragged item.
 * @param type the type of item being dragged.
 * @returns the array with the drag state and a ref callback for the dragged item.
 */
export const useDragWithPreview = (type: ItemType): [DragState, RefCallback<HTMLElement>] => {
  const item = useComponentData()
  const [state, drag, preview] = useDrag(
    () => ({
      type,
      item,
      canDrag: () => canDragOwned(item.key),
      collect: monitor => ({isDragging: monitor.isDragging()}),
    }),
    [item.key]
  )

  useEffect(() => {
    preview(getEmptyImage())
  }, [state.isDragging, preview])

  const setDragRef = useConnectAsRef<HTMLElement>(drag)

  return [state, setDragRef]
}
