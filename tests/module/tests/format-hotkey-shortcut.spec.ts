import {formatHotkeyShortcut} from '@react-form-builder/designer/src/features/hotkeys/formatHotkeyShortcut'
import {describe, expect, it} from 'vitest'

describe('formatHotkeyShortcut', () => {
  it('formats Windows/Linux chords with plus separators', () => {
    expect(formatHotkeyShortcut({key: 'p', ctrl: true}, false)).toBe('Ctrl+P')
    expect(formatHotkeyShortcut({key: 'F8'}, false)).toBe('F8')
  })

  it('formats macOS chords with modifier glyphs', () => {
    expect(formatHotkeyShortcut({key: 'p', meta: true}, true)).toBe('⌘P')
    expect(formatHotkeyShortcut({key: 's', alt: true}, true)).toBe('⌥S')
  })

  it('defaults isMac without throwing when navigator is unavailable', () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator')
    Object.defineProperty(globalThis, 'navigator', {configurable: true, value: undefined})
    try {
      expect(formatHotkeyShortcut({key: 'p', ctrl: true})).toBe('Ctrl+P')
    } finally {
      if (descriptor) Object.defineProperty(globalThis, 'navigator', descriptor)
      else Reflect.deleteProperty(globalThis, 'navigator')
    }
  })
})
