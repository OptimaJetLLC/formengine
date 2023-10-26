---
id: "react_form_builder_core.NodeAnnotationBuilder"
title: "Class: NodeAnnotationBuilder<T>"
sidebar_label: "NodeAnnotationBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).NodeAnnotationBuilder

The builder class to define the node metadata property.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the property type. |

## Hierarchy

- [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

  ↳ **`NodeAnnotationBuilder`**

## Constructors

### constructor

• **new NodeAnnotationBuilder**<`T`\>(`editor`)

Creates a component property metadata builder.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the property type. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | `string` | the property editor type. |

#### Overrides

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[constructor](react_form_builder_core.AnnotationBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules/react_form_builder_core.md#preannotation)

Partial metadata for a component property.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[annotation](react_form_builder_core.AnnotationBuilder.md#annotation)

___

### options

• **options**: [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)

Options for building an annotation.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[options](react_form_builder_core.AnnotationBuilder.md#options)

## Accessors

### array

• `get` **array**(): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `T`[]\>

Sets the property as a "array" property.

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `T`[]\>

the instance of the metadata property builder.

#### Inherited from

AnnotationBuilder.array

___

### localize

• `get` **localize**(): `this`

#### Returns

`this`

the component property that can be localized.

#### Inherited from

AnnotationBuilder.localize

___

### notLocalize

• `get` **notLocalize**(): `this`

#### Returns

`this`

the non-localizable component property.

#### Inherited from

AnnotationBuilder.notLocalize

___

### valued

• `get` **valued**(): `this`

#### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

AnnotationBuilder.valued

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

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[build](react_form_builder_core.AnnotationBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[calculable](react_form_builder_core.AnnotationBuilder.md#calculable)

___

### clone

▸ **clone**(): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[clone](react_form_builder_core.AnnotationBuilder.md#clone)

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

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[getName](react_form_builder_core.AnnotationBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[hinted](react_form_builder_core.AnnotationBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[named](react_form_builder_core.AnnotationBuilder.md#named)

___

### oneOf

▸ **oneOf**<`U`\>(`...values`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`U`\>

Sets the property as a "single select" property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `U`[] | the possible values for the property. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`U`\>

the instance of the metadata property builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[oneOf](react_form_builder_core.AnnotationBuilder.md#oneof)

___

### setup

▸ **setup**(`options`): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[setup](react_form_builder_core.AnnotationBuilder.md#setup)

___

### someOf

▸ **someOf**<`U`\>(`...values`): [`SomeOfBuilder`](react_form_builder_core.SomeOfBuilder.md)<`U`\>

Sets the property as a "multiple select" property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `U`[] | the possible values for the property. |

#### Returns

[`SomeOfBuilder`](react_form_builder_core.SomeOfBuilder.md)<`U`\>

the instance of the metadata property builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[someOf](react_form_builder_core.AnnotationBuilder.md#someof)

___

### typed

▸ **typed**<`T`\>(`type`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`undefined` \| [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap)[`T`]\>

Sets the field type for the component property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | the field type. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`undefined` \| [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap)[`T`]\>

the instance of the metadata property builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[typed](react_form_builder_core.AnnotationBuilder.md#typed)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[withEditorProps](react_form_builder_core.AnnotationBuilder.md#witheditorprops)

___

### withSlotConditionBuilder

▸ **withSlotConditionBuilder**(`slotConditionBuilder`): [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

Specifies a function that will create conditions that check if a child component can be bound to a parent slot.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `slotConditionBuilder` | (`props`: `any`) => `string` | the function that returns a string containing the source code of the function to bind child components. |

#### Returns

[`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)<`T`\>

the instance of the metadata property builder.

___

### create

▸ `Static` **create**<`T`\>(`editor`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Creates a component property metadata builder.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the property type. |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | `string` | the property editor type. |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the component property metadata builder.

#### Inherited from

[AnnotationBuilder](react_form_builder_core.AnnotationBuilder.md).[create](react_form_builder_core.AnnotationBuilder.md#create)
