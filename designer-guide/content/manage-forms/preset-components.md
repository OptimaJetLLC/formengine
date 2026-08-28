---
title: "Preset components"
description: "Save reusable component groups as presets: add them from the palette like standard controls."
---

# Preset components

A **preset** is a saved group of components (for example an address block or signature row) you reuse across forms.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Use a preset

1. Open **Components**.
2. Find your preset in the palette (search by name).
3. Drag it onto the canvas like any component.

## Create a preset step by step

This walkthrough saves **Street**, **City**, and **ZIP / Postal** fields as an **Address block** preset.

### Step 1: Select two or more components

<img src="/assets/guide/manage-forms/highlight-preset-select.png" alt="Street and City text fields multi-selected on the canvas." />

1. Click the first field on the canvas.
2. Hold <kbd>Ctrl</kbd> (Windows/Linux) or <kbd>⌘</kbd> (macOS), then click additional fields.
   For example, add **Street**, **City**, and **ZIP / Postal** to the selection.
3. The floating toolbar appears on the selection.

### Step 2: Click the preset button on the toolbar

<img src="/assets/guide/manage-forms/highlight-preset-toolbar-button.png" alt="Floating toolbar on multi-selected fields with an arrow pointing at the preset bookmark button." />

1. On the floating toolbar, click the **preset** (bookmark) button.

### Step 3: Set options in the popup

<img src="/assets/guide/manage-forms/highlight-preset-dialog.png" alt="Preset dialog with Name and Category fields highlighted." />

1. Enter a **Name** (for example **Address block**).
2. Choose or create a **Category** so the preset is easy to find.
3. Click **OK**.

### Step 4: Locate the preset in Components

<img src="/assets/guide/manage-forms/highlight-preset-palette.png" alt="Components palette with Address block preset highlighted after search." />

1. Open **Components**.
2. Search for your preset name.
3. Drag **Address block** onto another form when needed.

Availability depends on license and deployment.

Developers: See [Preset components](docs:formengine-designer/features/presets-components).

## Summary

Presets speed up repeated layouts. Select multiple components, save from the floating toolbar, then reuse from **Components**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJhZGRyZXNzQmxvY2siLCJ0eXBlIjoiTXVpU3RhY2siLCJwcm9wcyI6eyJzcGFjaW5nIjp7InZhbHVlIjoiMTJweCJ9fSwiY2hpbGRyZW4iOlt7ImtleSI6InN0cmVldCIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlN0cmVldCJ9fX0seyJrZXkiOiJjaXR5IiwidHlwZSI6Ik11aVRleHRGaWVsZCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiQ2l0eSJ9fX0seyJrZXkiOiJ6aXAiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJaSVAgLyBQb3N0YWwifX19XX1dfSwibGFuZ3VhZ2VzIjpbeyJjb2RlIjoiZW4iLCJkaWFsZWN0IjoiVVMiLCJuYW1lIjoiRW5nbGlzaCIsImRlc2NyaXB0aW9uIjoiQW1lcmljYW4gRW5nbGlzaCIsImJpZGkiOiJsdHIifV0sImRlZmF1bHRMYW5ndWFnZSI6ImVuLVVTIn0&formName=preset-address&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Select and edit components](/meet-the-designer/select-and-edit-components)
- [Preset components (developers)](docs:formengine-designer/features/presets-components)
