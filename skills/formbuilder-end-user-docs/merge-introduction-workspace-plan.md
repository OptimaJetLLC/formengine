# Plan: merge Introduction and Meet the Designer

Audience: someone who has never used a visual form builder. Teach FormEngine Designer
by showing the real UI, not a generic “any builder” theory track first.

This is a **plan only**. Do not rewrite pages until this file is agreed.

## Problem

Today a new author must finish **10 Introduction pages** (generic vocabulary) before
**What is FormEngine Designer?** (item 8 in the intro sidebar), then switch to a second
section, **Meet the Designer** (**12 workspace pages**). That is 22 orientation pages
before [Your first form](/first-form/create-your-first-form).

Introduction pages are concept-only, then an **In FormEngine Designer** stub that points
at workspace. Workspace overview is a concept map back to Introduction. The same ideas
are taught twice with different names.

A first-day author needs one path: what this product is → see the screen → do the
core loop (add, select, edit, Preview) → know save vs live → then the first-form tutorial.

## Current inventory

### Introduction (`content/introduction/`, sidebar **Introduction**)

| Page                              | Role today                         | Overlaps with                                      |
|-----------------------------------|------------------------------------|----------------------------------------------------|
| `what-is-a-visual-ui-builder`     | 3-zone model, no screenshots       | Workspace overview                                 |
| `components-and-properties`       | Component vs property              | Palette + right panel                              |
| `canvas-and-structure-tree`       | Canvas vs tree                     | Canvas/header + Tree                               |
| `screens-forms-and-pages`         | Screen vs form vs app page         | Left panel Forms tab + manage-forms                |
| `preview-vs-edit-mode`            | Edit vs Preview                    | Canvas/header + first-form Preview                 |
| `static-vs-connected-form-data`   | Labels vs runtime values + keys    | `fields-and-data/what-is-form-data`                |
| `saving-and-publishing`           | Save / export / publish            | Header menu + manage-forms + export page           |
| `what-is-formengine-designer`     | Product, audience, license note    | Should be first, not eighth                        |
| `how-designer-fits-with-live-forms` | Design vs runtime                | Preview + saving                                   |
| `examples-and-use-cases`          | Patterns + demo Try it             | Keep; too late in intro, too early as “theory”     |

### Meet the Designer (`content/workspace/`, sidebar **Meet the Designer**)

| Page                                      | Role today                      | Beginner?        |
|-------------------------------------------|---------------------------------|------------------|
| `designer-workspace-overview`             | Four regions + concept map      | Yes, day one     |
| `use-the-left-panel-tabs`                 | Components / Tree / Settings / Forms | Yes          |
| `center-canvas-and-header-toolbar`        | Canvas, Preview, header         | Yes              |
| `use-the-right-properties-panel`          | Main / Style / Actions / Rules  | Yes              |
| `use-the-component-tree`                  | Expand, select, reorder         | Yes, after add   |
| `add-components-from-the-palette`         | Search, drag, double-click      | Yes, core loop   |
| `select-and-edit-components`              | Select, duplicate, delete       | Yes, core loop   |
| `canvas-drag-and-drop`                    | Drop zones, multi-select, toolbar | After core loop |
| `undo-and-redo`                           | Undo/redo                       | After core loop  |
| `collapse-panels-and-resize-the-code-panel` | Panel chrome                  | Optional         |
| `light-and-dark-theme`                    | Theme toggle                    | Optional         |
| `view-and-edit-form-json`                 | Raw JSON                        | Not day one      |

## Target learning path

One sidebar section. Product-first. Each page shows Designer chrome (screenshot or Try it).
Generic “any builder” framing is dropped except a short 3-zone sentence on the workspace page.

### Must-read (in this order)

1. **What is FormEngine Designer?** — who it is for, no code required, license/config note.
2. **The Designer workspace** — four regions on a real form (Event registration), 3-zone
   idea named in Designer labels, Try it demo.
