---
name: formbuilder-end-user-docs
description: Authors FormEngine Form Builder end-user documentation with UI screenshots, numbered zone highlights, component callouts, and step-by-step procedures for non-developers. Use when the user asks for builder user guides, visual tutorials, annotated screenshots, screenshot walkthroughs, training docs for form designers, documenting new designer functionality for end users, the Astro Form Author Guide at designer-guide/, formengine.local proxy/Caddy, ClientRouter/HMR troubleshooting, retaking guide screenshots, guide form fixtures, or humanizing author-guide prose (distinct from developer integration docs under formengine-designer).
---

# Form Builder end-user documentation

_FormEngine Form Builder guides for people who use the visual designer UI._

**Location:** `skills/formbuilder-end-user-docs/SKILL.md` (this repo). If your workspace symlinks `skills` to another folder, resolve the same file there.

## Purpose and audience

**End users** are people who design forms in the visual Form Builder UI (embedded app or hosted builder). They are not expected to edit React, npm packages, or JSON by hand.

**Do not conflate** this work with `documentation/docs/formengine-designer/`, which targets **developers** integrating the designer packages.

This skill produces **task-based user guides**: numbered steps, plain language, UI labels in **bold**, and **screenshots** for every non-obvious action.

## Output location (canonical)

Create and maintain the **Form Author Guide** under:

| Artifact | Path |
|----------|------|
| Markdown pages | `designer-guide/content/` |
| Images (static) | `designer-guide/public/assets/guide/<section>/` |
| Screenshot catalog (canonical) | `skills/formbuilder-end-user-docs/data/guide-screenshot-catalog.json` |
| Screenshot insert map | `skills/formbuilder-end-user-docs/data/guide-screenshot-map.json` |
| Guide form fixtures | `skills/formbuilder-end-user-docs/data/guide-forms/` |
| Demo deep-link map | `designer-guide/data/demo-article-forms.json` |
| Writing plan | `documentation/conent-plan/documentation-writing-plan.md` |
| Astro site config | `designer-guide/astro.config.mjs` |
| Caddy proxy (local) | `formengine-tools/tools/local-domains/Caddyfile` (sibling repo) |

The **Form Author Guide** is an **Astro 7** site (`designer-guide/`), not Docusaurus. It is served at **`/designer/user-guide/`** in production and local proxy setups. Docusaurus under `documentation/docs/` remains the developer documentation site.

Use `_meta.js` files under `designer-guide/content/` for sidebar order. New `.mdx` files need an entry in the folder `_meta.js`.

### First-time setup

If `designer-guide/content/` scaffolding is missing:

1. Add `content/index.mdx` as the landing page (`asIndexPage: true`).
2. Add section folders (`workspace/`, `first-form/`, etc.) each with `_meta.js`. **Meet the Designer** (`workspace/`) is the product-first
   start: what FormEngine Designer is, a workspace tour on a real form, add/select/Preview/save, then examples. Do not add a separate
   generic “Introduction” theory track.
3. Add one `.mdx` file per workflow (kebab-case filenames) per `documentation-writing-plan.md`.
4. Add `public/assets/guide/README.md` for screenshot conventions.

## Conventions from `documentation/` (align with existing docs)

**`documentation/AGENTS.md`** still applies for English-only text, table alignment, and developer-doc linking. For Form Author Guide pages, prefer the **author-guide voice and structure rules below** (and sibling pages under `designer-guide/content/`) over Docusaurus page templates.

### Voice, structure, and headings

- Clear, friendly, user-focused English; address the reader as **you** / **your**. Lead with what the reader will do, then the steps.
- Single **H1** that matches the page `title`; no bold, italic, or inline code inside headings.
- **H2** for major topics, **H3** for subsections; use **H4** only for small subdivisions.
- Match sibling pages under `designer-guide/content/` (short leads, numbered steps, bold UI labels). Prefer that voice over Docusaurus developer-doc templates.
- **Do not** force outline boilerplate: skip “In this guide, you'll learn” lists unless a long page truly needs a roadmap. Prefer one short lead paragraph.
- Close with a short **Summary** (prose is fine; do not restate every step as bullets) and **See also** (or **Next steps**) with a few sibling links. A horizontal rule before the link block is optional; many author-guide pages omit it.
- After drafting or expanding prose, strip AI writing patterns (inflated significance, “Additionally/crucial/pivotal”, em-dash stacks, rule-of-three filler, sycophantic closers). Keep UI labels and screenshot paths exact. Use the **humanizer** skill when the user asks, or when a page reads like a generated outline.

