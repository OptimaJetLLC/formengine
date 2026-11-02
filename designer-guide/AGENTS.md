# Form Author Guide Guidance

The Form Author Guide is the Astro and Starlight site for people who create forms in the visual Designer. Content lives in `content/`.

## Content rules

- The filename without `.md` is the URL slug. Keep it in kebab-case and aligned with the page H1.
- Keep demo `<a>...</a>` links on one line. MDX requires the opening tag, label, and closing tag together; these URLs may exceed 140
  characters.
- Add a language tag to every code fence.
- Use `:toolbar-icon[name]:` in Markdown, where `name` is `reveal`, `nearby`, `add`, `clone`, `preset`, `remove`, or `open-actions`.
- In MDX, use `<ToolbarIcon name="clone" />` from `src/components/ToolbarIcon.astro`.
- Prefer TypeScript for new scripts under `scripts/` and execute them with `node scripts/name.ts`. Use `.mjs` only when the toolchain cannot
  load TypeScript.
- Follow [the cross-site link conventions](../documentation/authoring/cross-site-links.md) for links to developer documentation.
- Use the `formbuilder-end-user-docs` skill under `skills/formbuilder-end-user-docs/` for screenshot capture, annotation, and visual guide
  workflows.

## Focused validation

Run the local checks while working on this site:

```bash
npm run check:all --prefix designer-guide
```

Run `npm run check:links --prefix designer-guide` after renaming or moving content. The repository-wide `npm run check-all` remains the
final completion gate.
