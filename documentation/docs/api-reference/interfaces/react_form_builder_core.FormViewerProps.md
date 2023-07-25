---
id: "react_form_builder_core.FormViewerProps"
title: "Interface: FormViewerProps"
sidebar_label: "FormViewerProps"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).FormViewerProps

Form viewer React component properties.

## Hierarchy

- [`StoreProps`](react_form_builder_core.StoreProps.md)

  ↳ **`FormViewerProps`**

  ↳↳ [`FormBuilderProps`](react_form_builder_builder.FormBuilderProps.md)

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

External actions for the form viewer.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[actions](react_form_builder_core.StoreProps.md#actions)

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

The React component that wraps every component in a form.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[componentWrapper](react_form_builder_core.StoreProps.md#componentwrapper)

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

The initial data of the form.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[data](react_form_builder_core.StoreProps.md#data)

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[erroneous](react_form_builder_core.StoreProps.md#erroneous)

___

### event

• `Optional` **event**: (`stream`: `EventStream`) => `void`

#### Type declaration

▸ (`stream`): `void`

The function for processing form events.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | `EventStream` | the event stream of the form viewer. |

##### Returns

`void`

___

### formName

• `Optional` **formName**: `string`

the form name.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[formName](react_form_builder_core.StoreProps.md#formname)

___

### getForm

• `Optional` **getForm**: (`name?`: `string`) => [`PersistedForm`](react_form_builder_core.PersistedForm.md) \| `Promise`<[`PersistedForm`](react_form_builder_core.PersistedForm.md)\>

#### Type declaration

▸ (`name?`): [`PersistedForm`](react_form_builder_core.PersistedForm.md) \| `Promise`<[`PersistedForm`](react_form_builder_core.PersistedForm.md)\>

Loads the form.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | the form name. |

##### Returns

[`PersistedForm`](react_form_builder_core.PersistedForm.md) \| `Promise`<[`PersistedForm`](react_form_builder_core.PersistedForm.md)\>

the object or Promise with the form.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[getForm](react_form_builder_core.StoreProps.md#getform)

___

### language

• `Optional` **language**: `string`

The language of form.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[language](react_form_builder_core.StoreProps.md#language)

___

### slotWrapper

• `Optional` **slotWrapper**: `ComponentType`<`any`\>

The React component that wraps a template slot.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[slotWrapper](react_form_builder_core.StoreProps.md#slotwrapper)

___

### view

• **view**: [`View`](../classes/react_form_builder_core.View.md)

All the metadata of the components of the form viewer.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[view](react_form_builder_core.StoreProps.md#view)

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

Display resolution type.

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[viewMode](react_form_builder_core.StoreProps.md#viewmode)
