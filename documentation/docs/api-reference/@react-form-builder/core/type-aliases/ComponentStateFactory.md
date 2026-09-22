# Type Alias: ComponentStateFactory

> **ComponentStateFactory** = (`data`, `store`, `context?`) => [`IComponentState`](../interfaces/IComponentState.md)

The component state factory that calculates the properties of the form viewer component.

## Parameters

### data

[`ComponentData`](../classes/ComponentData.md)

the data needed to display the component.

### store

[`Store`](../classes/Store.md)

the form viewer settings.

### context?

[`ComponentPropertiesContext`](ComponentPropertiesContext.md)

the context for working with component properties.

## Returns

[`IComponentState`](../interfaces/IComponentState.md)

the component property calculator.
