---
id: "react_form_builder_core.EventStream"
title: "Class: EventStream"
sidebar_label: "EventStream"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).EventStream

The event stream of the form viewer.

## Constructors

### constructor

• **new EventStream**(`stream`)

Creates the event stream of the form viewer.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `stream` | `Observable`<[`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)\> | the set of observable events. |

## Properties

### stream

• `Private` `Readonly` **stream**: `Observable`<[`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)\>

the set of observable events.

## Methods

### filter

▸ **filter**(`predicate`): [`EventStream`](react_form_builder_core.EventStream.md)

Returns the event stream filtered by the specified predicate function.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `predicate` | (`args`: [`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)) => `boolean` | the predicate function. |

#### Returns

[`EventStream`](react_form_builder_core.EventStream.md)

the event stream filtered by the specified predicate function.

___

### keys

▸ **keys**(`...keys`): [`EventStream`](react_form_builder_core.EventStream.md)

Returns the event stream filtered by the specified sender keys.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...keys` | `string`[] | the sender key array. |

#### Returns

[`EventStream`](react_form_builder_core.EventStream.md)

the event stream filtered by the specified sender keys.

___

### listen

▸ **listen**(`next`): () => `void`

Adds the subscriber to the stream of observed events.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `next` | (`value`: [`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)) => `void` | the subscriber function. |

#### Returns

`fn`

▸ (): `void`

Adds the subscriber to the stream of observed events.

##### Returns

`void`

▸ **listen**(`observer`): () => `void`

Adds the specified observer to the stream of observed events.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `observer` | `Partial`<`Observer`<[`ActionEventArgs`](react_form_builder_core.ActionEventArgs.md)\>\> | the observer. |

#### Returns

`fn`

▸ (): `void`

Adds the specified observer to the stream of observed events.

##### Returns

`void`

___

### types

▸ **types**(`...types`): [`EventStream`](react_form_builder_core.EventStream.md)

Returns the event stream filtered by the specified event types.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...types` | `string`[] | the array of event types. |

#### Returns

[`EventStream`](react_form_builder_core.EventStream.md)

the event stream filtered by the specified event types.
