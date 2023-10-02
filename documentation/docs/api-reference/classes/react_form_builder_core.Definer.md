---
id: "react_form_builder_core.Definer"
title: "Class: Definer<T>"
sidebar_label: "Definer"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Definer

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

• **data**: [`DefinerData`](../modules/react_form_builder_core.md#definerdata)<`T`\>

## Methods

### #updateWith

▸ `Private` **#updateWith**(`opts`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Modifies the component's metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `opts` | `Partial`<[`DefinerData`](../modules/react_form_builder_core.md#definerdata)<`T`\>\> | the custom options. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified instance of the builder.

___

### actions

▸ **actions**(`fn`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer) |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

___

### build

▸ **build**(): [`BuilderComponent`](../interfaces/react_form_builder_core.BuilderComponent.md)

Creates component metadata for the form builder and form viewer.

#### Returns

[`BuilderComponent`](../interfaces/react_form_builder_core.BuilderComponent.md)

component metadata for the form builder and form viewer.

___

### category

▸ **category**(`category`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `category` | `string` |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

___

### css

▸ **css**(`css`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `css` | [`Annotations`](../modules/react_form_builder_core.md#annotations)<`CSSObject`\> |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

the component type name.

___

### icon

▸ **icon**(`icon`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `icon` | `ComponentType` |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

___

### name

▸ **name**(`name`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

___

### preview

▸ **preview**(`customPreview`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `customPreview` | `ReactNode` |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

___

### props

▸ **props**(`properties`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `properties` | [`Annotations`](../modules/react_form_builder_core.md#annotations)<`T`\> |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

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

▸ `Static` **define**<`T`\>(`view`, `displayName?`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

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

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the instance of the [Definer](react_form_builder_core.Definer.md) class.
