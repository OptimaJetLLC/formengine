# Type Alias: Options

> **Options** = `object`

Customization options for the FormBuilder component.

## Properties

### className?

> `optional` **className**: `string`

The component className.

***

### customRenderer()?

> `optional` **customRenderer**: (`defaultElement`, `component`, `props`) => `null` \| `ReactElement`

The component custom renderer.

#### Parameters

##### defaultElement

`ReactElement`

the default rendering result.

##### component

`ComponentType`\<`any`\>

the React component.

##### props

`any`

the props that were sent to the component.

#### Returns

`null` \| `ReactElement`

the customized ReactElement.

***

### hidden?

> `optional` **hidden**: `boolean`

True if you want to hide the component.

***

### style?

> `optional` **style**: `CSSProperties` \| `string`

The component style. Supported formats - CSSProperties object, standard CSS as string, nested selectors.
