---
title: "Tabs and multi-step layouts"
description: "Split long forms into tabs or steps using the RSuite Tab component: link to deeper docs for wizard patterns."
---

# Tabs and multi-step layouts

Long forms can be easier to complete when split into **tabs** or steps. Each tab holds a group of fields, and users can move between
sections before submitting.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=rsuite-inject-css'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

:::tip

This guide uses the **RSuite** component library and its **Tab** component (`RsTab`). Select **RSuite UI inject** (or **RSuite UI**) in the top **Component library** menu before you start.

:::

For the same **Employee onboarding** example built as a step-by-step **wizard**, see [Wizard and multi-step flows](/form-structure-and-layout/wizard-and-multi-step-flows).

## When to use tabs or steps

- More than one logical section (profile / job details / documents)
- Optional advanced sections that users may skip
- Wizards where each step validates before the next

## Example: employee onboarding

This walkthrough builds an **Employee onboarding** form with three tabs: **Profile**, **Job details**, and **Documents**. A single **Tab**
component holds the navigation. Each tab pane is a **Container** with fields.

### How tabs combine components

| Layer      | Component                             | Role                                                                 |
| ---------- | ------------------------------------- | -------------------------------------------------------------------- |
| Screen     | **Screen**                            | Root container for the whole form                                    |
| Navigation | **Tab**                               | Tab bar and pane slots (**Profile**, **Job details**, **Documents**) |
| Layout     | **Container**                         | Groups fields inside each tab pane                                   |
| Input      | **Input** / **Checkbox** / **Button** | Fields and actions nested in the pane **Container**                  |

Build each tab the same way: select the tab in **Tab** properties → drag a **Container** into the pane → add fields.

### Step 1: Select the RSuite component library

<img src="/assets/guide/structure/highlight-tabs-sections-library.png" alt="Top toolbar with RSuite UI inject selected in the Component library menu." />

1. Open the **Component library** menu in the top toolbar.
2. Choose **RSuite UI inject** (or **RSuite UI**).
3. The palette and canvas now show RSuite components.

### Step 2: Add a Tab component

<img src="/assets/guide/structure/highlight-tabs-sections-palette.png" alt="Components tab open with Tab highlighted in the palette search." />

1. Open **Components**.
2. Search for **Tab**.
3. Drag **Tab** onto the canvas below the form title.

### Step 3: Add fields to the first tab pane

<img
  src="/assets/guide/structure/highlight-tabs-sections-personal-tree.png"
  alt="Tree tab showing onboardingTabs with profilePane and nested input fields."
/>

1. Select the **Tab** on the canvas.
2. In **Main** properties, set **Items** to **Profile**, **Job details**, and **Documents**.
3. Make sure **Profile** is the active tab.
4. Drag **Container** from **Components** into the tab pane.
5. Drag **Input** fields into the **Container** (**Full name**, **Work email**, **Phone**).
6. Open **Tree** → **Expand all** to confirm nesting: `onboardingTabs` → `profilePane` → fields.

### Step 4: Repeat for other tabs

1. Select the **Tab** and switch the active tab to **Job details**.
2. Add **Container** → **Department**, **Start date**, and **Manager** fields.
3. Switch to **Documents** and add **Container** → **ID document number**, **Employment contract signed** checkbox, and
   **Submit onboarding** button.

### Step 5: Check the canvas

<img src="/assets/guide/structure/highlight-tabs-sections-canvas.png" alt="Components tab selected with Employee onboarding form showing Profile, Job details, and Documents tabs." />

1. Stay on **Components** or switch to the canvas.
2. Click each tab label and confirm the matching fields appear in the pane.

### Step 6: Verify the component tree

<img
  src="/assets/guide/structure/highlight-tabs-sections-tree-final.png"
  alt="Tree tab showing formTitle, onboardingTabs, three pane containers, fields, and submitOnboarding."
/>

1. Open **Tree** → **Expand all**.
2. The tree should list `formTitle`, then `onboardingTabs` with `profilePane`, `jobPane`, and `documentsPane` branches and their child
   fields indented underneath.

## Test the flow

<img src="/assets/guide/structure/tabs-sections-preview-plain.png" alt="Preview mode showing Employee onboarding Profile, Job details, and Documents tabs." />

1. Click **Preview**.
2. Switch tabs and fill required fields in each section.
3. Run **Validate** from [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset).

Developers: Tab slots, conditions, and JSON structure are covered in [Using tabs](docs:formengine-designer/features/using-tabs).

## Summary

