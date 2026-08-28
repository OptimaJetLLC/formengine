---
title: "Read-only and disabled fields"
description: "Show data users cannot edit with Read only or Disabled: use Preview to confirm behavior."
---

# Read-only and disabled fields

Sometimes users should **see** a value but not change it (account ID, approved amount). Use **Read only** or **Disabled** on **Main** for the selected field.

## Set

<img src="/assets/guide/workspace/main-tab-plain.png" alt="Main tab with read-only and disabled options." />

1. Select the field.
2. Open **Main**.
3. Enable **Read only** or **Disabled** (checkboxes on many text fields).

Not every component supports both settings. If a setting is missing, check the component documentation or ask your technical team.

## Understand the difference

| Setting       | User experience                              |
| ------------- | -------------------------------------------- |
| **Read only** | Shows the value but does not allow editing   |
| **Disabled**  | Blocks interaction and usually appears muted |

The exact appearance and keyboard behavior depend on the component library. Test the component your form actually uses.

FormEngine does not automatically remove a disabled field from form data. Both read-only and disabled values remain available to actions
and calculations, so a submit action can include either value. The submit action or host app decides which keys are sent. If a value must
be excluded, agree on that rule with your technical team.

## When to use

| Situation                              | Typical setting                                                        |
| -------------------------------------- | ---------------------------------------------------------------------- |
| Display calculated or system value     | **Read only**                                                          |
| Temporarily make a control unavailable | **Disabled**                                                           |
| Hidden until relevant                  | [Show or hide fields](/simple-data-driven-screens/show-or-hide-fields) |

## Check in Preview

1. Give the field a known value.
2. Enable **Read only** or **Disabled**, then open **Preview**.
3. Confirm the user cannot change the value and that the control looks appropriate for its state.
4. Open **Data** and confirm the value is still present.

Developers: See [Disabled and read-only](docs:formengine-designer/features/disabled-and-read-only).

## Summary

Use **Read only** when users should see a value without editing it. Use **Disabled** when the control should be unavailable. Both states keep
the value in FormEngine data; your submit action or host app controls what is sent.

## See also

- [Labels and help text](/fields-and-data/labels-and-help-text)
- [Disabled and read-only (developers)](docs:formengine-designer/features/disabled-and-read-only)
