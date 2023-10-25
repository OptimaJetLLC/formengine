---
id: "react_form_builder_core.Store"
title: "Class: Store"
sidebar_label: "Store"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Store

The form viewer settings.

## Implements

- [`IStore`](../interfaces/react_form_builder_core.IStore.md)
- [`IFormViewer`](../interfaces/react_form_builder_core.IFormViewer.md)

## Constructors

### constructor

• **new Store**(`formViewerPropsStore`, `parentStore?`, `parentComponentStore?`)

Creates form viewer settings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formViewerPropsStore` | [`FormViewerPropsStore`](react_form_builder_core.FormViewerPropsStore.md) | the form viewer store settings. |
| `parentStore?` | [`Store`](react_form_builder_core.Store.md) | the form viewer settings, used in templates. |
| `parentComponentStore?` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the parent component settings. |

## Properties

### #templateMap

• `Private` **#templateMap**: `Map`<`string`, [`Model`](react_form_builder_core.Model.md)<`any`\>\>

Models for templates that have not been explicitly defined.

___

### eventSubject

• `Readonly` **eventSubject**: `Subject`<[`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)\>

___

### form

• **form**: [`Form`](react_form_builder_core.Form.md)

The displayed form.

#### Implementation of

[IStore](../interfaces/react_form_builder_core.IStore.md).[form](../interfaces/react_form_builder_core.IStore.md#form)

___

### formViewerPropsStore

• **formViewerPropsStore**: [`FormViewerPropsStore`](react_form_builder_core.FormViewerPropsStore.md)

the form viewer store settings.

___

### parentComponentStore

• `Optional` `Readonly` **parentComponentStore**: [`ComponentStore`](react_form_builder_core.ComponentStore.md)

the parent component settings.

___

### parentStore

• `Optional` `Readonly` **parentStore**: [`Store`](react_form_builder_core.Store.md)

the form viewer settings, used in templates.

___

### selectedLanguage

• `Optional` **selectedLanguage**: [`Language`](react_form_builder_core.Language.md)

___

### viewMode

• **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode) = `'desktop'`

## Accessors

### commonActions

