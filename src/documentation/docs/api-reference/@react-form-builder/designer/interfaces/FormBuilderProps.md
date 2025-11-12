# Interface: FormBuilderProps

Properties of the React Form builder component.

## Extends

- `Omit`\<[`FormViewerProps`](../../core/interfaces/FormViewerProps.md), `"view"`\>

## Properties

### actions?

> `optional` **actions**: [`CustomActions`](../../core/type-aliases/CustomActions.md)

Custom actions for the form viewer.

#### Inherited from

`Omit.actions`

***

### builderRef?

> `optional` **builderRef**: `ForwardedRef`\<[`IFormBuilder`](IFormBuilder.md)\>

The reference to [IFormBuilder](IFormBuilder.md).

***

### componentWrapper?

> `optional` **componentWrapper**: `ComponentType`\<`any`\>

The React component that wraps every component in a form. **Internal use only.**

#### Inherited from

`Omit.componentWrapper`

***

### context?

> `optional` **context**: `any`

The arbitrary user context.

#### Inherited from

`Omit.context`

***

### customization?

> `optional` **customization**: `Partial`\<`Record`\<`string`, [`Options`](../type-aliases/Options.md)\>\>

The map of customizations for the FormBuilder components.

***

### disabled?

> `optional` **disabled**: `boolean`

If true, the form is disabled.

#### Inherited from

`Omit.disabled`

***

### errors?

> `optional` **errors**: `Record`\<`string`, `unknown`\>

The form validation errors.

#### Inherited from

`Omit.errors`

***

### errorWrapper?

> `optional` **errorWrapper**: `ComponentType`\<[`ErrorWrapperProps`](../../core/interfaces/ErrorWrapperProps.md)\>

The default error wrapper used when errorType is not specified in the form.

#### Inherited from

`Omit.errorWrapper`

***

### formName?

> `optional` **formName**: `string`

The form name.
Updating the value triggers the [FormViewerProps.getForm](../../core/interfaces/FormViewerProps.md#getform) function.

#### Inherited from

`Omit.formName`

***

### formOptions?

> `optional` **formOptions**: `any`

The form options. Used to transfer any options to the [FormViewerProps.getForm](../../core/interfaces/FormViewerProps.md#getform) function.
Updating the value triggers the [FormViewerProps.getForm](../../core/interfaces/FormViewerProps.md#getform) function.

#### Inherited from

`Omit.formOptions`

***

### formStorage?

> `optional` **formStorage**: [`IFormStorage`](IFormStorage.md)

The external form storage.

***

### formValidators?

> `optional` **formValidators**: [`FormValidators`](../../core/type-aliases/FormValidators.md)

The set of functions that validate the form data.

#### Inherited from

`Omit.formValidators`

***

### getForm()?

> `optional` **getForm**: (`name?`, `options?`) => `string` \| `Promise`\<`string`\>

Loads the form.

#### Parameters

##### name?

`string`

the form name.

##### options?

`any`

the form options.

#### Returns

`string` \| `Promise`\<`string`\>

the string or Promise with the form.

#### Inherited from

`Omit.getForm`

***

### i18n?

> `optional` **i18n**: [`FormBuilderI18n`](../type-aliases/FormBuilderI18n.md)

The i18n data of the form builder.

***

### initialData?

> `optional` **initialData**: `Record`\<`string`, `unknown`\>

The initial data of the form.

#### Inherited from

`Omit.initialData`

***

### language?

> `optional` **language**: `` `${string}-${string}` ``

The language of the form, e.g. 'en-US'.

#### Inherited from

`Omit.language`

***

### licenseKey?

> `optional` **licenseKey**: `string`

The FormEngine license key.

***

### localizationEngine?

> `optional` **localizationEngine**: [`ILocalizationEngine`](../../core/interfaces/ILocalizationEngine.md)

The localization engine used by the viewer.

#### Inherited from

`Omit.localizationEngine`

***

### localize?

> `optional` **localize**: [`ComponentLocalizer`](../../core/type-aliases/ComponentLocalizer.md)

The function to localize the properties of a component.

#### Inherited from

`Omit.localize`

***

### onFormDataChange()?

> `optional` **onFormDataChange**: (`data`) => `void`

The event is called whenever a form data changes.

#### Parameters

##### data

[`IFormData`](../../core/interfaces/IFormData.md)

the [IFormData](../../core/interfaces/IFormData.md) with all the form data.

#### Returns

`void`

#### Inherited from

`Omit.onFormDataChange`

***

### onFormSchemaChange()?

> `optional` **onFormSchemaChange**: (`formSchema`) => `void`

The event is called whenever a form schema changes.

#### Parameters

##### formSchema

`string`

the current form schema serialized to JSON.

#### Returns

`void`

***

### persistFormName?

> `optional` **persistFormName**: `boolean`

If true, the form name will be saved to localStorage and restored when the Form builder is reopened.
This functionality is enabled by default.

***

### presetComponentOptions?

> `optional` **presetComponentOptions**: [`IPresetComponentOptions`](IPresetComponentOptions.md)

The preset component options.

***

### propertyEditors?

> `optional` **propertyEditors**: `Record`\<`string`, `ComponentType`\<[`AnnotationEditorProps`](AnnotationEditorProps.md)\>\>

Custom component property editors. **Attention! Unstable API.**

***

### readOnly?

> `optional` **readOnly**: `boolean`

If true, the form is read-only.

#### Inherited from

`Omit.readOnly`

***

### showAllValidationErrors?

> `optional` **showAllValidationErrors**: `boolean`

If true, all validation errors will be displayed.

#### Inherited from

`Omit.showAllValidationErrors`

***

### theme?

> `optional` **theme**: [`FormBuilderTheme`](../type-aliases/FormBuilderTheme.md)

Indicates the theme preference.

***

### validators?

> `optional` **validators**: `Partial`\<`Record`\<keyof [`SchemaTypeMap`](../../core/type-aliases/SchemaTypeMap.md), [`CustomValidationRules`](../../core/type-aliases/CustomValidationRules.md)\>\>

The set of metadata of validation rules, grouped by the type of value being validated.

#### Inherited from

`Omit.validators`

***

### view

> **view**: [`BuilderView`](../classes/BuilderView.md)

All the metadata of the components of the form builder.

***

### viewerRef?

> `optional` **viewerRef**: `ForwardedRef`\<[`IFormViewer`](../../core/interfaces/IFormViewer.md)\>

The reference to [IFormViewer](../../core/interfaces/IFormViewer.md).

#### Inherited from

`Omit.viewerRef`

***

### viewMode?

> `optional` **viewMode**: [`ViewMode`](../../core/type-aliases/ViewMode.md)

Display resolution type.

#### Inherited from

`Omit.viewMode`
