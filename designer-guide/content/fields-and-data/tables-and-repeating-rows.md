---
title: "Tables and repeating rows"
description: "Use List, Repeater, or table components for multiple similar rows: step-by-step walkthroughs with invoice and team directory examples."
---

# Tables and repeating rows

When users add **multiple similar entries** (line items, dependents, addresses), use **Repeater**, **List**, or **table** components from the palette.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

:::tip

This page starts with **lists and repeaters** (Material UI example), then extends to **tables** (RSuite table components).

:::

## Lists and repeaters

| Pattern                  | Typical use                                                          |
| ------------------------ | -------------------------------------------------------------------- |
| **Repeater**             | Dynamic rows users add or remove (invoice lines, guests)             |
| **List** / **List item** | Structured repeated blocks with a fixed layout                       |
| **Table**                | Column grid when your library provides a table component (see below) |

Search **Components** for **Repeater** or **List**.

### Choose a pattern

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-pattern.png" alt="Components tab open with Repeater highlighted in the palette search." />

1. Open **Components**.
2. Search for **Repeater** or **List**.
3. Pick **Repeater** when users should add or remove rows at runtime.

## Example: invoice line items (repeater)

This walkthrough builds an **Invoice** form where each **line item** has **Item name**, **Quantity**, and **Unit price**. One **Repeater**
holds the row template, an **Add line item** button appends rows, and a **Remove line item** button inside each row removes that row.

### How a repeater combines components

| Layer       | Component      | Role                                             |
| ----------- | -------------- | ------------------------------------------------ |
| Screen      | **Screen**     | Root container                                   |
| Rows        | **Repeater**   | Repeating array of line items                    |
| Row layout  | **Stack**      | Horizontal group inside each row                 |
| Fields      | **Text field** | **Item name**, **Quantity**, **Unit price**      |
| Row action  | **Button**     | **Remove line item** with the `removeRow` action |
| Form action | **Button**     | **Add line item** with the `addRow` action       |

### Step 1: Add a Repeater

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-repeater-palette.png" alt="Components tab open with Repeater highlighted in the palette." />

1. Open **Components**.
2. Search for **Repeater**.
3. Drag **Repeater** onto the canvas below the form title.
4. On **Main**, set **Key** to `lineItemsRepeater`.

### Step 2: Add a row layout inside the repeater

1. Drag **Stack** from **Components** into the **Repeater**.
2. Set **Direction** to **row** on the **Stack** so fields sit side by side.
3. Set the **Stack** key to `lineItemRow`.

### Step 3: Add fields to the row template

<img
  src="/assets/guide/fields-and-data/highlight-tables-repeaters-repeater-row-tree.png"
  alt="Tree tab showing lineItemsRepeater with lineItemRow and nested text fields."
/>

1. Drag **Text field** components into `lineItemRow` (**Item name**, **Quantity**, **Unit price**).
2. Open **Tree** → **Expand all**.
3. Confirm nesting: `lineItemsRepeater` → `lineItemRow` → `itemName`, `quantity`, and `unitPrice`.

### Step 4: Add a Remove line item button inside the row

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-repeater-remove-button.png" alt="Invoice form with Remove line item highlighted inside the repeater row and its removeRow action visible." />

1. Drag **Button** into `lineItemRow`, after **Unit price**.
2. Set the label to **Remove line item**.
3. On **Actions** → **onClick**, add the **removeRow** action.
4. Leave **dataKey** and **index** empty. Because the button is inside the repeater, `removeRow` finds the parent repeater and removes the
   row that contains the clicked button.
5. Optional: set **min** to `1` to keep at least one line item. The completed example uses this setting.

### Step 5: Add an Add line item button

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-repeater-canvas.png" alt="Invoice form with Add line item highlighted below the repeater and its addRow action visible." />

1. Drag **Button** below the **Repeater**.
2. Set the label to **Add line item**.
3. On **Actions** → **onClick**, add the **addRow** action with **dataKey** set to the repeater key (`lineItemsRepeater`).

