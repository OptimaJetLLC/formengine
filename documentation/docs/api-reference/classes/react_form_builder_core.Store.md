---
id: "react_form_builder_core.Store"
title: "Class: Store"
sidebar_label: "Store"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Store

## Constructors

### constructor

• **new Store**(`props`, `actions?`, `isBuilderMode?`, `parentStore?`, `keyInParent?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `props` | `Readonly`<[`StoreProps`](../interfaces/react_form_builder_core.StoreProps.md)\> | `undefined` |
| `actions` | `ActionDefinition`[] | `[]` |
| `isBuilderMode` | `boolean` | `false` |
| `parentStore?` | [`Store`](react_form_builder_core.Store.md) | `undefined` |
| `keyInParent?` | `string` | `undefined` |

## Properties

### #props

• `Private` `Readonly` **#props**: `Readonly`<[`StoreProps`](../interfaces/react_form_builder_core.StoreProps.md)\>

___

### actions

• **actions**: `ActionDefinition`[] = `[]`

___

### cache

• **cache**: `WeakMap`<[`ComponentStore`](react_form_builder_core.ComponentStore.md), [`ComponentData`](../modules/react_form_builder_core.md#componentdata)\>

___

### eventSubject

• `Readonly` **eventSubject**: `Subject`<[`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)\>

___

### form

• `Readonly` **form**: `Form`

___

### isBuilderMode

• **isBuilderMode**: `boolean` = `false`

___

### keyInParent

• `Private` `Optional` `Readonly` **keyInParent**: `string`

___

### parentStore

• `Optional` `Readonly` **parentStore**: [`Store`](react_form_builder_core.Store.md)

___

### screen

• **screen**: [`ComponentStore`](react_form_builder_core.ComponentStore.md)

___

### viewMode

• **viewMode**: [`ViewMode`](../modules/react_form_builder_core.md#viewmode) = `'desktop'`

## Accessors

### isTemplateStore

• `get` **isTemplateStore**(): `boolean`

#### Returns

`boolean`

___

### slotsContent

• `get` **slotsContent**(): `undefined` \| `Record`<`string`, [`ComponentStore`](react_form_builder_core.ComponentStore.md)\>

#### Returns

`undefined` \| `Record`<`string`, [`ComponentStore`](react_form_builder_core.ComponentStore.md)\>

___

### templateBuilderMode

• `get` **templateBuilderMode**(): `boolean`

Returns true if the template can be displayed in builder mode (e.g. with drop zones), false otherwise.

#### Returns

`boolean`

___

### tooltipComponent

• `get` **tooltipComponent**(): `undefined` \| [`Model`](react_form_builder_core.Model.md)

#### Returns

`undefined` \| [`Model`](react_form_builder_core.Model.md)

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
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

#### Returns

`void`

___

### #onLoadError

▸ `Private` **#onLoadError**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `any` |

#### Returns

`void`

___

### findAction

▸ **findAction**(`actionData`): `ActionDefinition`

#### Parameters

| Name | Type |
| :------ | :------ |
| `actionData` | [`ActionData`](../modules/react_form_builder_core.md#actiondata) |

#### Returns

`ActionDefinition`

___

### findComponent

▸ **findComponent**(`key`): `undefined` \| [`ComponentStore`](react_form_builder_core.ComponentStore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

`undefined` \| [`ComponentStore`](react_form_builder_core.ComponentStore.md)

___

### getComponent

▸ **getComponent**(`key`): [`ComponentStore`](react_form_builder_core.ComponentStore.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

#### Returns

[`ComponentStore`](react_form_builder_core.ComponentStore.md)

___

### getComponentData

▸ **getComponentData**(`value`): [`ComponentData`](../modules/react_form_builder_core.md#componentdata)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` \| [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

#### Returns

[`ComponentData`](../modules/react_form_builder_core.md#componentdata)

___

### getLinkedActions

▸ **getLinkedActions**(`target?`): `undefined` \| `ActionDefinition`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `target?` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

#### Returns

`undefined` \| `ActionDefinition`[]

___

### loadForm

▸ **loadForm**(`getForm?`, `formName?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `getForm?` | (`name?`: `string`) => [`ComponentStore`](react_form_builder_core.ComponentStore.md) \| `Promise`<[`ComponentStore`](react_form_builder_core.ComponentStore.md)\> |
| `formName?` | `string` |

#### Returns

`void`