### Typical Designer (no per-step hedges)

Describe the **stock Designer** (demo / example builder) as if the control exists. Do **not** hedge steps with
`when available`, `if available`, `when supported`, `if shown`, `if present`, `in some builds`, or
`when your build exposes`.

Configuration and licensing belong **once**, on
`designer-guide/content/workspace/what-is-formengine-designer.md`
(`:::info note`: typical Designer; team can hide UI; some capabilities need a license; mismatches → ask developers).
Do not repeat that caveat on every page.

Hedge a step **only** when the product actually has a toggle (form storage / **Forms** tab, preset license). Then use a
dedicated `:::info note` (see `create-your-first-form.md`, `work-with-multiple-forms.md`) or `(when licensed)` for
presets. Check designer source before assuming a feature is optional.

Canonical examples from the `uncertain wording` guide pass:

- **Validate** in Preview, palette **double-click**, Tree **Reorder**, **Auto Validate**, **Data** panel: write as always there.
- **Forms** tab: describe the workflow; keep one note if storage is off.

### Frontmatter

- Required on every page: `title`, `description` (benefit-focused; aim ~150–160 characters when practical).
- Sidebar order comes from folder `_meta.js`, not `sidebar_position`. Prefer `sidebar_label` when the nav label should be shorter than `title`.
- Strongly recommended for new pages: `tags`.
- Use `slug` only when a stable URL matters beyond the file path.

### Formatting and admonitions

- Prefer short paragraphs, bullets, and numbered steps; use **bold** for UI labels and key terms; use inline code for property names, action ids (`openModal`), and file names.
- Use tables with a header row and separator row when comparing options or listing labeled fields.
- Astro guide pages commonly use `:::tip` (including Try it demos) and `:::warning`. Match sibling pages; do not invent new admonition variants.

### Links

- Inside the author guide, use site-root paths such as `/workspace/overview`, `/behavior/modals-for-authors`.
- To developer docs: `docs:formengine-core/modal`, `docs:formengine-designer/features/modal-components`.
- From developer docs to the author guide: `designer-guide:behavior/modals-for-form-authors/` (see feature pages under `documentation/docs/formengine-designer/features/`).
- Close long pages with a short **See also** list (about 3–5 links).

### Code and MDX

- Prefer **`.md`** for screenshot-first user guides so pages stay easy to maintain.
- Prefer **no** large code blocks in primary end-user flows; link to `formengine-designer` or `formengine-core` instead.
- **`docs/api-reference/**` is generated** (Typedoc). Never edit it by hand.

### Validation builds

- Author guide: `npm run designer-guide:build` from the repo root (or `npm run build` in `designer-guide/`).
- Developer docs broken links: `npm run docs:build` when changing `documentation/docs/` links.

### Where this section sits among other doc areas

- **`formengine-designer`**: developer integration (npm, `FormBuilder`, props, JSON concepts). Link there for “how developers embed this” side notes.
- **`guides`**: integration and advanced topics. Cross-link when a user task touches those workflows.
- **`formengine-core`**: rendering, validation, and JSON semantics from the runtime perspective-not the same as click-path UI docs.

## Language

- All user-facing documentation text: **English only** (repository-wide rule in root `AGENTS.md`).

## Before writing: discover the UI

1. Run the designer locally from the `src` directory: `npm run start:builder` (see root `AGENTS.md`). Note the dev server URL and port from the terminal output.
2. Open the running app in a browser. Use the real control labels (toolbar, panes, context menus) in the doc-do not invent names.
3. If documenting **new** functionality, reproduce the flow from a clean or minimal form so screenshots stay readable.

## Screenshots: capture workflow

Use **browser automation MCP** when available in this workspace (for example **cursor-ide-browser**): navigate, lock the tab, snapshot, interact, capture, then unlock. Obey that server’s order-of-operations rules (navigate before lock if no tab exists; lock before interactions when a tab already exists).

### Quality bar

- **Viewport**: 1440×900 CSS layout for all captures; use `createGuideCapturePage()` from `capture-env.mjs` (`deviceScaleFactor: 2` → 2880×1800 PNG). In-page images stay `max-width: 100%`; click opens a full-size popup.
- **Clarity**: hide unrelated personal bookmarks or extensions where possible; use a neutral theme if the host app supports it.
- **Sensitive data**: no real PII, secrets, or customer logos. Use sample data only.
- **Alt text**: describe what the reader should notice (for example: “Properties panel with Validation tab selected”).

