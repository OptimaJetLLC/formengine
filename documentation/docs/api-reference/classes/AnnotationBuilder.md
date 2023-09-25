---
id: "AnnotationBuilder"
title: "Class: AnnotationBuilder<T>"
sidebar_label: "AnnotationBuilder"
sidebar_position: 0
custom_edit_url: null
---

The builder class to define the metadata property of the form builder component.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`BaseBuilder`](BaseBuilder.md)<`T`\>

  ↳ **`AnnotationBuilder`**

## Constructors

### constructor

• **new AnnotationBuilder**<`T`\>(`editor`)

Creates a component property metadata builder.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | `string` | property editor type. |

#### Overrides

[BaseBuilder](BaseBuilder.md).[constructor](BaseBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules.md#preannotation)

#### Inherited from

[BaseBuilder](BaseBuilder.md).[annotation](BaseBuilder.md#annotation)

___

### options

• **options**: [`BuilderOptions`](BuilderOptions.md)

#### Inherited from

[BaseBuilder](BaseBuilder.md).[options](BaseBuilder.md#options)

## Accessors

### array

• `get` **array**(): [`ArrayBuilder`](ArrayBuilder.md)<`undefined` \| `T`[]\>

Sets the property as a "array" property.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`undefined` \| `T`[]\>

the instance of the metadata property builder.

___

### localize

• `get` **localize**(): `this`

#### Returns

`this`

the component property that can be localized.

#### Inherited from

BaseBuilder.localize

___

### notLocalize

• `get` **notLocalize**(): `this`

#### Returns

`this`

the non-localizable component property.

#### Inherited from

BaseBuilder.notLocalize

___

### valued

• `get` **valued**(): `this`

#### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

BaseBuilder.valued

## Methods

### build

▸ **build**(`key`): [`Annotation`](Annotation.md)

Creates component property metadata for the form builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the unique key of the component property. |

#### Returns

[`Annotation`](Annotation.md)

the instance of the component property metadata for the form builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[build](BaseBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[calculable](BaseBuilder.md#calculable)

___

### clone

▸ **clone**(): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[clone](BaseBuilder.md#clone)

___

### getName

▸ `Protected` **getName**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

#### Inherited from

[BaseBuilder](BaseBuilder.md).[getName](BaseBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[hinted](BaseBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[named](BaseBuilder.md#named)

___

### oneOf

▸ **oneOf**<`U`, `D`\>(`...values`): [`OneOfBuilder`](OneOfBuilder.md)<[`Enum`](../modules.md#enum)<`D`\>\>

Sets the property as a "single select" property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |
| `D` | extends [`U`, ...U[]] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `D` | the possible values for the property. |

#### Returns

[`OneOfBuilder`](OneOfBuilder.md)<[`Enum`](../modules.md#enum)<`D`\>\>

the instance of the metadata property builder.

___

### setup

▸ **setup**(`options`): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](Annotation.md), ``"editor"``\> & [`BuilderOptions`](BuilderOptions.md)\> | the custom options. |

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[setup](BaseBuilder.md#setup)

___

### someOf

▸ **someOf**<`U`, `D`\>(`...values`): [`SomeOfBuilder`](SomeOfBuilder.md)<[`Enum`](../modules.md#enum)<`D`\>\>

Sets the property as a "multiple select" property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | extends `string` \| `number` |
| `D` | extends [`U`, ...U[]] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...values` | `D` | the possible values for the property. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<[`Enum`](../modules.md#enum)<`D`\>\>

the instance of the metadata property builder.

___

### typed

▸ **typed**<`T`\>(`type`): [`TypedBuilder`](TypedBuilder.md)<`undefined` \| [`SchemaTypeMap`](../modules.md#schematypemap)[`T`]\>

Sets the field type for the component property.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends keyof [`SchemaTypeMap`](../modules.md#schematypemap) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | the field type. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`undefined` \| [`SchemaTypeMap`](../modules.md#schematypemap)[`T`]\>

the instance of the metadata property builder.

___

### withEditorProps

▸ **withEditorProps**(`props`): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[withEditorProps](BaseBuilder.md#witheditorprops)

___

### create

▸ `Static` **create**<`T`\>(`editor`): [`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `editor` | `string` |

#### Returns

[`AnnotationBuilder`](AnnotationBuilder.md)<`T`\>
