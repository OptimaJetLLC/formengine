# FormEngine Core Documentation Guidance

These pages are the canonical developer guides for the `@react-form-builder/core` package.

- Verify behavior and API names against current source before changing an explanation or example.
- For a new page or substantial rewrite, read the [FormEngine Core authoring guide](../../authoring/formengine-core.md) before drafting.
- Read the [SEO authoring guide](../../authoring/seo.md) only when the task explicitly requires search optimization.
- Prefer a runnable `jsx live` example when the feature can be demonstrated without additional infrastructure.
- Link every referenced public type, member, or prop to its generated API-reference entry when practical.
- Keep examples focused on the feature being explained. Omit unrelated form metadata and localization fields.
- Multi-line `fnSource`: template literal with aligned continuations in JS/TS; in JSON `\n` with no extra indent and the value on the next
  line after `fnSource` when clearer.
- Check neighboring pages for terminology, imports, and the current `FormViewer` example pattern.
