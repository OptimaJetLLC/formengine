---
id: "fb_core.Model"
title: "Class: Model"
sidebar_label: "Model"
custom_edit_url: null
---

[fb-core](../modules/fb_core.md).Model

## Constructors

### constructor

• **new Model**(`view`, `name?`, `actionsInitializer?`, `valued?`, `defaultProps?`, `css?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `ComponentType`<`any`\> |
| `name?` | `string` |
| `actionsInitializer?` | [`ActionsInitializer`](../modules/fb_core.md#actionsinitializer) |
| `valued?` | `string` |
| `defaultProps?` | `Readonly`<`Record`<`string`, `any`\>\> |
| `css?` | `Css` |

## Properties

### #name

• `Private` `Optional` `Readonly` **#name**: `string`

___

### actionsInitializer

• `Optional` `Readonly` **actionsInitializer**: [`ActionsInitializer`](../modules/fb_core.md#actionsinitializer)

___

### css

• `Optional` `Readonly` **css**: `Css`

___

### defaultProps

• `Optional` `Readonly` **defaultProps**: `Readonly`<`Record`<`string`, `any`\>\>

___

### valued

• `Optional` `Readonly` **valued**: `string`

___

### view

• `Readonly` **view**: `ComponentType`<`any`\>

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

___

### type

• `get` **type**(): `string`

#### Returns

`string`

## Methods

### getActions

▸ **getActions**(`cs`): `undefined` \| `ActionDefinition`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `cs` | [`ComponentStore`](fb_core.ComponentStore.md) |

#### Returns

`undefined` \| `ActionDefinition`[]
