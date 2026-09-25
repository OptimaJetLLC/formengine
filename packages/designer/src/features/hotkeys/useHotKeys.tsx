import {useCallback, useMemo} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {printForm} from '../ui/Header/components/printForm'
import {useSaveForm} from '../ui/Header/components/useSaveForm'

/**
 * Stop the event from propagating and prevent its default action.
 * @param event the Keyboard event.
 */
const stopEvent = (event: KeyboardEvent) => {
  event.preventDefault()
  event.stopPropagation()
}

type HotkeyAction = 'deleteSelectedAction'
  | 'cloneOneSelectedAction'
  | 'saveFormAction'
  | 'printFormAction'
  | 'undoAction'
  | 'redoAction'

type OS = 'macos' | 'default'

type Hotkey = {
  alt?: boolean
  shift?: boolean
  ctrl?: boolean
  meta?: boolean
  key: string
}

type HotkeyHandler = () => void

/**
 * Hotkeys that must run even when focus is inside an input or other control.
 */
const alwaysActiveActions = new Set<HotkeyAction>(['printFormAction'])

const hotKeys: Record<OS, Array<[Hotkey, HotkeyAction]>> = {
  default: [
    [{key: 'Delete'}, 'deleteSelectedAction'],
    [{key: 'd', ctrl: true}, 'cloneOneSelectedAction'],
    [{key: 's', ctrl: true}, 'saveFormAction'],
    [{key: 'p', ctrl: true}, 'printFormAction'],
    [{key: 'z', ctrl: true}, 'undoAction'],
    [{key: 'z', ctrl: true, shift: true}, 'redoAction'],
    [{key: 'y', ctrl: true}, 'redoAction'],
  ],
  macos: [
    [{key: 'Delete'}, 'deleteSelectedAction'],
    [{key: 'd', meta: true}, 'cloneOneSelectedAction'],
    [{key: 's', meta: true}, 'saveFormAction'],
    [{key: 'p', meta: true}, 'printFormAction'],
    [{key: 'z', meta: true, shift: true}, 'redoAction'],
    [{key: 'z', meta: true}, 'undoAction'],
  ],
}

const getOs = (): OS => {
  const ua = navigator.userAgent
  return ua.indexOf('Mac') === -1 ? 'default' : 'macos'
}

const findHotkeyAction = (event: KeyboardEvent) => {
  if (!event.key) return

  const os = getOs()

  const keys = hotKeys[os]
  const item = keys.find(([hotkey]) => {
    return !(hotkey.key.toLowerCase() !== event.key.toLowerCase()
      || !!hotkey.alt !== event.altKey
      || !!hotkey.shift !== event.shiftKey
      || !!hotkey.ctrl !== event.ctrlKey
      || !!hotkey.meta !== event.metaKey)
  })
  return item?.[1]
}

const useHotkeyHandlers = (): Record<HotkeyAction, HotkeyHandler> => {
  const builderStore = useBuilderStore()
  const onSave = useSaveForm()

  return useMemo(() => ({
    deleteSelectedAction: () => {
      builderStore.deleteSelectedComponents()
    },
    cloneOneSelectedAction: () => {
      const oneSelected = builderStore.oneSelected
      if (oneSelected) {
        builderStore.clone(oneSelected)
      }
    },
    saveFormAction: () => {
      onSave()
    },
    printFormAction: () => {
      printForm(builderStore)
    },
    undoAction: () => {
      builderStore.undoer.undo()
    },
    redoAction: () => {
      builderStore.undoer.redo()
    },
  }), [builderStore, onSave])
}

/**
 * @returns the global hotkeys handler.
 */
export const useHotkeys = () => {
  const handlers = useHotkeyHandlers()

  return useCallback((event: KeyboardEvent) => {
    const action = findHotkeyAction(event)
    if (!action) return
    if (!alwaysActiveActions.has(action) && document.activeElement !== document.body) return

    const handler = handlers[action]
    if (handler) {
      stopEvent(event)
      handler()
    }
  }, [handlers])
}
