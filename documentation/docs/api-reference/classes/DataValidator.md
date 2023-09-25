---
id: "DataValidator"
title: "Class: DataValidator"
sidebar_label: "DataValidator"
sidebar_position: 0
custom_edit_url: null
---

Binds all parts of the validation and performs the validation.

## Constructors

### constructor

• `Private` **new DataValidator**(`store`, `validator`, `setter`, `errorMessageLocalizer?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`IStore`](../interfaces/IStore.md) |
| `validator` | [`ResolvedValidator`](../modules.md#resolvedvalidator) |
| `setter` | [`Setter`](../modules.md#setter)<`undefined` \| `string`\> |
| `errorMessageLocalizer?` | [`ErrorMessageLocalizer`](../modules.md#errormessagelocalizer) |

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

### sendValidationEvent

▸ **sendValidationEvent**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

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

▸ `Static` **create**<`T`\>(`store`, `resolver`, `args`, `setter`, `localizer?`): [`DataValidator`](DataValidator.md)

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `store` | [`IStore`](../interfaces/IStore.md) |
| `resolver` | [`SchemaResolver`](../modules.md#schemaresolver)<`T`\> |
| `args` | `T` |
| `setter` | [`Setter`](../modules.md#setter)<`undefined` \| `string`\> |
| `localizer?` | [`ErrorMessageLocalizer`](../modules.md#errormessagelocalizer) |

#### Returns

[`DataValidator`](DataValidator.md)
