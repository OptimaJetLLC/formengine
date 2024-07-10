# Interface: Field

Field with the form data.

## Properties

### clear()

> **clear**: () => `void`

Clears the data in the field.

#### Returns

`void`

***

### dispose()

> **dispose**: () => `void`

Releases allocated resources, must be used when destroying an object instance.

#### Returns

`void`

***

### error?

> `optional` **error**: `string`

Contains a field validation error if the field data is not valid.

***

### errors?

> `optional` **errors**: `Record`\<`string`, `unknown`\>

Contains a field validation errors if the field provides multiple errors (i.e. field is template).

***

### getValidationResult()

> **getValidationResult**: () => `Promise`\<`ValidationMessages`\>

#### Returns

`Promise`\<`ValidationMessages`\>

the ValidationMessages validation results.

***

### init()

> **init**: () => `void`

Initializes the value of the field.

#### Returns

`void`

***

### reset()

> **reset**: () => `void`

Sets the field to its default value.

#### Returns

`void`

***

### setError()

> **setError**: (`error`) => `void`

Sets the error value.

#### Parameters

• **error**: `unknown`

The error value to be set.

#### Returns

`void`

***

### setTouched()

> **setTouched**: () => `void`

Marks the field as touched.

#### Returns

`void`

***

### setValue()

> **setValue**: (`value`) => `void`

Sets the value of the field.

#### Parameters

• **value**: `unknown`

the value.

#### Returns

`void`

***

### storeDataInParentForm?

> `optional` **storeDataInParentForm**: `boolean`

Flag, false if nested form data show as nested object, true otherwise.

***

### touched

> **touched**: `boolean`

Flag, true, if the field is marked as touched.

***

### validate()

> **validate**: () => `Promise`\<`void`\>

Validates the field value.

#### Returns

`Promise`\<`void`\>

***

### value

> **value**: `unknown`

Value of the field.

***

### valued

> **valued**: `string`

The name of the component property that contains the field value.