### File naming and storage

1. Save PNG (preferred) or WebP under `designer-guide/public/assets/guide/<section>/`.
2. Use kebab-case: `{feature}-{step-or-topic}-{short-detail}.png` (example: `add-field-text-input-palette.png`).
3. For annotated variants, keep the **plain capture** and add a sibling file:
   - `{base}-zones.png` - numbered workspace regions.
   - `{base}.light.png` / `{base}.dark.png` - paired captures for site theme (Markdown still references `{base}.png`).
   - `highlight-{target}.png` - one component or control emphasized (also paired as `.light` / `.dark`).
4. Reference in Markdown using site-root paths:

```markdown
![Add a Text Field from the palette.](/assets/guide/workspace/highlight-palette.png)
```

5. After adding images, confirm paths resolve with `npm run designer-guide:dev` (or the formengine.local proxy). Do **not** put new screenshots under the removed legacy path `documentation/website/static/img/formengine-builder-user-guide/`.

### Highlighting UI zones and components

Use overlays when a full screenshot is busy or the reader must map prose (“left panel”, “Properties”) to pixels.

**Two annotation modes**

| Mode | When to use | Visual |
|------|-------------|--------|
| **Zones** | First tour of the workspace; explain layout | Up to 4 numbered rectangles + short labels; fixed color per zone |
| **Highlight** | One step in a procedure (“click **Preview**”) | Single rectangle flush with visible UI chrome; legend **outside** the box |

**Zone color palette (keep consistent across guides)**

| Zone | Color | Typical region (1440×900) |
|------|-------|---------------------------|
| Top bar | `#8B5CF6` | Full width, top ~52px |
| Left panel | `#3B82F6` | Components / Tree / Settings / Forms |
| Canvas | `#10B981` | Center form layout |
| Properties | `#F59E0B` | Right column from the canvas divider through the window edge (see `highlights-overview-1440x900.json`) |

**Highlight alignment rules (mandatory)**

1. The `--highlight` rectangle is **only** the visible control or panel border. Measure it from the live builder DOM (`scripts/measure-workspace-layout.mjs`) or on the **plain** PNG (DevTools box model). **Never** expand or shift the rect to make room for a legend.
2. Legends are drawn **outside** the highlight, default **`below`** (centered under the box). Do not place labels inside the rectangle or anchored to its top-left corner.
3. Use short legend text (for example **Properties**); put tab names (**Main**, **Style**, …) in the Markdown prose, not in the overlay.
4. Set `"showLabel": false` when the legend repeats visible control text (menu rows such as **Save**, **Import forms**, or the **Preview** button). The highlight box alone is enough.
5. Legends and zone captions are placed automatically inside the image bounds (below, above, or beside the target when near an edge).
6. When a label would overlap other zones, toolbar controls, or busy UI, the annotator prefers a **nearby callout** in empty space under or beside the target (short leader). It falls back to a **footnote callout** below the screenshot only when no nearby empty slot fits. No manual `labelPlacement` is required unless you want to force inline or callout.
7. After layout changes, re-run `capture-guide-screenshots.mjs` (measures `.FE_LeftPanel`, `.FE_CentralPanel`, `.FE_RightPanel`, and related selectors automatically) or refresh `zones-*.json` / `highlights-*.json` manually.

**Annotation typography (shared across all screenshots)**

Legend text, zone labels, and badge numbers use **Inter SemiBold at 16px CSS** (same size as guide body text at 1440px display width). Settings live in `skills/formbuilder-end-user-docs/annotation-style.json` and `fonts/Inter-SemiBold.ttf`. After changing annotation logic or typography:

1. `node skills/formbuilder-end-user-docs/scripts/reannotate-from-presets.mjs` - preset-backed PNGs (overview, central header, panel collapse, toolbar arrows, header menu).
2. `npm run optimize:images` in `designer-guide`.

Or run the combined helper: `node skills/formbuilder-end-user-docs/scripts/scan-overlap-reannotate.mjs`.

Other annotated PNGs need a live builder capture pass (`capture-*.mjs`). Do **not** use `reannotate-from-diff.py` - it cannot reliably recover highlight geometry or labels.

**Workflow**

