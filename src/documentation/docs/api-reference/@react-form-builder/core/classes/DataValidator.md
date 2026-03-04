# Class: DataValidator

Binds all parts of the validation and performs the validation.

## Methods

### getValidationResult()

> **getValidationResult**(`value`): `Promise`\<`string`[] \| `undefined`\>

Returns the validation results without triggering an events and changing the state of the form.

#### Parameters

##### value

`any`

the validated value.

#### Returns

`Promise`\<`string`[] \| `undefined`\>

the validation results.

***

### sendValidationEvent()

> **sendValidationEvent**(`value`): `void`

Generates an event to perform validation.

#### Parameters

##### value

`any`

the validated value.

#### Returns

`void`

***

### validate()

> **validate**(`value`): `Promise`\<`string` \| `undefined`\>

Performs a validation of the value.

#### Parameters

##### value

`any`

the validated value.

#### Returns

`Promise`\<`string` \| `undefined`\>

the Promise with the result of the validation.

***

### create()

> `static` **create**\<`T`\>(`store`, `getFormData`, `resolver`, `args`, `setter`, `localizer?`): `DataValidator`

Creates a DataValidator instance.

#### Type Parameters

##### T

`T`

the validation function factory arguments.

#### Parameters

##### store

[`IStore`](../interfaces/IStore.md)

the form viewer settings.

##### getFormData

() => [`IFormData`](../interfaces/IFormData.md)

the function that returns a form data.

##### resolver

[`SchemaResolver`](../type-aliases/SchemaResolver.md)\<`T`\>

the validation function factory.

##### args

`T`

the validation function factory arguments.

##### setter

[`Setter`](../type-aliases/Setter.md)\<`string` \| `undefined`\>

the callback function called to set a validation error.

##### localizer?

[`ErrorMessageLocalizer`](../type-aliases/ErrorMessageLocalizer.md)

the function that localizes validation error messages.

#### Returns

`DataValidator`

the DataValidator instance.
