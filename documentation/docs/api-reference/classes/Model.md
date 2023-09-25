---
id: "Model"
title: "Class: Model<T>"
sidebar_label: "Model"
sidebar_position: 0
custom_edit_url: null
---

Represents component metadata for the form viewer.

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

## Constructors

### constructor

• **new Model**<`T`\>(`view`, `name?`, `actionsInitializer?`, `valued?`, `valueType?`, `defaultProps?`, `css?`, `typeName?`, `icon?`)

Creates component metadata for the form viewer.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | `ComponentType`<`T`\> | React component type. |
| `name?` | `string` | the component name. |
| `actionsInitializer?` | [`ActionsInitializer`](../modules.md#actionsinitializer) | the function to initialize actions in the component. |
| `valued?` | `string` | the name of the component property where the component value is stored. |
| `valueType?` | keyof [`SchemaTypeMap`](../modules.md#schematypemap) | the type of the component value. |
| `defaultProps?` | `Readonly`<`Record`<`string`, `any`\>\> | the component's default property values. |
| `css?` | [`Css`](../modules.md#css) | the component's CSS values. |
| `typeName?` | `string` | the component type name. |
| `icon?` | `ComponentType` | the component icon. |

## Properties

### #name

• `Private` `Optional` `Readonly` **#name**: `string`

___

### actionsInitializer

• `Optional` `Readonly` **actionsInitializer**: [`ActionsInitializer`](../modules.md#actionsinitializer)

the function to initialize actions in the component.

___

### css

• `Optional` `Readonly` **css**: [`Css`](../modules.md#css)

the component's CSS values.

___

### defaultProps

• `Optional` `Readonly` **defaultProps**: `Readonly`<`Record`<`string`, `any`\>\>

the component's default property values.

___

### icon

• `Optional` `Readonly` **icon**: `ComponentType`

the component icon.

___

### typeName

• `Optional` `Readonly` **typeName**: `string`

the component type name.

___

### valueType

• `Optional` `Readonly` **valueType**: keyof [`SchemaTypeMap`](../modules.md#schematypemap)

the type of the component value.

___

### valued

• `Optional` `Readonly` **valued**: `string`

the name of the component property where the component value is stored.

___

### view

• `Readonly` **view**: `ComponentType`<`T`\>

## Accessors

### name

• `get` **name**(): `string`

#### Returns

`string`

the component name, or type if there is no component name.

___

### type

• `get` **type**(): `string`

#### Returns

`string`

the component type name.
