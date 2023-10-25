---
id: "react_form_builder_core.CalculableTestResult"
title: "Class: CalculableTestResult"
sidebar_label: "CalculableTestResult"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).CalculableTestResult

Calculable testing result.

## Constructors

### constructor

• **new CalculableTestResult**(`error?`, `result?`, `exceptions?`)

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

▸ `Static` **error**(`exceptions`): [`CalculableTestResult`](react_form_builder_core.CalculableTestResult.md)

Creates a new instance of CalculableTestResult class with an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `exceptions` | `Error`[] | the exception array. |

#### Returns

[`CalculableTestResult`](react_form_builder_core.CalculableTestResult.md)

the new instance of CalculableTestResult class.

___

### success

▸ `Static` **success**(`result`): [`CalculableTestResult`](react_form_builder_core.CalculableTestResult.md)

Creates a new instance of the CalculableTestResult class with a successful result.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `result` | `any` | the calculable result. |

#### Returns

[`CalculableTestResult`](react_form_builder_core.CalculableTestResult.md)

the new instance of CalculableTestResult class.
