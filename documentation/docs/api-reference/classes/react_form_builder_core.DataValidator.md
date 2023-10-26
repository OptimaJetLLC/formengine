---
id: "react_form_builder_core.DataValidator"
title: "Class: DataValidator"
sidebar_label: "DataValidator"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).DataValidator

Binds all parts of the validation and performs the validation.

## Methods

### dispose

▸ **dispose**(): `void`

Releases allocated resources, must be used when destroying an object instance.

#### Returns

`void`

___

### sendValidationEvent

▸ **sendValidationEvent**(`value`): `void`

Generates an event to perform validation.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the validated value. |

#### Returns

`void`

___

### validate

▸ **validate**(`value`): `Promise`<`undefined` \| `string`\>

Performs a validation of the value.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the validated value. |

#### Returns

`Promise`<`undefined` \| `string`\>

the Promise with the result of the validation.

___

### create

▸ `Static` **create**<`T`\>(`store`, `resolver`, `args`, `setter`, `localizer?`): [`DataValidator`](react_form_builder_core.DataValidator.md)

Creates a DataValidator instance.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the validation function factory arguments. |

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
