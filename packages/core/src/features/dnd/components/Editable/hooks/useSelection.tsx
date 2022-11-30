import {cx} from '@emotion/css'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/contexts/BuilderStoreContext'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
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
  const store = useBuilderStore()
  const {componentStore} = useComponentData()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const [hovered, setHovered] = useState(false)
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(store.selected?.key === componentStore.key)
  }, [store.selected])

  const onMouseDown = useCallback((event: React.MouseEvent) => {
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
    [hoveredClass]: hovered && !selected && !isDragging,
    [selectedClass]: selected && !isDragging,
  })), [hovered, selected, isDragging])

  return [{hovered, selected}, {onMouseDown, onMouseOver, onMouseLeave}, className]
}
