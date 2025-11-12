# Function: getEditableFormData()

> **getEditableFormData**(`form`): `Record`\<`string`, `unknown`\>

Replaces empty form fields with an empty string. **Internal use only.**

## Parameters

### form

[`IFormData`](../interfaces/IFormData.md)

the form.

## Returns

`Record`\<`string`, `unknown`\>

all form data where empty fields are filled with empty strings.
