import {resolveHotkeyBindings} from '@react-form-builder/designer/src/features/hotkeys/resolveHotkeyBindings'
import type {DesignerHotkeyAction} from '@react-form-builder/designer/src/features/hotkeys/types'
import {describe, expect, it} from 'vitest'

const actionsFor = (bindings: ReturnType<typeof resolveHotkeyBindings>) => bindings.map(([, action]) => action)

const chordFor = (bindings: ReturnType<typeof resolveHotkeyBindings>, action: DesignerHotkeyAction) =>
  bindings.filter(([, boundAction]) => boundAction === action).map(([hotkey]) => hotkey)

describe('resolveHotkeyBindings', () => {
  it('returns default Windows/Linux chords when hotkeys are unset', () => {
    const bindings = resolveHotkeyBindings(undefined, 'default')

    expect(actionsFor(bindings)).toEqual(['deleteSelected', 'cloneSelected', 'save', 'print', 'undo', 'redo', 'redo'])
    expect(chordFor(bindings, 'save')).toEqual([{key: 's', ctrl: true}])
    expect(chordFor(bindings, 'redo')).toEqual([
      {key: 'z', ctrl: true, shift: true},
      {key: 'y', ctrl: true},
    ])
  })

  it('returns default macOS chords when os is macos', () => {
    const bindings = resolveHotkeyBindings(undefined, 'macos')

    expect(chordFor(bindings, 'save')).toEqual([{key: 's', meta: true}])
    expect(chordFor(bindings, 'redo')).toEqual([{key: 'z', meta: true, shift: true}])
    expect(bindings.some(([hotkey]) => hotkey.key.toLowerCase() === 'y')).toBe(false)
  })

  it('returns an empty list when hotkeys are disabled', () => {
    expect(resolveHotkeyBindings(false, 'default')).toEqual([])
  })

  it('disables a single action and keeps the rest', () => {
    const bindings = resolveHotkeyBindings({bindings: {print: false}}, 'default')

    expect(chordFor(bindings, 'print')).toEqual([])
    expect(chordFor(bindings, 'save')).toEqual([{key: 's', ctrl: true}])
  })

  it('replaces an action chord and drops its defaults', () => {
    const bindings = resolveHotkeyBindings({bindings: {save: {key: 's', alt: true}}}, 'default')

    expect(chordFor(bindings, 'save')).toEqual([{key: 's', alt: true}])
  })

  it('accepts multiple chords for one action', () => {
    const bindings = resolveHotkeyBindings(
      {
        bindings: {
          undo: [
            {key: 'z', ctrl: true},
            {key: 'u', alt: true},
          ],
        },
      },
      'default'
    )

    expect(chordFor(bindings, 'undo')).toEqual([
      {key: 'z', ctrl: true},
      {key: 'u', alt: true},
    ])
  })

  it('keeps unspecified actions on their defaults when remapping others', () => {
    const bindings = resolveHotkeyBindings({bindings: {cloneSelected: {key: 'd', alt: true}}}, 'macos')

    expect(chordFor(bindings, 'cloneSelected')).toEqual([{key: 'd', alt: true}])
    expect(chordFor(bindings, 'deleteSelected')).toEqual([{key: 'Delete'}])
    expect(chordFor(bindings, 'print')).toEqual([{key: 'p', meta: true}])
  })
})
