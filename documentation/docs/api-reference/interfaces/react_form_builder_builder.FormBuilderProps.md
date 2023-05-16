---
id: "react_form_builder_builder.FormBuilderProps"
title: "Interface: FormBuilderProps"
sidebar_label: "FormBuilderProps"
custom_edit_url: null
---

[@react-form-builder/builder](../modules/react_form_builder_builder.md).FormBuilderProps

## Hierarchy

- [`FormViewerProps`](react_form_builder_core.FormViewerProps.md)

  ↳ **`FormBuilderProps`**

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[actions](react_form_builder_core.FormViewerProps.md#actions)

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[componentWrapper](react_form_builder_core.FormViewerProps.md#componentwrapper)

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

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

##### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `EventStream` |

##### Returns

`void`

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[event](react_form_builder_core.FormViewerProps.md#event)

___

### formName

• `Optional` **formName**: `string`

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[formName](react_form_builder_core.FormViewerProps.md#formname)

___

### formStorage

• `Optional` **formStorage**: [`FormStorage`](react_form_builder_builder.FormStorage.md)

___

### getForm

• `Optional` **getForm**: (`name?`: `string`) => [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)\>

#### Type declaration

▸ (`name?`): [`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

##### Returns

[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/react_form_builder_core.ComponentStore.md)\>

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[getForm](react_form_builder_core.FormViewerProps.md#getform)

___

### slotWrapper

• `Optional` **slotWrapper**: `ComponentType`<`any`\>

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[slotWrapper](react_form_builder_core.FormViewerProps.md#slotwrapper)

___

### view

• **view**: `BuilderView`

#### Overrides

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[view](react_form_builder_core.FormViewerProps.md#view)

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

#### Inherited from

[FormViewerProps](react_form_builder_core.FormViewerProps.md).[viewMode](react_form_builder_core.FormViewerProps.md#viewmode)
