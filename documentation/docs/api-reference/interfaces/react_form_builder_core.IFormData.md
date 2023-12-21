---
id: "react_form_builder_core.IFormData"
title: "Interface: IFormData"
sidebar_label: "IFormData"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).IFormData

The interface for accessing the form data.

## Implemented by

- [`ComponentData`](../classes/react_form_builder_core.ComponentData.md)
- [`ComponentData`](../classes/react_form_builder_core.ComponentData.md)

## Properties

### clear

• **clear**: () => `void`

#### Type declaration

▸ (): `void`

Clears the form data.

##### Returns

`void`

___

### getValidationResult

• **getValidationResult**: () => `Promise`<`ValidationMessages`\>

#### Type declaration

▸ (): `Promise`<`ValidationMessages`\>

Returns the validation results without triggering an events and changing the state of the form.

##### Returns

`Promise`<`ValidationMessages`\>

the ValidationMessages validation results.

___

### reset

• **reset**: () => `void`

#### Type declaration

▸ (): `void`

Sets the form to its default value.

##### Returns

`void`

___

### setAllErrors

• **setAllErrors**: (`message?`: `string`) => `void`

#### Type declaration

▸ (`message?`): `void`

Sets the validation error message for all form data fields.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `string` | the validation error message. |

##### Returns

`void`

___

### validate

• **validate**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Validates the data in the form.

##### Returns

`Promise`<`void`\>

## Accessors

### data

• `get` **data**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

the Record with all the form data.

___

### errors

• `get` **errors**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

the Record with all validation error messages.

___

### hasErrors

• `get` **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

#### Returns

`boolean`

___

### isValidating

• `get` **isValidating**(): `boolean`

If true, then validation is in progress.

#### Returns

`boolean`

___

### state

• `get` **state**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

the user defined observable state.
