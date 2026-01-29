# Interface: IView

Represents all the metadata of the form viewer components.

## Properties

### all()

> **all**: () => [`Model`](../classes/Model.md)\<`any`\>[]

#### Returns

[`Model`](../classes/Model.md)\<`any`\>[]

all component metadata for the form viewer.

***

### define()

> **define**: (`model`) => `void`

Defines the component's metadata for the form viewer.

#### Parameters

##### model

[`Model`](../classes/Model.md)

the component's metadata.

#### Returns

`void`

***

### filterModels()

> **filterModels**: (`predicate`) => [`Model`](../classes/Model.md)\<`any`\>[]

Returns the array of component metadata filtered using the predicate function.

#### Parameters

##### predicate

(`model`) => `boolean`

the filter function.

#### Returns

[`Model`](../classes/Model.md)\<`any`\>[]

the array of component metadata filtered using the predicate function.

***

### find()

> **find**: (`type`) => `undefined` \| [`Model`](../classes/Model.md)\<`any`\>

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

`undefined` \| [`Model`](../classes/Model.md)\<`any`\>

the component metadata for the form viewer for the specified type or undefined.

***

### get()

> **get**: (`type`) => [`Model`](../classes/Model.md)

Returns the component's metadata for the form viewer for the specified type.

#### Parameters

##### type

`string`

the component type.

#### Returns

[`Model`](../classes/Model.md)

the component metadata for the form viewer for the specified type.

***

### getCssLoaders()

> **getCssLoaders**: (`biDi`) => () => `Promise`\<`void`\>[]

Retrieves the CSS loaders for a given BiDi.

#### Parameters

##### biDi

[`BiDi`](../enumerations/BiDi.md)

the BiDi object for which to retrieve the CSS loaders.

#### Returns

() => `Promise`\<`void`\>[]

the array containing the CSS loaders for the specified BiDi.

***

### viewerWrappers

> `readonly` **viewerWrappers**: [`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)[]

Retrieves the viewer wrappers array.

#### Returns

the viewer wrappers array.

***

### withCssLoader()

> **withCssLoader**: (`cssLoaderType`, `loader`) => `this`

Applies the given CSS loader to the component based on the BiDi layout.

#### Parameters

##### cssLoaderType

[`CssLoaderType`](../type-aliases/CssLoaderType.md)

the BiDi layout type, either 'common', 'ltr', or 'rtl'.

##### loader

() => `Promise`\<`void`\>

the function that returns a Promise to load CSS or other required localization resources.

#### Returns

`this`

the [View](../classes/View.md) instance.

***

### withViewerWrapper()

> **withViewerWrapper**: (`wrapper`) => `this`

Adds a wrapper to the list of viewers for this viewer wrapper.

#### Parameters

##### wrapper

[`FormViewerWrapper`](../type-aliases/FormViewerWrapper.md)

the viewer wrapper to be added. The wrapper is a component that wraps the form viewer.

#### Returns

`this`

the [View](../classes/View.md) instance.
