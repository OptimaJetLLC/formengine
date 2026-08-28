---
title: "When to involve developers"
description: "Know when authors can create Code actions and when developers must provide Custom actions, embedding, APIs, and licenses."
---


# When to involve developers

You can build and test most forms in Designer. Some tasks need your technical team.

## Authors usually own

- Layout, labels, and field keys
- Validation rules from the **Rules** picker
- Creating and naming **Code** actions in Designer for approved form logic
- Attaching available **Common**, **Code**, and **Custom** actions to component events
- **Preview** testing and export for review

## Code versus Custom actions

| Type       | Where it is defined                          | Author's role                                  |
| ---------- | -------------------------------------------- | ---------------------------------------------- |
| **Code**   | In Designer and stored with the form         | Create, name, edit, and attach approved logic  |
| **Custom** | In the host application's `actions` property | Attach available actions; request new ones     |

## Developers usually own

| Topic                                           | Why                                                                                |
| ----------------------------------------------- | ---------------------------------------------------------------------------------- |
| Installing Designer in your app                 | [Installation](docs:formengine-designer/getting-started/installation)              |
| Form storage and APIs                           | [Form storage](docs:formengine-designer/features/form-storage)                     |
| Registering **Custom** actions and integrations | [Actions](docs:formengine-designer/features/actions)                               |
| Custom components in the palette                | [Custom components](docs:formengine-designer/features/custom-components)           |
| Computed properties and complex **Render When** | [Computed properties](docs:formengine-designer/features/computed-properties)       |
| License keys for paid features                  | [License key](docs:formengine-designer/license-key)                                |
| Designer UI customization                       | [Designer customization](docs:formengine-designer/features/designer-customization) |

## Hand off cleanly

Use [Hand off to your technical team](/help/hand-off-to-your-technical-team) with export files and a field key list.

## Summary

Use the Form Author Guide for authoring tasks. Authors can create **Code** actions in Designer. Involve developers to register new
**Custom** actions or when logic needs APIs, secrets, or application code. Do not change production **Code** actions or form validators
without review.

## See also

- [Custom components overview](/advanced-topics/custom-components-overview)
- [View and edit form JSON](/advanced-topics/view-and-edit-form-json)
- [Hand off to developers](/help/hand-off-to-your-technical-team)
