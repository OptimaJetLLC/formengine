---
id: "react_form_builder_core.AnnotationBuilder"
title: "Class: AnnotationBuilder<T>"
sidebar_label: "AnnotationBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).AnnotationBuilder

The builder class to define the metadata property of the form builder component.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

  ↳ **`AnnotationBuilder`**

  ↳↳ [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)

  ↳↳ [`NodeAnnotationBuilder`](react_form_builder_core.NodeAnnotationBuilder.md)

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
| `editor` | `string` | the property editor type. |

#### Overrides

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[constructor](react_form_builder_core.BaseBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules/react_form_builder_core.md#preannotation)

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[annotation](react_form_builder_core.BaseBuilder.md#annotation)

___

### options

• **options**: [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[options](react_form_builder_core.BaseBuilder.md#options)

## Accessors

### array

• `get` **array**(): [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `T`[]\>

Sets the property as a "array" property.

#### Returns

[`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)<`undefined` \| `T`[]\>

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

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[build](react_form_builder_core.BaseBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[calculable](react_form_builder_core.BaseBuilder.md#calculable)

___

### clone

▸ **clone**(): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[clone](react_form_builder_core.BaseBuilder.md#clone)

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

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[getName](react_form_builder_core.BaseBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[hinted](react_form_builder_core.BaseBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[named](react_form_builder_core.BaseBuilder.md#named)

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

___

### setup

▸ **setup**(`options`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[setup](react_form_builder_core.BaseBuilder.md#setup)

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

___

### withEditorProps

▸ **withEditorProps**(`props`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[withEditorProps](react_form_builder_core.BaseBuilder.md#witheditorprops)

___

### create

▸ `Static` **create**<`T`\>(`editor`): [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

Creates a component property metadata builder.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | `string` | the property editor type. |

#### Returns

[`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)<`T`\>

the component property metadata builder.
