---
title: "Name fields for data capture"
description: "Set a clear Key for each data-entry field so reports and integrations can identify its value."
---

# Name fields for data capture

Each data-entry field should have a **Key** (data key or field name) so submitted values are stored predictably. Labels are what users see;
keys are what systems read.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19XX0sImxvY2FsaXphdGlvbiI6e30sImxhbmd1YWdlcyI6W3siY29kZSI6ImVuIiwiZGlhbGVjdCI6IlVTIiwibmFtZSI6IkVuZ2xpc2giLCJkZXNjcmlwdGlvbiI6IkFtZXJpY2FuIEVuZ2xpc2giLCJiaWRpIjoibHRyIn1dLCJkZWZhdWx0TGFuZ3VhZ2UiOiJlbi1VUyJ9&formName=add-fields-one-field&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Set the key

<img src="/assets/guide/first-form/highlight-add-fields-main-tab.png" alt="Main tab Key and Label for the Full name field." />

1. Select the field on the canvas or in **Tree**.
2. Open **Main** on the right.
3. Edit **Key** (it may appear as **Data key**). Use `firstName` or `email`, not `field1`.

## Naming habits

| Good                            | Avoid                           |
| ------------------------------- | ------------------------------- |
| `email`                         | `MuiTextField` (component type) |
| `shippingCity`                  | `textfield_copy_2`              |
| camelCase agreed with your team | Spaces or special characters    |

## Verify

1. Click **Preview**.
2. Fill the field.
3. Open **Data** in the left panel. The key should appear with your value.

## Summary

**Key** on **Main** defines stored data names. Confirm keys in Preview **Data**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCBhZGRyZXNzIn19fV19LCJsb2NhbGl6YXRpb24iOnt9LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=add-fields-two-fields&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [What is form data?](/fields-and-data/what-is-form-data)
- [Glossary: Key](/help/glossary#key-field-name)
