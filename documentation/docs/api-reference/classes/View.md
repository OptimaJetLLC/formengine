---
id: "View"
title: "Class: View"
sidebar_label: "View"
sidebar_position: 0
custom_edit_url: null
---

Represents all the metadata of the form viewer components.

## Hierarchy

- **`View`**

  ↳ [`BuilderView`](BuilderView.md)

  ↳ [`BuilderView`](BuilderView.md)

## Constructors

### constructor

• **new View**(`models?`)

Creates an instance of the [View](View.md).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | [`Model`](Model.md)<`any`\>[] | `[]` | the components metadata. |

## Properties

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](Model.md)<`any`\>\>

## Methods

### all

▸ **all**(): [`Model`](Model.md)<`any`\>[]

#### Returns

[`Model`](Model.md)<`any`\>[]

all component metadata for the form viewer.

___

### define

▸ **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`Model`](Model.md)<`any`\> | the component's metadata. |

#### Returns

`void`

___

### find

▸ **find**(`type`): `undefined` \| [`Model`](Model.md)<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

`undefined` \| [`Model`](Model.md)<`any`\>

the component metadata for the form viewer for the specified type or undefined.

___

### get

▸ **get**(`type`): [`Model`](Model.md)<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

[`Model`](Model.md)<`any`\>

the component metadata for the form viewer for the specified type.

___

### create

▸ `Static` **create**(`...models`): [`View`](View.md)

Static wrapper for the [View](View.md) constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...models` | [`Model`](Model.md)<`any`\>[] | the components metadata. |

#### Returns

[`View`](View.md)

the [View](View.md) instance.
