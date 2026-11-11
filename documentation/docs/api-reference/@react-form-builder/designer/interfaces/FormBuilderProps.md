# Interface: FormBuilderProps

Properties of the React Form builder component.

## Extends

- `Omit`\<[`FormViewerProps`](../../core/interfaces/FormViewerProps.md), `"language"` \| `"view"`\>

## Properties

### actions?

> `optional` **actions?**: [`CustomActions`](../../core/type-aliases/CustomActions.md)

Custom actions for the form viewer.

#### Inherited from

`Omit.actions`

***

### builderRef?

> `optional` **builderRef?**: `ForwardedRef`\<[`IFormBuilder`](IFormBuilder.md)\>

The reference to [IFormBuilder](IFormBuilder.md).

***

### componentWrapper?

> `optional` **componentWrapper?**: `ComponentType`\<`any`\>

The React component that wraps every component in a form. **Internal use only.**

#### Inherited from

`Omit.componentWrapper`

***

### context?

> `optional` **context?**: `any`

The arbitrary context used internally by the form viewer.

#### Inherited from

`Omit.context`

***

### customization?

> `optional` **customization?**: `Partial`\<`Record`\<`string`, [`Options`](../type-aliases/Options.md)\>\>

The map of customizations for the FormBuilder components.

***

### defaultBuilderLanguage?

> `optional` **defaultBuilderLanguage?**: `` `${string}-${string}` ``