### Step 6: Verify the component tree

<img
  src="/assets/guide/fields-and-data/highlight-tables-repeaters-repeater-tree-final.png"
  alt="Tree tab showing removeLineItem inside lineItemRow and addLineItem below lineItemsRepeater."
/>

1. Open **Tree** → **Expand all**.
2. Confirm that `removeLineItem` is nested under `lineItemRow` so every rendered row receives its own removal button.
3. Confirm that `addLineItem` is outside `lineItemsRepeater` so it renders once below all rows.

### Step 7: Test adding and removing rows in preview

<img src="/assets/guide/fields-and-data/tables-repeaters-repeater-preview-plain.png" alt="Preview mode showing two invoice rows after adding rows and removing the middle line item." />

1. Click **Preview**.
2. Click **Add line item** twice. The repeater should now contain three rows.
3. Enter different **Item name** values so you can identify each row.
4. Click **Remove line item** in the middle row. Only that row should disappear, leaving the first and third rows.
5. If you set **min** to `1`, remove rows until one remains and confirm that the last row cannot be removed.
6. Run **Validate** from [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset).

Row template fields need distinct **Keys** inside the repeater. Confirm runtime behavior with developers when binding data.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6IlJzRXJyb3JNZXNzYWdlIiwiZm9ybSI6eyJrZXkiOiJzY3JlZW4xIiwidHlwZSI6IlNjcmVlbiIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImZvcm1UaXRsZSIsInR5cGUiOiJSc0hlYWRlciIsInByb3BzIjp7ImNvbnRlbnQiOnsidmFsdWUiOiJUZWFtIGRpcmVjdG9yeSJ9LCJoZWFkZXJTaXplIjp7InZhbHVlIjoiaDQifX19LHsia2V5IjoidGVhbVRhYmxlIiwidHlwZSI6IlJzVGFibGUiLCJwcm9wcyI6eyJoZWlnaHQiOnsidmFsdWUiOjI4MH0sImRhdGEiOnsidmFsdWUiOlt7Im5hbWUiOiJBbGV4IE1vcmdhbiIsImRlcGFydG1lbnQiOiJFbmdpbmVlcmluZyIsImVtYWlsIjoiYWxleC5tb3JnYW5AZXhhbXBsZS5jb20ifSx7Im5hbWUiOiJKb3JkYW4gTGVlIiwiZGVwYXJ0bWVudCI6IkRlc2lnbiIsImVtYWlsIjoiam9yZGFuLmxlZUBleGFtcGxlLmNvbSJ9LHsibmFtZSI6IlNhbSBQYXRlbCIsImRlcGFydG1lbnQiOiJTdXBwb3J0IiwiZW1haWwiOiJzYW0ucGF0ZWxAZXhhbXBsZS5jb20ifV19fSwiY2hpbGRyZW4iOlt7ImtleSI6Im5hbWVDb2x1bW4iLCJ0eXBlIjoiUnNDb2x1bW4iLCJwcm9wcyI6eyJ3aWR0aCI6eyJ2YWx1ZSI6MTgwfX0sImNoaWxkcmVuIjpbeyJrZXkiOiJuYW1lSGVhZGVyIiwidHlwZSI6IlJzSGVhZGVyQ2VsbCIsInByb3BzIjp7ImNoaWxkcmVuIjp7InZhbHVlIjoiTmFtZSJ9fX0seyJrZXkiOiJuYW1lQ2VsbCIsInR5cGUiOiJSc0NlbGwiLCJwcm9wcyI6eyJkYXRhS2V5Ijp7InZhbHVlIjoibmFtZSJ9fX1dfSx7ImtleSI6ImRlcGFydG1lbnRDb2x1bW4iLCJ0eXBlIjoiUnNDb2x1bW4iLCJwcm9wcyI6eyJ3aWR0aCI6eyJ2YWx1ZSI6MTYwfX0sImNoaWxkcmVuIjpbeyJrZXkiOiJkZXBhcnRtZW50SGVhZGVyIiwidHlwZSI6IlJzSGVhZGVyQ2VsbCIsInByb3BzIjp7ImNoaWxkcmVuIjp7InZhbHVlIjoiRGVwYXJ0bWVudCJ9fX0seyJrZXkiOiJkZXBhcnRtZW50Q2VsbCIsInR5cGUiOiJSc0NlbGwiLCJwcm9wcyI6eyJkYXRhS2V5Ijp7InZhbHVlIjoiZGVwYXJ0bWVudCJ9fX1dfSx7ImtleSI6ImVtYWlsQ29sdW1uIiwidHlwZSI6IlJzQ29sdW1uIiwicHJvcHMiOnsid2lkdGgiOnsidmFsdWUiOjI2MH19LCJjaGlsZHJlbiI6W3sia2V5IjoiZW1haWxIZWFkZXIiLCJ0eXBlIjoiUnNIZWFkZXJDZWxsIiwicHJvcHMiOnsiY2hpbGRyZW4iOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJlbWFpbENlbGwiLCJ0eXBlIjoiUnNDZWxsIiwicHJvcHMiOnsiZGF0YUtleSI6eyJ2YWx1ZSI6ImVtYWlsIn19fV19XX1dfX0&formName=team-directory-table&view=rsuite-inject-css'); return false;">Open Team directory table in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## Tables (RSuite)

