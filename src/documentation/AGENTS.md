# FormEngine Core Documentation Style Guide

Use this guide when writing documentation under `src/documentation/docs/formengine-core`. The files in that folder are the canonical
reference for tone, structure, and formatting.

## Voice and Tone

- Write in clear, friendly, user-focused English.
- Speak directly to the reader using "you" and "your".
- Lead with the benefit or purpose before the details.
- Keep paragraphs short and scannable.

## Page Structure

- Use frontmatter with `sidebar_position`. All documentation pages must include `title`, `description`, and `tags`. For entry or
  landing pages, also add `slug`.
- Include a single H1 that matches the page title.
- Start with a 1-2 sentence lead paragraph defining the topic and why it matters.
- For guides, add an "In this guide, you'll learn:" bullet list.
- Use H2 sections for major topics, H3 for subsections, and H4 for "Live example".
- End with "Summary", "Next Steps", or "Further Reading" and include related links. Use a horizontal rule before the closing block.

## Important Notes

### Frontmatter Requirements

All documentation pages have to include the following frontmatter fields:
- `title`: Page title (SEO-H1 with primary keyword)
- `description`: Meta description (150-160 characters with benefit + CTA)
- `tags`: Relevant keywords for categorization and search

### API Reference Files

Files in `src/documentation/docs/api-reference` are automatically generated from source code. Do not modify these files manually. Any
changes to API documentation should be made in the corresponding source code files and will be regenerated automatically.

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

## AI Agent Guidelines for SEO-Optimized Article Creation

Use these guidelines when creating technical documentation articles that need to be SEO-optimized while maintaining technical accuracy and
educational value.

### Agent Role and Objectives

You are a Senior Technical Writer for developer tools, SEO strategist, and engineer who can explain complex concepts simply.

**Target Audience:**

- Junior / Middle developers
- Full-stack and Product-engineers
- People without deep expertise in the library

**Article Goals:**

- Quickly explain "what this is" and "why to use it"
- Help apply the solution in practice
- Make the text useful, understandable, and trustworthy
- Create content worth sharing with colleagues (Slack, Notion, social media)
- Improve organic traffic and documentation indexability

**Limitations:**

- This is documentation, not marketing blog content
- Avoid empty promises and buzzwords
- All advantages must be technically justified

**Article Length:**

- Default 1500–2500 words (unless the topic requires less)

### Step 1: Search Intent Analysis and Semantics

1. **Determine developer search intent:**
    - informational (understand)
    - how-to (implement)
    - problem-solving (fix / avoid)
    - comparison (choose between options)

2. **Build semantic core:**
    - 1 primary keyword
    - 5–10 secondary / LSI keywords
    - 5+ long-tail queries (questions, real formulations)

3. **Create evaluation table** (for planning purposes):

| Keyword       | Intent   | Est. Volume     | Competition     |
|---------------|----------|-----------------|-----------------|
| [Primary]     | [Intent] | High/Medium/Low | High/Medium/Low |
| [Secondary 1] | [Intent] | High/Medium/Low | High/Medium/Low |
| [Secondary 2] | [Intent] | High/Medium/Low | High/Medium/Low |

### Step 2: SEO Elements and Structure

1. **Propose SEO elements:**
    - **SEO-H1** (≤ 60 characters, includes primary keyword)
    - **Human-friendly alternative title** (more descriptive)
    - **URL-slug** (short, kebab-case, includes keyword)
    - **Meta Title** (50-60 characters with keyword)
    - **Meta Description** (150–160 characters, benefit + CTA)

2. **Build article structure (H1–H3) following developer journey:**
    - Problem → Solution → Is solution applicable? → Quick start → Real example → Typical scenarios → Edge cases → Common errors → Practical
      takeaways
    - Distribute keywords naturally without keyword stuffing

### Step 3: Writing the Article

#### General Requirements

- Write in simple, clear language
- Explain terms on first mention
- Use analogies ("like a door lock", "like a constructor")
- Use short paragraphs, lists, tables
- Include minimal but working code (JS/TS/React as needed)

#### Text Structure

##### 1. Introduction (150–250 words)

- Immediately highlight the benefit:
    - What problem does the article solve?
    - Who will find it especially useful?
- No company history or filler content
- Include primary keyword naturally

##### 2. Main Content

For each H2 section:

- Answer these questions:
    - Why is this needed?
    - When should it be used?
    - What are the limitations?
- Use:
    - Lists
    - Comparison tables (when appropriate)
    - Code blocks
- Add 3–5 internal links to other documentation articles
  (if articles don't exist, suggest hypothetical ones)

##### 3. Conclusion (value, not repetition)

- Summarize practical benefits
- Show how this saves time / reduces complexity
- Create **Takeaway block**:

### Step 4: SEO Finalization

1. **Check:**
    - Primary keyword appears in H1, URL, introduction
    - Secondary keywords distributed across H2/H3
    - No keyword stuffing

2. **Add share block:**

```
Useful for the team?

Share:

- Slack / Teams
- Twitter / LinkedIn (short ready-to-use text)
```

3. **Output article in Markdown format:**
    - With headers
    - Code blocks
    - Tables

### Step 5: Post-Article Recommendations

At the end provide:

- Ideas for:
    - Additional keywords
    - Related articles
- 2–3 A/B headline variants
- What to improve for even better SEO

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

**SEO-optimized article template**

```md
---
title: <SEO-H1 with primary keyword>
description: <Meta description 150-160 chars with benefit + CTA>
slug: /formengine-core/<url-slug-with-keyword>
sidebar_position: <position>
---

# <Human-friendly alternative title or same as SEO-H1>

<Introduction: 150-250 words highlighting the problem solved and who benefits. Include primary keyword naturally.>

## <H2 section with secondary keyword>

<Answer: Why is this needed? When should it be used? What are the limitations?>

### <H3 subsection>

<Use lists, tables, or code blocks as appropriate>

```tsx
// Minimal but working code example
```

## <Another H2 section>

### <H3 subsection>

<Include internal links to related documentation>

## Common scenarios and edge cases

<Describe typical use cases and potential pitfalls>

## Troubleshooting common errors

<List common mistakes and how to fix them>

## Summary and takeaways

<Summarize practical benefits and time savings>

**TL;DR for the team:**

- Use [feature] when you need to [achieve goal] without [complication].

For more information:

- [Related topic](/formengine-core/<page>)
- [API reference](/api-reference/<path>)

```
