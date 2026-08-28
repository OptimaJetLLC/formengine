# Report: merge Introduction into Meet the Designer

Introduction is no longer a sidebar section. Meet the Designer (`workspace/`) is the product-first start. The Form Author Guide build
completed with 12 sidebar sections and redirects for every old `/introduction/…` URL.

Local base for every article below: [http://learn.formengine.local/](http://learn.formengine.local/)

## New learning path (must-read)

Read these in order, then [Your first form](http://learn.formengine.local/first-form/create-your-first-form/).

| Step | Article                                                                                                                                      | Change        |
|------|----------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| 1    | [What is FormEngine Designer?](http://learn.formengine.local/workspace/what-is-formengine-designer/)                                         | Moved + rewritten |
| 2    | [The Designer workspace](http://learn.formengine.local/workspace/designer-workspace-overview/)                                               | Rewritten     |
| 3    | [Add components from the palette](http://learn.formengine.local/workspace/add-components-from-the-palette/)                                 | Rewritten (lead) |
| 4    | [Select and edit components](http://learn.formengine.local/workspace/select-and-edit-components/)                                           | Links only    |
| 5    | [Preview and Edit](http://learn.formengine.local/workspace/center-canvas-and-header-toolbar/)                                                | Rewritten     |
| 6    | [Save and share](http://learn.formengine.local/workspace/save-and-share/)                                                                    | New           |

## Removed (folded into other pages)

These files are deleted. Old URLs redirect to the destination in the last column.

| Old article (redirects)                                                                                              | What happened                                                                                         | Now live at |
|----------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|-------------|
| [What is a visual UI builder?](http://learn.formengine.local/introduction/what-is-a-visual-ui-builder/)               | Dropped as a standalone theory page. Three-zone model is one paragraph on the workspace tour.         | [The Designer workspace](http://learn.formengine.local/workspace/designer-workspace-overview/) |
| [Components and properties](http://learn.formengine.local/introduction/components-and-properties/)                   | Folded into add-from-palette and the right panel.                                                     | [Right properties panel](http://learn.formengine.local/workspace/use-the-right-properties-panel/) |
| [Canvas and structure tree](http://learn.formengine.local/introduction/canvas-and-structure-tree/)                   | Folded into Tree (canvas vs tree, when to use Tree).                                                  | [Use the component tree](http://learn.formengine.local/workspace/use-the-component-tree/) |
| [Screens, forms, and pages](http://learn.formengine.local/introduction/screens-forms-and-pages/)                     | Short table on the workspace tour; Forms tab explains screen vs form vs page.                         | [Left panel tabs](http://learn.formengine.local/workspace/use-the-left-panel-tabs/) |
| [Preview vs edit mode](http://learn.formengine.local/introduction/preview-vs-edit-mode/)                             | Folded into Preview and Edit (header, Data, Validate).                                                | [Preview and Edit](http://learn.formengine.local/workspace/center-canvas-and-header-toolbar/) |
| [How Designer fits with live forms](http://learn.formengine.local/introduction/how-designer-fits-with-live-forms/)   | Folded into Preview and Edit + Save and share.                                                        | [Preview and Edit](http://learn.formengine.local/workspace/center-canvas-and-header-toolbar/) |
| [Static vs connected form data](http://learn.formengine.local/introduction/static-vs-connected-form-data/)           | Folded into What is form data?                                                                        | [What is form data?](http://learn.formengine.local/fields-and-data/what-is-form-data/) |
| [Saving and publishing](http://learn.formengine.local/introduction/saving-and-publishing/)                           | Replaced by a short Save and share page. Click-paths stay in Manage forms.                            | [Save and share](http://learn.formengine.local/workspace/save-and-share/) |

## Moved (same content, new URL)

| From                                                                                                                 | To | Notes |
|----------------------------------------------------------------------------------------------------------------------|----|-------|
| [What is FormEngine Designer?](http://learn.formengine.local/introduction/what-is-formengine-designer/)               | [What is FormEngine Designer?](http://learn.formengine.local/workspace/what-is-formengine-designer/) | First page in Meet the Designer. License/config note kept once. |
| [Examples and use cases](http://learn.formengine.local/introduction/examples-and-use-cases/)                         | [Examples and use cases](http://learn.formengine.local/workspace/examples-and-use-cases/) | After chrome, before first-form. Screenshots still under `/assets/guide/introduction/`. |
| [View and edit form JSON](http://learn.formengine.local/workspace/view-and-edit-form-json/)                           | [View and edit form JSON](http://learn.formengine.local/advanced/view-and-edit-form-json/) | Out of the first-day tour. |

## Rewritten (kept in Meet the Designer)

| Article                                                                                                              | What changed |
|----------------------------------------------------------------------------------------------------------------------|--------------|
| [The Designer workspace](http://learn.formengine.local/workspace/designer-workspace-overview/)                       | Product-first four-region tour on Event registration. Concept-map table of Introduction links removed. Added a 3-step “name the regions” walkthrough and screen/form/page table. |
| [What is FormEngine Designer?](http://learn.formengine.local/workspace/what-is-formengine-designer/)                 | Opens the section. No pointer to a generic builder page. Next step is the workspace tour. |
| [Preview and Edit](http://learn.formengine.local/workspace/center-canvas-and-header-toolbar/)                        | Retitled from Center canvas and header toolbar. Absorbs edit vs Preview and design vs live form. **Data** and **Validate** described as stock. |
| [Add components from the palette](http://learn.formengine.local/workspace/add-components-from-the-palette/)         | Lead defines component vs properties. See also no longer points at Introduction. |
| [Use the right properties panel](http://learn.formengine.local/workspace/use-the-right-properties-panel/)           | Lead plus Main/Style/Actions/Rules mapping table from the old components page. |
| [Use the left panel tabs](http://learn.formengine.local/workspace/use-the-left-panel-tabs/)                         | Forms tab explains screen vs form vs page. Fixed a split `**Download**` wrap. |
| [Use the component tree](http://learn.formengine.local/workspace/use-the-component-tree/)                           | Canvas vs tree, Tree root = screen, “when you need the tree”. |
| [Examples and use cases](http://learn.formengine.local/workspace/examples-and-use-cases/)                           | Lead no longer splits “use cases here / chrome in Meet the Designer”. |
| [Home](http://learn.formengine.local/)                                                                               | Start here and reading order are product-first. Introduction row removed. |

## Unchanged pages (same section, new sidebar order)

These stayed in Meet the Designer. See also text was updated where it named Introduction.

| Article                                                                                                              |
|----------------------------------------------------------------------------------------------------------------------|
| [Select and edit components](http://learn.formengine.local/workspace/select-and-edit-components/)                   |
| [Canvas drag and drop](http://learn.formengine.local/workspace/canvas-drag-and-drop/)                               |
| [Undo and redo](http://learn.formengine.local/workspace/undo-and-redo/)                                             |
| [Collapse panels and resize the code panel](http://learn.formengine.local/workspace/collapse-panels-and-resize-the-code-panel/) |
| [Light and dark theme](http://learn.formengine.local/workspace/light-and-dark-theme/)                               |

## Other pages that absorbed copy or new links

| Article                                                                                                              | Change |
|----------------------------------------------------------------------------------------------------------------------|--------|
| [What is form data?](http://learn.formengine.local/fields-and-data/what-is-form-data/)                               | New **Static design vs connected data** section. |
| [Static vs dynamic content](http://learn.formengine.local/data-driven/static-vs-dynamic-content/)                    | See also points at What is form data? |
| [Glossary](http://learn.formengine.local/help/glossary/)                                                             | Related links retargeted. |
| [FAQ for form authors](http://learn.formengine.local/help/faq-for-form-authors/)                                     | Preview question → Preview and Edit. |
| [Preview your first form](http://learn.formengine.local/first-form/preview-your-first-form/)                         | See also → Preview and Edit. |
| [Preview mode tools](http://learn.formengine.local/preview-and-handoff/use-preview-mode-tools-data-validate-reset/)  | See also → Preview and Edit. |
| [When to involve developers](http://learn.formengine.local/advanced/when-to-involve-developers/)                     | See also includes form JSON. |

## Redirects

Astro `redirects` in `designer-guide/astro.config.mjs`. Old bookmarks keep working.

| Old path                                           | New path                                      |
|----------------------------------------------------|-----------------------------------------------|
| `/introduction/what-is-formengine-designer/`       | `/workspace/what-is-formengine-designer/`     |
| `/introduction/what-is-a-visual-ui-builder/`       | `/workspace/designer-workspace-overview/`     |
| `/introduction/components-and-properties/`         | `/workspace/use-the-right-properties-panel/`  |
| `/introduction/canvas-and-structure-tree/`         | `/workspace/use-the-component-tree/`          |
| `/introduction/screens-forms-and-pages/`           | `/workspace/use-the-left-panel-tabs/`         |
| `/introduction/preview-vs-edit-mode/`              | `/workspace/center-canvas-and-header-toolbar/`|
| `/introduction/static-vs-connected-form-data/`     | `/fields-and-data/what-is-form-data/`         |
| `/introduction/saving-and-publishing/`             | `/workspace/save-and-share/`                  |
| `/introduction/how-designer-fits-with-live-forms/` | `/workspace/center-canvas-and-header-toolbar/`|
| `/introduction/examples-and-use-cases/`            | `/workspace/examples-and-use-cases/`          |
| `/workspace/view-and-edit-form-json/`              | `/advanced/view-and-edit-form-json/`          |

Example: [http://learn.formengine.local/introduction/what-is-a-visual-ui-builder/](http://learn.formengine.local/introduction/what-is-a-visual-ui-builder/)
sends the reader to [The Designer workspace](http://learn.formengine.local/workspace/designer-workspace-overview/).

## Out of scope (unchanged)

- [Your first form](http://learn.formengine.local/first-form/create-your-first-form/) stays the hands-on tutorial after this section.
- [Save, export, and import](http://learn.formengine.local/manage-forms/save-export-and-import-forms/) still owns the full menu click-paths.
- Example screenshots were not recaptured. They remain at `/assets/guide/introduction/example-*.png`.
