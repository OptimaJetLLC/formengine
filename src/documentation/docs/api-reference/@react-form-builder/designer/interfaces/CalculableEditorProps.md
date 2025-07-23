# Interface: CalculableEditorProps

Represents the props used to edit a calculable property.

## Extended by

- [`AnnotationEditorProps`](AnnotationEditorProps.md)

## Properties

### disableCompute()

> **disableCompute**: () => `void`

Disables the ability to make the property computable.

#### Returns

`void`

***

### getComputeCode()

> **getComputeCode**: \<`T`\>(`type`, `params?`) => `string`

Returns the code of the computed property.

#### Type Parameters

##### T

`T` *extends* [`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

the component property value type.

#### Parameters

##### type

`T`

the component property value type.

##### params?

[`ComputeTypeParams`](../type-aliases/ComputeTypeParams.md)\<`T`\>

the parameters of the compute code.

#### Returns

`string`

the code of the computed property.

***

### getComputeType()

> **getComputeType**: () => `undefined` \| [`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

Returns the type of calculation for the property.

#### Returns

`undefined` \| [`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

***

### hasComputeCode()

> **hasComputeCode**: (`type`) => `boolean`

Returns true if the property has a compute code for the specified type, false otherwise.

#### Parameters

##### type

[`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

the compute type.

#### Returns

`boolean`

true if the property has a compute code for the specified type, false otherwise.

***

### setComputeCode()

> **setComputeCode**: \<`T`\>(`value`, `type`, `params?`) => `void`

Sets the computed property code.

#### Type Parameters

##### T

`T` *extends* [`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

the component property value type.

#### Parameters

##### value

`string`

the code of computed property.

##### type

`T`

the component property value type.

##### params?

[`ComputeTypeParams`](../type-aliases/ComputeTypeParams.md)\<`T`\>

the parameters of the compute code.

#### Returns

`void`
