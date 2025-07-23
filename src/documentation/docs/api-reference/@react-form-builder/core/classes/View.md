# Class: View

Represents all the metadata of the form viewer components.

## Extended by

- [`BuilderView`](BuilderView.md)
- [`BuilderView`](../../designer/classes/BuilderView.md)

## Constructors

### Constructor

> **new View**(`models`): `View`

Creates an instance of the View.

#### Parameters

##### models

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

## Methods

### all()

> **all**(): [`Model`](Model.md)\<`any`\>[]

#### Returns

[`Model`](Model.md)\<`any`\>[]

all component metadata for the form viewer.

***

### define()

> **define**(`model`): `void`

Defines the component's metadata for the form viewer.

#### Parameters

##### model

[`Model`](Model.md)

the component's metadata.

#### Returns

`void`

***

### find()

> **find**(`type`): `undefined` \| [`Model`](Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

`undefined` \| [`Model`](Model.md)\<`any`\>

the component metadata for the form viewer for the specified type or undefined.

***

### get()

> **get**(`type`): [`Model`](Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](Model.md)\<`any`\>

the component metadata for the form viewer for the specified type.

***

### getCssLoaders()

> **getCssLoaders**(`biDi`): () => `Promise`\<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

##### biDi

[`BiDi`](../enumerations/BiDi.md)

the BiDi object for which to retrieve the CSS loaders.

#### Returns

() => `Promise`\<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

***

### withCssLoader()

> **withCssLoader**(`cssLoaderType`, `loader`): `View`

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

##### cssLoaderType

[`CssLoaderType`](../type-aliases/CssLoaderType.md)

the BiDi layout type, either 'common', 'ltr', or 'rtl'.

##### loader

() => `Promise`\<`void`\>

the function that returns a Promise to load CSS or other required localization resources.

#### Returns

`View`

the View instance.

***

### withViewerWrapper()

> **withViewerWrapper**(`wrapper`): `View`

Adds a wrapper to the list of viewers for this viewer wrapper.

#### Parameters

##### wrapper

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)

the viewer wrapper to be added. The wrapper is a component that wraps the form viewer.

#### Returns

`View`

the View instance.

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
