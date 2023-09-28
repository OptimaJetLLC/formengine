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

### #cssLoaders

• `Private` **#cssLoaders**: `Map`<[`BiDi`](../enums/BiDi.md), () => `Promise`<`void`\>[]\>

___

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](Model.md)<`any`\>\>

___

### #wrappers

• `Private` **#wrappers**: [`FormViewerWrapper`](../modules.md#formviewerwrapper)[]

## Accessors

### viewerWrappers

• `get` **viewerWrappers**(): [`FormViewerWrapper`](../modules.md#formviewerwrapper)[]

Retrieves the viewer wrappers array.

#### Returns

[`FormViewerWrapper`](../modules.md#formviewerwrapper)[]

the viewer wrappers array.

## Methods

### #withCssLoader

▸ `Private` **#withCssLoader**(`biDi`, `loader`): `void`

Sets a CSS loader for the specified BiDi direction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `biDi` | [`BiDi`](../enums/BiDi.md) | the BiDi direction. |
| `loader` | () => `Promise`<`void`\> | the loader function that returns a Promise. |

#### Returns

`void`

___

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

### getCssLoaders

▸ **getCssLoaders**(`biDi`): () => `Promise`<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `biDi` | [`BiDi`](../enums/BiDi.md) | the BiDi object for which to retrieve the CSS loaders. |

#### Returns

() => `Promise`<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

___

### withCssLoader

▸ **withCssLoader**(`cssLoaderType`, `loader`): [`View`](View.md)

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cssLoaderType` | [`CssLoaderType`](../modules.md#cssloadertype) | the BiDi layout type, either 'common', 'ltr', or 'rtl'. |
| `loader` | () => `Promise`<`void`\> | the function that returns a Promise to load CSS or other required localization resources. |

#### Returns

[`View`](View.md)

the [View](View.md) instance.

___

### withViewerWrapper

▸ **withViewerWrapper**(`wrapper`): `this`

Adds a wrapper to the list of viewers for this viewer wrapper.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wrapper` | [`FormViewerWrapper`](../modules.md#formviewerwrapper) | the viewer wrapper to be added. The wrapper is a component that wraps the form viewer. |

#### Returns

`this`

the [View](View.md) instance.

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
