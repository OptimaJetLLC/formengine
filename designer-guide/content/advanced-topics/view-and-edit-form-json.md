---
title: "View and edit form JSON"
description: "Open the JSON view from the header to inspect or edit the raw form definition. Use with care and developer review."
---

# View and edit form JSON

Designer represents each form as **JSON**. Click **`</>`** in the header (tooltip **Edit JSON**) to open the editor. For everyday work, stay
on the canvas and the **Main** / **Rules** tabs.

## Open JSON view

1. In the center header, click the **`</>`** JSON button (tooltip: **Edit JSON**) near the device preview controls.

<img src="/assets/guide/workspace/highlight-json-view-open.png" alt="Red arrow pointing to the Edit JSON button in the header." />

2. The full **Edit JSON** editor opens with the form definition.
3. Click the close control (**×**) when finished.

<img src="/assets/guide/workspace/highlight-json-view-close.png" alt="Edit JSON modal open with a red arrow pointing to the close button." />

The exact editor setup depends on configuration, including the Monaco editor and schema validation. JSON in the editor is pretty-printed on
open and formats on paste and while typing. To reformat the whole document manually, use Monaco **Format Document**:

| OS      | Shortcut                                                                          |
| ------- | --------------------------------------------------------------------------------- |
| Windows | <span class="fe-key-combo"><kbd>Shift</kbd>+<kbd>Alt</kbd>+<kbd>F</kbd></span>    |
| macOS   | <span class="fe-key-combo"><kbd>Shift</kbd>+<kbd>Option</kbd>+<kbd>F</kbd></span> |
| Linux   | <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd></span>   |

## When authors use it

- Compare two versions side by side with a diff tool after **Download**
- Search for a **key** or label across a large form
- Apply a bulk change your developer prepared

## Safer alternatives

| Task                           | Prefer                                         |
| ------------------------------ | ---------------------------------------------- |
| Transfer one JSON file         | **Menu** → **Download** / **Upload**           |
| Transfer stored forms in a ZIP | **Menu** → **Export forms** / **Import forms** |
| Fix one field                  | **Main** / **Rules** on canvas                 |

See [Save, export, and import forms](/manage-forms/save-export-and-import-forms) for the complete transfer instructions.

Developers: For schema validation and API details, see [Form's JSON](docs:formengine-designer/features/forms-json).

## Summary

Export a backup before you edit JSON. Prefer the visual tabs. Ask a developer before large JSON changes.

## See also

- [Save and share](/meet-the-designer/save-and-share)
- [Save, export, and import](/manage-forms/save-export-and-import-forms)
- [Hand off to developers](/help/hand-off-to-your-technical-team)
- [When to involve developers](/advanced-topics/when-to-involve-developers)
