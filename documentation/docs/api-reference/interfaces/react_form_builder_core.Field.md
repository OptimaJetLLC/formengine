---
id: "react_form_builder_core.Field"
title: "Interface: Field"
sidebar_label: "Field"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Field

Field with the form data.

## Implemented by

- [`TemplateField`](../classes/react_form_builder_core.TemplateField.md)
- [`TemplateField`](../classes/react_form_builder_core.TemplateField.md)

## Properties

### clear

• **clear**: () => `void`

#### Type declaration

▸ (): `void`

Clears the data in the field.

##### Returns

`void`

___

### dispose

• **dispose**: () => `void`

#### Type declaration

▸ (): `void`

Releases allocated resources, must be used when destroying an object instance.

##### Returns

`void`

___

### error

• `Optional` **error**: `string`

Contains a field validation error if the field data is not valid.

___

### init

• **init**: () => `void`

#### Type declaration

▸ (): `void`

Initializes the value of the field.

##### Returns

`void`

___

### reset

• **reset**: () => `void`

#### Type declaration

▸ (): `void`

Sets the field to its default value.

##### Returns

`void`

___

### setTouched

• **setTouched**: () => `void`

#### Type declaration

▸ (): `void`

Marks the field as touched.

##### Returns

`void`

___

### setValue

• **setValue**: (`value`: `unknown`) => `void`

#### Type declaration

▸ (`value`): `void`

Sets the value of the field.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | the value. |

##### Returns

`void`

___

### storeDataInParentForm

• `Optional` **storeDataInParentForm**: `boolean`

Flag, false if nested form data show as nested object, true otherwise.

___

### touched

• **touched**: `boolean`

Flag, true, if the field is marked as touched.

___

### validate

• **validate**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

Validates the field value.

##### Returns

`Promise`<`void`\>

___

### value

• **value**: `unknown`

Value of the field.

___

### valued

• **valued**: `string`

The name of the component property that contains the field value.
