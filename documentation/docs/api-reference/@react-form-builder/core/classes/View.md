# Class: View

Represents all the metadata of the form viewer components.

## Extended by

- [`BuilderView`](BuilderView.md)
- [`BuilderView`](../../designer/classes/BuilderView.md)

## Implements

- [`IView`](../interfaces/IView.md)

## Constructors

### Constructor

> **new View**(`models?`): `View`

Creates an instance of the View.

#### Parameters

##### models?

[`Model`](Model.md)\<`any`\>[] = `[]`

the components metadata.

#### Returns

`View`

## Accessors

### viewerWrappers

#### Get Signature

> **get** **viewerWrappers**(): [`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

Retrieves the viewer wrappers array.

##### Returns

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

the viewer wrappers array.

Retrieves the viewer wrappers array.

#### Implementation of

[`IView`](../interfaces/IView.md).[`viewerWrappers`](../interfaces/IView.md#viewerwrappers)

## Methods

### all()

> **all**(): [`Model`](Model.md)\<`any`\>[]

#### Returns

[`Model`](Model.md)\<`any`\>[]

all component metadata for the form viewer.

#### Implementation of

[`IView`](../interfaces/IView.md).[`all`](../interfaces/IView.md#all)

***

### define()

> **define**(`model`): `void`

#### Parameters

##### model

[`Model`](Model.md)

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IView`](../interfaces/IView.md).[`define`](../interfaces/IView.md#define)

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

#### Implementation of

[`IView`](../interfaces/IView.md).[`filterModels`](../interfaces/IView.md#filtermodels)

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

#### Implementation of

[`IView`](../interfaces/IView.md).[`find`](../interfaces/IView.md#find)

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

#### Implementation of

[`IView`](../interfaces/IView.md).[`get`](../interfaces/IView.md#get)

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

#### Implementation of

[`IView`](../interfaces/IView.md).[`getCssLoaders`](../interfaces/IView.md#getcssloaders)

***

### withCssLoader()

> **withCssLoader**(`cssLoaderType`, `loader`): `View`

#### Parameters

##### cssLoaderType

[`CssLoaderType`](../type-aliases/CssLoaderType.md)

the BiDi layout type, either 'common', 'ltr', or 'rtl'.

##### loader

[`CssLoaderFunction`](../type-aliases/CssLoaderFunction.md)

the function that returns a Promise to load CSS or other required localization resources,
              optionally returning a cleanup function to be called on unmount.

#### Returns

`View`

the View instance.

#### Implementation of

[`IView`](../interfaces/IView.md).[`withCssLoader`](../interfaces/IView.md#withcssloader)

***

### withViewerWrapper()

> **withViewerWrapper**(`wrapper`): `View`

#### Parameters

##### wrapper

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)

the viewer wrapper to be added. The wrapper is a component that wraps the form viewer.

#### Returns

`View`

the View instance.

#### Implementation of

[`IView`](../interfaces/IView.md).[`withViewerWrapper`](../interfaces/IView.md#withviewerwrapper)

***

### create()

> `static` **create**(`models`): `View`

Static wrapper for the View constructor.

#### Parameters

##### models

[`Model`](Model.md)\<`any`\>[]

the components metadata.

#### Returns

`View`

the View instance.
