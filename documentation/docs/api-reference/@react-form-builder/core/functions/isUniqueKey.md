# Function: isUniqueKey()

> **isUniqueKey**(`value`, `store`, `args`?, `formData`?): [`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md) \| `Promise`\<[`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md)\>

Returns true if the component key is unique across the entire component tree. **Internal use only.**

## Parameters

• **value**: `string`

the component key.

• **store**: [`IStore`](../interfaces/IStore.md)

the form viewer settings.

• **args?**: `Record`\<`string`, `unknown`\>

• **formData?**: [`IFormData`](../interfaces/IFormData.md)

## Returns

[`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md) \| `Promise`\<[`RuleValidatorResult`](../type-aliases/RuleValidatorResult.md)\>

true if the component key is unique across the entire component tree.
