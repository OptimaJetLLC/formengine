# Interface: IFormData

The interface for accessing the form data.

## Properties

### clear()

> **clear**: () => `void`

Clears the form data.

#### Returns

`void`

***

### getValidationResult()

> **getValidationResult**: () => `Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

Returns the validation results without triggering an events and changing the state of the form.

#### Returns

`Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

the [ValidationMessages](../type-aliases/ValidationMessages.md) validation results.

***

### index?

> `optional` **index**: `number`

#### Returns

the index in the array if the component is in the component array.

***

### reset()

> **reset**: () => `void`

Sets the form to its default value.

#### Returns

`void`

***

### setAllErrors()

> **setAllErrors**: (`message`?) => `void`

Sets the validation error message for all form data fields.

#### Parameters

• **message?**: `string`

the validation error message.

#### Returns

`void`

***

### validate()

> **validate**: () => `Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

Validates the data in the form.

#### Returns

`Promise`\<[`ValidationMessages`](../type-aliases/ValidationMessages.md)\>

the [ValidationMessages](../type-aliases/ValidationMessages.md) validation results.

## Accessors

### data

#### Get Signature

> **get** **data**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the Record with all the form data.

***

### errors

#### Get Signature

> **get** **errors**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the Record with all validation error messages.

***

### fluentData

#### Get Signature

> **get** **fluentData**(): `Record`\<`string`, `FluentVariable`\>

##### Returns

`Record`\<`string`, `FluentVariable`\>

all the form data that is of the FluentVariable type.
Additionally, the keys of the returned object are converted to the snake case.

***

### hasErrors

#### Get Signature

> **get** **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

##### Returns

`boolean`

***

### isValidating

#### Get Signature

> **get** **isValidating**(): `boolean`

If true, then validation is in progress.

##### Returns

`boolean`

***

### parentData

#### Get Signature

> **get** **parentData**(): `undefined` \| `Record`\<`string`, `unknown`\>

##### Returns

`undefined` \| `Record`\<`string`, `unknown`\>

the object to read and modify parent data (available for array elements).

***

### rootData

#### Get Signature

> **get** **rootData**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

the object to read and modify root form data.

***

### state

#### Get Signature

> **get** **state**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

A user-defined key-value observable storage. Utilize it to store and share any custom data.
