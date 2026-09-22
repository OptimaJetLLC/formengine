# Interface: IStore

The form viewer settings interface.

## Properties

### dispose

> **dispose**: () => `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

#### Returns

`void`

***

### form

> **form**: [`Form`](../classes/Form.md)

The displayed form.

***

### reduceScreen

> **reduceScreen**: \<`T`\>(`callback`, `initialValue`) => `T`

Performs the callback function on each element of the component tree, accumulates the return values.

#### Type Parameters

##### T

`T`

the return value type.

#### Parameters

##### callback

(`accumulator`, `current`) => `T`

the function that calculates the value for the accumulator.

##### initialValue

`T`

the initial value for the accumulator.

#### Returns

`T`

the accumulated value.

## Accessors

### initialDataSlice

#### Get Signature

> **get** **initialDataSlice**(): `unknown`

##### Returns

`unknown`

the slice of the initial data in accordance with the Store hierarchy. **Internal use only.**

***

### showAllValidationErrors

#### Get Signature

> **get** **showAllValidationErrors**(): `boolean` \| `undefined`

##### Returns

`boolean` \| `undefined`

true if all validation errors are to be displayed, false otherwise.

## Methods

### localizeComponent()

> **localizeComponent**(`type`, `formData`, `componentStore`): `Record`\<`string`, `unknown`\>

Localizes a component store based on the given localization type. If a custom localizer is available, it will be used.

#### Parameters

##### type

`string`

the type of localization.

##### formData

[`IFormData`](IFormData.md)

the form data.

##### componentStore

[`ComponentStore`](../classes/ComponentStore.md)

the component settings.

#### Returns

`Record`\<`string`, `unknown`\>

the Record with the localized properties.

***

### localizeErrorMessages()

> **localizeErrorMessages**(`formData`, `componentStore`, `validationResults?`): `string`[] \| `undefined`

The function to localize the validation error message.

#### Parameters

##### formData

[`IFormData`](IFormData.md)

the form data.

##### componentStore

[`ComponentStore`](../classes/ComponentStore.md)

the component settings.

##### validationResults?

[`ValidationResult`](../type-aliases/ValidationResult.md)[]

the results of the validation.

#### Returns

`string`[] \| `undefined`

the result of localization or undefined.
