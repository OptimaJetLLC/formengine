---
title: "Common problems and fixes"
description: "Top author mistakes in FormEngine Designer and how to fix them: wrong tab, validation, shortcuts, library mismatch."
---

# Common problems and fixes

Quick fixes for common issues that form authors encounter.

## Keyboard shortcuts do nothing

:::warning

**Symptom:** <kbd>Delete</kbd> or <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>S</kbd></span> has no effect.

**Fix:** Click the canvas background so focus is not inside a text field. See [Keyboard shortcuts](/help/keyboard-shortcuts).

:::

## Validation never appears on the canvas

<img src="/assets/guide/first-form/canvas-plain.png" alt="Form canvas in the center." />

:::warning

**Symptom:** No error text while designing.

**Fix:** Test in **Preview** with **Validate** or **Auto Validate** on **Rules**. See [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset).

:::

## Cannot find validation rules

<img src="/assets/guide/first-form/highlight-rules-tab.png" alt="Rules tab on the properties panel." />

:::warning

**Symptom:** Cannot find **Add a validation rule**.

**Fix:** Select the **field** and open **Rules** on the **right**, not **Settings** on the left.

:::

## Components look broken after import

<img src="/assets/guide/workspace/highlight-palette.png" alt="Components tab in the left panel." />

:::warning

**Symptom:** Empty boxes or wrong controls.

**Fix:** Match **Component library** in the header to the library used when the form was built.

:::

## Cannot find the Forms tab

<img src="/assets/guide/manage-forms/forms-tab-plain.png" alt="Forms tab in the left panel." />

:::warning

**Symptom:** Only Components, Tree, Settings.

**Fix:** **Forms** appears when form storage is enabled in your app. Use **Menu** → **Download** / **Upload** instead. See [Work with multiple forms](/manage-forms/work-with-multiple-forms).

:::

## Duplicate field keys

:::warning

**Symptom:** Wrong data in **Preview** **Data** panel.

**Fix:** Give each field a unique **Key** on **Main**. See [Name fields for data capture](/your-first-form/name-fields-for-data-capture).

:::

## Preview panel missing properties

<img src="/assets/guide/preview-and-handoff/preview-mode-plain.png" alt="Preview mode." />

:::warning

**Symptom:** No **Main** / **Rules** on the right.

**Fix:** In **Preview**, the properties panel is hidden. Click **Edit** to design. Use **Data** / **Errors** on the left while previewing.

:::

## Form fails to load

:::warning

**Symptom:** Error message on the canvas instead of the form.

**Fix:** Ask developers to check the JSON file or storage entry. Use **Menu** → **Upload** for one JSON backup or **Menu** →
**Import forms** for a bulk ZIP backup. See [Save, export, and import](/manage-forms/save-export-and-import-forms).

:::

## Palette search shows nothing

<img src="/assets/guide/workspace/components-search-plain.png" alt="Search in the Components palette." />

:::warning

**Symptom:** **Not found** in **Components** after searching.

**Fix:** Clear **Search...** or try a shorter term. See
[Add components from the palette](/meet-the-designer/add-components-from-the-palette).

:::

## Trial or license banner on canvas

<img src="/assets/guide/first-form/canvas-plain.png" alt="Form canvas in the center." />

:::warning

**Symptom:** Banner about unlicensed features.

**Fix:** This is configured by your app team, not in the author guide. Developers use [License key](docs:formengine-designer/license-key).

:::

## Summary

Most issues are Preview vs Edit, focus, or library mismatch. See [FAQ](/help/faq-for-form-authors) for more answers.

## See also

- [Hand off to developers](/help/hand-off-to-your-technical-team)
- [FAQ for form authors](/help/faq-for-form-authors)
