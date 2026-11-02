# SEO Authoring Guide

Use this guide only when a task explicitly asks for a new search-focused article or an SEO rewrite. Technical accuracy and reader value take
priority over keyword coverage.

## Audience and goal

Write for developers who need to understand, evaluate, or implement a FormEngine feature. The article should answer a concrete search intent
and remain useful when read outside a search-results context.

Avoid marketing filler, unsupported advantages, keyword stuffing, and hypothetical internal links.

## Plan the article

1. Identify the primary intent: informational, how-to, problem-solving, or comparison.
2. Choose one primary phrase, a small set of closely related phrases, and the questions developers actually ask.
3. Confirm that the repository contains enough product evidence and working examples to answer the intent accurately.
4. Outline the reader journey: problem, applicability, setup, implementation, example, limitations, common errors, and next steps.

Do not invent search-volume or competition estimates without a source. If keyword research data is unavailable, describe relevance rather
than presenting guessed metrics.

## Metadata

Prepare these elements before drafting:

- An H1 that states the topic clearly and includes the primary phrase naturally.
- A short kebab-case slug.
- A concise meta title suitable for search results.
- A benefit-focused description of roughly 150 to 160 characters.
- Tags that match established documentation terminology.

Human readability takes precedence when an exact character target would make metadata awkward or misleading.

## Drafting

- State the problem and intended reader in the introduction.
- Answer why and when before showing implementation details.
- Use the smallest complete code sample that demonstrates the behavior.
- Explain limits, prerequisites, and failure modes near the affected step.
- Use headings that describe the reader's question rather than repeating keyword variants.
- Add internal links only to existing, relevant pages.
- Link API details to the generated reference instead of duplicating them.

Typical articles are 1,500 to 2,500 words, but the subject determines the appropriate length. Do not add sections merely to reach a target.

## Final review

Check that:

- The H1, introduction, and metadata describe the same intent.
- Related terms appear naturally without repetitive phrasing.
- Every technical claim is supported by source code, tests, or existing canonical documentation.
- Code samples follow the relevant package API and repository conventions.
- Internal and cross-site links resolve.
- The conclusion gives a practical next step instead of repeating the introduction.

When requested, provide alternative titles or related-article ideas separately from the published page so editorial notes do not leak into
the documentation content.
