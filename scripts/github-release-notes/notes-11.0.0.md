_October 2, 2026_

## Overview

FormEngine 11.0.0 adds print layout. A header and footer can include `{page}` and `{pages}`, and a page break splits sections. **Print** in the designer menu, or Ctrl/Cmd+P, opens the viewer and calls `window.print()`. [Print your form](https://learn.formengine.io/preview-and-handoff/print-your-form/) walks through the menu.

The [RSuite table](https://formengine.io/documentation/formengine-designer/components/table) design-mode layout and usability are reworked and improved. [showDataInDesigner](https://formengine.io/documentation/formengine-designer/components/table#table-main-properties) stays off until you want the row data on the canvas.

A code or custom action can return `false`. The rest of that chain does not run, and FormEngine does not log an error. `validate` with `failOnError: true` already returns false when the form has errors.

Rich Text writes Quill semantic HTML. Set [useSemanticHTML](https://formengine.io/documentation/api-reference/@react-form-builder/components-rich-text/interfaces/RichTextEditorProps#usesemantichtml) to `false` to keep the editor DOM HTML.

### Why update

* Print a header, footer, or page break from the designer menu. Ctrl/Cmd+P does the same thing.
* The RSuite table design-mode layout and usability are reworked and improved. [showDataInDesigner](https://formengine.io/documentation/formengine-designer/components/table#table-main-properties) puts the row data on the canvas when you need it.
* Stop a chain after `validate`, or from your own action, by returning `false`. FormEngine does not log an error.
* Keep Rich Text values as Quill semantic HTML, or turn [useSemanticHTML](https://formengine.io/documentation/api-reference/@react-form-builder/components-rich-text/interfaces/RichTextEditorProps#usesemantichtml) off.
* Pick up the security bumps below (`dompurify`, `axios`, `undici`, and the rest of that list).

## Key features

* [Page break](https://formengine.io/documentation/components-library/structure-components/page-break) and [Print settings](https://formengine.io/documentation/components-library/structure-components/print-settings). [Print your form](https://learn.formengine.io/preview-and-handoff/print-your-form/).
* [RSuite table](https://formengine.io/documentation/formengine-designer/components/table) design-mode layout and usability are reworked and improved. [showDataInDesigner](https://formengine.io/documentation/formengine-designer/components/table#table-main-properties) shows the row data.
* Return `false` ([ActionResult](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ActionResult)) to stop the chain. [Interrupting the Action Chain](https://formengine.io/documentation/formengine-core/actions-and-events#interrupting-the-action-chain).
* [useSemanticHTML](https://formengine.io/documentation/api-reference/@react-form-builder/components-rich-text/interfaces/RichTextEditorProps#usesemantichtml) on Rich Text, default `true`.

## Changelog

### Update instructions

Update all packages to version **11.0.0**.

Printing needs `@react-form-builder/components-print`. Register the print components on the builder view and pass the print models into the viewer. Steps are on [Print settings](https://formengine.io/documentation/components-library/structure-components/print-settings#connection-to-formbuilder-component) and [Page break](https://formengine.io/documentation/components-library/structure-components/page-break#connect-to-formviewer-component). For the designer menu, see [Print your form](https://learn.formengine.io/preview-and-handoff/print-your-form/).

If you use `@react-form-builder/components-rsuite-table`, import its stylesheet. The package does not load it for you:

```typescript
import '@react-form-builder/components-rsuite-table/assets/styles.css'
```

[useSemanticHTML](https://formengine.io/documentation/api-reference/@react-form-builder/components-rich-text/interfaces/RichTextEditorProps#usesemantichtml) defaults to `true`, so the next edit writes Quill semantic HTML. Set it to `false` to keep the editor DOM HTML.

### Features

* Added [Page break](https://formengine.io/documentation/components-library/structure-components/page-break) and [Print settings](https://formengine.io/documentation/components-library/structure-components/print-settings). Break before, break after, and break inside are in [Page break properties](https://formengine.io/documentation/components-library/structure-components/page-break#properties). Header, footer, and alignment are in [Print settings properties](https://formengine.io/documentation/components-library/structure-components/print-settings#properties). `{page}` and `{pages}` fill in the page numbers. A form holds one Print settings component. The viewer hides both components on screen. In the designer, Print settings sits in the non-visual bar.
* An action can return [ActionResult](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ActionResult) `false`. Later actions in that chain do not run. This works for code actions in form JSON and for custom actions in application code. `validate` with `failOnError: true` returns false when the form has errors.
* Added [useSemanticHTML](https://formengine.io/documentation/api-reference/@react-form-builder/components-rich-text/interfaces/RichTextEditorProps#usesemantichtml) on the [Rich text editor](https://formengine.io/documentation/formengine-designer/components/rich-text-editor). `true` stores Quill semantic HTML.

### Enhancements

* Reworked and improved the [RSuite table](https://formengine.io/documentation/formengine-designer/components/table) design-mode layout and usability. [showDataInDesigner](https://formengine.io/documentation/formengine-designer/components/table#table-main-properties) is off by default. Turn it on when the canvas should show the row data.
* Component actions sit behind a hamburger button. The strip includes Reveal in tree and Show nearby components. Add opens on click. [Canvas drag and drop](https://learn.formengine.io/meet-the-designer/canvas-drag-and-drop/) matches this toolbar.

### Bug fixes

* Published `.d.ts` files import `@react-form-builder/core`. They no longer contain the bare path `packages/core/src`, which consumers cannot resolve.
* After a constrained Monaco editor has been shown, Ctrl/Cmd+A works again in the other editors, including the form JSON editor. See [Computed properties](https://formengine.io/documentation/formengine-designer/features/computed-properties).
* Align Items fits the Style tab, including End. The same radio group is used for text alignment on other components, and those rows fit the panel too. See [Component styling](https://formengine.io/documentation/formengine-designer/features/component-styling).

### Resources

* [Print settings](https://formengine.io/documentation/components-library/structure-components/print-settings) and [Page break](https://formengine.io/documentation/components-library/structure-components/page-break) cover install, registration, and the print menu. [Print your form](https://learn.formengine.io/preview-and-handoff/print-your-form/).
* [Interrupting the Action Chain](https://formengine.io/documentation/formengine-core/actions-and-events#interrupting-the-action-chain) includes a consent example that returns `false`.
* [Signature](https://formengine.io/documentation/formengine-designer/components/signature) now includes screenshots and a description of how the pad works.
* [Rich text editor](https://formengine.io/documentation/formengine-designer/components/rich-text-editor) lists Use semantic HTML on the Main tab.
* Toolbar pages that describe the hamburger strip, Reveal in tree, and click-to-add: [Canvas drag and drop](https://learn.formengine.io/meet-the-designer/canvas-drag-and-drop/), [Add components from the palette](https://learn.formengine.io/meet-the-designer/add-components-from-the-palette/), [Select and edit components](https://learn.formengine.io/meet-the-designer/select-and-edit-components/), and [Preset components](https://learn.formengine.io/manage-forms/preset-components/).

### Security

* Bumped `dompurify` from `3.4.15` to `3.4.16`.
* Bumped `dompurify` from `3.4.12` to `3.4.16` in examples.
* Bumped `axios` from `1.18.1` to `1.20.0` in examples.
* Bumped `brace-expansion` from `1.1.18` to `1.1.21`.
* Bumped `fast-uri` from `3.1.7` to `3.1.8`.
* Bumped `fast-uri` from `3.1.4` to `3.1.7`/`3.1.8` in examples.
* Bumped `ip-address` from `10.3.1`/`10.4.0` to `10.7.2`.
* Bumped `undici` from `8.10.0` to `8.11.2`.
* Bumped `@swc/html` from `1.10.9` to `1.16.2`.
* Bumped `qs` from `6.15.3` to `6.16.0`.

### Chore

* Bumped `react-quill-new` from `3.3.0` to `3.8.3`.
* Bumped `signature_pad` from `5.0.1` to `5.1.4`.
* Bumped `monaco-editor` from `0.55.1` to `0.57.0`.
* Bumped `zod` from `4.4.3` to `4.6.5`.
* Bumped `fast_qr` from `0.12.5` to `0.13.0`.
* Bumped `@tiptap/core` from `3.19.0` to `3.31.0`.
* Bumped `@playwright/test` from `1.57.0` to `1.63.0`.
* Bumped `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`, and `@typescript-eslint/typescript-estree` from `8.48.1` to `8.70.0`.
* Bumped `@docusaurus/core`, `@docusaurus/faster`, `@docusaurus/preset-classic`, `@docusaurus/theme-live-codeblock`, `@docusaurus/theme-mermaid`, `@docusaurus/module-type-aliases`, `@docusaurus/tsconfig`, and `@docusaurus/types` from `3.8.1` to `3.10.2`.
* Bumped `knip` from `6.3.0` to `6.35.1`.
* Bumped `image-size` from `2.0.2` to `2.0.4`.
* Bumped `@angular/common`, `@angular/core`, and `@angular/compiler` from `21.2.17`/`21.2.19` to `21.2.20` in examples.
* Bumped `eslint-import-resolver-typescript` from `4.4.4` to `4.4.5`.
* Bumped `lefthook` from `2.1.9` to `2.1.14`.
* Bumped `jszip` from `3.10.1` to `3.10.2`.
* Bumped `@types/file-saver` from `2.0.5` to `2.0.7`.
* Bumped `postcss` from `8.5.23` to `8.5.28`.
* Bumped `dayjs` from `1.11.19` to `1.11.23`.
* Bumped `serve` from `14.2.5` to `14.2.6`.
* Bumped `@mdx-js/react` from `3.1.0` to `3.1.1`.
* Bumped `docusaurus-plugin-typedoc` from `1.4.0` to `1.4.3`.
* Bumped `typedoc` from `0.28.7` to `0.28.20`.
* Bumped `typedoc-plugin-markdown` from `4.7.1` to `4.13.1`.
* Bumped `playwright-ctrf-json-reporter` from `0.0.27` to `0.0.29`.
