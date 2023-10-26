---
id: "react_form_builder_core.BaseBuilder"
title: "Class: BaseBuilder<T>"
sidebar_label: "BaseBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).BaseBuilder

The base builder class to define the metadata property of the form builder component.

## Type parameters

| Name | Description |
| :------ | :------ |
| `T` | the property type. |

## Hierarchy

- **`BaseBuilder`**

  ↳ [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)

  ↳ [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)

  ↳ [`AnnotationBuilder`](react_form_builder_core.AnnotationBuilder.md)

  ↳ [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)

## Constructors

### constructor

• **new BaseBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules/react_form_builder_core.md#preannotation)

Partial metadata for a component property.

___

### options

• **options**: [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)

Options for building an annotation.

## Accessors

### localize

• `get` **localize**(): `this`

#### Returns

`this`

the component property that can be localized.

___

### notLocalize

• `get` **notLocalize**(): `this`

#### Returns

`this`

the non-localizable component property.

___

### valued

• `get` **valued**(): `this`

#### Returns

`this`

the main component property that is used as form data and for validation rules.

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

___

### calculable

▸ **calculable**(`calculable`): [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### clone

▸ **clone**(): [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

the cloned instance of the builder.

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

___

### hinted

▸ **hinted**(`hint`): [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### named

▸ **named**(`name`): [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### setup

▸ **setup**(`options`): [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### withEditorProps

▸ **withEditorProps**(`props`): [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

the modified instance of the builder.
