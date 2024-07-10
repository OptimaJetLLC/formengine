# Class: ActionDefinition

Represents the definition of an action.

## Constructors

### new ActionDefinition()

> **new ActionDefinition**(`func`, `body`?, `params`?): [`ActionDefinition`](ActionDefinition.md)

Creates a new instance of the ActionDefinition class.

#### Parameters

• **func**: [`Func`](../type-aliases/Func.md)

the function of an action.

• **body?**: `string`

the source code of the Action.

• **params?**: [`ActionParameters`](../type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

## Properties

### body?

> `readonly` `optional` **body**: `string`

the source code of the Action.

***

### func

> `readonly` **func**: [`Func`](../type-aliases/Func.md)

the function of an action.

***

### params

> `readonly` **params**: [`ActionParameters`](../type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

## Methods

### createFromObject()

> `static` **createFromObject**(`value`): [`ActionDefinition`](ActionDefinition.md)

Correctly creates the [ActionDefinition](ActionDefinition.md) from deserialized data.

#### Parameters

• **value**: `any`

the deserialized data.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the ActionDefinition instance.

***

### functionalAction()

> `static` **functionalAction**(`func`, `params`): [`ActionDefinition`](ActionDefinition.md)

Creates an action from the function.

#### Parameters

• **func**: [`Func`](../type-aliases/Func.md)

the function of an action.

• **params**: [`ActionParameters`](../type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the new instance of the ActionDefinition class.

***

### sourceAction()

> `static` **sourceAction**(`body`, `params`): [`ActionDefinition`](ActionDefinition.md)

Creates an action from the source code.

#### Parameters

• **body**: `string`

the source code of the Action.

• **params**: [`ActionParameters`](../type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the new instance of the ActionDefinition class.
