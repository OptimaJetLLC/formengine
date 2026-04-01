_September_ 18, 2025

### New

- Added **Add a new form** action to the Designer main menu.
- Added the following keyboard shortcuts:
  - <kbd>Delete</kbd> delete the selected component;
  - <kbd>Ctrl</kbd> <kbd>D</kbd> / <kbd>Cmd</kbd> <kbd>D</kbd> clone the selected component;
  - <kbd>Ctrl</kbd> <kbd>S</kbd> / <kbd>Cmd</kbd> <kbd>S</kbd> save the form;
  - <kbd>Ctrl</kbd> <kbd>Z</kbd> / <kbd>Cmd</kbd> <kbd>Z</kbd> undo action;
  - <kbd>Ctrl</kbd> <kbd>Y</kbd> / <kbd>Ctrl</kbd> <kbd>Shift</kbd> <kbd>Z</kbd> / <kbd>Cmd</kbd> <kbd>Shift</kbd> <kbd>Z</kbd> redo action;
- Added the [useBuilderValue](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/useBuilderValue) hook, which allows displaying a default value in custom components if the value is undefined in form design mode.
- Added the following fields and methods:
  - [Definer.skipChildrenDuringFieldCollection](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#skipchildrenduringfieldcollection)
  - [Definer.hideTooltipEditor](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#hidetooltipeditor)
  - [ComponentStore.clone](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ComponentStore#clone)
  - [ActionEventArgs.userDefinedProps](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/ActionEventArgs#userdefinedprops)

### Changed

- Removed the `readOnly` property from the `Button` component.

### Fixed bugs

- Fixed the _'Invalid prop className supplied to React.Fragment'_ error that occurred when using the `Card` component.
- Fixed the _'Check the render method of RawActionList'_ error that occurred when cloning a component with actions.
- Fixed an issue where the `Signature` component was not cleared when calling `Clear` on a form.
