# Function: toArray()

> **toArray**\<`T`\>(`annotations?`, `setup?`): [`Annotation`](../classes/Annotation.md)[]

Converts the object containing component property metadata into an array. **Internal use only.**

## Type Parameters

### T

`T` *extends* `object` = `any`

## Parameters

### annotations?

[`Annotations`](../type-aliases/Annotations.md)\<`T`\>

the object containing component property metadata.

### setup?

[`BuilderSetup`](../type-aliases/BuilderSetup.md) = `{}`

the custom options for the component's property metadata builder.

## Returns

[`Annotation`](../classes/Annotation.md)[]

the metadata array of the component properties.
