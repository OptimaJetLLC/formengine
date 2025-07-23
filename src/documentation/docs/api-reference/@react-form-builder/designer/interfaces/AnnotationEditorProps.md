# Interface: AnnotationEditorProps

Props for the AnnotationEditor component.

## Extends

- [`CalculableEditorProps`](CalculableEditorProps.md)

## Properties

### annotation

> **annotation**: [`Annotation`](../../core/classes/Annotation.md)

Annotation editor annotation.

***

### componentData

> **componentData**: [`ComponentData`](../../core/classes/ComponentData.md)

The component data.

***

### disableCompute()

> **disableCompute**: () => `void`

Disables the ability to make the property computable.

#### Returns

`void`

#### Inherited from

[`CalculableEditorProps`](CalculableEditorProps.md).[`disableCompute`](CalculableEditorProps.md#disablecompute)

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

#### Inherited from

[`CalculableEditorProps`](CalculableEditorProps.md).[`getComputeCode`](CalculableEditorProps.md#getcomputecode)

***

### getComputeType()

> **getComputeType**: () => `undefined` \| [`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

Returns the type of calculation for the property.

#### Returns

`undefined` \| [`ComponentPropertyComputeType`](../../core/type-aliases/ComponentPropertyComputeType.md)

#### Inherited from

[`CalculableEditorProps`](CalculableEditorProps.md).[`getComputeType`](CalculableEditorProps.md#getcomputetype)

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

#### Inherited from

[`CalculableEditorProps`](CalculableEditorProps.md).[`hasComputeCode`](CalculableEditorProps.md#hascomputecode)

***

### onChange()

> **onChange**: (`value`) => `void`

Annotation editor onChange handler.

#### Parameters

##### value

`any`

#### Returns

`void`

***

### onClean()

> **onClean**: () => `void`

Annotation editor onClean handler.

#### Returns

`void`

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

#### Inherited from

[`CalculableEditorProps`](CalculableEditorProps.md).[`setComputeCode`](CalculableEditorProps.md#setcomputecode)

***

### showError()?

> `optional` **showError**: (`message?`) => `void`

Displays an error message to the user.

#### Parameters

##### message?

`string`

#### Returns

`void`

***

### value

> **value**: `any`

Annotation editor value.
