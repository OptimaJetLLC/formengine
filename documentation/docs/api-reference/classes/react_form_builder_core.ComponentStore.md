---
id: "react_form_builder_core.ComponentStore"
title: "Class: ComponentStore"
sidebar_label: "ComponentStore"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ComponentStore

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

The condition for binding a child element to a parent element.

___

### children

• `Optional` **children**: [`ComponentStore`](react_form_builder_core.ComponentStore.md)[]

The array of child components.

___

### css

• `Optional` **css**: [`Css`](../modules/react_form_builder_core.md#css)

The component CSS styles.

___

### events

• `Optional` **events**: `Record`<`string`, [`ActionData`](../modules/react_form_builder_core.md#actiondata)[]\>

The set of event handlers.

___

### htmlAttributes

• `Optional` **htmlAttributes**: [`HtmlAttribute`](../modules/react_form_builder_core.md#htmlattribute)[]

The set of arbitrary HTML attributes added to the component.

___

### key

• **key**: `string` = `''`

The React component key.

___

### props

• **props**: `Record`<`string`, [`ComponentProperty`](../interfaces/react_form_builder_core.ComponentProperty.md)\> = `{}`

The component properties.

___

### renderWhen

• `Optional` **renderWhen**: [`ComponentProperty`](../interfaces/react_form_builder_core.ComponentProperty.md)

The expression or function to conditionally render a component.

___

### schema

• `Optional` **schema**: [`BoundValueSchema`](../modules/react_form_builder_core.md#boundvalueschema)

The component value validation settings.

___

### slot

• `Optional` **slot**: `string`

The name of the occupied component property in the parent component.

___

### tooltipProps

• `Optional` **tooltipProps**: `Record`<`string`, [`ComponentProperty`](../interfaces/react_form_builder_core.ComponentProperty.md)\>

The tooltip settings.

___

### type

• **type**: `string` = `''`

The component type of the form viewer.

## Methods

### addEventHandler

▸ `Static` **addEventHandler**(`store`, `eventName`, `data`): `void`

Adds the event handler for component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `store` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) | the target [ComponentStore](react_form_builder_core.ComponentStore.md). |
| `eventName` | `string` | the target event name. |
| `data` | [`ActionData`](../modules/react_form_builder_core.md#actiondata) | the [ActionData](../modules/react_form_builder_core.md#actiondata). |

#### Returns

`void`

___

### createFromObject

▸ `Static` **createFromObject**(`value`): `any`

Correctly creates the [ComponentStore](react_form_builder_core.ComponentStore.md) from deserialized data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `any` | the deserialized data. |

#### Returns

`any`

the component Store.
