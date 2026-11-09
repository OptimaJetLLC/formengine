# Interface: ComponentNodeLocation

A snapshot of a component's position in the component tree.

## Properties

### index

> `readonly` **index**: `number`

The index in the parent's complete child list.

***

### parent

> `readonly` **parent**: [`ComponentData`](../classes/ComponentData.md)

The parent containing the component.

***

### slot?

> `readonly` `optional` **slot?**: `string`

The parent slot containing the component. Unset means the parent's `children` slot.

***

### slotCondition?

> `readonly` `optional` **slotCondition?**: `string`

The source of the condition binding the component to the slot.
