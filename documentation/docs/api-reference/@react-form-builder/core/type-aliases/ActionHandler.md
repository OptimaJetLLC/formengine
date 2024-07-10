# Type Alias: ActionHandler()\<T\>

> **ActionHandler**\<`T`\>: (`e`, `params`) => `void` \| `Promise`\<`void`\>

Action function type.

## Type Parameters

• **T**

the type of action parameters.

## Parameters

• **e**: [`ActionEventArgs`](../classes/ActionEventArgs.md)

the action arguments.

• **params**: `{ [k in keyof T]: any }`

the action parameters.

## Returns

`void` \| `Promise`\<`void`\>
