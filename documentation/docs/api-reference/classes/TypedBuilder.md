---
id: "TypedBuilder"
title: "Class: TypedBuilder<T>"
sidebar_label: "TypedBuilder"
sidebar_position: 0
custom_edit_url: null
---

The builder class to define the metadata property of the form builder component.
Used for properties where the property value can be validated.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`BaseBuilder`](BaseBuilder.md)<`T`\>

  ↳ **`TypedBuilder`**

  ↳↳ [`ArrayBuilder`](ArrayBuilder.md)

  ↳↳ [`QuantifierBuilder`](QuantifierBuilder.md)

  ↳↳ [`ArrayBuilder`](ArrayBuilder.md)

  ↳↳ [`QuantifierBuilder`](QuantifierBuilder.md)

## Constructors

### constructor

• **new TypedBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

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

### required

• `get` **required**(): [`TypedBuilder`](TypedBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`NonNullable`<`T`\>\>

the modified instance of the builder.

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

▸ **calculable**(`calculable`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[calculable](BaseBuilder.md#calculable)

___

### clone

▸ **clone**(): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[clone](BaseBuilder.md#clone)

___

### default

▸ **default**(`value`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the default value. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

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

▸ **hinted**(`hint`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[hinted](BaseBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[named](BaseBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](Annotation.md), ``"editor"``\> & [`BuilderOptions`](BuilderOptions.md)\> | the custom options. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[setup](BaseBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules.md#errormap) | the validation error settings. |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

___

### withEditorProps

▸ **withEditorProps**(`props`): [`TypedBuilder`](TypedBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](BaseBuilder.md).[withEditorProps](BaseBuilder.md#witheditorprops)
