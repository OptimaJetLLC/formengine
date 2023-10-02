---
id: "react_form_builder_designer.CalculableEditorProps"
title: "Interface: CalculableEditorProps"
sidebar_label: "CalculableEditorProps"
custom_edit_url: null
---

[@react-form-builder/designer](../modules/react_form_builder_designer.md).CalculableEditorProps

Represents the props used to edit a calculable property.

## Hierarchy

- **`CalculableEditorProps`**

  ↳ [`AnnotationEditorProps`](react_form_builder_designer.AnnotationEditorProps.md)

  ↳ [`AnnotationEditorProps`](react_form_builder_designer.AnnotationEditorProps.md)

## Properties

### disableCompute

• **disableCompute**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

___

### getComputeCode

• **getComputeCode**: (`type`: `ComponentPropertyComputeType`) => `string`

#### Type declaration

▸ (`type`): `string`

##### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `ComponentPropertyComputeType` |

##### Returns

`string`

___

### getComputeType

• **getComputeType**: () => `undefined` \| `ComponentPropertyComputeType`

#### Type declaration

▸ (): `undefined` \| `ComponentPropertyComputeType`

##### Returns

`undefined` \| `ComponentPropertyComputeType`

___

### setComputeCode

• **setComputeCode**: (`value`: `string`, `type`: `ComponentPropertyComputeType`) => `void`

#### Type declaration

▸ (`value`, `type`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `type` | `ComponentPropertyComputeType` |

##### Returns

`void`
