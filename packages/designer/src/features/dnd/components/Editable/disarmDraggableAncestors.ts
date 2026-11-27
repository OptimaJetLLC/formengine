/**
 * Temporarily clears `draggable` on HTML5 drag-source ancestors so a nested
 * gesture (click or child drag) is not captured by the parent.
 * @param from the element whose ancestors should be disarmed.
 * @returns a restore function that re-enables the ancestors.
 */
export function disarmDraggableAncestors(from: HTMLElement): () => void {
  const roots: HTMLElement[] = []
  let el: HTMLElement | null = from.parentElement
  while (el) {
    if (el.getAttribute('draggable') === 'true') roots.push(el)
    el = el.parentElement
  }

  for (const root of roots) root.setAttribute('draggable', 'false')

  const restore = () => {
    for (const root of roots) root.setAttribute('draggable', 'true')
    window.removeEventListener('mouseup', restore)
    window.removeEventListener('dragend', restore)
  }
  window.addEventListener('mouseup', restore)
  window.addEventListener('dragend', restore)
  return restore
}
