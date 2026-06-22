# Function: createNonNullableContext()

> **createNonNullableContext**\<`T`\>(`name`, `defaultValue`): \[() => `T`, `Provider`\<`T`\>, `Context`\<`null` \| `T`\>\]

Creates non-nullable React context. **Internal use only.**

## Type Parameters

### T

`T`

## Parameters

### name

`string`

the context name.

### defaultValue

the optional default value.

`null` | `T`

## Returns

\[() => `T`, `Provider`\<`T`\>, `Context`\<`null` \| `T`\>\]

the tuple [hook, provider, and common context] for interactions with a non-nullable context.
