---
id: "form_builder.FormBuilderProps"
title: "Interface: FormBuilderProps"
sidebar_label: "FormBuilderProps"
custom_edit_url: null
---

[form-builder](../modules/form_builder.md).FormBuilderProps

## Hierarchy

- [`FormViewerProps`](fb_core.FormViewerProps.md)

  ↳ **`FormBuilderProps`**

## Properties

### actions

• `Optional` **actions**: `ActionDefinition`[]

#### Inherited from

[FormViewerProps](fb_core.FormViewerProps.md).[actions](fb_core.FormViewerProps.md#actions)

___

### componentWrapper

• `Optional` **componentWrapper**: `ComponentType`<`any`\>

#### Inherited from

[FormViewerProps](fb_core.FormViewerProps.md).[componentWrapper](fb_core.FormViewerProps.md#componentwrapper)

___

### data

• `Optional` **data**: `Record`<`string`, `unknown`\>

#### Inherited from

[FormViewerProps](fb_core.FormViewerProps.md).[data](fb_core.FormViewerProps.md#data)

___

### erroneous

• `Optional` **erroneous**: `boolean`

No use a error wrap component.

#### Inherited from

[FormViewerProps](fb_core.FormViewerProps.md).[erroneous](fb_core.FormViewerProps.md#erroneous)

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

[FormViewerProps](fb_core.FormViewerProps.md).[event](fb_core.FormViewerProps.md#event)

___

### getForm

• `Optional` **getForm**: () => [`ComponentStore`](../classes/fb_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/fb_core.ComponentStore.md)\>

#### Type declaration

▸ (): [`ComponentStore`](../classes/fb_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/fb_core.ComponentStore.md)\>

##### Returns

[`ComponentStore`](../classes/fb_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](../classes/fb_core.ComponentStore.md)\>

#### Inherited from

[FormViewerProps](fb_core.FormViewerProps.md).[getForm](fb_core.FormViewerProps.md#getform)

___

### view

• **view**: [`BuilderView`](../classes/form_builder.BuilderView.md)

#### Overrides

[FormViewerProps](fb_core.FormViewerProps.md).[view](fb_core.FormViewerProps.md#view)

___

### viewMode

• `Optional` **viewMode**: [`ViewMode`](../modules/fb_core.md#viewmode)

#### Inherited from

[FormViewerProps](fb_core.FormViewerProps.md).[viewMode](fb_core.FormViewerProps.md#viewmode)
