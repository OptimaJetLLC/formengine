# How to Write Release Notes

This document describes what should be included in release notes and how to create them.

## Release Notes Content

Release notes for a product version should contain two parts:

1. User-facing section
2. Technical section

### User-Facing Section

This section contains the essence of the update, usually 1–3 sentences if the release is small. It is important to describe what problem this release solves for the user.

Focus on the benefit for the application user, not on the technology. If there are illustrative images, they should also be included.

**This section must answer why the user should upgrade to this release.**

If the release includes security fixes, this must be mentioned.

If there are breaking changes, they should be described in terms of what they mean for the user.

### Technical Section

The technical section is a list of completed tasks from the tracker. Typically, one sentence per task.

---

## Release Notes Structure

Use the following structure when writing release notes. Some parts are mandatory, others are optional.

- Product version, e.g. *FormEngine 1.2.3*, *WorkflowEngine 4.5.6*. **Required**
- Release date, e.g. *December 11, 2025*. **Required**
- **Overview** — summary of the update (user-facing part). **Required**
- **Key features** — main features (user-facing). If there is only one feature, it can be described in the Overview instead.
- **Changelog** — technical part, **required**, divided into the following sections (a section can be omitted if empty):
  - **Breaking changes** — list of incompatible changes
  - **Update instructions** — instructions or a link for updating
  - **Features** — new features included in the release
  - **Enhancements** — improvements in performance, reliability, UI, UX
  - **Bug fixes** — fixed issues
  - **Resources** — documentation updates
  - **Security** — security updates, including dependencies
  - **Chore** — dependency updates excluding security-related ones

---

## Recommendations

- Create a separate file for each release.
- Use frontmatter headers so that newer releases appear above older ones. Example:

```markdown
---
sidebar_position: -70900
sidebar_label: 7.9.0. JSON Schema support
title: FormEngine 7.9.0
description: New JSON schema, patched designer
---
```

The version consists of three numbers: major, minor, and patch, separated by dots.

To ensure newer releases appear higher, you can set `sidebar_position` as a negative number smaller than the previous release. In this example, the value is calculated as:

major * 10000 + minor * 100 + patch

and then prefixed with a minus sign.

- `sidebar_label` — version and short description of key features
- `title` — product name and version
- `description` — short description of the release

## Example

```markdown
---
sidebar_position: -70900
sidebar_label: 7.9.0. JSON Schema support
title: FormEngine 7.9.0
description: New JSON schema, patched designer
---

_December_ 11, 2025

## Overview

In this release, FormEngine adds the ability to work with form's JSON using a JSON schema. Now you can validate form's JSON using the schema
in your favorite IDE, or directly in the designer. The JSON schema supports your custom components!

![Form's JSON 05](/assets/forms-json/forms-json-05.png)

Also in this release, preparatory work has been done to reduce the size of the core package so that your applications are even smaller.

### Why update

Upgrade to start working with the JSON schema. This release also contains a fix of the Designer's issue with the Picker property
editor (drop-down list).

## Changelog

### Update instructions

Update the packages to version 7.9.0, no additional actions are required.

### Features

- Added `FormViewerLite`, a lightweight version of the form viewer that uses the noop localization engine by default.
- Added JSON Schema validation.

### Enhancements

- Added a hint for the orientation button in mobile/tablet mode.
- Removed the explicit `includes` from `tsconfig.json`. This makes it easier to configure the TypeScript compiler.

### Bug fixes

- Fixed an issue where the Picker property editor did not update items.

### Resources

- Added [instructions](/forms-json#json-schema) for working with the JSON schema.

### Security

- Bumped `next` from 15.4.7 to 15.4.8 in examples.
```
