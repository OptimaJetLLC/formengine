import {useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {MouseEvent, PointerEvent} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'

/**
 * Represents the selection state of the component.
 */
interface SelectionState {
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
interface SelectionHandlers {
  /**
   * The callback function called when a component is clicked.
   * @param e the original mouse event.
   */
  onClick: (e: MouseEvent) => void
  /**
   * Selects on pointerdown so HTML5 drag sources cannot cancel the click.
   * @param e the original pointer event.
   */
  onPointerDown: (e: PointerEvent) => void
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
type ClassName = string

/**
 * @returns the array [{@link SelectionState}, {@link SelectionHandlers}, {@link ClassName}] with component selection data.
 */
export const useSelection = (): [SelectionState, SelectionHandlers, ClassName] => {
  const store = useBuilderStore()
  const data = useComponentData()

  const {isDragging} = useDragLayer(monitor => ({
    isDragging: monitor.isDragging(),
  }))

  const selected = store.selected.has(data)
  const [hovered, setHovered] = useState(false)

  const onClick = useCallback(
    (event: MouseEvent) => {
      stopEvent(event)
      store.selectNode(data, event.ctrlKey || event.shiftKey)
    },
    [data, store]
  )

  // Select on pointerdown: parent/self are HTML5 drag sources, so a click is often canceled
  // when the browser starts a drag (especially for nested slot children inside button hosts).
  const onPointerDown = useCallback(
    (event: PointerEvent) => {
      if (event.button !== 0) return
      event.stopPropagation()
      store.selectNode(data, event.ctrlKey || event.shiftKey)
    },
    [data, store]
  )

  const onMouseOver = useCallback((event: MouseEvent) => {
    stopEvent(event)
    setHovered(true)
  }, [])

  const onMouseOut = useCallback(() => {
    setHovered(false)
  }, [])

  const finalHovered = hovered && !isDragging

  const className = useMemo(
    () =>
      cx({
        hovered: finalHovered && !selected,
        selected: selected && !isDragging,
      }),
    [finalHovered, selected, isDragging]
  )

  return [{hovered: finalHovered, selected}, {onClick, onPointerDown, onMouseOver, onMouseOut}, className]
}
