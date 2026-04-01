_January 16, 2026_

## Overview

FormEngine 7.10.0 introduces integration with the **Material UI components library**, allowing you to build forms with one of the most popular React UI frameworks.

![Material UI components](https://formengine.io/documentation/assets/release-notes/7.10.0-mui-components.png)

Additionally, this release improves theming capabilities in FormViewer, including support for dynamic theme switching, making your applications more flexible and visually consistent.

### Why update

- Start building forms with **Material UI** components directly in FormEngine.
- Benefit from improved theming and customization options in FormViewer.
- Includes important security updates for dependencies and bug fixes that improve reliability.

## Key features

* Integration with the **Material UI** components library for building and rendering forms.
* Improved theming capabilities in FormViewer, including support for theme switching.

## Changelog

### Update instructions

Update all packages to version **7.10.0**. No additional actions are required.

### Features

* Added integration with the [Material UI components library](https://formengine.io/documentation/components-library/#material-ui-components).

### Enhancements

* Added support for [BuilderThemeProvider](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/BuilderThemeProvider) in [RsLocalizationWrapper](https://formengine.io/documentation/api-reference/@react-form-builder/components-rsuite/functions/RsLocalizationWrapper) to enable theme switching in FormViewer when using RSuite components.
* Added new `ComponentStore` methods:
  * `addValidationRule`
  * `hasValidationRule`
  * `removeValidationRule`
* Extended the parameters of [Definer.icon](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#icon) to support using either a component icon or an icon name.
* Added the [required](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/required) annotation builder for `boolean` properties that mark a field as required.
* Added [Annotation.controlsRequiredProp](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Annotation#controlsrequiredprop) to indicate that a property value controls the required flag.
* Added a link to the npm package on the documentation page for each component.
* Renamed the **Generate JSON form schema** menu item to **Export JSON form schema**.

### Bug fixes

* Fixed an error when no form storage was provided: `AlwaysRejectFormStorage.ts:8 Uncaught (in promise) Error: Not implemented`.
* Fixed an issue where the Next.js example was broken with [@react-form-builder/core@7.9.0](https://www.npmjs.com/package/@react-form-builder/core/v/7.9.0).
* Fixed the `Module not found: Package path . is not exported from package` error in `premium/examples/with-nextjs/with-nextjs-v15` in FormViewer.

### Resources

* Split the release notes in the documentation into separate pages so that each release can be read in detail.
* Updated and extended the article with instructions on [how to generate a JSON schema](https://formengine.io/documentation/formengine-designer/features/forms-json#json-schema).

### Security

* Bumped `diff` from 8.0.2 to 8.0.3 in `/src`.
* Bumped `qs` and `express` in `/examples/community/file-upload-server`.
* Bumped `qs` and `express` in `/examples/premium/with-remix/with-remix-v2`.
* Bumped `@remix-run/server-runtime`, `@remix-run/node`, `@remix-run/react`, `@remix-run/serve`, and `@remix-run/dev` in `/examples/premium/with-remix/with-remix-v2`.
* Bumped `next` from 15.4.8 to 15.4.10 in `/examples/premium/with-nextjs/with-nextjs-v15`.
