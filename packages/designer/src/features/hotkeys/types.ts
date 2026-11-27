/**
 * Designer actions that can be bound to keyboard shortcuts or invoked via the form builder ref.
 */
export type DesignerHotkeyAction = 'deleteSelected' | 'cloneSelected' | 'save' | 'print' | 'undo' | 'redo'

/**
 * A single keyboard chord for a designer hotkey.
 */
export type DesignerHotkey = {
  /**
   * Whether the Alt key must be pressed.
   */
  alt?: boolean
  /**
   * Whether the Shift key must be pressed.
   */
  shift?: boolean
  /**
   * Whether the Control key must be pressed.
   */
  ctrl?: boolean
  /**
   * Whether the Meta (Command) key must be pressed.
   */
  meta?: boolean
  /**
   * The keyboard event `key` value, e.g. `'s'` or `'Delete'`.
   */
  key: string
}

/**
 * Options for remapping or disabling individual designer hotkeys.
 */
export type DesignerHotkeysOptions = {
  /**
   * Per-action binding overrides. A value of `false` disables that action’s shortcuts.
   * An unspecified action keeps the built-in default chords.
   */
  bindings?: Partial<Record<DesignerHotkeyAction, DesignerHotkey | DesignerHotkey[] | false>>
}

/**
 * Controls the FormBuilder global keyboard shortcuts.
 * Pass `false` to disable all built-in global hotkeys so the host can register its own.
 */
export type DesignerHotkeysProp = false | DesignerHotkeysOptions
