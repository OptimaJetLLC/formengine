---
id: "react_form_builder_core.QuantifierBuilder"
title: "Class: QuantifierBuilder<T>"
sidebar_label: "QuantifierBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).QuantifierBuilder

The abstract builder class to define the metadata property of the form builder component.
Used for properties where the property value can be selected from predefined values.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

  ↳ **`QuantifierBuilder`**

  ↳↳ [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)

  ↳↳ [`SomeOfBuilder`](react_form_builder_core.SomeOfBuilder.md)

  ↳↳ [`OneOfBuilder`](react_form_builder_core.OneOfBuilder.md)

  ↳↳ [`SomeOfBuilder`](react_form_builder_core.SomeOfBuilder.md)

## Constructors

### constructor

• **new QuantifierBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[constructor](react_form_builder_core.TypedBuilder.md#constructor)

## Properties

### annotation

• **annotation**: [`PreAnnotation`](../modules/react_form_builder_core.md#preannotation)

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[annotation](react_form_builder_core.TypedBuilder.md#annotation)

___

### labels

• `Optional` **labels**: `string`[]

___

### options

• **options**: [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[options](react_form_builder_core.TypedBuilder.md#options)

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

• `get` **required**(): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`NonNullable`<`T`\>\>

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

▸ **build**(`key`): [`Annotation`](react_form_builder_core.Annotation.md)

Creates component property metadata for the form builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the unique key of the component property. |

#### Returns

[`Annotation`](react_form_builder_core.Annotation.md)

the instance of the component property metadata for the form builder.

#### Overrides

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[build](react_form_builder_core.TypedBuilder.md#build)

___

### calculable

▸ **calculable**(`calculable`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[calculable](react_form_builder_core.TypedBuilder.md#calculable)

___

### clone

▸ **clone**(): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[clone](react_form_builder_core.TypedBuilder.md#clone)

___

### default

▸ **default**(`value`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` \| `T`[] | the default value, can be an array of values. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Overrides

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[default](react_form_builder_core.TypedBuilder.md#default)

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

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[getName](react_form_builder_core.TypedBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[hinted](react_form_builder_core.TypedBuilder.md#hinted)

___

### labeled

▸ **labeled**(`...labels`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Sets the labels for predefined values.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...labels` | `string`[] | the labels. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

___

### named

▸ **named**(`name`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[named](react_form_builder_core.TypedBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[setup](react_form_builder_core.TypedBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules/react_form_builder_core.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules/react_form_builder_core.md#errormap) | the validation error settings. |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[validated](react_form_builder_core.TypedBuilder.md#validated)

___

### withEditorProps

▸ **withEditorProps**(`props`): [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[TypedBuilder](react_form_builder_core.TypedBuilder.md).[withEditorProps](react_form_builder_core.TypedBuilder.md#witheditorprops)
