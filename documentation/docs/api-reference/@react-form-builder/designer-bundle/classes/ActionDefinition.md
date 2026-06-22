# Class: ActionDefinition

Represents the definition of an action.

## Constructors

### Constructor

> **new ActionDefinition**(`func`, `body?`, `params?`): `ActionDefinition`

Creates a new instance of the ActionDefinition class.

#### Parameters

##### func

[`Func`](../../core/type-aliases/Func.md)

the function of an action.

##### body?

`string`

the source code of the Action.

##### params?

[`ActionParameters`](../../core/type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

#### Returns

`ActionDefinition`

## Properties

### body?

> `readonly` `optional` **body**: `string`

the source code of the Action.

***

### func

> `readonly` **func**: [`Func`](../../core/type-aliases/Func.md)

the function of an action.

***

### params

> `readonly` **params**: [`ActionParameters`](../../core/type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

## Methods

### createFromObject()

> `static` **createFromObject**(`value`): `ActionDefinition`

Correctly creates the ActionDefinition from deserialized data.

#### Parameters

##### value

`any`

the deserialized data.

#### Returns

`ActionDefinition`

the ActionDefinition instance.

***

### functionalAction()

> `static` **functionalAction**(`func`, `params`): `ActionDefinition`

Creates an action from the function.

#### Parameters

##### func

[`Func`](../../core/type-aliases/Func.md)

the function of an action.

##### params

[`ActionParameters`](../../core/type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

#### Returns

`ActionDefinition`

the new instance of the ActionDefinition class.

***

### sourceAction()

> `static` **sourceAction**(`body`, `params`): `ActionDefinition`

Creates an action from the source code.

#### Parameters

##### body

`string`

the source code of the Action.

##### params

[`ActionParameters`](../../core/type-aliases/ActionParameters.md) = `{}`

the parameters of the Action.

#### Returns

`ActionDefinition`

the new instance of the ActionDefinition class.
