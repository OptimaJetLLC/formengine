# Function: useBuilderComponent()

> **useBuilderComponent**\<`T`\>(`builderComponent`, `viewerComponent`, `props`): `ReactElement`

Returns a React element for the builder or viewer component based on the current builder mode.

## Type Parameters

### T

`T`

## Parameters

### builderComponent

`ComponentType`\<`T`\>

the component to use in the 'builder' mode.

### viewerComponent

`ComponentType`\<`T`\>

the component to use in the 'viewer' mode.

### props

`T`

the props forwarded to the selected component.

## Returns

`ReactElement`

the React element for the selected component.
