_September 10, 2026_

## Overview

FormEngine 10.3.0 unblocks webpack 5 builds of the RSuite components package that failed after 10.1.0. Designer restores `Date` values in validation rule arguments after JSON load, and the Style tab can clear CSS the same way as other property editors.

### Why update

* **Unblock webpack** failed to resolve `rsuite/CustomProvider`.
* **Edit date min/max rules after reload** — the Rules tab no longer shows empty date pickers for arguments stored as ISO strings.
* **Clear CSS on the Style tab** without deleting rules by hand.
* **Pick up dependency fixes** from this maintenance release.

## Key features

* [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) and [RsLocalizationWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsLocalizationWrapper) import RSuite through fully specified ESM file paths, so webpack 5, Create React App, and Node ESM resolve the package.
* The Designer [Style tab](https://formengine.io/documentation/formengine-designer/features/component-styling) CSS editors include a clear control that resets component and wrapper CSS for the selected device.
* After a form is loaded from JSON, date-typed [validation rule arguments](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ValidationRuleSettings#args) are restored to `Date` instances so Designer editors and [form validation](https://formengine.io/documentation/formengine-core/validation) stay in sync.

## Changelog

### Update instructions

Update all packages to version **10.3.0**. No form JSON migration is required for typical Designer and Viewer integrations.

If you applied a webpack `fullySpecified` workaround or an alias from `rsuite/CustomProvider` to an ESM file, you can remove it after upgrading.

### Features

* Added a clear control on the Designer [Style tab](https://formengine.io/documentation/formengine-designer/features/component-styling) CSS editors so you can reset component and wrapper CSS for the selected device.

### Enhancements

* Improved TypeScript declaration generation time for packages with multiple Vite entry points.
* Shared a common Vite configuration across packages and tests.
* Updated [forwardRef](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/forwardRef) typings so React 19 `ref` works as a regular prop.

### Bug fixes

* [RsThemeWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsThemeWrapper) and [RsLocalizationWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/variables/RsLocalizationWrapper) no longer import `rsuite/CustomProvider` as a directory. Webpack 5, Create React App, and Node ESM resolve the RSuite wrappers without `ERR_UNSUPPORTED_DIR_IMPORT` or `Can't resolve 'rsuite/CustomProvider'`.
* Date-typed arguments in [schema.validations](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/BoundValueSchema#validations) are converted back to `Date` on form load. Min/max and custom date rules on the [Rules tab](https://formengine.io/documentation/formengine-designer/features/validation) no longer show empty date pickers after reload.

### Resources

* Removed the Build Form with AI button from documentation.

### Security

* Bumped `js-yaml` from `4.3.0`/`4.3.1` to `4.3.2` in examples.
* Bumped `hono` from `4.13.0`/`4.13.1` to `4.13.7` in examples.
* Bumped `fast-uri` from `3.1.5` to `3.1.7`.
* Bumped `engine.io` from `6.6.5` to `6.6.9` in examples.
* Bumped `multer` from `2.2.0` to `2.3.0` in examples.
* Bumped `morgan` from `1.11.0` to `1.12.0` in examples.
* Bumped `postcss-selector-parser` from `6.1.2` to `6.1.4`, and from `7.1.1` to `7.1.5` in examples.

### Chore

* Bumped `baseline-browser-mapping` from `2.9.19`/`2.10.0`/`2.10.20`/`2.10.42` to `2.11.21` in examples.
* Bumped `sharp` from `0.35.3` to `0.35.4` in examples.
* Bumped `colord` from `2.9.3` to `2.10.0`.
* Bumped `next` from `16.3.0` to `16.3.3` in examples.
* Bumped `joi` from `17.13.3` to `17.13.7`.
* Bumped `vitest` from `4.1.10` to `4.1.11`.
* Bumped `svgo` from `3.3.4` to `3.3.5`.
* Bumped `browserslist` from `4.25.1` to `4.28.8`.
* Bumped `pacote` and `@angular/cli` in examples.
