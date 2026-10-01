---
title: "Select and edit components"
description: "Select fields on the canvas or in Tree, edit properties on the right, duplicate with Ctrl+D, and delete with Delete."
---

# Select and edit components

Selecting a component connects the canvas, **Tree**, and the right-hand **Main** / **Style** / **Actions** / **Rules** tabs.

## Select on the canvas

<img src="/assets/guide/workspace/canvas-selected-plain.png" alt="Selected component on the form canvas." />

1. Click a field, button, or container outline.
2. A selection frame appears. The right panel loads that component's properties.

## Select in Tree

<img
  src="/assets/guide/workspace/highlight-tree-select.png"
  alt="email selected in Tree with the matching Email field highlighted on the canvas."
/>

1. Open **Tree** → **Expand all** if needed.
2. Click the component row.
3. The canvas scrolls to the same selection.

## Edit properties

1. With a component selected, use **Main** for labels, keys, and defaults.
2. Use **Style** for layout and CSS-related options exposed to authors.
3. Use **Actions** and **Rules** on buttons and inputs as needed.

<img src="/assets/guide/workspace/highlight-properties-main-tab.png" alt="Properties panel highlighted with Main tab selected." />

## Multi-select

<img src="/assets/guide/workspace/canvas-multi-select-plain.png" alt="Three form fields selected on the canvas with Ctrl+click." />

1. Hold <kbd>Ctrl</kbd> (Windows/Linux) or <kbd>⌘</kbd> (macOS), then click several components on the canvas or in **Tree**.
2. Hold <kbd>Shift</kbd>, then click in **Tree** to select a range.
3. Press <kbd>Delete</kbd> to remove all selected items. Cloning applies to a single selection with
   <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>D</kbd></span> or <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>D</kbd></span>.

See [Canvas drag and drop](/meet-the-designer/canvas-drag-and-drop) for reordering.

## Duplicate a component

<img src="/assets/guide/workspace/highlight-toolbar-clone.png" alt="Selected component with an arrow pointing to the clone button on the floating toolbar." />

1. Select exactly one component.
2. If the toolbar only shows :toolbar-icon[open-actions]: **Open actions**, hover it to expand the strip.
3. Click :toolbar-icon[clone]: **clone**, or press <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>D</kbd></span>
   (Windows/Linux) or <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>D</kbd></span> (macOS).
4. A copy appears. Change **Key** on **Main** so each field keeps a unique data key.

If the shortcut does nothing, click the page background first. Shortcuts often fail while focus is inside a text field.

## Delete a component

<img src="/assets/guide/workspace/highlight-toolbar-delete.png" alt="Selected component with an arrow pointing to the delete button on the floating toolbar." />

1. Select one or more components.
2. If the toolbar only shows :toolbar-icon[open-actions]: **Open actions**, hover it to expand the strip.
3. Click :toolbar-icon[remove]: **delete**, or press <kbd>Delete</kbd>.
4. Check **Tree** to confirm the field is gone.

## Summary

Canvas or **Tree** selection drives the right panel. <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>D</kbd></span> or
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>D</kbd></span> duplicates. <kbd>Delete</kbd> removes.
See [Keyboard shortcuts](/help/keyboard-shortcuts) for the full list.

## See also

- [Use the component tree](/meet-the-designer/use-the-component-tree)
- [Use the right properties panel](/meet-the-designer/use-the-right-properties-panel)
- [Add components from the palette](/meet-the-designer/add-components-from-the-palette)
