---
title: "Special components"
description: "How singleton and non-visual components behave in Designer: one-per-form limits, the non-visual bar, and the Tree group."
tags:
  - form-builder
  - user-guide
  - components
sidebar_label: "Special components"
---

# Special components

Most palette items drop onto the canvas like fields. A few do not. They may allow only one copy on the form, or they never sit on the canvas
at all and show up in a bottom bar instead.

## Singleton components

A **singleton** can appear only once. After you add it, the palette item greys out. Hover it to read the reason.

**Print settings** is a singleton.

<img src="/assets/guide/components-by-task/special-singleton-palette-disabled.png"
alt="Components palette with Print settings disabled after one instance is already on the form."
/>

1. Open **Components**.
2. Add **Print settings** once (search **Structure** or type the name).
3. Try to add it again. The row stays disabled and shows a hint on hover.

## Non-visual components

A **non-visual** component is part of the form, but it never sits on the canvas next to your fields. In Designer you reach it from:

- The **Non-visual bar** under the canvas (icon chips)
- The **Non-visual** section below **Screen** in the **Tree**

<img src="/assets/guide/components-by-task/special-non-visual-bar.png"
alt="Canvas bottom bar with a Print settings chip selected."
/>

1. Add a non-visual component (for example **Print settings**).
2. Click its chip in the bottom bar.
3. Edit properties in the right panel as usual.

<img src="/assets/guide/components-by-task/special-non-visual-tree.png"
alt="Tree tab showing Screen, then a Non-visual section with Print settings listed below."
/>

1. Open **Tree**.
2. Find the **Non-visual** section below **Screen**.
3. Click the row to select the same component.

In **Preview** and for end users, these components stay off screen. They still drive print layout and similar background behavior.

## Summary

Singletons stop a second copy in the palette. Non-visual components live in the bottom bar and Tree group instead of on the canvas.

## See also

- [Print your form](/preview-and-handoff/print-your-form)
- [Browse components and guides](/components-by-task/browse-components-and-guides)
- [Parent and child in the Tree](/form-structure-and-layout/parent-and-child-in-the-tree)
- [Page break (developers)](docs:components-library/structure-components/page-break)
- [Print settings (developers)](docs:components-library/structure-components/print-settings)
