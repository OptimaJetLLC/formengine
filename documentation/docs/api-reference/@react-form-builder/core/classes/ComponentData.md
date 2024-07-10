# Class: ComponentData

This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.

## Implements

- [`IFormData`](../interfaces/IFormData.md)

## Constructors

### new ComponentData()

> **new ComponentData**(`componentStore`, `model`, `field`, `childFactory`, `formValidators`?): [`ComponentData`](ComponentData.md)

Constructor.

#### Parameters

• **componentStore**: [`ComponentStore`](ComponentStore.md)

the component settings.

• **model**: [`Model`](Model.md)\<`any`\>

the component metadata for the form viewer.

• **field**: `undefined` \| [`Field`](../interfaces/Field.md)

the field with the form data.

• **childFactory**

the factory function that creates [ComponentData](ComponentData.md) instance.

• **formValidators?**: [`FormValidators`](../type-aliases/FormValidators.md)

the array of functions that validate the form data.

#### Returns

[`ComponentData`](ComponentData.md)

## Properties

### children

> **children**: [`ComponentData`](ComponentData.md)[] = `[]`

The child nodes in the component data tree.

***

### field?

> `readonly` `optional` **field**: [`Field`](../interfaces/Field.md)

The field with the form data.

***

### id

> `readonly` **id**: `string`

The unique identifier.

***

### model

> `readonly` **model**: [`Model`](Model.md)\<`any`\>

The component metadata.

***

### parent?

> `optional` **parent**: [`ComponentData`](ComponentData.md)

The parent node in the component data tree.

***

### store

> `readonly` **store**: [`ComponentStore`](ComponentStore.md)

The component settings.

***

### userDefinedProps?

> `optional` **userDefinedProps**: `Record`\<`string`, `any`\>

User defined properties of the React component.

***

### validating

> **validating**: `boolean` = `false`

If true, then validation is in progress.

## Accessors

### data

> `get` **data**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

the Record with all the form data.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`data`](../interfaces/IFormData.md#data)

***

### errors

> `get` **errors**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

the Record with all validation error messages.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`errors`](../interfaces/IFormData.md#errors)

***

### events

> `get` **events**(): [`ComponentDataEvents`](ComponentDataEvents.md)

#### Returns

[`ComponentDataEvents`](ComponentDataEvents.md)

the ComponentDataEvents object.

***

### fields

> `get` **fields**(): `Map`\<`string`, [`Field`](../interfaces/Field.md)\>

#### Returns

`Map`\<`string`, [`Field`](../interfaces/Field.md)\>

all the fields in the tree as a map. Starts from this node.

***

### fluentData

> `get` **fluentData**(): `Record`\<`string`, `FluentVariable`\>

#### Returns

`Record`\<`string`, `FluentVariable`\>

all the form data that is of the FluentVariable type.
Additionally, the keys of the returned object are converted to the snake case.

***

### hasErrors

> `get` **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

#### Returns

`boolean`

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`hasErrors`](../interfaces/IFormData.md#haserrors)

***

### isRoot

> `get` **isRoot**(): `boolean`

#### Returns

`boolean`

true if it has no parent [ComponentData](ComponentData.md), false otherwise.

***

### isValidating

> `get` **isValidating**(): `boolean`

If true, then validation is in progress.

#### Returns

`boolean`

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`isValidating`](../interfaces/IFormData.md#isvalidating)

***

### key

> `get` **key**(): `string`

#### Returns

`string`

the key of this node (same as the key of the ComponentStore).

***

### state

> `get` **state**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

A user-defined key-value observable storage. Utilize it to store and share any custom data.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`state`](../interfaces/IFormData.md#state)

## Methods

### clear()

> **clear**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`clear`](../interfaces/IFormData.md#clear)

***

### delete()

> **delete**(): `void`

Deletes this node from the tree.

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Dispose method that releases resources used by the object.
It disposes the field and all the children objects.

#### Returns

`void`

***

### findByKey()

> **findByKey**(`key`): `undefined` \| [`ComponentData`](ComponentData.md)

Find the node with the given key.

#### Parameters

• **key**: `string`

the key to find.

#### Returns

`undefined` \| [`ComponentData`](ComponentData.md)

the node or undefined if not found.

***

### getValidationResult()

> **getValidationResult**(): `Promise`\<`undefined`\>

#### Returns

`Promise`\<`undefined`\>

the [ValidationMessages](../type-aliases/ValidationMessages.md) validation results.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`getValidationResult`](../interfaces/IFormData.md#getvalidationresult)

***

### insertAfterMe()

> **insertAfterMe**(`inserted`): `void`

Inserts the given node after this node.

#### Parameters

• **inserted**: [`ComponentData`](ComponentData.md)

the node to insert.

#### Returns

`void`

***

### insertBeforeMe()

> **insertBeforeMe**(`inserted`): `void`

Inserts the given node before this node.

#### Parameters

• **inserted**: [`ComponentData`](ComponentData.md)

the node to insert.

#### Returns

`void`

***

### reset()

> **reset**(): `void`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`reset`](../interfaces/IFormData.md#reset)

***

### setAllErrors()

> **setAllErrors**(`message`?): `void`

#### Parameters

• **message?**: `string`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`setAllErrors`](../interfaces/IFormData.md#setallerrors)

***

### setParent()

> **setParent**(`newParent`): `void`

Sets the new parent for this node.

#### Parameters

• **newParent**: [`ComponentData`](ComponentData.md)

the new parent.

#### Returns

`void`

***

### unifyKeys()

> **unifyKeys**(`root`): `Map`\<`string`, `string`\>

Assigns unique keys to the items in the tree.

#### Parameters

• **root**: [`ComponentData`](ComponentData.md)

the root of the tree to unify keys. Defaults to the root of this tree.

#### Returns

`Map`\<`string`, `string`\>

the map of new keys to old keys.

***

### validate()

> **validate**(): `Promise`\<`void`\>

#### Returns

`Promise`\<`void`\>

#### Inherit Doc

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`validate`](../interfaces/IFormData.md#validate)
