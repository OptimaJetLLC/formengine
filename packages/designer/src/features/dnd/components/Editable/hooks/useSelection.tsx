import {cx} from '@emotion/css'
import {useComponentData} from '@react-form-builder/core'
import {MouseEvent, useCallback, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'

/**
 * Represents the selection state of the component.
 */
export interface SelectionState {
  /**
   * Flag, if true then the component is hovered, false otherwise.
   */
  hovered: boolean
  /**
   * Flag, if true then the component is selected, false otherwise.
   */
  selected: boolean
}

/**
 * Represents mouse event handlers for the selected component.
 */
export interface SelectionHandlers {
  /**
   * The callback function called when a component is clicked.
   * @param e the original mouse event.
   */
  onClick: (e: MouseEvent) => void
  /**
   * The callback function called when the mouse hits the component area.
   * @param e the original mouse event.
   */
  onMouseOver: (e: MouseEvent) => void
  /**
   * The callback function called when the mouse exits the component area.
   */
  onMouseOut: () => void
}

/**
 * The type for the CSS class name.
 */
export type ClassName = string

/**
 * @returns the array [{@link SelectionState}, {@link SelectionHandlers}, {@link ClassName}] with component selection data.
 */
export const useSelection = (): [SelectionState, SelectionHandlers, ClassName] => {
  const store = useBuilderStore()
  const data = useComponentData()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const [hovered, setHovered] = useState(false)
  const selected = store.selected.has(data)

  const onClick = useCallback((event: MouseEvent) => {
    stopEvent(event)
    store.selectNode(data, event.ctrlKey || event.shiftKey)
  }, [data, store])

  const onMouseOver = useCallback((event: MouseEvent) => {
    stopEvent(event)
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
