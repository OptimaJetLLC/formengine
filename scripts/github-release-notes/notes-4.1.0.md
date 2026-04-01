_May_ 23, 2025

### New

- Added [Conditional validation](https://formengine.io/documentation/formengine-designer/features/validation#conditional-validation) that is performed only if certain conditions are met.
- The form data has been added to the [Code validation](https://formengine.io/documentation/formengine-designer/features/validation#code-validator) function so that the field can be validated based on other values from the form.
- Added a new method [allComponentFields](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentData#allcomponentfields) to `ComponentData` that returns an array of all component fields, including non-unique data keys.

### Fixed bugs

- Fixed a bug where the styles of cloned nested elements are applied to the original elements instead of the new ones.
- Now, when uploading a form with non-unique keys, the keys are corrected to unique ones so that errors do not occur.

### Updated internal dependencies

- _undici_ from 6.21.1 to 6.21.3.
