---
title: "Use Preview mode tools (Data, Validate, Reset)"
description: "In Preview, use Data, Errors, Validate, Reset to default, and Clear to inspect form behavior."
---

# Use Preview mode tools (Data, Validate, Reset)

When you click **Preview**, the left panel switches from design tabs to testing tools. The **Data** and **Errors** sections help you see
values and validation results without leaving Designer.

## Before you begin

- [Preview your first form](/your-first-form/preview-your-first-form) so you know how to enter and leave Preview.

## Open Preview

<img src="/assets/guide/preview-and-handoff/highlight-preview-button.png" alt="Header Preview button highlighted before entering Preview mode." />

1. Click **Preview** in the header (label becomes **Edit**).
2. The left panel shows **Data** and **Errors** instead of **Components**, **Tree**, and **Settings**.
3. The **right** properties panel is hidden in Preview. Return to **Edit** mode to use **Main** or **Rules**.

<img src="/assets/guide/preview-and-handoff/preview-data-panel-plain.png" alt="Preview left panel with Data, Validate, Reset to default, Clear, and Errors." />

## Read live Data

<img src="/assets/guide/preview-and-handoff/highlight-preview-data.png" alt="Preview Data panel with live field values." />

1. Fill fields on the canvas.
2. Scroll the **Data** block. The JSON-shaped list updates with field keys and values.
3. Confirm keys match what you set on **Main** for each field.

## Run Validate

<img src="/assets/guide/preview-and-handoff/highlight-preview-validate.png" alt="Validate button highlighted in the Preview Data toolbar." />

1. Click **Validate** under **Data** (spell-check icon).
2. Open the **Errors** section below to see validation messages.
3. Fix rules on **Rules** in **Edit** mode if messages are wrong.

<img src="/assets/guide/preview-and-handoff/preview-validate-errors-plain.png" alt="Preview Errors panel after clicking Validate." />

## Reset or Clear test data

<img src="/assets/guide/preview-and-handoff/highlight-preview-clear.png" alt="Clear button highlighted in the Preview Data toolbar." />

| Button               | Effect                                                 |
| -------------------- | ------------------------------------------------------ |
| **Reset to default** | Restores default values you configured in Designer     |
| **Clear**            | Empties current field values in Preview                |

Use **Clear** before a fresh test pass. Use **Reset to default** when you want to see starting values again.

## Return to Edit

<img src="/assets/guide/workspace/highlight-edit-button.png" alt="Edit button in the header to leave Preview." />

1. Click **Edit**.
2. Adjust fields or validation, then Preview again.

## Summary

The Preview left panel shows **Data** and **Errors** for testing. **Validate** runs validation.
**Reset to default** and **Clear** restore or clear test values. Pair these tools with the
[testing checklist](/preview-and-handoff/testing-checklist-before-handoff).

## See also

- [Preview and Edit](/meet-the-designer/preview-and-edit)
- [What is form data?](/fields-and-data/what-is-form-data)