1. Capture a **plain** PNG at a fixed viewport (document width in the guide intro).
2. Prefer **DOM measurement** during capture (`capture-guide-screenshots.mjs` writes updated `zones-*.json` / `highlights-*.json` and annotated PNGs). For measurement only:

```bash
node skills/formbuilder-end-user-docs/scripts/measure-workspace-layout.mjs /tmp/measured.json
```

3. Or run the annotate script manually (requires Python 3 + Pillow):

```bash
# From repo root (builder must be running at BUILDER_URL, default http://localhost:5173/)
node skills/formbuilder-end-user-docs/scripts/capture-guide-screenshots.mjs

# On Linux hosts where `npx playwright install` is unsupported, set CHROME_PATH:
CHROME_PATH=/usr/bin/google-chrome node skills/formbuilder-end-user-docs/scripts/capture-guide-screenshots.mjs

# Numbered zones (workspace tour)
python3 skills/formbuilder-end-user-docs/scripts/annotate-screenshot.py \
  --input designer-guide/public/assets/guide/workspace/builder-overview-plain.png \
  --output designer-guide/public/assets/guide/workspace/overview-zones.png \
  --zones skills/formbuilder-end-user-docs/scripts/zones-overview-1440x900.json

# Single target from measured presets (preferred)
python3 skills/formbuilder-end-user-docs/scripts/annotate-screenshot.py \
  --input designer-guide/public/assets/guide/workspace/builder-overview-plain.png \
  --output designer-guide/public/assets/guide/workspace/highlight-properties.png \
  --highlights skills/formbuilder-end-user-docs/scripts/highlights-overview-1440x900.json \
  --highlight-name properties-panel

# Or ad hoc rect + outside legend
python3 skills/formbuilder-end-user-docs/scripts/annotate-screenshot.py \
  --input designer-guide/public/assets/guide/workspace/builder-overview-plain.png \
  --output designer-guide/public/assets/guide/workspace/highlight-preview.png \
  --highlight "556,12,76,32" --label "Preview" --color "#8B5CF6" --label-position below
```

4. In Markdown, add a **legend** under zone images (numbered list matching badge IDs). Use **highlight** images in numbered steps; keep plain screenshots only when the UI is already obvious.
5. **Alt text** must describe the teaching goal, for example: “Numbered zones: 1 Top bar, 2 Left panel, 3 Canvas, 4 Properties.”

**Example images in the repo** (under `designer-guide/public/assets/guide/workspace/`; Markdown omits the theme suffix):

| File | Pattern |
|------|---------|
| `overview-zones.png` | Four-zone workspace |
| `highlight-tree-expand-all.png` | Tree tab with Expand all |
| `highlight-palette.png` | Single zone: palette |
| `highlight-properties.png` | Single zone: properties |
| `highlight-preview.png` | Single control: Preview |
| `highlight-tree-select.png` | Tree row + canvas selection |

See [reference.md](reference.md) for rect formats, caption templates, and when **not** to annotate.

## Page structure template

Use this shape for each guide (adjust depth to the feature):

1. **H1** matches `title` (user-benefit phrasing, not package names).
2. One- to two-sentence **lead** (what the reader will accomplish). Optional short outcome bullets only if the page is long.
3. **Before you begin** / prerequisites when the starting screen or sample form matters.
4. **H2 sections** per major phase (or **Step N:** for full walkthroughs such as modals).
5. Under each H2: short intro, then **numbered steps** (one action per step). Place the teaching screenshot immediately above or below the steps it proves.
6. **Tips / warnings** for destructive or irreversible actions (`:::tip`, `:::warning`, Try-it demos). Prefer patterns already used on sibling Astro pages.
7. Close with **Summary** and **See also** (sibling author pages; link to `docs:…` only for integrator/JSON detail).

## Documenting new functionality

When the user names a new feature or release area:

1. **Define outcomes**: what a successful end user can do after reading (verifiable actions in the UI).
2. **Map entry points**: menu, toolbar, palette, keyboard shortcut, or first-run dialog-document every entry used.
3. **Screenshot plan**: minimum set that covers open dialog → change → result state; add a before/after pair when the delta is the teaching point. Prefer one **zones** image per guide for layout, then **highlight** images per non-obvious step.
4. **Write steps**: one action per numbered step; avoid “then” chains in a single step.
5. **Cross-link**: related author-guide pages in **See also**. From developer docs under `documentation/docs/formengine-designer/`, link authors to the guide with `designer-guide:path/to/page/` (feature pages often use `[Full guide →](designer-guide:…)` near the top). Link the other way with `docs:formengine-…` only for JSON/API detail.
6. **Config / license**: do not add `when available` on stock controls. The intro note on What is FormEngine Designer?
   already covers hidden UI and extra licenses. Add a page-level `:::info note` only when the product has a real toggle
   (form storage, preset license). If unsure, check designer source before hedging.

