With this release, we have published the code for the following packages in our [open-source repository](https://github.com/optimajet/formengine):

- `@react-form-builder/core`
- `@react-form-builder/components-rsuite`
- `@react-form-builder/viewer-bundle`

### Breaking changes

- The **Signature** component has been moved to a [separate package](https://www.npmjs.com/package/@react-form-builder/components-signature).
- Removed `computeChildren` prop from [FormViewerProps](https://www.formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps).
- Removed `onDataLoad` prop from `TagPicker` component.
- Removed `licenseKey` prop from `FormViewer` component.

### Changed

- Migrated examples and demo app to **Vite**.

### New

- Added **ARIA attributes** `aria-errormessage`, `aria-invalid`, `aria-labelledby` to all input components.

### Fixed bugs

- Fixed **keyboard navigation** in dropdown lists. The virtualized list must be disabled via an option.
- Removed unnecessary `stylis-plugin-rtl` dependency from `@react-form-builder/designer` package.