3. **Add components** — search, drag, double-click (stock Designer).
4. **Select and edit** — canvas or Tree → right panel; duplicate/delete.
5. **Preview and Edit** — header Preview/Edit; Data / Validate (stock); design vs live form
   in one short table.
6. **Save and share** — menu Save / Download / Export; publish is the host app (one
   paragraph, not a second theory page).

Then send the reader to **Your first form**.

### Read next (same section, after the core loop)

7. **Left panel tabs** — four tabs in one tour (still useful; keep shorter).
8. **Right properties panel** — Main / Style / Actions / Rules (detail after select).
9. **Component tree** — nested forms, reorder.
10. **Canvas drag and drop** — drop zones, floating toolbar.
11. **Undo and redo**
12. **Examples and use cases** — what you can build; after they can name the chrome.

### Optional / move out

13. **Collapse panels** — keep at end of section.
14. **Light and dark theme** — keep at end, or later move under Appearance.
15. **View and edit form JSON** — **move to Advanced**. Not a first-day skill.

## Page decisions

| Current page | Action | Destination |
|--------------|--------|-------------|
| `what-is-formengine-designer` | **Keep**, make first | `workspace/what-is-formengine-designer.md` (or keep path + redirect) |
| `what-is-a-visual-ui-builder` | **Drop as standalone** | Fold 3-zone diagram into workspace overview |
| `designer-workspace-overview` | **Keep**, rewrite as page 2 | Absorb 3-zone model; drop the concept-map table of intro links |
| `add-components-from-the-palette` | **Keep** | Absorb palette bits from `components-and-properties` |
| `select-and-edit-components` | **Keep** | Core loop |
| `use-the-right-properties-panel` | **Keep** | After select; absorb property groups from intro |
| `components-and-properties` | **Drop** | Folded into add + right panel |
| `center-canvas-and-header-toolbar` | **Keep**, retitle toward Preview | Absorb `preview-vs-edit-mode` + live-form row |
| `preview-vs-edit-mode` | **Drop** | Folded into canvas/header |
| `how-designer-fits-with-live-forms` | **Drop** | Folded into Preview page + save page |
| `use-the-left-panel-tabs` | **Keep** | After core loop |
| `use-the-component-tree` | **Keep** | Absorb `canvas-and-structure-tree` |
| `canvas-and-structure-tree` | **Drop** | Folded into Tree + canvas |
| `screens-forms-and-pages` | **Drop as standalone** | Short “screen vs form vs app page” on left-panel Forms + workspace overview |
| `static-vs-connected-form-data` | **Drop** | Point to `fields-and-data/what-is-form-data` (already the real lesson) |
| `saving-and-publishing` | **Merge** | Short save page in this section; deep steps stay in manage-forms / export |
| `examples-and-use-cases` | **Keep**, later in section | After chrome, before first-form |
| `canvas-drag-and-drop` | **Keep** | After Tree |
| `undo-and-redo` | **Keep** | After core loop |
| `collapse-panels-and-resize-the-code-panel` | **Keep** | End of section |
| `light-and-dark-theme` | **Keep** | End of section |
| `view-and-edit-form-json` | **Move** | `advanced/view-and-edit-form-json.md` |

No new long theory pages. One possible **new** page only if overview gets too long:
a 5-minute “open demo, name four regions, Preview, Edit” walkthrough. Prefer folding
that into workspace overview instead of a 23rd page.

## Proposed sidebar (one section)

**Folder:** keep `content/workspace/` (screenshots and inbound `/workspace/…` links).
**Sidebar label:** Meet the Designer (or Get started if we rename later).
**Drop** `content/introduction/` after redirects exist.

Suggested `_meta.js` order:

