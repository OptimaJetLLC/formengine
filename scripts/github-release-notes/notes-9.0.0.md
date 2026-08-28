_May 20, 2026_

## Overview

FormEngine 9.0.0 extends localization to array-type component data (dropdown items, radio groups, checkbox lists, and similar controls), interpolates Fluent placeholders inside localized arrays and objects, and separates Builder UI language from the form preview language. German (`de-DE`) translations are refreshed across Core, Designer, and components packages.

### Why update

* **Localize structured component data** (arrays) in the Designer and runtime with the same Fluent patterns as string properties; see
 [Localizing array data](https://formengine.io/documentation/formengine-core/localization#localizing-array-data).
* **Use form data inside localized arrays** - Fluent placeholders such as `{$userName}` work in localized array and object JSON.
* **Control Builder UI and preview languages independently** - set [defaultBuilderLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultbuilderlanguage) and [defaultViewerLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultviewerlanguage) on [FormBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps).
* **Get updated German localization** - refreshed `de-DE` strings across Core, Designer, and component packages.

## Key features

* [Localizable array properties](https://formengine.io/documentation/formengine-core/localization#localizing-array-data) via [ArrayBuilder.localize](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ArrayBuilder#localize) for component metadata authors.
* [Fluent interpolation in localized arrays and objects](https://formengine.io/documentation/formengine-core/localization#variables-in-localized-arrays-and-objects) at runtime.
* Separate Builder UI and form-preview language defaults on [FormBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps): [defaultBuilderLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultbuilderlanguage), [defaultViewerLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultviewerlanguage).

## Changelog

### Breaking changes

* [FormBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps) no longer accepts the inherited [FormViewerProps.language](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#language) prop. Use [defaultViewerLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultviewerlanguage) for the initial form-preview language instead. [FormViewer](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/FormViewer) still accepts [language](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#language).

### Update instructions

Update all packages to version **9.0.0**.

If your Designer integration passes `language` to [FormBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps), rename it to [defaultViewerLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultviewerlanguage). To set the Builder UI language on first load, pass [defaultBuilderLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultbuilderlanguage).

Before 9.0.0:

```tsx
<FormBuilder language="de-DE" getForm={getForm} view={view} />
```

After 9.0.0:

```tsx
<FormBuilder defaultViewerLanguage="de-DE" defaultBuilderLanguage="de-DE" getForm={getForm} view={view} />
```

### Features

* Added [localizable array properties](https://formengine.io/documentation/formengine-core/localization#localizing-array-data) for component metadata via [ArrayBuilder.localize](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ArrayBuilder#localize).
* Added [Fluent interpolation](https://formengine.io/documentation/formengine-core/localization#variables-in-localized-arrays-and-objects) for placeholders inside localized array and object data resolved at runtime.
* Added [defaultBuilderLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultbuilderlanguage), [defaultViewerLanguage](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#defaultviewerlanguage) on [FormBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps).

### Enhancements

* Refreshed German (`de-DE`) localization strings across Core, Designer, and view packages.

### Bug fixes

* Fix the form language selector in the Designer not honoring the initial language passed through props.

### Resources

* Documented [localizing array data](https://formengine.io/documentation/formengine-core/localization#localizing-array-data) and [variables in localized arrays and objects](https://formengine.io/documentation/formengine-core/localization#variables-in-localized-arrays-and-objects) in Core localization.
* Expanded Designer guidance for [localizing array properties](https://formengine.io/documentation/formengine-designer/features/localization#localizing-array-properties) and [interpolating form data in array JSON](https://formengine.io/documentation/formengine-designer/features/localization#interpolating-form-data-in-array-json).

### Security

* Bumped `axios` from `1.15.0` to `1.15.2`.
* Bumped `brace-expansion` from `5.0.4` to `5.0.6` in examples.

### Chore

* Bumped `@babel/plugin-transform-modules-systemjs` from `7.29.0` to `7.29.4` in examples.
* Bumped `fast-uri` from `3.1.0` to `3.1.2` in examples.
* Bumped `hono` from `4.12.14` to `4.12.18` in examples.
* Bumped `ip-address` and `express-rate-limit` in examples.
* Bumped `next` from `16.2.3` to `16.2.6` in examples.
* Bumped `postcss` from `8.5.8` to `8.5.10`.
* Bumped `postcss` from `8.5.6` to `8.5.14` in examples.
