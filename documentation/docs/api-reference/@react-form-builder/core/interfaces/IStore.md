# Interface: IStore

The form viewer settings interface.

## Properties

### dispose()

> **dispose**: () => `void`

Correctly clears allocated resources, the function must be called when destroying an instance of the class.

#### Returns

`void`

***

### form

> **form**: [`Form`](../classes/Form.md)

The displayed form.

***

### localizeErrorMessages()

> **localizeErrorMessages**: (`componentStore`, `validationResults`?) => `undefined` \| `string`

#### Parameters

• **componentStore**: [`ComponentStore`](../classes/ComponentStore.md)

the component settings.

• **validationResults?**: [`ValidationResult`](../type-aliases/ValidationResult.md)[]

the results of the validation.

#### Returns

`undefined` \| `string`

the result of localization or undefined.

***

### reduceScreen()

> **reduceScreen**: \<`T`\>(`callback`, `initialValue`) => `T`

#### Type Parameters

• **T**

the return value type.

#### Parameters

• **callback**

the function that calculates the value for the accumulator.

• **initialValue**: `T`

the initial value for the accumulator.

#### Returns

`T`

the accumulated value.

## Accessors

### initialDataSlice

> `get` **initialDataSlice**(): `undefined` \| `Record`\<`string`, `unknown`\>

#### Returns

`undefined` \| `Record`\<`string`, `unknown`\>

the slice of the initial data in accordance with the Store hierarchy. **Internal use only.**
