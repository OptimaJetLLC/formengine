# Function: useDisposable()

> **useDisposable**\<`T`\>(`factory`): `T` \| `undefined`

Creates a disposable object and dispose the object when the React component is unmounted. **Internal use only.**
The instance is created in an effect so Strict Mode can dispose the first instance and create another one.

## Type Parameters

### T

`T` *extends* [`IDisposable`](../type-aliases/IDisposable.md)

## Parameters

### factory

() => `T`

the factory function to create a disposable object.

## Returns

`T` \| `undefined`

the disposable object.
