# Class: BuilderView

Represents all the metadata of the form builder components.

## Extends

- [`View`](../../core/classes/View.md)

## Constructors

### Constructor

> **new BuilderView**(`builderComponents`): `BuilderView`

Creates metadata for form builder components.

#### Parameters

##### builderComponents

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)[]

the array of metadata of form builder components.

#### Returns

`BuilderView`

#### Overrides

[`View`](../../core/classes/View.md).[`constructor`](../../core/classes/View.md#constructor)

## Properties

### builderComponents

> **builderComponents**: [`BuilderComponent`](../../core/interfaces/BuilderComponent.md)[]

the array of metadata of form builder components.

## Accessors

### errors

#### Get Signature

> **get** **errors**(): `string`[]

##### Returns

`string`[]

the array of strings with the names of the component types of the error.

***

### tooltips

#### Get Signature

> **get** **tooltips**(): `string`[]

##### Returns

`string`[]

the array of strings with the names of the component types of the tooltip.

***

### viewerWrappers

#### Get Signature

> **get** **viewerWrappers**(): [`FormViewerWrapper`](../../core/type-aliases/FormViewerWrapper.md)[]

Retrieves the viewer wrappers array.

##### Returns

[`FormViewerWrapper`](../../core/type-aliases/FormViewerWrapper.md)[]

the viewer wrappers array.

#### Inherited from

[`View`](../../core/classes/View.md).[`viewerWrappers`](../../core/classes/View.md#viewerwrappers)

## Methods

### addComponent()

> **addComponent**(`component`): `void`

Adds the component metadata to the form builder.

#### Parameters

##### component

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)

the component metadata.

#### Returns

`void`

***

### all()

> **all**(): [`Model`](../../core/classes/Model.md)\<`any`\>[]

#### Returns

[`Model`](../../core/classes/Model.md)\<`any`\>[]

all component metadata for the form viewer.

#### Inherited from

[`View`](../../core/classes/View.md).[`all`](../../core/classes/View.md#all)

***

### define()

> **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

##### model

[`Model`](../../core/classes/Model.md)

the component's metadata.

#### Returns

`void`

#### Inherited from

[`View`](../../core/classes/View.md).[`define`](../../core/classes/View.md#define)

***

### find()

> **find**(`type`): `undefined` \| [`Model`](../../core/classes/Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

`undefined` \| [`Model`](../../core/classes/Model.md)\<`any`\>

the component metadata for the form viewer for the specified type or undefined.

#### Inherited from

[`View`](../../core/classes/View.md).[`find`](../../core/classes/View.md#find)

***

### findMeta()

> **findMeta**(`type`): `undefined` \| [`Meta`](../../core/classes/Meta.md)

Returns the component metadata for the specified component type name or undefined.

#### Parameters

##### type

`string`

the component type name.

#### Returns

`undefined` \| [`Meta`](../../core/classes/Meta.md)

the component metadata for the specified component type name or undefined.

***

### get()

> **get**(`type`): [`Model`](../../core/classes/Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](../../core/classes/Model.md)\<`any`\>

the component metadata for the form viewer for the specified type.

#### Inherited from

[`View`](../../core/classes/View.md).[`get`](../../core/classes/View.md#get)

***

### getCssLoaders()

> **getCssLoaders**(`biDi`): () => `Promise`\<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

##### biDi

[`BiDi`](../../core/enumerations/BiDi.md)

the BiDi object for which to retrieve the CSS loaders.

#### Returns

() => `Promise`\<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

#### Inherited from

[`View`](../../core/classes/View.md).[`getCssLoaders`](../../core/classes/View.md#getcssloaders)

***

### getErrorAnnotations()

> **getErrorAnnotations**(`name`): `undefined` \| [`Annotation`](../../core/classes/Annotation.md)[]

Returns the array of metadata properties of the error component.

#### Parameters

##### name

`string`

the name of the error component type.

#### Returns

`undefined` \| [`Annotation`](../../core/classes/Annotation.md)[]

the array of metadata properties of the error component.

***

### getMeta()

> **getMeta**(`type`): [`Meta`](../../core/classes/Meta.md)

Returns the component metadata for the specified component type name.

#### Parameters

##### type

`string`

the component type name.

#### Returns

[`Meta`](../../core/classes/Meta.md)

the component metadata for the specified component type name.

***

### getTooltipAnnotations()

> **getTooltipAnnotations**(`name`): `undefined` \| [`Annotation`](../../core/classes/Annotation.md)[]

Returns the array of metadata properties of the tooltip component.

#### Parameters

##### name

`string`

the name of the tooltip component type.

#### Returns

`undefined` \| [`Annotation`](../../core/classes/Annotation.md)[]

the array of metadata properties of the tooltip component.

***

### removeComponent()

> **removeComponent**(`name`): `void`

Removes the component metadata from the form builder.

#### Parameters

##### name

`string`

the component type name.

#### Returns

`void`

***

### withCssLoader()

> **withCssLoader**(`cssLoaderType`, `loader`): `BuilderView`

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

##### cssLoaderType

[`CssLoaderType`](../../core/type-aliases/CssLoaderType.md)

the BiDi layout type, either 'common', 'ltr', or 'rtl'.

##### loader

() => `Promise`\<`void`\>

the function that returns a Promise to load CSS or other required localization resources.

#### Returns

`BuilderView`

the [View](../../core/classes/View.md) instance.

#### Inherited from

[`View`](../../core/classes/View.md).[`withCssLoader`](../../core/classes/View.md#withcssloader)

***

### withErrorMeta()

> **withErrorMeta**(`builderComponent`): `this`

Sets the metadata of the component that displays form's errors.

#### Parameters

##### builderComponent

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)

the metadata of the component that displays the form's errors.

#### Returns

`this`

the instance of the BuilderView class.

***

### withTemplates()

> **withTemplates**(`templates`): `this`

Creates metadata for the form builder for templates from the specified template names.

#### Parameters

##### templates

`string`[]

the array of template names.

#### Returns

`this`

the instance of the BuilderView class.

***

### withTooltipMeta()

> **withTooltipMeta**(`builderComponent`): `this`

Sets the metadata of the component that displays the form's tooltips.

#### Parameters

##### builderComponent

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)

the metadata of the component that displays the form's tooltips.

#### Returns

`this`

the instance of the BuilderView class.

***

### withViewerWrapper()

> **withViewerWrapper**(`wrapper`): `BuilderView`

Adds a wrapper to the list of viewers for this viewer wrapper.

#### Parameters

##### wrapper

[`FormViewerWrapper`](../../core/type-aliases/FormViewerWrapper.md)

the viewer wrapper to be added. The wrapper is a component that wraps the form viewer.

#### Returns

`BuilderView`

the [View](../../core/classes/View.md) instance.

#### Inherited from

[`View`](../../core/classes/View.md).[`withViewerWrapper`](../../core/classes/View.md#withviewerwrapper)

***

### create()

> `static` **create**(`models`): [`View`](../../core/classes/View.md)

Static wrapper for the [View](../../core/classes/View.md) constructor.

#### Parameters

##### models

[`Model`](../../core/classes/Model.md)\<`any`\>[]

the components metadata.

#### Returns

[`View`](../../core/classes/View.md)

the [View](../../core/classes/View.md) instance.

#### Inherited from

[`View`](../../core/classes/View.md).[`create`](../../core/classes/View.md#create)

***

### createTemplateComponent()

> `static` **createTemplateComponent**(`name`): [`BuilderComponent`](../../core/interfaces/BuilderComponent.md)

Creates an instance of BuilderComponent for the specified template name.

#### Parameters

##### name

`string`

the template name

#### Returns

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)

the BuilderComponent instance.
