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

The array of metadata of form builder components.

***

### i18nDescriptions?

> `optional` **i18nDescriptions**: `Record`\<`` `${string}-${string}` ``, [`ComponentLibraryDescription`](../../core/type-aliases/ComponentLibraryDescription.md)\>[]

The description of the component library in different languages.

***

### paletteFilter()?

> `optional` **paletteFilter**: (`builderComponent`) => `boolean`

The function for filtering components on the component palette.

#### Parameters

##### builderComponent

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)

#### Returns

`boolean`

## Accessors

### viewerWrappers

#### Get Signature

> **get** **viewerWrappers**(): [`FormViewerWrapper`](../../core/type-aliases/FormViewerWrapper.md)[]

Retrieves the viewer wrappers array.

##### Returns

[`FormViewerWrapper`](../../core/type-aliases/FormViewerWrapper.md)[]

the viewer wrappers array.

Retrieves the viewer wrappers array.

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

#### Parameters

##### model

[`Model`](../../core/classes/Model.md)

#### Returns

`void`

#### Inherit Doc

#### Inherited from

[`View`](../../core/classes/View.md).[`define`](../../core/classes/View.md#define)

***

### filterModels()

> **filterModels**(`predicate`): [`Model`](../../core/classes/Model.md)\<`any`\>[]

#### Parameters

##### predicate

(`model`) => `boolean`

the filter function.

#### Returns

[`Model`](../../core/classes/Model.md)\<`any`\>[]

the array of component metadata filtered using the predicate function.

#### Inherited from

[`View`](../../core/classes/View.md).[`filterModels`](../../core/classes/View.md#filtermodels)

***

### find()

> **find**(`type`): [`Model`](../../core/classes/Model.md)\<`any`\> \| `undefined`

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](../../core/classes/Model.md)\<`any`\> \| `undefined`

the component metadata for the form viewer for the specified type or undefined.

#### Inherited from

[`View`](../../core/classes/View.md).[`find`](../../core/classes/View.md#find)

***

### findMeta()

> **findMeta**(`type`): [`Meta`](../../core/classes/Meta.md) \| `undefined`

Returns the component metadata for the specified component type name or undefined.

#### Parameters

##### type

`string`

the component type name.

#### Returns

[`Meta`](../../core/classes/Meta.md) \| `undefined`

the component metadata for the specified component type name or undefined.

***

### get()

> **get**(`type`): [`Model`](../../core/classes/Model.md)\<`any`\>

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

`Record`\<[`LanguageFullCode`](../../core/type-aliases/LanguageFullCode.md), [`ComponentLibraryDescription`](../../core/type-aliases/ComponentLibraryDescription.md)\>

the description of the component library in different languages.

#### Returns

`this`

the instance of the BuilderView class.

***

### withCssLoader()

> **withCssLoader**(`cssLoaderType`, `loader`): `BuilderView`

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
