---
id: "react_form_builder_core.ComponentState"
title: "Class: ComponentState"
sidebar_label: "ComponentState"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).ComponentState

Calculates all the properties of the form view component.

## Constructors

### constructor

• **new ComponentState**(`data`, `store`, `localizer`, `computeChildren`)

Creates an instance that calculates the properties of the form viewer component.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `data` | [`ComponentData`](react_form_builder_core.ComponentData.md) | the data needed to display the component. |
| `store` | [`Store`](react_form_builder_core.Store.md) | the form viewer settings. |
| `localizer` | (`componentStore`: [`ComponentStore`](react_form_builder_core.ComponentStore.md)) => `Record`<`string`, `any`\> | the function to localize the properties of a component. |
| `computeChildren` | [`ComputeChildren`](../modules/react_form_builder_core.md#computechildren) | the function that calculates all child properties of a component. |

## Properties

### computeChildren

• `Readonly` **computeChildren**: [`ComputeChildren`](../modules/react_form_builder_core.md#computechildren)

the function that calculates all child properties of a component.

___

### data

• `Readonly` **data**: [`ComponentData`](react_form_builder_core.ComponentData.md)

the data needed to display the component.

___

### localizer

• `Readonly` **localizer**: (`componentStore`: [`ComponentStore`](react_form_builder_core.ComponentStore.md)) => `Record`<`string`, `any`\>

#### Type declaration

▸ (`componentStore`): `Record`<`string`, `any`\>

the function to localize the properties of a component.

##### Parameters

| Name | Type |
| :------ | :------ |
| `componentStore` | [`ComponentStore`](react_form_builder_core.ComponentStore.md) |

##### Returns

`Record`<`string`, `any`\>

___

### store

• `Readonly` **store**: [`Store`](react_form_builder_core.Store.md)

the form viewer settings.

## Accessors

### calculatedProps

• `get` **calculatedProps**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

the values for all properties of the component, calculates the values of the calculated properties.

___

### events

• `get` **events**(): `Record`<`string`, `Function`\>

#### Returns

`Record`<`string`, `Function`\>

the component event handlers that send events to the event bus.

___

### get

• `get` **get**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

combined in order of priority component properties.

___

### htmlAttributes

• `get` **htmlAttributes**(): `undefined` \| [`HtmlAttribute`](../modules/react_form_builder_core.md#htmlattribute)

#### Returns

`undefined` \| [`HtmlAttribute`](../modules/react_form_builder_core.md#htmlattribute)

all arbitrary HTML attributes of the component.

___

### localizedProps

• `get` **localizedProps**(): `Record`<`string`, `any`\>

#### Returns

`Record`<`string`, `any`\>

component localized properties.

___

### value

• `get` **value**(): `undefined` \| {}

#### Returns

`undefined` \| {}

the component's field value data, if the component can have a field value.

## Methods

### children

▸ **children**(`props`): `Record`<`string`, `any`\>

Calculates and returns all child components.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `any` | the React component properties. |

#### Returns

`Record`<`string`, `any`\>

the Record that contains the child components of a component.

___

### className

▸ **className**(`props`): `Object`

Calculates and returns className property.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Record`<`string`, `any`\> | the React component properties. |

#### Returns

`Object`

the Record that contains the className property for the component.

| Name | Type |
| :------ | :------ |
| `className` | `string` |
