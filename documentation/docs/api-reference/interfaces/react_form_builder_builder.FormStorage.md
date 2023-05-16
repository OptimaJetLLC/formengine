---
id: "react_form_builder_builder.FormStorage"
title: "Interface: FormStorage"
sidebar_label: "FormStorage"
custom_edit_url: null
---

[@react-form-builder/builder](../modules/react_form_builder_builder.md).FormStorage

## Properties

### getForm

• **getForm**: (`formName`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`formName`): `Promise`<`string`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `formName` | `string` |

##### Returns

`Promise`<`string`\>

___

### getFormNames

• **getFormNames**: () => `Promise`<`string`[]\>

#### Type declaration

▸ (): `Promise`<`string`[]\>

##### Returns

`Promise`<`string`[]\>

___

### removeForm

• **removeForm**: (`formName`: `string`) => `Promise`<`any`\>

#### Type declaration

▸ (`formName`): `Promise`<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `formName` | `string` |

##### Returns

`Promise`<`any`\>

___

### saveForm

• **saveForm**: (`formName`: `string`, `formValue`: `string`) => `Promise`<`any`\>

#### Type declaration

▸ (`formName`, `formValue`): `Promise`<`any`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `formName` | `string` |
| `formValue` | `string` |

##### Returns

`Promise`<`any`\>
