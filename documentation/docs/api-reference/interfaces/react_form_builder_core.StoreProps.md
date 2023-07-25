---
id: "react_form_builder_core.StoreProps"
title: "Interface: StoreProps"
sidebar_label: "StoreProps"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).StoreProps

The form viewer properties.

## Hierarchy

- **`StoreProps`**

  ↳ [`FormViewerProps`](react_form_builder_core.FormViewerProps.md)

  ↳ [`FormViewerProps`](react_form_builder_core.FormViewerProps.md)

  ↳ [`FormViewerProps`](react_form_builder_viewer.FormViewerProps.md)

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

External actions for the form viewer.

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

The React component that wraps every component in a form.

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

The initial data of the form.

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

___

### formName

• `Optional` **formName**: `string`

the form name.

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

___

### language

• `Optional` **language**: `string`

The language of form.

___

### slotWrapper

• `Optional` **slotWrapper**: `ComponentType`<`any`\>

The React component that wraps a template slot.

___

### view

• **view**: [`View`](../classes/react_form_builder_core.View.md)

All the metadata of the components of the form viewer.

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

Display resolution type.
