# Class: BuilderView

Represents all the metadata of the form builder components.

## Extends

- [`View`](View.md)

## Constructors

### new BuilderView()

> **new BuilderView**(`builderComponents`): [`BuilderView`](BuilderView.md)

Creates metadata for form builder components.

#### Parameters

• **builderComponents**: [`BuilderComponent`](../interfaces/BuilderComponent.md)[]

the array of metadata of form builder components.

#### Returns

[`BuilderView`](BuilderView.md)

#### Overrides

[`View`](View.md).[`constructor`](View.md#constructors)

## Properties

### builderComponents

> **builderComponents**: [`BuilderComponent`](../interfaces/BuilderComponent.md)[]

the array of metadata of form builder components.

## Accessors

### errors

> `get` **errors**(): `string`[]

#### Returns

`string`[]

the array of strings with the names of the component types of the error.

***

### tooltips

> `get` **tooltips**(): `string`[]

#### Returns

`string`[]

the array of strings with the names of the component types of the tooltip.

***

### viewerWrappers

> `get` **viewerWrappers**(): [`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

Retrieves the viewer wrappers array.

#### Returns

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

the viewer wrappers array.

#### Inherited from

[`View`](View.md).[`viewerWrappers`](View.md#viewerwrappers)

## Methods

### all()

> **all**(): [`Model`](Model.md)\<`any`\>[]

#### Returns

[`Model`](Model.md)\<`any`\>[]

all component metadata for the form viewer.

#### Inherited from

[`View`](View.md).[`all`](View.md#all)

***

### define()

> **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

• **model**: [`Model`](Model.md)\<`any`\>

the component's metadata.

#### Returns

`void`

#### Inherited from

[`View`](View.md).[`define`](View.md#define)

***

### find()

> **find**(`type`): `undefined` \| [`Model`](Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

• **type**: `string`

the component type.

#### Returns

`undefined` \| [`Model`](Model.md)\<`any`\>

the component metadata for the form viewer for the specified type or undefined.

#### Inherited from

[`View`](View.md).[`find`](View.md#find)

***

### findMeta()

> **findMeta**(`type`): `undefined` \| [`Meta`](Meta.md)

Returns the component metadata for the specified component type name or undefined.

#### Parameters

• **type**: `string`

the component type name.

#### Returns

`undefined` \| [`Meta`](Meta.md)

the component metadata for the specified component type name or undefined.

***

### get()

> **get**(`type`): [`Model`](Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

• **type**: `string`

the component type.

#### Returns

[`Model`](Model.md)\<`any`\>

the component metadata for the form viewer for the specified type.

#### Inherited from

[`View`](View.md).[`get`](View.md#get)

***

### getCssLoaders()

> **getCssLoaders**(`biDi`): () => `Promise`\<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

• **biDi**: [`BiDi`](../enumerations/BiDi.md)

the BiDi object for which to retrieve the CSS loaders.

#### Returns

() => `Promise`\<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

#### Inherited from

[`View`](View.md).[`getCssLoaders`](View.md#getcssloaders)

***

### getErrorAnnotations()

> **getErrorAnnotations**(`name`): `undefined` \| [`Annotation`](Annotation.md)[]

Returns the array of metadata properties of the error component.

#### Parameters

• **name**: `string`

the name of the error component type.

#### Returns

`undefined` \| [`Annotation`](Annotation.md)[]

the array of metadata properties of the error component.

***

### getMeta()

> **getMeta**(`type`): [`Meta`](Meta.md)

Returns the component metadata for the specified component type name.

#### Parameters

• **type**: `string`

the component type name.

#### Returns

[`Meta`](Meta.md)

the component metadata for the specified component type name.

***

### getTooltipAnnotations()

> **getTooltipAnnotations**(`name`): `undefined` \| [`Annotation`](Annotation.md)[]

Returns the array of metadata properties of the tooltip component.

#### Parameters

• **name**: `string`

the name of the tooltip component type.

#### Returns

`undefined` \| [`Annotation`](Annotation.md)[]

the array of metadata properties of the tooltip component.

***

### withCssLoader()

> **withCssLoader**(`cssLoaderType`, `loader`): [`BuilderView`](BuilderView.md)

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

• **cssLoaderType**: [`CssLoaderType`](../type-aliases/CssLoaderType.md)

the BiDi layout type, either 'common', 'ltr', or 'rtl'.

• **loader**

the function that returns a Promise to load CSS or other required localization resources.

#### Returns

[`BuilderView`](BuilderView.md)

the [View](View.md) instance.

#### Inherited from

[`View`](View.md).[`withCssLoader`](View.md#withcssloader)

***

### withErrorMeta()

> **withErrorMeta**(`builderComponent`): `this`

Sets the metadata of the component that displays form's errors.

#### Parameters

• **builderComponent**: [`BuilderComponent`](../interfaces/BuilderComponent.md)

the metadata of the component that displays the form's errors.

#### Returns

`this`

the instance of the [BuilderView](BuilderView.md) class.

***

### withTemplates()

> **withTemplates**(`templates`): `this`

Creates metadata for the form builder for templates from the specified template names.

#### Parameters

• **templates**: `string`[]

the array of template names.

#### Returns

`this`

the instance of the [BuilderView](BuilderView.md) class.

***

### withTooltipMeta()

> **withTooltipMeta**(`builderComponent`): `this`

Sets the metadata of the component that displays the form's tooltips.

#### Parameters

• **builderComponent**: [`BuilderComponent`](../interfaces/BuilderComponent.md)

the metadata of the component that displays the form's tooltips.

#### Returns

`this`

the instance of the [BuilderView](BuilderView.md) class.

***

### withViewerWrapper()

> **withViewerWrapper**(`wrapper`): [`BuilderView`](BuilderView.md)

Adds a wrapper to the list of viewers for this viewer wrapper.

#### Parameters

• **wrapper**: [`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)

the viewer wrapper to be added. The wrapper is a component that wraps the form viewer.

#### Returns

[`BuilderView`](BuilderView.md)

the [View](View.md) instance.

#### Inherited from

[`View`](View.md).[`withViewerWrapper`](View.md#withviewerwrapper)

***

### create()

> `static` **create**(`models`): [`View`](View.md)

Static wrapper for the [View](View.md) constructor.

#### Parameters

• **models**: [`Model`](Model.md)\<`any`\>[]

the components metadata.

#### Returns

[`View`](View.md)

the [View](View.md) instance.

#### Inherited from

[`View`](View.md).[`create`](View.md#create)

***

### createTemplateComponent()

> `static` **createTemplateComponent**(`name`): [`BuilderComponent`](../interfaces/BuilderComponent.md)

Creates an instance of BuilderComponent for the specified template name.

#### Parameters

• **name**: `string`

the template name

#### Returns

[`BuilderComponent`](../interfaces/BuilderComponent.md)

the BuilderComponent instance.
