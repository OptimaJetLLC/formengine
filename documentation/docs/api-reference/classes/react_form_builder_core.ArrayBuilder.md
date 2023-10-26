---
id: "react_form_builder_core.ArrayBuilder"
title: "Class: ArrayBuilder<T>"
sidebar_label: "ArrayBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ArrayBuilder

The builder class to define the metadata property of the form builder component.
Used for properties where the property value is an array.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the property type. |

## Hierarchy

- [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

  ↳ **`ArrayBuilder`**

## Constructors

### constructor

• **new ArrayBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[constructor](react_form_builder_core.TypedBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules/react_form_builder_core.md#preannotation)

Partial metadata for a component property.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[annotation](react_form_builder_core.TypedBuilder.md#annotation)

___

### options

• **options**: [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[options](react_form_builder_core.TypedBuilder.md#options)

___

### subType

• `Optional` **subType**: keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap)

## Accessors

### localize

• `get` **localize**(): `this`

#### Returns

`this`

the component property that can be localized.

#### Inherited from

TypedBuilder.localize

___

### notLocalize

• `get` **notLocalize**(): `this`

#### Returns

`this`

the non-localizable component property.

#### Inherited from

TypedBuilder.notLocalize

___

### ofObject

• `get` **ofObject**(): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `object`[]\>

Sets the component's value type to an array of objects.

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `object`[]\>

the modified instance of the builder.

___

### ofString

• `get` **ofString**(): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `string`[]\>

Sets the component's value type to an array of strings.

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `string`[]\>

the modified instance of the builder.

___

### required

• `get` **required**(): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`NonNullable`<`T`\>\>

the modified instance of the builder.

#### Inherited from

TypedBuilder.required

___

### valued

• `get` **valued**(): `this`

#### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

TypedBuilder.valued

## Methods

### build

▸ **build**(`key`): [`Annotation`](react_form_builder_core.Annotation.md)

Creates component property metadata for the form builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the unique key of the component property. |

#### Returns

[`Annotation`](react_form_builder_core.Annotation.md)

the instance of the component property metadata for the form builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[build](react_form_builder_core.TypedBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[calculable](react_form_builder_core.TypedBuilder.md#calculable)

___

### clone

▸ **clone**(): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[clone](react_form_builder_core.TypedBuilder.md#clone)

___

### default

▸ **default**(`value`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the default value. |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[default](react_form_builder_core.TypedBuilder.md#default)

___

### getName

▸ `Protected` **getName**(`key`): `string`

Returns the annotation name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the property name |

#### Returns

`string`

the annotation name.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[getName](react_form_builder_core.TypedBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[hinted](react_form_builder_core.TypedBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[named](react_form_builder_core.TypedBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[setup](react_form_builder_core.TypedBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules/react_form_builder_core.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules/react_form_builder_core.md#errormap) | the validation error settings. |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[validated](react_form_builder_core.TypedBuilder.md#validated)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[withEditorProps](react_form_builder_core.TypedBuilder.md#witheditorprops)
