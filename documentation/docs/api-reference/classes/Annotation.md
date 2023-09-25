---
id: "Annotation"
title: "Class: Annotation"
sidebar_label: "Annotation"
sidebar_position: 0
custom_edit_url: null
---

Basic metadata class for a React component property for the form builder.

## Hierarchy

- **`Annotation`**

  ↳ [`ContainerAn`](ContainerAn.md)

  ↳ [`EventAn`](EventAn.md)

  ↳ [`ModuleAn`](ModuleAn.md)

  ↳ [`StyleAn`](StyleAn.md)

  ↳ [`PropertyAn`](PropertyAn.md)

  ↳ [`ContainerAn`](ContainerAn.md)

  ↳ [`EventAn`](EventAn.md)

  ↳ [`ModuleAn`](ModuleAn.md)

  ↳ [`PropertyAn`](PropertyAn.md)

  ↳ [`StyleAn`](StyleAn.md)

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

### bindConditionBuilder

• `Optional` `Readonly` **bindConditionBuilder**: (`props`: `any`) => `string`

#### Type declaration

▸ (`props`): `string`

A custom function that returns a string with a function to bind child components.

##### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `any` |

##### Returns

`string`

___

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

• `Optional` `Readonly` **errorMap**: [`ErrorMap`](../modules.md#errormap)

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

### type

• `Optional` `Readonly` **type**: keyof [`SchemaTypeMap`](../modules.md#schematypemap)

The data type for the value of the property.

___

### validator

• `Optional` `Readonly` **validator**: [`RuleValidator`](../modules.md#rulevalidator)

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
