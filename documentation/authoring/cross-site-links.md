# Cross-site Link Conventions

The developer documentation and Form Author Guide are built as separate sites. Use their link shorthands so local, preview, and production
builds can resolve the correct base URL.

## Developer documentation to Form Author Guide

Use `designer-guide:section/page` in files under `documentation/docs/`. The Docusaurus remark plugin rewrites the shorthand using
`DESIGNER_GUIDE_URL`.

The default target is `https://learn.formengine.io/`. For local development, use one of these values:

| Environment         | Value                             |
| ------------------- | --------------------------------- |
| Local Caddy         | `https://learn.formengine.local/` |
| Direct Astro server | `http://localhost:4321/`          |

The implementation lives in `documentation/website/src/lib/designer-guide-base.mjs` and
`documentation/website/src/constants/siteLinks.ts`.

## Form Author Guide to developer documentation

Use `docs:path/under/docs` in files under `designer-guide/content/`. For example:

```markdown
[Designer actions](docs:formengine-designer/features/actions)
```

Configure the target with `MAIN_DOCS_URL` in `designer-guide/.env`. The default is `/documentation/`; the implementation lives in
`designer-guide/src/lib/main-docs-base.mjs`.

## API references and related links

- Link API types and members to their `/api-reference/...` pages instead of repeating API reference content.
- Use descriptive prose as link text. Do not wrap link text in inline code.
- Add three to five relevant links to the end of a long developer guide when they help the reader continue the task.

## Form Author Guide search

Algolia DocSearch uses `designer-guide/docsearch.config.json`. Builds can override its settings with `DOCSEARCH_APP_ID`,
`DOCSEARCH_API_KEY`, and `DOCSEARCH_INDEX_NAME`; resolution is implemented in `designer-guide/src/lib/docsearch-base.mjs`.
