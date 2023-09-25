---
id: "SomeOfBuilder"
title: "Class: SomeOfBuilder<T>"
sidebar_label: "SomeOfBuilder"
sidebar_position: 0
custom_edit_url: null
---

The builder class to define the metadata property of the form builder component.
Used for properties where the property value can be a set of predefined values.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QuantifierBuilder`](QuantifierBuilder.md)<`T`\>

  ↳ **`SomeOfBuilder`**

## Constructors

### constructor

• **new SomeOfBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[constructor](QuantifierBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules.md#preannotation)

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[annotation](QuantifierBuilder.md#annotation)

___

### labels

• `Optional` **labels**: `string`[]

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[labels](QuantifierBuilder.md#labels)

___

### options

• **options**: [`BuilderOptions`](BuilderOptions.md)

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[options](QuantifierBuilder.md#options)

___

### values

• **values**: (`string` \| `number`)[]

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[values](QuantifierBuilder.md#values)

## Accessors

### localize

• `get` **localize**(): `this`

#### Returns

`this`

the component property that can be localized.

#### Inherited from

QuantifierBuilder.localize

___

### notLocalize

• `get` **notLocalize**(): `this`

#### Returns

`this`

the non-localizable component property.

#### Inherited from

QuantifierBuilder.notLocalize

___

### required

• `get` **required**(): [`QuantifierBuilder`](QuantifierBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`QuantifierBuilder`](QuantifierBuilder.md)<`NonNullable`<`T`\>\>

the modified instance of the builder.

#### Inherited from

QuantifierBuilder.required

___

### valued

• `get` **valued**(): `this`

#### Returns

`this`

the main component property that is used as form data and for validation rules.

#### Inherited from

QuantifierBuilder.valued

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

[QuantifierBuilder](QuantifierBuilder.md).[build](QuantifierBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[calculable](QuantifierBuilder.md#calculable)

___

### clone

▸ **clone**(): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[clone](QuantifierBuilder.md#clone)

___

### default

▸ **default**(`value`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T`[] | the default value. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Overrides

[QuantifierBuilder](QuantifierBuilder.md).[default](QuantifierBuilder.md#default)

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

[QuantifierBuilder](QuantifierBuilder.md).[getName](QuantifierBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[hinted](QuantifierBuilder.md#hinted)

___

### labeled

▸ **labeled**(`...labels`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Sets the labels for predefined values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...labels` | `string`[] | the labels. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[labeled](QuantifierBuilder.md#labeled)

___

### named

▸ **named**(`name`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[named](QuantifierBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](Annotation.md), ``"editor"``\> & [`BuilderOptions`](BuilderOptions.md)\> | the custom options. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[setup](QuantifierBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules.md#errormap) | the validation error settings. |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[validated](QuantifierBuilder.md#validated)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`SomeOfBuilder`](SomeOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](QuantifierBuilder.md).[withEditorProps](QuantifierBuilder.md#witheditorprops)
