# Reference: templates and conventions

Full editorial rules live in **`documentation/AGENTS.md`** for developer docs. Author-guide pages under `designer-guide/content/` follow this skill’s voice rules (short leads, bold UI labels, no forced “In this guide” outlines). This file holds copy-paste shapes and capture details.

## Author-guide page skeleton

```markdown
---
title: <Action-oriented title for end users>
description: <Benefit + what they will do; plain language>
tags:
  - form-builder
  - user-guide
  - <feature-keyword>
sidebar_label: <Short nav label>
---

# <Same as title or a slightly friendlier H1>

<Lead: 1–2 sentences. What they will build or fix.>

## Before you begin

- <Starting screen / sample form if needed>

## <First major phase or Step 1: …>

<img src="/assets/guide/<section>/<highlight-file>.png" alt="<What to notice.>" />

1. <Single action.>
2. <Single action.>

## Summary

<One short paragraph of takeaways - not a full step redo.>

## See also

- [Related guide](/section/other-page)
- [Developer detail](docs:formengine-core/…)  <!-- only when needed -->
```

Avoid: long “you'll learn” checklists, em-dash stacks, “Additionally/crucial/pivotal”, and marketing closers. Prefer the tone of `behavior/events-and-actions-concept.md` or the humanized `behavior/modals-for-authors.md`.

Do not write “Use **Validate** when available” or “Double-click (if available)”. Write the stock click-path.
Config/license mismatches are covered on `workspace/what-is-formengine-designer.md`.

## Section `_meta.js` (sidebar group)

Place at `designer-guide/content/<section>/_meta.js`. Export an ordered list of page basenames (without `.md`). See existing folders such as `workspace/_meta.js` and `structure/_meta.js`.

**Example:**

```js
export default [
  'overview',
  'left-panel',
  'component-tree',
];
```

Landing pages use frontmatter such as `asIndexPage: true` on `designer-guide/content/index.mdx` (or a section `index.md` when needed). Do **not** add pages under the removed Docusaurus path `documentation/docs/formengine-builder-user-guide/`.

## Capture script inventory

### Screenshot catalog

| File | Purpose |
|------|---------|
| `data/guide-screenshot-catalog.json` | Canonical map: screenshots ↔ articles ↔ guide-forms ↔ capture scripts; each screenshot has `regenerationPrompt` for this skill |
| `data/guide-screenshot-prompt-overrides.json` | Optional hand-tuned prompts keyed by screenshot id |
| `scripts/build-guide-screenshot-catalog.mjs` | Rebuild or `--check` the catalog from assets + markdown + maps |

```bash
node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs
```

To retake one image: open the catalog entry for that id and pass `regenerationPrompt` to the skill (or run its `captureScript` with the listed form fixtures).

| Script | Purpose |
|--------|---------|
| `capture-all-guide-screenshots.mjs` | Run every page-specific capture script in sequence |
| `capture-env.mjs` | Shared viewport + `deviceScaleFactor` (`createGuideCapturePage`) |
| `capture-guide-structure-batch.mjs` | Structure, labels, manage-forms batch |
| `capture-guide-docs-fixes.mjs` | Targeted fixes (validation, tax ID, partial menus) |
| `capture-guide-page-screenshots.mjs` | Appearance / localization pages |
| `capture-spacing-screenshots.mjs` | Spacing-and-alignment page |
| `capture-save-export-import-screenshots.mjs` | Header menu file operations |
| `capture-work-with-multiple-forms-screenshots.mjs` | Forms tab multi-form UX |
| `capture-parent-child-screenshots.mjs` | Tree hierarchy, select, drag-move, edit |
| `capture-right-panel-screenshots.mjs` | Right properties panel tabs on `checkout-sections` |
| `capture-modals-for-authors-screenshots.mjs` | Full modals walkthrough (`confirm-dialog` + `MainForm`) |
| `capture-events-and-actions-concept-screenshots.mjs` | Events/actions concept menus |
| `capture-form-level-actions-screenshots.mjs` | Settings form actions / validator |
| `capture-action-order-on-buttons-screenshots.mjs` | Button action order |
| `measure-workspace-layout.mjs` | DOM measurement, `annotateZones`, `annotateArrow`, menu item highlights |
| `insert-guide-screenshots.mjs` | Insert images from `guide-screenshot-map.json` |
| `build-guide-screenshot-catalog.mjs` | Catalog + `CAPTURE_SCRIPT_BY_PREFIX` / `FORM_HINTS` |

