---
id: "react_form_builder_core.ContainerAn"
title: "Class: ContainerAn"
sidebar_label: "ContainerAn"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ContainerAn

Metadata for the component container property for the form builder.
The Container property of a component can contain other React components.

## Hierarchy

- [`Annotation`](react_form_builder_core.Annotation.md)

  ↳ **`ContainerAn`**

## Constructors

### constructor

• **new ContainerAn**(`key`, `name`)

Creates metadata for a React component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the property name. |
| `name` | `string` | the human-readable property name. |

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[constructor](react_form_builder_core.Annotation.md#constructor)

## Properties

### calculable

• `Readonly` **calculable**: `boolean` = `true`

True if the property value can be a calculated property, false otherwise.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[calculable](react_form_builder_core.Annotation.md#calculable)

___

### default

• `Optional` `Readonly` **default**: `any`

The default property value.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[default](react_form_builder_core.Annotation.md#default)

___

### editor

• `Readonly` **editor**: `string`

The name of the component's property editor.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[editor](react_form_builder_core.Annotation.md#editor)

___

### editorProps

• `Optional` `Readonly` **editorProps**: `any`

Additional properties for the component property editor.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[editorProps](react_form_builder_core.Annotation.md#editorprops)

___

### errorMap

• `Optional` `Readonly` **errorMap**: [`ErrorMap`](../modules/react_form_builder_core.md#errormap)

Message and/or error code for the validation function.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[errorMap](react_form_builder_core.Annotation.md#errormap)

___

### hint

• `Optional` `Readonly` **hint**: `ReactNode`

The hint for the component property.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[hint](react_form_builder_core.Annotation.md#hint)

___

### key

• `Readonly` **key**: `string`

The component property key.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[key](react_form_builder_core.Annotation.md#key)

___

### localizable

• `Readonly` **localizable**: `boolean` = `false`

True if the property value can be localized, false otherwise.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[localizable](react_form_builder_core.Annotation.md#localizable)

___

### name

• `Readonly` **name**: `string`

The component property name.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[name](react_form_builder_core.Annotation.md#name)

___

### required

• `Readonly` **required**: `boolean` = `false`

True if the component property is required, false otherwise.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[required](react_form_builder_core.Annotation.md#required)

___

### slotConditionBuilder

• `Optional` `Readonly` **slotConditionBuilder**: (`props`: `any`) => `string`

#### Type declaration

▸ (`props`): `string`

A function that returns a string containing the source code of the function to bind child components.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the properties of the component, which are available only inside Form Builder Designer. |

##### Returns

`string`

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[slotConditionBuilder](react_form_builder_core.Annotation.md#slotconditionbuilder)

___

### type

• `Optional` `Readonly` **type**: keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap)

The data type for the value of the property.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[type](react_form_builder_core.Annotation.md#type)

___

### validator

• `Optional` `Readonly` **validator**: [`RuleValidator`](../modules/react_form_builder_core.md#rulevalidator)

The function for validating the property value.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[validator](react_form_builder_core.Annotation.md#validator)

___

### valued

• `Readonly` **valued**: `boolean` = `false`

True if the property value is bound to form data, false otherwise.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[valued](react_form_builder_core.Annotation.md#valued)

## Methods

### clone

▸ **clone**(): `any`

#### Returns

`any`

the metadata clone.

#### Inherited from

[Annotation](react_form_builder_core.Annotation.md).[clone](react_form_builder_core.Annotation.md#clone)
