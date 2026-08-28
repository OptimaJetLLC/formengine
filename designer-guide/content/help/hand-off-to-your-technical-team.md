---
title: "Hand off to your technical team"
description: "What to export, document, and ask developers when your form is ready for embedding or production."
---


# Hand off to your technical team

Before production, give developers what they need to embed the form and connect data.

## Before you hand off

1. Complete the [testing checklist](/preview-and-handoff/testing-checklist-before-handoff).
2. Run [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset) once more.
3. Note **Component library** (Material UI, RSuite, etc.).

## What to send

| Item            | How                                                                                                                  |
| --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Form definition | **Menu** → **Download** or **Export forms** ([Save, export, and import](/manage-forms/save-export-and-import-forms)) |
| Field keys      | List from **Preview** **Data** or your key spreadsheet                                                               |
| Dynamic fields  | Which keys need API or database values ([Prefill](/simple-data-driven-screens/prefill-a-form))                       |
| Actions         | Which buttons run validate/submit/custom ([Action order](/behavior-and-validation/action-order-on-buttons))          |
| Locales         | Languages and untranslated strings ([Localization](/appearance-and-readability/localization-for-form-authors))       |

## What to ask developers

- Where will this form run (URL, app module)?
- Who owns save/submit to the server?
- Are custom actions already registered for our buttons?
- Do we need new components or only this JSON?

## What stays with authors

You can keep iterating on labels and validation in Designer after the first embed. Agree on a review process before new exports reach
production.

## Summary

Send the exported JSON, a key list, and notes on dynamic data and actions. Use the testing checklist to resolve issues found in **Preview**
before handoff.

## See also

- [When to involve developers](/advanced-topics/when-to-involve-developers)
- [Forms JSON (developers)](docs:formengine-designer/features/forms-json)
- [FAQ: getting form JSON](docs:formengine-designer/faq/getting-form-json)
