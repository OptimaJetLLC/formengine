---
id: "react_form_builder_core.OneOfBuilder"
title: "Class: OneOfBuilder<T>"
sidebar_label: "OneOfBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).OneOfBuilder

The builder class to define the metadata property of the form builder component.
Used for properties where the property value can be selected from one of the predefined values.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

  ↳ **`OneOfBuilder`**

## Constructors

### constructor

• **new OneOfBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[constructor](react_form_builder_core.QuantifierBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules/react_form_builder_core.md#preannotation)

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[annotation](react_form_builder_core.QuantifierBuilder.md#annotation)

___

### labels

• `Optional` **labels**: `string`[]

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[labels](react_form_builder_core.QuantifierBuilder.md#labels)

___

### options

• **options**: [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[options](react_form_builder_core.QuantifierBuilder.md#options)

___

### values

• **values**: (`string` \| `number`)[]

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[values](react_form_builder_core.QuantifierBuilder.md#values)

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

• `get` **required**(): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`NonNullable`<`T`\>\>

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

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[build](react_form_builder_core.QuantifierBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[calculable](react_form_builder_core.QuantifierBuilder.md#calculable)

___

### clone

▸ **clone**(): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[clone](react_form_builder_core.QuantifierBuilder.md#clone)

___

### default

▸ **default**(`value`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the default value. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Overrides

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[default](react_form_builder_core.QuantifierBuilder.md#default)

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

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[getName](react_form_builder_core.QuantifierBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[hinted](react_form_builder_core.QuantifierBuilder.md#hinted)

___

### labeled

▸ **labeled**(`...labels`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Sets the labels for predefined values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...labels` | `string`[] | the labels. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[labeled](react_form_builder_core.QuantifierBuilder.md#labeled)

___

### named

▸ **named**(`name`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[named](react_form_builder_core.QuantifierBuilder.md#named)

___

### radio

▸ **radio**(): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Sets the radio buttons as the component's property editor.

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

___

### setup

▸ **setup**(`options`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[setup](react_form_builder_core.QuantifierBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules/react_form_builder_core.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules/react_form_builder_core.md#errormap) | the validation error settings. |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[validated](react_form_builder_core.QuantifierBuilder.md#validated)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[QuantifierBuilder](react_form_builder_core.QuantifierBuilder.md).[withEditorProps](react_form_builder_core.QuantifierBuilder.md#witheditorprops)
