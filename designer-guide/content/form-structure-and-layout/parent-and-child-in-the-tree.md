---
title: "Parent and child in the Tree"
description: "Understand nesting in the Tree tab: select parents, move children, and fix fields that landed in the wrong container."
---

# Parent and child in the Tree

In the **Tree**, a **parent** container holds **child** components. The canvas shows the same hierarchy with indentation and drop zones.

This page uses the **Event registration** example: cards keyed `contactSection` and `ticketSection`, each with a **Stack** and fields
inside.

## Read the hierarchy

<img
  src="/assets/guide/structure/highlight-parent-child-parent.png"
  alt="contactSection selected in Tree with the Contact details card highlighted on the canvas."
/>

1. Open **Tree** → **Expand all**.
2. `contactSection` (MuiCard) is a parent container; `contactStack` and its fields are indented underneath it.
3. Click `contactSection` to select the whole card frame on the canvas.

## Select a child and see it on the canvas

<img
  src="/assets/guide/structure/highlight-parent-child-child.png"
  alt="email selected in Tree with the Email field highlighted on the canvas."
/>

1. Expand `contactSection` → `contactStack` in **Tree**.
2. Click `email`.
3. The **Email** field highlights on the canvas at the same time.

## Move a misplaced field

<img
  src="/assets/guide/structure/highlight-parent-child-move.png"
  alt="phone moved under contactStack in Tree and shown in Contact details on the canvas."
/>

1. In this example, `phone` started under `ticketStack` by mistake.
2. Drag the `phone` row in **Tree** onto a field inside `contactStack` (for example `fullName`).
3. After the move, `phone` appears under `contactStack` in **Tree** and the **Phone** field appears inside **Contact details** on the
   canvas.

## Edit a child quickly

<img src="/assets/guide/structure/highlight-parent-child-edit.png" alt="email selected in Tree with Key and Label on Main highlighted." />

1. Expand `contactSection` → `contactStack` in **Tree**.
2. Click `email`.
3. Edit **Key** and **Label** on **Main**.

## Summary

A parent is a container such as `contactSection` or `contactStack`. Its children are fields and nested layout components. Click in
**Tree** to select nested fields, drag rows to move them, and see the matching structure on the canvas.

## See also

- [Use the component tree](/meet-the-designer/use-the-component-tree)
- [Form structure and containers](/form-structure-and-layout/form-structure-and-containers)
