### New

- Added support for [functional type properties](https://formengine.io/documentation/custom-components#functional-properties).
- Added the [formOptions](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#formoptions) property to pass custom options to the [getForm](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#getform) function.
- Added the [options](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/TemplateProps#options) property for templates, similar to [formOptions](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#formoptions).
- Added support for [one-way data binding](https://formengine.io/documentation/custom-components#one-way-data-binding) for component properties.
- Added ability to create [computed](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IComponentBuilder#computedprop) and [localized](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/IComponentBuilder#localizedprop) properties using the [form JSON builder](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/buildForm).
- Added the [persistFormName](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#persistformname) property to disable form name persistence in localStorage.
- Added the [AutoComplete](https://formengine.io/documentation/components-library/fields-components/autocomplete) component.
- Added visual highlighting for user-modified component properties.

### Fixed bugs

- Fixed dropdown positioning in code action arguments editor (previously appearing off-screen).
- Fixed  `aria-label` attribute added on components without labels.

### Updated internal dependencies

- _rsuite_ from 5.80.2 to 5.83.1.
