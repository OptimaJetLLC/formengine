---
title: "Validation basics"
description: "Required fields, built-in rules, and Auto Validate: how validation works for form authors in Designer."
---

# Validation basics

Validation checks whether user input meets the form's rules. Most day-to-day work happens on the **Rules** tab for each field.

## Required fields

<img src="/assets/guide/workspace/main-tab-plain.png" alt="Main tab where Required can be set on a field." />

The **Required** checkbox on **Main** and the **Required** entry on **Rules** edit the same validation rule. Configuring either one is
enough; you do not need both.

Use **Required** on **Main** as a quick toggle, or open **Rules** to review the rule and its message. **Non empty** is a separate validation
rule with its own settings; add it only when you specifically need that rule. Other rules include **Email**, **Min**, and **Max**.

## Rule picker

<img src="/assets/guide/first-form/highlight-rules-tab.png" alt="Rules tab with Add a validation rule." />

When you click **Add a validation rule**, you may see:

- **Non empty**, **Length**, **Min**, **Max**
- **Regex**, **Email**, **Url**
- **Code** (a validator for supported string fields, written in Designer and usually developer-reviewed)

Each rule can include a **Message** users see when validation fails.

**Code** here means a field validation rule, not an action. **Code** actions and app-provided **Custom** actions are configured separately
on a component's **Actions** tab.

## Auto Validate

<img src="/assets/guide/first-form/rules-tab-plain.png" alt="Rules tab showing Auto Validate." />

**Auto Validate** on **Rules** runs checks as users interact with the field. When off, validation may run on submit or when you click
**Validate** in Preview.

## Test validation

<img src="/assets/guide/preview-and-handoff/preview-mode-plain.png" alt="Preview mode for testing validation." />

1. **Preview** the form.
2. Trigger errors (empty required fields, invalid email).
3. Fix messages on **Rules** until they are clear for end users.

## Summary

Per-field rules live on **Rules**. **Required** on **Main** is a shortcut to the same rule. Pick built-in types before a **Code**
validator, and verify messages in **Preview**.

## See also

- [Add validation on your first form](/your-first-form/add-validation-on-your-first-form)
- [Validation (developer depth)](docs:formengine-designer/features/validation)
