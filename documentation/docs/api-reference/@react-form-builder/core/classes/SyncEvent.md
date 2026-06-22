# Class: SyncEvent\<TSender, TEventArgs\>

Represents a synchronous event that can be subscribed to and invoked. **Internal use only.**

## Type Parameters

### TSender

`TSender`

the type of the object that raises the event.

### TEventArgs

`TEventArgs`

the type of the event arguments.

## Constructors

### Constructor

> **new SyncEvent**\<`TSender`, `TEventArgs`\>(): `SyncEvent`\<`TSender`, `TEventArgs`\>

#### Returns

`SyncEvent`\<`TSender`, `TEventArgs`\>

## Accessors

### isSubscribed

#### Get Signature

> **get** **isSubscribed**(): `boolean`

Returns true if the object has subscribers, false otherwise.

##### Returns

`boolean`

true if the object has handlers registered for events, otherwise returns false.

## Methods

### dispose()

> **dispose**(): `void`

Dispose method to release all handlers.

#### Returns

`void`

***

### invoke()

> **invoke**(`sender`, `eventArgs`): `void`

Invokes the event by calling all registered event handlers.

#### Parameters

##### sender

`TSender`

the sender of the event.

##### eventArgs

`TEventArgs`

the event arguments.

#### Returns

`void`

***

### subscribe()

> **subscribe**(`handler`): `void`

Adds a handler to the list of subscribers.

#### Parameters

##### handler

[`SyncEventHandler`](../type-aliases/SyncEventHandler.md)\<`TSender`, `TEventArgs`\>

the handler function to be added.

#### Returns

`void`

***

### unsubscribe()

> **unsubscribe**(`handler`): `void`

Removes the specified event handler from the list of handlers.

#### Parameters

##### handler

[`SyncEventHandler`](../type-aliases/SyncEventHandler.md)\<`TSender`, `TEventArgs`\>

the event handler to remove.

#### Returns

`void`
