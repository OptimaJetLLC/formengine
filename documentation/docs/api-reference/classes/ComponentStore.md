---
id: "ComponentStore"
title: "Class: ComponentStore"
sidebar_label: "ComponentStore"
sidebar_position: 0
custom_edit_url: null
---

Component settings for serialization in JSON.

## Constructors

### constructor

• **new ComponentStore**(`key`, `type`)

Creates the component settings.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | the React component key. |
| `type` | `string` | the component type of the form viewer. |

## Properties

### bindCondition

• `Optional` **bindCondition**: `string`

___

### children

• `Optional` **children**: [`ComponentStore`](ComponentStore.md)[]

___

### css

• `Optional` **css**: [`Css`](../modules.md#css)

___

### events

• `Optional` **events**: `Record`<`string`, [`ActionData`](../modules.md#actiondata)[]\>

___

### htmlAttributes

• `Optional` **htmlAttributes**: [`HtmlAttribute`](../modules.md#htmlattribute)[]

___

### key

• **key**: `string` = `''`

___

### props

• **props**: `Record`<`string`, [`ComponentProperty`](../interfaces/ComponentProperty.md)\> = `{}`

___

### renderWhen

• `Optional` **renderWhen**: [`ComponentProperty`](../interfaces/ComponentProperty.md)

___

### schema

• `Optional` **schema**: [`BoundValueSchema`](../modules.md#boundvalueschema)

___

### slot

• `Optional` **slot**: `string`

The name of the occupied component property in the parent component.

___

### tooltipProps

• `Optional` **tooltipProps**: `Record`<`string`, [`ComponentProperty`](../interfaces/ComponentProperty.md)\>

___

### type

• **type**: `string` = `''`

## Methods

### addEventHandler

▸ `Static` **addEventHandler**(`store`, `eventName`, `data`): `void`

Adds the event handler for component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | [`ComponentStore`](ComponentStore.md) | the target [ComponentStore](ComponentStore.md). |
| `eventName` | `string` | the target event name. |
| `data` | [`ActionData`](../modules.md#actiondata) | the [ActionData](../modules.md#actiondata). |

#### Returns

`void`

___

### createFromObject

▸ `Static` **createFromObject**(`value`): `any`

Correctly creates the [ComponentStore](ComponentStore.md) from deserialized data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the deserialized data. |

#### Returns

`any`

the component Store.
