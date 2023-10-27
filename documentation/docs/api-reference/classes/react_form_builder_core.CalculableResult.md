---
id: "react_form_builder_core.CalculableResult"
title: "Class: CalculableResult"
sidebar_label: "CalculableResult"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).CalculableResult

Calculable result.

## Constructors

### constructor

• **new CalculableResult**(`error?`, `result?`, `exceptions?`)

Constructor.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `error` | `boolean` | `false` | the error. |
| `result?` | `any` | `undefined` | the result. |
| `exceptions?` | `Error`[] | `undefined` | the exceptions. |

## Properties

### error

• `Readonly` **error**: `boolean` = `false`

the error.

___

### exceptions

• `Optional` `Readonly` **exceptions**: `Error`[]

the exceptions.

___

### result

• `Optional` `Readonly` **result**: `any`

the result.

## Methods

### error

▸ `Static` **error**(`exceptions`): [`CalculableResult`](react_form_builder_core.CalculableResult.md)

Creates a new instance of CalculableResult class with an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exceptions` | `Error`[] | the exception array. |

#### Returns

[`CalculableResult`](react_form_builder_core.CalculableResult.md)

the new instance of CalculableResult class.

___

### success

▸ `Static` **success**(`result`): [`CalculableResult`](react_form_builder_core.CalculableResult.md)

Creates a new instance of the CalculableResult class with a successful result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | `any` | the calculable result. |

#### Returns

[`CalculableResult`](react_form_builder_core.CalculableResult.md)

the new instance of CalculableResult class.
