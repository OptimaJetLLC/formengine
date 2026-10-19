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

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=rsuite-inject-css'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

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


:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJSc0Vycm9yTWVzc2FnZSIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJwcmludFNldHRpbmdzIiwidHlwZSI6IlByaW50U2V0dGluZ3MiLCJwcm9wcyI6eyJoZWFkZXIiOnsidmFsdWUiOiJJbnNwZWN0aW9uIHJlcG9ydCJ9LCJmb290ZXIiOnsidmFsdWUiOiJQYWdlIHtwYWdlfSBvZiB7cGFnZXN9In0sImhlYWRlckFsaWduIjp7InZhbHVlIjoiY2VudGVyIn0sImZvb3RlckFsaWduIjp7InZhbHVlIjoiZW5kIn19fSx7ImtleSI6ImZvcm1UaXRsZSIsInR5cGUiOiJSc0hlYWRlciIsInByb3BzIjp7ImNvbnRlbnQiOnsidmFsdWUiOiJTaXRlIGluc3BlY3Rpb24ifSwiaGVhZGVyU2l6ZSI6eyJ2YWx1ZSI6Img0In19fSx7ImtleSI6InNpdGVOYW1lIiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlNpdGUgbmFtZSJ9fX0seyJrZXkiOiJpbnNwZWN0b3JOb3RlcyIsInR5cGUiOiJSc1RleHRBcmVhIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJJbnNwZWN0b3Igbm90ZXMifSwicm93cyI6eyJ2YWx1ZSI6NH19fSx7ImtleSI6InBhZ2VCcmVhayIsInR5cGUiOiJQYWdlQnJlYWsiLCJwcm9wcyI6eyJicmVha0JlZm9yZSI6eyJ2YWx1ZSI6InBhZ2UifX19LHsia2V5IjoiZm9sbG93VXAiLCJ0eXBlIjoiUnNJbnB1dCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiRm9sbG93LXVwIGFjdGlvbnMifX19XX19&formName=print-settings-demo&view=rsuite-inject-css'); return false;">Open print settings demo in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Print your form](/preview-and-handoff/print-your-form)
- [Browse components and guides](/components-by-task/browse-components-and-guides)
- [Parent and child in the Tree](/form-structure-and-layout/parent-and-child-in-the-tree)
- [Page break (developers)](docs:components-library/structure-components/page-break)
- [Print settings (developers)](docs:components-library/structure-components/print-settings)
