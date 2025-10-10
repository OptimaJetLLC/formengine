# Function: cloneDeep()

> **cloneDeep**\<`T`\>(`value`, `weakMap`): `T`

Creates a deep cloned copy of the provided value.
- Preserves prototypes for objects and class instances.
- Copies Maps, Sets, Dates, RegExps, ArrayBuffers/TypedArrays.
- Handles circular references via an internal WeakMap.

## Type Parameters

### T

`T`

## Parameters

### value

`T`

the value to deep-clone.

### weakMap

`WeakMap`\<`object`, `any`\> = `...`

internal map to track circular references (do not pass in normal use).

## Returns

`T`

a deep-cloned value structurally equal to the input.
