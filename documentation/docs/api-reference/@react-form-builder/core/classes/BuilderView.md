# Class: BuilderView

Represents all the metadata of the form builder components.

## Extends

- [`View`](View.md)

## Constructors

### Constructor

> **new BuilderView**(`builderComponents`): `BuilderView`

Creates metadata for form builder components.

#### Parameters

##### builderComponents

[`BuilderComponent`](../interfaces/BuilderComponent.md)[]

the array of metadata of form builder components.

#### Returns

`BuilderView`

#### Overrides

[`View`](View.md).[`constructor`](View.md#constructor)

## Properties

### builderComponents

> **builderComponents**: [`BuilderComponent`](../interfaces/BuilderComponent.md)[]

The array of metadata of form builder components.

***

### i18nDescriptions?

> `optional` **i18nDescriptions?**: `Record`\<`` `${string}-${string}` ``, [`ComponentLibraryDescription`](../type-aliases/ComponentLibraryDescription.md)\>[]

The description of the component library in different languages.

***

### paletteFilter?

> `optional` **paletteFilter?**: (`builderComponent`) => `boolean`

The function for filtering components on the component palette.

#### Parameters

##### builderComponent

[`BuilderComponent`](../interfaces/BuilderComponent.md)

#### Returns

`boolean`

## Accessors

### viewerWrappers

#### Get Signature

> **get** **viewerWrappers**(): [`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

Retrieves the viewer wrappers array.

##### Returns

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

the viewer wrappers array.

Retrieves the viewer wrappers array.

#### Inherited from

[`View`](View.md).[`viewerWrappers`](View.md#viewerwrappers)

## Methods

### addComponent()

> **addComponent**(`component`): `void`

Adds the component metadata to the form builder.

#### Parameters

##### component

[`BuilderComponent`](../interfaces/BuilderComponent.md)

the component metadata.

#### Returns

`void`

***

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

#### Parameters

##### model

[`Model`](Model.md)

#### Returns

`void`

#### Inherit Doc

#### Inherited from

[`View`](View.md).[`define`](View.md#define)

***

### filterModels()

> **filterModels**(`predicate`): [`Model`](Model.md)\<`any`\>[]

#### Parameters

##### predicate

(`model`) => `boolean`

the filter function.

#### Returns

[`Model`](Model.md)\<`any`\>[]

the array of component metadata filtered using the predicate function.

#### Inherited from

[`View`](View.md).[`filterModels`](View.md#filtermodels)

***

### find()

> **find**(`type`): [`Model`](Model.md)\<`any`\> \| `undefined`

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](Model.md)\<`any`\> \| `undefined`

the component metadata for the form viewer for the specified type or undefined.

#### Inherited from

[`View`](View.md).[`find`](View.md#find)

***

### findMeta()

> **findMeta**(`type`): [`Meta`](Meta.md) \| `undefined`

Returns the component metadata for the specified component type name or undefined.

#### Parameters

##### type

`string`

the component type name.

#### Returns

[`Meta`](Meta.md) \| `undefined`

the component metadata for the specified component type name or undefined.

***

### get()

> **get**(`type`): [`Model`](Model.md)\<`any`\>

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](Model.md)\<`any`\>

the component metadata for the form viewer for the specified type.

#### Inherited from

[`View`](View.md).[`get`](View.md#get)

***

### getCssLoaders()

> **getCssLoaders**(`biDi`): [`CssLoaderFunction`](../type-aliases/CssLoaderFunction.md)[]

#### Parameters

##### biDi

[`BiDi`](../enumerations/BiDi.md)

the BiDi object for which to retrieve the CSS loaders.

#### Returns

[`CssLoaderFunction`](../type-aliases/CssLoaderFunction.md)[]

the array containing the CSS loaders for the specified BiDi.

#### Inherited from

[`View`](View.md).[`getCssLoaders`](View.md#getcssloaders)

***

### getMeta()

> **getMeta**(`type`): [`Meta`](Meta.md)

Returns the component metadata for the specified component type name.

#### Parameters

##### type

`string`

the component type name.

#### Returns

[`Meta`](Meta.md)

the component metadata for the specified component type name.

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

### withComponentLibraryDescription()

> **withComponentLibraryDescription**(`i18nDescription`): `this`

Adds a description of the component library in different languages.

#### Parameters

##### i18nDescription

`Record`\<[`LanguageFullCode`](../type-aliases/LanguageFullCode.md), [`ComponentLibraryDescription`](../type-aliases/ComponentLibraryDescription.md)\>

the description of the component library in different languages.

#### Returns

`this`

the instance of the BuilderView class.

***

### withCssLoader()

> **withCssLoader**(`cssLoaderType`, `loader`): `BuilderView`

#### Parameters

##### cssLoaderType

[`CssLoaderType`](../type-aliases/CssLoaderType.md)

the BiDi layout type, either 'common', 'ltr', or 'rtl'.

##### loader

[`CssLoaderFunction`](../type-aliases/CssLoaderFunction.md)

the function that returns a Promise to load CSS or other required localization resources,
              optionally returning a cleanup function to be called on unmount.

#### Returns

`BuilderView`

the [View](View.md) instance.

#### Inherited from

[`View`](View.md).[`withCssLoader`](View.md#withcssloader)

***

### withPaletteFilter()

> **withPaletteFilter**(`filter`): `this`

Sets a function for filtering components on the component palette.

#### Parameters

##### filter

(`builderComponent`) => `boolean`

the component filtering function.

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

### withViewerWrapper()

> **withViewerWrapper**(`wrapper`): `BuilderView`

#### Parameters

##### wrapper

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)

the viewer wrapper to be added. The wrapper is a component that wraps the form viewer.

#### Returns

`BuilderView`

the [View](View.md) instance.

#### Inherited from

[`View`](View.md).[`withViewerWrapper`](View.md#withviewerwrapper)

***

### create()

> `static` **create**(`models`): [`View`](View.md)

Static wrapper for the [View](View.md) constructor.

#### Parameters

##### models

[`Model`](Model.md)\<`any`\>[]

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

##### name

`string`

the template name

#### Returns

[`BuilderComponent`](../interfaces/BuilderComponent.md)

the BuilderComponent instance.
