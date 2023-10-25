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

Disables the ability to make the property computable.

##### Returns

`void`

___

### getComputeCode

• **getComputeCode**: (`type`: [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)) => `string`

#### Type declaration

▸ (`type`): `string`

Returns the code of the computed property.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype) | the component property value type. |

##### Returns

`string`

the code of the computed property.

___

### getComputeType

• **getComputeType**: () => `undefined` \| [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)

#### Type declaration

▸ (): `undefined` \| [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)

Returns the type of calculation for the property.

##### Returns

`undefined` \| [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)

___

### setComputeCode

• **setComputeCode**: (`value`: `string`, `type`: [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)) => `void`

#### Type declaration

▸ (`value`, `type`): `void`

Sets the computed property code.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the code of computed property. |
| `type` | [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype) | the component property value type. |

##### Returns

`void`
