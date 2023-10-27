---
id: "react_form_builder_core.FormViewerProps"
title: "Interface: FormViewerProps"
sidebar_label: "FormViewerProps"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).FormViewerProps

Form viewer React component properties.

## Properties

### actions

• `Optional` **actions**: [`CustomActions`](../modules/react_form_builder_core.md#customactions)

Custom actions for the form viewer.

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

The React component that wraps every component in a form. **Internal use only.**

___

### computeChildren

• `Optional` **computeChildren**: [`ComputeChildren`](../modules/react_form_builder_core.md#computechildren)

Function that calculates all child properties of a component. **Internal use only.**

___

### erroneous

• `Optional` **erroneous**: `boolean`

If true, the component will not be wrapped by the error display component.
**Attention! Don't use it! Unstable API.**

___

### event

• `Optional` **event**: (`stream`: [`EventStream`](../classes/react_form_builder_core.EventStream.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

The function for processing form events. **Internal use only.**

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`EventStream`](../classes/react_form_builder_core.EventStream.md) | the event stream of the form viewer. |

##### Returns

`void`

___

### formName

• `Optional` **formName**: `string`

The form name.

___

### formValidators

• `Optional` **formValidators**: [`FormValidators`](../modules/react_form_builder_core.md#formvalidators)

The set of functions that validate the form data.

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

• `Optional` **language**: [`Language`](../classes/react_form_builder_core.Language.md)

The language of form.

___

### localize

• `Optional` **localize**: [`ComponentLocalizer`](../modules/react_form_builder_core.md#componentlocalizer)

The function to localize the properties of a component.

___

### onFormDataChange

• `Optional` **onFormDataChange**: (`data`: [`IFormData`](react_form_builder_core.IFormData.md)) => `void`

#### Type declaration

▸ (`data`): `void`

The event is called whenever a form data changes.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IFormData`](react_form_builder_core.IFormData.md) | the [IFormData](react_form_builder_core.IFormData.md) with all the form data. |

##### Returns

`void`

___

### validators

• `Optional` **validators**: `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap), [`CustomValidationRules`](../modules/react_form_builder_core.md#customvalidationrules)\>\>

The set of metadata of validation rules, grouped by the type of value being validated.

___

### view

• **view**: [`View`](../classes/react_form_builder_core.View.md)

All the metadata of the components of the form viewer.

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

Display resolution type.

___

### viewerRef

• `Optional` **viewerRef**: `ForwardedRef`<[`IFormViewer`](react_form_builder_core.IFormViewer.md)\>

The reference to [IFormViewer](react_form_builder_core.IFormViewer.md).
