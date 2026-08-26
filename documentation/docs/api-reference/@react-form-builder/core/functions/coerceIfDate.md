# Function: coerceIfDate()

> **coerceIfDate**(`type`, `value`): `unknown`

Returns the value as a Date when the type is date and conversion succeeds.

## Parameters

### type

the value type.

keyof SchemaTypeMap | `undefined`

### value

`unknown`

the value to coerce.

## Returns

`unknown`

the Date when conversion succeeds, otherwise the original value.
