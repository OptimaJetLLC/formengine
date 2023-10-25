---
id: "react_form_builder_designer.FormBuilderProps"
title: "Interface: FormBuilderProps"
sidebar_label: "FormBuilderProps"
custom_edit_url: null
---

[@react-form-builder/designer](../modules/react_form_builder_designer.md).FormBuilderProps

Properties of the React Form builder component.

## Hierarchy

- `Omit`<[`FormViewerProps`](react_form_builder_core.FormViewerProps.md), ``"view"``\>

  ↳ **`FormBuilderProps`**

## Properties

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

The React component that wraps every component in a form.

#### Inherited from

Omit.componentWrapper

___

### computeChildren

• `Optional` **computeChildren**: [`ComputeChildren`](../modules/react_form_builder_core.md#computechildren)

Function that calculates all child properties of a component.

#### Inherited from

Omit.computeChildren

___

### erroneous

• `Optional` **erroneous**: `boolean`

If true, the component will not be wrapped by the error display component.

#### Inherited from

Omit.erroneous

___

### event

• `Optional` **event**: (`stream`: [`EventStream`](../classes/react_form_builder_core.EventStream.md)) => `void`

#### Type declaration

▸ (`stream`): `void`

The function for processing form events.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | [`EventStream`](../classes/react_form_builder_core.EventStream.md) | the event stream of the form viewer. |

##### Returns

`void`

#### Inherited from

Omit.event

___

### externalActions

• `Optional` **externalActions**: [`ExternalActions`](../modules/react_form_builder_core.md#externalactions)

External actions for the form viewer.

#### Inherited from

Omit.externalActions

___

### externalFormValidators

• `Optional` **externalFormValidators**: [`ExternalFormValidators`](../modules/react_form_builder_core.md#externalformvalidators)

The set of functions that validate the form data.

#### Inherited from

Omit.externalFormValidators

___

### externalPropertyEditors

• `Optional` **externalPropertyEditors**: `Record`<`string`, `ComponentType`<[`AnnotationEditorProps`](react_form_builder_designer.AnnotationEditorProps.md)\>\>

Custom component property editors.

___

### externalValidators

• `Optional` **externalValidators**: `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap), [`ExternalValidationRules`](../modules/react_form_builder_core.md#externalvalidationrules)\>\>

The set of metadata of external validation rules, grouped by the type of value being validated.

#### Inherited from

Omit.externalValidators

___

### formName

• `Optional` **formName**: `string`

The form name.

#### Inherited from

Omit.formName

___

### formStorage

• `Optional` **formStorage**: [`IFormStorage`](react_form_builder_designer.IFormStorage.md)

The external form storage.

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

#### Inherited from

Omit.getForm

___

### i18n

• `Optional` **i18n**: [`FormBuilderI18n`](../modules/react_form_builder_designer.md#formbuilderi18n)

The i18n data of the form builder.

___

### initialData

• `Optional` **initialData**: `Record`<`string`, `unknown`\>

The initial data of the form.

#### Inherited from

Omit.initialData

___

### language

• `Optional` **language**: [`Language`](../classes/react_form_builder_core.Language.md)

The language of form.

#### Inherited from

Omit.language

___

### localize

• `Optional` **localize**: [`ComponentLocalizer`](../modules/react_form_builder_core.md#componentlocalizer)

The function to localize the properties of a component.

#### Inherited from

Omit.localize

___

### onDataChange

• `Optional` **onDataChange**: (`data`: [`IFormData`](react_form_builder_core.IFormData.md)) => `void`

#### Type declaration

▸ (`data`): `void`

The event is called whenever a form data changes.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`IFormData`](react_form_builder_core.IFormData.md) | the IFormData with all the form data. |

##### Returns

`void`

#### Inherited from

Omit.onDataChange

___

### view

• **view**: [`BuilderView`](../classes/react_form_builder_designer.BuilderView.md)

All the metadata of the components of the form builder.

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

Display resolution type.

#### Inherited from

Omit.viewMode

___

### viewerRef

• `Optional` **viewerRef**: `ForwardedRef`<[`IFormViewer`](react_form_builder_core.IFormViewer.md)\>

The reference to [IFormViewer](react_form_builder_core.IFormViewer.md).

#### Inherited from

Omit.viewerRef
