# Function: useDisposable()

> **useDisposable**\<`T`\>(`factory`): `undefined` \| `T`

Creates a disposable object and dispose the object when the React component is unmounted. **Internal use only.**

## Type Parameters

### T

`T` *extends* [`IDisposable`](../type-aliases/IDisposable.md)

## Parameters

### factory

() => `T`

the factory function to create a disposable object.

## Returns

`undefined` \| `T`

the disposable object.
