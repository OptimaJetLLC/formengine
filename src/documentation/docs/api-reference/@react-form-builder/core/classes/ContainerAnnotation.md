# Class: ContainerAnnotation

Metadata for the component container property for the form builder.
The Container property of a component can contain other React components.

## Extends

- [`Annotation`](Annotation.md)

## Constructors

### new ContainerAnnotation()

> **new ContainerAnnotation**(`key`, `name`): [`ContainerAnnotation`](ContainerAnnotation.md)

Creates metadata for a React component property.

#### Parameters

• **key**: `string`

the property name.

• **name**: `string`

the human-readable property name.

#### Returns

[`ContainerAnnotation`](ContainerAnnotation.md)

#### Inherited from

[`Annotation`](Annotation.md).[`constructor`](Annotation.md#constructors)

## Properties

### bindingType?

> `readonly` `optional` **bindingType**: [`ComponentPropertyBindType`](../type-aliases/ComponentPropertyBindType.md)

The component property binding type.

#### Inherited from

[`Annotation`](Annotation.md).[`bindingType`](Annotation.md#bindingtype)

***

### calculable

> `readonly` **calculable**: `boolean` = `true`

True if the property value can be a calculated property, false otherwise.

#### Inherited from

[`Annotation`](Annotation.md).[`calculable`](Annotation.md#calculable)

***

### default?

> `readonly` `optional` **default**: `any`

The default property value.

#### Inherited from

[`Annotation`](Annotation.md).[`default`](Annotation.md#default)

***

### editor

> `readonly` **editor**: `string`

The name of the component's property editor.

#### Inherited from

[`Annotation`](Annotation.md).[`editor`](Annotation.md#editor)

***

### editorProps?

> `readonly` `optional` **editorProps**: `any`

Additional properties for the component property editor.

#### Inherited from

[`Annotation`](Annotation.md).[`editorProps`](Annotation.md#editorprops)

***

### errorMap?

> `readonly` `optional` **errorMap**: [`ErrorMap`](../type-aliases/ErrorMap.md)

Message and/or error code for the validation function.

#### Inherited from

[`Annotation`](Annotation.md).[`errorMap`](Annotation.md#errormap)

***

### hint?

> `readonly` `optional` **hint**: `ReactNode`

The hint for the component property.

#### Inherited from

[`Annotation`](Annotation.md).[`hint`](Annotation.md#hint)

***

### insertPredicate()?

> `optional` **insertPredicate**: (`self`, `child`) => `boolean`

The function that checks whether a child component can be inserted into a parent component.

#### Parameters

• **self**: [`ComponentData`](ComponentData.md)

• **child**: [`ComponentData`](ComponentData.md)

#### Returns

`boolean`

***

### key

> `readonly` **key**: `string`

The component property key.

#### Inherited from

[`Annotation`](Annotation.md).[`key`](Annotation.md#key)

***

### localizable

> `readonly` **localizable**: `boolean` = `false`

True if the property value can be localized, false otherwise.

#### Inherited from

[`Annotation`](Annotation.md).[`localizable`](Annotation.md#localizable)

***

### name

> `readonly` **name**: `string`

The component property name.

#### Inherited from

[`Annotation`](Annotation.md).[`name`](Annotation.md#name)

***

### readOnly

> `readonly` **readOnly**: `boolean` = `false`

True if the property value controls a read-only flag, false otherwise.

#### Inherited from

[`Annotation`](Annotation.md).[`readOnly`](Annotation.md#readonly)

***

### required

> `readonly` **required**: `boolean` = `false`

True if the component property is required, false otherwise.

#### Inherited from

[`Annotation`](Annotation.md).[`required`](Annotation.md#required)

***

### slotConditionBuilder()?

> `readonly` `optional` **slotConditionBuilder**: (`props`) => `string`

A function that returns a string containing the source code of the function to bind child components.

#### Parameters

• **props**: `any`

the properties of the component, which are available only inside Form Builder Designer.

#### Returns

`string`

#### Inherited from

[`Annotation`](Annotation.md).[`slotConditionBuilder`](Annotation.md#slotconditionbuilder)

***

### type?

> `readonly` `optional` **type**: keyof SchemaTypeMap

The data type for the value of the property.

#### Inherited from

[`Annotation`](Annotation.md).[`type`](Annotation.md#type)

***

### uncontrolledValue?

> `readonly` `optional` **uncontrolledValue**: `unknown`

The property value for the uncontrolled state.

#### Inherited from

[`Annotation`](Annotation.md).[`uncontrolledValue`](Annotation.md#uncontrolledvalue)

***

### validator?

> `readonly` `optional` **validator**: [`RuleValidator`](../type-aliases/RuleValidator.md)

The function for validating the property value.

#### Inherited from

[`Annotation`](Annotation.md).[`validator`](Annotation.md#validator)

***

### valued

> `readonly` **valued**: `boolean` = `false`

True if the property value is bound to form data, false otherwise.

#### Inherited from

[`Annotation`](Annotation.md).[`valued`](Annotation.md#valued)

## Methods

### clone()

> **clone**(): `any`

#### Returns

`any`

the metadata clone.

#### Inherited from

[`Annotation`](Annotation.md).[`clone`](Annotation.md#clone)
