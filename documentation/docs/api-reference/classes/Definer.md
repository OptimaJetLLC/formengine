---
id: "Definer"
title: "Class: Definer<T>"
sidebar_label: "Definer"
sidebar_position: 0
custom_edit_url: null
---

The builder class to define the metadata of the form builder component.

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

• **data**: [`DefinerData`](../modules.md#definerdata)<`T`\>

## Methods

### #updateWith

▸ `Private` **#updateWith**(`opts`): [`Definer`](Definer.md)<`T`\>

Modifies the component's metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Partial`<[`DefinerData`](../modules.md#definerdata)<`T`\>\> | the custom options. |

#### Returns

[`Definer`](Definer.md)<`T`\>

the modified instance of the builder.

___

### actions

▸ **actions**(`fn`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | [`ActionsInitializer`](../modules.md#actionsinitializer) |

#### Returns

[`Definer`](Definer.md)<`T`\>

___

### build

▸ **build**(): [`BuilderComponent`](../interfaces/BuilderComponent.md)

Creates component metadata for the form builder and form viewer.

#### Returns

[`BuilderComponent`](../interfaces/BuilderComponent.md)

component metadata for the form builder and form viewer.

___

### category

▸ **category**(`category`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `string` |

#### Returns

[`Definer`](Definer.md)<`T`\>

___

### css

▸ **css**(`css`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `css` | [`Annotations`](../modules.md#annotations)<`CSSObject`\> |

#### Returns

[`Definer`](Definer.md)<`T`\>

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

the component type name.

___

### icon

▸ **icon**(`icon`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `ComponentType` |

#### Returns

[`Definer`](Definer.md)<`T`\>

___

### name

▸ **name**(`name`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Definer`](Definer.md)<`T`\>

___

### preview

▸ **preview**(`customPreview`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `customPreview` | `ReactNode` |

#### Returns

[`Definer`](Definer.md)<`T`\>

___

### props

▸ **props**(`properties`): [`Definer`](Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | [`Annotations`](../modules.md#annotations)<`T`\> |

#### Returns

[`Definer`](Definer.md)<`T`\>

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

▸ `Static` **define**<`T`\>(`view`, `displayName?`): [`Definer`](Definer.md)<`T`\>

Static method to create an instance of the component's metadata builder class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `view` | `ComponentType`<`T`\> | the React component type. |
| `displayName?` | `string` | the display name for the anonymous component. |

#### Returns

[`Definer`](Definer.md)<`T`\>

the instance of the [Definer](Definer.md) class.
