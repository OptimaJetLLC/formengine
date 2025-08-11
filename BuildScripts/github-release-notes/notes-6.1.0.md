### New

- Added support for using a [functional](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/FunctionArgumentValue) [argument type](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ParameterType) in [custom actions](https://formengine.io/documentation/actions#custom-actions).
- Added support for [passing CSS styles via the style property](https://formengine.io/documentation/component-styling#passing-styles-to-the-style-attribute) instead of className.
- Added support for [specifying a component role](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#componentrole) (e.g., label, tooltip, etc.).
- Added the ability to [manage](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/Definer#addfeature) [component features](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ComponentFeature), including:
  - [cfComponentIsPreset](https://formengine.io/api-reference/@react-form-builder/core/variables/cfComponentIsPreset)
  - [cfDisableAdditionalProperties](https://formengine.io/api-reference/@react-form-builder/core/variables/cfDisableAdditionalProperties)
  - [cfDisableMainComponentProperties](https://formengine.io/api-reference/@react-form-builder/core/variables/cfDisableMainComponentProperties)
  - [cfDisableStyleProperties](https://formengine.io/api-reference/@react-form-builder/core/variables/cfDisableStyleProperties)
  - [cfDisableStylesForClassNameEditor](https://formengine.io/api-reference/@react-form-builder/core/variables/cfDisableStylesForClassNameEditor)
  - [cfEnableInlineStylesEditor](https://formengine.io/api-reference/@react-form-builder/core/variables/cfEnableInlineStylesEditor)
  - [cfDisableTooltipProperties](https://formengine.io/api-reference/@react-form-builder/core/variables/cfDisableTooltipProperties)

### Changed

- Deprecated the `slot` and `preset` options in the [ComponentKind](https://formengine.io/documentation/api-reference/@react-form-builder/core/type-aliases/ComponentKind) type.

### Fixed bugs

- Fixed an issue where saving or creating a new form could break the behavior of the custom form list.
- Fixed an issue where deleting a form that was not currently open caused a "formName is undefined" error.
