import type {RefObject} from 'react'
import {useLayoutEffect} from 'react'
import {availableToolbarSpan, canvasOf, measureExpandedToolbarWidth, nearestOverflowAncestor, positionToolbar} from './positionToolbar'

const readyAttr = 'data-fe-toolbar-ready'

/**
 * Keeps a fixed toolbar aligned to its anchor via resize and scroll listeners.
 * Canvas toolbars stay hidden until the expanded row is measured: the buttons stay open when they fit on the
 * visible selection border, otherwise the hamburger is shown. Compact toolbars skip that choice.
 * A canvas toolbar that scrolls out of the canvas stays on the canvas border.
 * Marks the toolbar ready after the chosen layout is positioned.
 * @param ref toolbar element ref.
 * @param anchor element the toolbar is positioned against.
 * @param compact true if the toolbar is compact.
 * @param isRTL true if the layout is right-to-left.
 * @param expanded true if the canvas toolbar is showing the open button row.
 * @param onExpandedChange called when the open row must be shown or replaced by the hamburger.
 */
export const useToolbarPosition = (
  ref: RefObject<HTMLElement | null>,
  anchor: HTMLElement | null | undefined,
  compact: boolean | undefined,
  isRTL: boolean,
  expanded: boolean,
  onExpandedChange: (expanded: boolean) => void
): void => {
  useLayoutEffect(() => {
    const node = ref.current
    if (!node) {
      return
    }

    const setReady = (ready: boolean) => {
      if (ready) {
        node.setAttribute(readyAttr, '')
        node.setAttribute('aria-hidden', 'false')
        return
      }
      node.removeAttribute(readyAttr)
      node.setAttribute('aria-hidden', 'true')
    }

    if (!anchor?.isConnected) {
      setReady(false)
      return
    }

    const update = () => {
      if (!anchor.isConnected) {
        setReady(false)
        return
      }
      if (!compact) {
        const width = measureExpandedToolbarWidth(node)
        const fits = width > 0 && width <= availableToolbarSpan(anchor, isRTL)
        if (fits !== expanded) {
          setReady(false)
          onExpandedChange(fits)
          return
        }
      }
      positionToolbar(node, anchor, Boolean(compact), isRTL)
      setReady(true)
    }

    update()

    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update)
    observer?.observe(anchor)
    observer?.observe(node)
    const scroller = compact ? nearestOverflowAncestor(anchor) : canvasOf(anchor)
    if (scroller) observer?.observe(scroller)
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [anchor, compact, expanded, isRTL, onExpandedChange, ref])
}
