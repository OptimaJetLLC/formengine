# How to Write Release Notes

This document combines the project release-notes structure and content rules with tone-of-voice guidance for open-source-style notes. **Where guidance conflicted, the original [release-notes-guidelines.md](./release-notes-guidelines.md) takes precedence.**

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

## Tone of Voice

Release notes should sound clear, professional, and developer-friendly, balancing technical accuracy with readability. **Apply this tone within the structure and mandatory sections above** (for example, user-facing copy stays benefit-focused per the guidelines; changelog lines stay factual and scannable).

### Core Principles

1. **Concise but informative** — Communicate changes in as few words as possible without losing meaning. Avoid unnecessary filler or marketing language.

2. **Neutral and objective** — Do not exaggerate impact. Avoid hype words like "amazing," "revolutionary," or "game-changing." Let the changes speak for themselves.

3. **Technical but accessible** — Assume the reader is a developer, but not necessarily familiar with internal context. Use correct technical terminology; briefly clarify non-obvious changes when needed.

4. **Action-oriented** — Prioritize what readers need to *know* and *do*: what changed, why it matters, and what action (if any) is required.

5. **Structured and scannable** — Use consistent formatting so readers can skim: short bullet points, group by type (aligned with the changelog sections above), and start each item with a strong verb when possible.

### Writing Style

**Prefer:**

- Active voice
- Present tense
- Specific descriptions

**Avoid:**

- Marketing language (except where the guidelines require clearly stating upgrade benefits in the Overview — still without hype)
- Internal jargon without explanation
- Long paragraphs
- Vague statements ("improved performance" → specify how, if known)

### Preferred Patterns

- "Add support for …"
- "Fix issue where …"
- "Improve handling of …"
- "Deprecate … in favor of …"
- "Remove … (breaking change)"

### Breaking Changes

Be explicit, direct, and slightly more instructive. This aligns with the **Breaking changes** subsection in the changelog:

- Clearly label as **Breaking Change** (or **Breaking:** in a bullet when space is tight)
- Explain impact
- Provide migration guidance when possible

Examples:

- "**Breaking:** Remove `X` API. Use `Y` instead."
- "**Breaking:** Rename `foo` to `bar`. Update imports accordingly."

### Consistency

- Use the same terminology across entries
- Prefer deterministic phrasing (avoid synonyms for the same concept)
- Keep similar changes phrased similarly

### Tone Examples

**Good:**

- Add support for custom config paths
- Fix crash when loading empty datasets
- **Breaking:** Remove deprecated `init()` method. Use `create()` instead

**Bad:**

- Introduced an awesome new way to configure things
- Fixed some bugs
- Made improvements to performance

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
