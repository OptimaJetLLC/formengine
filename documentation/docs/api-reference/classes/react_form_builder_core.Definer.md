---
id: "react_form_builder_core.Definer"
title: "Class: Definer<T>"
sidebar_label: "Definer"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Definer

The builder class to define the metadata of the form builder component.

## Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends `object` | React component property type. |

## Properties

### data

• **data**: [`DefinerData`](../modules/react_form_builder_core.md#definerdata)<`T`\>

Definer class data.

**`Template`**

React component property type.

## Methods

### actions

▸ **actions**(`fn`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Adds the metadata of the component's actions. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | [`ActionsInitializer`](../modules/react_form_builder_core.md#actionsinitializer) | the function that initializes an actions on a component. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

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

Sets the category of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `category` | `string` | the component category. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### css

▸ **css**(`css`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Sets the component CSS metadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `css` | [`Annotations`](../modules/react_form_builder_core.md#annotations)<`CSSObject`\> | the component CSS metadata. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### getType

▸ **getType**(): `string`

#### Returns

`string`

the component type name.

___

### icon

▸ **icon**(`icon`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Sets the icon of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `icon` | `ComponentType` | the component icon. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### kind

▸ **kind**(`kind`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Sets the kind of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `kind` | [`ComponentKind`](../modules/react_form_builder_core.md#componentkind) | the component kind. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### name

▸ **name**(`name`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Sets the name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the component name. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### preview

▸ **preview**(`customPreview`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Adds the custom component to be displayed in the component list. **Internal use only.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `customPreview` | `ReactNode` | the custom component. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### props

▸ **props**(`properties`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Sets the metadata of the component's properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `properties` | [`Annotations`](../modules/react_form_builder_core.md#annotations)<`T`\> | the metadata of the component's properties. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the modified Definer class instance.

___

### type

▸ **type**(`type`): `this`

Sets the type of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

`this`

the modified Definer class instance.

___

### define

▸ `Static` **define**<`T`\>(`component`, `displayName?`): [`Definer`](react_form_builder_core.Definer.md)<`T`\>

Static method to create an instance of the component's metadata builder class.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `object` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `component` | `ComponentType`<`T`\> | the React component. |
| `displayName?` | `string` | the display name for the anonymous component. |

#### Returns

[`Definer`](react_form_builder_core.Definer.md)<`T`\>

the instance of the [Definer](react_form_builder_core.Definer.md) class.
