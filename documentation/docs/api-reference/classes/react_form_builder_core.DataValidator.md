---
id: "react_form_builder_core.DataValidator"
title: "Class: DataValidator"
sidebar_label: "DataValidator"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).DataValidator

Binds all parts of the validation and performs the validation.

## Constructors

### constructor

• `Private` **new DataValidator**(`store`, `validator`, `setter`, `errorMessageLocalizer?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](react_form_builder_core.Store.md) |
| `validator` | [`ResolvedValidator`](../modules/react_form_builder_core.md#resolvedvalidator) |
| `setter` | [`Setter`](../modules/react_form_builder_core.md#setter)<`undefined` \| `string`\> |
| `errorMessageLocalizer?` | `ErrorMessageLocalizer` |

## Properties

### #stream

• `Private` `Readonly` **#stream**: `Observable`<`undefined` \| `string`\>

___

### #subject

• `Private` `Readonly` **#subject**: `Subject`<`any`\>

___

### #subscriptions

• `Private` `Readonly` **#subscriptions**: `Subscription`[]

## Methods

### dispose

▸ **dispose**(): `void`

#### Returns

`void`

___

### validate

▸ **validate**(`value`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

#### Returns

`Promise`<`undefined` \| `string`\>

___

### create

▸ `Static` **create**<`T`\>(`store`, `resolver`, `args`, `setter`): [`DataValidator`](react_form_builder_core.DataValidator.md)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`Store`](react_form_builder_core.Store.md) |
| `resolver` | `SchemaResolver`<`T`\> |
| `args` | `T` |
| `setter` | [`Setter`](../modules/react_form_builder_core.md#setter)<`undefined` \| `string`\> |

#### Returns

[`DataValidator`](react_form_builder_core.DataValidator.md)
