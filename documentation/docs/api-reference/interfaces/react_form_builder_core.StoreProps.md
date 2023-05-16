---
id: "react_form_builder_core.StoreProps"
title: "Interface: StoreProps"
sidebar_label: "StoreProps"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).StoreProps

## Hierarchy

- **`StoreProps`**

  ↳ [`FormViewerProps`](react_form_builder_core.FormViewerProps.md)

  ↳ [`FormViewerProps`](react_form_builder_core.FormViewerProps.md)

  ↳ [`FormViewerProps`](react_form_builder_viewer.FormViewerProps.md)

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

___

### formName

• `Optional` **formName**: `string`

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

___

### slotWrapper

• `Optional` **slotWrapper**: `ComponentType`<`any`\>

___

### view

• **view**: [`View`](../classes/react_form_builder_core.View.md)

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)
