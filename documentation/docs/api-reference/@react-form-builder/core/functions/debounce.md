# Function: debounce()

> **debounce**\<`T`\>(`fn`, `wait`): (...`args`) => `ReturnType`\<`T`\> \| `void`

Debounce function calls with a timeout.

## Type Parameters

### T

`T` *extends* (...`args`) => `any`

## Parameters

### fn

`T`

the function to debounce.

### wait

`number` = `0`

the delay in ms.

## Returns

the debounced function.

> (...`args`): `ReturnType`\<`T`\> \| `void`

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`ReturnType`\<`T`\> \| `void`
