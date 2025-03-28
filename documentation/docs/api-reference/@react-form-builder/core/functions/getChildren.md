# Function: getChildren()

> **getChildren**(`data`, `formData`, `componentTreeItem`, `componentProps`): `Record`\<`string`, `any`\>

Returns the Record with all child components. **Internal use only.**

## Parameters

• **data**: [`ComponentData`](../classes/ComponentData.md)

the parent component's data necessary to display the component.

• **formData**: [`IFormData`](../interfaces/IFormData.md)

the form data.

• **componentTreeItem**: `ComponentType`\<[`ComponentTreeProps`](../interfaces/ComponentTreeProps.md)\>

the type of React component that wraps child components.

• **componentProps**: `Record`\<`string`, `any`\>

the properties of the parent component.

## Returns

`Record`\<`string`, `any`\>

the Record with all child components.