## What to avoid

- Long JSON or TypeScript in primary flows (optional “Technical note” collapsible or link to `formengine-designer` instead).
- Marketing superlatives; keep claims factual and testable in the UI.
- Screenshots of entire un cropped desktops; crop to the builder chrome unless context requires the window.
- Per-step availability hedges (`when available`, `if available`, `when supported`, `in some builds`) for stock
  Designer chrome. See **Typical Designer** above.
- Splitting `**bold**` or other emphasis across a line wrap. Wrap at 140 characters, but keep a marked-up phrase
  on one line.
- Wrapping demo `<a>...</a>` Try it links to satisfy Biome's 140-character lineWidth. MDX
  (`check:docs-mdx`) requires the opening tag, label, and `</a>` on the same line. `formBody` URLs
  exceed 140 characters; leave those lines unwrapped. Biome does not format markdown.

## Additional material

For filename patterns, highlight legends, zone JSON, copy-paste skeletons, per-page capture scripts, form fixtures, and runtime troubleshooting, read [reference.md](reference.md).

## Page-specific screenshot retakes (learned workflow)

When the user asks to **retake screenshots** for one or more guide pages, follow this pattern instead of only running the monolithic batch script.

### Screenshot catalog (start here)

**Canonical config:** `skills/formbuilder-end-user-docs/data/guide-screenshot-catalog.json`

It ties every PNG under `designer-guide/public/assets/guide/`, Markdown articles, `data/guide-forms/` fixtures, demo deep links, and capture scripts. Each `screenshots[<id>]` entry has a **`regenerationPrompt`** - paste that text (or paraphrase it) when asking this skill to regenerate or create a similar shot.

| Field | Meaning |
|-------|---------|
| `screenshots` | Per-asset id (`section/basename`), themes, articles, forms, capture script, short `description`, full `regenerationPrompt` |
| `forms` | Guide fixtures and which articles/screenshots use them |
| `articles` | Page → screenshots + forms + demo map |
| `howToRegenerate` | Batch vs one-off commands |

Rebuild after adding images, forms, or markdown refs:

```bash
node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs
node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs --check
```

Hand-tune a prompt without editing the generator: add the screenshot id → text in `data/guide-screenshot-prompt-overrides.json`, then rebuild.

### User expectations (apply every retake)

1. **One figure per chapter subsection** - each H2 or procedural block that teaches a distinct action gets its own image; do not reuse a generic workspace shot for the wrong section.
2. **UI state must match the prose** - click the component, open the menu, or fill the field **before** capture so the screenshot proves the step works. Review and fix Markdown if component names, hierarchy, or labels do not match the fixture form.
3. **Highlights must name the teaching target** - hamburger menu **open** with the **correct item** highlighted; tree row **and** canvas selection together when explaining parent/child; red **arrows** to small controls (Edit, Remove) when the reader must find a button in a busy panel.
4. **Actually perform state-changing actions** when the section describes them (search filter, drag-move in Tree, preset workflow). Do not fake “after” states unless automation is impossible; prefer a dedicated fixture plus a reliable interaction (see Tree drag below).
5. **Use real example forms** - seed simple, readable forms (Event registration, Team profile, feedback survey) so lists and trees show meaningful choice, not an empty or single default form.
6. **Run `npm run optimize:images`** in `designer-guide` after capture.
7. **Update `data/guide-screenshot-map.json`**, wire **`CAPTURE_SCRIPT_BY_PREFIX` / `FORM_HINTS`** if the basename is new, refresh **annotation-label-map** when labels changed, then **rebuild `data/guide-screenshot-catalog.json`**.

### Dedicated capture scripts

Prefer a **focused script** per page or page group under `skills/formbuilder-end-user-docs/scripts/`:

