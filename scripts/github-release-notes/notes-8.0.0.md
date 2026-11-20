_April 21, 2026_

## Overview

FormEngine 8.0.0 removes Emotion-based style injection from Core, Designer, and view packages. Component styles are now shipped as static assets (including CSS modules where applicable), which works better with strict [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP) rules. The designer gains finer control over main menu items, and viewer localization behavior is now explicit: [FormViewerLite](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewerLite) applies [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) by default, while [FormViewer](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewer) accepts an explicit [localizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#localizationengine), so you can disable the default Fluent localization behavior with `NoopLocalizationEngine` or provide a custom [ILocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationEngine). The embedded Monaco editor is also updated. This release includes several localization and RTL styling fixes.

### Why update

- Adopt **CSP-friendly** Core styling by importing [`@react-form-builder/core/assets/styles.css`](https://formengine.io/documentation/formengine-core/installation#step-3-create-your-first-form) instead of relying on runtime Emotion injection.
- Use **viewer localization control** based on the runtime you choose: [FormViewerLite](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewerLite) uses [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) by default, while [FormViewer](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewer) accepts an explicit [localizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#localizationengine): use [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) to disable the default Fluent localization behavior, or pass your own [ILocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationEngine) implementation.
- **Customize designer main menu** entries (hide, style, or replace controls) via [Menu items customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#menu-items-customization).
- Get an updated **Monaco** editor, plus fixes for the localization editor and **RTL / screen styles**.

## Key features

- Core styles ship as static CSS for stricter CSP: import `@react-form-builder/core/assets/styles.css` per [Install FormEngine Core](https://formengine.io/documentation/formengine-core/installation).
- [FormViewerLite](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewerLite) uses [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) by default; [FormViewer](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewer) takes [localizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#localizationengine) on [FormViewerProps](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps), so you can use [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) or a custom [ILocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationEngine).
- [Menu items customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#menu-items-customization) for Designer main-menu controls (`MainMenu_Item_*` keys).
- Monaco editor updated to **0.55.1**.

## Changelog

### Breaking changes

- FormEngine packages now deliver styling through **static CSS and CSS modules** instead of injecting FormEngine-owned rules with Emotion. Import the published stylesheets for each stack you use (for Core, `@react-form-builder/core/assets/styles.css`; see [Install FormEngine Core](https://formengine.io/documentation/formengine-core/installation) and other package docs). Your application may still resolve **`@emotion/*` or similar CSS-in-JS** from **third-party dependencies** (for example, Material UI’s default Emotion integration). This is independent of FormEngine’s own styling model.
- The library no longer patches `displayName` on component metadata. Use [typeName](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DefinerData#typename) on [DefinerData](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DefinerData), or, after [build](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#build), read [type](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Model#type) on the assembled [Model](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Model) when filtering components.
- Removed `formEngineRsuiteCssLoader`. Use [ltrCssLoader](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/functions/ltrCssLoader) and [rtlCssLoader](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/functions/rtlCssLoader) from `@react-form-builder/components-rsuite` with [withCssLoader](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IView#withcssloader) (for example in [FormEngine Designer usage](https://formengine.io/documentation/formengine-designer/getting-started/usage)).
- Tightened the root ESLint preset for contributors:
  - type-aware TypeScript (`plugin:@typescript-eslint/recommended-type-checked`)
  - React performance linting (`plugin:react-perf/all`)
  - stricter module boundaries (`import/no-extraneous-dependencies` and related import rules)
  - consistent type-only imports and exports (`consistent-type-imports`, `consistent-type-exports`, `@typescript-eslint/no-import-type-side-effects`)
  - required variable initializers (`@typescript-eslint/init-declarations`)
  - JSDoc on public symbols (`jsdoc/require-jsdoc`).
- Removed implicitly injected default property values for:
  - [RsCheckbox](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/rsCheckbox)
  - [RsTextArea](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/rsTextArea)
  - [RsToggle](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/rsToggle)
  - [RsWizard](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/rsWizard)
- `SimpleField` [clear](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Field#clear) now sets the field value to `undefined` instead of the control `modelValue`.

### Update instructions

Update all packages to version **8.0.0**.

**Stylesheets and CSS modules.** FormEngine packages now combine published **global CSS** (where exposed in `package.json` exports) with **CSS modules** compiled into the bundle. Import only the paths below; do not reference internal `*.module.css` files from consumers.

- **`@react-form-builder/core`** - add `import '@react-form-builder/core/assets/styles.css'` for any `FormViewer`, field rendering, or embedded designer preview. Details: [Install FormEngine Core](https://formengine.io/documentation/formengine-core/installation).
- **`@react-form-builder/designer`** - add `import '@react-form-builder/designer/assets/designer.ltr.min.css'` or `import '@react-form-builder/designer/assets/designer.rtl.min.css'` to match layout direction, **in addition to** Core styles. Details: [Install FormEngine Designer](https://formengine.io/documentation/formengine-designer/getting-started/installation).
- **`@react-form-builder/components-rsuite`** - register [ltrCssLoader](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/functions/ltrCssLoader) and [rtlCssLoader](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/functions/rtlCssLoader) through [withCssLoader](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IView#withcssloader) (replacing `formEngineRsuiteCssLoader`). If you do not use loaders, you can import `@react-form-builder/components-rsuite/assets/styles.ltr.css` and, when needed, `@react-form-builder/components-rsuite/assets/styles.rtl.css` instead.
- **`@react-form-builder/components-material-ui`** - keep `@emotion/react` and `@emotion/styled` for Material UI itself, and add the Core stylesheet import above. FormEngine no longer injects its own styles through Emotion.
- **`@react-form-builder/components-mantine`** - keep importing Mantine’s CSS (for example `@mantine/core/styles.css` and packages you enable). Add the Core stylesheet. FormEngine-specific styling is shipped as CSS modules inside the Mantine pack. Overview: [Mantine components](https://formengine.io/documentation/components-library/mantine).
- **Bundles and add-ons using composed styles** follow the same rules as the underlying Core, Designer, and RSuite packages. These packages bundle scoped CSS and do not add extra FormEngine CSS entry points beyond their dependencies. Affected packages:
  - **@react-form-builder/designer-bundle**
  - **@react-form-builder/viewer-bundle**
  - **@react-form-builder/viewer-bundle-premium**
  - **@react-form-builder/components-signature**
  - **@react-form-builder/components-uploader**
  - **@react-form-builder/components-google-map**
  - **@react-form-builder/components-rich-text**
  - **@react-form-builder/components-fast-qr**
  - **@react-form-builder/components-rsuite-table**

- Replace filtering that relied on `component.data.component.displayName` with [typeName](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DefinerData#typename) on [DefinerData](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DefinerData), or with [type](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Model#type) on the assembled [Model](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Model) after [build](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#build).

  Before 8.0.0:

  ```typescript
  components.filter((component) => {
    return component.data.component.displayName !== 'RsTimePicker';
  });
  ```

  After 8.0.0:

  ```typescript
  components.filter((component) => {
    return component.data.typeName !== 'RsTimePicker';
  });
  ```

### Features

- Viewer localization behavior is now explicit: [FormViewerLite](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewerLite) applies [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) by default, while [FormViewer](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewer) takes an explicit [localizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#localizationengine), so you can disable the default Fluent localization behavior with [NoopLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NoopLocalizationEngine) or plug in a custom [ILocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationEngine) implementation.
- Added Designer main menu customization keys documented under [Menu items customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#menu-items-customization).
- Published Core and view styling as dedicated CSS assets and CSS modules instead of Emotion-injected rules.

### Enhancements

- Updated the embedded Monaco editor to **0.55.1** and restored the `monaco-settings` integration surface.
- Tuned the localization editor workflow and default-language handling in the UI.
- Updated CSS loading so registered loaders run sequentially and view styles apply deterministically when multiple loaders are in use.
- Removed injected screen styles on unmount to prevent stale global CSS.
- Migrated unused-export detection from `ts-prune` to `knip` and refreshed `madge` usage in tooling.

### Bug fixes

- Fixed localization editing failures and restored missing default-language display in the localization editor.
- Fixed broken styles after switching the form to an RTL language when using bidirectional CSS loaders.
- Stopped the Mantine view package from exporting unintended RSuite CSS.
- Fixed display of value type on the `RsWizard` component in form data preview.
- Fixed flaky component test that looked up a weather button by accessible name.
- Corrected an icon sizing regression in the components palette.

### Resources

- Documented Core **8.0.0** stylesheet import and CSP-oriented styling in [Install FormEngine Core](https://formengine.io/documentation/formengine-core/installation).
- Updated documentation for packages that no longer depend on Emotion for FormEngine-injected styles.
- Designer [customization](https://formengine.io/documentation/formengine-designer/features/designer-customization) covers main menu keys and existing toolbar options.

### Security

- Bumped `axios` from `1.13.6` to `1.15.0`.
- Bumped `follow-redirects` from `1.15.11` to `1.16.0` in examples.

### Chore

- Bumped `vite` across the monorepo, sample apps, and selected examples (including Remix and community templates).
- Bumped `hono` and `@hono/node-server` in Angular examples.
- Bumped `next` in the Next.js v16 example.
- Bumped `lodash` in the Remix v2 example.
- Updated public examples to **8.0.0**.
