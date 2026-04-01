_November_ 25, 2024

- Added [actions](https://formengine.io/documentation/using-repeater#repeater-actions) for managing rows in the Repeater component.
- Added the ability to [work with objects](https://formengine.io/documentation/formengine-designer/features/localization#localization-editing) in localization.
- Added guide for [usage with Remix](https://formengine.io/documentation/usage-with-remix).
- Now, if there are several validation errors in one field, then by default, only the first one is displayed for better readability.
- The [showAllValidationErrors](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#showallvalidationerrors) option has been added to `FormViewerProps` to display all validation errors on the field, not just the first one.

### Fixed bugs

- The list of templates did not load completely when the page was first opened.
- A non-empty value is set by default for numeric and boolean action arguments.
