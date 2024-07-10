# Function: isUniqueKey()

> **isUniqueKey**(`value`, `store`, `args`?): [`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md) \| `Promise`\<[`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md)\>

## Parameters

• **value**: `string`

the component key.

• **store**: [`IStore`](../interfaces/IStore.md)

the form viewer settings.

• **args?**: `Record`\<`string`, `unknown`\>

## Returns

[`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md) \| `Promise`\<[`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md)\>

true if the component key is unique across the entire component tree.
