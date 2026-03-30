### Breaking changes

- Multiple fields with the same `dataKey` are now updated in sync when form data changes.
- Fields from the initial data are always preserved in form data, even if not bound to form fields.
- Changed two-way data binding to one-way in the `Progress` component.
- Changed the return type of [DataValidator.getValidationResult](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/DataValidator#getvalidationresult), [IStore.localizeErrorMessages](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IStore#localizeerrormessages), and [ErrorMessageLocalizer](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ErrorMessageLocalizer) from `string` to `string[]`.
- Changed the style editor language from **SCSS** to **CSS**.
- Removed deprecated fields and methods:
  - `Store.getForm`
  - `ComponentKind.slot`
  - `ComponentKind.preset`
  - `FormViewerProps.erroneous`
  - `Meta.kind`
  - `BuilderView.withErrorMeta`
  - `BuilderView.withTooltipMeta`

### New

- Added a `dataKey` editor for fields with two-way data binding (`valued`).
- Added new methods for working with `initialData`:
  - [ComponentData.setInitialData](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#setinitialdata)
  - [ComponentData.generatedData](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#generateddata)
  - [ComponentData.updateInitialData](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#updateinitialdata)
  - [Store.setInitialData](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Store#setinitialdata-1)
- Added `clearInitialData` parameter to the following methods:
  - [ComponentData.clear](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#clear)
  - [ComponentData.reset](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#reset)
  - [IFormData.clear](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IFormData#clear)
  - [IFormData.reset](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IFormData#reset)

### Changed

- The [calculated value](https://formengine.io/documentation/computed-properties) button is no longer displayed for properties that are not `calculable` or `localizable`.
- Removed the incorrect hint suggesting camelCase usage in the HTML Attributes editor.

### Fixed bugs

- Fixed a bug where deleting a validation rule did not remove its localized messages from the form JSON.  
- Fixed an issue where [IFormData.getValidationResult](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IFormData#getvalidationresult) returned unlocalized error messages.  

