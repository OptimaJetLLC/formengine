# Function: debounce()

> **debounce**\<`T`\>(`fn`, `wait`): (...`args`) => `void` \| `ReturnType`\<`T`\>

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

> (...`args`): `void` \| `ReturnType`\<`T`\>

### Parameters

#### args

...`Parameters`\<`T`\>

### Returns

`void` \| `ReturnType`\<`T`\>
