_November 11, 2026_

## Overview

FormEngine 12.0.0 requires React 18 or 19. React 17 is out of the peer range. Core and Designer now peer on MobX 7 and mobx-react 10. Material UI components peer on MUI 9 and MUI X Date Pickers 9; several designer layout props moved into `sx` or were renamed.

`@react-form-builder/components-rsuite` adds [Accordion](https://formengine.io/documentation/components-library/structure-components/accordion) and [Accordion panel](https://formengine.io/documentation/components-library/structure-components/accordion-panel). [Sortable list](https://formengine.io/documentation/components-library/structure-components/sortable-list) is a separate package for repeating rows that users can reorder. See the [usage guide](https://learn.formengine.io/fields-and-data/sortable-list/).

Fixed overlays stay inside the designer canvas. Print preview no longer shows RSuite toasts and other body portals. Unsaved action-editor drafts survive parameter edits. Material UI errors show on the first Validate. Uploader success no longer always fires `onError`.

Parent and modal forms share one [userContext](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) object by reference. Nested fields are not deep-observed. [Sharing mutations across parent and modal forms](https://formengine.io/documentation/formengine-core/storing-user-defined-data#sharing-mutations-across-parent-and-modal-forms).

### Why update

- Drop React 17. Peers are React and React DOM `^18 || ^19`.
- Install MobX 7 / mobx-react 10 with Core and Designer.
- Move to Material UI 9 / MUI X Date Pickers 9 and apply the Material UI prop migrations below.
- Use [Accordion](https://formengine.io/documentation/components-library/structure-components/accordion) and [Sortable list](https://formengine.io/documentation/components-library/structure-components/sortable-list).
- Mutate [userContext](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) in a modal and see it on the parent and host object.
- Pick up the designer, Uploader, and security fixes below.

## Key features

- React peers are `^18 || ^19`.
- MobX peers are [mobx](https://mobx.js.org/) `^7.1.0` and [mobx-react](https://github.com/mobxjs/mobx) `^10.0.2`.
- Material UI peers are `@mui/material` `^9.5.0` and `@mui/x-date-pickers` `^9.16.0`. [Material UI components](https://formengine.io/documentation/components-library/material-ui).
- [Accordion](https://formengine.io/documentation/components-library/structure-components/accordion) and [Accordion panel](https://formengine.io/documentation/components-library/structure-components/accordion-panel).
- [Sortable list](https://formengine.io/documentation/components-library/structure-components/sortable-list) lets users reorder rows by dragging. See the [usage guide](https://learn.formengine.io/fields-and-data/sortable-list/).
- Uploader [paste](https://formengine.io/documentation/api-reference/@react-form-builder/components-uploader/interfaces/UploaderProps#paste) (default `false`) and fixed success / `onError` handling.
- [ComponentData.setUserDefinedProp](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#setuserdefinedprop).

## Changelog

### Breaking changes

- Removed React 17 from peer ranges. Supported peers are React and React DOM `^18 || ^19`. Upgrade off React 17 before installing FormEngine 12.
- Raised MobX peers to `mobx` `^7.1.0` and `mobx-react` `^10.0.2` (`mobx-react-lite` 5 comes in transitively). If you still call `observable.ref` or `observable.deep`, switch to the MobX 7 named annotation exports. See [Migrating from MobX 6 to MobX 7](https://mobx.js.org/migrating-from-6-to-7.html).
- Upgraded `@react-form-builder/components-material-ui` peers to `@mui/material` `^9.5.0` and `@mui/x-date-pickers` `^9.16.0`. Designer props that used removed MUI system props changed as follows:
  - [MuiBox](https://formengine.io/documentation/api-reference/@react-form-builder/components-material-ui/variables/muiBox): dropped `maxWidth`. Put layout limits in [sx](https://formengine.io/documentation/api-reference/@react-form-builder/components-material-ui/interfaces/MuiBoxProps).
  - [MuiStack](https://formengine.io/documentation/api-reference/@react-form-builder/components-material-ui/variables/muiStack): dropped `justifyContent`, `alignItems`, and `flexWrap`. Move them into `sx`.
  - [MuiTypography](https://formengine.io/documentation/api-reference/@react-form-builder/components-material-ui/variables/muiTypography): `textAlign` is now the native Typography `align` prop.
  - [MuiDialog](https://formengine.io/documentation/api-reference/@react-form-builder/components-material-ui/variables/muiDialog): dropped `disableEscapeKeyDown`. Escape always closes the dialog; ignore `escapeKeyDown` in `onClose` when Escape must not close it.
  - [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker): uses MUI X Date Pickers v9 types. FormEngine `value` / `onChange` stay `Date | null`.
- Removed the exported `EditableTableState` type from `@react-form-builder/designer` and its generated API docs. Delete imports of that type.
- Upgraded `@react-form-builder/components-uploader` to `react-dropzone` `^20.2.0`:
  - Successful uploads call `onChange` only. Before this release, a `filePath` / `url` mismatch marked every success as a failure and also fired `onError`. Change form actions that depended on that always-`onError` path.
  - Non-OK HTTP responses are failures even when the JSON body looks successful.
  - Upstream `maxFiles` keeps files up to the limit instead of rejecting the whole batch.
  - `react-dropzone` 20 sets `engines.node: >= 22`. Node 20 installs may warn about engines.

### Update instructions

Update all FormEngine packages to version **12.0.0**.

Use React 18 or 19. Remove React 17 from resolutions or nested installs.

Install matching MobX peers:

```bash
npm install mobx@^7.1.0 mobx-react@^10.0.2
```

If application code still uses `observable.ref` or `observable.deep`, switch to the MobX 7 named annotations in [Migrating from MobX 6 to MobX 7](https://mobx.js.org/migrating-from-6-to-7.html).

Install the Material UI v9 peers:

```bash
npm install @mui/material@^9.5.0 @mui/x-date-pickers@^9.16.0 @emotion/react @emotion/styled dayjs
```

Then update saved form JSON and custom wrappers:

1. On `MuiBox`, remove `maxWidth` and put it in `sx` (for example `maxWidth: theme.breakpoints.values.md`).
2. On `MuiStack`, remove `justifyContent`, `alignItems`, and `flexWrap` from the designer props and put them in `sx`.
3. On `MuiTypography`, rename `textAlign` to `align`.
4. On `MuiDialog`, remove `disableEscapeKeyDown`. In `onClose`, ignore `reason === 'escapeKeyDown'` when Escape must not close the dialog.
5. Keep DatePicker `value` / `onChange` as `Date | null`. Upgrade any direct MUI X Date Pickers usage for v9 on its own.

If you still want those old layout fields as first-class designer props, expose them through custom component annotations. The built-in components no longer ship them.

After upgrading `@react-form-builder/components-uploader`, check actions that listened for `onError` on every upload. Success now goes through `onChange` only. Set [paste](https://formengine.io/documentation/api-reference/@react-form-builder/components-uploader/interfaces/UploaderProps#paste) to `true` only when paste-to-upload should work (default is `false`). `readOnly` blocks dropzone interaction the same way as `disabled`.

Install and register `@react-form-builder/components-sortable-list` using the [package documentation](https://formengine.io/documentation/components-library/structure-components/sortable-list). For form setup steps, see the [usage guide](https://learn.formengine.io/fields-and-data/sortable-list/).

Accordion is in `@react-form-builder/components-rsuite`. Register the RSuite view as usual. Dropping a non-panel child into Accordion wraps it in an [Accordion panel](https://formengine.io/documentation/components-library/structure-components/accordion-panel).

Delete any `EditableTableState` imports from `@react-form-builder/designer`.

[userContext](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) is stored with `observableRef`, so parent, modal, and host share one object. FormEngine does not deep-observe nested fields. Pass a host-owned `observable(...)` if you need nested MobX reactions. Replace the prop and rerender to swap the whole environment. [When you need reactivity](https://formengine.io/documentation/formengine-core/storing-user-defined-data#when-you-need-reactivity).

If you build this repository, use Node.js **26.13.0** and npm **11.21.2** from `.nvmrc`. The monorepo is on Vite **8.x**, ESLint **10.x** (flat config), and Lerna **10.x**. Published packages do not require Node 26; Uploader's `react-dropzone` 20 expects Node 22+.

### Features

- Added [Accordion](https://formengine.io/documentation/components-library/structure-components/accordion) and [Accordion panel](https://formengine.io/documentation/components-library/structure-components/accordion-panel) to `@react-form-builder/components-rsuite`. Accordion can keep one panel open or let panels expand independently. Dropping a non-panel component into Accordion creates a panel wrapper. See [RsAccordionProps](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsAccordionProps).
- Added [Sortable list](https://formengine.io/documentation/components-library/structure-components/sortable-list) as `@react-form-builder/components-sortable-list`. It reuses Repeater row templates, `value`, `addRow`, and `removeRow`, and adds drag and keyboard reorder handles. See the [usage guide](https://learn.formengine.io/fields-and-data/sortable-list/).
- Added [paste](https://formengine.io/documentation/api-reference/@react-form-builder/components-uploader/interfaces/UploaderProps#paste) on Uploader (default `false`).
- Added [ComponentData.setUserDefinedProp](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#setuserdefinedprop). RSuite Menu, Tab, and the built-in `openModal` action update one override at a time through this method. [ActionEventArgs.setUserDefinedProps](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ActionEventArgs#setuserdefinedprops) still replaces the whole bag.
- Added [searchable](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsDropdownProps#searchable) on [RsDropdown](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/rsDropdown) and [searchable](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsTagPickerProps#searchable) on [RsTagPicker](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/rsTagPicker).

### Enhancements

- Keep author CSS such as `position: fixed` inside the designer form viewer so full-viewport overlays no longer cover designer chrome.
- Canvas drag-and-drop auto-scroll follows the designer canvas more reliably while dragging.
- [useDisposable](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/useDisposable) publishes disposable resources through React's `useSyncExternalStore`, including Strict Mode create/dispose order.
- Shared Vite React tooling uses `@vitejs/plugin-react` (Oxc Fast Refresh) in the monorepo and examples.
- React 19 hosts in the monorepo declare `react` / `react-dom` `^19.3.1`. React 18 peers stay supported.
- Designer Font Awesome free SVG icon packages are on 7.3.1 with barrel icon imports.
- Vitest / jsdom runs and component-test overhead are lower in the repository test workspaces.

### Bug fixes

- Hide RSuite body-level portals (toasts, modal/drawer chrome, tooltips, popovers, picker menus) under `@media print` so they stay out of designer print preview.
- The component toolbar portaled to `document.body` uses designer typography again.
- Keep unsaved action-editor code when changing action parameters. Explicit source loads still replace the editor body.
- HTML attribute table edits apply only on Apply. Row deletion passes a new array to `onChange`, so pending drafts no longer leave deleted rows visible.
- Material UI validation errors show on the first manual Validate in Designer Preview, including [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker) and controls without native helper text.
- The Required checkbox in the property panel follows the selected component after switching from a required field to an optional one.
- Keep component selection when creating presets.
- Uploader treats a missing `url` as failure, treats non-OK HTTP status as failure, and treats `readOnly` like `disabled` for interaction.
- Parent, modal, and host share one [userContext](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#usercontext) reference. Nested fields are not deep-observed. [Sharing mutations across parent and modal forms](https://formengine.io/documentation/formengine-core/storing-user-defined-data#sharing-mutations-across-parent-and-modal-forms).

### Resources

- [Accordion](https://formengine.io/documentation/components-library/structure-components/accordion) and [Accordion panel](https://formengine.io/documentation/components-library/structure-components/accordion-panel).
- [Sortable list package documentation](https://formengine.io/documentation/components-library/structure-components/sortable-list) and [usage guide](https://learn.formengine.io/fields-and-data/sortable-list/).
- [Material UI](https://formengine.io/documentation/components-library/material-ui) package docs and [MuiDatePicker](https://formengine.io/documentation/components-library/material-ui/date-picker).
- [ComponentData.setUserDefinedProp](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#setuserdefinedprop).
- [UploaderProps.paste](https://formengine.io/documentation/api-reference/@react-form-builder/components-uploader/interfaces/UploaderProps#paste).
- [useDisposable](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/useDisposable).
- [Store custom data in forms](https://formengine.io/documentation/formengine-core/storing-user-defined-data): [userContext](https://formengine.io/documentation/formengine-core/storing-user-defined-data#accessing-your-environment-via-usercontext), [parent/modal sharing](https://formengine.io/documentation/formengine-core/storing-user-defined-data#sharing-mutations-across-parent-and-modal-forms), [reactivity](https://formengine.io/documentation/formengine-core/storing-user-defined-data#when-you-need-reactivity).
- Designer FAQ: [userContext](https://formengine.io/documentation/formengine-designer/faq/storing-user-defined-data#accessing-your-environment-via-usercontext).

### Security

- Bumped `joi` from `17.13.8` to `17.13.9` (GHSA-4528-x5fx-h6hg).
- Bumped `follow-redirects` from `1.16.0` to `1.16.2` (GHSA-mrwp-f3q8-3g9p).
- Bumped `follow-redirects` to `1.16.2` in examples.
- Bumped `lodash-es` from `4.17.23` to `4.18.1`.
- Bumped `qs` from `6.16.0` to `6.16.2`.
- Bumped `qs` and `express` in examples.
- Bumped `dompurify` from `3.4.16` to `3.4.17` in examples.
- Bumped `handlebars` from `4.7.9` to `4.7.10`.
- Bumped `ip-address` from `10.7.2` to `10.7.4`.
- Bumped `katex` from `0.16.47` to `0.18.10`.
- Bumped `shell-quote` from `1.10.0` to `1.12.0`.
- Bumped `body-parser` from `1.20.8` to `1.20.9`.
- Bumped `fast-uri` from `3.1.7`/`3.1.8` to `3.1.9`.
- Bumped `postcss-selector-parser` from `6.1.4` to `6.1.5`.
- Bumped `markdown-it` from `14.2.0` to `14.3.3` in examples.

### Chore

- Bumped monorepo Node.js pin from `24.18.0` to `26.13.0` and npm to `11.21.2`.
- Bumped `vite` from `7.x` to `^8.3.6` and switched examples to `@vitejs/plugin-react` `^6.2.1`.
- Bumped `eslint` to `10.14.0` with flat config; migrated to `eslint-plugin-import-x` and `@eslint-react/eslint-plugin`.
- Bumped `lerna` from `9.x` to `^10.1.1`.
- Bumped designer `i18next` to `^26.7.1`, `react-i18next` to `^17.1.12`, and related i18n packages.
- Bumped `react-dropzone` from `^14.3.8` to `^20.2.0` in `@react-form-builder/components-uploader`.
- Bumped `rimraf` from `5.0.0` to `6.1.3`.
- Bumped `dotenv-cli` to `11.1.0`.
- Bumped `@testing-library/jest-dom` to `7.0.1`.
- Bumped `eslint-plugin-jsdoc` to `65.4.2`/`65.4.3`.
- Bumped Vitest test stack to `5.0.5` and `jsdom` in the test workspaces.
- Moved declaration emit to unplugin DTS in package builds.
