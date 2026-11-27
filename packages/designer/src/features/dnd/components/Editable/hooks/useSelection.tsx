import {useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {MouseEvent} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {disarmOtherDraggables} from '../disarmDraggableAncestors'

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
   * Selects on mousedown so HTML5 drag sources cannot cancel the click.
   * @param e the original mouse event.
   */
  onMouseDown: (e: MouseEvent) => void
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

/** Skip click-select after a mousedown select in this gesture (parent must not steal on mouseup/click). */
let suppressClickSelect = false

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
      // Nested mousedown already selected; the follow-up click often retargets to a parent wrapper.
      if (suppressClickSelect) {
        suppressClickSelect = false
        return
      }
      if (event.ctrlKey || event.shiftKey) return
      const target = event.target
      if (target instanceof Element && event.currentTarget instanceof Element) {
        const nested = target.closest('[data-testid$="-editable-wrapper"]')
        if (nested && nested !== event.currentTarget) return
      }
      store.selectNode(data, false)
    },
    [data, store]
  )

  // Select on mousedown: parent/self are HTML5 drag sources, so a click is often canceled
  // when the browser starts a drag (especially for nested slot children inside button hosts).
  // Keep only this wrapper draggable for the gesture so nothing else steals the drag.
  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return
      event.stopPropagation()
      if (event.currentTarget instanceof HTMLElement) {
        disarmOtherDraggables(event.currentTarget)
      }
      suppressClickSelect = true
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

  return [{hovered: finalHovered, selected}, {onClick, onMouseDown, onMouseOver, onMouseOut}, className]
}
