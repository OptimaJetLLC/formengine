---
id: "fb_core.ComponentStore"
title: "Class: ComponentStore"
sidebar_label: "ComponentStore"
custom_edit_url: null
---

[fb-core](../modules/fb_core.md).ComponentStore

## Constructors

### constructor

• **new ComponentStore**(`key`, `type`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `type` | `string` |

## Properties

### bindCondition

• `Optional` **bindCondition**: `string`

___

### bindTo

• `Optional` **bindTo**: `string`

___

### children

• `Optional` **children**: [`ComponentStore`](fb_core.ComponentStore.md)[]

___

### css

• `Optional` **css**: `Css`

___

### events

• `Optional` **events**: `Record`<`string`, [`ActionData`](../modules/fb_core.md#actiondata)[]\>

___

### htmlAttributes

• `Optional` **htmlAttributes**: `HtmlAttribute`[]

___

### key

• **key**: `string` = `''`

___

### props

• **props**: `Record`<`string`, [`ComponentProperty`](../interfaces/fb_core.ComponentProperty.md)\> = `{}`

___

### renderWhen

• `Optional` **renderWhen**: [`ComponentProperty`](../interfaces/fb_core.ComponentProperty.md)

___

### schema

• `Optional` **schema**: `ValidationSchema`

___

### tooltipProps

• `Optional` **tooltipProps**: `Record`<`string`, [`ComponentProperty`](../interfaces/fb_core.ComponentProperty.md)\>

___

### type

• **type**: `string` = `''`

## Accessors

### isContainer

• `get` **isContainer**(): `boolean`

#### Returns

`boolean`

___

### isRoot

• `get` **isRoot**(): `boolean`

#### Returns

`boolean`
