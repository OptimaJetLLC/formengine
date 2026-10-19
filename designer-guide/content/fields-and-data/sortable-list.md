---
title: "Sortable list"
description: "Build repeating rows users can reorder by drag or keyboard: add Sortable list, wire add/remove, and test in Preview."
tags:
  - form-builder
  - user-guide
  - sortable-list
  - repeater
sidebar_label: "Sortable list"
---

# Sortable list

Use **Sortable list** when people must **reorder** repeating rows (priority tasks, ranked choices, step order). It works like a
**Repeater**: you design one row template, and users add or remove rows. In **Preview**, each row also shows a drag handle so they can
change order.

**Sortable list** and **Repeater** work with any component library (Material UI, RSuite, Mantine, and others). Build the row with that
library’s fields and buttons. Use a plain **Repeater** when order never changes at runtime.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=rsuite-inject-css'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## When to use Sortable list

| Need                                                     | Component          |
| -------------------------------------------------------- | ------------------ |
| Users add or remove rows, but order stays fixed          | **Repeater**       |
| Users must drag (or keyboard-move) rows into a new order | **Sortable list**  |
| Column grid with headers                                 | **Table** (RSuite) |

Do not nest a **Sortable list** inside another **Sortable list** in this version.

## Example: priority tasks

This walkthrough builds a **Priority tasks** form. Each row has a **Task** field and a **Remove** button. Users reorder rows with the
handle, and **Add task** appends a new row.

### Step 1: Add Sortable list

<img src="/assets/guide/fields-and-data/highlight-sortable-list-palette.png" alt="Components tab with Sortable list highlighted in the palette search." />

1. Open **Components**.
2. Search for **Sortable list**.
3. Drag **Sortable list** onto the canvas below the form title.
4. On **Main**, set **Key** to `taskList`.

### Step 2: Build the row template

<img
src="/assets/guide/fields-and-data/highlight-sortable-list-tree.png"
alt="Tree tab showing taskList with Task field and Remove button nested under it."
/>

1. Drag a text input from your library into the **Sortable list**, label it **Task**, and set its **Key** to `title`.
2. Drag a **Button** into the same **Sortable list**, labeled **Remove**.
3. On **Actions** → **onClick** for **Remove**, add the **removeRow** action. Leave **dataKey** and **index** empty so the button removes
   its own row.
4. Open **Tree** → **Expand all** and confirm nesting: `taskList` → `title` and `removeTask`.

### Step 3: Add an Add task button

1. Drag **Button** below the **Sortable list**.
2. Set the label to **Add task**.
3. On **Actions** → **onClick**, add the **addRow** action with **dataKey** set to `taskList`.

### Step 4: Review Main properties

<img
src="/assets/guide/fields-and-data/highlight-sortable-list-properties.png"
alt="Main properties for Sortable list showing Disabled, Read only, and ARIA label for reorder handle."
/>

Select the **Sortable list**, then open **Main**:

| Property                          | What it does                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------ |
| **Disabled**                      | Turns off reordering (and blocks interaction on the list).                     |
| **Read only**                     | Turns off reordering while the row fields may still be editable.               |
| **ARIA label for reorder handle** | Accessible name for the drag handle (default **Reorder row**).                 |
| **Render item when**              | Same idea as Repeater: controls when row content shows.                        |
| **Value**                         | The array of row objects (seed sample rows here if you want a filled Preview). |

Set **ARIA label for reorder handle** to something specific when helpful (for example **Reorder task**).

### Step 5: Test reorder in Preview

<img
src="/assets/guide/fields-and-data/sortable-list-preview-plain.png"
alt="Preview mode showing three priority tasks with drag handles on the left of each row."
/>

1. Click **Preview**.
2. Confirm each row shows a handle on the left.
3. Drag a handle to move a row (for example move **Print name badges** above **Send invitations**).
4. Click **Add task**, fill a new **Task** value, then reorder again.
5. Click **Remove** on one row and confirm only that row disappears.

