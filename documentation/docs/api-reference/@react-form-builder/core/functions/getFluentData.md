# Function: getFluentData()

> **getFluentData**(`data`): `Record`\<`string`, `FluentVariable`\>

Converts the form data to a Fluent compatible. **Internal use only.**

## Parameters

• **data**: `Record`\<`string`, `unknown`\>

the form data.

## Returns

`Record`\<`string`, `FluentVariable`\>

all the form data that is of the FluentVariable type.
Additionally, the keys of the returned object are converted to the snake case.
