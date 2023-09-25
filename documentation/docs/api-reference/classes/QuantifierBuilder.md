---
id: "QuantifierBuilder"
title: "Class: QuantifierBuilder<T>"
sidebar_label: "QuantifierBuilder"
sidebar_position: 0
custom_edit_url: null
---

The abstract builder class to define the metadata property of the form builder component.
Used for properties where the property value can be selected from predefined values.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`TypedBuilder`](TypedBuilder.md)<`T`\>

  ↳ **`QuantifierBuilder`**

  ↳↳ [`OneOfBuilder`](OneOfBuilder.md)

  ↳↳ [`SomeOfBuilder`](SomeOfBuilder.md)

  ↳↳ [`OneOfBuilder`](OneOfBuilder.md)

  ↳↳ [`SomeOfBuilder`](SomeOfBuilder.md)

## Constructors

### constructor

• **new QuantifierBuilder**<`T`\>()

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

### labels

• `Optional` **labels**: `string`[]

___

### options

• **options**: [`BuilderOptions`](BuilderOptions.md)

#### Inherited from

[TypedBuilder](TypedBuilder.md).[options](TypedBuilder.md#options)

___

### values

• **values**: (`string` \| `number`)[]

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

### required

• `get` **required**(): [`QuantifierBuilder`](QuantifierBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`NonNullable`<`T`\>\>

the modified instance of the builder.

#### Overrides

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

#### Overrides

[TypedBuilder](TypedBuilder.md).[build](TypedBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[calculable](TypedBuilder.md#calculable)

___

### clone

▸ **clone**(): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[clone](TypedBuilder.md#clone)

___

### default

▸ **default**(`value`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` \| `T`[] | the default value, can be an array of values. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Overrides

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

▸ **hinted**(`hint`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[hinted](TypedBuilder.md#hinted)

___

### labeled

▸ **labeled**(`...labels`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Sets the labels for predefined values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...labels` | `string`[] | the labels. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

___

### named

▸ **named**(`name`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[named](TypedBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](Annotation.md), ``"editor"``\> & [`BuilderOptions`](BuilderOptions.md)\> | the custom options. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[setup](TypedBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules.md#errormap) | the validation error settings. |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[validated](TypedBuilder.md#validated)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](TypedBuilder.md).[withEditorProps](TypedBuilder.md#witheditorprops)
