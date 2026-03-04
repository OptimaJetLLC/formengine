# Variable: oneOf()

> `const` **oneOf**: \<`U`\>(...`values`) => [`OneOfBuilder`](../classes/OneOfBuilder.md)\<`U`\>

The annotation builder for a component property with type 'enum', the property value can only be one of enum.

Sets the property as a "single select" property.

## Type Parameters

### U

`U` *extends* `number` \| `string`

## Parameters

### values

...`U`[]

the possible values for the property.

## Returns

[`OneOfBuilder`](../classes/OneOfBuilder.md)\<`U`\>

the instance of the metadata property builder.
