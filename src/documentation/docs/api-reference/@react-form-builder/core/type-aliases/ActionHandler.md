# Type Alias: ActionHandler()\<T\>

> **ActionHandler**\<`T`\> = (`e`, `params`) => `Promise`\<`void`\> \| `void`

Action function type.

## Type Parameters

### T

`T`

the type of action parameters.

## Parameters

### e

[`ActionEventArgs`](../classes/ActionEventArgs.md)

the action arguments.

### params

`{ [k in keyof T]: any }`

the action parameters arguments.

## Returns

`Promise`\<`void`\> \| `void`