Select **RSuite UI** in the component library, then split long forms with the **Tab** component. Nest **Container** → fields inside each tab pane. Use **Tree** to verify the full hierarchy before you preview.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6IlJzRXJyb3JNZXNzYWdlIiwiZm9ybSI6eyJrZXkiOiJzY3JlZW4xIiwidHlwZSI6IlNjcmVlbiIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImZvcm1UaXRsZSIsInR5cGUiOiJSc0hlYWRlciIsInByb3BzIjp7ImNvbnRlbnQiOnsidmFsdWUiOiJFbXBsb3llZSBvbmJvYXJkaW5nIn0sImhlYWRlclNpemUiOnsidmFsdWUiOiJoNCJ9fX0seyJrZXkiOiJvbmJvYXJkaW5nVGFicyIsInR5cGUiOiJSc1RhYiIsInByb3BzIjp7ImFjdGl2ZUtleSI6eyJ2YWx1ZSI6IlByb2ZpbGUifSwiaXRlbXMiOnsidmFsdWUiOlt7ImxhYmVsIjoiUHJvZmlsZSIsInZhbHVlIjoiUHJvZmlsZSJ9LHsibGFiZWwiOiJKb2IgZGV0YWlscyIsInZhbHVlIjoiSm9iIGRldGFpbHMifSx7ImxhYmVsIjoiRG9jdW1lbnRzIiwidmFsdWUiOiJEb2N1bWVudHMifV19fSwiY2hpbGRyZW4iOlt7ImtleSI6InByb2ZpbGVQYW5lIiwidHlwZSI6IlJzQ29udGFpbmVyIiwicHJvcHMiOnt9LCJzbG90IjoicGFuZSIsInNsb3RDb25kaXRpb24iOiJyZXR1cm4gcGFyZW50UHJvcHMuYWN0aXZlS2V5ID09PSAnUHJvZmlsZSciLCJjaGlsZHJlbiI6W3sia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiUnNJbnB1dCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiRnVsbCBuYW1lIn19fSx7ImtleSI6IndvcmtFbWFpbCIsInR5cGUiOiJSc0lucHV0IiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJXb3JrIGVtYWlsIn19fSx7ImtleSI6InBob25lIiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlBob25lIn19fV19LHsia2V5Ijoiam9iUGFuZSIsInR5cGUiOiJSc0NvbnRhaW5lciIsInByb3BzIjp7fSwic2xvdCI6InBhbmUiLCJzbG90Q29uZGl0aW9uIjoicmV0dXJuIHBhcmVudFByb3BzLmFjdGl2ZUtleSA9PT0gJ0pvYiBkZXRhaWxzJyIsImNoaWxkcmVuIjpbeyJrZXkiOiJkZXBhcnRtZW50IiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkRlcGFydG1lbnQifX19LHsia2V5Ijoic3RhcnREYXRlIiwidHlwZSI6IlJzSW5wdXQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlN0YXJ0IGRhdGUifX19LHsia2V5IjoibWFuYWdlciIsInR5cGUiOiJSc0lucHV0IiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJNYW5hZ2VyIn19fV19LHsia2V5IjoiZG9jdW1lbnRzUGFuZSIsInR5cGUiOiJSc0NvbnRhaW5lciIsInByb3BzIjp7fSwic2xvdCI6InBhbmUiLCJzbG90Q29uZGl0aW9uIjoicmV0dXJuIHBhcmVudFByb3BzLmFjdGl2ZUtleSA9PT0gJ0RvY3VtZW50cyciLCJjaGlsZHJlbiI6W3sia2V5IjoiaWREb2N1bWVudCIsInR5cGUiOiJSc0lucHV0IiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJJRCBkb2N1bWVudCBudW1iZXIifX19LHsia2V5IjoiY29udHJhY3RTaWduZWQiLCJ0eXBlIjoiUnNDaGVja2JveCIsInByb3BzIjp7ImNoaWxkcmVuIjp7InZhbHVlIjoiRW1wbG95bWVudCBjb250cmFjdCBzaWduZWQifX19LHsia2V5Ijoic3VibWl0T25ib2FyZGluZyIsInR5cGUiOiJSc0J1dHRvbiIsInByb3BzIjp7ImNoaWxkcmVuIjp7InZhbHVlIjoiU3VibWl0IG9uYm9hcmRpbmcifSwiYXBwZWFyYW5jZSI6eyJ2YWx1ZSI6InByaW1hcnkifX19XX1dfV19fQ&formName=employee-onboarding-tabs&view=rsuite-inject-css'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Wizard and multi-step flows](/form-structure-and-layout/wizard-and-multi-step-flows)
- [Using tabs (developers)](docs:formengine-designer/features/using-tabs)
- [Form structure and containers](/form-structure-and-layout/form-structure-and-containers)
