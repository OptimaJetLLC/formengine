import type {RefObject} from 'react'
import {useEffect} from 'react'
import {useDragDropManager} from 'react-dnd'
import type {DragClientOffset} from '../canvasAutoScroll'
import {computeCanvasAutoScrollDelta, getCanvasAutoScrollRect, retainDragClientOffset} from '../canvasAutoScroll'

/**
 * Scrolls the FormBuilder canvas when the pointer approaches or crosses its edges during drag-and-drop.
 * Retains the last pointer position when the cursor leaves the window so edge-scroll can continue.
 * @param props the React component properties.
 * @param props.containerRef the central-panel container hosting the builder canvas.
 * @returns null; this component only runs side effects.
 */
export const CanvasAutoScrollOnDrag = ({containerRef}: {containerRef: RefObject<HTMLElement | null>}) => {
  const monitor = useDragDropManager().getMonitor()

  useEffect(() => {
    let canvas: HTMLElement | null = null
    let offset: DragClientOffset | null = null
    let frameId: number | undefined = undefined
    const stop = () => {
      if (frameId !== undefined) cancelAnimationFrame(frameId)
      frameId = undefined
      canvas = null
      offset = null
    }

    const tick = () => {
      if (!canvas?.isConnected) {
        canvas = containerRef.current?.querySelector<HTMLElement>('[data-fe-canvas]') ?? null
      }
      if (offset && canvas) {
        const {x, y} = computeCanvasAutoScrollDelta(offset.x, offset.y, getCanvasAutoScrollRect(canvas))
        if (x !== 0 || y !== 0) {
          canvas.scrollBy(x, y)
        }
      }
      frameId = requestAnimationFrame(tick)
    }

    const updateOffset = () => {
      if (monitor.isDragging()) offset = retainDragClientOffset(monitor.getClientOffset(), offset)
    }

    const updateDrag = () => {
      if (!monitor.isDragging()) {
        stop()
        return
      }
      updateOffset()
      if (frameId === undefined) frameId = requestAnimationFrame(tick)
    }

    const unsubscribeOffset = monitor.subscribeToOffsetChange(updateOffset)
    const unsubscribeState = monitor.subscribeToStateChange(updateDrag)
    updateDrag()

    return () => {
      unsubscribeOffset()
      unsubscribeState()
      stop()
    }
  }, [containerRef, monitor])

  return null
}