Shared helpers duplicated in focused scripts (until extracted): `prepareBuilder`, `setBuilderTheme`, `shot`, `clickLeftTab`, `saveFormToIndexedDB`, `openStoredForm` / `openGuideForm`, `dismissViteOverlay`.

When you add a new focused script, register basename prefixes in `CAPTURE_SCRIPT_BY_PREFIX` and fixtures in `FORM_HINTS` inside `build-guide-screenshot-catalog.mjs`, then rebuild the catalog.

## Form fixtures (`data/guide-forms/`)

| File | Use |
|------|-----|
| `event-registration.json` | Cards + stacks; Contact/Ticket sections; Tree parent-child, containers |
| `event-registration-misplaced-phone.json` | Phone under Ticket stack - move-into-Contact-stack demo |
| `shipping-columns.json` | Horizontal stacks / rows-columns |
| `spacing-loose.json` | Team profile; large Stack spacing |
| `feedback-survey.json`, `labels-demo.json` | Simple forms for multi-form list |
| `checkout-sections.json` | Large multi-section form - right-panel tabs, containers |
| `confirm-dialog.json` | Modal content (message + OK/Cancel with `closeModal`) |
| `main-with-modal.json` | Main form with Modal (`Template:confirm-dialog`) + `openModal` button; IndexedDB key **`MainForm`** |
| `preset-address.json`, … | Other structure/manage pages |

Load / open pattern (Edit pencil - required):

```javascript
await saveFormToIndexedDB(page, 'event-registration', readGuideForm('event-registration.json'));
await page.reload();
await page.getByTestId('Forms_Tab').click();
await page.getByTestId('form-list-item-event-registration').waitFor({state: 'visible'});
await page.getByTestId('form-list-open-item-event-registration').click({force: true});
```

IndexedDB: `example-mui-db` / `example-store`.

### Multi-form modal seed

```javascript
await clearIndexedDBStore(page);
await saveFormToIndexedDB(page, 'confirm-dialog', readGuideForm('confirm-dialog.json'));
await saveFormToIndexedDB(page, 'MainForm', readGuideForm('main-with-modal.json'));
await page.reload();
// Open with form-list-open-item-confirm-dialog or form-list-open-item-MainForm
```

Preview needs both forms saved under **Forms** so the dialog can load the modal template by name.

## Common selectors (MUI example builder)

| UI | Selector |
|----|----------|
| Left tabs | `[data-testid="Tree_Tab"]`, `Components_Tab`, `Forms_Tab`, `Settings_Tab` |
| Right tabs | `[data-testid="Main_Tab"]`, `Style_Tab`, … |
| Tree row | `[data-testid="{componentKey}"]` - key from form JSON |
| Canvas wrapper | `[data-testid="{componentKey}-editable-wrapper"]` |
| Open form (edit) | `[data-testid="form-list-open-item-{formName}"]` - **always** use this to open |
| Form list row | `[data-testid="form-list-item-{formName}"]` - wait/highlight only; do not rely on row click to edit |
| Add form (Forms tab) | `[data-testid="add-new-form-button"]` |
| Header menu | `[aria-haspopup="menu"]` first; items `.FE_MainMenu_Item_*` |
| Search (Forms / palette) | `getByPlaceholder('Search...')` |
| Property editors | `[data-testid="{prop}-labeled-wrapper"]` (e.g. `label`, `key`) |
| Modal OK | `[data-testid="modal-ok-button"]` |
| Preview dialog (MUI) | `.MuiDialog-paper` preferred; fallback `.MuiDialog-root` / `[role="dialog"]` |

## Tree drag (react-dnd)

