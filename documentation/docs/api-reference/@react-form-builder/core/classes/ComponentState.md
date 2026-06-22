# Class: ComponentState

Calculates all the properties of the form view component.

## Implements

- [`IComponentState`](../interfaces/IComponentState.md)

## Constructors

### Constructor

> **new ComponentState**(`data`, `store`, `localizer`, `computeChildren`, `context?`): `ComponentState`

Creates an instance that calculates the properties of the form viewer component.

#### Parameters

##### data

[`ComponentData`](ComponentData.md)

the data needed to display the component.

##### store

[`Store`](Store.md)

the form viewer settings.

##### localizer

[`ComponentStoreLocalizer`](../type-aliases/ComponentStoreLocalizer.md)

the function to localize the properties of a component, returns a Record with localized properties.

##### computeChildren

[`ComputeChildren`](../type-aliases/ComputeChildren.md)

the function that calculates all child properties of a component.

##### context?

[`ComponentPropertiesContext`](../type-aliases/ComponentPropertiesContext.md)

the context for working with component properties.

#### Returns

`ComponentState`

## Properties

### computeChildren

> `readonly` **computeChildren**: [`ComputeChildren`](../type-aliases/ComputeChildren.md)

the function that calculates all child properties of a component.

***

### context

> `readonly` **context**: [`ComponentPropertiesContext`](../type-aliases/ComponentPropertiesContext.md)

The context for working with component properties.

***

### data

> `readonly` **data**: [`ComponentData`](ComponentData.md)

the data needed to display the component.

***

### localizer

> `readonly` **localizer**: [`ComponentStoreLocalizer`](../type-aliases/ComponentStoreLocalizer.md)

the function to localize the properties of a component, returns a Record with localized properties.

***

### store

> `readonly` **store**: [`Store`](Store.md)

the form viewer settings.

## Accessors

### calculatedProps

#### Get Signature

> **get** **calculatedProps**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

the values for all properties of the component, calculates the values of the calculated properties.

***

### className

#### Get Signature

> **get** **className**(): `string`

Calculates and returns className property.

##### Returns

`string`

the Record that contains the className property for the component.

***

### disabled

#### Get Signature

> **get** **disabled**(): \{[`key`: `string`]: `any`; \} \| `undefined`

##### Returns

\{[`key`: `string`]: `any`; \} \| `undefined`

the disabled property of a component if the component has a disabled flag.

***

### events

#### Get Signature

> **get** **events**(): `Record`\<`string`, (...`args`) => `Promise`\<`void`\>\>

##### Returns

`Record`\<`string`, (...`args`) => `Promise`\<`void`\>\>

the component event handlers that send events to the event bus.

***

### flatCss

#### Get Signature

> **get** **flatCss**(): `string`

##### Returns

`string`

