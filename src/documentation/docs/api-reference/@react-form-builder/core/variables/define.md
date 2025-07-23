# Variable: define()

> `const` **define**: \<`T`\>(`component`, `displayName?`) => [`Definer`](../interfaces/Definer.md)\<`T`\> = `Definer.define`

Static method to create an instance of the component's metadata builder class.

## Type Parameters

### T

`T` *extends* `object`

## Parameters

### component

`ComponentType`\<`T`\>

the React component.

### displayName?

`string`

the display name for the anonymous component.

## Returns

[`Definer`](../interfaces/Definer.md)\<`T`\>

the instance of the [Definer](../interfaces/Definer.md) class.
