import type {DesignerHotkey} from './types'

/**
 * Formats a designer hotkey chord for menu hints.
 * @param hotkey the chord to format.
 * @param isMac whether to use macOS modifier glyphs.
 * @returns a short shortcut label such as `Ctrl+P`, `⌘P`, or `F8`.
 */
export const formatHotkeyShortcut = (hotkey: DesignerHotkey, isMac = navigator.userAgent.includes('Mac')): string => {
  const parts: string[] = []
  if (hotkey.ctrl) parts.push(isMac ? '⌃' : 'Ctrl')
  if (hotkey.alt) parts.push(isMac ? '⌥' : 'Alt')
  if (hotkey.shift) parts.push(isMac ? '⇧' : 'Shift')
  if (hotkey.meta) parts.push('⌘')

  const keyLabel = hotkey.key.length === 1 ? hotkey.key.toUpperCase() : hotkey.key
  if (isMac && parts.length > 0) {
    return `${parts.join('')}${keyLabel}`
  }
  return [...parts, keyLabel].join('+')
}