| Script | Guide pages |
|--------|-------------|
| `capture-preview-your-first-form-screenshots.mjs` | `first-form/preview-your-first-form.md` - Preview highlight, finished form, Edit highlight |
| `capture-add-validation-on-your-first-form-screenshots.mjs` | `first-form/add-validation-on-your-first-form.md` |
| `capture-preview-mode-tools-screenshots.mjs` | `preview-and-handoff/preview-mode-tools.md` - Preview button, Validate, Clear highlights |
| `capture-device-preview-screenshots.mjs` | `preview-and-handoff/device-preview.md` - device mode selector + tablet orientation highlights |
| `capture-save-export-import-screenshots.mjs` | `manage-forms/save-export-import.md` - header menu open, each file op highlighted |
| `capture-work-with-multiple-forms-screenshots.mjs` | `manage-forms/work-with-multiple-forms.md` - multi-form list, search filled, edit/remove arrows, Add a new form menu |
| `capture-spacing-screenshots.mjs` | `structure/spacing-and-alignment.md` |
| `capture-parent-child-screenshots.mjs` | `structure/parent-and-child-in-tree.md` - parent select, child select, Tree drag move, edit properties |
| `capture-right-panel-screenshots.mjs` | `workspace/right-panel.md` - select + Main/Style/Actions/Rules/Settings on one large form |
| `capture-modals-for-authors-screenshots.mjs` | `behavior/modals-for-authors.md` - create modal form → Modal template → openModal → Preview |
| `capture-events-and-actions-concept-screenshots.mjs` | `behavior/events-and-actions-concept.md` |
| `capture-form-level-actions-screenshots.mjs` | `behavior/form-level-actions.md` |
| `capture-action-order-on-buttons-screenshots.mjs` | `behavior/action-order-on-buttons.md` |
| `capture-canvas-drag-and-drop-screenshots.mjs` | `workspace/canvas-drag-and-drop.md` - palette, multi-select, toolbar, Phone above Email |
| `capture-guide-structure-batch.mjs` | Broader structure/fields/manage-forms batch (legacy; split new work into focused scripts) |

Template for a new script: copy `capture-save-export-import-screenshots.mjs` or `capture-modals-for-authors-screenshots.mjs` (builder bootstrap, theme loop, `shot()`, plain → annotate).

### Form fixtures (`data/guide-forms/`)

- Store minimal JSON forms used only for documentation captures **and** live demo deep links.
- Name files in kebab-case; load into IndexedDB under the **basename without `.json`** (for example `event-registration.json` → key `event-registration`). Exception: some fixtures intentionally use PascalCase keys when the article shows that name (for example `MainForm` from `main-with-modal.json`).
- DB: `example-mui-db`, store: `example-store` (MUI example app).
- Use **variant fixtures** when a page needs a starting state (for example `event-registration-misplaced-phone.json` - Phone under Ticket stack for a move demo).
- **Multi-form guides** (modals): seed every form the article needs in one `prepareBuilder` (for example `confirm-dialog` + `MainForm`), then open each with the Edit pencil.
- **Consistent fixture across a page**: when every section of one article should show the same busy form (right-panel tabs), reuse one large fixture (for example `checkout-sections`) for all shots so readers are not bounced between unrelated forms.
- After seeding multiple forms, **delete the default `MuiForm`** entry from IndexedDB and refresh the Forms tab so the list shows only the seeded names.
- After adding or changing fixtures used by walkthroughs, update article mapping and re-inject tips (embeds `formBody` into links):

```bash
# Edit designer-guide/data/demo-article-forms.json, then:
npm run inject:demo-links --prefix designer-guide
```

Demo URL params (`packages/apps/common-designer`): `form=empty`, `formBody=<base64url>`, optional `formName`, and `view=mui|mantine|rsuite-inject-css|rsuite-import-css`. Walkthrough pages get start/end **Try it** tips that open the demo in a minimal popup window (`openMinimalWindow`). Markdown stores `https://demo.formengine.io/`; `astro dev` rewrites those URLs to `http://localhost:5173/` (Vite default for `packages/apps/demo`; override with `DEMO_URL`).

### Header menu highlights

```text
openMainMenu() → plain screenshot → annotateSingleHeaderMenuItem(page, theme, plainPath, item)
```

Menu item keys in `measure-workspace-layout.mjs`: `save`, `saveAs`, `download`, `upload`, `exportForms`, `importForms`, `clear`, `addNewForm`. Output: `highlight-header-menu-{name}.png` (theme pairs `.light` / `.dark`).

### Forms tab highlights (hard-won rules)