The builder language. When set, it selects the matching entry among [FormBuilderI18n.languages](../type-aliases/FormBuilderI18n.md#languages).

***

### defaultViewerLanguage?

> `optional` **defaultViewerLanguage?**: `` `${string}-${string}` ``

The initial language of the form viewer (form localization preview), e.g. 'en-US'.
Unlike the removed [FormViewerProps.language](../../core/interfaces/FormViewerProps.md#language) prop, this value is only used for the initial selection and does not lock the viewer language.

***

### disabled?

> `optional` **disabled?**: `boolean`

If true, the form is disabled.

#### Inherited from

`Omit.disabled`

***

### errors?

> `optional` **errors?**: `Record`\<`string`, `unknown`\>

The form validation errors.

#### Inherited from

`Omit.errors`

***

### errorWrapper?

> `optional` **errorWrapper?**: `ComponentType`\<[`ErrorWrapperProps`](../../core/interfaces/ErrorWrapperProps.md)\>

The default error wrapper used when errorType is not specified in the form.

#### Inherited from

`Omit.errorWrapper`

***

### formName?

> `optional` **formName?**: `string`

The form name.
Updating the value triggers the [FormViewerProps.getForm](../../core/interfaces/FormViewerProps.md#getform) function.

#### Inherited from

`Omit.formName`

***

### formOptions?

> `optional` **formOptions?**: `any`

The form options. Used to transfer any options to the [FormViewerProps.getForm](../../core/interfaces/FormViewerProps.md#getform) function.
Updating the value triggers the [FormViewerProps.getForm](../../core/interfaces/FormViewerProps.md#getform) function.

#### Inherited from

`Omit.formOptions`

***

### formStorage?

> `optional` **formStorage?**: [`IFormStorage`](IFormStorage.md)

The external form storage.

***

### formValidators?

> `optional` **formValidators?**: [`FormValidators`](../../core/type-aliases/FormValidators.md)

The set of functions that validate the form data.

#### Inherited from

`Omit.formValidators`

***

### generateJsonFormSchema?

> `optional` **generateJsonFormSchema?**: (`options`) => `string`

The JSON schema generator for a form.

#### Parameters

##### options

[`GenerateJsonFormSchemaOptions`](../type-aliases/GenerateJsonFormSchemaOptions.md)

the generator options.

#### Returns

`string`

the JSON schema in string format.

***

### getForm?

> `optional` **getForm?**: (`name?`, `options?`) => `Promise`\<`string`\> \| `string`

Loads the form.

#### Parameters

##### name?

`string`

the form name.

##### options?

`any`

the form options.

#### Returns

`Promise`\<`string`\> \| `string`

the string or Promise with the form.

#### Inherited from

`Omit.getForm`

***

### i18n?

> `optional` **i18n?**: [`FormBuilderI18n`](../type-aliases/FormBuilderI18n.md)

The i18n data of the form builder.

***

### initialData?

> `optional` **initialData?**: `Record`\<`string`, `unknown`\>

The initial data of the form.

#### Inherited from

`Omit.initialData`

***

### initialState?

> `optional` **initialState?**: `Record`\<`string`, `unknown`\>

The initial user-defined state for the form.
This object is set into [IFormData.state](../../core/interfaces/IFormData.md#state) when the form is initialized, this property is reactive.

#### Inherited from

`Omit.initialState`

***

### jsonSchemaFilename?

> `optional` **jsonSchemaFilename?**: `string`

The file name for the generated JSON schema.

***

### licenseKey?

> `optional` **licenseKey?**: `string`

The FormEngine license key.

***

### localizationEngine?

> `optional` **localizationEngine?**: [`ILocalizationEngine`](../../core/interfaces/ILocalizationEngine.md)

The localization engine used by the viewer.

#### Inherited from

`Omit.localizationEngine`

***

### localize?

> `optional` **localize?**: [`ComponentLocalizer`](../../core/type-aliases/ComponentLocalizer.md)

The function to localize the properties of a component.

#### Inherited from

`Omit.localize`

***

### localStoragePrefix?

> `optional` **localStoragePrefix?**: `string`

The prefix for localStorage keys.

***

### onBuilderLanguageChange?

> `optional` **onBuilderLanguageChange?**: (`language`) => `void`

A callback invoked when the language is changed in the Builder.

#### Parameters

##### language

[`Language`](../../core/classes/Language.md)

the language.

#### Returns

`void`

***

### onFormDataChange?

> `optional` **onFormDataChange?**: (`data`) => `void`

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

### onFormElementAdd?

> `optional` **onFormElementAdd?**: (`payload`) => `void`

Callback invoked when a component is added to the form.

#### Parameters

##### payload

the payload with information about the added component.

###### insertPosition?

[`InsertPosition`](../type-aliases/InsertPosition.md)

the position at which to insert the component.

###### presetName?

`string`

the applied preset name.

###### slot?

`string`

the target slot name.

###### slotCondition?

`string`

the target slot condition.

###### source

[`ComponentData`](../../core/classes/ComponentData.md)

the source component.

###### target

[`ComponentData`](../../core/classes/ComponentData.md)

the target component.

#### Returns

`void`

***

### onFormElementRemove?

> `optional` **onFormElementRemove?**: (`payload`) => `void`

Callback invoked when a component is removed from the form.

#### Parameters

##### payload

the payload with information about the removed component.

###### source

[`ComponentData`](../../core/classes/ComponentData.md)

the removed component.

#### Returns

`void`

***

### onFormSchemaChange?

> `optional` **onFormSchemaChange?**: (`formSchema`) => `void`

The event is called whenever a form schema changes.

#### Parameters

##### formSchema

`string`

the current form schema serialized to JSON.

#### Returns

`void`

***

### onViewerLanguageChange?

> `optional` **onViewerLanguageChange?**: (`language`) => `void`

A callback invoked when the form's language is changed.

#### Parameters

##### language

[`Language`](../../core/classes/Language.md)

the language.

#### Returns

`void`

***

### persistFormName?

> `optional` **persistFormName?**: `boolean`

If true, the form name will be saved to localStorage and restored when the Form builder is reopened.
This functionality is enabled by default.

***

### presetComponentOptions?

> `optional` **presetComponentOptions?**: [`IPresetComponentOptions`](IPresetComponentOptions.md)

The preset component options.

***

### propertyEditors?

> `optional` **propertyEditors?**: `Record`\<`string`, `ComponentType`\<[`AnnotationEditorProps`](AnnotationEditorProps.md)\>\>

Custom component property editors. **Attention! Unstable API.**

***

### readOnly?

> `optional` **readOnly?**: `boolean`

If true, the form is read-only.

#### Inherited from

`Omit.readOnly`

***

### showAllValidationErrors?

> `optional` **showAllValidationErrors?**: `boolean`

If true, all validation errors will be displayed.

#### Inherited from

`Omit.showAllValidationErrors`

***

### stylesProvider?

> `optional` **stylesProvider?**: `ComponentType`\<[`StylesProviderProps`](StylesProviderProps.md)\>

The component that loads the CSS.

***

### theme?

> `optional` **theme?**: [`FormBuilderTheme`](../type-aliases/FormBuilderTheme.md)

Indicates the theme preference.

***

### userContext?

> `optional` **userContext?**: `unknown`

Arbitrary host context for the form viewer, available in actions as `e.userContext`.
The same object reference is shared with parent and child forms; nested fields are not deep-observed.
Pass a new object to replace the context, or a host-owned MobX observable if you need nested reactions.

#### Inherited from

`Omit.userContext`

***

### validators?

> `optional` **validators?**: `Partial`\<`Record`\<keyof [`SchemaTypeMap`](../../core/type-aliases/SchemaTypeMap.md), [`CustomValidationRules`](../../core/type-aliases/CustomValidationRules.md)\>\>

The set of metadata of validation rules, grouped by the type of value being validated.

#### Inherited from

`Omit.validators`

***

### view

> **view**: [`BuilderView`](../classes/BuilderView.md)

All the metadata of the components of the form builder.

***

### viewerRef?

> `optional` **viewerRef?**: `ForwardedRef`\<[`IFormViewer`](../../core/interfaces/IFormViewer.md)\>

The reference to [IFormViewer](../../core/interfaces/IFormViewer.md).

#### Inherited from

`Omit.viewerRef`

***

### viewMode?

> `optional` **viewMode?**: [`ViewMode`](../../core/type-aliases/ViewMode.md)

Display resolution type.

#### Inherited from

`Omit.viewMode`
