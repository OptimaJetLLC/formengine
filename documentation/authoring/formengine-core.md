# FormEngine Core Authoring Guide

Use this guide when creating a page or substantially rewriting content under `documentation/docs/formengine-core/`. Nearby published pages
remain the best reference for terminology and current APIs.

## Audience and voice

Write for junior and mid-level developers, full-stack developers, and product engineers who may be new to FormEngine.

- Address the reader as "you" and "your".
- Lead with the problem the feature solves and when to use it.
- Explain a term on first use.
- Keep paragraphs short and use concrete examples.
- Explain limitations and edge cases without marketing claims.

## Page structure

1. Add frontmatter with `title`, `description`, `tags`, and `sidebar_position`. Add `slug` for entry or landing pages.
2. Add one H1 that matches the title.
3. Open with one or two sentences explaining the topic and its value.
4. Add an "In this guide, you'll learn:" list when the page contains several distinct tasks.
5. Use H2 for major topics, H3 for subsections, and H4 for a live example within a subsection.
6. Close with a concise summary and useful related links.

Use a horizontal rule before the final related-links block when it helps separate that block from the article.

## Formatting

- Use bold text for UI labels and list labels.
- Use inline code for property names, types, component names, and file names.
- Do not use bold, italic, or inline code in headings.
- Use aligned Markdown tables for property and validator lists.
- Use Docusaurus admonitions such as `:::info`, `:::warning`, and `:::tip` when the information changes how the reader should act.
- Use numbered steps for procedures and bullet lists for parallel facts.

## Code examples

- Use `json` for form definitions, `jsx live` for runnable examples, `tsx` or `typescript` for TypeScript, and `bash` for commands.
- Add a language to every code fence and a `title='fileName.ext'` attribute when the fence represents a file.
- Use two-space indentation, semicolon-free JavaScript and TypeScript, single quotes in code, and double quotes in JSON.
- Highlight the lines being discussed when a JSON expression such as `renderWhen.value` or `fnSource` is the focus.
- Keep examples minimal while preserving enough context to run or adapt them.

For runnable viewer examples, follow this shape:

```jsx live
function App() {
  const form = {
    form: {
      key: 'screen',
      type: 'Screen',
      children: []
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

Use hooks without the `React.` prefix in live examples.

## Form JSON

- Omit the top-level `version` field unless versioning is the subject of the example.
- Include localization fields only when the page explains localization.
- Keep component keys descriptive and stable across the explanation.
- Multi-line `fnSource` in JS/TS: template literal with aligned continuations.
- Multi-line `fnSource` in JSON: `\n` with no extra indent; put the value on the next line after `fnSource` when clearer.

## Links

- Use absolute Docusaurus paths for developer-documentation links.
- Link referenced props, types, and API members to `/api-reference/...` wherever practical.
- Follow the [cross-site link conventions](cross-site-links.md) for Form Author Guide links.
- Add three to five related links to long pages when they provide a useful next step.

## Starting template

```markdown
---
sidebar_position: 0
title: <Title>
description: <One-sentence description of the reader benefit>
tags:
  - <tag>
---

# <Title>

<Explain the topic and why it matters.>

In this guide, you'll learn:

- <Goal 1>
- <Goal 2>

## <Major topic>

<Explain when to use the feature and any limitations.>

### <Procedure or concept>

<Provide steps, a table, or a minimal example.>

## Summary

<State the practical result.>

---

For more information:

- [Related topic](/formengine-core/<page>)
- [API reference](/api-reference/<path>)
```

When the task explicitly requires search-engine optimization, also read the [SEO authoring guide](seo.md).
