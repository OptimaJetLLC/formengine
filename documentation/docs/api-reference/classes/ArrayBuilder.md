---
id: "ArrayBuilder"
title: "Class: ArrayBuilder<T>"
sidebar_label: "ArrayBuilder"
sidebar_position: 0
custom_edit_url: null
---

The builder class to define the metadata property of the form builder component.
Used for properties where the property value is an array.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`TypedBuilder`](TypedBuilder.md)<`T`\>

  ↳ **`ArrayBuilder`**

## Constructors

### constructor

• **new ArrayBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

[TypedBuilder](TypedBuilder.md).[constructor](TypedBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules.md#preannotation)

#### Inherited from

[TypedBuilder](TypedBuilder.md).[annotation](TypedBuilder.md#annotation)

___

### options

• **options**: [`BuilderOptions`](BuilderOptions.md)

#### Inherited from

[TypedBuilder](TypedBuilder.md).[options](TypedBuilder.md#options)

___

### subType

• `Optional` **subType**: keyof [`SchemaTypeMap`](../modules.md#schematypemap)

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

• `get` **ofObject**(): [`ArrayBuilder`](ArrayBuilder.md)<`undefined` \| `object`[]\>

Sets the component's value type to an array of objects.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`undefined` \| `object`[]\>

the modified instance of the builder.

___

### ofString

• `get` **ofString**(): [`ArrayBuilder`](ArrayBuilder.md)<`undefined` \| `string`[]\>

Sets the component's value type to an array of strings.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`undefined` \| `string`[]\>

the modified instance of the builder.

___

### required

• `get` **required**(): [`TypedBuilder`](TypedBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`TypedBuilder`](TypedBuilder.md)<`NonNullable`<`T`\>\>

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

[TypedBuilder](TypedBuilder.md).[build](TypedBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[calculable](TypedBuilder.md#calculable)

___

### clone

▸ **clone**(): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[clone](TypedBuilder.md#clone)

___

### default

▸ **default**(`value`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the default value. |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[default](TypedBuilder.md#default)

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

[TypedBuilder](TypedBuilder.md).[getName](TypedBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[hinted](TypedBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[named](TypedBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](Annotation.md), ``"editor"``\> & [`BuilderOptions`](BuilderOptions.md)\> | the custom options. |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[setup](TypedBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules.md#errormap) | the validation error settings. |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[validated](TypedBuilder.md#validated)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`ArrayBuilder`](ArrayBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`ArrayBuilder`](ArrayBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[withEditorProps](TypedBuilder.md#witheditorprops)
