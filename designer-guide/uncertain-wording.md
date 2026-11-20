# Uncertain wording in the Form Author Guide

Rescan of `designer-guide/content/` after the `uncertain wording` pass (`da2be4ec8`).
Line numbers are 1-based in the current files.

Policy now: describe a typical Designer. Do not hedge stock Designer controls with `when available`,
`if available`, or `when supported`. Config and license live once on
`meet-the-designer/what-is-formengine-designer.md`. Hedge a step only when the product has a
real toggle (form storage, preset license).

Gone from this scan (no remaining hits): `when available`, `if available`, `when supported`,
`if present`, `if shown`, `in some builds`.

## Canonical note (keep)

`content/meet-the-designer/what-is-formengine-designer.md:12-16` — `:::info note` that this guide
shows a typical Designer; teams can hide UI; some capabilities need a license; mismatches go
to developers.

## Remaining parenthetical hedges

| Phrase            | File / line                                                  | Status       |
| ----------------- | ------------------------------------------------------------ | ------------ |
| `(when enabled)`  | `your-first-form/create-your-first-form.md:37`               | Intentional  |
| `(when licensed)` | `meet-the-designer/canvas-drag-and-drop.md:45`               | Intentional  |
| `(if used)`       | `preview-and-handoff/testing-checklist-before-handoff.md:38` | Out of scope |

### Intentional

- `your-first-form/create-your-first-form.md:37` —
  `## Use the Forms tab (when enabled)` (form storage toggle)
- `meet-the-designer/canvas-drag-and-drop.md:45` —
  `**Preset** bookmark (when licensed)`

### Leftover (still hedge stock UI)

- `your-first-form/preview-your-first-form.md:30` —
  `Click your **Save** or submit button if configured.`
- `your-first-form/add-validation-on-your-first-form.md:42` —
  `if the editor offers a **Message** field`

## Form storage / missing Forms (intentional)

These match the intro note: storage can be off. Keep one page-level note, not per-step hedges.

- `your-first-form/create-your-first-form.md:46` — `If **Forms** is missing`
- `your-first-form/create-your-first-form.md:57-58` — `Storage features may vary by deployment.`
- `meet-the-designer/use-the-left-panel-tabs.md:59-61` — `If **Forms** is missing`
- `meet-the-designer/use-the-left-panel-tabs.md:72` — `Whether **Forms** appears depends on storage configuration.`
- `manage-forms/work-with-multiple-forms.md:10-13` — `If you do not see **Forms**`
- `manage-forms/work-with-multiple-forms.md:56` — `when storage is enabled`
- `manage-forms/save-export-and-import-forms.md:3` — `when storage is enabled` (description)
- `manage-forms/save-export-and-import-forms.md:64` — `when storage is enabled`
- `manage-forms/duplicate-and-rename-forms.md:8` — `when storage is enabled`

## Other deployment / host wording

Not the `(when available)` pattern. Host save, publish, action lists, and library names still
vary.

- `manage-forms/save-export-and-import-forms.md:15` —
  `The exact list depends on your deployment`
- `preview-and-handoff/export-and-share-your-form.md:19` —
  `Saving behavior depends on your host app`
- `behavior-and-validation/actions-basics.md:18` —
  `The list depends on your deployment.`
- `form-structure-and-layout/form-structure-and-containers.md:24` —
  `Names depend on your **Component library**.`
- `meet-the-designer/light-and-dark-theme.md:20` —
  `depending on component library`
- `meet-the-designer/preview-and-edit.md:37` —
  `when localization is enabled`
- `appearance-and-readability/localization-for-form-authors.md:25` —
  `when localization is configured`
- `manage-forms/preset-components.md:55` —
  `Availability depends on license and deployment.`
- `fields-and-data/tables-and-repeating-rows.md:24` —
  `when your library provides a table component`

## Counts (current)

| Bucket                                                        | Occurrences |
| ------------------------------------------------------------- | ----------- |
| Canonical intro note                                          | 1           |
| Parenthetical, intentional (`when enabled` / `when licensed`) | 2           |
| Leftover per-step hedges                                      | 5           |
| Form storage / missing **Forms** notes                        | 10          |
| Other deployment / host / library wording                     | 10          |

## Out of scope

Not listed as availability hedges:

- User-state optionals: `if needed` (Expand all), `if used` (repeaters).
- Confirmations: `if the app asks`, `if prompted`.
- Pedagogical `usually` (authors vs developers, typical keys).
- Condition examples (`If **Account type** = Personal`).
- Site README (`designer-guide/README.md`), not guide articles.
