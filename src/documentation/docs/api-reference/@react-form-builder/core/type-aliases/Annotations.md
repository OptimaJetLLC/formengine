# Type Alias: Annotations\<T\>

> **Annotations**\<`T`\>: \{ \[key in keyof T\]: BaseBuilder\<T\[key\]\> \| undefined \}

The type-safe description of the component's metadata property builders.

## Type Parameters

• **T** *extends* `object`

the component property name type.