- **List row**: `form-list-item-{FormName}` - use to **wait for visibility** or zone-highlight the row. **Do not** click the row to open the form for editing; that path is unreliable.
- **Open / Edit**: always click `form-list-open-item-{name}` (pencil Edit button test id).
- **Search**: `getByPlaceholder('Search...').fill('Feedback')` - verify filtered rows (`hidden` on excluded items).
- **Remove**: arrow → second `button` in `form-list-item-{name}` (Remove has no test id).
- **Add a new form (Forms tab)**: `add-new-form-button` - use this for Forms-tab create arrows (for example modals Step 1). Distinct from header-menu `addNewForm`.

### Playwright / annotation gotchas

- Prefer `boundingBox()` + null check, or `locator.count()`, over `.catch()` on Playwright locator calls that do not return Promises the way you expect.
- Preview / open dialog highlight: measure `.MuiDialog-paper` when present, else `[role="dialog"]` / `.MuiDialog-root`.
- Arguments accordion on Actions: click **Arguments** if collapsed; tolerate already-open state without aborting the capture.
- Keep scripts resilient: `dismissViteOverlay`, force clicks on tabs, short waits after form open.

### Tree parent / child / move

1. `openGuideForm(page, 'event-registration.json')` - load fixture, open from Forms tab via **Edit** (`form-list-open-item-*`).
2. **Tree** → **Expand all** → `getByTestId('{key}').click()` - keys match component **Key** in JSON (`Contact section`, `Email`, …).
3. **Dual highlight**: tree row box + `{key}-editable-wrapper` on canvas via `annotateZones`.
4. **Drag-move**: use Playwright **`dragTo`**, not manual `mouse` events - react-dnd needs it:

```javascript
await page.getByTestId('Phone').first().dragTo(page.getByTestId('Full name').first(), {
  force: true,
  targetPosition: {x: 8, y: 8},
});
```

Drop onto a **sibling field inside the target stack**, not onto the stack/card row alone (dropping on the parent row often reparents beside the stack). Verify in Tree and on canvas before annotating.

5. **Edit child**: select field in Tree, **Main** tab - highlight `key-labeled-wrapper` and `label-labeled-wrapper`.

### After capture checklist (every new or retaken shot)

1. Light + dark PNG pairs under `designer-guide/public/assets/guide/<section>/`.
2. `cd designer-guide && npm run optimize:images`.
3. Update Markdown (`<img src="/assets/guide/...">` without theme suffix) and `data/guide-screenshot-map.json`.
4. Wire the new basename in `scripts/build-guide-screenshot-catalog.mjs`:
   - `CAPTURE_SCRIPT_BY_PREFIX` → focused capture script
   - `FORM_HINTS` → fixture basenames used by that shot
5. Update or rebuild `scripts/annotation-label-map.json` when highlight/arrow labels changed (`build-annotation-label-map.mjs` if that is how the map is maintained for your change).
6. Rebuild catalog: `node skills/formbuilder-end-user-docs/scripts/build-guide-screenshot-catalog.mjs` (then `--check` if verifying CI).
7. Spot-check the article at `http://localhost:4321/designer/user-guide/...` or via formengine.local.

### Builder runtime (local capture)

```bash
# From repo root - if start:builder hits EMFILE, run Vite directly:
CHOKIDAR_USEPOLLING=1 npx vite --config examples/premium/with-mui/vite.config.ts
# Optional: ulimit -n 65536

CHROME_PATH=/usr/bin/google-chrome node skills/formbuilder-end-user-docs/scripts/<script>.mjs
cd designer-guide && npm run optimize:images
```

Default `BUILDER_URL`: `http://localhost:5173/`. Set `example-view-name=mui` and `example-mui-theme` in localStorage before capture.

### Text–screenshot alignment checklist

- [ ] Every bold UI label in steps exists in the screenshot (or is off-screen with a stated reason).
- [ ] Example form title and field labels match the fixture JSON.
- [ ] Section order: intro figure → numbered steps → optional second figure per subsection.
- [ ] Alt text describes what the reader should notice, including selected component and highlight color/region.
- [ ] Prose does not invent UI names; matches the live builder and fixtures.

## Form Author Guide: local development and proxy

When validating pages, screenshots, or interactive behavior (sidebar SPA nav, theme toggle, image lightbox), run the Astro dev server and open the guide through the local reverse proxy.

### Dev commands

From the **`fb` repo root** (after `npm install`):

```bash
npm run designer-guide:dev    # Astro dev on http://127.0.0.1:4321
npm run designer-guide:build
npm run designer-guide:preview
cd designer-guide && npm run optimize:images   # WebP siblings after new PNGs
```

