# Function: groupBy()

> **groupBy**\<`T`\>(`array`, `predicate`): `Record`\<`string`, `T`[]\>

Groups the array of values by function predicate. **Internal use only.**

## Type Parameters

### T

`T`

## Parameters

### array

`T`[]

the array of values.

### predicate

(`value`, `index`, `array`) => `string`

the function that returns a string to group the values of the array.

## Returns

`Record`\<`string`, `T`[]\>

the Record with grouped values.
