---
id: "react_form_builder_core.Annotation"
title: "Class: Annotation"
sidebar_label: "Annotation"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Annotation

Basic metadata class for a React component property for the form builder.

## Hierarchy

- **`Annotation`**

  ↳ [`ContainerAn`](react_form_builder_core.ContainerAn.md)

  ↳ [`EventAn`](react_form_builder_core.EventAn.md)

  ↳ [`ModuleAn`](react_form_builder_core.ModuleAn.md)

  ↳ [`StyleAn`](react_form_builder_core.StyleAn.md)

  ↳ [`PropertyAn`](react_form_builder_core.PropertyAn.md)

  ↳ [`ContainerAn`](react_form_builder_core.ContainerAn.md)

  ↳ [`EventAn`](react_form_builder_core.EventAn.md)

  ↳ [`ModuleAn`](react_form_builder_core.ModuleAn.md)

  ↳ [`PropertyAn`](react_form_builder_core.PropertyAn.md)

  ↳ [`StyleAn`](react_form_builder_core.StyleAn.md)

## Constructors

### constructor

• **new Annotation**(`key`, `name`)

Creates metadata for a React component property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the property name. |
| `name` | `string` | the human-readable property name. |

## Properties

### calculable

• `Readonly` **calculable**: `boolean` = `true`

True if the property value can be a calculated property, false otherwise.

___

### default

• `Optional` `Readonly` **default**: `any`

The default property value.

___

### editor

• `Readonly` **editor**: `string`

The name of the component's property editor.

___

### editorProps

• `Optional` `Readonly` **editorProps**: `any`

Additional properties for the component property editor.

___

### errorMap

• `Optional` `Readonly` **errorMap**: [`ErrorMap`](../modules/react_form_builder_core.md#errormap)

Message and/or error code for the validation function.

___

### hint

• `Optional` `Readonly` **hint**: `ReactNode`

The hint for the component property.

___

### key

• `Readonly` **key**: `string`

The component property key.

___

### localizable

• `Readonly` **localizable**: `boolean` = `false`

True if the property value can be localized, false otherwise.

___

### name

• `Readonly` **name**: `string`

The component property name.

___

### required

• `Readonly` **required**: `boolean` = `false`

True if the component property is required, false otherwise.

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

___

### type

• `Optional` `Readonly` **type**: keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap)

The data type for the value of the property.

___

### validator

• `Optional` `Readonly` **validator**: [`RuleValidator`](../modules/react_form_builder_core.md#rulevalidator)

The function for validating the property value.

___

### valued

• `Readonly` **valued**: `boolean` = `false`

True if the property value is bound to form data, false otherwise.

## Methods

### clone

▸ **clone**(): `any`

#### Returns

`any`

the metadata clone.
