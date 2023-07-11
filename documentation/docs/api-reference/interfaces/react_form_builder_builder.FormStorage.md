---
id: "react_form_builder_builder.FormStorage"
title: "Interface: FormStorage"
sidebar_label: "FormStorage"
custom_edit_url: null
---

[@react-form-builder/builder](../modules/react_form_builder_builder.md).FormStorage

Interface for storing forms in an external storage.

## Properties

### getForm

• **getForm**: (`formName`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`formName`): `Promise`<`string`\>

Returns the form serialized in JSON by the form name.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formName` | `string` | the form name. |

##### Returns

`Promise`<`string`\>

the Promise with the form serialized in JSON.

___

### getFormNames

• **getFormNames**: () => `Promise`<`string`[]\>

#### Type declaration

▸ (): `Promise`<`string`[]\>

##### Returns

`Promise`<`string`[]\>

the Promise with an array of form names.

___

### removeForm

• **removeForm**: (`formName`: `string`) => `Promise`<`any`\>

#### Type declaration

▸ (`formName`): `Promise`<`any`\>

Removes the form by form name.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formName` | `string` | the form name. |

##### Returns

`Promise`<`any`\>

the Promise with the result of removal.

___

### saveForm

• **saveForm**: (`formName`: `string`, `formValue`: `string`) => `Promise`<`any`\>

#### Type declaration

▸ (`formName`, `formValue`): `Promise`<`any`\>

Saves the form serialized in JSON.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formName` | `string` | the form name. |
| `formValue` | `string` | the form serialized in JSON. |

##### Returns

`Promise`<`any`\>

the Promise with the result of saving the form.