Manual `page.mouse` drag often drops on the wrong parent. **Use `locator.dragTo`:**

```javascript
await page.getByTestId('Phone').first().dragTo(page.getByTestId('Full name').first(), {
  force: true,
  targetPosition: {x: 8, y: 8},
});
```

Target a **field inside** the destination stack. Confirm: Tree indentation and canvas layout both show the field under the intended parent.

## Capture pitfalls (learned)

| Mistake | Fix |
|---------|-----|
| Clicking `form-list-item-*` to open a form | Click `form-list-open-item-*` (Edit pencil) |
| Highlighting header **Add a new form** when the article shows the Forms tab create control | Use `add-new-form-button` |
| `.catch()` on Playwright locator helpers for measurement | Use `boundingBox()` null checks / `count()` |
| Measuring the dimmed backdrop instead of the open dialog | Prefer `.MuiDialog-paper` |
| Different small forms for each right-panel tab screenshot | Reuse one large fixture (`checkout-sections`) for the whole page |
| New PNGs without catalog wiring | Update map + `CAPTURE_SCRIPT_BY_PREFIX` + `FORM_HINTS`, then rebuild catalog |
| Saving assets under Docusaurus `static/img/formengine-builder-user-guide/` | Use `designer-guide/public/assets/guide/` only |

## Annotation patterns

| Pattern | Function | Output example |
|---------|----------|----------------|
| Menu item | `annotateSingleHeaderMenuItem` | `highlight-header-menu-save.png` |
| Tree + canvas | `annotateZones` (2 rects) | `highlight-parent-child-child.png` |
| Arrow to control | `annotateArrow` + `visibleArrowToBox` | `highlight-forms-edit-button.png`, `highlight-modals-forms-create.png` |
| Palette search | zones on search + result | `highlight-containers-palette.png`, `highlight-components-search-modal.png` |
| Active right tab | `annotateHighlight` on `Main_Tab` / `Style_Tab` / … | `highlight-right-panel-main.png` |
| Actions row | zones on action + Arguments | `highlight-modals-open-action.png` |

Use `{noZoneLabels: true}` when prose already names the targets.

## Post-capture

```bash
cd designer-guide && npm run optimize:images
```

Update `data/guide-screenshot-map.json` keys to match H2 / step sections. Wire prefixes in `build-guide-screenshot-catalog.mjs`, refresh `annotation-label-map.json` if labels changed, then:

```bash
node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs
node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs --check
```

## Linking author guides from developer docs

In `documentation/docs/formengine-designer/…`, point authors at the Form Author Guide with the `designer-guide:` link scheme:

```markdown
[Full guide →](designer-guide:behavior/modals-for-form-authors/)
```

From author-guide Markdown back to developer docs:

```markdown
[Modal windows](docs:formengine-core/modal)
```

Do not invent new screenshot assets under removed legacy static paths.

## Static images (filesystem vs URL)

| Save files under | Reference in Markdown |
|------------------|----------------------|
| `designer-guide/public/assets/guide/<section>/` | `![alt](/assets/guide/<section>/<file>.png)` |

Theme rehype serves `.light` / `.dark` / `.webp` from basename without theme suffix in Markdown.

## Annotating screenshots (zones and highlights)

**Script:** `skills/formbuilder-end-user-docs/scripts/annotate-screenshot.py`  
**Dependencies:** Python 3, Pillow (`pip install pillow` if missing).

**Zone JSON** (`zones-overview-1440x900.json`, `zones-tree-panel-822x1049.json`): fallback rectangles for standard layouts. **Prefer** `measure-workspace-layout.mjs` (reads `.FE_LeftPanel`, `.FE_CentralPanel`, `.FE_RightPanel`, etc.) during `capture-guide-screenshots.mjs` so panel widths match the live UI.

**Highlight rect format:** `x,y,width,height` in pixels from the top-left of the **plain** capture - **outer edge of the visible panel or control**, not an approximate column.

**Legend placement (highlights only):**

