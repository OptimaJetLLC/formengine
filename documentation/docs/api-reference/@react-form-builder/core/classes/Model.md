# Class: Model\<T\>

Represents component metadata for the form viewer.

## Type Parameters

• **T** = `any`

the type of React component properties.

## Constructors

### new Model()

> **new Model**\<`T`\>(`component`, `name`?, `actionsInitializer`?, `valued`?, `valueType`?, `defaultProps`?, `css`?, `wrapperCss`?, `typeName`?, `icon`?, `kind`?): [`Model`](Model.md)\<`T`\>

Creates component metadata for the form viewer.

#### Parameters

• **component**: `ComponentType`\<`T`\>

the React component.

• **name?**: `string`

the component name.

• **actionsInitializer?**: [`ActionsInitializer`](../type-aliases/ActionsInitializer.md)

the function to initialize actions in the component.

• **valued?**: `string`

the name of the component property where the component value is stored.

• **valueType?**: keyof SchemaTypeMap

the type of the component value.

• **defaultProps?**: `Readonly`\<`Record`\<`string`, `any`\>\>

the component's default property values.

• **css?**: [`Css`](../type-aliases/Css.md)

the component's CSS values.

• **wrapperCss?**: [`Css`](../type-aliases/Css.md)

the component's wrapper CSS values.

• **typeName?**: `string`

the component type name.

• **icon?**: `ComponentType`

the component icon.

• **kind?**: [`ComponentKind`](../type-aliases/ComponentKind.md) = `'component'`

the component kind.

#### Returns

[`Model`](Model.md)\<`T`\>

## Properties

### actionsInitializer?

> `readonly` `optional` **actionsInitializer**: [`ActionsInitializer`](../type-aliases/ActionsInitializer.md)

the function to initialize actions in the component.

***

### component

> `readonly` **component**: `ComponentType`\<`T`\>

The React component.

***

### css?

> `readonly` `optional` **css**: [`Css`](../type-aliases/Css.md)

the component's CSS values.

***

### defaultProps?

> `readonly` `optional` **defaultProps**: `Readonly`\<`Record`\<`string`, `any`\>\>

the component's default property values.

***

### icon?

> `readonly` `optional` **icon**: `ComponentType`

the component icon.

***

### kind

> `readonly` **kind**: [`ComponentKind`](../type-aliases/ComponentKind.md) = `'component'`

the component kind.

***

### typeName?

> `readonly` `optional` **typeName**: `string`

the component type name.

***

### valueType?

> `readonly` `optional` **valueType**: keyof SchemaTypeMap

the type of the component value.

***

### valued?

> `readonly` `optional` **valued**: `string`

the name of the component property where the component value is stored.

***

### wrapperCss?

> `readonly` `optional` **wrapperCss**: [`Css`](../type-aliases/Css.md)

the component's wrapper CSS values.

## Accessors

### name

> `get` **name**(): `string`

#### Returns

`string`

the component name, or type if there is no component name.

***

### type

> `get` **type**(): `string`

#### Returns

`string`

the component type name.
