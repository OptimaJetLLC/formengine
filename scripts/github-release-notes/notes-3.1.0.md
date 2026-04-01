_February_ 27, 2025

### New

- Designer: added static CSS classes for [customizable components and components palette](https://formengine.io/documentation/formengine-designer/features/designer-customization).
- Added ability to restrict drag-and-drop for [node](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/NodeAnnotationBuilder#withinsertrestriction) and `nodeArray`.
- Added ability to restrict drag-and-drop for [components](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#insertrestriction).
- Added a clear button for the `string` type property editor.

### Changed

- The `pullRight` option has been removed from the Menu and Tab components.
- The `ComponentState` internal component no longer uses `viewerProps`.
- [Tab](https://formengine.io/documentation/components-library/structure-components/tab) now uses buttons instead of tab anchors.
- The _Item as_ option has been added to the select element to render navigation buttons to the [Menu](https://formengine.io/documentation/components-library/static-components/menu) component.
- Tabs in the Designer now use buttons instead of anchors.

### Fixed bugs

- In rare cases, a warning of type `Cannot update a component while rendering a different component` may occur.
- Fixed `__DOT__` in localized messages in some cases.
- Resolved issues with inactive dropzone outlines in some cases.

### Documentation

- Updated the [Designer customization](https://formengine.io/documentation/formengine-designer/features/designer-customization) with new options.
- Extended the [description](https://formengine.io/documentation/components-library/) of components.
- Fixed the missing customization [description](https://formengine.io/documentation/formengine-designer/features/designer-customization#complete-list-of-customizable-component-keys) for `FormContainer` block.

### Updated internal dependencies

- monaco-editor from v0.43.0 to v0.52.2.
- @monaco-editor/react from v4.6.0 to v4.7.0.
