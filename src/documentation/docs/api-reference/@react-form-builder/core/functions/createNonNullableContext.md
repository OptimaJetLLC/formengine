# Function: createNonNullableContext()

> **createNonNullableContext**\<`T`\>(`name`, `defaultValue`): [() => `T`, `Provider`\<`T`\>, `Context`\<`T` \| `null`\>]

Creates non-nullable React context. **Internal use only.**

## Type Parameters

• **T**

## Parameters

• **name**: `string`

the context name.

• **defaultValue**: `null` \| `T` = `null`

the optional default value.

## Returns

[() => `T`, `Provider`\<`T`\>, `Context`\<`T` \| `null`\>]

the tuple [hook, provider, and common context] for interactions with a non-nullable context.
