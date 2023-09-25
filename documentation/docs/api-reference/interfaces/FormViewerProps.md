---
id: "FormViewerProps"
title: "Interface: FormViewerProps"
sidebar_label: "FormViewerProps"
sidebar_position: 0
custom_edit_url: null
---

Form viewer React component properties.

## Properties

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

The React component that wraps every component in a form.

___

### computeChildren

• `Optional` **computeChildren**: [`ComputeChildren`](../modules.md#computechildren)

Function that calculates all child properties of a component.

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

___

### event

• `Optional` **event**: (`stream`: [`EventStream`](../classes/EventStream.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

The function for processing form events.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`EventStream`](../classes/EventStream.md) | the event stream of the form viewer. |

##### Returns

`void`

___

### externalActions

• `Optional` **externalActions**: [`ExternalActions`](../modules.md#externalactions)

External actions for the form viewer.

___

### externalValidators

• `Optional` **externalValidators**: `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules.md#schematypemap), [`ExternalValidationRules`](../modules.md#externalvalidationrules)\>\>

The set of metadata of external validation rules, grouped by the type of value being validated.

___

### formName

• `Optional` **formName**: `string`

The form name.

___

### getForm

• `Optional` **getForm**: (`name?`: `string`) => `string` \| `Promise`<`string`\>

#### Type declaration

▸ (`name?`): `string` \| `Promise`<`string`\>

Loads the form.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | the form name. |

##### Returns

`string` \| `Promise`<`string`\>

the string or Promise with the form.

___

### initialData

• `Optional` **initialData**: `Record`<`string`, `unknown`\>

The initial data of the form.

___

### language

• `Optional` **language**: [`Language`](../classes/Language.md)

The language of form.

___

### localize

• `Optional` **localize**: [`ComponentLocalizer`](../modules.md#componentlocalizer)

The function to localize the properties of a component.

___

### onDataChange

• `Optional` **onDataChange**: (`data`: [`IFormData`](IFormData.md)) => `void`

#### Type declaration

▸ (`data`): `void`

The event is called whenever a form data changes.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IFormData`](IFormData.md) | the [IFormData](IFormData.md) with all the form data. |

##### Returns

`void`

___

### view

• **view**: [`View`](../classes/View.md)

All the metadata of the components of the form viewer.

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules.md#viewmode)

Display resolution type.

___

### viewerRef

• `Optional` **viewerRef**: `ForwardedRef`<[`IFormViewer`](IFormViewer.md)\>

The reference to [IFormViewer](IFormViewer.md).
