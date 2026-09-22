# Type Alias: ResolvedValidator

> **ResolvedValidator** = (`value`, `store`, `getFormData?`) => `Promise`\<[`ValidationResult`](ValidationResult.md)[] \| `undefined`\>

The function that validates a value and returns the validation result.

## Parameters

### value

`any`

the validated value.

### store

[`IStore`](../interfaces/IStore.md)

the form viewer settings.

### getFormData?

() => [`IFormData`](../interfaces/IFormData.md)

the function that returns a form data.

## Returns

`Promise`\<[`ValidationResult`](ValidationResult.md)[] \| `undefined`\>

the Promise with the results of the validation.
