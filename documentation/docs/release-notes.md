---
sidebar_position: 40
title: Release notes
slug: /release-notes
---

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
