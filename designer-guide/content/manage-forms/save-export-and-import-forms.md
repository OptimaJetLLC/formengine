---
title: "Save, export, and import forms"
description: "Save forms to storage, transfer one form as JSON, or move all stored forms in a ZIP archive from the header menu."
---

# Save, export, and import forms

The header **Menu** (hamburger) groups file operations: save to storage, download a single JSON, bulk ZIP export/import, and **Clear** to wipe the canvas.

For a short overview, see also [Export and share your form](/preview-and-handoff/export-and-share-your-form).

## Open the menu

1. Click the **Menu** button (hamburger) in the header.
2. Review items. The exact list depends on your deployment (storage, schema export, etc.).

## Save and Save as

| Item           | Use when                                      |
| -------------- | --------------------------------------------- |
| **Save**       | You want to keep the current form in storage  |
| **Save as...** | You need a copy under a new name              |

The save shortcut is <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>S</kbd></span> on Windows/Linux or
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>S</kbd></span> on macOS when focus is on the page background.

<img src="/assets/guide/manage-forms/highlight-header-menu-save.png" alt="Header menu open with Save highlighted." />

<img src="/assets/guide/manage-forms/highlight-header-menu-save-as.png" alt="Header menu open with Save as highlighted." />

If save fails, check the browser console. Your administrator may need to fix storage configuration.

## Download and Upload (single form)

| Item         | Use when                                          |
| ------------ | ------------------------------------------------- |
| **Download** | You need one `.json` file for the active form     |
| **Upload**   | You are replacing or loading one form from a file |

<img src="/assets/guide/manage-forms/highlight-header-menu-download.png" alt="Header menu open with Download highlighted." />

<img src="/assets/guide/manage-forms/highlight-header-menu-upload.png" alt="Header menu open with Upload highlighted." />

## Export forms and Import forms (bulk)

These commands are available only when form storage is enabled.

| Item             | Use when                                                         |
| ---------------- | ---------------------------------------------------------------- |
| **Export forms** | You need a ZIP of all stored forms                               |
| **Import forms** | You are restoring or transferring a ZIP from another environment |

<img src="/assets/guide/manage-forms/highlight-header-menu-export-forms.png" alt="Header menu open with Export forms highlighted." />

:::warning

Run **Export forms** in the destination environment first. Check the JSON filenames in the archive before importing: each filename without
`.json` becomes the stored form name. With the bundled storage, **Import forms** replaces a stored form with the same name without a
conflict prompt.

:::

<img src="/assets/guide/manage-forms/highlight-header-menu-import-forms.png" alt="Header menu open with Import forms highlighted." />

After import, open **Forms** or reload and run the [testing checklist](/preview-and-handoff/testing-checklist-before-handoff).

## Clear

<img src="/assets/guide/manage-forms/highlight-header-menu-clear.png" alt="Header menu open with Clear highlighted." />

**Clear** removes every component from the active form. Use only when you intend to start over. Export first if the form has work you might need later.

## Add a new form (menu)

<img src="/assets/guide/manage-forms/highlight-header-menu-add-new-form.png" alt="Header menu open with Add a new form highlighted." />

**Add a new form** creates another empty form when storage is enabled. It is equivalent to **Add a new form** on the **Forms** tab.

## Summary

Use **Save** / **Save as...** for stored forms, **Download** / **Upload** for one JSON file, and **Export forms** / **Import forms** for
bulk ZIP transfers. **Clear** removes the canvas contents, so export before using it.

## See also

- [Work with multiple forms](/manage-forms/work-with-multiple-forms)
- [Forms JSON (developers)](docs:formengine-designer/features/forms-json)
- [Keyboard shortcuts](/help/keyboard-shortcuts)