| Rule | Detail |
|------|--------|
| Never inside the rect | Labels must not sit on top of the highlighted UI |
| Default position | `--label-position below` (centered under the box) |
| Short overlay text | **Properties**, **Preview** - details go in Markdown |
| Rect is independent | Measuring or drawing the legend must not change `x,y,w,h` |

Preset file: `scripts/highlights-overview-1440x900.json` (properties panel starts at `x=1129` on 1440×900 captures - right of the canvas divider).

### Markdown pattern with legend

```markdown
![Numbered Form Builder zones: top bar, left panel, canvas, and properties.](/assets/guide/workspace/overview-zones.png)

1. **Top bar** - save, undo, component library, **Preview**, device sizes, language.
2. **Left panel** - **Components**, **Tree**, **Settings**, **Forms**.
3. **Canvas** - live form layout.
4. **Properties** - **Main**, **Style**, **Actions**, **Rules** for the selected element.

*Screenshot with numbered zone overlays (1440×900).*
```

### Zone badge placement (numbered circles)

The annotate script places numbered badges automatically only when a zone is large enough (default: at least **44×44 px** and **2 500 px²** area). Smaller zones keep the colored outline only so numbers do not cover labels or input text.

- Prefer `noZoneLabels: true` in capture scripts when prose already explains the steps.
- Set `showBadge: true` on a zone when a number is required on a small control.
- Set `showBadge: false` to suppress a badge on a large zone.
- Badge position is chosen by sampling image variance outside/inside the zone (emptiest region wins).

### When not to annotate

- The UI already has a single obvious focus (one modal, one button).
- Cropping a tight region is clearer than dimming a full-screen shot. Do not add a grey dim layer outside highlight rectangles.
- More than four zones on one image (split into two figures instead).

### Example images (under `designer-guide/public/assets/guide/workspace/`)

| File (Markdown path omits theme) | Use as reference for |
|----------------------------------|----------------------|
| `overview-zones.png` | Four-zone workspace tour |
| `highlight-tree-expand-all.png` | Tree Expand all control |
| `highlight-palette.png` | Palette highlight |
| `highlight-properties.png` | Right panel highlight |
| `highlight-preview.png` | Preview button highlight |
| `highlight-tree-select.png` | Tree row + canvas selection |

Always keep the matching **plain** source PNG (for example `builder-overview-plain.png`) so annotations can be regenerated.

## Screenshot checklist

- [ ] Consistent browser width across the guide
- [ ] File name is kebab-case and descriptive
- [ ] Plain capture saved; annotated variant uses `*-zones` / `highlight-*` naming
- [ ] Zone images include a numbered legend in prose
- [ ] Alt text states the instructional intent, not only “Screenshot”
- [ ] No sensitive data
- [ ] Image committed under `designer-guide/public/assets/guide/<section>/`
- [ ] `guide-screenshot-map.json` updated for the page
- [ ] `guide-screenshot-catalog.json` rebuilt (`npm run catalog:screenshots --prefix designer-guide`)
- [ ] `npm run optimize:images` run in `designer-guide`
- [ ] `npm run build` in `designer-guide` passes when changing many pages

## Linking from the documentation home page

When the Form Author Guide should surface from developer docs, link to `/designer/user-guide/` or use `designer-guide:` page links (not the removed Docusaurus path `/formengine-builder-user-guide`). Feature docs under `formengine-designer/features/` should deep-link the matching author page when one exists.

## Form Author Guide (Astro) - site map

| Path | Role |
|------|------|
| `designer-guide/content/` | MDX pages + `_meta.js` sidebar |
| `designer-guide/public/assets/guide/` | Screenshot PNGs (`.webp` emitted at build) |
| `designer-guide/src/data/navigation.json` | Generated sidebar (gitignored) |
| `designer-guide/src/layouts/DocsLayout.astro` | Page chrome, lightbox, theme |
| `designer-guide/integrations/navigation.mjs` | Regenerates nav on `_meta.js` changes |
| `designer-guide/site-paths.mjs` | `siteBase` = `/designer/user-guide/` |

Commands (repo root): `npm run designer-guide:dev` | `designer-guide:build` | `designer-guide:preview`.

## Local proxy troubleshooting (`formengine.local`)

