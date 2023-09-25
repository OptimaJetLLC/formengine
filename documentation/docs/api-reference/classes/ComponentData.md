---
id: "ComponentData"
title: "Class: ComponentData"
sidebar_label: "ComponentData"
sidebar_position: 0
custom_edit_url: null
---

This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.

## Implements

- [`IFormData`](../interfaces/IFormData.md)

## Constructors

### constructor

• **new ComponentData**(`componentStore`, `model`, `field`, `childFactory`)

Constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `componentStore` | [`ComponentStore`](ComponentStore.md) | the component settings. |
| `model` | [`Model`](Model.md)<`any`\> | the component metadata for the form viewer. |
| `field` | `undefined` \| [`Field`](../interfaces/Field.md) | the field with the form data. |
| `childFactory` | (`componentStore`: [`ComponentStore`](ComponentStore.md)) => [`ComponentData`](ComponentData.md) | the factory function that creates [ComponentData](ComponentData.md) instance. |

## Properties

### #disposers

• `Private` **#disposers**: `IReactionDisposer`[]

___

### #events

• `Private` `Optional` **#events**: [`ComponentDataEvents`](ComponentDataEvents.md)

___

### children

• **children**: [`ComponentData`](ComponentData.md)[] = `[]`

___

### field

• `Optional` `Readonly` **field**: [`Field`](../interfaces/Field.md)

___

### id

• `Readonly` **id**: `string`

___

### model

• `Readonly` **model**: [`Model`](Model.md)<`any`\>

___

### parent

• `Optional` **parent**: [`ComponentData`](ComponentData.md)

___

### store

• `Readonly` **store**: [`ComponentStore`](ComponentStore.md)

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

• `get` **events**(): [`ComponentDataEvents`](ComponentDataEvents.md)

#### Returns

[`ComponentDataEvents`](ComponentDataEvents.md)

the ComponentDataEvents object.

___

### fields

• `get` **fields**(): `Map`<`string`, [`Field`](../interfaces/Field.md)\>

#### Returns

`Map`<`string`, [`Field`](../interfaces/Field.md)\>

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

true if it has no parent [ComponentData](ComponentData.md), false otherwise.

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

## Methods

### addChild

▸ `Private` **addChild**(`newChild`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `newChild` | [`ComponentData`](ComponentData.md) |

#### Returns

`void`

___

### clear

▸ **clear**(): `void`

Clears the form data.

#### Returns

`void`

#### Implementation of

IFormData.clear

___

### collectAllFields

▸ `Private` **collectAllFields**(`acc`): `Map`<`string`, [`Field`](../interfaces/Field.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `acc` | `Map`<`string`, [`Field`](../interfaces/Field.md)\> |

#### Returns

`Map`<`string`, [`Field`](../interfaces/Field.md)\>

___

### collectAllNodesAsArray

▸ `Private` **collectAllNodesAsArray**(`acc`): [`ComponentData`](ComponentData.md)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `acc` | [`ComponentData`](ComponentData.md)[] |

#### Returns

[`ComponentData`](ComponentData.md)[]

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

### disposeNodes

▸ `Private` **disposeNodes**(`nodes`): `void`

Disposes the nodes by calling the disposers, disposing the field,
and resetting the parent and children properties to undefined and an empty array, respectively.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nodes` | [`ComponentData`](ComponentData.md)[] | the array of ComponentData objects representing the nodes to dispose. |

#### Returns

`void`

___

### findByKey

▸ **findByKey**(`key`): `undefined` \| [`ComponentData`](ComponentData.md)

Find the node with the given key.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the key to find. |

#### Returns

`undefined` \| [`ComponentData`](ComponentData.md)

the node or undefined if not found.

___

### insertAfterMe

▸ **insertAfterMe**(`inserted`): `void`

Inserts the given node after this node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inserted` | [`ComponentData`](ComponentData.md) | the node to insert. |

#### Returns

`void`

___

### insertBeforeMe

▸ **insertBeforeMe**(`inserted`): `void`

Inserts the given node before this node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `inserted` | [`ComponentData`](ComponentData.md) | the node to insert. |

#### Returns

`void`

___

### invokeOnAfterKeyChanged

▸ `Private` **invokeOnAfterKeyChanged**(`node`, `eventArgs`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | [`ComponentData`](ComponentData.md) |
| `eventArgs` | [`ComponentKeyChangedEventArgs`](ComponentKeyChangedEventArgs.md) |

#### Returns

`void`

___

### invokeOnBeforeDeleted

▸ `Private` **invokeOnBeforeDeleted**(`nodes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | [`ComponentData`](ComponentData.md)[] |

#### Returns

`void`

___

### removeChild

▸ `Private` **removeChild**(`oldChild`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldChild` | [`ComponentData`](ComponentData.md) |

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
| `newParent` | [`ComponentData`](ComponentData.md) | the new parent. |

#### Returns

`void`

___

### unifyKeys

▸ **unifyKeys**(`root`): `Map`<`string`, `string`\>

Assigns unique keys to the items in the tree.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`ComponentData`](ComponentData.md) | the root of the tree to unify keys. Defaults to the root of this tree. |

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
