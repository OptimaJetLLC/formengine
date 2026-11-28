/**
 * Temporarily clears `draggable` on every HTML5 drag source except `current`
 * (and its descendants) so nested select/drag is not stolen by another wrapper.
 * MutationObserver re-applies until dragstart/mouseup/dragend — never a rAF pulse
 * (that fought react-dnd reconnects after drop and hung the page).
 * @param current the element that should remain the only drag source for this gesture.
 * @returns a restore function that re-enables the disarmed elements.
 */
export function disarmOtherDraggables(current: HTMLElement): () => void {
  let active = true
  let applying = false
  const disarmed = new Set<HTMLElement>()
  const testId = current.getAttribute('data-testid')
  const refs: {observer?: MutationObserver} = {}

  const liveCurrent = (): HTMLElement | null => {
    if (current.isConnected) return current
    if (!testId) return null
    const next = document.querySelector(`[data-testid="${CSS.escape(testId)}"]`)
    return next instanceof HTMLElement ? next : null
  }

  const stopObserver = () => {
    refs.observer?.disconnect()
    refs.observer = undefined
  }

  const restore = () => {
    if (!active) return
    active = false
    stopObserver()
    for (const el of disarmed) {
      if (el.isConnected) el.setAttribute('draggable', 'true')
    }
    disarmed.clear()
    window.removeEventListener('mouseup', restore)
    window.removeEventListener('dragend', restore)
    window.removeEventListener('dragstart', stopObserver, true)
  }

  const apply = () => {
    if (!active || applying) return
    applying = true
    try {
      const live = liveCurrent()
      if (!live) {
        restore()
        return
      }
      if (live.getAttribute('draggable') !== 'true') {
        live.setAttribute('draggable', 'true')
      }
      for (const node of document.querySelectorAll('[draggable="true"]')) {
        if (!(node instanceof HTMLElement)) continue
        if (node === live || live.contains(node)) continue
        if (node.getAttribute('draggable') !== 'false') {
          node.setAttribute('draggable', 'false')
        }
        disarmed.add(node)
      }
    } finally {
      applying = false
    }
  }

  refs.observer = new MutationObserver(() => {
    if (!applying) apply()
  })
  refs.observer.observe(document.body, {subtree: true, attributes: true, attributeFilter: ['draggable']})

  apply()
  // Once HTML5 drag owns the gesture, stop observing so drop re-renders cannot thrash.
  window.addEventListener('dragstart', stopObserver, {capture: true, once: true})
  window.addEventListener('mouseup', restore)
  window.addEventListener('dragend', restore)
  return restore
}
