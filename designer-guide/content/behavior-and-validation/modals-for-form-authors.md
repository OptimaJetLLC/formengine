---
title: "Modals for form authors"
description: "Build a confirmation modal form, link it from a main form with Modal and openModal, then open it from a button in Preview."
sidebar_label: "Modals"
tags:
  - modals
  - actions
  - forms
---

# Modals for form authors

A **modal** is a dialog that sits on top of the current form. Typical uses include confirming a deletion, asking one extra question, or
showing a short notice without leaving the page.

This workflow uses two forms: one for the dialog content and one that opens it. You connect them with a **Modal** component, **openModal**
on a button, and **closeModal** on OK or Cancel.

For developers working in JSON, see [Modal windows](docs:formengine-core/modal) and [Modal components](docs:formengine-designer/features/modal-components).

## When to use a modal

- Confirm something destructive ("Delete this record?")
- Collect one short extra step
- Show help or legal text briefly

If the task needs many fields or a long workflow, use a normal form or wizard instead.

## The moving parts

| Piece                                     | What it does                                                       |
| ----------------------------------------- | ------------------------------------------------------------------ |
| Modal form (for example `confirm-dialog`) | Layout and fields inside the dialog                                |
| **Modal** component on the main form      | Placeholder that loads that form                                   |
| **Settings** → **Modal**                  | Dialog UI type (for example **Mui Dialog**)                        |
| **openModal** on a button                 | Opens the dialog; **modalKey** must match the Modal key            |
| **closeModal** on OK / Cancel             | Closes the dialog; **result** can tell the main form what happened |

## Step 1: Create the modal form

<img src="/assets/guide/behavior/highlight-modals-forms-create.png" alt="Forms tab with an arrow pointing to Add a new form." />

1. Open the **Forms** tab.
2. Click **Add a new form**.
3. Give it a clear name such as **confirm-dialog**.
4. Save it so it shows up in the list.

You will pick this name again as the **Modal template**.

## Step 2: Build the dialog content

<img src="/assets/guide/behavior/highlight-modals-confirm-form.png" alt="confirm-dialog form with message, OK, and Cancel highlighted." />

1. Open **confirm-dialog** from the Forms list (pencil icon).
2. Add a short message (a **Typography** component works well).
3. Add **OK** and **Cancel** buttons.

Keep it small. One question, two answers.

## Step 3: Close the dialog from the buttons

<img src="/assets/guide/behavior/highlight-modals-close-action.png" alt="OK button Actions tab with closeModal and result ok highlighted." />

1. Select **OK**.
2. Open **Actions**.
3. Under **onClick**, add **closeModal** from **Common**.
4. Open **Arguments** and set **result** to `ok` (or another short value your team agrees on).
5. Do the same for **Cancel**, with **result** `cancel`.

**closeModal** closes the dialog. The **result** string is only needed if the main form later checks what the user chose (advanced **beforeHide** setups).

## Step 4: Set the dialog type on the main form

<img src="/assets/guide/behavior/highlight-modals-settings-type.png" alt="Settings Modal block with an arrow pointing to the modal type picker." />

1. Create or open the form that should open the dialog (for example **MainForm**).
2. Open **Settings** on the left.
3. Under **Modal**, pick the type for your UI kit. With Material UI this is often **Mui Dialog**.

Dragging a **Modal** component onto the form can set this for you. Still check that it matches your library.

## Step 5: Add a Modal component

<img src="/assets/guide/behavior/highlight-components-search-modal.png" alt="Components search for modal with the Modal palette item highlighted." />

1. Stay on the main form and open **Components**.
2. Search for **modal**.
3. Drag **Modal** onto the canvas or into the tree.

Until you set a template, the canvas shows a placeholder like `Modal: '…'`.

## Step 6: Link the Modal to confirm-dialog

<img src="/assets/guide/behavior/highlight-modals-template.png" alt="confirmModal selected with an arrow pointing to Modal template set to confirm-dialog." />

1. Select the **Modal** component.
2. On **Main**, set **Key** to something stable, for example `confirmModal`.
3. Set **Modal template** to **confirm-dialog**.

That property is what loads your dialog form into the placeholder.

## Step 7: Open it from a button

<img src="/assets/guide/behavior/highlight-modals-open-action.png" alt="Show confirmation button Actions with openModal and modalKey confirmModal highlighted." />

1. Add a **Button**, for example **Show confirmation**.
2. Open **Actions** → **onClick**.
3. Add **openModal** from **Common**.
4. Open **Arguments**.
5. Set **modalKey** to the Modal key (`confirmModal`).

If the dialog should see the current form values, set **useFormData** as well.

## Step 8: Try it in Preview

<img src="/assets/guide/behavior/highlight-modals-preview-open.png" alt="Preview with the confirmation dialog open after clicking Show confirmation." />

1. Click **Preview**.
2. Click **Show confirmation**.
3. Check that the dialog shows your modal form.
4. Click **OK** or **Cancel** and make sure it closes.

Save both forms under **Forms** so Preview can load **confirm-dialog** by name when the dialog opens.

## Summary

Create a small modal form with **closeModal** on its buttons. On the main form, set **Settings** → **Modal**, add a **Modal** component, and
set **Modal template**. Then call **openModal** from a button with a matching **modalKey** and check the flow in **Preview**.

## See also

- [Modal windows (core)](docs:formengine-core/modal)
- [Modal components (Designer)](docs:formengine-designer/features/modal-components)
- [Events and actions concept](/behavior-and-validation/events-and-actions-concept)
- [Form-wide errors and tooltips](/appearance-and-readability/form-wide-errors-and-tooltips)
