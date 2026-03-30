- Added a search field on the Forms tab.
- Added the ability to use hooks and functions inside [custom property editors](https://formengine.io/documentation/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#propertyeditors) to access component and engine data. These are, for example [useComponentData](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/useComponentData), [useStore](https://formengine.io/documentation/api-reference/@react-form-builder/core/functions/useStore), and [others](https://formengine.io/documentation/api-reference/@react-form-builder/core/#functions).
- The [formLoadError](https://formengine.io/documentation/api-reference/@react-form-builder/core/classes/Store#formloaderror) field has been added to the FormViewer API that signals the failure of loading the form, and also contains the error text.
- Now, if the form is loaded unsuccessfully, a message about this is displayed in the form designer, as well as a suggestion to create a new form.

### Fixed bugs

- When changing the value of [actions](https://formengine.io/documentation/api-reference/@react-form-builder/core/interfaces/FormViewerProps#actions) in FormViewer props after initialization, their value inside the engine did not change.
- Saving the form is called twice when creating a new form, as well as in some other cases.
