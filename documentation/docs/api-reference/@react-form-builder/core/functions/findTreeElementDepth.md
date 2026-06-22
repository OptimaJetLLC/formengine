# Function: findTreeElementDepth()

> **findTreeElementDepth**\<`T`\>(`value`, `element?`, `depth?`): `number` \| `undefined`

Finds the depth of a given element in a tree. **Internal use only.**

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### value

`T`

the root of the tree.

### element?

`T`

the element to find the depth of.

### depth?

`number` = `0`

the current depth of the tree (optional, default is 0).

## Returns

`number` \| `undefined`

the depth of the element in the tree, or undefined if the element is not found.
