# Developer Documentation Guidance

`documentation/docs/` contains the Docusaurus developer documentation. `documentation/website/` contains the site implementation and build
scripts. The separate Form Author Guide lives under `designer-guide/`.

## Content rules

- Write clear, user-focused documentation and lead with the purpose or outcome before implementation details.
- Give every published page frontmatter with `title`, `description`, and `tags`. Add `sidebar_position` when the section uses positional
  ordering and `slug` when the page needs an explicit route.
- Use one H1 that matches the page title, H2 for major sections, and H3 for subsections.
- Use absolute internal Docusaurus paths for links within developer documentation.
- Link API types and members to `/api-reference/...` instead of copying their reference text.
- Do not format link text as inline code.
- Follow [the shared cross-site link conventions](authoring/cross-site-links.md) when linking between the developer documentation and the
  Form Author Guide.
- Keep JavaScript and TypeScript examples semicolon-free with single quotes. Use double quotes in JSON and two-space indentation throughout.
- Prefer runnable `jsx live` examples when a concept can be demonstrated without additional setup.
- Follow the repository [Markdown conventions](../CONTRIBUTING.md#markdown), including aligned source tables.

Files under `docs/api-reference/` are generated from package source. Do not edit them manually. Change the source documentation and
regenerate the API reference instead.

## Form examples

- Omit the top-level `version` field unless the page specifically explains versioned form data.
- Include `localization`, `languages`, and `defaultLanguage` only when the example discusses localization.
- Multi-line `fnSource` in JS/TS: template literal with aligned continuations.
- Multi-line `fnSource` in JSON: `\n` with no extra indent; put the value on the next line after `fnSource` when clearer.

## Scoped guidance

When editing `docs/formengine-core/`, follow its [local guidance](docs/formengine-core/AGENTS.md). For a new page or substantial rewrite,
read the linked authoring guide before drafting.

## Focused validation

- Run `npm run docs:build` for site configuration, navigation, component, or rendering changes.
- Run `npm run check:cross-site-docs-links` after changing cross-site links.
- Run `npm run check:docs-broken-images` after adding, moving, or replacing documentation images.
- Prefer TypeScript for new scripts under `website/scripts/` and include `.ts` in relative imports.
