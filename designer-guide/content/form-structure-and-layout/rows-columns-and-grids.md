---
title: "Rows, columns, and grids"
description: "Place fields side by side with grid or stack layout components: preview on mobile before you publish."
---

# Rows, columns, and grids

Use **grid** or horizontal **stack** layout components for side-by-side fields such as city and state or first and last name.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Vertical vs horizontal

| Layout                | Best for                      |
| --------------------- | ----------------------------- |
| **Stack** (vertical)  | One field per row             |
| **Grid** / row layout | Two or more fields on one row |

## Example: shipping address form

This walkthrough uses a **Shipping address** form with horizontal **Stack** rows for name and city fields.

### Step 1: Add a horizontal Stack

<img src="/assets/guide/structure/highlight-rows-columns-palette.png" alt="Components tab open with Stack highlighted in the palette search." />

1. Open **Components**.
2. Search for **Stack**.
3. Drag **Stack** onto the canvas.

### Step 2: Set direction to row

1. Select the row **Stack** in **Tree** (for example `nameRow`).
2. On **Main**, set **Direction** to **row**.
3. Set **Spacing** (for example `16px`).

### Step 3: Add fields to the row

1. Drag **First name** and **Last name** **Text field** components into the row **Stack**.
2. Add a full-width **Street address** field below the row.
3. Add a second horizontal **Stack** with **City**, **State**, and **ZIP / Postal**.

### Step 4: Check the canvas

<img src="/assets/guide/structure/highlight-rows-columns-canvas.png" alt="Components tab selected with shipping address form showing side-by-side fields." />

### Step 5: Verify in Tree

<img
  src="/assets/guide/structure/highlight-rows-columns-tree-final.png"
  alt="Tree tab open with nameRow and cityRow Stacks and their child text fields."
/>

1. Open **Tree** → **Expand all**.
2. `nameRow` and `cityRow` should each list their child fields indented underneath.

## Test responsive layout

Compare **Desktop** and **Mobile** preview so side-by-side fields still read well on narrow screens.

1. Click **Preview**.
2. Click **Desktop** or **Mobile** in the header toolbar (next to **Preview** / **Edit**).
3. Confirm fields stack or wrap readably on **Mobile**.

<img src="/assets/guide/structure/highlight-rows-columns-preview-desktop.png" alt="Desktop preview with arrow pointing at the selected Desktop device button." />

<img src="/assets/guide/structure/highlight-rows-columns-preview-mobile.png" alt="Mobile preview with arrow pointing at the selected Mobile device button." />

Developers: Responsive breakpoints and advanced layout rules are documented in [Adaptive layout](docs:formengine-designer/features/adaptive-layout).

## Summary

Use grid or stack components for multi-column rows. Preview the form in **Mobile** mode after layout changes.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJzaGlwcGluZ1RpdGxlIiwidHlwZSI6Ik11aVR5cG9ncmFwaHkiLCJwcm9wcyI6eyJ2YXJpYW50Ijp7InZhbHVlIjoiaDUifSwiY2hpbGRyZW4iOnsidmFsdWUiOiJTaGlwcGluZyBhZGRyZXNzIiwiZWRpdG9yVHlwZSI6InN0cmluZyJ9fX0seyJrZXkiOiJuYW1lUm93IiwidHlwZSI6Ik11aVN0YWNrIiwicHJvcHMiOnsiZGlyZWN0aW9uIjp7InZhbHVlIjoicm93In0sInNwYWNpbmciOnsidmFsdWUiOiIxNnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiZmlyc3ROYW1lIiwidHlwZSI6Ik11aVRleHRGaWVsZCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiRmlyc3QgbmFtZSJ9fX0seyJrZXkiOiJsYXN0TmFtZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6Ikxhc3QgbmFtZSJ9fX1dfSx7ImtleSI6InN0cmVldCIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlN0cmVldCBhZGRyZXNzIn19fSx7ImtleSI6ImNpdHlSb3ciLCJ0eXBlIjoiTXVpU3RhY2siLCJwcm9wcyI6eyJkaXJlY3Rpb24iOnsidmFsdWUiOiJyb3cifSwic3BhY2luZyI6eyJ2YWx1ZSI6IjE2cHgifX0sImNoaWxkcmVuIjpbeyJrZXkiOiJjaXR5IiwidHlwZSI6Ik11aVRleHRGaWVsZCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiQ2l0eSJ9fX0seyJrZXkiOiJzdGF0ZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlN0YXRlIn19fSx7ImtleSI6InppcCIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlpJUCAvIFBvc3RhbCJ9fX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=shipping-columns&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Spacing and alignment basics](/form-structure-and-layout/spacing-and-alignment-basics)
- [Adaptive layout (developers)](docs:formengine-designer/features/adaptive-layout)
