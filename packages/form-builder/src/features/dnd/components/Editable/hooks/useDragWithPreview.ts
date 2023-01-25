import {useComponentData} from 'fb-core'
import {useEffect} from 'react'
import {ConnectDragSource, useDrag} from 'react-dnd'
import {getEmptyImage} from 'react-dnd-html5-backend'
import {ItemType} from '../../../consts'

interface DragState {
  isDragging: boolean,
}

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
