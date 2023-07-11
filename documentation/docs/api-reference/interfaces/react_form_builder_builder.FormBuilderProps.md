---
id: "react_form_builder_builder.FormBuilderProps"
title: "Interface: FormBuilderProps"
sidebar_label: "FormBuilderProps"
custom_edit_url: null
---

[@react-form-builder/builder](../modules/react_form_builder_builder.md).FormBuilderProps

Properties of the React Form builder component.

## Hierarchy

- [`FormViewerProps`](react_form_builder_core.FormViewerProps.md)

  ↳ **`FormBuilderProps`**

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

External actions for the form viewer.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[actions](react_form_builder_core.FormViewerProps.md#actions)

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

The React component that wraps every component in a form.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[componentWrapper](react_form_builder_core.FormViewerProps.md#componentwrapper)

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

The initial data of the form.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[data](react_form_builder_core.FormViewerProps.md#data)

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[erroneous](react_form_builder_core.FormViewerProps.md#erroneous)

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

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[event](react_form_builder_core.FormViewerProps.md#event)

___

### formName

• `Optional` **formName**: `string`

the form name.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[formName](react_form_builder_core.FormViewerProps.md#formname)

___

### formStorage

• `Optional` **formStorage**: [`FormStorage`](react_form_builder_builder.FormStorage.md)

The external form storage.

___

### getForm

• `Optional` **getForm**: (`name?`: `string`) => [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)\>

#### Type declaration

▸ (`name?`): [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)\>

Loads the form.

##### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name?` | `string` | the form name. |

##### Returns

[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)\>

the object or Promise with the form.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[getForm](react_form_builder_core.FormViewerProps.md#getform)

___

### slotWrapper

• `Optional` **slotWrapper**: `ComponentType`<`any`\>

The React component that wraps a template slot.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[slotWrapper](react_form_builder_core.FormViewerProps.md#slotwrapper)

___

### view

• **view**: `BuilderView`

All the metadata of the components of the form builder.

#### Overrides

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[view](react_form_builder_core.FormViewerProps.md#view)

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

Display resolution type.

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[viewMode](react_form_builder_core.FormViewerProps.md#viewmode)
