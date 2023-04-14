---
id: "fb_core.FormViewerProps"
title: "Interface: FormViewerProps"
sidebar_label: "FormViewerProps"
custom_edit_url: null
---

[fb-core](../modules/fb_core.md).FormViewerProps

## Hierarchy

- `StoreProps`

  ↳ **`FormViewerProps`**

  ↳↳ [`FormBuilderProps`](form_builder.FormBuilderProps.md)

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

#### Inherited from

StoreProps.actions

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

#### Inherited from

StoreProps.componentWrapper

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

#### Inherited from

StoreProps.data

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

#### Inherited from

StoreProps.erroneous

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

StoreProps.formName

___

### getForm

• `Optional` **getForm**: (`name?`: `string`) => [`ComponentStore`](../classes/fb_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/fb_core.ComponentStore.md)\>

#### Type declaration

▸ (`name?`): [`ComponentStore`](../classes/fb_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/fb_core.ComponentStore.md)\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `name?` | `string` |

##### Returns

[`ComponentStore`](../classes/fb_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/fb_core.ComponentStore.md)\>

#### Inherited from

StoreProps.getForm

___

### view

• **view**: [`View`](../classes/fb_core.View.md)

#### Inherited from

StoreProps.view

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/fb_core.md#viewmode)

#### Inherited from

StoreProps.viewMode
