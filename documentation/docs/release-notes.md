---
sidebar_position: 40
title: Release notes
slug: /release-notes
---

## 1.7.0

_July_ 24, 2024

- Added validation for the format property in the `DatePicker` component.
- Fixed a bug that prevented the string property editor from turning into a text area when inserting large text.
- Fixed a bug in the "Key" property editor, due to which the key verification message was not updated when duplicating a component with the
  same key value.
- Added support for <kbd>Esc</kbd> and <kbd>Enter</kbd> hotkeys in the prompt dialog.
- After creating a new form, the old one is automatically saved and the designer switches to the new form.
- Made the `props` attribute optional when parsing JSON for components.
- The API reference documentation has been updated.
- Added a new component `TagPicker`.

## 1.6.0

_July_ 16, 2024

- Added the `QR Code` component for generating and displaying QR codes.
- Added a [guide](/adding-wasm-component) to connecting the WASM component.
- Now information about files is displayed, instead of an empty object in the Data view (located to the left of the form preview).
- Added the `Read-only` option to the `Signature` component.
- Fixed a bug where localization was not applied in the `Calendar` component.
- Removed the default value `0` for the `timeout` property of the `Uploader` component (the `0` value, like `undefined`, is no timeout).

## 1.5.2

_July_ 5, 2024

### Fixed bugs

- Clearing the RSuite components with default value not triggering touched flag.
- Clearing the date property is not working correctly.
- The DatePicker crashes when the format is incorrect.
- The defaultValue does not work in DatePicker.
- The NumberFormat crashes with a negative decimal scale.
- The value of the Number property changes to NaN when backspace is pressed on a negative value.

## 1.5.1

_July_ 3, 2024

- Fixed incorrectly set default values for DatePicker and Uploader components (the bug was introduced in the 1.5.0 release).
- Fixed `closable` property for Message component.

## 1.5.0

_July_ 2, 2024

- Added Toggle component.
- Added guide for [integration with Electron](/documentation/integration-with-electron).
- An error handler has been added to the `FormBuilder` component to prevent the application from crashing if a faulty component is used.
- Added default values to all boolean properties of components
- Fixed a bug that caused hook `useUniqueId` to break the build.
- Other minor style fixes.

## 1.4.0

_June_ 21, 2024

- Updated documentation on using `ref` with `FormBuilder` and `FormViewer` components.
- Added ability to pass custom component [errorWrapper](/api-reference/@react-form-builder/core/classes/FormViewerPropsStore#errorwrapper).
- The React Suite library has been updated to version 5.64.2.
- Fixed bug where only the first action handler was executed on the `onWillUnmount` event.
- Fixed keyboard navigation in Dropdown component.
- The `key` property is now passed separately from other component properties, previous behavior caused a warning in React 18.3.1.
- Added ability to define validators using code for all value types.
- Updated internal dependencies:
  - braces from 3.0.2 to 3.0.3.
  - ws from 7.5.9 to 7.5.10.

## 1.3.1

_June_ 14, 2024

- Fixed a bug that caused calculated properties to not work.

## 1.3.0

_June_ 13, 2024

- Added the `RsSignature` component for drawing signatures.
- The text of the form data and errors in the left panel on the designer preview is now scrollable.
- Fixed minor style breakdowns in the designer scrollbars.

## 1.2.0

_June_ 5, 2024

- Added the `RsLink` component to be used as a hyperlink.
- Improved error logging when launching custom functions:
  - The error text now includes the source code of the function.
  - Removed unnecessary logging to the console during testing in the editor.
- Added documentation for [storing user-defined data](/storing-user-defined-data).
- Styles have been added to the [bundle](/installation#cdn) for the viewer.

### Fixed bugs

- Fixed minor style breakdowns in the Mozilla Firefox browser.
- The last selected form is not loaded when the designer is opened.
- The `onWillUnmount` event does not work.
- Changes to the `Placement` property in `Error settings` are not applied to the form in real time.

## 1.1.0

_May_ 3, 2024

- React Suite updated to version 5.59.1.

## 1.0.9

_April_ 17, 2024

- The "Edit JSON" button in the designer has been moved to the layout switches.
- Changed appearance of the language switch - the language code is shown instead of the language name.
- Updated documentation on computed properties.
- Fixed a typo in the custom component documentation.

## 1.0.8

_April_ 11, 2024

- Added localization for Farsi language in Designer.
- Added documentation on how to use FormEngine via [CDN](/installation#cdn).

## 1.0.7

_March_ 14, 2024

- Fixed the bug when the focus in the property editor was reset when entering each character.

## 1.0.6

_March_ 8, 2024

- Added the FormBuilder UI [customization](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#customization) feature.
- Add `IFormBuilder.parseForm(formString)` method that sets the form serialized in JSON as the current form.
- Fixed the bug when FormBuilder UI breaks with `create-react-app`.

## 1.0.5

_February_ 16, 2024

- Added the FormBuilder ref to provide access to BuilderStore. It can also be used
  to [get a form's JSON](/forms-json#get-the-forms-json-in-react-component).
- Fixed a bug in the Dropdown component that caused the original elements to be lost after adding a new element.

## 1.0.4

_January_ 26, 2024

- Added FormEngine embedding library to [unpkg.com](https://www.unpkg.com/) CDN.
- The label property has been added to the `RsDatePicker` component.
- Fixed bugs:
  - The form handles null values incorrectly.
  - Some children disappear in slot dropzone.
  - The input text in `RsDropdown` component is not visible.
  - Dropdowns marked as required do not show invalid state after clear.

## 1.0.3

_December_ 22, 2023

- Fixed dark theme styles.
- Fixed incorrect behavior of `renderWhen` property.

## 1.0.2

_December_ 21, 2023

- Added `IFormData.getValidationResult()` method that returns validation results without changing the form state.
- Added the user defined observable state - `IFormData.state`.
- Added the `initialValue` to `RsUploader` component.
- Fixed bugs:
  - `RsDropdown` component is not reset.
  - Elements flipping positions after saving.
  - Lost styles in `FormViewer`.
  - An empty string in the `renderWhen` property works as `false`.
  - Anonymous component error in bundle.

## 1.0.1

_November_ 28, 2023

- The RSuite styles has been isolated so that they do not affect the elements outside the designer and viewer.
- Fixed the bug with infinite loading in rsPicker.
- Updated axios from 1.3.4 to 1.6.1.
- Other fixes and updates.

## 1.0.0

_November_ 10, 2023

- Fixed `z-index` for the component search field in the designer.

## 0.0.14

_November_ 9, 2023

- Styling of components has changed. We will write more about it in the documentation.
- Some bugs have been fixed.
- Small improvements to the user interface have been made.

## 0.0.13

_October_ 31, 2023

- The custom validator has been renamed to code validator.
- External actions have been renamed to custom actions.
- Improvements to the user interface in the validation settings section.
- Added version to JSON file format.
- Other fixes and updates to vulnerable NPM packages.
