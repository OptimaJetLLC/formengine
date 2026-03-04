# Interface: IFormData

The interface for accessing the form data.

## Properties

### clear()

> **clear**: (`clearInitialData?`) => `void`

Clears the form data.

#### Parameters

##### clearInitialData?

`boolean`

if true, then also clear the initial data.

#### Returns

`void`

#### Default

```ts
true
```

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

> **reset**: (`clearInitialData?`) => `void`

Sets the form to its default value.

#### Parameters

##### clearInitialData?

`boolean`

if true, then also clear the initial data.

#### Returns

`void`

#### Default

```ts
true
```

***

### setAllErrors()

> **setAllErrors**: (`message?`) => `void`

Sets the validation error message for all form data fields.

#### Parameters

##### message?

`string`

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

#### Set Signature

> **set** **errors**(`errors`): `void`

Sets the form error messages.

##### Parameters

###### errors

`Record`\<`string`, `unknown`\>

##### Returns

`void`

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

### state

#### Get Signature

> **get** **state**(): `Record`\<`string`, `unknown`\>

##### Returns

`Record`\<`string`, `unknown`\>

A user-defined key-value observable storage. Utilize it to store and share any custom data.

#### Set Signature

> **set** **state**(`state`): `void`

Sets state object.

##### Parameters

###### state

`Record`\<`string`, `unknown`\>

##### Returns

`void`
