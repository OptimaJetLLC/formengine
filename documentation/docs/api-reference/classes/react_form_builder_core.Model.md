---
id: "react_form_builder_core.Model"
title: "Class: Model<T>"
sidebar_label: "Model"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Model

Represents component metadata for the form viewer.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | the type of React component properties. |

## Constructors

### constructor

• **new Model**<`T`\>(`component`, `name?`, `actionsInitializer?`, `valued?`, `valueType?`, `defaultProps?`, `css?`, `typeName?`, `icon?`, `kind?`)

Creates component metadata for the form viewer.

#### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | `any` | the type of React component properties. |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `component` | `ComponentType`<`T`\> | `undefined` | the React component. |
| `name?` | `string` | `undefined` | the component name. |
| `actionsInitializer?` | [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer) | `undefined` | the function to initialize actions in the component. |
| `valued?` | `string` | `undefined` | the name of the component property where the component value is stored. |
| `valueType?` | keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap) | `undefined` | the type of the component value. |
| `defaultProps?` | `Readonly`<`Record`<`string`, `any`\>\> | `undefined` | the component's default property values. |
| `css?` | [`Css`](../modules/react_form_builder_core.md#css) | `undefined` | the component's CSS values. |
| `typeName?` | `string` | `undefined` | the component type name. |
| `icon?` | `ComponentType` | `undefined` | the component icon. |
| `kind` | [`ComponentKind`](../modules/react_form_builder_core.md#componentkind) | `'component'` | the component kind. |

## Properties

### actionsInitializer

• `Optional` `Readonly` **actionsInitializer**: [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer)

the function to initialize actions in the component.

___

### component

• `Readonly` **component**: `ComponentType`<`T`\>

The React component.

___

### css

• `Optional` `Readonly` **css**: [`Css`](../modules/react_form_builder_core.md#css)

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

### kind

• `Readonly` **kind**: [`ComponentKind`](../modules/react_form_builder_core.md#componentkind) = `'component'`

the component kind.

___

### typeName

• `Optional` `Readonly` **typeName**: `string`

the component type name.

___

### valueType

• `Optional` `Readonly` **valueType**: keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap)

the type of the component value.

___

### valued

• `Optional` `Readonly` **valued**: `string`

the name of the component property where the component value is stored.

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
