# Type Alias: RuleValidator()\<T\>

> **RuleValidator**\<`T`\>: (`value`, `store`, `args`?) => [`RuleValidatorResult`](RuleValidatorResult.md) \| `Promise`\<[`RuleValidatorResult`](RuleValidatorResult.md)\>

The function that checks the value and returns the result of the rule validation, see [RuleValidatorResult](RuleValidatorResult.md).

## Type Parameters

• **T** = `any`

the value type.

## Parameters

• **value**: `T`

the value.

• **store**: [`IStore`](../interfaces/IStore.md)

the form viewer settings

• **args?**: `Record`\<`string`, `unknown`\>

the rule arguments.

## Returns

[`RuleValidatorResult`](RuleValidatorResult.md) \| `Promise`\<[`RuleValidatorResult`](RuleValidatorResult.md)\>
