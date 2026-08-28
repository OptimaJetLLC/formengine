---
title: "Add validation on your first form"
description: "Make a field required using the Rules tab and Add a validation rule: verify errors in Preview with Validate."
---

# Add validation on your first form

Validation identifies incomplete or invalid data before submission. For an individual field, add rules on the **Rules** tab.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCBhZGRyZXNzIn19fV19LCJsb2NhbGl6YXRpb24iOnt9LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=add-fields-two-fields&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Before you begin

- [Add fields to your form](/your-first-form/add-fields-to-your-form) with at least one field selected.

## Select the field

<img
  src="/assets/guide/first-form/highlight-select-validation-field.png"
  alt="Tree with fullName selected, ready to add validation rules."
/>

1. Open the **Tree** tab.
2. Click **Expand all** if needed.
3. Click the **Text field** you want to validate (for example `fullName`, labeled **Full name** on the canvas).

## Open Rules

1. On the right, click **Rules**.
2. Review **Auto Validate** (validates as the user types).

<img src="/assets/guide/first-form/highlight-rules-tab.png" alt="Rules tab with Add a validation rule and Auto Validate." />

## Add a validation rule

<img src="/assets/guide/first-form/highlight-validation-add-rule.png" alt="Add a validation rule picker open on Full name, with Non empty in the list." />

1. Click **Add a validation rule**.
2. Choose **Non empty** or **Required** from the list.
3. Adjust the rule message if the editor offers a **Message** field.

The exact rule names appear in a dropdown. **Non empty** means the field cannot be blank.

## Test in Preview

<img src="/assets/guide/first-form/validation-preview-errors-plain.png" alt="Preview after Validate, showing required errors on Full name and Email address." />

1. Click **Preview** in the header.
2. Leave the field empty and trigger validation (tab out or use **Validate** in the left panel).
3. Confirm an error message appears.
4. Click **Edit** to continue designing.

## Check the result

- The field shows as required on the canvas (often an asterisk).
- **Preview** displays an error when the rule fails.

## Summary

Select a field → **Rules** → **Add a validation rule**. **Non empty** and required rules mark blank values as invalid. Preview shows the
message users will see.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmdWxsTmFtZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkZ1bGwgbmFtZSJ9fSwic2NoZW1hIjp7InR5cGUiOiJzdHJpbmciLCJ2YWxpZGF0aW9ucyI6W3sia2V5IjoicmVxdWlyZWQifV0sImF1dG9WYWxpZGF0ZSI6dHJ1ZX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCBhZGRyZXNzIn19LCJzY2hlbWEiOnsidHlwZSI6InN0cmluZyIsInZhbGlkYXRpb25zIjpbeyJrZXkiOiJlbWFpbCJ9LHsia2V5IjoicmVxdWlyZWQifV0sImF1dG9WYWxpZGF0ZSI6dHJ1ZX19XX0sImxhbmd1YWdlcyI6W3siY29kZSI6ImVuIiwiZGlhbGVjdCI6IlVTIiwibmFtZSI6IkVuZ2xpc2giLCJkZXNjcmlwdGlvbiI6IkFtZXJpY2FuIEVuZ2xpc2giLCJiaWRpIjoibHRyIn1dLCJkZWZhdWx0TGFuZ3VhZ2UiOiJlbi1VUyJ9&formName=add-fields-validated&view=mui'); return false;">Open form with validation in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Validation basics](/behavior-and-validation/validation-basics)
- [Validation (developer depth)](docs:formengine-designer/features/validation)
