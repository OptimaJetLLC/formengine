/**
 * Edge zone size in CSS pixels where canvas auto-scroll begins during drag.
 */
const canvasEdgeScrollThreshold = 40

/**
 * Maximum canvas scroll speed in CSS pixels per animation frame.
 */
const canvasEdgeScrollMaxSpeed = 24

/**
 * Axis scroll deltas for one auto-scroll tick.
 */
export type CanvasAutoScrollDelta = {
  /**
   * Horizontal scroll delta in CSS pixels (positive scrolls right).
   */
  x: number
  /**
   * Vertical scroll delta in CSS pixels (positive scrolls down).
   */
  y: number
}

/**
 * Bounding box used to measure pointer proximity to canvas edges.
 */
export type CanvasAutoScrollRect = {
  /**
   * Left edge in viewport coordinates.
   */
  left: number
  /**
   * Top edge in viewport coordinates.
   */
  top: number
  /**
   * Right edge in viewport coordinates.
   */
  right: number
  /**
   * Bottom edge in viewport coordinates.
   */
  bottom: number
}

/**
 * Pointer coordinates used for canvas auto-scroll.
 */
export type DragClientOffset = {
  /**
   * X coordinate in the viewport.
   */
  x: number
  /**
   * Y coordinate in the viewport.
   */
  y: number
}

/**
 * Keeps the last known pointer offset when the drag monitor reports null (cursor left the window).
 * @param clientOffset the current drag-layer offset, or null when unavailable.
 * @param previous the last non-null offset retained for this drag.
 * @returns the offset to use for the next auto-scroll tick.
 */
export const retainDragClientOffset = (
  clientOffset: DragClientOffset | null | undefined,
  previous: DragClientOffset | null
): DragClientOffset | null => clientOffset ?? previous

const axisDelta = (distanceFromStart: number, distanceFromEnd: number, threshold: number, maxSpeed: number): number => {
  if (threshold <= 0) return 0
  if (distanceFromStart < 0) return -maxSpeed
  if (distanceFromEnd < 0) return maxSpeed
  if (distanceFromStart < threshold) return -maxSpeed * (1 - distanceFromStart / threshold)
  if (distanceFromEnd < threshold) return maxSpeed * (1 - distanceFromEnd / threshold)
  return 0
}

/**
 * Computes canvas scroll deltas from pointer proximity to the canvas edges.
 * Pointers past an edge scroll at max speed in that direction so drag can continue off-canvas.
 * @param clientX the pointer X coordinate in the viewport.
 * @param clientY the pointer Y coordinate in the viewport.
 * @param rect the canvas client box in viewport coordinates.
 * @param threshold the edge zone size in CSS pixels.
 * @param maxSpeed the maximum scroll speed in CSS pixels per tick.
 * @returns the scroll deltas for one tick.
 */
export const computeCanvasAutoScrollDelta = (
  clientX: number,
  clientY: number,
  rect: CanvasAutoScrollRect,
  threshold = canvasEdgeScrollThreshold,
  maxSpeed = canvasEdgeScrollMaxSpeed
): CanvasAutoScrollDelta => {
  return {
    x: axisDelta(clientX - rect.left, rect.right - clientX, threshold, maxSpeed),
    y: axisDelta(clientY - rect.top, rect.bottom - clientY, threshold, maxSpeed),
  }
}

/**
 * Builds the scrollable client box for a canvas element.
 * @param canvas the form canvas element.
 * @returns the client box in viewport coordinates.
 */
export const getCanvasAutoScrollRect = (canvas: HTMLElement): CanvasAutoScrollRect => {
  const box = canvas.getBoundingClientRect()
  const left = box.left + canvas.clientLeft
  const top = box.top + canvas.clientTop
  return {
    left,
    top,
    right: left + canvas.clientWidth,
    bottom: top + canvas.clientHeight,
  }
}
