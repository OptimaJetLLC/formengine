# Class: ComponentData

This tree of elements contains the data required to display the component. It is synchronized with the ComponentStore tree.

## Implements

- [`IFormData`](../interfaces/IFormData.md)

## Constructors

### Constructor

> **new ComponentData**(`componentStore`, `model`, `childFactory`, `getFormValidationResult?`): `ComponentData`

Constructor.

#### Parameters

##### componentStore

[`ComponentStore`](ComponentStore.md)

the component settings.

##### model

[`Model`](Model.md)

the component metadata for the form viewer.

##### childFactory

(`componentStore`) => `ComponentData`

the factory function that creates ComponentData instance.

##### getFormValidationResult?

() => `Promise`\<`Record`\<`string`, `string`\>[]\>

the function that returns a form validation results.

#### Returns

`ComponentData`

## Properties

### children

> **children**: `ComponentData`[] = `[]`

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

> `optional` **field**: [`Field`](../interfaces/Field.md)

The field with the form data.

***

### getInitialData()?

> `optional` **getInitialData**: () => `unknown`

The function for getting initial data. **Internal use only.**

#### Returns

`unknown`

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

> `readonly` **model**: [`Model`](Model.md)

The component metadata.

***

### parent?

> `optional` **parent**: `ComponentData`

The parent node in the component data tree.

***

### setInitialData?

> `optional` **setInitialData**: [`SetInitialDataFn`](../type-aliases/SetInitialDataFn.md)

The function for updating initial data. **Internal use only.**

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

### allChildren

#### Get Signature

> **get** **allChildren**(): `ComponentData`[]

##### Returns

`ComponentData`[]

an array of all children components.

***

### allComponentFields

#### Get Signature

> **get** **allComponentFields**(): [`ComponentField`](../interfaces/ComponentField.md)[]

##### Returns

[`ComponentField`](../interfaces/ComponentField.md)[]

an array of all component fields, including non-unique data keys.

***

### allFields

#### Get Signature

> **get** **allFields**(): [`Field`](../interfaces/Field.md)[]

##### Returns

[`Field`](../interfaces/Field.md)[]

an array of all fields, including non-unique data keys.

***

### data

#### Get Signature

> **get** **data**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the Record with all the form data.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`data`](../interfaces/IFormData.md#data)

***

### dataRoot

#### Get Signature

> **get** **dataRoot**(): `ComponentData`

##### Returns

`ComponentData`

the root component for the data in the component tree.

***

### errors

#### Get Signature

> **get** **errors**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the Record with all validation error messages.

#### Set Signature

> **set** **errors**(`errors`): `void`

Sets the form error messages.

##### Parameters

###### errors

`Record`\<`string`, `unknown`\>

##### Returns

`void`

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

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

##### Returns

`boolean`

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`hasErrors`](../interfaces/IFormData.md#haserrors)

***

### initialData

#### Get Signature

> **get** **initialData**(): `unknown`

##### Returns

`unknown`

the initial data.

***

### isRoot

#### Get Signature

> **get** **isRoot**(): `boolean`

##### Returns

`boolean`

true if it has no parent ComponentData, false otherwise.

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

> **get** **root**(): `ComponentData`

##### Returns

`ComponentData`

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

> **clear**(`clearInitialData`): `void`

#### Parameters

##### clearInitialData

`boolean` = `true`

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

> **findByKey**(`key`): `undefined` \| `ComponentData`

Find the node with the given key.

#### Parameters

##### key

`string`

the key to find.

#### Returns

`undefined` \| `ComponentData`

the node or undefined if not found.

***

### generatedData()

> **generatedData**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

the generated form data.

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

##### inserted

`ComponentData`

the node to insert.

#### Returns

`void`

***

### insertBeforeMe()

> **insertBeforeMe**(`inserted`): `void`

Inserts the given node before this node.

#### Parameters

##### inserted

`ComponentData`

the node to insert.

#### Returns

`void`

***

### reset()

> **reset**(`clearInitialData`): `void`

#### Parameters

##### clearInitialData

`boolean` = `true`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`reset`](../interfaces/IFormData.md#reset)

***

### setAllErrors()

> **setAllErrors**(`message?`): `void`

#### Parameters

##### message?

`string`

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

##### newParent

`ComponentData`

the new parent.

#### Returns

`void`

***

### unifyKeys()

> **unifyKeys**(`root`): `Map`\<`string`, `string`\>

Assigns unique keys to the items in the tree.

#### Parameters

##### root

`ComponentData`

the root of the tree to unify keys. Defaults to the root of this tree.

#### Returns

`Map`\<`string`, `string`\>

the map of new keys to old keys.

***

### unifyTree()

> **unifyTree**(): `void`

Assigns unique keys to the items in the tree.

#### Returns

`void`

***

### updateInitialData()

> **updateInitialData**(`key`, `value`): `void`

Updates the initial data. **Internal use only.**

#### Parameters

##### key

the initial data key.

`string` | `number`

##### value

`unknown`

the initial data value.

#### Returns

`void`

***

### validate()

> **validate**(): `Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

#### Returns

`Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

the [ValidationMessages](../type-aliases/ValidationMessages.md) validation results.

#### Implementation of

[`IFormData`](../interfaces/IFormData.md).[`validate`](../interfaces/IFormData.md#validate)
