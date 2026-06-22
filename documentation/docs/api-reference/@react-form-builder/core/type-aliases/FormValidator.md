# Type Alias: FormValidator()

> **FormValidator** = (`data`) => `Promise`\<`Record`\<`string`, `string`\> \| `undefined`\>

Represents a function that validate the form data.

## Parameters

### data

`Record`\<`string`, `unknown`\>

the form data.

## Returns

`Promise`\<`Record`\<`string`, `string`\> \| `undefined`\>

the Record with form field errors.
