# Function: toArray()

> **toArray**\<`T`\>(`annotations`?, `setup`?): [`Annotation`](../classes/Annotation.md)[]

Converts the object containing component property metadata into an array. **Internal use only.**

## Type Parameters

• **T** *extends* `object` = `any`

## Parameters

• **annotations?**: [`Annotations`](../type-aliases/Annotations.md)\<`T`\>

the object containing component property metadata.

• **setup?**: `Partial`\<`Partial`\<`Omit`\<[`Annotation`](../classes/Annotation.md), `"key"`\>\> & `Pick`\<[`Annotation`](../classes/Annotation.md), `"editor"`\> & [`BuilderOptions`](../classes/BuilderOptions.md)\> = `{}`

the custom options for the component's property metadata builder.

## Returns

[`Annotation`](../classes/Annotation.md)[]

the metadata array of the component properties.
