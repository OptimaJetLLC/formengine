---
title: "Custom error messages"
description: "Write clear validation messages on the Rules tab so users know how to fix each field."
---

# Custom error messages

Default validation messages may be technical. Edit the **Message** for each rule so users see plain language.

## Edit per rule

1. Select the field → **Rules**.
2. Open an existing rule or add **Add a validation rule**.
3. Set **Message** (for example "Enter a valid email address" instead of "Invalid format").

<img src="/assets/guide/behavior/highlight-custom-error-message.png" alt="Rules tab for the Email field with Message set to Enter a valid email address." />

## Examples

| Avoid    | Prefer                               |
| -------- | ------------------------------------ |
| Invalid  | Enter your phone number as 10 digits |
| Error    | Choose a country from the list       |
| Required | First name is required               |

## Form-wide display

<img src="/assets/guide/appearance/settings-error-tooltip-plain.png" alt="Error settings on the Settings tab." />

How errors look (inline, summary) may be set in **Settings** → **Error settings**. See [Form-wide errors and tooltips](/appearance-and-readability/form-wide-errors-and-tooltips).

## Summary

Give each rule a clear **Message** when its default text is not suitable. Match the form-wide error style in **Settings**.

## See also

- [Common validation patterns](/behavior-and-validation/common-validation-patterns)
- [Validation (developers)](docs:formengine-designer/features/validation)
