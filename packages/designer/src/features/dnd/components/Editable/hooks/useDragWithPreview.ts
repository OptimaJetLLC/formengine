import {useComponentData} from '@react-form-builder/core'
import {useEffect} from 'react'
import type {ConnectDragSource} from 'react-dnd'
import {useDrag} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import type {ItemType} from '../../../consts'

interface DragState {
  isDragging: boolean,
}

/**
 * Returns the array with the drag state and wrapper of the dragged preview item.
 * @param type the type of item being dragged.
 * @returns the array with the drag state and wrapper of the dragged preview item.
 */
export const useDragWithPreview = (type: ItemType): [DragState, ConnectDragSource] => {
  const item = useComponentData()
  const [state, drag, preview] = useDrag(() => ({
    type, item,
    collect: (monitor) => ({isDragging: monitor.isDragging()}),
  }), [])

  useEffect(() => {
    preview(getEmptyImage())
  }, [state.isDragging, preview])

  return [state, drag]
}
