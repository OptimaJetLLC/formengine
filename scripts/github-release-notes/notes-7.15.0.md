_April 1, 2026_

## Overview

FormEngine 7.15.0 adds optional callbacks when the designer or preview language changes, extends [onFormElementAdd](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) with the preset name when a component is added from a preset, and fixes preset display in the component palette. The public FormEngine example on GitHub now demonstrates IndexedDB-backed form storage. This release also migrates several repository and sample-app scripts to TypeScript and includes dependency updates across the monorepo and examples.

### Why update

- React to builder and viewer language switches with [onBuilderLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onbuilderlanguagechange) and [onViewerLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onviewerlanguagechange).
- Read [presetName](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) from [onFormElementAdd](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) when users add components from presets.
- Avoid misleading “InternalError” labels for presets in the component palette.
- Align the public example with the documented form storage workflow.

## Key features

- Added [onBuilderLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onbuilderlanguagechange) and [onViewerLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onviewerlanguagechange) on [FormBuilderProps](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps).
- Added optional [presetName](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) to the [onFormElementAdd](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) payload (see [Tracking component add and remove events](https://formengine.io/documentation/formengine-designer/faq/tracking-component-add-and-remove-events)).
- Updated the [public FormEngine example](https://github.com/optimajet/formengine) to use form storage (IndexedDB) alongside the designer.

## Changelog

### Update instructions

Update all packages to version **7.15.0**. No additional actions are required.

### Features

- Added [onBuilderLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onbuilderlanguagechange) and [onViewerLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onviewerlanguagechange) callbacks on [FormBuilderProps](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps) for builder and preview language changes.
- Added optional [presetName](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) to the [onFormElementAdd](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) callback payload when a component is inserted from a preset.
- Documented [presetName](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) in [Tracking component add and remove events](https://formengine.io/documentation/formengine-designer/faq/tracking-component-add-and-remove-events).
- Wired IndexedDB form storage into the premium FormEngine example (`examples/premium/formengine`) to match the form storage documentation.

### Bug fixes

- Fixed preset entries showing as `InternalError` in the component picker when preset metadata was unavailable.
- Fixed incorrect links in [Integrating FormEngine with Angular](https://formengine.io/documentation/angular-integration).

### Security

- Bumped `handlebars` from `4.7.8` to `4.7.9`.
- Bumped `node-forge` (transitive dependency updates).
- Bumped `socket.io-parser` (including in Angular examples).

### Chore

- Migrated selected build, release, and sample-app automation scripts from JavaScript and PowerShell to TypeScript.
- Bumped `flatted` from `3.3.3` to `3.4.2`.
- Bumped `yaml` from `1.10.2` to `1.10.3`.
- Bumped `brace-expansion` from `1.1.11` to `1.1.13`.
- Bumped `picomatch` across examples and sample apps.
- Bumped `path-to-regexp` from `8.3.0` to `8.4.0` in tooling.
- Bumped `locutus` in the Vue bundle-size example under `examples/community/bundle-size`.

### Resources

- [onBuilderLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onbuilderlanguagechange), [onViewerLanguageChange](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onviewerlanguagechange), and [onFormElementAdd](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#onformelementadd) on [FormBuilderProps](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps).
- [Tracking component add and remove events](https://formengine.io/documentation/formengine-designer/faq/tracking-component-add-and-remove-events).
- [Integrating FormEngine with Angular](https://formengine.io/documentation/angular-integration).
