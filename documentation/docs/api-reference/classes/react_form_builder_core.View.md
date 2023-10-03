---
id: "react_form_builder_core.View"
title: "Class: View"
sidebar_label: "View"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).View

Represents all the metadata of the form viewer components.

## Hierarchy

- **`View`**

  ↳ [`BuilderView`](react_form_builder_core.BuilderView.md)

  ↳ [`BuilderView`](react_form_builder_core.BuilderView.md)

## Constructors

### constructor

• **new View**(`models?`)

Creates an instance of the [View](react_form_builder_core.View.md).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `models` | [`Model`](react_form_builder_core.Model.md)<`any`\>[] | `[]` | the components metadata. |

## Properties

### #cssLoaders

• `Private` **#cssLoaders**: `Map`<[`BiDi`](../enums/react_form_builder_core.BiDi.md), () => `Promise`<`void`\>[]\>

___

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](react_form_builder_core.Model.md)<`any`\>\>

___

### #wrappers

• `Private` **#wrappers**: [`FormViewerWrapper`](../modules/react_form_builder_core.md#formviewerwrapper)[]

## Accessors

### viewerWrappers

• `get` **viewerWrappers**(): [`FormViewerWrapper`](../modules/react_form_builder_core.md#formviewerwrapper)[]

Retrieves the viewer wrappers array.

#### Returns

[`FormViewerWrapper`](../modules/react_form_builder_core.md#formviewerwrapper)[]

the viewer wrappers array.

## Methods

### #withCssLoader

▸ `Private` **#withCssLoader**(`biDi`, `loader`): `void`

Sets a CSS loader for the specified BiDi direction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `biDi` | [`BiDi`](../enums/react_form_builder_core.BiDi.md) | the BiDi direction. |
| `loader` | () => `Promise`<`void`\> | the loader function that returns a Promise. |

#### Returns

`void`

___

### all

▸ **all**(): [`Model`](react_form_builder_core.Model.md)<`any`\>[]

#### Returns

[`Model`](react_form_builder_core.Model.md)<`any`\>[]

all component metadata for the form viewer.

___

### define

▸ **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | [`Model`](react_form_builder_core.Model.md)<`any`\> | the component's metadata. |

#### Returns

`void`

___

### find

▸ **find**(`type`): `undefined` \| [`Model`](react_form_builder_core.Model.md)<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

`undefined` \| [`Model`](react_form_builder_core.Model.md)<`any`\>

the component metadata for the form viewer for the specified type or undefined.

___

### get

▸ **get**(`type`): [`Model`](react_form_builder_core.Model.md)<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

[`Model`](react_form_builder_core.Model.md)<`any`\>

the component metadata for the form viewer for the specified type.

___

### getCssLoaders

▸ **getCssLoaders**(`biDi`): () => `Promise`<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `biDi` | [`BiDi`](../enums/react_form_builder_core.BiDi.md) | the BiDi object for which to retrieve the CSS loaders. |

#### Returns

() => `Promise`<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

___

### withCssLoader

▸ **withCssLoader**(`cssLoaderType`, `loader`): [`View`](react_form_builder_core.View.md)

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cssLoaderType` | [`CssLoaderType`](../modules/react_form_builder_core.md#cssloadertype) | the BiDi layout type, either 'common', 'ltr', or 'rtl'. |
| `loader` | () => `Promise`<`void`\> | the function that returns a Promise to load CSS or other required localization resources. |

#### Returns

[`View`](react_form_builder_core.View.md)

the [View](react_form_builder_core.View.md) instance.

___

### withViewerWrapper

▸ **withViewerWrapper**(`wrapper`): `this`

Adds a wrapper to the list of viewers for this viewer wrapper.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wrapper` | [`FormViewerWrapper`](../modules/react_form_builder_core.md#formviewerwrapper) | the viewer wrapper to be added. The wrapper is a component that wraps the form viewer. |

#### Returns

`this`

the [View](react_form_builder_core.View.md) instance.

___

### create

▸ `Static` **create**(`models`): [`View`](react_form_builder_core.View.md)

Static wrapper for the [View](react_form_builder_core.View.md) constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | [`Model`](react_form_builder_core.Model.md)<`any`\>[] | the components metadata. |

#### Returns

[`View`](react_form_builder_core.View.md)

the [View](react_form_builder_core.View.md) instance.
