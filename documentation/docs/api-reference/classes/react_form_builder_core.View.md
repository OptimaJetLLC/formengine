---
id: "react_form_builder_core.View"
title: "Class: View"
sidebar_label: "View"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).View

Represents all the metadata of the form viewer components.

## Constructors

### constructor

• **new View**(`models?`)

Creates an instance of the [View](react_form_builder_core.View.md).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | [`Model`](react_form_builder_core.Model.md)[] | `[]` | the components metadata. |

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

the component's metadata for displaying the error on the form.

___

### tooltips

• `get` **tooltips**(): `string`[]

#### Returns

`string`[]

the array of strings with the names of the component types of the tooltip.

## Methods

### all

▸ **all**(): [`Model`](react_form_builder_core.Model.md)[]

#### Returns

[`Model`](react_form_builder_core.Model.md)[]

all component metadata for the form viewer.

___

### define

▸ **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md) | the component's metadata. |

#### Returns

`void`

___

### get

▸ **get**(`type`): [`Model`](react_form_builder_core.Model.md)

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

[`Model`](react_form_builder_core.Model.md)

the component metadata for the form viewer for the specified type.

___

### getTooltipComponent

▸ **getTooltipComponent**(`name`): `undefined` \| [`Model`](react_form_builder_core.Model.md)

Returns the component's metadata for displaying the tooltip.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the tooltip component type. |

#### Returns

`undefined` \| [`Model`](react_form_builder_core.Model.md)

the component's metadata for displaying the tooltip.

___

### templates

▸ **templates**(): [`Model`](react_form_builder_core.Model.md)[]

#### Returns

[`Model`](react_form_builder_core.Model.md)[]

the templates metadata for the form viewer.

___

### withError

▸ **withError**(`model`): [`View`](react_form_builder_core.View.md)

Defines the component's metadata for displaying the error on the form.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md) | the component's metadata. |

#### Returns

[`View`](react_form_builder_core.View.md)

the [View](react_form_builder_core.View.md) instance.

___

### withTemplates

▸ **withTemplates**(`templates`): [`View`](react_form_builder_core.View.md)

Creates templates metadata.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `templates` | `string`[] | the array of template names. |

#### Returns

[`View`](react_form_builder_core.View.md)

the [View](react_form_builder_core.View.md) instance.

___

### withTooltip

▸ **withTooltip**(`model`): [`View`](react_form_builder_core.View.md)

Defines the component's metadata for displaying the tooltip.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md) | the component's metadata. |

#### Returns

[`View`](react_form_builder_core.View.md)

the [View](react_form_builder_core.View.md) instance.

___

### create

▸ `Static` **create**(`...models`): [`View`](react_form_builder_core.View.md)

Static wrapper for the [View](react_form_builder_core.View.md) constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...models` | [`Model`](react_form_builder_core.Model.md)[] | the components metadata. |

#### Returns

[`View`](react_form_builder_core.View.md)

the [View](react_form_builder_core.View.md) instance.
