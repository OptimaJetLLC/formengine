_May 1, 2026_

## Overview

FormEngine 8.1.0 improves multilingual behavior (fallbacks, edge-case handling, and removal of the `[NOT LOCALIZED]` placeholder), adds documented Designer language-switch customization, and includes small viewer and `bundle-size` example updates.

### Why update

* **Improve** [localization](https://formengine.io/documentation/formengine-core/localization): stronger fallbacks and edge-case handling; `[NOT LOCALIZED]` is no longer emitted.
* **Style or replace** the Designer language-switch UI using documented menu keys instead of patching internals.

## Key features

* [Language switch customization](https://formengine.io/documentation/formengine-designer/features/designer-customization#language-switch-customization) for `MainMenu_Item_LanguageSwitch` and `MainMenu_Item_LanguageItem_<language-full-code>` in the Designer.

## Changelog

### Update instructions

Update all packages to version 8.1.0. No stylesheet or API migration beyond 8.0.0 is required for typical applications.

### Enhancements

* Remove the `[NOT LOCALIZED]` placeholder from localized output and improve Fluent fallback behavior.

### Bug fixes

* Fix incorrect application of component styles in production builds.
* Address localization edge cases in the Fluent fallback chain ([LocalizationStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/LocalizationStore)).

### Resources

* Expanded [Designer customization](https://formengine.io/documentation/formengine-designer/features/designer-customization) with concrete language-switch customization examples.
* Revisit [Localization and Internationalization](https://formengine.io/documentation/formengine-core/localization) when you adjust multilingual forms.

### Chore

* Bumped `uuid` and `@rspack/cli` in the `examples` community **`bundle-size`** template.
