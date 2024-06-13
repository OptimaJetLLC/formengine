---
sidebar_position: 40
title: Release notes
slug: /release-notes
---

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

- Added the FormBuilder UI [customization](/api-reference/interfaces/react_form_builder_designer.FormBuilderProps#customization) feature.
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
