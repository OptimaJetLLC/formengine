---
id: "form_builder.BuilderView"
title: "Class: BuilderView"
sidebar_label: "BuilderView"
custom_edit_url: null
---

[form-builder](../modules/form_builder.md).BuilderView

## Hierarchy

- [`View`](fb_core.View.md)

  ↳ **`BuilderView`**

## Constructors

### constructor

• **new BuilderView**(`models`, `metas`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `models` | [`Model`](fb_core.Model.md)[] |
| `metas` | `Meta`[] |

#### Overrides

[View](fb_core.View.md).[constructor](fb_core.View.md#constructor)

## Properties

### #error

• `Private` `Optional` **#error**: [`Model`](fb_core.Model.md)

#### Inherited from

[View](fb_core.View.md).[#error](fb_core.View.md#error)

___

### #metaMap

• `Private` **#metaMap**: `Map`<`string`, `Meta`\>

___

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](fb_core.Model.md)\>

#### Inherited from

[View](fb_core.View.md).[#modelMap](fb_core.View.md#modelmap)

___

### #tooltips

• `Private` **#tooltips**: `Map`<`string`, [`Model`](fb_core.Model.md)\>

#### Inherited from

[View](fb_core.View.md).[#tooltips](fb_core.View.md#tooltips)

___

### #tooltipsMeta

• `Private` **#tooltipsMeta**: `Map`<`string`, `Meta`\>

## Accessors

### error

• `get` **error**(): [`Model`](fb_core.Model.md)

#### Returns

[`Model`](fb_core.Model.md)

#### Inherited from

View.error

___

### tooltips

• `get` **tooltips**(): `string`[]

#### Returns

`string`[]

#### Inherited from

View.tooltips

## Methods

### all

▸ **all**(): [`Model`](fb_core.Model.md)[]

#### Returns

[`Model`](fb_core.Model.md)[]

#### Inherited from

[View](fb_core.View.md).[all](fb_core.View.md#all)

___

### define

▸ **define**(`model`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](fb_core.Model.md) |

#### Returns

`void`

#### Inherited from

[View](fb_core.View.md).[define](fb_core.View.md#define)

___

### get

▸ **get**(`type`): [`Model`](fb_core.Model.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Model`](fb_core.Model.md)

#### Inherited from

[View](fb_core.View.md).[get](fb_core.View.md#get)

___

### getMeta

▸ **getMeta**(`type`): `Meta`

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

`Meta`

___

### getTooltipAnnotations

▸ **getTooltipAnnotations**(`name`): `undefined` \| `Annotation`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| `Annotation`[]

___

### getTooltipComponent

▸ **getTooltipComponent**(`name`): `undefined` \| [`Model`](fb_core.Model.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Model`](fb_core.Model.md)

#### Inherited from

[View](fb_core.View.md).[getTooltipComponent](fb_core.View.md#gettooltipcomponent)

___

### withError

▸ **withError**(`model`): [`BuilderView`](form_builder.BuilderView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](fb_core.Model.md) |

#### Returns

[`BuilderView`](form_builder.BuilderView.md)

#### Inherited from

[View](fb_core.View.md).[withError](fb_core.View.md#witherror)

___

### withErrorMeta

▸ **withErrorMeta**(`tuple`): [`BuilderView`](form_builder.BuilderView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tuple` | readonly [[`Model`](fb_core.Model.md), `Meta`] |

#### Returns

[`BuilderView`](form_builder.BuilderView.md)

___

### withTooltip

▸ **withTooltip**(`model`): [`BuilderView`](form_builder.BuilderView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](fb_core.Model.md) |

#### Returns

[`BuilderView`](form_builder.BuilderView.md)

#### Inherited from

[View](fb_core.View.md).[withTooltip](fb_core.View.md#withtooltip)

___

### withTooltipMeta

▸ **withTooltipMeta**(`tuple`): [`BuilderView`](form_builder.BuilderView.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `tuple` | readonly [[`Model`](fb_core.Model.md), `Meta`] |

#### Returns

[`BuilderView`](form_builder.BuilderView.md)

___

### create

▸ `Static` **create**(`...models`): [`View`](fb_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...models` | [`Model`](fb_core.Model.md)[] |

#### Returns

[`View`](fb_core.View.md)

#### Inherited from

[View](fb_core.View.md).[create](fb_core.View.md#create)
