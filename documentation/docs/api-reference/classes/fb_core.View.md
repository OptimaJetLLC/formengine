---
id: "fb_core.View"
title: "Class: View"
sidebar_label: "View"
custom_edit_url: null
---

[fb-core](../modules/fb_core.md).View

## Constructors

### constructor

• **new View**(`models?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `models` | [`Model`](fb_core.Model.md)[] | `[]` |

## Properties

### #error

• `Private` `Optional` **#error**: [`Model`](fb_core.Model.md)

___

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](fb_core.Model.md)\>

___

### #tooltips

• `Private` **#tooltips**: `Map`<`string`, [`Model`](fb_core.Model.md)\>

## Accessors

### error

• `get` **error**(): [`Model`](fb_core.Model.md)

#### Returns

[`Model`](fb_core.Model.md)

___

### tooltips

• `get` **tooltips**(): `string`[]

#### Returns

`string`[]

## Methods

### all

▸ **all**(): [`Model`](fb_core.Model.md)[]

#### Returns

[`Model`](fb_core.Model.md)[]

___

### define

▸ **define**(`model`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](fb_core.Model.md) |

#### Returns

`void`

___

### get

▸ **get**(`type`): [`Model`](fb_core.Model.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Model`](fb_core.Model.md)

___

### getTooltipComponent

▸ **getTooltipComponent**(`name`): `undefined` \| [`Model`](fb_core.Model.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Model`](fb_core.Model.md)

___

### withError

▸ **withError**(`model`): [`View`](fb_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](fb_core.Model.md) |

#### Returns

[`View`](fb_core.View.md)

___

### withTooltip

▸ **withTooltip**(`model`): [`View`](fb_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](fb_core.Model.md) |

#### Returns

[`View`](fb_core.View.md)

___

### create

▸ `Static` **create**(`...models`): [`View`](fb_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...models` | [`Model`](fb_core.Model.md)[] |

#### Returns

[`View`](fb_core.View.md)
