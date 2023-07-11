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

• **new ActionEventArgs**(`type`, `sender`, `store`, `args`)

Creates arguments for the event handler.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the event type. |
| `sender` | [`ComponentData`](../modules/react_form_builder_core.md#componentdata) | the component that triggered the event. |
| `store` | [`Store`](react_form_builder_core.Store.md) | the form viewer settings. |
| `args` | `any`[] | the event arguments. |

## Properties

### args

• `Readonly` **args**: `any`[]

the event arguments.

___

### sender

• `Readonly` **sender**: [`ComponentData`](../modules/react_form_builder_core.md#componentdata)

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

### #isEvent

▸ `Private` **#isEvent**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`

___

### #isNotEvent

▸ `Private` **#isNotEvent**(`value`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`boolean`
