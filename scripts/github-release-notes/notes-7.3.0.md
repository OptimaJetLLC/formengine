_October_ 2, 2025

### New

- Added [Table](https://formengine.io/documentation/formengine-designer/components/table) component.
- Added the feature to [override or disable](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#overrideeventhandlers) the `onChange` and `onBlur` component handlers.
- Added the feature to [disable styling](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#withoutstyles) for certain components.
- Added an interactive, editable, live-coding [form example](https://formengine.io/documentation/formengine-designer#add-the-form-to-the-page) to documentation.
- Added [CellInfoContextProvider](https://formengine.io/documentation/api-reference/@react-form-builder/core/variables/CellInfoContextProvider) for implementing table components.
- Added a standard color for svg icons in the component palette.
- Added the feature to [hide property editors](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#hideactioneditors) on the Actions tab.
- The sideEffects property has been added to packages (to better support tree-shaking).
- Added feature to [disable component removal](https://formengine.io/documentation/formengine-designer/features/custom-components#disable-component-remove).
- Added export of individual components for the [RSuite Components library](https://www.npmjs.com/package/@react-form-builder/components-rsuite).

### Changed

- Replaced `window` with `globalThis` in project code.

### Fixed bugs

- Fixed a bug that caused the [Rich Text Editor](https://formengine.io/documentation/formengine-designer/components/rich-text-editor) component not being cleared.
- Fixed an issue that allowed adding items to the color pickers with a predefined list of colors.
- Fixed partially displayed error messages.
- Fixed a bug that caused duplicates in the Picker component when adding new values.

### Updated internal dependencies

- Bumped `tar-fs` from 2.1.3 to 2.1.4.
