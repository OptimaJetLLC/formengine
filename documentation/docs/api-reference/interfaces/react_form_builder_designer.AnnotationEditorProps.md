---
id: "react_form_builder_designer.AnnotationEditorProps"
title: "Interface: AnnotationEditorProps"
sidebar_label: "AnnotationEditorProps"
custom_edit_url: null
---

[@react-form-builder/designer](../modules/react_form_builder_designer.md).AnnotationEditorProps

Props for the AnnotationEditor component.

## Hierarchy

- [`CalculableEditorProps`](react_form_builder_designer.CalculableEditorProps.md)

  ↳ **`AnnotationEditorProps`**

## Properties

### annotation

• **annotation**: [`Annotation`](../classes/react_form_builder_core.Annotation.md)

Annotation editor annotation.

___

### componentData

• **componentData**: [`ComponentData`](../classes/react_form_builder_core.ComponentData.md)

The component data.

___

### disableCompute

• **disableCompute**: () => `void`

#### Type declaration

▸ (): `void`

Disables the ability to make the property computable.

##### Returns

`void`

#### Inherited from

[CalculableEditorProps](react_form_builder_designer.CalculableEditorProps.md).[disableCompute](react_form_builder_designer.CalculableEditorProps.md#disablecompute)

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

#### Inherited from

[CalculableEditorProps](react_form_builder_designer.CalculableEditorProps.md).[getComputeCode](react_form_builder_designer.CalculableEditorProps.md#getcomputecode)

___

### getComputeType

• **getComputeType**: () => `undefined` \| [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)

#### Type declaration

▸ (): `undefined` \| [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)

Returns the type of calculation for the property.

##### Returns

`undefined` \| [`ComponentPropertyComputeType`](../modules/react_form_builder_core.md#componentpropertycomputetype)

#### Inherited from

[CalculableEditorProps](react_form_builder_designer.CalculableEditorProps.md).[getComputeType](react_form_builder_designer.CalculableEditorProps.md#getcomputetype)

___

### onChange

• **onChange**: (`value`: `any`) => `void`

#### Type declaration

▸ (`value`): `void`

Annotation editor onChange handler.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `any` |

##### Returns

`void`

___

### onClean

• **onClean**: () => `void`

#### Type declaration

▸ (): `void`

Annotation editor onClean handler.

##### Returns

`void`

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

#### Inherited from

[CalculableEditorProps](react_form_builder_designer.CalculableEditorProps.md).[setComputeCode](react_form_builder_designer.CalculableEditorProps.md#setcomputecode)

___

### showError

• `Optional` **showError**: (`message?`: `string`) => `void`

#### Type declaration

▸ (`message?`): `void`

Displays an error message to the user.

##### Parameters

| Name | Type |
| :------ | :------ |
| `message?` | `string` |

##### Returns

`void`

___

### value

• **value**: `any`

Annotation editor value.
