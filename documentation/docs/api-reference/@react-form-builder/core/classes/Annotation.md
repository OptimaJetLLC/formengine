# Class: Annotation

Basic metadata class for a React component property for the form builder.

## Extended by

- [`PropertyAnnotation`](PropertyAnnotation.md)
- [`ContainerAnnotation`](ContainerAnnotation.md)
- [`EventAnnotation`](EventAnnotation.md)
- [`ModuleAnnotation`](ModuleAnnotation.md)
- [`StyleAnnotation`](StyleAnnotation.md)

## Constructors

### Constructor

> **new Annotation**(`key`, `name`): `Annotation`

Creates metadata for a React component property.

#### Parameters

##### key

`string`

the property name.

##### name

`string`

the human-readable property name.

#### Returns

`Annotation`

## Properties

### bindingType?

> `readonly` `optional` **bindingType?**: [`ComponentPropertyBindType`](../type-aliases/ComponentPropertyBindType.md)

The component property binding type.

***

### calculable

> `readonly` **calculable**: `boolean` = `true`

True if the property value can be a calculated property, false otherwise.

***

### controlsRequiredProp

> `readonly` **controlsRequiredProp**: `boolean` = `false`

True if the property value controls a required flag, false otherwise.

***

### dataBindingType

> `readonly` **dataBindingType**: [`DataBindingType`](../type-aliases/DataBindingType.md) = `'none'`

The type of component data binding.

***

### default?

> `readonly` `optional` **default?**: `any`

The default property value.

***

### disabled

> `readonly` **disabled**: `boolean` = `false`

True if the property value controls a disabled flag, false otherwise.

***

### editor

> `readonly` **editor**: `string`

The name of the component's property editor.

***

### editorProps?

> `readonly` `optional` **editorProps?**: `any`

Additional properties for the component property editor.

***

### errorMap?

> `readonly` `optional` **errorMap?**: [`ErrorMap`](../type-aliases/ErrorMap.md)

Message and/or error code for the validation function.

***

### hint?

> `readonly` `optional` **hint?**: `ReactNode`

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

### readOnly

> `readonly` **readOnly**: `boolean` = `false`

True if the property value controls a read-only flag, false otherwise.

***

### required

> `readonly` **required**: `boolean` = `false`

True if the component property is required, false otherwise.

***

### slotConditionBuilder?

> `readonly` `optional` **slotConditionBuilder?**: (`props`) => `string`

A function that returns a string containing the source code of the function to bind child components.

#### Parameters

##### props

`any`

the properties of the component, which are available only inside Form Builder Designer.

#### Returns

`string`

***

### type?

> `readonly` `optional` **type?**: keyof SchemaTypeMap

The data type for the value of the property.

***

### uncontrolledValue?

> `readonly` `optional` **uncontrolledValue?**: `unknown`

The property value for the uncontrolled state.

***

### validator?

> `readonly` `optional` **validator?**: [`RuleValidator`](../type-aliases/RuleValidator.md)

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
