---
id: "TemplateField"
title: "Class: TemplateField"
sidebar_label: "TemplateField"
sidebar_position: 0
custom_edit_url: null
---

The field with the form data, contains the value of the nested form.

## Implements

- [`Field`](../interfaces/Field.md)

## Constructors

### constructor

• **new TemplateField**(`componentStore`, `viewerStore`)

Creates the nested form field with form data for the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](ComponentStore.md) | the component settings. |
| `viewerStore` | [`IStore`](../interfaces/IStore.md) | viewerStore the form viewer settings. |

## Properties

### componentStore

• `Readonly` **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

___

### touched

• **touched**: `boolean` = `false`

Flag, true, if the field is marked as touched.

#### Implementation of

[Field](../interfaces/Field.md).[touched](../interfaces/Field.md#touched)

___

### valued

• **valued**: `string` = `''`

The name of the component property that contains the field value.

#### Implementation of

[Field](../interfaces/Field.md).[valued](../interfaces/Field.md#valued)

___

### viewerStore

• `Readonly` **viewerStore**: [`IStore`](../interfaces/IStore.md)

viewerStore the form viewer settings.

## Accessors

### form

• `get` **form**(): [`ComponentData`](ComponentData.md)

#### Returns

[`ComponentData`](ComponentData.md)

the form for the field.

___

### storeDataInParentForm

• `get` **storeDataInParentForm**(): `any`

Flag, false if nested form data show as nested object, true otherwise.

#### Returns

`any`

#### Implementation of

[Field](../interfaces/Field.md).[storeDataInParentForm](../interfaces/Field.md#storedatainparentform)

___

### value

• `get` **value**(): `unknown`

Value of the field.

#### Returns

`unknown`

#### Implementation of

[Field](../interfaces/Field.md).[value](../interfaces/Field.md#value)

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
