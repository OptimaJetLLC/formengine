---
title: "Actions basics"
description: "What form actions are, how buttons trigger them, and what form authors configure on the Actions tab."
---

# Actions basics

**Actions** are behaviors that run when something happens, usually when a user clicks a **Button**. Examples include validating the form, resetting fields, or calling application code.

## Configure on a button

<img src="/assets/guide/behavior/button-actions-tab-plain.png" alt="Actions tab on a selected button." />

1. Select a **Button** on the canvas.
2. Open **Actions** on the right.
3. Add or reorder actions from the list your project provides.

The list depends on your deployment. Example forms often include validate-and-submit style actions.

## Form-level vs component actions

<img src="/assets/guide/workspace/settings-tab-plain.png" alt="Settings tab for form-level actions." />

| Level                  | Typical use                      |
| ---------------------- | -------------------------------- |
| Button **Actions**     | Submit, save draft, reset        |
| Field **Actions**      | Less common (advanced scenarios) |
| App-registered actions | Custom integrations (developers) |

## Test in Preview

<img src="/assets/guide/preview-and-handoff/preview-mode-plain.png" alt="Preview mode to test button actions." />

Click the button in **Preview** and watch for validation banners, success text, or console behavior your team documents.

## When you need developers

- New action types (call CRM, upload files to custom storage)
- Actions that need secrets or server endpoints

## Summary

Actions attach to triggers such as button clicks. Authors add and order them on the **Actions** tab, while developers register new types.
Test each button path in **Preview**.

## See also

- [Add button actions on your first form](/your-first-form/add-button-actions-on-your-first-form)
- [Actions (developer depth)](docs:formengine-designer/features/actions)