the flattened CSS for the component.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`flatCss`](../interfaces/IComponentState.md#flatcss)

***

### flatWrapperCss

#### Get Signature

> **get** **flatWrapperCss**(): `string`

##### Returns

`string`

the flattened CSS for the component wrapper.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`flatWrapperCss`](../interfaces/IComponentState.md#flatwrappercss)

***

### get

#### Get Signature

> **get** **get**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

combined in order of priority component properties.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`get`](../interfaces/IComponentState.md#get)

***

### htmlAttributes

#### Get Signature

> **get** **htmlAttributes**(): [`HtmlAttribute`](../type-aliases/HtmlAttribute.md) \| `undefined`

##### Returns

[`HtmlAttribute`](../type-aliases/HtmlAttribute.md) \| `undefined`

all arbitrary HTML attributes of the component.

***

### isDisabled

#### Get Signature

> **get** **isDisabled**(): `any`

##### Returns

`any`

true if the component is disabled, false otherwise.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`isDisabled`](../interfaces/IComponentState.md#isdisabled)

***

### isReadOnly

#### Get Signature

> **get** **isReadOnly**(): `any`

##### Returns

`any`

true if the component is read-only, false otherwise.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`isReadOnly`](../interfaces/IComponentState.md#isreadonly)

***

### localizedProps

#### Get Signature

> **get** **localizedProps**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

component localized properties.

***

### ownProps

#### Get Signature

> **get** **ownProps**(): `object`

##### Returns

`object`

combined in order of priority component properties without children props.

###### className

> **className**: `string`

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`ownProps`](../interfaces/IComponentState.md#ownprops)

***

### propsWithoutChildren

#### Get Signature

> **get** **propsWithoutChildren**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

combined component properties in order of priority, excluding child components, the className property
does not contain styles additionally defined for the component.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`propsWithoutChildren`](../interfaces/IComponentState.md#propswithoutchildren)

***

### readOnly

#### Get Signature

> **get** **readOnly**(): \{[`key`: `string`]: `any`; \} \| `undefined`

##### Returns

\{[`key`: `string`]: `any`; \} \| `undefined`

the read-only property of a component if the component has a read-only flag.

***

### required

#### Get Signature

> **get** **required**(): `Record`\<`string`, `boolean`\> \| `undefined`

##### Returns

`Record`\<`string`, `boolean`\> \| `undefined`

the required property of a component if the component has a required flag.

***

### style

#### Get Signature

> **get** **style**(): \{ `style`: `any`; \} \| `undefined`

##### Returns

\{ `style`: `any`; \} \| `undefined`

the Record that contains the style property for the component.

***

### value

#### Get Signature

> **get** **value**(): \{[`key`: `string`]: `unknown`; \} \| `undefined`

##### Returns

\{[`key`: `string`]: `unknown`; \} \| `undefined`

the component's field value data, if the component can have a field value.

***

### wrapperClassName

#### Get Signature

> **get** **wrapperClassName**(): `string`

Calculates and returns wrapper className property.

##### Returns

`string`

the className for the wrapper of component.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`wrapperClassName`](../interfaces/IComponentState.md#wrapperclassname)

***

### wrapperStyle

#### Get Signature

> **get** **wrapperStyle**(): \{ `style`: `any`; \} \| `undefined`

##### Returns

\{ `style`: `any`; \} \| `undefined`

the Record that contains the style property for the wrapper of component.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`wrapperStyle`](../interfaces/IComponentState.md#wrapperstyle)

## Methods

### applyStyles()

> **applyStyles**(`cssPart`, `flatCss`): `void`

Apply styles to the document.

#### Parameters

##### cssPart

[`CssPart`](../type-aliases/CssPart.md)

the CSS part to apply.

##### flatCss

`string`

the flattened CSS.

#### Returns

`void`

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`applyStyles`](../interfaces/IComponentState.md#applystyles)

***

### children()

> **children**(`props`): `Record`\<`string`, `any`\>

Calculates and returns all child components.

#### Parameters

##### props

`any`

the React component properties.

#### Returns

`Record`\<`string`, `any`\>

the Record that contains the child components of a component.

***

### getRefValue()

> **getRefValue**(): `any`

#### Returns

`any`

the object associated with this component in the viewer.

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`getRefValue`](../interfaces/IComponentState.md#getrefvalue)

***

### onDidMount()

> **onDidMount**(): `void`

The method that is called when the component is mounted.

#### Returns

`void`

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`onDidMount`](../interfaces/IComponentState.md#ondidmount)

***

### onWillUnmount()

> **onWillUnmount**(): `void`

The method that is called when the component is unmounted.

#### Returns

`void`

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`onWillUnmount`](../interfaces/IComponentState.md#onwillunmount)

***

### setRef()

> **setRef**(`object`): `void`

#### Parameters

##### object

`any`

#### Returns

`void`

#### Inherit Doc

#### Implementation of

[`IComponentState`](../interfaces/IComponentState.md).[`setRef`](../interfaces/IComponentState.md#setref)