• `get` **commonActions**(): [`ActionValues`](../modules/react_form_builder_core.md#actionvalues)

#### Returns

[`ActionValues`](../modules/react_form_builder_core.md#actionvalues)

the Record with the common actions.

___

### displayedLanguage

• `get` **displayedLanguage**(): [`Language`](react_form_builder_core.Language.md)

#### Returns

[`Language`](react_form_builder_core.Language.md)

the current display language.

___

### formData

• `get` **formData**(): [`ComponentData`](react_form_builder_core.ComponentData.md)

#### Returns

[`ComponentData`](react_form_builder_core.ComponentData.md)

the [IFormData](../interfaces/react_form_builder_core.IFormData.md) with all the form data.

#### Implementation of

IFormViewer.formData

___

### initialDataSlice

• `get` **initialDataSlice**(): `undefined` \| `Record`<`string`, `unknown`\>

#### Returns

`undefined` \| `Record`<`string`, `unknown`\>

the slice of the initial data in accordance with the Store hierarchy.

#### Implementation of

IStore.initialDataSlice

## Methods

### #onLoadError

▸ `Private` **#onLoadError**(`e`): `void`

Changes the form to the component with an error description.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `e` | `any` | the error. |

#### Returns

`void`

___

### addTemplateModel

▸ `Private` **addTemplateModel**(`type`): [`Model`](react_form_builder_core.Model.md)<`Record`<`string`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Model`](react_form_builder_core.Model.md)<`Record`<`string`, `any`\>\>

___

### applyPersistedForm

▸ **applyPersistedForm**(`persistedForm`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `persistedForm` | [`PersistedForm`](../interfaces/react_form_builder_core.PersistedForm.md) | saved form value. |

#### Returns

`void`

___

### applyStringForm

▸ **applyStringForm**(`text`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | saved form value. |

#### Returns

`void`

___

### clear

▸ **clear**(): `void`

Clears the form in Form Viewer.

#### Returns

`void`

___

### createComponentData

▸ **createComponentData**(`componentStore`, `deferFieldCalculation?`, `model?`): [`ComponentData`](react_form_builder_core.ComponentData.md)

Creates the element for the component tree.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | `undefined` | the component settings. |
| `deferFieldCalculation` | `boolean` | `false` | if true, then the calculated field must be explicitly initialized. |
| `model?` | [`Model`](react_form_builder_core.Model.md)<`any`\> | `undefined` | the component's metadata. |

#### Returns

[`ComponentData`](react_form_builder_core.ComponentData.md)

the element for the component tree.

___

### createField

▸ `Private` **createField**(`componentStore`, `model`, `deferFieldCalculation`): [`TemplateField`](react_form_builder_core.TemplateField.md) \| `SimpleField`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |
| `model` | [`Model`](react_form_builder_core.Model.md)<`any`\> |
| `deferFieldCalculation` | `boolean` |

#### Returns

[`TemplateField`](react_form_builder_core.TemplateField.md) \| `SimpleField`

___

### dispose

▸ **dispose**(): `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

#### Returns

`void`

#### Implementation of

IStore.dispose

___

### findAction

▸ **findAction**(`actionData`): [`ActionDefinition`](react_form_builder_core.ActionDefinition.md)

Searches for an action, returns definition for the found action.

**`Throws`**

Error, if action was not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionData` | [`ActionData`](../modules/react_form_builder_core.md#actiondata) | the action's data. |

#### Returns

[`ActionDefinition`](react_form_builder_core.ActionDefinition.md)

the action definition.

___

### fixDateProperty

▸ `Private` **fixDateProperty**(`componentStore`, `property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |
| `property` | `string` |

#### Returns

`void`

___

### fixPropertyTypes

▸ `Private` **fixPropertyTypes**(`componentStore`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

#### Returns

`void`

___

### getAction

▸ **getAction**(`name`, `type`): [`ActionDefinition`](react_form_builder_core.ActionDefinition.md)

Returns an action by the specified action name and action type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the action name. |
| `type` | [`ActionType`](../modules/react_form_builder_core.md#actiontype) | the action type. |

#### Returns

[`ActionDefinition`](react_form_builder_core.ActionDefinition.md)

the action.

___

### getModel

▸ **getModel**(`type`): [`Model`](react_form_builder_core.Model.md)<`Record`<`string`, `any`\>\> \| [`Model`](react_form_builder_core.Model.md)<[`InternalErrorProps`](../interfaces/react_form_builder_core.InternalErrorProps.md)\>

Returns model for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

[`Model`](react_form_builder_core.Model.md)<`Record`<`string`, `any`\>\> \| [`Model`](react_form_builder_core.Model.md)<[`InternalErrorProps`](../interfaces/react_form_builder_core.InternalErrorProps.md)\>

the model for the specified type.

___

### getValidationRules

▸ **getValidationRules**(`type`): [`FormViewerValidationRules`](../modules/react_form_builder_core.md#formviewervalidationrules)

Returns the object with validators for the specified value type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap) | the value type. |

#### Returns

[`FormViewerValidationRules`](../modules/react_form_builder_core.md#formviewervalidationrules)

the object with validators for the specified value type.

___

### loadForm

▸ **loadForm**(`getForm?`, `formName?`): `void`

Loads a form by form name and sets that form in the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `getForm?` | (`name?`: `string`) => `string` \| `Promise`<`string`\> | the function that loads the form. |
| `formName?` | `string` | the form name. |

#### Returns

`void`

___

### localizeComponent

▸ **localizeComponent**(`type`, `componentStore`): `Record`<`string`, `any`\>

Localizes a component store based on the given localization type. If an external localizer is available, it will be used.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the type of localization. |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component settings. |

#### Returns

`Record`<`string`, `any`\>

the Record with the localized properties.

___

### localizeErrorMessages

▸ **localizeErrorMessages**(`componentStore`, `validationResults?`): `undefined` \| `string`

Localizes validator error messages.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component settings. |
| `validationResults?` | [`ValidationResult`](../modules/react_form_builder_core.md#validationresult)[] | the validation results. |

#### Returns

`undefined` \| `string`

the localized error messages joined by space, or undefined if validationResults is undefined.

#### Implementation of

IStore.localizeErrorMessages

___

### reduceScreen

▸ **reduceScreen**<`T`\>(`callback`, `initialValue`): `T`

Performs the callback function on each element of the component tree, accumulates the return values.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `callback` | (`accumulator`: `T`, `current`: [`ComponentData`](react_form_builder_core.ComponentData.md)) => `T` | the function that calculates the value for the accumulator. |
| `initialValue` | `T` | the initial value for the accumulator. |

#### Returns

`T`

the accumulated value.

#### Implementation of

IStore.reduceScreen
