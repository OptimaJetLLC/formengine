---
id: "react_form_builder_core.ActionEventArgs"
title: "Class: ActionEventArgs"
sidebar_label: "ActionEventArgs"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ActionEventArgs

Arguments passed to the event handler.

## Constructors

### constructor

• **new ActionEventArgs**(`type`, `sender`, `store`, `args`, `state`)

Creates arguments for the event handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the event type. |
| `sender` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the component that triggered the event. |
| `store` | [`Store`](react_form_builder_core.Store.md) | the form viewer settings. |
| `args` | `any`[] | the event arguments. |
| `state` | [`ComponentState`](react_form_builder_core.ComponentState.md) | the [ComponentState](react_form_builder_core.ComponentState.md) instance. |

## Properties

### args

• `Readonly` **args**: `any`[]

the event arguments.

___

### renderedProps

• **renderedProps**: `Record`<`string`, `any`\>

The component properties that were used to render the sender component.

___

### sender

• `Readonly` **sender**: [`ComponentData`](react_form_builder_core.ComponentData.md)

the component that triggered the event.

___

### store

• `Readonly` **store**: [`Store`](react_form_builder_core.Store.md)

the form viewer settings.

___

### type

• `Readonly` **type**: `string`

the event type.

## Accessors

### data

• `get` **data**(): `Record`<`string`, `unknown`\>

#### Returns

`Record`<`string`, `unknown`\>

the object for reading and changing form data.

___

### event

• `get` **event**(): ``null`` \| `SyntheticEvent`<`Element`, `Event`\>

#### Returns

``null`` \| `SyntheticEvent`<`Element`, `Event`\>

the event handled by the event handler.

___

### value

• `get` **value**(): `any`

#### Returns

`any`

the first element of the event argument array, which is treated as a value.

## Methods

### setUserDefinedProps

▸ **setUserDefinedProps**(`props?`): `void`

Sets user-defined properties for the React component that override other properties of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props?` | `Record`<`string`, `any`\> | the component properties. |

#### Returns

`void`
