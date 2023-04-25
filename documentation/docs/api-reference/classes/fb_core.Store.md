---
id: "fb_core.Store"
title: "Class: Store"
sidebar_label: "Store"
custom_edit_url: null
---

[fb-core](../modules/fb_core.md).Store

## Constructors

### constructor

• **new Store**(`props`, `actions?`, `isBuilderMode?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `props` | `StoreProps` | `undefined` |
| `actions` | `ActionDefinition`[] | `[]` |
| `isBuilderMode` | `boolean` | `false` |

## Properties

### actions

• **actions**: `ActionDefinition`[] = `[]`

___

### eventSubject

• `Readonly` **eventSubject**: `Subject`<[`ActionEventArgs`](fb_core.ActionEventArgs.md)\>

___

### form

• `Readonly` **form**: `Form`

___

### isBuilderMode

• **isBuilderMode**: `boolean` = `false`

___

### props

• **props**: `StoreProps`

___

### screen

• **screen**: [`ComponentStore`](fb_core.ComponentStore.md)

___

### viewMode

• **viewMode**: [`ViewMode`](../modules/fb_core.md#viewmode) = `'desktop'`

## Accessors

### tooltipComponent

• `get` **tooltipComponent**(): `undefined` \| [`Model`](fb_core.Model.md)

#### Returns

`undefined` \| [`Model`](fb_core.Model.md)

___

### tooltipType

• `get` **tooltipType**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

## Methods

### #applyComponentStore

▸ `Private` **#applyComponentStore**(`componentStore`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](fb_core.ComponentStore.md) |

#### Returns

`void`

___

### findAction

▸ **findAction**(`actionData`): `ActionDefinition`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionData` | [`ActionData`](../modules/fb_core.md#actiondata) |

#### Returns

`ActionDefinition`

___

### findComponent

▸ **findComponent**(`key`): `undefined` \| [`ComponentStore`](fb_core.ComponentStore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`ComponentStore`](fb_core.ComponentStore.md)

___

### getComponent

▸ **getComponent**(`key`): [`ComponentStore`](fb_core.ComponentStore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`ComponentStore`](fb_core.ComponentStore.md)

___

### loadForm

▸ **loadForm**(): `void`

#### Returns

`void`
