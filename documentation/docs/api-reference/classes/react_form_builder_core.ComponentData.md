---
id: "react_form_builder_core.ComponentData"
title: "Class: ComponentData"
sidebar_label: "ComponentData"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ComponentData

This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.

## Implements

- [`IFormData`](../interfaces/react_form_builder_core.IFormData.md)

## Constructors

### constructor

• **new ComponentData**(`componentStore`, `model`, `field`, `childFactory`, `formValidators?`)

Constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component settings. |
| `model` | [`Model`](react_form_builder_core.Model.md)<`any`\> | the component metadata for the form viewer. |
| `field` | `undefined` \| [`Field`](../interfaces/react_form_builder_core.Field.md) | the field with the form data. |
| `childFactory` | (`componentStore`: [`ComponentStore`](react_form_builder_core.ComponentStore.md)) => [`ComponentData`](react_form_builder_core.ComponentData.md) | the factory function that creates [ComponentData](react_form_builder_core.ComponentData.md) instance. |
| `formValidators?` | [`FormValidators`](../modules/react_form_builder_core.md#formvalidators) | the array of functions that validate the form data. |

## Properties

### children

• **children**: [`ComponentData`](react_form_builder_core.ComponentData.md)[] = `[]`

The child nodes in the component data tree.

___

### field

• `Optional` `Readonly` **field**: [`Field`](../interfaces/react_form_builder_core.Field.md)

The field with the form data.

___

### id

• `Readonly` **id**: `string`

The unique identifier.

___

### model

• `Readonly` **model**: [`Model`](react_form_builder_core.Model.md)<`any`\>

The component metadata.

___

### parent

• `Optional` **parent**: [`ComponentData`](react_form_builder_core.ComponentData.md)

The parent node in the component data tree.

___

### store

• `Readonly` **store**: [`ComponentStore`](react_form_builder_core.ComponentStore.md)

The component settings.

___

### userDefinedProps

• `Optional` **userDefinedProps**: `Record`<`string`, `any`\>

User defined properties of the React component.

___

### validating

• **validating**: `boolean` = `false`

If true, then validation is in progress.

## Accessors

### data

• `get` **data**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

the Record with all the form data.

#### Implementation of

IFormData.data

___

### errors

• `get` **errors**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

the Record with all validation error messages.

#### Implementation of

IFormData.errors

___

### events

• `get` **events**(): [`ComponentDataEvents`](react_form_builder_core.ComponentDataEvents.md)

#### Returns

[`ComponentDataEvents`](react_form_builder_core.ComponentDataEvents.md)

the ComponentDataEvents object.

___

### fields

• `get` **fields**(): `Map`<`string`, [`Field`](../interfaces/react_form_builder_core.Field.md)\>

#### Returns

`Map`<`string`, [`Field`](../interfaces/react_form_builder_core.Field.md)\>

all the fields in the tree as a map. Starts from this node.

___

### fluentData

• `get` **fluentData**(): `Record`<`string`, `FluentVariable`\>

#### Returns

`Record`<`string`, `FluentVariable`\>

all the form data that is of the FluentVariable type.
Additionally, the keys of the returned object are converted to the snake case.

___

### hasErrors

• `get` **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

#### Returns

`boolean`

#### Implementation of

IFormData.hasErrors

___

### isRoot

• `get` **isRoot**(): `boolean`

#### Returns

`boolean`

true if it has no parent [ComponentData](react_form_builder_core.ComponentData.md), false otherwise.

___

### isValidating

• `get` **isValidating**(): `boolean`

If true, then validation is in progress.

#### Returns

`boolean`

#### Implementation of

IFormData.isValidating

___

### key

• `get` **key**(): `string`

#### Returns

`string`

the key of this node (same as the key of the ComponentStore).

___

### state

• `get` **state**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

A user-defined key-value observable storage. Utilize it to store and share any custom data.

#### Implementation of

IFormData.state

## Methods

### clear

▸ **clear**(): `void`

Clears the form data.

#### Returns

`void`

#### Implementation of

IFormData.clear

___

### delete

▸ **delete**(): `void`

Deletes this node from the tree.

#### Returns

`void`

___

### dispose

▸ **dispose**(): `void`

Dispose method that releases resources used by the object.
It disposes the field and all the children objects.

#### Returns

`void`

___

### findByKey

▸ **findByKey**(`key`): `undefined` \| [`ComponentData`](react_form_builder_core.ComponentData.md)

Find the node with the given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key to find. |

#### Returns

`undefined` \| [`ComponentData`](react_form_builder_core.ComponentData.md)

the node or undefined if not found.

___

### getValidationResult

▸ **getValidationResult**(): `Promise`<`undefined`\>

Returns the validation results without triggering an events and changing the state of the form.

#### Returns

`Promise`<`undefined`\>

the ValidationMessages validation results.

#### Implementation of

IFormData.getValidationResult

___

### insertAfterMe

▸ **insertAfterMe**(`inserted`): `void`

Inserts the given node after this node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inserted` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the node to insert. |

#### Returns

`void`

___

### insertBeforeMe

▸ **insertBeforeMe**(`inserted`): `void`

Inserts the given node before this node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inserted` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the node to insert. |

#### Returns

`void`

___

### reset

▸ **reset**(): `void`

Sets the form to its default value.

#### Returns

`void`

#### Implementation of

IFormData.reset

___

### setAllErrors

▸ **setAllErrors**(`message?`): `void`

Sets the validation error message for all form data fields.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `message?` | `string` | the validation error message. |

#### Returns

`void`

#### Implementation of

IFormData.setAllErrors

___

### setParent

▸ **setParent**(`newParent`): `void`

Sets the new parent for this node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newParent` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the new parent. |

#### Returns

`void`

___

### unifyKeys

▸ **unifyKeys**(`root`): `Map`<`string`, `string`\>

Assigns unique keys to the items in the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the root of the tree to unify keys. Defaults to the root of this tree. |

#### Returns

`Map`<`string`, `string`\>

the map of new keys to old keys.

___

### validate

▸ **validate**(): `Promise`<`void`\>

Validates the data in the form.

#### Returns

`Promise`<`void`\>

#### Implementation of

IFormData.validate
