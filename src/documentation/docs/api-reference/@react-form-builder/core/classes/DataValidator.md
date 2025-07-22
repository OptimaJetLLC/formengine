# Class: DataValidator

Binds all parts of the validation and performs the validation.

## Methods

### getValidationResult()

> **getValidationResult**(`value`): `Promise`\<`undefined` \| [`ValidationResult`](../type-aliases/ValidationResult.md)[]\>

Returns the validation results without triggering an events and changing the state of the form.

#### Parameters

• **value**: `any`

the validated value.

#### Returns

`Promise`\<`undefined` \| [`ValidationResult`](../type-aliases/ValidationResult.md)[]\>

the validation results.

***

### sendValidationEvent()

> **sendValidationEvent**(`value`): `void`

Generates an event to perform validation.

#### Parameters

• **value**: `any`

the validated value.

#### Returns

`void`

***

### validate()

> **validate**(`value`): `Promise`\<`undefined` \| `string`\>

Performs a validation of the value.

#### Parameters

• **value**: `any`

the validated value.

#### Returns

`Promise`\<`undefined` \| `string`\>

the Promise with the result of the validation.

***

### create()

> `static` **create**\<`T`\>(`store`, `getFormData`, `resolver`, `args`, `setter`, `localizer`?): [`DataValidator`](DataValidator.md)

Creates a DataValidator instance.

#### Type Parameters

• **T**

the validation function factory arguments.

#### Parameters

• **store**: [`IStore`](../interfaces/IStore.md)

the form viewer settings.

• **getFormData**

the function that returns a form data.

• **resolver**: [`SchemaResolver`](../type-aliases/SchemaResolver.md)\<`T`\>

the validation function factory.

• **args**: `T`

the validation function factory arguments.

• **setter**: [`Setter`](../type-aliases/Setter.md)\<`undefined` \| `string`\>

the callback function called to set a validation error.

• **localizer?**: [`ErrorMessageLocalizer`](../type-aliases/ErrorMessageLocalizer.md)

the function that localizes validation error messages.

#### Returns

[`DataValidator`](DataValidator.md)

the DataValidator instance.
