---
id: "react_form_builder_core.Model"
title: "Class: Model"
sidebar_label: "Model"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Model

## Constructors

### constructor

• **new Model**(`view`, `name?`, `actionsInitializer?`, `valued?`, `defaultProps?`, `css?`, `typeName?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `ComponentType`<`any`\> |
| `name?` | `string` |
| `actionsInitializer?` | [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer) |
| `valued?` | `string` |
| `defaultProps?` | `Readonly`<`Record`<`string`, `any`\>\> |
| `css?` | `Css` |
| `typeName?` | `string` |

## Properties

### #name

• `Private` `Optional` `Readonly` **#name**: `string`

___

### actionsInitializer

• `Optional` `Readonly` **actionsInitializer**: [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer)

___

### css

• `Optional` `Readonly` **css**: `Css`

___

### defaultProps

• `Optional` `Readonly` **defaultProps**: `Readonly`<`Record`<`string`, `any`\>\>

___

### typeName

• `Optional` `Readonly` **typeName**: `string`

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
| `cs` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

#### Returns

`undefined` \| `ActionDefinition`[]
