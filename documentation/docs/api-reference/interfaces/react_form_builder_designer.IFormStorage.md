---
id: "react_form_builder_designer.IFormStorage"
title: "Interface: IFormStorage"
sidebar_label: "IFormStorage"
custom_edit_url: null
---

[@react-form-builder/designer](../modules/react_form_builder_designer.md).IFormStorage

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
