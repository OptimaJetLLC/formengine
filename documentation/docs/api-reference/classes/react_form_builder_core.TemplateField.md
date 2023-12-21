---
id: "react_form_builder_core.TemplateField"
title: "Class: TemplateField"
sidebar_label: "TemplateField"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).TemplateField

The field with the form data, contains the value of the nested form. **Internal use only.**

## Implements

- [`Field`](../interfaces/react_form_builder_core.Field.md)

## Constructors

### constructor

• **new TemplateField**(`componentStore`, `viewerStore`)

Creates the nested form field with form data for the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component settings. |
| `viewerStore` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) | viewerStore the form viewer settings. |

## Properties

### componentStore

• `Readonly` **componentStore**: [`ComponentStore`](react_form_builder_core.ComponentStore.md)

the component settings.

___

### touched

• **touched**: `boolean` = `false`

Flag, true, if the field is marked as touched.

#### Implementation of

[Field](../interfaces/react_form_builder_core.Field.md).[touched](../interfaces/react_form_builder_core.Field.md#touched)

___

### valued

• **valued**: `string` = `''`

The name of the component property that contains the field value.

#### Implementation of

[Field](../interfaces/react_form_builder_core.Field.md).[valued](../interfaces/react_form_builder_core.Field.md#valued)

___

### viewerStore

• `Readonly` **viewerStore**: [`IStore`](../interfaces/react_form_builder_core.IStore.md)

viewerStore the form viewer settings.

## Accessors

### errors

• `get` **errors**(): `Record`<`string`, `unknown`\>

Contains a field validation errors if the field provides multiple errors (i.e. field is template).

#### Returns

`Record`<`string`, `unknown`\>

#### Implementation of

[Field](../interfaces/react_form_builder_core.Field.md).[errors](../interfaces/react_form_builder_core.Field.md#errors)

___

### form

• `get` **form**(): [`ComponentData`](react_form_builder_core.ComponentData.md)

#### Returns

[`ComponentData`](react_form_builder_core.ComponentData.md)

the form for the field.

___

### storeDataInParentForm

• `get` **storeDataInParentForm**(): `any`

Flag, false if nested form data show as nested object, true otherwise.

#### Returns

`any`

#### Implementation of

[Field](../interfaces/react_form_builder_core.Field.md).[storeDataInParentForm](../interfaces/react_form_builder_core.Field.md#storedatainparentform)

___

### value

• `get` **value**(): `unknown`

Value of the field.

#### Returns

`unknown`

#### Implementation of

[Field](../interfaces/react_form_builder_core.Field.md).[value](../interfaces/react_form_builder_core.Field.md#value)

## Methods

### clear

▸ **clear**(): `void`

Clears the data in the field.

#### Returns

`void`

#### Implementation of

Field.clear

___

### dispose

▸ **dispose**(): `void`

Releases allocated resources, must be used when destroying an object instance.

#### Returns

`void`

#### Implementation of

Field.dispose

___

### getValidationResult

▸ **getValidationResult**(): `Promise`<`undefined`\>

Returns the validation results without triggering an events and changing the state of the form.

#### Returns

`Promise`<`undefined`\>

the ValidationMessages validation results.

#### Implementation of

Field.getValidationResult

___

### init

▸ **init**(): `void`

Initializes the value of the field.

#### Returns

`void`

#### Implementation of

Field.init

___

### reset

▸ **reset**(): `void`

Sets the field to its default value.

#### Returns

`void`

#### Implementation of

Field.reset

___

### setError

▸ **setError**(`error`): `void`

Sets the error value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `error` | `unknown` | The error value to be set. |

#### Returns

`void`

#### Implementation of

Field.setError

___

### setTouched

▸ **setTouched**(): `void`

Marks the field as touched.

#### Returns

`void`

#### Implementation of

Field.setTouched

___

### setValue

▸ **setValue**(`value`): `void`

Sets the value of the field.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `unknown` | the value. |

#### Returns

`void`

#### Implementation of

Field.setValue

___

### validate

▸ **validate**(): `Promise`<`void`\>

Validates the field value.

#### Returns

`Promise`<`void`\>

#### Implementation of

Field.validate
