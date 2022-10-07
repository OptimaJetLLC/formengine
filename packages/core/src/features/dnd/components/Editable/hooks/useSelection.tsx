import {cx} from '@emotion/css'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useDragDropManager} from 'react-dnd'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {useStore} from '../../../../../utils/contexts/StoreContext'
import {hoveredClass, selectedClass} from '../../../styles'

export interface SelectionState {
  hovered: boolean
  selected: boolean
}

export interface SelectionHandlers {
  onMouseDown: (e: React.MouseEvent) => void
  onMouseOver: (e: React.MouseEvent) => void
  onMouseLeave: () => void
}

export type ClassName = string

export const useSelection = (): [SelectionState, SelectionHandlers, ClassName] => {
  const store = useStore()
  const {componentStore} = useComponentData()
  const dndMonitor = useDragDropManager().getMonitor()
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(store.selected?.key === componentStore.key)
  }, [store.selected])

  const onMouseDown = useCallback((event) => {
    event.stopPropagation()
    store.selected = store.findNode(componentStore.key)
  }, [])

  const onMouseOver = useCallback((event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setHovered(true)
  }, [])

  const onMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  const className = useMemo(() => (cx({
    [hoveredClass]: hovered && !selected && !dndMonitor.isDragging(),
    [selectedClass]: selected && !dndMonitor.isDragging(),
  })), [hovered, selected])

  return [{hovered, selected}, {onMouseDown, onMouseOver, onMouseLeave}, className]
}
