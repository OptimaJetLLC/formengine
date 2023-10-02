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

• **annotation**: `Annotation`

Annotation editor annotation.

___

### componentData

• **componentData**: `ComponentData`

The component data.

___

### disableCompute

• **disableCompute**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Inherited from

[CalculableEditorProps](react_form_builder_designer.CalculableEditorProps.md).[disableCompute](react_form_builder_designer.CalculableEditorProps.md#disablecompute)

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

#### Inherited from

[CalculableEditorProps](react_form_builder_designer.CalculableEditorProps.md).[getComputeCode](react_form_builder_designer.CalculableEditorProps.md#getcomputecode)

___

### getComputeType

• **getComputeType**: () => `undefined` \| `ComponentPropertyComputeType`

#### Type declaration

▸ (): `undefined` \| `ComponentPropertyComputeType`

##### Returns

`undefined` \| `ComponentPropertyComputeType`

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
