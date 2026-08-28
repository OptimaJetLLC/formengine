---
title: "Spacing and alignment basics"
description: "Improve readability with stack spacing, margins, and consistent field width without learning CSS."
---

# Spacing and alignment basics

Good spacing helps users move down the form without visual clutter. You adjust most spacing on layout containers and the **Main** tab, not
by typing CSS.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Example: team profile form

This walkthrough uses one **Team profile** form throughout: a vertical **Stack** with a large **Spacing** value between **Company name**,
**Department**, and **Role**.

### Step 1: Select the parent Stack

<img src="/assets/guide/structure/highlight-spacing-canvas.png" alt="Team profile form with large vertical gaps between three text fields." />

1. Open **Tree** → **Expand all**.
2. Select the parent **Stack** that wraps your fields (`looseStack` in this example).
3. Confirm the canvas shows clear space between each field.

### Step 2: Set spacing on Main

<img src="/assets/guide/structure/highlight-spacing-properties.png" alt="Main tab with the Stack Spacing property highlighted at 72px." />

1. Open **Main** on the right.
2. Find **Spacing** (or **Gap** on some components).
3. Change the value and watch how the gap changes on the canvas. The `72px` value in this example is intentionally exaggerated to make
   the effect easy to see. For most forms, start with `16px` or `24px`.

## Field width

1. Select a **Text field**.
2. On **Main** or **Style**, set **Full width** or width options.
3. In a two-column row, keep both columns a similar width.

## Preview check

Use the same **Team profile** form in **Preview** to confirm spacing looks right for end users.

<img src="/assets/guide/structure/spacing-preview-plain.png" alt="Preview mode showing the team profile form with generous vertical spacing between fields." />

1. Click **Preview**.
2. Check **Desktop** and **Mobile** device modes in the header.
3. Confirm labels align and gaps still read clearly on narrow widths.

## Summary

Set spacing on parent layout components first. Use **Main** for gap values on **Stack**, then verify the same form in **Preview**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJzcGFjaW5nVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IlRlYW0gcHJvZmlsZSIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoibG9vc2VTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiI3MnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiY29tcGFueU5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJDb21wYW55IG5hbWUifX19LHsia2V5IjoiZGVwYXJ0bWVudCIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkRlcGFydG1lbnQifX19LHsia2V5Ijoicm9sZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlJvbGUifX19XX1dfSwibGFuZ3VhZ2VzIjpbeyJjb2RlIjoiZW4iLCJkaWFsZWN0IjoiVVMiLCJuYW1lIjoiRW5nbGlzaCIsImRlc2NyaXB0aW9uIjoiQW1lcmljYW4gRW5nbGlzaCIsImJpZGkiOiJsdHIifV0sImRlZmF1bHRMYW5ndWFnZSI6ImVuLVVTIn0&formName=spacing-loose&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Style tab basics](/appearance-and-readability/style-tab-basics)
- [Rows, columns, and grids](/form-structure-and-layout/rows-columns-and-grids)