Use a **table** when you need a **column grid** with headers and read-only or lightly editable cells. **RSuite table** components are available when **RSuite UI inject** is selected in the component library.

### Example: team directory

This walkthrough builds a **Team directory** table with **Name**, **Department**, and **Email** columns.

### Step 1: Select the RSuite component library

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-table-library.png" alt="Top toolbar with RSuite UI inject selected for table components." />

1. Open the **Component library** menu.
2. Choose **RSuite UI inject** (or **RSuite UI**).

### Step 2: Add a Table component

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-table-palette.png" alt="Components tab open with Table highlighted in the palette search." />

1. Open **Components**.
2. Search for **Table**.
3. Drag **Table** onto the canvas below the form title.

### Step 3: Add and configure columns

<img
  src="/assets/guide/fields-and-data/highlight-tables-repeaters-table-tree.png"
  alt="Tree tab showing teamTable with nameColumn, departmentColumn, and emailColumn."
/>

1. Expand `teamTable` in **Tree**.
2. For each column, add **Column** → **Header cell** (label) + **Cell** (**dataKey** matching row data).
3. Set sample **data** on the **Table** in **Main** properties for preview.

### Step 4: Check the canvas

<img src="/assets/guide/fields-and-data/highlight-tables-repeaters-table-canvas.png" alt="Team directory table on the canvas with Name, Department, and Email columns." />

1. Confirm column headers and sample rows render in Designer.
2. Adjust column **width** in **Main** properties if needed.

### Step 5: Test the table in preview

<img src="/assets/guide/fields-and-data/tables-repeaters-table-preview-plain.png" alt="Preview mode showing Team directory table with sample rows." />

1. Click **Preview**.
2. Scroll and click rows if your form wires row actions.

Data tables with sorting, paging, or API-backed rows usually need developer configuration. Authors supply layout inside cells; developers bind data.

Developers: See [RSuite table](docs:formengine-designer/components/table) and [List + detail pattern](/simple-data-driven-screens/list-and-detail-pattern).

## Summary

