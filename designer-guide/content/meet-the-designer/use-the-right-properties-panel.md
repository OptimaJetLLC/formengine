---
title: "Use the right properties panel"
description: "Edit the selected field with Main, Style, Actions, and Rules tabs in the right properties panel: labels, validation, and behavior."
---

# Use the right properties panel

The **right panel** shows settings for the selected component: label, required, spacing, behavior. If nothing is selected, you see
**Select element on form for edit properties**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJjaGVja291dFRpdGxlIiwidHlwZSI6Ik11aVR5cG9ncmFwaHkiLCJwcm9wcyI6eyJ2YXJpYW50Ijp7InZhbHVlIjoiaDUifSwiY2hpbGRyZW4iOnsidmFsdWUiOiJDaGVja291dCIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoicGVyc29uYWxTZWN0aW9uIiwidHlwZSI6Ik11aUNhcmQiLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJwZXJzb25hbFN0YWNrIiwidHlwZSI6Ik11aVN0YWNrIiwicHJvcHMiOnsic3BhY2luZyI6eyJ2YWx1ZSI6IjEycHgifX0sImNoaWxkcmVuIjpbeyJrZXkiOiJwZXJzb25hbEhlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IlBlcnNvbmFsIiwiZWRpdG9yVHlwZSI6InN0cmluZyJ9fX0seyJrZXkiOiJmdWxsTmFtZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkZ1bGwgbmFtZSJ9fX0seyJrZXkiOiJlbWFpbCIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkVtYWlsIn19fV19XX0seyJrZXkiOiJiaWxsaW5nU2VjdGlvbiIsInR5cGUiOiJNdWlDYXJkIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiYmlsbGluZ1N0YWNrIiwidHlwZSI6Ik11aVN0YWNrIiwicHJvcHMiOnsic3BhY2luZyI6eyJ2YWx1ZSI6IjEycHgifX0sImNoaWxkcmVuIjpbeyJrZXkiOiJiaWxsaW5nSGVhZGluZyIsInR5cGUiOiJNdWlUeXBvZ3JhcGh5IiwicHJvcHMiOnsidmFyaWFudCI6eyJ2YWx1ZSI6Img2In0sImNoaWxkcmVuIjp7InZhbHVlIjoiQmlsbGluZyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY2FyZE51bWJlciIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkNhcmQgbnVtYmVyIn19fSx7ImtleSI6ImV4cGlyeSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkV4cGlyeSJ9fX1dfV19LHsia2V5IjoicmV2aWV3U2VjdGlvbiIsInR5cGUiOiJNdWlDYXJkIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoicmV2aWV3U3RhY2siLCJ0eXBlIjoiTXVpU3RhY2siLCJwcm9wcyI6eyJzcGFjaW5nIjp7InZhbHVlIjoiMTJweCJ9fSwiY2hpbGRyZW4iOlt7ImtleSI6InJldmlld0hlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IlJldmlldyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5Ijoib3JkZXJOb3RlcyIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6Ik9yZGVyIG5vdGVzIn0sIm11bHRpbGluZSI6eyJ2YWx1ZSI6dHJ1ZX19fSx7ImtleSI6InN1Ym1pdE9yZGVyIiwidHlwZSI6Ik11aUJ1dHRvbiIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJjb250YWluZWQifSwiY2hpbGRyZW4iOnsidmFsdWUiOiJTdWJtaXQgb3JkZXIifX19XX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=checkout-sections&view=mui'); return false;">Open the Checkout form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Before you begin

- Open [The Designer workspace](/meet-the-designer/the-designer-workspace) for a map of the screen.

## Select a component

<img
  src="/assets/guide/workspace/highlight-right-panel-select.png"
  alt="fullName selected in Tree and the Full name field selected on the Checkout canvas."
/>

1. Click a field or container on the **canvas**, **or**
2. Click its row in the **Tree** tab.

The right panel populates when a component is selected. If nothing is selected, you see **Select element on form for edit properties**.
Required fields may show a marker on **Main**.

| Setting                                  | Tab         |
| ---------------------------------------- | ----------- |
| Label, placeholder, key, **Render When** | **Main**    |
| Spacing and style                        | **Style**   |
| What happens on events                   | **Actions** |
| Validation rules                         | **Rules**   |

## Main tab

<img src="/assets/guide/workspace/highlight-right-panel-main.png" alt="Right panel Main tab highlighted for the Full name field on the Checkout form." />

- **Label**, **Key**, placeholders, and core field options.
- Conditional visibility, including **Render When**, under **Additional properties**.
- Start here for everyday text and data settings.

## Style tab

<img src="/assets/guide/workspace/highlight-right-panel-style.png" alt="Right panel Style tab highlighted for the Full name field on the Checkout form." />

- Spacing, typography, and visual options supported by your component library.
- Use when authors need appearance changes without developer help.

## Actions tab

<img src="/assets/guide/workspace/highlight-right-panel-actions.png" alt="Right panel Actions tab highlighted for the Submit order button on the Checkout form." />

- Event handlers such as button clicks.
- See [Button actions on your first form](/your-first-form/add-button-actions-on-your-first-form) for a first example.

## Rules tab

<img src="/assets/guide/workspace/highlight-right-panel-rules.png" alt="Right panel Rules tab highlighted for the Full name field on the Checkout form." />

- Validation rules and messages for the selected field.
- See [Validation on your first form](/your-first-form/add-validation-on-your-first-form).

## Form-wide settings are not here

<img src="/assets/guide/workspace/highlight-right-panel-settings.png" alt="Settings tab on the left panel highlighted on the Checkout form." />

Open **Settings** on the **left** for form-wide error display, **Form validator**, tooltip defaults, languages, and similar options that
apply to the whole form.

## Summary

The right panel edits the selected component only. **Main** and **Rules** are the tabs authors use most. Left **Settings** covers the entire form.

## See also

- [Select and edit components](/meet-the-designer/select-and-edit-components)
- [What is form data?](/fields-and-data/what-is-form-data)
- [Validation basics](/behavior-and-validation/validation-basics)
