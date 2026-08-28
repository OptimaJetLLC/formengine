---
title: "Common validation patterns"
description: "Required, email, min/max length, and regex rules: pick from Add a validation rule and test messages in Preview."
---

# Common validation patterns

The **Rules** tab offers built-in validators for everyday cases. Pick a rule, set a clear **Message**, and test in **Preview**.

## Pattern reference

| Goal                            | Rule (typical name)                    |
| ------------------------------- | -------------------------------------- |
| Cannot be blank                 | **Non empty** / **Required**           |
| Valid email                     | **Email**                              |
| Minimum length                  | **Min** or **Length**                  |
| Maximum length                  | **Max** or **Length**                  |
| Number range                    | **Min** / **Max** (numeric)            |
| Patterned text format           | **Regex** (often developer-assisted)   |
| String logic beyond these rules | **Code** (usually developer-reviewed)  |

## Add a rule

1. Select the field → **Rules**.
2. Click **Add a validation rule**.
3. Choose the type and edit **Message** so users know how to fix the error.

<img src="/assets/guide/first-form/highlight-rules-tab.png" alt="Rules tab with validation rule picker." />

A **Code** rule is a field validator written in Designer for a supported string field; it is not a **Code** action. The application's
**Custom** actions are configured on the **Actions** tab and do not replace field validation rules.

## Test

<img src="/assets/guide/preview-and-handoff/preview-mode-plain.png" alt="Preview mode to test validation patterns." />

1. **Preview** → leave field invalid → **Validate** or tab out if **Auto Validate** is on.
2. Read the message in **Errors** on the left ([Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset)).

## Summary

Built-in rules cover common validation needs on **Rules**. User-facing **Message** text matters as much as the rule type.

## See also

- [Validation basics](/behavior-and-validation/validation-basics)
- [Custom error messages](/behavior-and-validation/custom-error-messages)
