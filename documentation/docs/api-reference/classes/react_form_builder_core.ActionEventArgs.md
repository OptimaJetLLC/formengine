---
id: "react_form_builder_core.ActionEventArgs"
title: "Class: ActionEventArgs"
sidebar_label: "ActionEventArgs"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ActionEventArgs

## Constructors

### constructor

• **new ActionEventArgs**(`type`, `sender`, `store`, `args`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |
| `sender` | [`ComponentData`](../modules/react_form_builder_core.md#componentdata) |
| `store` | [`Store`](react_form_builder_core.Store.md) |
| `args` | `any`[] |

## Properties

### args

• `Readonly` **args**: `any`[]

___

### sender

• `Readonly` **sender**: [`ComponentData`](../modules/react_form_builder_core.md#componentdata)

___

### store

• `Readonly` **store**: [`Store`](react_form_builder_core.Store.md)

___

### type

• `Readonly` **type**: `string`

## Accessors

### event

• `get` **event**(): ``null`` \| `SyntheticEvent`<`Element`, `Event`\>

#### Returns

``null`` \| `SyntheticEvent`<`Element`, `Event`\>

___

### value

• `get` **value**(): `any`

#### Returns

`any`

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
