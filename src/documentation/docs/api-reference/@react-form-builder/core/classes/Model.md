# Class: Model\<T\>

Represents component metadata for the form viewer.

## Type Parameters

### T

`T` = `any`

the type of React component properties.

## Constructors

### Constructor

> **new Model**\<`T`\>(`component`, `name?`, `actionsInitializer?`, `valued?`, `valueType?`, `defaultProps?`, `css?`, `wrapperCss?`, `typeName?`, `kind?`, `readOnly?`, `propsBindingTypes?`, `uncontrolledValue?`, `disabled?`, `dataBindingType?`): `Model`\<`T`\>

Creates component metadata for the form viewer.

#### Parameters

##### component

`ComponentType`\<`T`\>

the React component.

##### name?

`string`

the component name.

##### actionsInitializer?

[`ActionsInitializer`](../type-aliases/ActionsInitializer.md)

the function to initialize actions in the component.

##### valued?

`string`

the name of the component property where the component value is stored.

##### valueType?

keyof SchemaTypeMap

the type of the component value.

##### defaultProps?

`Readonly`\<`Record`\<`string`, `any`\>\>

the component's default property values.

##### css?

[`Css`](../type-aliases/Css.md)

the component's CSS values.

##### wrapperCss?

[`Css`](../type-aliases/Css.md)

the component's wrapper CSS values.

##### typeName?

`string`

the component type name.

##### kind?

[`ComponentKind`](../type-aliases/ComponentKind.md) = `'component'`

the component kind.

##### readOnly?

`string`

the name of the component property that stores the read-only flag.

##### propsBindingTypes?

`Readonly`\<`Record`\<`string`, [`ComponentPropertyBindType`](../type-aliases/ComponentPropertyBindType.md)\>\> = `{}`

the component property binding types.

##### uncontrolledValue?

`unknown`

the value for the uncontrolled (undefined) state.

##### disabled?

`string`

the name of the component property that stores the disabled flag.

##### dataBindingType?

[`DataBindingType`](../type-aliases/DataBindingType.md) = `'none'`

the type of component data binding.

#### Returns

`Model`\<`T`\>

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

### dataBindingType

> `readonly` **dataBindingType**: [`DataBindingType`](../type-aliases/DataBindingType.md) = `'none'`

the type of component data binding.

***

### defaultProps?

> `readonly` `optional` **defaultProps**: `Readonly`\<`Record`\<`string`, `any`\>\>

the component's default property values.

***

### disabled?

> `readonly` `optional` **disabled**: `string`

the name of the component property that stores the disabled flag.

***

### kind

> `readonly` **kind**: [`ComponentKind`](../type-aliases/ComponentKind.md) = `'component'`

the component kind.

***

### propsBindingTypes

> `readonly` **propsBindingTypes**: `Readonly`\<`Record`\<`string`, [`ComponentPropertyBindType`](../type-aliases/ComponentPropertyBindType.md)\>\> = `{}`

the component property binding types.

***

### readOnly?

> `readonly` `optional` **readOnly**: `string`

the name of the component property that stores the read-only flag.

***

### typeName?

> `readonly` `optional` **typeName**: `string`

the component type name.

***

### uncontrolledValue?

> `readonly` `optional` **uncontrolledValue**: `unknown`

the value for the uncontrolled (undefined) state.

***

### valued?

> `readonly` `optional` **valued**: `string`

the name of the component property where the component value is stored.

***

### valueType?

> `readonly` `optional` **valueType**: keyof SchemaTypeMap

the type of the component value.

***

### wrapperCss?

> `readonly` `optional` **wrapperCss**: [`Css`](../type-aliases/Css.md)

the component's wrapper CSS values.

## Accessors

### name

#### Get Signature

> **get** **name**(): `string`

##### Returns

`string`

the component name, or type if there is no component name.

***

### type

#### Get Signature

> **get** **type**(): `string`

##### Returns

`string`

the component type name.
