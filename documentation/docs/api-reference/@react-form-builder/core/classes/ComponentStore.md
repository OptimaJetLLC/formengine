# Class: ComponentStore

Component settings for serialization in JSON.

## Constructors

### new ComponentStore()

> **new ComponentStore**(`key`, `type`): [`ComponentStore`](ComponentStore.md)

Creates the component settings.

#### Parameters

• **key**: `string`

the React component key.

• **type**: `string`

the component type of the form viewer.

#### Returns

[`ComponentStore`](ComponentStore.md)

## Properties

### children?

> `optional` **children**: [`ComponentStore`](ComponentStore.md)[]

The array of child components.

***

### css?

> `optional` **css**: [`Css`](../type-aliases/Css.md)

The component CSS styles.

***

### dataKey?

> `optional` **dataKey**: `string`

The component data key.

***

### events?

> `optional` **events**: `Record`\<`string`, [`ActionData`](../type-aliases/ActionData.md)[]\>

The set of event handlers.

***

### htmlAttributes?

> `optional` **htmlAttributes**: [`HtmlAttribute`](../type-aliases/HtmlAttribute.md)[]

The set of arbitrary HTML attributes added to the component.

***

### key

> **key**: `string` = `''`

The React component key.

***

### props

> **props**: `Record`\<`string`, [`ComponentProperty`](../interfaces/ComponentProperty.md)\> = `{}`

The component properties.

***

### renderWhen?

> `optional` **renderWhen**: [`ComponentProperty`](../interfaces/ComponentProperty.md)

The expression or function to conditionally render a component.

***

### schema?

> `optional` **schema**: [`BoundValueSchema`](../type-aliases/BoundValueSchema.md)

The component value validation settings.

***

### slot?

> `optional` **slot**: `string`

The name of the occupied component property in the parent component.

***

### slotCondition?

> `optional` **slotCondition**: `string`

The condition for binding a child element to a parent element.

***

### tooltipProps?

> `optional` **tooltipProps**: `Record`\<`string`, [`ComponentProperty`](../interfaces/ComponentProperty.md)\>

The tooltip settings.

***

### type

> **type**: `string` = `''`

The component type of the form viewer.

***

### wrapperCss?

> `optional` **wrapperCss**: [`Css`](../type-aliases/Css.md)

The component wrapper CSS styles.

## Methods

### addEventHandler()

> `static` **addEventHandler**(`store`, `eventName`, `data`): `void`

Adds the event handler for component.

#### Parameters

• **store**: [`ComponentStore`](ComponentStore.md)

the target [ComponentStore](ComponentStore.md).

• **eventName**: `string`

the target event name.

• **data**: [`ActionData`](../type-aliases/ActionData.md)

the [ActionData](../type-aliases/ActionData.md).

#### Returns

`void`

***

### createFromObject()

> `static` **createFromObject**(`value`): `any`

Correctly creates the [ComponentStore](ComponentStore.md) from deserialized data.

#### Parameters

• **value**: `any`

the deserialized data.

#### Returns

`any`

the component Store.
