---
id: "react_form_builder_core.FormViewerProps"
title: "Interface: FormViewerProps"
sidebar_label: "FormViewerProps"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).FormViewerProps

## Hierarchy

- [`StoreProps`](react_form_builder_core.StoreProps.md)

  ↳ **`FormViewerProps`**

  ↳↳ [`FormBuilderProps`](react_form_builder_builder.FormBuilderProps.md)

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[actions](react_form_builder_core.StoreProps.md#actions)

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[componentWrapper](react_form_builder_core.StoreProps.md#componentwrapper)

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

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

##### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `EventStream` |

##### Returns

`void`

___

### formName

• `Optional` **formName**: `string`

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[formName](react_form_builder_core.StoreProps.md#formname)

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

[StoreProps](react_form_builder_core.StoreProps.md).[getForm](react_form_builder_core.StoreProps.md#getform)

___

### slotWrapper

• `Optional` **slotWrapper**: `ComponentType`<`any`\>

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[slotWrapper](react_form_builder_core.StoreProps.md#slotwrapper)

___

### view

• **view**: [`View`](../classes/react_form_builder_core.View.md)

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[view](react_form_builder_core.StoreProps.md#view)

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode)

#### Inherited from

[StoreProps](react_form_builder_core.StoreProps.md).[viewMode](react_form_builder_core.StoreProps.md#viewmode)
