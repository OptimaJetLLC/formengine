---
id: "SyncEvent"
title: "Class: SyncEvent<TSender, TEventArgs>"
sidebar_label: "SyncEvent"
sidebar_position: 0
custom_edit_url: null
---

Represents a synchronous event that can be subscribed to and invoked.

## Type parameters

| Name | Description |
| :------ | :------ |
| `TSender` | the type of the object that raises the event. |
| `TEventArgs` | the type of the event arguments. |

## Constructors

### constructor

• **new SyncEvent**<`TSender`, `TEventArgs`\>()

#### Type parameters

| Name |
| :------ |
| `TSender` |
| `TEventArgs` |

## Properties

### handlers

• `Private` **handlers**: [`SyncEventHandler`](../modules.md#synceventhandler)<`TSender`, `TEventArgs`\>[] = `[]`

## Accessors

### isSubscribed

• `get` **isSubscribed**(): `boolean`

Returns true if the object has subscribers, false otherwise.

#### Returns

`boolean`

true if the object has handlers registered for events, otherwise returns false.

## Methods

### dispose

▸ **dispose**(): `void`

Dispose method to release all handlers.

#### Returns

`void`

___

### invoke

▸ **invoke**(`sender`, `eventArgs`): `void`

Invokes the event by calling all registered event handlers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sender` | `TSender` | the sender of the event. |
| `eventArgs` | `TEventArgs` | the event arguments. |

#### Returns

`void`

___

### subscribe

▸ **subscribe**(`handler`): `void`

Adds a handler to the list of subscribers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`SyncEventHandler`](../modules.md#synceventhandler)<`TSender`, `TEventArgs`\> | the handler function to be added. |

#### Returns

`void`

___

### unsubscribe

▸ **unsubscribe**(`handler`): `void`

Removes the specified event handler from the list of handlers.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `handler` | [`SyncEventHandler`](../modules.md#synceventhandler)<`TSender`, `TEventArgs`\> | the event handler to remove. |

#### Returns

`void`
