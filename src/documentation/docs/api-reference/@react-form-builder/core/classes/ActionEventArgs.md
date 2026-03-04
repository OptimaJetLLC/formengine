# Class: ActionEventArgs

Arguments passed to the event handler.

## Constructors

### Constructor

> **new ActionEventArgs**(`type`, `sender`, `store`, `args`, `renderedProps`, `cellInfo?`): `ActionEventArgs`

Creates arguments for the event handler.

#### Parameters

##### type

`string`

the event type.

##### sender

[`ComponentData`](ComponentData.md)

the component that triggered the event.

##### store

[`Store`](Store.md)

the form viewer settings.

##### args

`any`[]

the event arguments.

##### renderedProps

`Record`\<`string`, `any`\>

the component properties that were used to render the sender component.

##### cellInfo?

[`CellInfo`](../type-aliases/CellInfo.md)

the information about the current table cell.

#### Returns

`ActionEventArgs`

## Properties

### args

> `readonly` **args**: `any`[]

the event arguments.

***

### cellInfo?

> `readonly` `optional` **cellInfo**: [`CellInfo`](../type-aliases/CellInfo.md)

the information about the current table cell.

***

### index?

> `readonly` `optional` **index**: `number`

The index of the component in the array, if the component is in the array.

***

### renderedProps

> `readonly` **renderedProps**: `Record`\<`string`, `any`\>

the component properties that were used to render the sender component.

***

### sender

> `readonly` **sender**: [`ComponentData`](ComponentData.md)

the component that triggered the event.

***

### store

> `readonly` **store**: [`Store`](Store.md)

the form viewer settings.

***

### type

> `readonly` **type**: `string`

the event type.

***

### userContext?

> `readonly` `optional` **userContext**: `unknown`

The user-defined context passed from the form viewer props.

## Accessors

### data

#### Get Signature

> **get** **data**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the object for reading and changing form data.

***

### event

#### Get Signature

> **get** **event**(): `null` \| `SyntheticEvent`\<`Element`, `Event`\>

##### Returns

`null` \| `SyntheticEvent`\<`Element`, `Event`\>

the event handled by the event handler.

***

### parentData

#### Get Signature

> **get** **parentData**(): `Record`\<`string`, `unknown`\> \| `undefined`

##### Returns

`Record`\<`string`, `unknown`\> \| `undefined`

the object to read and modify parent data (available for array elements).

***

### rootData

#### Get Signature

> **get** **rootData**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the object to read and modify root form data.

***

### userDefinedProps

#### Get Signature

> **get** **userDefinedProps**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

user-defined properties for the React component that override other properties of the component.

***

### value

#### Get Signature

> **get** **value**(): `any`

##### Returns

`any`

the first element of the event argument array, which is treated as a value.

## Methods

### setUserDefinedProps()

> **setUserDefinedProps**(`props?`): `void`

Sets user-defined properties for the React component that override other properties of the component.

#### Parameters

##### props?

`Record`\<`string`, `any`\>

the component properties.

#### Returns

`void`