Direct Astro (no proxy): `npm run dev` from `designer-guide/`.

### `formengine.local` proxy (Caddy)

Hosts file: `127.0.0.1 formengine.local`. Caddy config lives in the sibling **`formengine-tools`** repo at `tools/local-domains/Caddyfile` (reload with `docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile`).

| URL path | Upstream | Start command (`fb` root) |
|----------|----------|---------------------------|
| `/designer/user-guide/` | `:4321` | `npm run designer-guide:dev` |
| `/documentation/` | `:3000` | `npm run docs:start` |
| `/` (example builder) | `:5173` | `npm run start:builder` |

**Why Caddy needs extra rules:** Astro dev serves HTML under `/designer/user-guide/`, but Vite also requests **root-level** URLs (`/@vite/client`, `/@fs/...`, `/@id/...`, `/node_modules/.vite/deps/...`, `/?token=...` for HMR). Without path-based matchers, those hit the builder catch-all and return **502** or break **ClientRouter** SPA navigation.

**Caddy-only HMR (no Astro `vite.server.hmr` config):** Vite's default client URL is `wss://formengine.local/?token=...`. Route `/?token=*` to `:4321`. **Do not require `Referer`** on that matcher - browsers often omit `Referer` on WebSocket upgrades. Tradeoff: if both Astro and the example builder run, builder HMR through `formengine.local/` also hits `:4321`; use `http://localhost:5173` for builder HMR instead.

**Trailing-slash redirect:** Caddy redirects `/designer/user-guide` → `/designer/user-guide/`. Exempt `?token=*` from that redirect so WebSocket handshakes are not broken by a **308** (WebSockets cannot follow redirects).

**Vite virtual module IDs:** `:` in module paths is encoded as `__x00__` (for example `/@id/__x00__astro:transitions/client`). Caddy `@id` matchers must include `(?:__x00__)?(?:virtual:)?astro`.

Full routing table and symptom → fix notes: [reference.md](reference.md) § Local proxy troubleshooting.

### Astro `server.allowedHosts`

`astro.config.mjs` includes `allowedHosts: ['formengine.local']` so Vite accepts proxied requests. Do not remove when testing through Caddy.

### View transitions and client scripts

The guide uses Astro **ClientRouter** (SPA-style navigation). Any head-only or one-shot scripts break across navigations unless re-applied.

| Concern | Pattern | Key files |
|---------|---------|-----------|
| Dark/light theme | Re-apply `dark` class on `astro:page-load` and `astro:after-swap` from `localStorage` key `fe-designer-guide-theme` | `src/components/ThemeInit.astro`, `SiteHeader.astro` |
| Sidebar SPA nav | `navigate()` + listeners on `astro:page-load` / `astro:after-swap` | `src/scripts/docs-sidebar-nav.client.ts`, `DocsSidebarIsland.astro` |
| Screenshot lightbox | **`is:inline`** capture-phase click handler; `data-astro-transition-persist="guide-image-lightbox"`; bind on `astro:page-load` | `src/components/GuideImageLightbox.astro` |
| DocSearch | Re-init on `astro:page-load` | `src/components/DocSearch.astro` |

**Lightbox lesson:** External `*.client.ts` module scripts loaded through the proxy did not reliably attach click listeners in dev. Prefer an inline script in the Astro component when behavior must work behind `formengine.local`.

**Theme lesson:** `ThemeInit` in `<head>` runs only on full page load. ClientRouter swaps `<html>` without re-running it - hook `astro:page-load` and `astro:after-swap`.

### Framework choice (Starlight)

Stay on the **custom Astro** layout (branded chrome, theme-aware screenshots, Algolia DocSearch, `_meta.js` nav, ClientRouter). Do not migrate to Starlight unless requirements change materially - high regression risk for modest gain.

### Validating after guide or proxy changes

1. `https://formengine.local/designer/user-guide/` - page loads, no 502 on `/@vite/client`, `/@id/`, or `/node_modules/.vite/deps/astro_*`.
2. Sidebar link click - **no full page reload** (ClientRouter); Network tab shows view-transition modules, not document navigation.
3. Toggle dark theme → navigate → theme **stays** dark.
4. Click a guide screenshot - lightbox opens full-size PNG.
5. Console - `[vite] connected.` (HMR WebSocket to `wss://formengine.local/?token=...` succeeds).
6. `npm run designer-guide:build` from repo root before large content merges.
