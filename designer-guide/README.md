# Form Author Guide (Astro)

End-user documentation for **FormEngine Designer**, built with [Astro](https://astro.build/) 7 and [
`@astrojs/mdx`](https://docs.astro.build/en/guides/integrations-guide/mdx/).

## Commands

From the repository root (after `npm install`):

```bash
npm run designer-guide:dev
npm run designer-guide:build
npm run designer-guide:preview
```

From this directory:

```bash
npm run dev
npm run build
npm run preview
npm run clean
```

`npm run clean` removes Astro caches (`.astro/`, `node_modules/.astro/`), `dist/`, generated `src/data/navigation.json`, and all WebP
siblings under `public/assets/guide/` (PNG sources are kept). From the repo root: `npm run designer-guide:clean`.

Sidebar navigation is regenerated automatically when `_meta.js` files change during `astro dev`. To rebuild it manually:

```bash
npm run build:navigation
```

Production builds also generate WebP siblings for guide PNGs. Conversion is skipped when both WebP files exist and the PNG SHA-256 still
matches `data/webp-manifest.json` (commit that file when screenshots or Sharp settings change):

```bash
npm run optimize:images
```

## Content

- **Pages:** `content/` (read directly by Astro content collections)
- **Sidebar:** `src/data/navigation.json` (generated from `_meta.js` files, gitignored)
- **Images:** `public/assets/`, `public/img/` (PNG sources; `npm run optimize:images` emits `.preview.webp` + `.full.webp` per screenshot
  and updates `data/webp-manifest.json`)
- **Demo deep links:** `data/demo-article-forms.json` maps walkthrough articles to [FormEngine demo](https://demo.formengine.io/) start/end
  forms

### Live demo links in walkthroughs

Walkthrough articles open the demo in a minimal popup window via query params (implemented in `packages/apps/common-designer`):

| Param                                                     | Meaning                                     |
|-----------------------------------------------------------|---------------------------------------------|
| `form=empty`                                              | Blank Screen form                           |
| `formBody=<base64url>`                                    | Minified form JSON encoded as base64url     |
| `formName=<name>`                                         | Optional display name when using `formBody` |
| `view=mui\|mantine\|rsuite-inject-css\|rsuite-import-css` | UI kit                                      |

Markdown tips always link to `https://demo.formengine.io/…`. Set `DEMO_URL` in `.env`, `.env.local`, or the environment to rewrite those
hrefs (and the header/footer Demo links). During `astro dev`, if `DEMO_URL` is unset, they fall back to `http://localhost:5173/`. Production
builds keep `https://demo.formengine.io/` unless `DEMO_URL` is set.

Example (production): `https://demo.formengine.io/?form=empty&view=mui`

Article mapping stays in `data/demo-article-forms.json` (`formFile` points at fixtures under
`data/guide-forms/`). Inject embeds the encoded body into each tip:

```bash
npm run inject:demo-links
```

Helpers live in `src/lib/demo-links.mjs` and `src/lib/demo-base.mjs`.

## Deployment

Served at `/` (see `base` in `astro.config.mjs`). Set `site` if the production hostname differs.

### Cross-links to developer docs

Markdown links to the main Docusaurus site use the stable shorthand `docs:…` (for example `docs:formengine-designer/features/actions`). At
build time they resolve from `MAIN_DOCS_URL` (default `https://formengine.io/documentation/`). See `.env.example` and
`src/lib/main-docs-base.mjs`. During `astro dev`, `.env.development` sets `MAIN_DOCS_URL=/documentation` for same-origin proxy links.

Change the path or domain without editing article text:

```bash
MAIN_DOCS_URL=https://formengine.io/documentation npm run build
```

The reverse direction (developer docs → this guide) uses `DESIGNER_GUIDE_URL` / `designer-guide:…` in `documentation/website`.

### Algolia DocSearch

Search uses [Algolia DocSearch](https://docsearch.algolia.com/) with credentials from `docsearch.config.json`, overridable at build time:

```bash
DOCSEARCH_APP_ID=… DOCSEARCH_API_KEY=… DOCSEARCH_INDEX_NAME="FormEngine Form Author Guide" npm run build
```

Create a **separate crawler index** for this site (do not reuse the developer-docs index). See `.env.example` and
`src/lib/docsearch-base.mjs`.

While migrating, you can point at the developer-docs index and filter results:

```bash
DOCSEARCH_INDEX_NAME="FormEngine documentation crawler" npm run build
```

If credentials are missing, the search button is omitted from the header.

### Local dev with `learn.formengine.local`

Start the guide (`npm run designer-guide:dev`, port **4321**).

Caddy (in `formengine-tools/tools/local-domains`) serves the whole host to Astro — pages, `/@vite`, `/@fs`, `/@id`, and HMR (`/?token=...`).
Add `127.0.0.1 learn.formengine.local` to `/etc/hosts`.

Open [https://learn.formengine.local/](https://learn.formengine.local/). Developer docs remain
on [http://formengine.local/documentation/](http://formengine.local/documentation/).

CI and release builds produce `.archives/designer-guide.tgz` (contents of `dist/`) via Earthly target `+prepare-designer-guide-archive`, or
together with Docusaurus via `+prepare-documentation-sites-archives`.
