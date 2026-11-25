# Function: createSchema()

> **createSchema**(`components`, `descriptions?`): `boolean` \| `Interface`\<`any`, `string` & `object` \| `TypeValue`, `JSONSchema`\<`any`, `string` & `object` \| `TypeValue`\>\>

Creates the JSON Schema for builder components.

## Parameters

### components

[`BuilderComponent`](../../core/interfaces/BuilderComponent.md)[]

the components to generate schema for.

### descriptions?

[`ComponentLibraryDescription`](../../core/type-aliases/ComponentLibraryDescription.md)[]

the component descriptions to include in the schema.

## Returns

`boolean` \| `Interface`\<`any`, `string` & `object` \| `TypeValue`, `JSONSchema`\<`any`, `string` & `object` \| `TypeValue`\>\>

the generated JSON Schema with definitions for each builder component.
