# Function: useDisposable()

> **useDisposable**\<`T`\>(`factory`): `T` \| `undefined`

Creates a disposable object and dispose the object when the React component is unmounted. **Internal use only.**

## Type Parameters

• **T** *extends* [`IDisposable`](../type-aliases/IDisposable.md)

## Parameters

• **factory**

the factory function to create a disposable object.

## Returns

`T` \| `undefined`

the disposable object.
