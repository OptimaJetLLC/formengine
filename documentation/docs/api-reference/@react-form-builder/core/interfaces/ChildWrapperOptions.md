# Interface: ChildWrapperOptions

Configures a component that automatically wraps direct children of another component type in a container slot.

## Properties

### childSlot?

> `readonly` `optional` **childSlot?**: `string`

The wrapper slot that receives the original child.
When omitted, the child is placed with an unset slot, which means the wrapper's `children` slot
(same as other default-slot placements; the property is omitted from form JSON).

***

### componentType

> `readonly` **componentType**: `string`

The component type used as the wrapper.
