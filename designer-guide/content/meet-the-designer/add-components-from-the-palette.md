---
title: "Add components from the palette"
description: "Search the Components tab, drag controls onto the canvas, or open the components modal when the palette is crowded."
---

# Add components from the palette

A **component** is one piece of the form: a text field, a button, or a container. The **Components** tab is the library. Drag a component
onto the canvas, or double-click it. Then set **Label** and **Key** on the right.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open empty form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Search the palette

1. Open **Components**.
2. Type in **Search...** (placeholder text matches the box).
3. Categories such as **Inputs** and **Layout** filter to matching names.
4. If nothing matches, the palette shows a **Not found** message. Clear **Search...** or try another term.

<img src="/assets/guide/workspace/components-search-plain.png" alt="Components palette filtered with Search." />

<img src="/assets/guide/workspace/highlight-palette.png" alt="Components palette highlighted." />

1. Find a control (for example **Text field**).
2. Drag it onto the canvas or into a highlighted drop zone on a container.
3. Select the new field and set **Label** and **Key** on **Main**.

## Double-click to insert

<img src="/assets/guide/first-form/highlight-add-fields-two-fields.png" alt="Canvas after adding Full name and Email address fields." />

1. Select a container on the canvas.
2. Double-click a component in the palette.
3. Designer inserts it inside the selection (or after the selected sibling).

## Components modal

<img src="/assets/guide/workspace/components-add-button-hover-plain.png" alt="Add button on the component toolbar with Before and After options." />

1. Select a component on the canvas to show the floating toolbar.
2. Hover the **+** button to open **Before** and **After**.
3. Choose **Before** or **After** to pick where the new control goes.

<img src="/assets/guide/workspace/components-add-modal-plain.png" alt="Click to add control modal with the full component picker." />

4. The **Click to add control** modal opens with search and categories.
5. Click a component to insert it in the chosen position.

Some layouts use this modal instead of dragging from the left palette. Search and categories work the same way.

## Summary

**Search...** narrows the palette. Drag or double-click to place components, then configure them on **Main**. Use **Tree** to verify where
new items landed.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCBhZGRyZXNzIn19fV19LCJsb2NhbGl6YXRpb24iOnt9LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=add-fields-two-fields&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Select and edit components](/meet-the-designer/select-and-edit-components)
- [Use the right properties panel](/meet-the-designer/use-the-right-properties-panel)
- [Common field types](/fields-and-data/common-field-types)
- [Add fields to your first form](/your-first-form/add-fields-to-your-form)
