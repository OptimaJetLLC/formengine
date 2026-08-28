# Designer Guide Agent Guidelines

## Project Overview

Designer Guide is the FormEngine author documentation site built with Astro + Starlight. Content lives in `content/` as markdown files.

## Pre-Push Checklist

**Always run `npm run check:all` before committing and pushing changes.** Fix all errors related to your changes before pushing:

- `check:links` - internal link integrity
- `check:tsc` - TypeScript errors
- `check:eslint` - ESLint errors
- `check:stylelint` - CSS lint errors

## Key Rules

- **Slug must match H1 in kebab-case.** The filename (without `.md`) is the URL slug. When renaming a file, run `npm run check:links` and fix all broken references.
- **Do not wrap demo `<a>...</a>` Try it links.** MDX requires the opening tag, label, and `</a>` on
  one line. Those URLs may exceed 140 characters; Biome does not format markdown.
- **All code fences must have a language tag** (`text`, `json`, `javascript`, etc.).
- **All content, comments, and code in English only.**
- **Prefer TypeScript for new scripts.** Add Node scripts under `scripts/` as `.ts` first (run with `node scripts/name.ts`). Use `.mjs` only when TypeScript cannot run in that context.
- **Do not commit** unless explicitly asked.

## Commands

```bash
npm run dev            # Start dev server
npm run build          # Production build
npm run check:all      # Run all checks (links, tsc, eslint, stylelint)
npm run check:links    # Check internal link integrity only
```
