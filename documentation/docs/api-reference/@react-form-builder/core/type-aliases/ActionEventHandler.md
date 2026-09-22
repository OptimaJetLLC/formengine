# Type Alias: ActionEventHandler

> **ActionEventHandler** = (`e`, `args?`) => [`ActionResult`](ActionResult.md) \| `Promise`\<[`ActionResult`](ActionResult.md)\>

Event handler function type.

## Parameters

### e

[`ActionEventArgs`](../classes/ActionEventArgs.md)

the action arguments.

### args?

`Record`\<`string`, `any`\>

the action parameters.

## Returns

[`ActionResult`](ActionResult.md) \| `Promise`\<[`ActionResult`](ActionResult.md)\>
