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
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) |
| `validator` | [`ResolvedValidator`](../modules/react_form_builder_core.md#resolvedvalidator) |
| `setter` | [`Setter`](../modules/react_form_builder_core.md#setter)<`undefined` \| `string`\> |
| `errorMessageLocalizer?` | [`ErrorMessageLocalizer`](../modules/react_form_builder_core.md#errormessagelocalizer) |

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

▸ `Static` **create**<`T`\>(`store`, `resolver`, `args`, `setter`, `localizer?`): [`DataValidator`](react_form_builder_core.DataValidator.md)

Creates a DataValidator instance.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | [`IStore`](../interfaces/react_form_builder_core.IStore.md) | the form viewer settings |
| `resolver` | [`SchemaResolver`](../modules/react_form_builder_core.md#schemaresolver)<`T`\> | the validation function factory. |
| `args` | `T` | the validation function factory arguments. |
| `setter` | [`Setter`](../modules/react_form_builder_core.md#setter)<`undefined` \| `string`\> | the callback function called to set a validation error. |
| `localizer?` | [`ErrorMessageLocalizer`](../modules/react_form_builder_core.md#errormessagelocalizer) | the function that localizes validation error messages. |

#### Returns

[`DataValidator`](react_form_builder_core.DataValidator.md)

the DataValidator instance.
