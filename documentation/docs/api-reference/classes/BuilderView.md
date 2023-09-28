---
id: "BuilderView"
title: "Class: BuilderView"
sidebar_label: "BuilderView"
sidebar_position: 0
custom_edit_url: null
---

Represents all the metadata of the form builder components.

## Hierarchy

- [`View`](View.md)

  ↳ **`BuilderView`**

## Constructors

### constructor

• **new BuilderView**(`builderComponents`)

Creates metadata for form builder components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `builderComponents` | [`BuilderComponent`](../interfaces/BuilderComponent.md)[] | the array of metadata of form builder components. |

#### Overrides

[View](View.md).[constructor](View.md#constructor)

## Properties

### #cssLoaders

• `Private` **#cssLoaders**: `Map`<[`BiDi`](../enums/BiDi.md), () => `Promise`<`void`\>[]\>

#### Inherited from

[View](View.md).[#cssLoaders](View.md##cssloaders)

___

### #errorMeta

• `Private` **#errorMeta**: `Map`<`string`, [`Meta`](Meta.md)\>

___

### #metaMap

• `Private` **#metaMap**: `Map`<`string`, [`Meta`](Meta.md)\>

___

### #modelMap

• `Private` **#modelMap**: `Map`<`string`, [`Model`](Model.md)<`any`\>\>

#### Inherited from

[View](View.md).[#modelMap](View.md##modelmap)

___

### #tooltipsMeta

• `Private` **#tooltipsMeta**: `Map`<`string`, [`Meta`](Meta.md)\>

___

### #wrappers

• `Private` **#wrappers**: [`FormViewerWrapper`](../modules.md#formviewerwrapper)[]

#### Inherited from

[View](View.md).[#wrappers](View.md##wrappers)

___

### builderComponents

• **builderComponents**: [`BuilderComponent`](../interfaces/BuilderComponent.md)[]

the array of metadata of form builder components.

## Accessors

### errors

• `get` **errors**(): `string`[]

#### Returns

`string`[]

the array of strings with the names of the component types of the error.

___

### tooltips

• `get` **tooltips**(): `string`[]

#### Returns

`string`[]

the array of strings with the names of the component types of the tooltip.

___

### viewerWrappers

• `get` **viewerWrappers**(): [`FormViewerWrapper`](../modules.md#formviewerwrapper)[]

Retrieves the viewer wrappers array.

#### Returns

[`FormViewerWrapper`](../modules.md#formviewerwrapper)[]

the viewer wrappers array.

#### Inherited from

View.viewerWrappers

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

#### Inherited from

[View](View.md).[#withCssLoader](View.md##withcssloader)

___

### all

▸ **all**(): [`Model`](Model.md)<`any`\>[]

#### Returns

[`Model`](Model.md)<`any`\>[]

all component metadata for the form viewer.

#### Inherited from

[View](View.md).[all](View.md#all)

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

#### Inherited from

[View](View.md).[define](View.md#define)

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

#### Inherited from

[View](View.md).[find](View.md#find)

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

#### Inherited from

[View](View.md).[get](View.md#get)

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

#### Inherited from

[View](View.md).[getCssLoaders](View.md#getcssloaders)

___

### getErrorAnnotations

▸ **getErrorAnnotations**(`name`): `undefined` \| [`Annotation`](Annotation.md)[]

Returns the array of metadata properties of the error component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the error component type. |

#### Returns

`undefined` \| [`Annotation`](Annotation.md)[]

the array of metadata properties of the error component.

___

### getMeta

▸ **getMeta**(`type`): [`Meta`](Meta.md)

Returns the component metadata for the specified component type name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type name. |

#### Returns

[`Meta`](Meta.md)

the component metadata for the specified component type name.

___

### getTooltipAnnotations

▸ **getTooltipAnnotations**(`name`): `undefined` \| [`Annotation`](Annotation.md)[]

Returns the array of metadata properties of the tooltip component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the tooltip component type. |

#### Returns

`undefined` \| [`Annotation`](Annotation.md)[]

the array of metadata properties of the tooltip component.

___

### withCssLoader

▸ **withCssLoader**(`cssLoaderType`, `loader`): [`BuilderView`](BuilderView.md)

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cssLoaderType` | [`CssLoaderType`](../modules.md#cssloadertype) | the BiDi layout type, either 'common', 'ltr', or 'rtl'. |
| `loader` | () => `Promise`<`void`\> | the function that returns a Promise to load CSS or other required localization resources. |

#### Returns

[`BuilderView`](BuilderView.md)

the [View](View.md) instance.

#### Inherited from

[View](View.md).[withCssLoader](View.md#withcssloader)

___

### withErrorMeta

▸ **withErrorMeta**(`builderComponent`): [`BuilderView`](BuilderView.md)

Sets the metadata of the component that displays form's errors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `builderComponent` | [`BuilderComponent`](../interfaces/BuilderComponent.md) | the metadata of the component that displays the form's errors. |

#### Returns

[`BuilderView`](BuilderView.md)

the instance of the [BuilderView](BuilderView.md) class.

___

### withTemplates

▸ **withTemplates**(`templates`): [`BuilderView`](BuilderView.md)

Creates metadata for the form builder for templates from the specified template names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `templates` | `string`[] | the array of template names. |

#### Returns

[`BuilderView`](BuilderView.md)

the instance of the [BuilderView](BuilderView.md) class.

___

### withTooltipMeta

▸ **withTooltipMeta**(`builderComponent`): [`BuilderView`](BuilderView.md)

Sets the metadata of the component that displays the form's tooltips.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `builderComponent` | [`BuilderComponent`](../interfaces/BuilderComponent.md) | the metadata of the component that displays the form's tooltips. |

#### Returns

[`BuilderView`](BuilderView.md)

the instance of the [BuilderView](BuilderView.md) class.

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

#### Inherited from

[View](View.md).[withViewerWrapper](View.md#withviewerwrapper)

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

#### Inherited from

[View](View.md).[create](View.md#create)
