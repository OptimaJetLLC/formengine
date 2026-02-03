# FormEngine Core Documentation Style Guide

Use this guide when writing documentation under `src/documentation/docs/formengine-core`. The files in that folder are the canonical
reference for tone, structure, and formatting.

## Voice and Tone

- Write in clear, friendly, user-focused English.
- Speak directly to the reader using "you" and "your".
- Lead with the benefit or purpose before the details.
- Keep paragraphs short and scannable.

## Page Structure

- Use frontmatter with `sidebar_position`. Add `title`, `description`, and `slug` for entry or landing pages.
- Include a single H1 that matches the page title.
- Start with a 1-2 sentence lead paragraph defining the topic and why it matters.
- For guides, add an "In this guide, you'll learn:" bullet list.
- Use H2 sections for major topics, H3 for subsections, and H4 for "Live example".
- End with "Summary", "Next Steps", or "Further Reading" and include related links. Use a horizontal rule before the closing block.

## Formatting Conventions

- Prefer short paragraphs, bullet lists, and numbered steps.
- Use **bold** to introduce key terms or list labels.
- Use inline code for property names, types, component names, and file names.
- Use tables for property/validator lists (header row + separator row).
- Use Docusaurus admonitions where helpful:
  - `:::info note`, `:::info Important`, `:::warning`, `:::tip info`
  - Close with `:::` on its own line.
- Do not use bold, italic, or code formatting in headings.

## Code Examples

- Use `json` blocks for form definitions and `jsx live` blocks for runnable examples.
- Add a `jsx live` example whenever a section can be demonstrated without extra setup. Prefer live examples over static snippets when
  possible.
- Use `tsx` or `typescript` for TypeScript snippets and `bash` for commands.
- Keep JS/TS examples semicolon-free with single quotes. Keep JSON in double quotes.
- For multi-line `fnSource` values in JS/TS examples, prefer template literals over string concatenation and align subsequent lines with
  leading spaces so the code appears vertically aligned in the snippet.
- For multi-line `fnSource` values in JSON examples, use `\n` escapes with no extra leading spaces and place the string value on the next
  line after the `fnSource` key when it improves readability.
- When JSON examples include expression strings (for example `renderWhen.value` or `fnSource`), highlight the lines that the section is
  explaining. Use code fence line highlighting so the reader can immediately spot the relevant expression.
- Use 2-space indentation in all examples.
- Highlight key lines with `json {12-34}` or `json lines {}` when it improves clarity.
- Add `title='fileName.ext'` to code fences when showing file contents.
- Follow the common FormViewer example pattern:
  - Define `const form = { ... }`
  - `const getForm = useCallback(() => JSON.stringify(form), [form])`
  - Render `<FormViewer view={muiView} getForm={getForm} />`
- In jsx live examples, use React hooks without the 'React.' prefix (e.g., `useState`, not `React.useState`).

## Link Style

- Use absolute internal links (for example, `/formengine-core/validation`).
- Link to API reference types and members using `/api-reference/...` paths.
- When referencing props, types, or API members anywhere on the page, link to the API reference entry instead of repeating the API text.
  This
  applies to tables, lists, prose, callouts, and captions wherever it is practical.
- Include a short "For more information" list with 3-5 related links on long pages.
- The link text should not be formatted as a code! An example of how NOT to do:
  [`tooltipType`](/api-reference/@react-form-builder/core/classes/Form#tooltiptype).

## Templates

**Guide page template**

```md
---
sidebar_position: 0
title: <Title>
description: <One sentence summary of the value>
slug: /formengine-core/<slug>
---

# <Title>

<Lead paragraph. 1-2 sentences.>

In this guide, you'll learn:

- <Goal 1>
- <Goal 2>
- <Goal 3>

## Overview

<Short description of the concept and a short list of benefits.>

## <Section Title>

### <Subsection Title>

<Explain the concept and define key terms.>

```json
{
  "form": {
    "key": "Screen"
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": []
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

## Best Practices

- <Best practice 1>
- <Best practice 2>

## Troubleshooting

- <Common issue 1>
- <Common issue 2>

## Summary

- <Key takeaway 1>
- <Key takeaway 2>

---

For more information:

- [Related topic](/formengine-core/<page>)
- [API reference](/api-reference/<path>)

```

**Step-by-step tutorial template**

```md
---
sidebar_position: 0
title: <Title>
description: <One sentence summary of the goal>
---

# <Title>

<Lead paragraph. 1-2 sentences.>

## Prerequisites

- <Prerequisite 1>
- <Prerequisite 2>

## Step 1: <Step title>

### 1.1 <Substep>

```bash
<command>
```

### 1.2 <Substep>

```tsx title='<FileName.tsx>'
<code>
```

## Step 2: <Step title>

### 2.1 <Substep>

```json
<form json>
```

## Next Steps

1. [Related guide](/formengine-core/<page>)
2. [Related feature](/formengine-core/<page>)

```
