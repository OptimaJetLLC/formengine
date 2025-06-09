# Type Alias: ActionsInitializer()

> **ActionsInitializer**: (`props`, `def`) => `Record`\<[`EventName`](EventName.md), [`ActionEventHandler`](ActionEventHandler.md) \| [`ActionDefinition`](../classes/ActionDefinition.md)\>

The type of function that initializes an actions on a component. **Internal use only.**

## Parameters

• **props**: [`ComponentStore`](../classes/ComponentStore.md)\[`"props"`\]

the component's property settings.

• **def**: [`DefineActionHelper`](DefineActionHelper.md)

the helper to create an action event handler.

## Returns

`Record`\<[`EventName`](EventName.md), [`ActionEventHandler`](ActionEventHandler.md) \| [`ActionDefinition`](../classes/ActionDefinition.md)\>

the Record with action event handlers.
