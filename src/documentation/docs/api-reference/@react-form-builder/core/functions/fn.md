# Function: fn()

> **fn**(`fnDescriptionBegin`, `fnDescriptionEnd`): [`TypedBuilder`](../classes/TypedBuilder.md)\<`undefined` \| `string`\>

The annotation builder for a component property with type 'function'.

## Parameters

• **fnDescriptionBegin**: `string`

the beginning of function description.

• **fnDescriptionEnd**: `string` = `'}'`

the ending  of function description.

## Returns

[`TypedBuilder`](../classes/TypedBuilder.md)\<`undefined` \| `string`\>

the annotation builder for a component property with type 'function'.

## Example

```ts
// Example usage with TSDoc-style function description:
fn(
  `/**
   @param {string} value
   @param {ItemDataType} item
   @return {boolean}
   /
  function filterBy(value, item) {`
)
```

This will create a function property with proper type hints and documentation
that describes a filter function taking a string and an item, returning a boolean.
