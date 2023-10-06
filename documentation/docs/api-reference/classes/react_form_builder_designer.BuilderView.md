---
id: "react_form_builder_designer.BuilderView"
title: "Class: BuilderView"
sidebar_label: "BuilderView"
custom_edit_url: null
---

[@react-form-builder/designer](../modules/react_form_builder_designer.md).BuilderView

Represents all the metadata of the form builder components.

## Hierarchy

- `View`

  ↳ **`BuilderView`**

## Constructors

### constructor

• **new BuilderView**(`builderComponents`)

Creates metadata for form builder components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `builderComponents` | `BuilderComponent`[] | the array of metadata of form builder components. |

#### Overrides

View.constructor

## Properties

### #private

• `Private` **#private**: `any`

___

### #private

• `Private` **#private**: `any`

#### Inherited from

View.#private

___

### builderComponents

• **builderComponents**: `BuilderComponent`[]

___

### withViewerWrapper

• **withViewerWrapper**: (`wrapper`: `FormViewerWrapper`) => [`BuilderView`](react_form_builder_designer.BuilderView.md)

#### Type declaration

▸ (`wrapper`): [`BuilderView`](react_form_builder_designer.BuilderView.md)

Adds a wrapper to the list of viewers for this viewer wrapper.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `wrapper` | `FormViewerWrapper` | the viewer wrapper to be added. The wrapper is a component that wraps the form viewer. |

##### Returns

[`BuilderView`](react_form_builder_designer.BuilderView.md)

the View instance.

#### Inherited from

View.withViewerWrapper

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

• `get` **viewerWrappers**(): `FormViewerWrapper`[]

Retrieves the viewer wrappers array.

#### Returns

`FormViewerWrapper`[]

the viewer wrappers array.

#### Inherited from

View.viewerWrappers

## Methods

### all

▸ **all**(): `Model`<`any`\>[]

#### Returns

`Model`<`any`\>[]

all component metadata for the form viewer.

#### Inherited from

View.all

___

### define

▸ **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `model` | `Model`<`any`\> | the component's metadata. |

#### Returns

`void`

#### Inherited from

View.define

___

### find

▸ **find**(`type`): `undefined` \| `Model`<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

`undefined` \| `Model`<`any`\>

the component metadata for the form viewer for the specified type or undefined.

#### Inherited from

View.find

___

### findMeta

▸ **findMeta**(`type`): `undefined` \| `Meta`

Returns the component metadata for the specified component type name or undefined.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type name. |

#### Returns

`undefined` \| `Meta`

the component metadata for the specified component type name or undefined.

___

### get

▸ **get**(`type`): `Model`<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type. |

#### Returns

`Model`<`any`\>

the component metadata for the form viewer for the specified type.

#### Inherited from

View.get

___

### getCssLoaders

▸ **getCssLoaders**(`biDi`): () => `Promise`<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `biDi` | `BiDi` | the BiDi object for which to retrieve the CSS loaders. |

#### Returns

() => `Promise`<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

#### Inherited from

View.getCssLoaders

___

### getErrorAnnotations

▸ **getErrorAnnotations**(`name`): `undefined` \| `Annotation`[]

Returns the array of metadata properties of the error component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the error component type. |

#### Returns

`undefined` \| `Annotation`[]

the array of metadata properties of the error component.

___

### getMeta

▸ **getMeta**(`type`): `Meta`

Returns the component metadata for the specified component type name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type name. |

#### Returns

`Meta`

the component metadata for the specified component type name.

___

### getTooltipAnnotations

▸ **getTooltipAnnotations**(`name`): `undefined` \| `Annotation`[]

Returns the array of metadata properties of the tooltip component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the name of the tooltip component type. |

#### Returns

`undefined` \| `Annotation`[]

the array of metadata properties of the tooltip component.

___

### withCssLoader

▸ **withCssLoader**(`cssLoaderType`, `loader`): [`BuilderView`](react_form_builder_designer.BuilderView.md)

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cssLoaderType` | `CssLoaderType` | the BiDi layout type, either 'common', 'ltr', or 'rtl'. |
| `loader` | () => `Promise`<`void`\> | the function that returns a Promise to load CSS or other required localization resources. |

#### Returns

[`BuilderView`](react_form_builder_designer.BuilderView.md)

the View instance.

#### Inherited from

View.withCssLoader

___

### withErrorMeta

▸ **withErrorMeta**(`builderComponent`): [`BuilderView`](react_form_builder_designer.BuilderView.md)

Sets the metadata of the component that displays form's errors.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `builderComponent` | `BuilderComponent` | the metadata of the component that displays the form's errors. |

#### Returns

[`BuilderView`](react_form_builder_designer.BuilderView.md)

the instance of the [BuilderView](react_form_builder_designer.BuilderView.md) class.

___

### withTemplates

▸ **withTemplates**(`templates`): [`BuilderView`](react_form_builder_designer.BuilderView.md)

Creates metadata for the form builder for templates from the specified template names.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `templates` | `string`[] | the array of template names. |

#### Returns

[`BuilderView`](react_form_builder_designer.BuilderView.md)

the instance of the [BuilderView](react_form_builder_designer.BuilderView.md) class.

___

### withTooltipMeta

▸ **withTooltipMeta**(`builderComponent`): [`BuilderView`](react_form_builder_designer.BuilderView.md)

Sets the metadata of the component that displays the form's tooltips.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `builderComponent` | `BuilderComponent` | the metadata of the component that displays the form's tooltips. |

#### Returns

[`BuilderView`](react_form_builder_designer.BuilderView.md)

the instance of the [BuilderView](react_form_builder_designer.BuilderView.md) class.

___

### create

▸ `Static` **create**(`models`): `View`

Static wrapper for the View constructor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `models` | `Model`<`any`\>[] | the components metadata. |

#### Returns

`View`

the View instance.

#### Inherited from

View.create

___

### createTemplateComponent

▸ `Static` **createTemplateComponent**(`name`): `BuilderComponent`

Creates an instance of BuilderComponent for the specified template name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the template name |

#### Returns

`BuilderComponent`

the BuilderComponent instance.