1. `what-is-formengine-designer`
2. `designer-workspace-overview`
3. `add-components-from-the-palette`
4. `select-and-edit-components`
5. `center-canvas-and-header-toolbar` (Preview / Edit)
6. `save-and-share` (merged save page; new filename)
7. `use-the-left-panel-tabs`
8. `use-the-right-properties-panel`
9. `use-the-component-tree`
10. `canvas-drag-and-drop`
11. `undo-and-redo`
12. `examples-and-use-cases` (moved from introduction)
13. `collapse-panels-and-resize-the-code-panel`
14. `light-and-dark-theme`

Root `_meta.js`: remove `introduction`. `workspace` stays next to `first-form`.

## URL redirects

There is no redirect map today. Add Astro `redirects` so old `/introduction/…` URLs keep
working (index, first-form, help, developer `designer-guide:` links).

| Old path | New path |
|----------|----------|
| `/introduction/what-is-formengine-designer/` | `/workspace/what-is-formengine-designer/` |
| `/introduction/what-is-a-visual-ui-builder/` | `/workspace/designer-workspace-overview/` |
| `/introduction/components-and-properties/` | `/workspace/use-the-right-properties-panel/` |
| `/introduction/canvas-and-structure-tree/` | `/workspace/use-the-component-tree/` |
| `/introduction/screens-forms-and-pages/` | `/workspace/use-the-left-panel-tabs/` |
| `/introduction/preview-vs-edit-mode/` | `/workspace/center-canvas-and-header-toolbar/` |
| `/introduction/static-vs-connected-form-data/` | `/fields-and-data/what-is-form-data/` |
| `/introduction/saving-and-publishing/` | `/workspace/save-and-share/` |
| `/introduction/how-designer-fits-with-live-forms/` | `/workspace/center-canvas-and-header-toolbar/` |
| `/introduction/examples-and-use-cases/` | `/workspace/examples-and-use-cases/` |
| `/workspace/view-and-edit-form-json/` | `/advanced/view-and-edit-form-json/` |

Confirm exact trailing-slash rules against `designer-guide/site-paths.mjs` when implementing.

## Writing rules (from the skill)

- Stock Designer click-paths. No `when available` on Validate, double-click, Data panel.
- License/config note stays **once** on What is FormEngine Designer?
- Screenshots and Try it on every chrome page.
- One short lead. No “In this guide, you'll learn” lists.
- Do not split `**bold**` across line wraps.

## Implementation steps

1. **Agree this plan** (section name, drop list, JSON → Advanced).
2. **Rewrite workspace overview** as page 2 (regions + 3-zone + Event registration Try it).
   Remove the intro concept-map table.
3. **Move** `what-is-formengine-designer.md` into `workspace/` (or copy then redirect).
4. **Fold and delete** the seven intro concept pages listed as Drop.
5. **Write** `workspace/save-and-share.md` from saving-and-publishing + how-designer-fits
   (short). Leave manage-forms / export pages as the how-to.
6. **Move** `examples-and-use-cases.md` into `workspace/`; retarget See also links.
7. **Move** JSON page to `advanced/`; update `_meta.js`.
8. **Tighten** left panel, Tree, right panel, canvas/header so they do not repeat the
   overview; each page teaches one region in depth.
9. **Add redirects** in `designer-guide/astro.config.mjs`.
10. **Fix inbound links:** `content/index.md`, first-form, help, glossary, other sections,
    `docs:designer-guide:` links under `documentation/docs/`.
11. **Update skill:** `SKILL.md` first-time-setup currently says Introduction is generic
    and Meet the Designer is chrome. Change to one product-first section.
12. **Update** `guide-screenshot-map.json`, `demo-article-forms.json`, catalog prefixes,
    `skip-headings.json`. Rebuild catalog.
13. **Build** `npm run designer-guide:build` and fix broken links.

Do not recapture screenshots unless a merged page needs a new figure. Reuse Event
registration and existing workspace assets.

## Out of scope

- Rewriting Your first form (it stays the hands-on tutorial after this section).
- Merging manage-forms, fields-and-data, or preview-and-handoff into this section.
- Changing demo.formengine.io Try it behavior.
