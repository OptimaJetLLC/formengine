import {useCallback, useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useSaveForm} from '../ui/Header/components/useSaveForm'
import {useHotkeysProp} from './HotkeysPropContext'
import {alwaysActiveHotkeyActions, resolveHotkeyBindings} from './resolveHotkeyBindings'
import type {DesignerHotkey, DesignerHotkeyAction} from './types'

/**
 * Stop the event from propagating and prevent its default action.
 * @param event the Keyboard event.
 */
const stopEvent = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

type HotkeyHandler = () => void

const matchesHotkey = (hotkey: DesignerHotkey, event: KeyboardEvent) => {
  return !(
    hotkey.key.toLowerCase() !== event.key.toLowerCase() ||
    !!hotkey.alt !== event.altKey ||
    !!hotkey.shift !== event.shiftKey ||
    !!hotkey.ctrl !== event.ctrlKey ||
    !!hotkey.meta !== event.metaKey
  )
}

const findHotkeyAction = (event: KeyboardEvent, bindings: Array<[DesignerHotkey, DesignerHotkeyAction]>) => {
  if (!event.key) return
  const item = bindings.find(([hotkey]) => matchesHotkey(hotkey, event))
  return item?.[1]
}

const useHotkeyHandlers = (): Record<DesignerHotkeyAction, HotkeyHandler> => {
  const builderStore = useBuilderStore()
  const onSave = useSaveForm()

  return useMemo(
    () => ({
      deleteSelected: () => {
        builderStore.deleteSelected()
      },
      cloneSelected: () => {
        builderStore.cloneSelected()
      },
      save: () => {
        onSave()
      },
      print: () => {
        builderStore.print()
      },
      undo: () => {
        builderStore.undo()
      },
      redo: () => {
        builderStore.redo()
      },
    }),
    [builderStore, onSave]
  )
}

/**
 * @returns the global hotkeys handler.
 * When `hotkeys: false`, FormBuilder does not attach this listener.
 */
export const useHotkeys = () => {
  const handlers = useHotkeyHandlers()
  const hotkeys = useHotkeysProp()
  const bindings = useMemo(() => resolveHotkeyBindings(hotkeys), [hotkeys])

  return useCallback(
    (event: KeyboardEvent) => {
      const action = findHotkeyAction(event, bindings)
      if (!action) return
      if (!alwaysActiveHotkeyActions.has(action) && document.activeElement !== document.body) return

      const handler = handlers[action]
      if (handler) {
        stopEvent(event)
        handler()
      }
    },
    [bindings, handlers]
  )
}
