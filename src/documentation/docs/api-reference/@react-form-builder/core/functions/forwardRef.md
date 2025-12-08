# Function: forwardRef()

> **forwardRef**\<`T`, `P`\>(`render`): `ForwardRefExoticComponent`\<`P`\> \| `ForwardRefExoticComponent`\<`PropsWithoutRef`\<`P`\> & `RefAttributes`\<`T`\>\>

Shim to be compatible with React 19.

## Type Parameters

### T

`T`

### P

`P` = `Record`\<`string`, `unknown`\>

## Parameters

### render

`ForwardRefRenderFunction`\<`T`, `P` & `object`\>

the forward ref render function.

## Returns

`ForwardRefExoticComponent`\<`P`\> \| `ForwardRefExoticComponent`\<`PropsWithoutRef`\<`P`\> & `RefAttributes`\<`T`\>\>

the React component.
