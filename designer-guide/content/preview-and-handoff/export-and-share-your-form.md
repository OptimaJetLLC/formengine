---
title: "Export and share your form"
description: "Download or upload one form as JSON, or move all stored forms between environments in a ZIP archive."
---

# Export and share your form

Use **Download** and **Upload** to share the current form as a JSON file. When form storage is enabled, use **Export forms** and
**Import forms** to move all stored forms in a ZIP archive.

## Save

<img src="/assets/guide/manage-forms/highlight-header-menu-save.png" alt="Header menu open with Save highlighted." />

1. Open the header menu (menu icon near **Preview**).
2. Choose **Save** or **Save as...**.
3. Confirm the form name if prompted.

Saving behavior depends on your host app. Some installations save to browser storage, while others use a backend.

## Download one form

<img src="/assets/guide/manage-forms/highlight-header-menu-download.png" alt="Header menu open with Download highlighted." />

1. Open the header menu.
2. Click **Download**.
3. Save the `form.json` file your browser offers.
4. Share the JSON file through your team's secure channel (not public email if data is sensitive).

## Upload one form

<img src="/assets/guide/manage-forms/highlight-header-menu-upload.png" alt="Header menu open with Upload highlighted." />

1. Open the header menu.
2. Click **Upload**.
3. Select the `.json` file from a teammate.
4. Review the form on the canvas and run the [testing checklist](/preview-and-handoff/testing-checklist-before-handoff).

## Move all stored forms

When form storage is enabled, **Export forms** downloads all stored forms in `forms.zip`. **Import forms** expects that ZIP archive and
saves its JSON forms to storage. See [Save, export, and import forms](/manage-forms/save-export-and-import-forms) for the full workflow.

Before **Import forms**, export a backup and review the JSON filenames in the archive. With the bundled storage, an imported form replaces
a stored form with the same name without a conflict prompt.

## Clear

<img src="/assets/guide/manage-forms/highlight-header-menu-clear.png" alt="Header menu open with Clear highlighted." />

**Clear** removes the current design from Designer. Use only when you intend to start over.

## Check the result

- After **Upload**, components appear on the canvas and in **Tree**.
- After **Import forms**, imported forms appear in **Forms**.
- **Preview** should match the downloaded or exported form.

## Summary

Use **Download** / **Upload** for one JSON file. Use **Export forms** / **Import forms** for a ZIP of all stored forms. Re-test in
**Preview** after either type of import.

## See also

- [Save, export, and import forms](/manage-forms/save-export-and-import-forms)
- [Save and share](/meet-the-designer/save-and-share)
- [Form storage (developers)](docs:formengine-designer/features/form-storage)

## Next steps

- [Glossary](/help/glossary)
- [FAQ](/help/faq-for-form-authors)
