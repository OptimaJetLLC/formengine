---
id: "react_form_builder_core.Model"
title: "Class: Model"
sidebar_label: "Model"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Model

Represents component metadata for the form viewer.

## Constructors

### constructor

• **new Model**(`view`, `name?`, `actionsInitializer?`, `valued?`, `defaultProps?`, `css?`, `typeName?`)

Creates component metadata for the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | `ComponentType`<`any`\> | React component type. |
| `name?` | `string` | the component name. |
| `actionsInitializer?` | [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer) | the function to initialize actions in the component. |
| `valued?` | `string` | the name of the component property where the component value is stored |
| `defaultProps?` | `Readonly`<`Record`<`string`, `any`\>\> | the component's default property values. |
| `css?` | `Css` | the component's CSS values. |
| `typeName?` | `string` | the component type name. |

## Properties

### #name

• `Private` `Optional` `Readonly` **#name**: `string`

___

### actionsInitializer

• `Optional` `Readonly` **actionsInitializer**: [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer)

the function to initialize actions in the component.

___

### css

• `Optional` `Readonly` **css**: `Css`

the component's CSS values.

___

### defaultProps

• `Optional` `Readonly` **defaultProps**: `Readonly`<`Record`<`string`, `any`\>\>

the component's default property values.

___

### typeName

• `Optional` `Readonly` **typeName**: `string`

the component type name.

___

### valued

• `Optional` `Readonly` **valued**: `string`

the name of the component property where the component value is stored

___

### view

• `Readonly` **view**: `ComponentType`<`any`\>

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

the component name, or [type](react_form_builder_core.Model.md#type) if there is no component name.

___

### type

• `get` **type**(): `string`

#### Returns

`string`

the component type name.

## Methods

### getActions

▸ **getActions**(`cs`): `undefined` \| `ActionDefinition`[]

Returns actions for the component or undefined if there are no actions for the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cs` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the component. |

#### Returns

`undefined` \| `ActionDefinition`[]

actions for the component or undefined if there are no actions for the component.