Caddyfile: `formengine-tools/tools/local-domains/Caddyfile`. Reload after edits:

```bash
cd formengine-tools/tools/local-domains
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

### Caddy routing for Astro dev (path → `:4321`)

HTML under `/designer/user-guide*` is proxied automatically. **Additional** matchers are required for Vite/Astro dev assets at the site root:

| Request pattern | Matcher notes |
|-----------------|---------------|
| `/@fs/.../designer-guide/...` or `.../node_modules/astro/...` | Path regexp on `@fs` |
| `/@id/astro...` and `/@id/__x00__astro...` and `/@id/__x00__virtual:astro...` | Vite encodes `:` as `__x00__` |
| `/node_modules/.vite/deps/astro*` | Path prefix (transitions, toolbar) |
| `/node_modules/.vite/deps/{hash}-*.js` | Referer chain from guide or Astro modules |
| `/src/*` | Safe for Astro-only (`fb` has no top-level `/src`) |
| `/@vite/client` | Referer-based (shared with builder on `:5173`) |
| `/?token=*` | **HMR WebSocket** - no `Referer` (browsers omit it); proxy to `:4321` |

Use **path-based** matchers for SPA dynamic imports; `Referer` alone fails during ClientRouter navigation because imports use module URLs as referer, not `/designer/user-guide/`.

### Symptoms → likely cause → fix

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| 502 on `/@id/__x00__astro:transitions/client` | `@id` matcher missing `__x00__` | Broaden regexp to `(?:__x00__)?(?:virtual:)?astro` |
| 502 on `/node_modules/.vite/deps/astro_virtual-modules_*` | Deps not routed to Astro | Add `deps/astro` path matcher + Referer chain for hash chunks |
| Full page reload on sidebar click | ClientRouter modules 502 | Fix `@id` and deps routing; confirm Astro dev on `:4321` |
| `ClientRouter` errors on **builder** terminal | Root Vite URLs hit `:5173` | Start Astro dev; reload Caddy |
| Dark theme resets after navigation | Theme script not re-run on view transition | `astro:page-load` + `astro:after-swap` in `ThemeInit.astro` |
| Screenshot click does nothing (dev/proxy) | External client script not bound | Inline script in `GuideImageLightbox.astro` + `data-astro-transition-persist` |
| `[vite] failed to connect to websocket` | `/?token=` routed to builder or 308 redirect | Route `/?token=*` → `:4321` without Referer; exempt token from trailing-slash redirect |
| WebSocket closed without opened | 308 redirect on WS URL | Use trailing slash in path or skip redirect when `?token=` present |
| Fallback to `wss://localhost:4321` | First WS attempt failed | Fix Caddy root HMR route (Astro `vite.server.hmr` is optional if Caddy is correct) |

### curl smoke tests (after Caddy reload)

```bash
# Should be 200
curl -sk -o /dev/null -w "%{http_code}\n" \
  "https://formengine.local/@id/__x00__astro:transitions/client"
curl -sk -o /dev/null -w "%{http_code}\n" \
  "https://formengine.local/node_modules/.vite/deps/astro_virtual-modules_transitions-events__js.js"

# HMR path (no Referer) - should not 502; may hang on WS upgrade
curl -sk --http1.1 --max-time 2 -D - -o /dev/null \
  -H "Connection: Upgrade" -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Version: 13" -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" \
  -H "Origin: https://formengine.local" \
  "https://formengine.local/?token=test"
```

### Caddy vs Astro config for HMR

| Layer | Responsibility |
|-------|----------------|
| **Caddy** | Forward requests that arrive at `wss://formengine.local/?token=...` to Astro |
| **Astro `vite.server.hmr`** | Tell the browser which host/port/path to connect to (optional if Caddy routes default Vite URL) |

Prefer **Caddy-only** HMR when possible to avoid duplicating proxy host/port in `astro.config.mjs`. If WS still fails after Caddy fixes, `vite.server.hmr` with `protocol: 'wss'`, `host: 'formengine.local'`, `clientPort: 443` is the fallback (requires dev server restart).
