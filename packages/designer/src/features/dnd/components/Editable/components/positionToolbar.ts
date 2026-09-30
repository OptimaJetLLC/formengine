import {toolbarHubAttr, toolbarStripAttr} from './overlayRoot'

const canvasOffsetTop = -13
const compactOffsetTop = 8
const inlineEndOffset = 5
const canvasAttr = 'data-fe-canvas'

type Clip = {
  left: number
  top: number
  right: number
  bottom: number
}

const clipsOverflow = (value: string) => value === 'auto' || value === 'scroll' || value === 'hidden' || value === 'clip'

/**
 * Nearest ancestor that clips overflow, if any.
 * @param element the element whose ancestors are inspected.
 * @returns the nearest overflow ancestor, or undefined.
 */
export const nearestOverflowAncestor = (element: HTMLElement): HTMLElement | undefined => {
  let parent = element.parentElement
  while (parent) {
    const {overflowX, overflowY} = getComputedStyle(parent)
    if (clipsOverflow(overflowX) || clipsOverflow(overflowY)) return parent
    parent = parent.parentElement
  }
  return undefined
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const viewportClip = (): Clip => ({
  left: 0,
  top: 0,
  right: document.documentElement.clientWidth || window.innerWidth,
  bottom: document.documentElement.clientHeight || window.innerHeight,
})

const elementClip = (element: HTMLElement): Clip => {
  const box = element.getBoundingClientRect()
  const left = box.left + element.clientLeft
  const top = box.top + element.clientTop
  return {left, top, right: left + element.clientWidth, bottom: top + element.clientHeight}
}

const hasArea = (clip: Clip): boolean => clip.right > clip.left && clip.bottom > clip.top

/**
 * Designer canvas that contains the element.
 * A zero-size canvas (jsdom, or not yet laid out) is ignored.
 * @param element the element whose ancestors are inspected.
 * @returns the canvas element, or undefined.
 */
export const canvasOf = (element: HTMLElement): HTMLElement | undefined => {
  const canvas = element.closest<HTMLElement>(`[${canvasAttr}]`) ?? undefined
  if (!canvas || !hasArea(elementClip(canvas))) return undefined
  return canvas
}

const canvasClip = (reference: HTMLElement): Clip => {
  const viewport = viewportClip()
  const canvas = canvasOf(reference)
  if (!canvas) return viewport
  const clip = elementClip(canvas)
  const intersection = {
    left: Math.max(clip.left, viewport.left),
    top: Math.max(clip.top, viewport.top),
    right: Math.min(clip.right, viewport.right),
    bottom: Math.min(clip.bottom, viewport.bottom),
  }
  return hasArea(intersection) ? intersection : viewport
}

/**
 * Keeps the toolbar box inside the clip. LTR grows left from the pin; RTL grows right.
 * @param pin the inline-end pin in viewport coordinates.
 * @param width the toolbar width.
 * @param isRTL true if the layout is right-to-left.
 * @param clipLeft the left clip edge.
 * @param clipRight the right clip edge.
 * @returns the pin that keeps the toolbar inside the clip.
 */
const containPin = (pin: number, width: number, isRTL: boolean, clipLeft: number, clipRight: number): number => {
  if (width <= 0 || clipRight <= clipLeft) return pin
  if (isRTL) {
    const maxLeft = clipRight - width
    if (maxLeft < clipLeft) return clipLeft
    return clamp(pin, clipLeft, maxLeft)
  }
  const minPin = clipLeft + width
  if (minPin > clipRight) return clipRight
  return clamp(pin, minPin, clipRight)
}

const pinEnd = (rect: DOMRect, isRTL: boolean, clipLeft: number, clipRight: number): number => {
  const rawEnd = isRTL ? Math.max(rect.left, clipLeft) + inlineEndOffset : Math.min(rect.right, clipRight) - inlineEndOffset
  return clamp(rawEnd, clipLeft + inlineEndOffset, Math.max(clipLeft + inlineEndOffset, clipRight - inlineEndOffset))
}

/**
 * Visible length of the selection's top border from the toolbar pin to the other end, clipped to the canvas.
 * A selection that has scrolled fully off the canvas to the left or right uses the canvas width: the toolbar
 * then sits on the canvas border instead of on the selection.
 * @param reference the element the toolbar is positioned against.
 * @param isRTL true if the layout is right-to-left.
 * @returns the span in CSS pixels.
 */
export const availableToolbarSpan = (reference: HTMLElement, isRTL: boolean): number => {
  const rect = reference.getBoundingClientRect()
  const clip = canvasClip(reference)
  if (rect.right <= clip.left || rect.left >= clip.right) return Math.max(0, clip.right - clip.left)
  const pin = pinEnd(rect, isRTL, clip.left, clip.right)
  const start = Math.max(rect.left, clip.left)
  const end = Math.min(rect.right, clip.right)
  return Math.max(0, isRTL ? end - pin : pin - start)
}

/**
 * Width of the toolbar with every action visible and the hamburger excluded.
 * Clears max-width for the read so a previously applied clip cannot report a false fit.
 * @param node the toolbar element.
 * @returns the expanded width in CSS pixels.
 */
export const measureExpandedToolbarWidth = (node: HTMLElement): number => {
  const strip = node.querySelector<HTMLElement>(`[${toolbarStripAttr}]`)
  const hub = node.querySelector<HTMLElement>(`[${toolbarHubAttr}]`)
  const previousMaxWidth = node.style.maxWidth
  const previousStripDisplay = strip?.style.display
  const previousHubDisplay = hub?.style.display
  node.style.maxWidth = 'none'
  if (strip) strip.style.display = 'flex'
  if (hub) hub.style.display = 'none'
  const width = node.scrollWidth
  node.style.maxWidth = previousMaxWidth
  if (strip) strip.style.display = previousStripDisplay ?? ''
  if (hub) hub.style.display = previousHubDisplay ?? ''
  return width
}

/**
 * Positions a fixed toolbar against the reference element.
 * Compact toolbars clamp to the nearest overflow scroller's client box.
 * Canvas toolbars clamp to the canvas, so a selection scrolled out of the canvas keeps the toolbar on the canvas border.
 * Pins the inline end. LTR grows the strip left; RTL grows it right.
 * @param node the toolbar element.
 * @param reference the element the toolbar is positioned against.
 * @param compact true if the toolbar is compact.
 * @param isRTL true if the layout is right-to-left.
 */
export const positionToolbar = (node: HTMLElement, reference: HTMLElement, compact: boolean, isRTL: boolean): void => {
  const rect = reference.getBoundingClientRect()
  const viewWidth = document.documentElement.clientWidth || window.innerWidth
  const viewHeight = document.documentElement.clientHeight || window.innerHeight
  let clipLeft = 0
  let clipTop = 0
  let clipRight = viewWidth
  let clipBottom = viewHeight

  if (compact) {
    const scroller = nearestOverflowAncestor(reference)
    if (scroller) {
      const box = scroller.getBoundingClientRect()
      clipLeft = box.left + scroller.clientLeft
      clipTop = box.top + scroller.clientTop
      clipRight = clipLeft + scroller.clientWidth
      clipBottom = clipTop + scroller.clientHeight
    }
  } else {
    const clip = canvasClip(reference)
    clipLeft = clip.left
    clipTop = clip.top
    clipRight = clip.right
    clipBottom = clip.bottom
  }

  node.style.position = 'fixed'
  node.style.maxWidth = `${Math.max(0, clipRight - clipLeft)}px`

  const height = node.offsetHeight || 24
  node.style.top = `${clamp(rect.top + (compact ? compactOffsetTop : canvasOffsetTop), clipTop, Math.max(clipTop, clipBottom - height))}px`

  let pin = pinEnd(rect, isRTL, clipLeft, clipRight)
  if (!compact) {
    if (!isRTL && rect.left >= clipRight) pin = clipRight
    if (isRTL && rect.right <= clipLeft) pin = clipLeft
    pin = containPin(pin, node.offsetWidth, isRTL, clipLeft, clipRight)
  }
  if (isRTL) {
    node.style.left = `${pin}px`
    node.style.right = 'auto'
    return
  }
  node.style.left = 'auto'
  node.style.right = `${viewWidth - pin}px`
}
