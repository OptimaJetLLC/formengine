---
id: "Store"
title: "Class: Store"
sidebar_label: "Store"
sidebar_position: 0
custom_edit_url: null
---

The form viewer settings.

## Implements

- [`IStore`](../interfaces/IStore.md)
- [`IFormViewer`](../interfaces/IFormViewer.md)

## Constructors

### constructor

• **new Store**(`view`, `initialData`, `externalValidators?`, `externalLocalizer?`, `externalActions?`, `propsLanguage?`, `parentStore?`, `parentComponentStore?`)

Creates form viewer settings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | [`View`](View.md) | the metadata of the form viewer components. |
| `initialData` | `Record`<`string`, `unknown`\> | the initial form data. |
| `externalValidators?` | `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules.md#schematypemap), [`ExternalValidationRules`](../modules.md#externalvalidationrules)\>\> | the set of metadata of external validation rules, grouped by the type of value being validated. |
| `externalLocalizer?` | [`ComponentLocalizer`](../modules.md#componentlocalizer) | the function to localize the properties of a component. |
| `externalActions?` | [`ActionValues`](../modules.md#actionvalues) | the set of external actions. |
| `propsLanguage?` | [`Language`](Language.md) | the full language code passed in the FormViewer properties. |
| `parentStore?` | [`Store`](Store.md) | the form viewer settings, used in templates. |
| `parentComponentStore?` | [`ComponentStore`](ComponentStore.md) | the parent component settings. |

## Properties

### #templateMap

• `Private` **#templateMap**: `Map`<`string`, [`Model`](Model.md)<`any`\>\>

Models for templates that have not been explicitly defined.

___

### eventSubject

• `Readonly` **eventSubject**: `Subject`<[`ActionEventArgs`](ActionEventArgs.md)\>

___

### externalActions

• `Optional` **externalActions**: [`ActionValues`](../modules.md#actionvalues)

the set of external actions.

___

### externalLocalizer

• `Optional` **externalLocalizer**: [`ComponentLocalizer`](../modules.md#componentlocalizer)

the function to localize the properties of a component.

___

### externalValidators

• `Optional` **externalValidators**: `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules.md#schematypemap), [`ExternalValidationRules`](../modules.md#externalvalidationrules)\>\>

the set of metadata of external validation rules, grouped by the type of value being validated.

___

### form

• **form**: [`Form`](Form.md)

#### Implementation of

[IStore](../interfaces/IStore.md).[form](../interfaces/IStore.md#form)

___

### initialData

• **initialData**: `Record`<`string`, `unknown`\>

the initial form data.

___

### parentComponentStore

• `Optional` `Readonly` **parentComponentStore**: [`ComponentStore`](ComponentStore.md)

the parent component settings.

___

### parentStore

• `Optional` `Readonly` **parentStore**: [`Store`](Store.md)

the form viewer settings, used in templates.

___

### propsLanguage

• `Optional` **propsLanguage**: [`Language`](Language.md)

the full language code passed in the FormViewer properties.

___

### selectedLanguage

• `Optional` **selectedLanguage**: [`Language`](Language.md)

___

### view

• **view**: [`View`](View.md)

the metadata of the form viewer components.

___

### viewMode

• **viewMode**: [`ViewMode`](../modules.md#viewmode) = `'desktop'`

## Accessors

### commonActions

• `get` **commonActions**(): [`ActionValues`](../modules.md#actionvalues)

#### Returns

[`ActionValues`](../modules.md#actionvalues)

the Record with the common actions.

___

### displayedLanguage

• `get` **displayedLanguage**(): [`Language`](Language.md)

#### Returns

[`Language`](Language.md)

the current display language.

___

### formData

• `get` **formData**(): [`ComponentData`](ComponentData.md)

#### Returns

[`ComponentData`](ComponentData.md)

the [IFormData](../interfaces/IFormData.md) with all the form data.

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

▸ `Private` **addTemplateModel**(`type`): [`Model`](Model.md)<`Record`<`string`, `any`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Model`](Model.md)<`Record`<`string`, `any`\>\>

___

### applyPersistedForm

▸ **applyPersistedForm**(`persistedForm`): `void`

Populates the value of this store with the values of the saved form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `persistedForm` | [`PersistedForm`](../interfaces/PersistedForm.md) | saved form value. |

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

▸ **createComponentData**(`componentStore`, `deferFieldCalculation?`): [`ComponentData`](ComponentData.md)

Creates the element for the component tree.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](ComponentStore.md) | `undefined` | the component settings. |
| `deferFieldCalculation` | `boolean` | `false` | if true, then the calculated field must be explicitly initialized. |

#### Returns

[`ComponentData`](ComponentData.md)

the element for the component tree.

___

### createField

▸ `Private` **createField**(`componentStore`, `model`, `deferFieldCalculation`): [`TemplateField`](TemplateField.md) \| `SimpleField`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](ComponentStore.md) |
| `model` | [`Model`](Model.md)<`any`\> |
| `deferFieldCalculation` | `boolean` |

#### Returns

[`TemplateField`](TemplateField.md) \| `SimpleField`

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

▸ **findAction**(`actionData`): [`ActionDefinition`](ActionDefinition.md)

Searches for an action, returns definition for the found action.

**`Throws`**

Error, if action was not found.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `actionData` | [`ActionData`](../modules.md#actiondata) | the action's data. |

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the action definition.

___

### fixDateProperty

▸ `Private` **fixDateProperty**(`componentStore`, `property`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](ComponentStore.md) |
| `property` | `string` |

#### Returns

`void`

___

### fixPropertyTypes

▸ `Private` **fixPropertyTypes**(`componentStore`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](ComponentStore.md) |

#### Returns

`void`

___

### getAction

▸ **getAction**(`name`, `type`): [`ActionDefinition`](ActionDefinition.md)

Returns an action by the specified action name and action type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the action name. |
| `type` | [`ActionType`](../modules.md#actiontype) | the action type. |

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the action.

___

### getModel

▸ **getModel**(`type`): [`Model`](Model.md)<`Record`<`string`, `any`\>\> \| [`Model`](Model.md)<[`InternalErrorProps`](../interfaces/InternalErrorProps.md)\>

Returns model for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

[`Model`](Model.md)<`Record`<`string`, `any`\>\> \| [`Model`](Model.md)<[`InternalErrorProps`](../interfaces/InternalErrorProps.md)\>

the model for the specified type.

___

### getValidationRules

▸ **getValidationRules**(`type`): [`FormViewerValidationRules`](../modules.md#formviewervalidationrules)

Returns the object with validators for the specified value type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | keyof [`SchemaTypeMap`](../modules.md#schematypemap) | the value type. |

#### Returns

[`FormViewerValidationRules`](../modules.md#formviewervalidationrules)

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
| `componentStore` | [`ComponentStore`](ComponentStore.md) | the component settings. |

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
| `componentStore` | [`ComponentStore`](ComponentStore.md) | the component settings. |
| `validationResults?` | [`ValidationResult`](../modules.md#validationresult)[] | the validation results. |

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
| `callback` | (`accumulator`: `T`, `current`: [`ComponentData`](ComponentData.md)) => `T` | the function that calculates the value for the accumulator. |
| `initialValue` | `T` | the initial value for the accumulator. |

#### Returns

`T`

the accumulated value.

#### Implementation of

IStore.reduceScreen
