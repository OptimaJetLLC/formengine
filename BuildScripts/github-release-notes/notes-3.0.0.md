### Breaking

- Added React 19 support.
- Model.icon property moved to [Meta](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Meta).
- The initial value and value properties of the [Rich text editor](https://formengine.io/documentation/components-library/fields-components/rich-text-editor) are now of type string.

### New

- Components can be deleted by pressing <kbd>Delete</kbd> button.
- Added [upload server](https://github.com/optimajet/formengine/tree/master/examples/file-upload-server/README.md) example.

### Fixed bugs

- A phantom selection remains after a drag and drop operation.
- Some minor bugs related to adding components by double-clicking.
- Fixed the bug of being able to select multiple files without setting the Multiple option in the [Uploader](https://formengine.io/documentation/components-library/fields-components/uploader) component.
- A component cannot be added after undo by double-clicking it.
- The text of the ‘Add New Item’ button was not visible in dark mode.
- Broken form label markup when the form is empty.

### Updated internal dependencies

- vite from 4.2.1 to 6.0.7.
