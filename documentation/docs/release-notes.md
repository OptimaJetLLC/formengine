---
sidebar_position: 40
title: Release notes
slug: /release-notes
---

## 4.0.0

_May_ 15, 2025

With this release, the following packages are distributed under the [MIT license](https://opensource.org/license/mit):

- `@react-form-builder/core`
- `@react-form-builder/components-rsuite`
- `@react-form-builder/viewer-bundle`

Commercial license keys now use a different format, and the licensing scheme has changed. For details,
contact [support@optimajet.com](mailto:support@optimajet.com).

**This change does not affect current customers, all existing keys will continue to work as before.**

### Breaking changes

- `useBuilderContext` hook has been removed.
- [FormViewerProps.language](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#language) is now a `string` representing
  language full code.

### Changed

- Default links in [Menu](/components-library/static-components/menu) now use hash-based navigation.
- The parameter `model` has been removed
  from [createComponentData](/api-reference/@react-form-builder/core/classes/Store#createcomponentdata).

### New

- Added [FormJsonBuilder](/api-reference/@react-form-builder/core/functions/buildForm#returns), a code-based tool for form creation.
- [useBuilderMode](/api-reference/@react-form-builder/core/functions/useBuilderMode) hook has been introduced.
- [Tab](/components-library/structure-components/tab) and [Menu](/components-library/static-components/menu) components now supports `pill`
  display variant.

### Fixed bugs

- Fixed an issue where calculated values inside Repeater children might not display correctly.
- Resolved validation errors for min/max date constraints.

### Updated internal dependencies

- _rsuite_ from 5.64.2 to 5.80.2
- _vite_ from v4.5.13 to v4.5.14.

## 3.6.0

_May_ 2, 2025

- The `failOnError` parameter has been added for the validation action. If it is enabled, then if validation fails, the actions that go on
  will not be triggered.
- Fixed a bug where events triggered in the `useEffect` of custom components did not fire.
- Fixed several grammatical typos in the localization and messages of the application.

## 3.5.0

_April_ 25, 2025

### New

- [Preset components](/presets-components).
- License verification errors now log to the console.
- The [IFormData.validate()](/api-reference/@react-form-builder/core/interfaces/IFormData#validate) function now returns validation errors.

### Fixed bugs

- Fixed broken validation for property values of type `Date`.
- Fixed cases where `ComponentData` was not properly disposed.
- Fixed cursor icon display over labels in the components palette.

### Updated internal dependencies

- vite from v4.5.10 to v4.5.12.

## 3.4.1

_April_ 15, 2025

- Rolled back the changes that caused `initialJson` to work incorrectly in the added components.

## 3.4.0

_April_ 14, 2025

- Now the custom localization is combined with the built-in one if the user wants to expand the existing one.
- Added the [globalDefaultLanguage](/api-reference/@react-form-builder/core/variables/globalDefaultLanguage) constant which contains
  information about the default language.
- The internal logic of building and destroying the component tree has also been improved, which improves performance.
- Fixed a bug in ActionEventArgs where the parentData parameter could be incorrectly set.

### Updated internal dependencies

- vite from v4.5.10 to v4.5.12.

## 3.3.0

_March_ 31, 2025

- Added the [useFormBuilder](/api-reference/@react-form-builder/designer/functions/useFormBuilder) hook to get and manage the Form Builder
  from [customization](/designer-customization).
- Now the insertion order when moving several elements corresponds to their position on the form. Previously, they were inserted in the
  order in which the user selected them.

## 3.2.0

_March_ 19, 2025

- The ability to enter values for calculated fields has been returned.
- For properties that are declared as valued, you can now set
  an [uncontrolled value](/api-reference/@react-form-builder/core/classes/Annotation#uncontrolledvalue) that will replace undefined. This is
  necessary to avoid the React error "A component is changing a controlled input to be uncontrolled".
- Fixed a bug that caused the reset button in the numeric property editor to not work.
- Fixed a potential memory leak in the Repeater component.
- Fixed a bug where components were sometimes not displayed in view mode.
- Fixed a typo in localization.

## 3.1.0

_February_ 27, 2025

### New

- Designer: added static CSS classes for [customizable components and components palette](/designer-customization).
- Added ability to restrict drag-and-drop
  for [node](/api-reference/@react-form-builder/core/classes/NodeAnnotationBuilder#withinsertrestriction) and `nodeArray`.
- Added ability to restrict drag-and-drop
  for [components](/api-reference/@react-form-builder/core/classes/Definer#insertrestriction).
- Added a clear button for the `string` type property editor.

### Changed

- The `pullRight` option has been removed from the Menu and Tab components.
- The `ComponentState` internal component no longer uses `viewerProps`.
- [Tab](/components-library/structure-components/tab) now uses buttons instead of tab anchors.
- The _Item as_ option has been added to the select element to render navigation buttons to
  the [Menu](/components-library/static-components/menu) component.
- Tabs in the Designer now use buttons instead of anchors.

### Fixed bugs

- In rare cases, a warning of type `Cannot update a component while rendering a different component` may occur.
- Fixed `__DOT__` in localized messages in some cases.
- Resolved issues with inactive dropzone outlines in some cases.

### Documentation

- Updated the [Designer customization](/designer-customization) with new options.
- Extended the [description](/components-library/) of components.
- Fixed the missing customization [description](/designer-customization#complete-list-of-customizable-component-keys) for
  `FormContainer` block.

### Updated internal dependencies

- monaco-editor from v0.43.0 to v0.52.2.
- @monaco-editor/react from v4.6.0 to v4.7.0.

## 3.0.2

_January_ 26, 2025

### Fixed bugs

- The @rsuite/icons package is set to version 1.0.3.

## 3.0.1

_January_ 26, 2025

### Fixed bugs

- Fixed incorrect import of `@rsuite/icons/esm/icons/status/RemindFill.js`.
- vite rolled back to version 4.5.9.
- undici update from 6.21.0 to 6.21.1 in '/examples/with-remix/with-remix-v2'.

## 3.0.0

_January_ 24, 2025

### Breaking changes

- Added React 19 support.
- Model.icon property moved to [Meta](/api-reference/@react-form-builder/core/classes/Meta).
- The initial value and value properties of the [Rich text editor](/components-library/fields-components/rich-text-editor) are now of type
  string.
- @emotion/cache updated to 11.14.0.
- @emotion/css updated to 11.13.5.
- @emotion/react updated to 11.14.0.
- mobx updated updated to 6.13.5.
- mobx-react updated to 9.2.0.

### New

- Components can be deleted by pressing <kbd>Delete</kbd> button.
- Added [upload server](https://github.com/optimajet/formengine/tree/master/examples/file-upload-server/README.md) example.

### Fixed bugs

- A phantom selection remains after a drag and drop operation.
- Some minor bugs related to adding components by double-clicking.
- Fixed the bug of being able to select multiple files without setting the Multiple option in
  the [Uploader](/components-library/fields-components/uploader) component.
- A component cannot be added after undo by double-clicking it.
- The text of the ‘Add New Item’ button was not visible in dark mode.
- Broken form label markup when the form is empty.

### Updated internal dependencies

- vite from 4.2.1 to 6.0.7.

## 2.4.0

_January_ 16, 2025

- Components can now be added by double-clicking in Designer.
- Updated internal dependencies:
  - braces from 3.0.2 to 3.0.3.
  - nanoid from 3.3.6 to 3.3.8.

### Fixed bugs

- Incorrect display of custom validation in Designer.
- Display an empty error object for the repeater if all fields are valid.

## 2.3.0

_December_ 16, 2024

- Added a search field on the Forms tab.
- Added the ability to use hooks and functions
  inside [custom property editors](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#propertyeditors) to access
  component and engine data. These are, for example, [useComponentData](/api-reference/@react-form-builder/core/functions/useComponentData),
  [useStore](/api-reference/@react-form-builder/core/functions/useStore),
  and [others](/api-reference/@react-form-builder/core/#functions).
- The [formLoadError](/api-reference/@react-form-builder/core/classes/Store#formloaderror) field has been added to the FormViewer API that
  signals the failure of loading the form, and also contains the error text.
- Now, if the form is loaded unsuccessfully, a message about this is displayed in the form designer, as well as a suggestion to create a new
  form.

### Fixed bugs

- When changing the value of [actions](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#actions) in FormViewer props after
  initialization, their value inside the engine did not change.
- Saving the form is called twice when creating a new form, as well as in some other cases.

## 2.2.0

_November_ 25, 2024

- Added [actions](/using-repeater#repeater-actions) for managing rows in the Repeater component.
- Added the ability to [work with objects](/localization#localization-editing) in localization.
- Added guide for [usage with Remix](/usage-with-remix).
- Now, if there are several validation errors in one field, then by default, only the first one is displayed for better readability.
- The [showAllValidationErrors](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#showallvalidationerrors) option has been
  added to `FormViewerProps` to display all validation errors on the field, not just the first one.

### Fixed bugs

- The list of templates did not load completely when the page was first opened.
- A non-empty value is set by default for numeric and boolean action arguments.

## 2.1.0

_November_ 8, 2024

- Added the Map component and its [usage guide](/enabling-google-maps-autocomplete).
- Added a [sample application](/usage-with-nextjs) for Next.js.
- Added the option to select type attribute for RsInput component.

### Fixed bugs

- Fixed console errors that occur when a variable inside localization is not defined.
- Fixed the calculated value for HTML attributes.
- Fixed the display of simple values as calculated after rolling back from a calculated state.

## 2.0.0

_October_ 29, 2024

**This release changes parts of the public and internal API.**

- Added the [Repeater](/components-library/structure-components/repeater) component that is responsible for displaying an array of repeating
  components.
- Added the [Using Repeater](/using-repeater) guide.

## 1.14.1

_October_ 28, 2024

- The changes `Fixed a bug that prevented events set in the useEffect of user components from being triggered` from the previous release
  were canceled because it broke other functionality. A non-breaking fix will be released soon. For now, we recommend using React 18 to
  avoid encountering this bug.

## 1.14.0

_October_ 25, 2024

- Added the [Wizard](/components-library/structure-components/wizard) component for creating step-by-step forms with the ability to
  transition between steps.
- Containers now display their keys when dragging components to make it easier to navigate.
- Fixed a bug that prevented events set in the useEffect of user components from being triggered.
- Fixed a bug where dragging inside Tabs, Message and Card components didn't work.

## 1.13.0

_October_ 15, 2024

- The `readOnly` property that allows the user to view the form in read only mode has been added to
  the [FormViewerProps](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#readonly)
  and to the [FormBuilderProps](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#readonly).
- For all valued components, a `readOnly` property has been added.
- Fixed and improved Drag and drop behavior for components.
- The [ActionDefinition](/api-reference/@react-form-builder/core/classes/ActionDefinition)
  and [Language](/api-reference/@react-form-builder/core/classes/Language) classes were exported
  from [designer-bundle and viewer-bundle](/installation#cdn).
- The dependency on the `@emotion/styled` package has been removed from the core package.
- Added documentation for the [Rich text editor](/components-library/fields-components/rich-text-editor)
  and [TimePicker](/components-library/fields-components/time-picker) components.

## 1.12.0

_September_ 24, 2024

- Now the [component id](/api-reference/@react-form-builder/core/classes/ComponentData#id) is used instead of
  the [component key](/api-reference/@react-form-builder/core/classes/ComponentStore#key) when processing and filtering events.
- Now the
  function [onFormDataChange](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#onformdatachange)
  will not be called inside the templates. This call should only be made by the parent form.
- Several minor bugs affecting performance have also been fixed.

## 1.11.0

_September_ 13, 2024

- Added the `Time picker` component.
- Added the [time](/api-reference/@react-form-builder/core/variables/time) annotation builder and property editor for editing properties
  with the `time` type.
- Added the `Rich text editor` component.
- Added the [object](/api-reference/@react-form-builder/core/variables/object) annotation builder and property editor for editing properties
  with the `object` type.
- Added the [BuilderContextProvider](/api-reference/@react-form-builder/core/functions/BuilderModeProvider)
  and [useBuilderContext](/api-reference/@react-form-builder/core/functions/useBuilderMode) hook to use the Designer's state in custom
  components.
- Fixed a bug where the `One tap` property in the `Date picker` component had the `event` type instead of `boolean`.
- Fixed a bug where the application crashed if the date was entered from the keyboard into the `Date picker` component.
- Fixed the height of the property editors.
- The `this` property is now bound in implementations of the `Field` interface.

### Documentation

- Added the [Formik integration](/formik-integration) guide.
- The documentation on the [Actions](/actions) has been significantly updated.

## 1.10.0

_August_ 19, 2024

- Added a FormBuilder prop to [control the designer's theme](/theme-manipulation).
- Added an [hideEditor()](/api-reference/@react-form-builder/core/classes/AnnotationBuilder#hideeditor)
  option that allows hide the component property editor when creating annotations (defining component properties).

### Fixed bugs

- After unchecking the `Auto validate` checkbox, the checkbox stops working and the list of previously created validators is deleted.
- When clicking on the `Delete` button without selecting a component, the currently selected component will lose its selection

## 1.9.0

_August_ 6, 2024

- Added the `preload` property to the `Dropdown` and `Search` components. It enables preloading data before opening the drop-down list (on
  component mount).
- The [onFormSchemaChange](/getting-form-json#using-onformschemachange-callback) callback has been added to the `FormBuilder` props. It is
  called whenever a form schema changes.
- Now the component keys are generated as valid `JavaScript` identifiers - in camelCase and without spaces.
- Now the active tabs in the left and right panels of the `Designer` are saved after the page is reloaded, as well as when switching between
  components.

## 1.8.0

_July_ 31, 2024

- Now the entered value in the component key editor is also applied by pressing Enter.

### Fixed bugs

- The `IFormBuilder` ref does not work.
- A string date value passed via `initialData` to the `DatePicker` component causes an error.
- If the name of an existing form is used to create a new form, the existing form will be overwritten.

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
