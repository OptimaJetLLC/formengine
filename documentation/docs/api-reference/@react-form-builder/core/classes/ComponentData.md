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

### componentState

> **componentState**: [`IComponentState`](../interfaces/IComponentState.md) = `defaultComponentState`

The state of the component. **Internal use only.

***

### dataRootProvider?

> `optional` **dataRootProvider**: [`IDataRootProvider`](../interfaces/IDataRootProvider.md)

Specifies the root component for the data in the component tree. **Internal use only.**

***

### field?

> `readonly` `optional` **field**: [`Field`](../interfaces/Field.md)

The field with the form data.

***

### id

> `readonly` **id**: `string`

The unique identifier.

***

### index?

> `optional` **index**: `number`

Specifies the index in the array if the component is in the component array.
This is not an index in a parent-child structure.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`index`](../interfaces/IFormData.md#index)

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

#### Get Signature

> **get** **data**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the Record with all the form data.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`data`](../interfaces/IFormData.md#data)

***

### errors

#### Get Signature

> **get** **errors**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the Record with all validation error messages.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`errors`](../interfaces/IFormData.md#errors)

***

### events

#### Get Signature

> **get** **events**(): [`ComponentDataEvents`](ComponentDataEvents.md)

##### Returns

[`ComponentDataEvents`](ComponentDataEvents.md)

the ComponentDataEvents object.

***

### fields

#### Get Signature

> **get** **fields**(): `Map`\<`string`, [`Field`](../interfaces/Field.md)\>

##### Returns

`Map`\<`string`, [`Field`](../interfaces/Field.md)\>

all the fields in the tree as a map. Starts from this node.

***

### fluentData

#### Get Signature

> **get** **fluentData**(): `Record`\<`string`, `FluentVariable`\>

##### Returns

`Record`\<`string`, `FluentVariable`\>

all the form data that is of the FluentVariable type.
Additionally, the keys of the returned object are converted to the snake case.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`fluentData`](../interfaces/IFormData.md#fluentdata)

***

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

##### Returns

`boolean`

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`hasErrors`](../interfaces/IFormData.md#haserrors)

***

### isRoot

#### Get Signature

> **get** **isRoot**(): `boolean`

##### Returns

`boolean`

true if it has no parent [ComponentData](ComponentData.md), false otherwise.

***

### isValidating

#### Get Signature

> **get** **isValidating**(): `boolean`

If true, then validation is in progress.

##### Returns

`boolean`

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`isValidating`](../interfaces/IFormData.md#isvalidating)

***

### key

#### Get Signature

> **get** **key**(): `string`

##### Returns

`string`

the key of this node (same as the key of the ComponentStore).

***

### nearestIndex

#### Get Signature

> **get** **nearestIndex**(): `undefined` \| `number`

##### Returns

`undefined` \| `number`

the index in the array if the component is in the component array
(looks for the nearest index in the component hierarchy).

***

### parentData

#### Get Signature

> **get** **parentData**(): `undefined` \| `Record`\<`string`, `unknown`\>

##### Returns

`undefined` \| `Record`\<`string`, `unknown`\>

the object to read and modify parent data (available for array elements).

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`parentData`](../interfaces/IFormData.md#parentdata)

***

### root

#### Get Signature

> **get** **root**(): [`ComponentData`](ComponentData.md)

##### Returns

[`ComponentData`](ComponentData.md)

the root of the component tree.

***

### rootData

#### Get Signature

> **get** **rootData**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the object to read and modify root form data.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`rootData`](../interfaces/IFormData.md#rootdata)

***

### state

#### Get Signature

> **get** **state**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

A user-defined key-value observable storage. Utilize it to store and share any custom data.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`state`](../interfaces/IFormData.md#state)

## Methods

### clear()

> **clear**(): `void`

Clears the form data.

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

Returns the validation results without triggering an events and changing the state of the form.

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

Sets the form to its default value.

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`reset`](../interfaces/IFormData.md#reset)

***

### setAllErrors()

> **setAllErrors**(`message`?): `void`

Sets the validation error message for all form data fields.

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

> **validate**(): `Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

Validates the data in the form.

#### Returns

`Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

the [ValidationMessages](../type-aliases/ValidationMessages.md) validation results.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`validate`](../interfaces/IFormData.md#validate)
