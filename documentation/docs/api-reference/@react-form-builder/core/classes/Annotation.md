# Class: Annotation

Basic metadata class for a React component property for the form builder.

## Extended by

- [`ContainerAnnotation`](ContainerAnnotation.md)
- [`EventAnnotation`](EventAnnotation.md)
- [`ModuleAnnotation`](ModuleAnnotation.md)
- [`StyleAnnotation`](StyleAnnotation.md)
- [`PropertyAnnotation`](PropertyAnnotation.md)

## Constructors

### new Annotation()

> **new Annotation**(`key`, `name`): [`Annotation`](Annotation.md)

Creates metadata for a React component property.

#### Parameters

• **key**: `string`

the property name.

• **name**: `string`

the human-readable property name.

#### Returns

[`Annotation`](Annotation.md)

## Properties

### calculable

> `readonly` **calculable**: `boolean` = `true`

True if the property value can be a calculated property, false otherwise.

***

### default?

> `readonly` `optional` **default**: `any`

The default property value.

***

### editor

> `readonly` **editor**: `string`

The name of the component's property editor.

***

### editorProps?

> `readonly` `optional` **editorProps**: `any`

Additional properties for the component property editor.

***

### errorMap?

> `readonly` `optional` **errorMap**: [`ErrorMap`](../type-aliases/ErrorMap.md)

Message and/or error code for the validation function.

***

### hint?

> `readonly` `optional` **hint**: `ReactNode`

The hint for the component property.

***

### key

> `readonly` **key**: `string`

The component property key.

***

### localizable

> `readonly` **localizable**: `boolean` = `false`

True if the property value can be localized, false otherwise.

***

### name

> `readonly` **name**: `string`

The component property name.

***

### required

> `readonly` **required**: `boolean` = `false`

True if the component property is required, false otherwise.

***

### slotConditionBuilder()?

> `readonly` `optional` **slotConditionBuilder**: (`props`) => `string`

A function that returns a string containing the source code of the function to bind child components.

#### Parameters

• **props**: `any`

the properties of the component, which are available only inside Form Builder Designer.

#### Returns

`string`

***

### type?

> `readonly` `optional` **type**: keyof SchemaTypeMap

The data type for the value of the property.

***

### validator?

> `readonly` `optional` **validator**: [`RuleValidator`](../type-aliases/RuleValidator.md)

The function for validating the property value.

***

### valued

> `readonly` **valued**: `boolean` = `false`

True if the property value is bound to form data, false otherwise.

## Methods

### clone()

> **clone**(): `any`

#### Returns

`any`

the metadata clone.
