# Interface: ComponentProperty\<T\>

The value of the component property.

## Type Parameters

### T

`T` = `any`

the value type.

## Properties

### computeType?

> `optional` **computeType**: [`ComponentPropertyComputeType`](../type-aliases/ComponentPropertyComputeType.md)

Type of the component's calculated property. If not specified - the value from value is used.

***

### editorType?

> `optional` **editorType**: `string`

The component property editor type, only used in Designer mode.

***

### fnSource?

> `optional` **fnSource**: `string`

Source code of the function for calculating the value of a component property.

***

### value?

> `optional` **value**: `T`

The simple value of a component property.
