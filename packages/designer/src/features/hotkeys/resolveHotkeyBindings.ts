import type {DesignerHotkey, DesignerHotkeyAction, DesignerHotkeysProp} from './types'

type OS = 'macos' | 'default'

type HotkeyBinding = [DesignerHotkey, DesignerHotkeyAction]

/**
 * Hotkeys that must run even when focus is inside an input or other control.
 */
export const alwaysActiveHotkeyActions = new Set<DesignerHotkeyAction>(['print'])

const defaultHotKeys: Record<OS, HotkeyBinding[]> = {
  default: [
    [{key: 'Delete'}, 'deleteSelected'],
    [{key: 'd', ctrl: true}, 'cloneSelected'],
    [{key: 's', ctrl: true}, 'save'],
    [{key: 'p', ctrl: true}, 'print'],
    [{key: 'z', ctrl: true}, 'undo'],
    [{key: 'z', ctrl: true, shift: true}, 'redo'],
    [{key: 'y', ctrl: true}, 'redo'],
  ],
  macos: [
    [{key: 'Delete'}, 'deleteSelected'],
    [{key: 'd', meta: true}, 'cloneSelected'],
    [{key: 's', meta: true}, 'save'],
    [{key: 'p', meta: true}, 'print'],
    [{key: 'z', meta: true, shift: true}, 'redo'],
    [{key: 'z', meta: true}, 'undo'],
  ],
}

/**
 * @returns the OS key used to select the default hotkey map.
 */
const getHotkeyOs = (): OS => {
  return navigator.userAgent.indexOf('Mac') === -1 ? 'default' : 'macos'
}

/**
 * Resolves the effective hotkey bindings for the designer.
 * @param hotkeys the FormBuilder `hotkeys` prop value.
 * @param os the OS key map to start from. Defaults to the current user agent.
 * @returns the binding list. Empty when all hotkeys are disabled (`hotkeys: false`).
 */
export const resolveHotkeyBindings = (hotkeys: DesignerHotkeysProp | undefined, os: OS = getHotkeyOs()): HotkeyBinding[] => {
  if (hotkeys === false) return []

  const defaults = defaultHotKeys[os]
  const overrides = hotkeys?.bindings
  if (!overrides) return defaults

  const overriddenActions = new Set<DesignerHotkeyAction>()
  for (const action of Object.keys(overrides) as DesignerHotkeyAction[]) {
    if (overrides[action] !== undefined) overriddenActions.add(action)
  }

  const result: HotkeyBinding[] = defaults.filter(([, action]) => !overriddenActions.has(action))

  for (const action of overriddenActions) {
    const binding = overrides[action]
    if (binding === false || binding === undefined) continue
    const list = Array.isArray(binding) ? binding : [binding]
    for (const hotkey of list) {
      result.push([hotkey, action])
    }
  }

  return result
}
