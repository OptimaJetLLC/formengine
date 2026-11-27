# Type Alias: DesignerHotkeysOptions

> **DesignerHotkeysOptions** = `object`

Options for remapping or disabling individual designer hotkeys.

## Properties

### bindings?

> `optional` **bindings?**: `Partial`\<`Record`\<[`DesignerHotkeyAction`](DesignerHotkeyAction.md), [`DesignerHotkey`](DesignerHotkey.md)[] \| [`DesignerHotkey`](DesignerHotkey.md) \| `false`\>\>

Per-action binding overrides. A value of `false` disables that action’s shortcuts.
An unspecified action keeps the built-in default chords.
