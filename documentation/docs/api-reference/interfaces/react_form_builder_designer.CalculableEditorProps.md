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

• **getComputeCode**: <T\>(`type`: `T`, `params?`: `ComputeTypeParams`<`T`\>) => `string`

#### Type declaration

▸ <`T`\>(`type`, `params?`): `string`

Returns the code of the computed property.

##### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype) | the component property value type. |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `T` | the component property value type. |
| `params?` | `ComputeTypeParams`<`T`\> | the parameters of the compute code. |

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

### hasComputeCode

• **hasComputeCode**: (`type`: [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)) => `boolean`

#### Type declaration

▸ (`type`): `boolean`

Returns true if the property has a compute code for the specified type, false otherwise.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype) | the compute type. |

##### Returns

`boolean`

true if the property has a compute code for the specified type, false otherwise.

___

### setComputeCode

• **setComputeCode**: <T\>(`value`: `string`, `type`: `T`, `params?`: `ComputeTypeParams`<`T`\>) => `void`

#### Type declaration

▸ <`T`\>(`value`, `type`, `params?`): `void`

Sets the computed property code.

##### Type parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `T` | extends [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype) | the component property value type. |

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `string` | the code of computed property. |
| `type` | `T` | the component property value type. |
| `params?` | `ComputeTypeParams`<`T`\> | the parameters of the compute code. |

##### Returns

`void`
