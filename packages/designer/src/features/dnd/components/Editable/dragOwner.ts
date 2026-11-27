/**
 * Nested HTML5 drag sources (e.g. MtCheckbox inside MtButton) compete for dragstart.
 * The pressed editable claims ownership so ancestors' canDrag returns false and DOM
 * disarm can leave only this key's wrapper draggable.
 */

let ownerKey: string | null = null
let dragStarted = false
let onDragStarted: (() => void) | null = null

const onDragStartCapture = () => {
  dragStarted = true
  onDragStarted?.()
  onDragStarted = null
}

const release = () => {
  ownerKey = null
  dragStarted = false
  onDragStarted = null
  window.removeEventListener('mouseup', release)
  window.removeEventListener('dragend', release)
  window.removeEventListener('dragstart', onDragStartCapture, true)
}

/**
 * Claims exclusive drag ownership for the given editable key until mouseup/dragend.
 * @param key the component key that should own the gesture.
 * @param whenDragStarts optional callback once HTML5 dragstart fires (e.g. apply deferred selection).
 */
export function claimDragOwner(key: string, whenDragStarts?: () => void): void {
  ownerKey = key
  dragStarted = false
  onDragStarted = whenDragStarts ?? null
  window.removeEventListener('mouseup', release)
  window.removeEventListener('dragend', release)
  window.removeEventListener('dragstart', onDragStartCapture, true)
  window.addEventListener('mouseup', release)
  window.addEventListener('dragend', release)
  window.addEventListener('dragstart', onDragStartCapture, true)
}

/**
 * @param key the component key that wants to drag.
 * @returns true when no owner is set or this key owns the gesture.
 */
export function canDragOwned(key: string): boolean {
  return ownerKey === null || ownerKey === key
}

/**
 * @returns true if an HTML5 dragstart fired during the current ownership gesture.
 */
export function didDragStart(): boolean {
  return dragStarted
}
