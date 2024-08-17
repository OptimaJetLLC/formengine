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

> **validate**: () => `Promise`\<`void`\>

Validates the data in the form.

#### Returns

`Promise`\<`void`\>

## Accessors

### data

> `get` **data**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

the Record with all the form data.

***

### errors

> `get` **errors**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

the Record with all validation error messages.

***

### hasErrors

> `get` **hasErrors**(): `boolean`

true if the form contains errors, otherwise false.

#### Returns

`boolean`

***

### isValidating

> `get` **isValidating**(): `boolean`

If true, then validation is in progress.

#### Returns

`boolean`

***

### state

> `get` **state**(): `Record`\<`string`, `unknown`\>

#### Returns

`Record`\<`string`, `unknown`\>

A user-defined key-value observable storage. Utilize it to store and share any custom data.
