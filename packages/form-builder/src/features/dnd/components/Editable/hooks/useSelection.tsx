import {cx} from '@emotion/css'
import {useComponentData} from 'fb-core'
import {MouseEvent, useCallback, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'

export interface SelectionState {
  hovered: boolean
  selected: boolean
}

export interface SelectionHandlers {
  onClick: (e: MouseEvent) => void
  onMouseOver: (e: MouseEvent) => void
  onMouseOut: () => void
}

export type ClassName = string

export const useSelection = (): [SelectionState, SelectionHandlers, ClassName] => {
  const store = useBuilderStore()
  const data = useComponentData()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const [hovered, setHovered] = useState(false)
  const selected = store.selected.has(data.store)

  const onClick = useCallback((event: MouseEvent) => {
    event.stopPropagation()
    store.selectNode(data.store, event.ctrlKey || event.shiftKey)
  }, [])

  const onMouseOver = useCallback((event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setHovered(true)
  }, [])

  const onMouseOut = useCallback(() => {
    setHovered(false)
  }, [])

  const className = useMemo(() => (cx({
    hovered: hovered && !selected && !isDragging,
    selected: selected && !isDragging,
  })), [hovered, selected, isDragging])

  return [{hovered, selected}, {onClick, onMouseOver, onMouseOut}, className]
}