Use **Repeater** for dynamic "add another row" forms. Use **List** for fixed repeated blocks. Use **RSuite Table** for column grids. Build
the repeater row template in **Tree**, wire `removeRow` to a button inside the row, and wire `addRow` to a button outside the repeater. For
tables, switch to **RSuite UI** and nest **Column** → **Header cell** + **Cell** under **Table**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6IlJzRXJyb3JNZXNzYWdlIiwiZm9ybSI6eyJrZXkiOiJzY3JlZW4xIiwidHlwZSI6IlNjcmVlbiIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImZvcm1UaXRsZSIsInR5cGUiOiJSc0hlYWRlciIsInByb3BzIjp7ImNvbnRlbnQiOnsidmFsdWUiOiJUZWFtIGRpcmVjdG9yeSJ9LCJoZWFkZXJTaXplIjp7InZhbHVlIjoiaDQifX19LHsia2V5IjoidGVhbVRhYmxlIiwidHlwZSI6IlJzVGFibGUiLCJwcm9wcyI6eyJoZWlnaHQiOnsidmFsdWUiOjI4MH0sImRhdGEiOnsidmFsdWUiOlt7Im5hbWUiOiJBbGV4IE1vcmdhbiIsImRlcGFydG1lbnQiOiJFbmdpbmVlcmluZyIsImVtYWlsIjoiYWxleC5tb3JnYW5AZXhhbXBsZS5jb20ifSx7Im5hbWUiOiJKb3JkYW4gTGVlIiwiZGVwYXJ0bWVudCI6IkRlc2lnbiIsImVtYWlsIjoiam9yZGFuLmxlZUBleGFtcGxlLmNvbSJ9LHsibmFtZSI6IlNhbSBQYXRlbCIsImRlcGFydG1lbnQiOiJTdXBwb3J0IiwiZW1haWwiOiJzYW0ucGF0ZWxAZXhhbXBsZS5jb20ifV19fSwiY2hpbGRyZW4iOlt7ImtleSI6Im5hbWVDb2x1bW4iLCJ0eXBlIjoiUnNDb2x1bW4iLCJwcm9wcyI6eyJ3aWR0aCI6eyJ2YWx1ZSI6MTgwfX0sImNoaWxkcmVuIjpbeyJrZXkiOiJuYW1lSGVhZGVyIiwidHlwZSI6IlJzSGVhZGVyQ2VsbCIsInByb3BzIjp7ImNoaWxkcmVuIjp7InZhbHVlIjoiTmFtZSJ9fX0seyJrZXkiOiJuYW1lQ2VsbCIsInR5cGUiOiJSc0NlbGwiLCJwcm9wcyI6eyJkYXRhS2V5Ijp7InZhbHVlIjoibmFtZSJ9fX1dfSx7ImtleSI6ImRlcGFydG1lbnRDb2x1bW4iLCJ0eXBlIjoiUnNDb2x1bW4iLCJwcm9wcyI6eyJ3aWR0aCI6eyJ2YWx1ZSI6MTYwfX0sImNoaWxkcmVuIjpbeyJrZXkiOiJkZXBhcnRtZW50SGVhZGVyIiwidHlwZSI6IlJzSGVhZGVyQ2VsbCIsInByb3BzIjp7ImNoaWxkcmVuIjp7InZhbHVlIjoiRGVwYXJ0bWVudCJ9fX0seyJrZXkiOiJkZXBhcnRtZW50Q2VsbCIsInR5cGUiOiJSc0NlbGwiLCJwcm9wcyI6eyJkYXRhS2V5Ijp7InZhbHVlIjoiZGVwYXJ0bWVudCJ9fX1dfSx7ImtleSI6ImVtYWlsQ29sdW1uIiwidHlwZSI6IlJzQ29sdW1uIiwicHJvcHMiOnsid2lkdGgiOnsidmFsdWUiOjI2MH19LCJjaGlsZHJlbiI6W3sia2V5IjoiZW1haWxIZWFkZXIiLCJ0eXBlIjoiUnNIZWFkZXJDZWxsIiwicHJvcHMiOnsiY2hpbGRyZW4iOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJlbWFpbENlbGwiLCJ0eXBlIjoiUnNDZWxsIiwicHJvcHMiOnsiZGF0YUtleSI6eyJ2YWx1ZSI6ImVtYWlsIn19fV19XX1dfX0&formName=team-directory-table&view=rsuite-inject-css'); return false;">Open Team directory table in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [List and detail pattern](/simple-data-driven-screens/list-and-detail-pattern)
- [Browse components and guides](/components-by-task/browse-components-and-guides)
