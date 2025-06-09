import {useCallback, useEffect} from 'react'
import type {BuilderStore} from '../../stores/BuilderStore'

/**
 * Stop the event from propagating and prevent its default action.
 * @param event the Keyboard event.
 */
const stopEvent = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

/**
 * Handle the "Delete" key action.
 * @param event the Keyboard event.
 * @param builderStore the form builder settings store.
 */
const handleDeleteKey = (event: KeyboardEvent, builderStore: BuilderStore) => {
  if (document.activeElement === document.body) {
    builderStore.deleteSelectedComponents()
    stopEvent(event)
  }
}

/**
 * The global hotkeys handler hook.
 * @param builderStore the form builder settings store.
 */
export const useHotkeys = (builderStore: BuilderStore) => {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Delete') {
      handleDeleteKey(event, builderStore)
    }
  }, [builderStore])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
