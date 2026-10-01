---
title: "Use the component tree"
description: "Select, expand, and reorder components in the Tree tab: especially for nested forms and crowded canvases."
---

# Use the component tree

The **Tree** tab lists every component in the same nested order as the canvas. Use it when the form is crowded. Click a row to select that
component. The root key is usually `screen1`.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkV2ZW50IHJlZ2lzdHJhdGlvbiIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY29udGFjdFNlY3Rpb24iLCJ0eXBlIjoiTXVpQ2FyZCIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImNvbnRhY3RTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiY29udGFjdEhlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkNvbnRhY3QgZGV0YWlscyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJwaG9uZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlBob25lIn19fV19XX0seyJrZXkiOiJ0aWNrZXRTZWN0aW9uIiwidHlwZSI6Ik11aUNhcmQiLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJ0aWNrZXRTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoidGlja2V0SGVhZGluZyIsInR5cGUiOiJNdWlUeXBvZ3JhcGh5IiwicHJvcHMiOnsidmFyaWFudCI6eyJ2YWx1ZSI6Img2In0sImNoaWxkcmVuIjp7InZhbHVlIjoiVGlja2V0IG9wdGlvbnMiLCJlZGl0b3JUeXBlIjoic3RyaW5nIn19fSx7ImtleSI6InRpY2tldFR5cGUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJUaWNrZXQgdHlwZSJ9fX0seyJrZXkiOiJxdWFudGl0eSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlF1YW50aXR5In0sInR5cGUiOnsidmFsdWUiOiJudW1iZXIifX19XX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=event-registration&view=mui'); return false;">Open Event registration in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Open Tree

1. Click **Tree** on the left panel.

  <img src="/assets/guide/workspace/tree-panel-plain.png" alt="Tree tab on Event registration with Expand all and Collapse all." />

2. Click **Expand all** to see nested containers and fields.
3. Click **Collapse all** to hide children.

## Select a component

<img src="/assets/guide/workspace/highlight-tree-select.png"
alt="email selected in Tree with the matching Email field highlighted on the canvas."
/>

1. Click a row (for example `email`).
2. The canvas highlights that component.
3. The right panel shows **Main**, **Style**, **Actions**, and **Rules** for that selection.

## Row toolbar

<img src="/assets/guide/workspace/highlight-tree-toolbar.png"
alt="Tree row for email with the compact toolbar open on hover: Add, Clone, Preset, and Remove."
/>

1. Hover a Tree row.
2. A compact toolbar appears: :toolbar-icon[add]: **+**, :toolbar-icon[clone]: **Clone**,
   :toolbar-icon[preset]: **Preset**, and :toolbar-icon[remove]: **Remove**.
3. Those icons match the canvas toolbar. :toolbar-icon[reveal]: **Reveal in tree** and
   :toolbar-icon[nearby]: **Show nearby** stay on the canvas toolbar only.

Selecting on the canvas does not scroll **Tree**. Click :toolbar-icon[reveal]: **Reveal in tree** on the canvas
toolbar when you need that row in view.

## Reorder

<img src="/assets/guide/workspace/tree-expanded-nested-plain.png" alt="Event registration after dragging phone above email in Tree." />

1. Drag `phone` above `email` in the tree.
2. Release to drop among siblings in the same stack.
3. Confirm the canvas: **Phone** is above **Email**.

If drag is blocked, the target may not accept that component type. Try a different container.

## When you need the tree

- Finding a field hidden inside a container
- Checking parent–child order (for example a button inside a stack)
- Reordering nested sections when the canvas is too dense to click

## Find deeply nested fields

<img src="/assets/guide/workspace/highlight-tree-expand-all.png" alt="Tree tab with Expand all highlighted and nested containers expanded." />

1. Use **Expand all**.
2. Follow container keys (for example `contactSection` or `contactStack`).
3. Select the inner field to edit keys or validation.

## Summary

**Tree** mirrors the canvas hierarchy. Use **Expand all** and **Collapse all** to move around. Click a row to edit it on the right. Hover a
row for the compact toolbar. Drag rows to reorder when the layout allows it.

## See also

- [Select and edit components](/meet-the-designer/select-and-edit-components)
- [Use the left panel tabs](/meet-the-designer/use-the-left-panel-tabs)
- [Canvas drag and drop](/meet-the-designer/canvas-drag-and-drop)
