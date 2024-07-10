# Class: ComponentDataEvents

Represents a class that holds events related to component data.

## Constructors

### new ComponentDataEvents()

> **new ComponentDataEvents**(): [`ComponentDataEvents`](ComponentDataEvents.md)

#### Returns

[`ComponentDataEvents`](ComponentDataEvents.md)

## Properties

### onAfterKeyChanged

> `readonly` **onAfterKeyChanged**: [`SyncEvent`](SyncEvent.md)\<[`ComponentData`](ComponentData.md), [`ComponentKeyChangedEventArgs`](ComponentKeyChangedEventArgs.md)\>

An event that occurs after a component key change.

***

### onBeforeDelete

> `readonly` **onBeforeDelete**: [`SyncEvent`](SyncEvent.md)\<[`ComponentData`](ComponentData.md), `undefined`\>

An event that occurs before a component is removed from the component tree.

## Methods

### dispose()

> **dispose**(): `void`

Unsubscribe from all events.

#### Returns

`void`
