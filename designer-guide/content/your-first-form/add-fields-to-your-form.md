---
title: "Add fields to your form"
description: "Drag Text field and other inputs from Components onto the canvas, then set Label and Key on the Main tab: your first form fields."
---

# Add fields to your form

Add inputs from the **Components** tab, then name them on the **Main** tab of the right panel.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Before you begin

- [Create your first form](/your-first-form/create-your-first-form) with an open canvas.

## Drag a Text field

1. Open the **Components** tab.
2. Find **Text field** under **Inputs** (use the search box if the list is long).
3. Drag it onto the empty canvas (or click the **+** control in the center).

<img src="/assets/guide/first-form/highlight-add-fields-empty-palette.png" alt="Empty canvas with Components palette filtered to Text field." />

## Set label and key

<img src="/assets/guide/first-form/highlight-add-fields-main-tab.png" alt="Full name field selected with Label and Key on the Main tab." />

1. Click the new field on the canvas to select it.
2. On the right, open **Main**.
3. Set **Label** to **Full name** (or your preferred label).
4. Set **Key** to `fullName` (one word with no spaces; use camelCase if you add more fields).

## Add a second field (optional)

<img src="/assets/guide/first-form/highlight-add-fields-two-fields.png" alt="Canvas with Full name and Email address fields, Components palette open." />

1. Drag another **Text field**.
2. Set **Label** to **Email address** and **Key** to `email`.

## Check in Preview

1. Click **Preview** in the header.
2. Type into the fields.
3. Click **Edit** to continue layout work.

<img src="/assets/guide/first-form/add-fields-preview-plain.png" alt="Preview mode with Full name and Email address fields." />

## Check the result

- New fields appear in the **Tree** under the screen root.
- **Preview** shows labels you set on **Main**.

## Summary

Drag fields from **Components** and configure them on **Main**. Keys identify stored values. Preview confirms labels and input behavior.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCBhZGRyZXNzIn19fV19LCJsb2NhbGl6YXRpb24iOnt9LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=add-fields-two-fields&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Labels and help text](/fields-and-data/labels-and-help-text)
- [What is form data?](/fields-and-data/what-is-form-data)