### Reorder with the keyboard

1. Tab until focus is on a row’s reorder handle (not inside the **Task** field).
2. Press **Space** or **Enter** to start moving that row.
3. Press **ArrowUp** or **ArrowDown** until the row sits where you want it (**Shift** + arrow moves farther each press).
4. Press **Space**, **Enter**, or **Tab** to drop it in place.
5. Press **Escape** instead to cancel and keep the previous order.

## Summary

**Sortable list** is a repeating row template plus drag (and keyboard) reorder in Preview. It works with any component library. Build the
row like a Repeater, wire `addRow` / `removeRow`, then confirm handles and order changes in Preview. Prefer a plain Repeater when users
never need to change row order.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJSc0Vycm9yTWVzc2FnZSIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiUnNIZWFkZXIiLCJwcm9wcyI6eyJjb250ZW50Ijp7InZhbHVlIjoiUHJpb3JpdHkgdGFza3MifSwiaGVhZGVyU2l6ZSI6eyJ2YWx1ZSI6Img0In19fSx7ImtleSI6InRhc2tMaXN0IiwidHlwZSI6IlNvcnRhYmxlTGlzdCIsInByb3BzIjp7InZhbHVlIjp7InZhbHVlIjpbeyJ0aXRsZSI6IkNvbmZpcm0gdmVudWUifSx7InRpdGxlIjoiU2VuZCBpbnZpdGF0aW9ucyJ9LHsidGl0bGUiOiJQcmludCBuYW1lIGJhZGdlcyJ9XX0sInJlb3JkZXJIYW5kbGVBcmlhTGFiZWwiOnsidmFsdWUiOiJSZW9yZGVyIHRhc2sifX0sImNoaWxkcmVuIjpbeyJrZXkiOiJ0aXRsZSIsInR5cGUiOiJSc0lucHV0IiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJUYXNrIn19fSx7ImtleSI6InJlbW92ZVRhc2siLCJ0eXBlIjoiUnNCdXR0b24iLCJwcm9wcyI6eyJjaGlsZHJlbiI6eyJ2YWx1ZSI6IlJlbW92ZSJ9LCJhcHBlYXJhbmNlIjp7InZhbHVlIjoiZ2hvc3QifX0sImV2ZW50cyI6eyJvbkNsaWNrIjpbeyJuYW1lIjoicmVtb3ZlUm93IiwidHlwZSI6ImNvbW1vbiJ9XX19XX0seyJrZXkiOiJhZGRUYXNrIiwidHlwZSI6IlJzQnV0dG9uIiwicHJvcHMiOnsiY2hpbGRyZW4iOnsidmFsdWUiOiJBZGQgdGFzayJ9LCJhcHBlYXJhbmNlIjp7InZhbHVlIjoicHJpbWFyeSJ9fSwiZXZlbnRzIjp7Im9uQ2xpY2siOlt7Im5hbWUiOiJhZGRSb3ciLCJ0eXBlIjoiY29tbW9uIiwiYXJncyI6eyJkYXRhS2V5IjoidGFza0xpc3QifX1dfX1dfSwibGFuZ3VhZ2VzIjpbeyJjb2RlIjoiZW4iLCJkaWFsZWN0IjoiVVMiLCJuYW1lIjoiRW5nbGlzaCIsImRlc2NyaXB0aW9uIjoiQW1lcmljYW4gRW5nbGlzaCIsImJpZGkiOiJsdHIifV0sImRlZmF1bHRMYW5ndWFnZSI6ImVuLVVTIn0&formName=priority-tasks-sortable&view=rsuite-inject-css'); return false;">Open Priority tasks form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Tables and repeating rows](/fields-and-data/tables-and-repeating-rows)
- [List and detail pattern](/simple-data-driven-screens/list-and-detail-pattern)
- [Sortable list (developers)](docs:components-library/structure-components/sortable-list)
