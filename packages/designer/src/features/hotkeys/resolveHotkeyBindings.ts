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
 * @param left the first chord.
 * @param right the second chord.
 * @returns whether both chords require the same key and modifiers.
 */
const sameChord = (left: DesignerHotkey, right: DesignerHotkey) => {
  return (
    left.key.toLowerCase() === right.key.toLowerCase() &&
    !!left.alt === !!right.alt &&
    !!left.shift === !!right.shift &&
    !!left.ctrl === !!right.ctrl &&
    !!left.meta === !!right.meta
  )
}

/**
 * @param hotkey the chord to identify.
 * @returns a stable id for key + modifiers.
 */
const chordId = (hotkey: DesignerHotkey) => {
  return `${hotkey.key.toLowerCase()}|${+!!hotkey.alt}|${+!!hotkey.shift}|${+!!hotkey.ctrl}|${+!!hotkey.meta}`
}

/**
 * @param hotkey the chord to describe.
 * @returns a plain shortcut label for warning messages.
 */
const formatChordForWarn = (hotkey: DesignerHotkey) => {
  const parts: string[] = []
  if (hotkey.ctrl) parts.push('Ctrl')
  if (hotkey.alt) parts.push('Alt')
  if (hotkey.shift) parts.push('Shift')
  if (hotkey.meta) parts.push('Meta')
  const keyLabel = hotkey.key.length === 1 ? hotkey.key.toUpperCase() : hotkey.key
  return [...parts, keyLabel].join('+')
}

/**
 * Keeps one binding per chord. Later entries replace earlier ones for the same chord.
 * @param bindings the bindings in declaration order.
 * @returns the bindings with unique chords.
 */
const dedupeChordsLastWins = (bindings: HotkeyBinding[]): HotkeyBinding[] => {
  const winners = new Map<string, HotkeyBinding>()
  const order: string[] = []
  for (const binding of bindings) {
    const id = chordId(binding[0])
    const previous = winners.get(id)
    if (previous && previous[1] !== binding[1]) {
      console.warn(
        `FormBuilder hotkeys: chord "${formatChordForWarn(binding[0])}" is bound to both ` +
          `"${previous[1]}" and "${binding[1]}". Using "${binding[1]}" (later binding wins).`
      )
    }
    if (!winners.has(id)) order.push(id)
    winners.set(id, binding)
  }
  return order.map(id => winners.get(id)!)
}

/**
 * Resolves the effective hotkey bindings for the designer.
 * When two overrides claim the same chord, the later binding in `bindings` wins.
 * Defaults that share a chord with an override are dropped.
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

  const overrideBindings: HotkeyBinding[] = []
  for (const action of overriddenActions) {
    const binding = overrides[action]
    if (binding === false || binding === undefined) continue
    const list = Array.isArray(binding) ? binding : [binding]
    for (const hotkey of list) {
      overrideBindings.push([hotkey, action])
    }
  }

  const uniqueOverrides = dedupeChordsLastWins(overrideBindings)

  const result = defaults.filter(([hotkey, action]) => {
    if (overriddenActions.has(action)) return false
    return !uniqueOverrides.some(([overrideHotkey]) => sameChord(hotkey, overrideHotkey))
  })

  return [...uniqueOverrides, ...result]
}
