---
id: "ActionDefinition"
title: "Class: ActionDefinition"
sidebar_label: "ActionDefinition"
sidebar_position: 0
custom_edit_url: null
---

Represents the definition of an action.

## Constructors

### constructor

• **new ActionDefinition**(`func`, `body?`, `params?`)

Creates a new instance of the ActionDefinition class.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`Func`](../modules.md#func) | the function of an action. |
| `body?` | `string` | the source code of the Action. |
| `params` | [`ActionParameters`](../modules.md#actionparameters) | the parameters of the Action. |

## Properties

### body

• `Optional` `Readonly` **body**: `string`

the source code of the Action.

___

### func

• `Readonly` **func**: [`Func`](../modules.md#func)

the function of an action.

___

### params

• `Readonly` **params**: [`ActionParameters`](../modules.md#actionparameters) = `{}`

the parameters of the Action.

## Methods

### createFromObject

▸ `Static` **createFromObject**(`value`): [`ActionDefinition`](ActionDefinition.md)

Correctly creates the [ActionDefinition](ActionDefinition.md) from deserialized data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the deserialized data. |

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the ActionDefinition instance.

___

### functionalAction

▸ `Static` **functionalAction**(`func`, `params?`): [`ActionDefinition`](ActionDefinition.md)

Creates an action from the function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `func` | [`Func`](../modules.md#func) | the function of an action. |
| `params` | [`ActionParameters`](../modules.md#actionparameters) | the parameters of the Action. |

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the new instance of the ActionDefinition class.

___

### sourceAction

▸ `Static` **sourceAction**(`body`, `params?`): [`ActionDefinition`](ActionDefinition.md)

Creates an action from the source code.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `body` | `string` | the source code of the Action. |
| `params` | [`ActionParameters`](../modules.md#actionparameters) | the parameters of the Action. |

#### Returns

[`ActionDefinition`](ActionDefinition.md)

the new instance of the ActionDefinition class.
