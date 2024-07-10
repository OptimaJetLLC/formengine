# Class: EventStream

The event stream of the form viewer.

## Constructors

### new EventStream()

> **new EventStream**(`stream`): [`EventStream`](EventStream.md)

Creates the event stream of the form viewer.

#### Parameters

• **stream**: `Observable`\<[`ActionEventArgs`](ActionEventArgs.md)\>

the set of observable events.

#### Returns

[`EventStream`](EventStream.md)

## Methods

### filter()

> **filter**(`predicate`): [`EventStream`](EventStream.md)

Returns the event stream filtered by the specified predicate function.

#### Parameters

• **predicate**

the predicate function.

#### Returns

[`EventStream`](EventStream.md)

the event stream filtered by the specified predicate function.

***

### keys()

> **keys**(...`keys`): [`EventStream`](EventStream.md)

Returns the event stream filtered by the specified sender keys.

#### Parameters

• ...**keys**: `string`[]

the sender key array.

#### Returns

[`EventStream`](EventStream.md)

the event stream filtered by the specified sender keys.

***

### listen()

Adds the specified observer to the stream of observed events.

#### Param

the observer.

#### listen(next)

> **listen**(`next`): () => `void`

Adds the subscriber to the stream of observed events.

##### Parameters

• **next**

the subscriber function.

##### Returns

`Function`

###### Returns

`void`

#### listen(observer)

> **listen**(`observer`): () => `void`

Adds the specified observer to the stream of observed events.

##### Parameters

• **observer**: `Partial`\<`Observer`\<[`ActionEventArgs`](ActionEventArgs.md)\>\>

the observer.

##### Returns

`Function`

###### Returns

`void`

***

### types()

> **types**(...`types`): [`EventStream`](EventStream.md)

Returns the event stream filtered by the specified event types.

#### Parameters

• ...**types**: `string`[]

the array of event types.

#### Returns

[`EventStream`](EventStream.md)

the event stream filtered by the specified event types.
