---
id: "react_form_builder_core.View"
title: "Class: View"
sidebar_label: "View"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).View

## Constructors

### constructor

• **new View**(`models?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `models` | [`Model`](react_form_builder_core.Model.md)[] | `[]` |

## Properties

### #error

• `Private` `Optional` **#error**: [`Model`](react_form_builder_core.Model.md)

___

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](react_form_builder_core.Model.md)\>

___

### #templateMap

• `Private` **#templateMap**: `Map`<`string`, [`Model`](react_form_builder_core.Model.md)\>

___

### #tooltips

• `Private` **#tooltips**: `Map`<`string`, [`Model`](react_form_builder_core.Model.md)\>

## Accessors

### error

• `get` **error**(): [`Model`](react_form_builder_core.Model.md)

#### Returns

[`Model`](react_form_builder_core.Model.md)

___

### tooltips

• `get` **tooltips**(): `string`[]

#### Returns

`string`[]

## Methods

### all

▸ **all**(): [`Model`](react_form_builder_core.Model.md)[]

#### Returns

[`Model`](react_form_builder_core.Model.md)[]

___

### define

▸ **define**(`model`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md) |

#### Returns

`void`

___

### get

▸ **get**(`type`): [`Model`](react_form_builder_core.Model.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `string` |

#### Returns

[`Model`](react_form_builder_core.Model.md)

___

### getTooltipComponent

▸ **getTooltipComponent**(`name`): `undefined` \| [`Model`](react_form_builder_core.Model.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`undefined` \| [`Model`](react_form_builder_core.Model.md)

___

### templates

▸ **templates**(): [`Model`](react_form_builder_core.Model.md)[]

#### Returns

[`Model`](react_form_builder_core.Model.md)[]

___

### withError

▸ **withError**(`model`): [`View`](react_form_builder_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md) |

#### Returns

[`View`](react_form_builder_core.View.md)

___

### withTemplates

▸ **withTemplates**(`templates`): [`View`](react_form_builder_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `templates` | `string`[] |

#### Returns

[`View`](react_form_builder_core.View.md)

___

### withTooltip

▸ **withTooltip**(`model`): [`View`](react_form_builder_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md) |

#### Returns

[`View`](react_form_builder_core.View.md)

___

### create

▸ `Static` **create**(`...models`): [`View`](react_form_builder_core.View.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...models` | [`Model`](react_form_builder_core.Model.md)[] |

#### Returns

[`View`](react_form_builder_core.View.md)
