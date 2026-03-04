# Variable: someOf()

> `const` **someOf**: \<`U`\>(...`values`) => [`SomeOfBuilder`](../classes/SomeOfBuilder.md)\<`U`\>

The annotation builder for a component property with type 'enum', the property value can contain multiple enum values.

Sets the property as a "multiple select" property.

## Type Parameters

### U

`U` *extends* `number` \| `string`

## Parameters

### values

...`U`[]

the possible values for the property.

## Returns

[`SomeOfBuilder`](../classes/SomeOfBuilder.md)\<`U`\>

the instance of the metadata property builder.
