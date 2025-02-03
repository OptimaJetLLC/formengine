# Class: ComponentState

Calculates all the properties of the form view component.

## Constructors

### new ComponentState()

> **new ComponentState**(`data`, `store`, `localizer`, `computeChildren`): [`ComponentState`](ComponentState.md)

Creates an instance that calculates the properties of the form viewer component.

#### Parameters

• **data**: [`ComponentData`](ComponentData.md)

the data needed to display the component.

• **store**: [`Store`](Store.md)

the form viewer settings.

• **localizer**: [`ComponentStoreLocalizer`](../type-aliases/ComponentStoreLocalizer.md)

the function to localize the properties of a component, returns a Record with localized properties.

• **computeChildren**: [`ComputeChildren`](../type-aliases/ComputeChildren.md)

the function that calculates all child properties of a component.

#### Returns

[`ComponentState`](ComponentState.md)

## Properties

### computeChildren

> `readonly` **computeChildren**: [`ComputeChildren`](../type-aliases/ComputeChildren.md)

the function that calculates all child properties of a component.

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

> **get** **className**(): `object`

Calculates and returns className property.

##### Returns

`object`

the Record that contains the className property for the component.

###### className

> **className**: `string`

***

### events

#### Get Signature

> **get** **events**(): `Record`\<`string`, `Function`\>

##### Returns

`Record`\<`string`, `Function`\>

the component event handlers that send events to the event bus.

***

### get

#### Get Signature

> **get** **get**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

combined in order of priority component properties.

***

### htmlAttributes

#### Get Signature

> **get** **htmlAttributes**(): `undefined` \| [`HtmlAttribute`](../type-aliases/HtmlAttribute.md)

##### Returns

`undefined` \| [`HtmlAttribute`](../type-aliases/HtmlAttribute.md)

all arbitrary HTML attributes of the component.

***

### localizedProps

#### Get Signature

> **get** **localizedProps**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

component localized properties.

***

### propsWithoutChildren

#### Get Signature

> **get** **propsWithoutChildren**(): `Record`\<`string`, `any`\>

##### Returns

`Record`\<`string`, `any`\>

the combined properties of the components in priority order, excluding child components.

***

### readOnly

#### Get Signature

> **get** **readOnly**(): `undefined` \| `object`

##### Returns

`undefined` \| `object`

the component's read-only flag, if the component can have a read-only flag.

***

### value

#### Get Signature

> **get** **value**(): `undefined` \| `object`

##### Returns

`undefined` \| `object`

the component's field value data, if the component can have a field value.

***

### wrapperClassName

#### Get Signature

> **get** **wrapperClassName**(): `string`

Calculates and returns wrapper className property.

##### Returns

`string`

the Record that contains the className property for the wrapper of component.

## Methods

### children()

> **children**(`props`): `Record`\<`string`, `any`\>

Calculates and returns all child components.

#### Parameters

• **props**: `any`

the React component properties.

#### Returns

`Record`\<`string`, `any`\>

the Record that contains the child components of a component.
