# Class: ComponentDataEvents

Represents a class that holds events related to component data.

## Constructors

### Constructor

> **new ComponentDataEvents**(): `ComponentDataEvents`

#### Returns

`ComponentDataEvents`

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
