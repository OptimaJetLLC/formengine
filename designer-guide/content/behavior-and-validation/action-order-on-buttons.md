---
title: "Action order on buttons"
description: "Run validation before later button actions, and use failOnError when validation must stop the sequence."
---

# Action order on buttons

A single button can run **multiple actions** in sequence, for example validate, then save. Actions run from top to bottom in the **Actions**
list. Order controls when validation runs, but it does not by itself stop later actions when validation fails.

## Validate before submit

<img src="/assets/guide/behavior/highlight-action-order-validate.png" alt="Save button Actions tab with validate expanded and failOnError set to True." />

1. Select the **Save** or submit button.
2. Open **Actions**.
3. Under **onClick**, add **validate** (from **Common**).
4. Expand **Arguments** and set **failOnError** to **True** when validation errors must prevent later actions from running.
5. Keep **validate** at the **top** of the list so it runs before later actions.
6. In **Preview**, leave a required field empty and click the button. Confirm that errors appear and the later action does not run.

## Reorder

<img src="/assets/guide/behavior/highlight-action-order-reorder.png" alt="onClick list with validate above clear, both highlighted for reordering." />

1. Add another action under the same event (for example **clear** from **Common**).
2. Drag items in the **Actions** list to change order. Actions run top to bottom.
3. Put validation above save, submit, or clear when that sequence matters. Keep **failOnError** set to **True** when errors must stop the
   actions below it.

## Summary

Actions run in list order on the button. Put validation before save, submit, or clear, and set **failOnError** to **True** when errors must
stop the sequence. Ordering alone does not prevent later actions from running.

## See also

- [Add button actions on your first form](/your-first-form/add-button-actions-on-your-first-form)
- [Actions (developers)](docs:formengine-designer/features/actions)
