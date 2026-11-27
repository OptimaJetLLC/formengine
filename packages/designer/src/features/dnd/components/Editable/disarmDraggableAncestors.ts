/**
 * Temporarily clears `draggable` on every HTML5 drag source except `current`
 * (and its descendants) so nested select/drag is not stolen by another wrapper.
 * Re-applies until mouseup/dragend because react-dnd may reset `draggable` after re-render.
 * @param current the element that should remain the only drag source for this gesture.
 * @returns a restore function that re-enables the disarmed elements.
 */
export function disarmOtherDraggables(current: HTMLElement): () => void {
  let active = true
  const disarmed = new Set<HTMLElement>()
  let raf = 0

  const restore = () => {
    if (!active) return
    active = false
    cancelAnimationFrame(raf)
    for (const el of disarmed) {
      if (el.isConnected) el.setAttribute('draggable', 'true')
    }
    disarmed.clear()
    window.removeEventListener('mouseup', restore)
    window.removeEventListener('dragend', restore)
  }

  const apply = () => {
    if (!active) return
    // Selection re-renders can remount; abandon if the gesture target is gone.
    if (!current.isConnected) {
      restore()
      return
    }
    for (const node of document.querySelectorAll('[draggable="true"]')) {
      if (!(node instanceof HTMLElement)) continue
      if (node === current || current.contains(node)) continue
      node.setAttribute('draggable', 'false')
      disarmed.add(node)
    }
  }

  const pulse = () => {
    apply()
    if (active) raf = requestAnimationFrame(pulse)
  }

  pulse()

  window.addEventListener('mouseup', restore)
  window.addEventListener('dragend', restore)
  return restore
}
