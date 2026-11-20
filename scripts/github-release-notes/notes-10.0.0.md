_July 3, 2026_

## Overview

FormEngine 10.0.0 removes deprecated component-metadata, validation, and RSuite picker APIs that have been marked for removal in earlier releases. German (`de-DE`) strings are retranslated across Core, Designer, and view packages, and [LocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/LocalizationStore) is split into smaller pieces so form switching does not leave stale locale data behind.

Monaco editors for computed properties and localization now keep keyboard focus inside editable regions. RSuite CSS was fixed so production builds can minify styles safely. Built-in validation now uses Zod 4.4.

### Why update

- **Remove deprecated APIs** before the next major blocks you: `Definer.preview`, `customPreview`, the `finite` number validator, and `inline` on [RsDatePickerProps](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsDatePickerProps) / [RsTimePickerProps](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsTimePickerProps) are gone.
- **Pick up new German (`de-DE`) strings** in Designer and component packages.
- **Switch forms without leftover localization** and work against a smaller [ILocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationStore) contract if you extend localization yourself.
- **Type in constrained Monaco regions** for computed properties and localization code without focus getting stuck in read-only areas.
- **Get smaller CSS bundles** now that Lightning CSS minification works for RSuite styles.

## Key features

- Removed deprecated APIs for component metadata ([Definer](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer), [Meta](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Meta)), number validation, and RSuite date/time pickers.
- Retranslated German (`de-DE`) locale files via `localization.config.json`.
- Reworked [LocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/LocalizationStore) and expanded [ILocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationStore).
- In-house constrained Monaco editing for [computed properties](https://formengine.io/documentation/formengine-designer/features/computed-properties) and localization code fields.
- Fixed `@font-face` placement in RSuite CSS; Lightning CSS minification enabled in production builds.

## Changelog

### Breaking changes

- Removed `Definer.preview` and `customPreview` from [DefinerData](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DefinerData) and [Meta](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Meta). You can no longer customize component palette previews through this API.
- Removed the deprecated `inline` property from [RsDatePickerProps](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsDatePickerProps) and [RsTimePickerProps](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/interfaces/RsTimePickerProps). The pickers now extend `Omit<DatePickerProps, 'inline'>` and the equivalent time-picker props without `inline`.
- Removed the deprecated `finite` number validation rule from the built-in Zod rule set. Remove `finite` from form JSON or replace it with `integer` or another number rule from [Form validation](https://formengine.io/documentation/formengine-core/validation).
- [ILocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationStore) now requires `value`, `engine`, `removeLocalization`, `removeLocalizationForType`, `hasLocalization`, `hasLanguage`, and `getLocalizationItemId`. Custom implementations must type the `type` argument as [LocalizationType](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/LocalizationType) in `getLocalization` and `setLocalization`.

### Update instructions

Update all packages to version **10.0.0**.

If your custom components still call `Definer.preview` or pass `customPreview` in [DefinerData](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/DefinerData), delete those calls. They stopped doing anything in recent releases.

If form JSON still uses a `finite` validation rule on number fields, remove it or switch to a supported validator from [Form validation](https://formengine.io/documentation/formengine-core/validation).

If you implement [ILocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationStore) yourself, match the current interface and use [LocalizationType](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/LocalizationType) for the `type` parameter.

Standard Designer and Viewer integrations need no other changes.

### Features

- Added [isBoolean](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/isBoolean) and [isDate](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/isDate) utility exports from `@react-form-builder/core`.

### Enhancements

- Retranslated German (`de-DE`) locale bundles across Core, Designer, and view packages using the new translation workflow.
- Split responsibilities in [LocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/LocalizationStore) and [FluentLocalizationEngine](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/FluentLocalizationEngine) for language resolution, bundle creation, and store state.
- Replaced the third-party Monaco constrained-editor plugin with an in-house setup for computed-property and localization code editors.
- Upgraded built-in Zod to `^4.4.3` and kept legacy date boundary error messages when Zod 4.3+ reports timestamp-based date issues.
- Enabled Lightning CSS minification for production CSS builds after fixing RSuite stylesheet structure.
- Release scripts now refresh public and private `package.json` variants automatically during release prep.

### Bug fixes

- Localization from a previously opened form no longer sticks around after you switch to another form in the Designer or Viewer.
- Constrained Monaco editors accept keyboard input again when the caret lands in a read-only region; focus moves to the nearest editable range.
- Invalid nested `@font-face` rules in RSuite custom CSS no longer break CSS processors or block minification.

### Resources

- [ILocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/ILocalizationStore) API reference documents the expanded store contract.
- [Computed properties](https://formengine.io/documentation/formengine-designer/features/computed-properties) is still the place to read about function-type calculated fields and the constrained code editor.

### Security

- Bumped `axios` from `1.13.6` to `1.16.1` in examples.
- Bumped `dompurify` from `3.3.2` to `3.4.11` in examples.
- Bumped `express`, `body-parser`, and `qs` in examples.
- Bumped `hono` from `4.12.18` to `4.12.26` in examples.
- Bumped `js-yaml` from `4.1.0`/`4.1.1` to `4.3.0` in examples.
- Bumped `multer` from `2.1.1` to `2.2.0` in examples.
- Bumped `@sigstore/core`, `@sigstore/verify`, and `sigstore` in examples.
- Bumped `shell-quote` from `1.8.3` to `1.8.4` in examples.
- Bumped `tmp` from `0.2.5` to `0.2.7` in examples.
- Bumped `vite` and `@vitejs/plugin-react-swc` in examples.

### Chore

- Bumped `zod` from `^4.0.0` to `^4.4.3`.
- Bumped `vitest`, `@vitest/browser`, `@vitest/browser-playwright`, and `@vitest/ui` from `4.0.9` to `4.1.8`.
- Bumped `@angular/common`, `@angular/core`, and `@angular/compiler` from `21.1.5` to `21.2.17` in examples.
- Bumped `@remix-run/server-runtime`, `@remix-run/node`, `@remix-run/serve`, `@remix-run/dev`, and `react-router` in examples.
- Bumped `form-data` from `4.0.5` to `4.0.6` in examples.
- Bumped `launch-editor` from `2.13.0` to `2.14.1` in examples.
- Bumped `markdown-it` from `14.1.1` to `14.2.0` in examples.
- Flattened the open-source monorepo layout (removed the intermediate `src/` directory) and updated CI/build configuration accordingly.
