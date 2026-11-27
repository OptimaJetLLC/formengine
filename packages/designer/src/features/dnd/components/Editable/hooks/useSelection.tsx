import {useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {MouseEvent} from 'react'
import {useCallback, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {toolbarHostAttr} from '../components/overlayRoot'
import {disarmOtherDraggables} from '../disarmDraggableAncestors'
import {claimDragOwner, didDragStart} from '../dragOwner'

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
   * Claims drag ownership / disarms ancestors on mousedown; selects when safe.
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

/** Skip click-select after a mousedown gesture (parent must not steal on mouseup/click). */
let suppressClickSelect = false

type PendingSelect = {
  select: () => void
}

let pendingSelect: PendingSelect | null = null

const gestureWindow = {
  /** HTML5 drag skips mouseup; clear flags on dragend so the next click is not swallowed. */
  afterDrag() {
    suppressClickSelect = false
    pendingSelect = null
    gestureWindow.removeListeners()
  },
  flushIfIdle() {
    const pending = pendingSelect
    pendingSelect = null
    gestureWindow.removeListeners()
    if (!pending) return
    // Selecting on mousedown re-renders and races HTML5 dragstart; apply after the gesture if no drag.
    // Keep suppressClickSelect so the following click cannot retarget selection to a parent.
    if (!didDragStart()) pending.select()
  },
  removeListeners() {
    window.removeEventListener('mouseup', gestureWindow.flushIfIdle)
    window.removeEventListener('dragend', gestureWindow.afterDrag)
  },
}

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
      if (suppressClickSelect) {
        suppressClickSelect = false
        gestureWindow.flushIfIdle()
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

  // Disarm + claim ownership on mousedown; defer store selection until click/mouseup/dragstart
  // so React re-render cannot re-arm parent drag sources before HTML5 dragstart.
  const onMouseDown = useCallback(
    (event: MouseEvent) => {
      if (event.button !== 0) return
      const target = event.target
      if (target instanceof Element && target.closest(`[${toolbarHostAttr}]`)) return
      event.stopPropagation()
      if (event.currentTarget instanceof HTMLElement) {
        disarmOtherDraggables(event.currentTarget)
      }
      suppressClickSelect = true
      const multi = event.ctrlKey || event.shiftKey
      const select = () => store.selectNode(data, multi)
      pendingSelect = {select}
      claimDragOwner(data.key, () => {
        // Drag already started — safe to select now.
        pendingSelect = null
        select()
      })
      gestureWindow.removeListeners()
      window.addEventListener('mouseup', gestureWindow.flushIfIdle)
      window.addEventListener('dragend', gestureWindow.afterDrag)
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
