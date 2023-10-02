---
id: "react_form_builder_core.TypedBuilder"
title: "Class: TypedBuilder<T>"
sidebar_label: "TypedBuilder"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).TypedBuilder

The builder class to define the metadata property of the form builder component.
Used for properties where the property value can be validated.

## Type parameters

| Name |
| :------ |
| `T` |

## Hierarchy

- [`BaseBuilder`](react_form_builder_core.BaseBuilder.md)<`T`\>

  ↳ **`TypedBuilder`**

  ↳↳ [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)

  ↳↳ [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)

  ↳↳ [`ArrayBuilder`](react_form_builder_core.ArrayBuilder.md)

  ↳↳ [`QuantifierBuilder`](react_form_builder_core.QuantifierBuilder.md)

## Constructors

### constructor

• **new TypedBuilder**<`T`\>()

#### Type parameters

| Name |
| :------ |
| `T` |

#### Inherited from

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

• `get` **required**(): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`NonNullable`<`T`\>\>

Marks the component property as required.

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`NonNullable`<`T`\>\>

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

▸ **calculable**(`calculable`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Marks the component property as calculable.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `calculable` | `boolean` | true if the property is calculable. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[calculable](react_form_builder_core.BaseBuilder.md#calculable)

___

### clone

▸ **clone**(): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Clones the instance of the builder.

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the cloned instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[clone](react_form_builder_core.BaseBuilder.md#clone)

___

### default

▸ **default**(`value`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Sets the default value for the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `T` | the default value. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

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

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[getName](react_form_builder_core.BaseBuilder.md#getname)

___

### hinted

▸ **hinted**(`hint`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Adds the hint to the property name of the component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hint` | `ReactNode` | the hint. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[hinted](react_form_builder_core.BaseBuilder.md#hinted)

___

### named

▸ **named**(`name`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Specifies the name of the component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | the property name. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[named](react_form_builder_core.BaseBuilder.md#named)

___

### setup

▸ **setup**(`options`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Modifies the component property metadata builder with custom options.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | `Partial`<`Partial`<`Omit`<[`Annotation`](react_form_builder_core.Annotation.md), ``"key"``\>\> & `Pick`<[`Annotation`](react_form_builder_core.Annotation.md), ``"editor"``\> & [`BuilderOptions`](react_form_builder_core.BuilderOptions.md)\> | the custom options. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[setup](react_form_builder_core.BaseBuilder.md#setup)

___

### validated

▸ **validated**(`validator`, `errorMap`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Modifies the component property metadata builder with validation properties.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `validator` | [`RuleValidator`](../modules/react_form_builder_core.md#rulevalidator)<`T`\> | the validation function. |
| `errorMap` | [`ErrorMap`](../modules/react_form_builder_core.md#errormap) | the validation error settings. |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the modified instance of the builder.

___

### withEditorProps

▸ **withEditorProps**(`props`): [`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

Sets custom properties for the component's property editor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the custom properties |

#### Returns

[`TypedBuilder`](react_form_builder_core.TypedBuilder.md)<`T`\>

the modified instance of the builder.

#### Inherited from

[BaseBuilder](react_form_builder_core.BaseBuilder.md).[withEditorProps](react_form_builder_core.BaseBuilder.md#witheditorprops)
