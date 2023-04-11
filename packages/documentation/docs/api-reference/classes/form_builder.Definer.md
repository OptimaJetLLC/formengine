---
id: "form_builder.Definer"
title: "Class: Definer<T>"
sidebar_label: "Definer"
custom_edit_url: null
---

[form-builder](../modules/form_builder.md).Definer

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

## Constructors

### constructor

• `Private` **new Definer**<`T`\>(`view`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `ComponentType`<`T`\> |

## Properties

### data

• **data**: `DefinerData`<`T`\>

## Methods

### #updateWith

▸ `Private` **#updateWith**(`opts`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Partial`<`DefinerData`<`T`\>\> |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>

___

### actions

▸ **actions**(`fn`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | [`ActionsInitializer`](../modules/fb_core.md#actionsinitializer) |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>

___

### build

▸ **build**(): readonly [[`Model`](fb_core.Model.md), `Meta`]

#### Returns

readonly [[`Model`](fb_core.Model.md), `Meta`]

___

### css

▸ **css**(`css`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `css` | `string` \| `Annotations`<`CSSObject`\> |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

___

### name

▸ **name**(`name`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>

___

### preview

▸ **preview**(`customPreview`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `customPreview` | `ReactNode` |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>

___

### props

▸ **props**(`properties`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | `Annotations`<`T`\> |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>

___

### type

▸ **type**(`type`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`this`

___

### define

▸ `Static` **define**<`T`\>(`view`): [`Definer`](form_builder.Definer.md)<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `view` | `ComponentType`<`T`\> |

#### Returns

[`Definer`](form_builder.Definer.md)<`T`\>
