---
id: "BaseBuilder"
title: "Class: BaseBuilder<T>"
sidebar_label: "BaseBuilder"
sidebar_position: 0
custom_edit_url: null
---

The base builder class to define the metadata property of the form builder component.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- **`BaseBuilder`**

  ↳ [`AnnotationBuilder`](AnnotationBuilder.md)

  ↳ [`TypedBuilder`](TypedBuilder.md)

  ↳ [`AnnotationBuilder`](AnnotationBuilder.md)

  ↳ [`TypedBuilder`](TypedBuilder.md)

## Constructors

### constructor

• **new BaseBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules.md#preannotation)

___

### options

• **options**: [`BuilderOptions`](BuilderOptions.md)

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

▸ **build**(`key`): [`Annotation`](Annotation.md)

Creates component property metadata for the form builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the unique key of the component property. |

#### Returns

[`Annotation`](Annotation.md)

the instance of the component property metadata for the form builder.

___

### calculable

▸ **calculable**(`calculable`): [`BaseBuilder`](BaseBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`BaseBuilder`](BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### clone

▸ **clone**(): [`BaseBuilder`](BaseBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`BaseBuilder`](BaseBuilder.md)<`T`\>

the cloned instance of the builder.

___

### getName

▸ `Protected` **getName**(`key`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`string`

___

### hinted

▸ **hinted**(`hint`): [`BaseBuilder`](BaseBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`BaseBuilder`](BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### named

▸ **named**(`name`): [`BaseBuilder`](BaseBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`BaseBuilder`](BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### setup

▸ **setup**(`options`): [`BaseBuilder`](BaseBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](Annotation.md), ``"editor"``\> & [`BuilderOptions`](BuilderOptions.md)\> | the custom options. |

#### Returns

[`BaseBuilder`](BaseBuilder.md)<`T`\>

the modified instance of the builder.

___

### withEditorProps

▸ **withEditorProps**(`props`): [`BaseBuilder`](BaseBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`BaseBuilder`](BaseBuilder.md)<`T`\>

the modified instance of the builder.
