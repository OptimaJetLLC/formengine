---
title: "Canvas drag and drop"
description: "Move and reorder components on the canvas and in Tree: drop zones, multi-select, and the floating toolbar."
---

# Canvas drag and drop

You add components by dragging them from **Components** and organize them by dragging them on the canvas or in **Tree**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkV2ZW50IHJlZ2lzdHJhdGlvbiIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY29udGFjdFNlY3Rpb24iLCJ0eXBlIjoiTXVpQ2FyZCIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImNvbnRhY3RTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiY29udGFjdEhlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkNvbnRhY3QgZGV0YWlscyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJwaG9uZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlBob25lIn19fV19XX0seyJrZXkiOiJ0aWNrZXRTZWN0aW9uIiwidHlwZSI6Ik11aUNhcmQiLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJ0aWNrZXRTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoidGlja2V0SGVhZGluZyIsInR5cGUiOiJNdWlUeXBvZ3JhcGh5IiwicHJvcHMiOnsidmFyaWFudCI6eyJ2YWx1ZSI6Img2In0sImNoaWxkcmVuIjp7InZhbHVlIjoiVGlja2V0IG9wdGlvbnMiLCJlZGl0b3JUeXBlIjoic3RyaW5nIn19fSx7ImtleSI6InRpY2tldFR5cGUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJUaWNrZXQgdHlwZSJ9fX0seyJrZXkiOiJxdWFudGl0eSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlF1YW50aXR5In0sInR5cGUiOnsidmFsdWUiOiJudW1iZXIifX19XX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=event-registration&view=mui'); return false;">Open Event registration in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Drag from the palette

<img src="/assets/guide/workspace/highlight-canvas-drag-palette.png" alt="Components palette highlighted on Event registration." />

1. Open **Components**.
2. Drag a control to the canvas.
3. Watch for highlight lines: **before**, **after**, or **inside** a container.

## Reorder on the canvas

<img src="/assets/guide/workspace/canvas-reorder-plain.png" alt="Event registration after dragging Phone above Email on the canvas." />

1. Select **Phone**.
2. Drag it by its frame above **Email**.
3. Confirm the canvas: **Phone** is above **Email**.

If drag is blocked, the target may not accept that component. Try a different container or use **Tree**.

## Multi-select

<img src="/assets/guide/workspace/canvas-multi-select-plain.png" alt="Full name, Email, and Phone selected together on Event registration." />

1. Hold <kbd>Ctrl</kbd> (Windows/Linux) or <kbd>⌘</kbd> (macOS), then click to add to the selection.
2. Hold <kbd>Shift</kbd>, then click to select a range in **Tree**.
3. Move or delete the group together.

## Floating toolbar

<img src="/assets/guide/workspace/floating-toolbar-plain.png" alt="Floating toolbar on Email with the action strip open: Reveal in tree, Show nearby, Add, Clone, Preset, and Remove." />

Select one component to show the floating toolbar. Wide selections keep the action icons visible. Narrow ones collapse them behind
:toolbar-icon[open-actions]: **Open actions**; hover that control (or move into the strip) to expand it.

- :toolbar-icon[reveal]: **Reveal in tree** - opens **Tree** and scrolls to the component
- :toolbar-icon[nearby]: **Show nearby components** - pick a parent or direct child
- :toolbar-icon[add]: Insert before or after (click, then choose **Before** / **After**)
- :toolbar-icon[clone]: **Clone** (or <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>D</kbd></span> /
  <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>D</kbd></span>)
- :toolbar-icon[preset]: **Preset** bookmark (when licensed)
- :toolbar-icon[remove]: **Remove** (or <kbd>Delete</kbd>)

## Summary

Drag from the palette to add. Drag on the canvas or in **Tree** to reorder. Multi-select and the floating toolbar help when you repeat the
same edit.

## See also

- [Use the component tree](/meet-the-designer/use-the-component-tree)
- [Select and edit components](/meet-the-designer/select-and-edit-components)
