_May_ 15, 2025

With this release, the following packages are distributed under the [MIT license](https://opensource.org/license/mit):

- `@react-form-builder/core`
- `@react-form-builder/components-rsuite`
- `@react-form-builder/viewer-bundle`

Commercial license keys now use a different format, and the licensing scheme has changed. For details, contact [support@optimajet.com](mailto:support@optimajet.com).

**This change does not affect current customers, all existing keys will continue to work as before.**

### Breaking changes

- `useBuilderContext` hook has been removed.
- [FormViewerProps.language](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#language) is now a `string` representing language full code.

### Changed

- Default links in [Menu](https://formengine.io/documentation/components-library/static-components/menu) now use hash-based navigation.
- The parameter `model` has been removed from [createComponentData](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Store#createcomponentdata).

### New

- Added [FormJsonBuilder](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/buildForm#returns), a code-based tool for form creation.
- [useBuilderMode](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/useBuilderMode) hook has been introduced.
- [Tab](https://formengine.io/documentation/components-library/structure-components/tab) and [Menu](https://formengine.io/documentation/components-library/static-components/menu) components now supports `pill` display variant.

### Fixed bugs

- Fixed an issue where calculated values inside Repeater children might not display correctly.
- Resolved validation errors for min/max date constraints.

### Updated internal dependencies

- _rsuite_ from 5.64.2 to 5.80.2
- _vite_ from v4.5.13 to v4.5.14.
