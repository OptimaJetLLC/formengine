# Interface: IFormJsonBuilder

Interface for building a form JSON.

## Extended by

- [`IComponentBuilder`](IComponentBuilder.md)

## Methods

### component()

> **component**(`key`, `type`): [`IComponentBuilder`](IComponentBuilder.md)

Adds a component to the form.

#### Parameters

• **key**: `string`

the unique identifier of the component.

• **type**: `string`

the type of the component.

#### Returns

[`IComponentBuilder`](IComponentBuilder.md)

the component builder for further configuration.

***

### json()

> **json**(): `string`

Serializes the current state of the form into a JSON string.

#### Returns

`string`

JSON representation of the form.
