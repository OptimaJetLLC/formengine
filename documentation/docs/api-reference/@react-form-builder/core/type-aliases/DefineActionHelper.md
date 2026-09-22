# Type Alias: DefineActionHelper

> **DefineActionHelper** = \<`T`\>(`name`, `func`, `params?`, `description?`) => [`ActionDefinition`](../classes/ActionDefinition.md)

The defineAction helper type. **Internal use only.**

## Type Parameters

### T

`T`

the type of action parameter.

## Parameters

### name

`string`

the action name.

### func

[`ActionHandler`](ActionHandler.md)\<`T`\>

the action handler.

### params?

[`ParameterDefinition`](ParameterDefinition.md)\<`T`\>[]

the definition of action parameters.

### description?

`string`

the action description.

## Returns

[`ActionDefinition`](../classes/ActionDefinition.md)

the definition of an action.
