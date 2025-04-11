# Function: useMultipleDisposable()

> **useMultipleDisposable**\<`T`\>(`factory`): `T`

Creates a disposable object and correctly disposes of it when the object is recreated and unmounted. **Internal use only.**

## Type Parameters

• **T** *extends* [`IDisposable`](../type-aliases/IDisposable.md)

## Parameters

• **factory**

the factory function to create a disposable object.

## Returns

`T`

the disposable object.
