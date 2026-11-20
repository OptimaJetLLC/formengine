---
title: "Undo and redo"
description: "Undo and redo toolbar buttons and keyboard shortcuts: recover from mistakes while designing forms."
---

# Undo and redo

Mistakes while designing are normal. **Undo** and **Redo** restore prior design states in the current editing session. The stored copy
changes only when you save the current design.

## Toolbar

<img src="/assets/guide/workspace/highlight-undo-redo.png" alt="Red arrow pointing to the Undo and Redo buttons in the header toolbar." />

1. In the center header, find **Undo** and **Redo** (arrow icons).
2. Click **Undo** after a bad delete or drag.
3. Click **Redo** to reapply if you undid too far.

Buttons may be disabled when there is nothing to undo or redo.

## Keyboard shortcuts

### Windows and Linux

| Action             | Shortcut                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| Undo               | <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>Z</kbd></span>                  |
| Redo               | <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>Y</kbd></span>                  |
| Redo (alternative) | <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd></span> |

### macOS

| Action | Shortcut                                                                     |
| ------ | ---------------------------------------------------------------------------- |
| Undo   | <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>Z</kbd></span>                  |
| Redo   | <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd></span> |

Click the canvas background first so focus is not inside a property field.

## Undo, saving, and Clear

- **Undo** and **Redo** change the current design. They do not update the stored copy until you use **Save** again.
- Saving does not clear the undo history. If you undo after saving, the restored design remains unsaved until you save it.
- **Menu** → **Clear** is itself a design change. **Undo** can restore the cleared design while that change remains in the undo history.
- If the change is no longer in the undo history, recover from an earlier **Download** or **Export forms** backup.
- Preview test data is not part of design history. Use **Reset to default** or **Clear** in
  [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset).

## Summary

Toolbar and <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>Z</kbd></span> or
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>Z</kbd></span> shortcuts cover most design edits. Use **Save** for stored milestones and
keep backups with **Download** or **Export forms**.

## See also

- [Keyboard shortcuts](/help/keyboard-shortcuts)
- [Select and edit components](/meet-the-designer/select-and-edit-components)
