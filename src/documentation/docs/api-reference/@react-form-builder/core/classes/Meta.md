# Class: Meta

Component metadata for the form builder.

## Constructors

### Constructor

> **new Meta**(`type`, `properties`, `css`, `wrapperCss`, `modules`, `valuedAn?`, `initialJson?`, `eventListeners?`, `icon?`, `insertRestriction?`): `Meta`

Creates the component metadata for the form builder.

#### Parameters

##### type

`string`

the component type name.

##### properties

[`Annotation`](Annotation.md)[]

the component's properties metadata.

##### css

[`Annotation`](Annotation.md)[]

the component's CSS metadata.

##### wrapperCss

[`Annotation`](Annotation.md)[]

the component's wrapper CSS metadata.

##### modules

[`Annotation`](Annotation.md)[]

common metadata for the component.

##### valuedAn?

[`Annotation`](Annotation.md)

the metadata for the component value.

##### initialJson?

`string`

the JSON source for the component (instance of [ComponentStore](ComponentStore.md) class serialised to JSON).

##### eventListeners?

[`ComponentMetadataEventListeners`](../interfaces/ComponentMetadataEventListeners.md)

the component metadata event listeners.

##### icon?

the component icon or the icon name.

`ComponentType` | `string`

##### insertRestriction?

[`InsertRestrictionFn`](../type-aliases/InsertRestrictionFn.md)

the function that restricts the insertion of a component into another component.

#### Returns

`Meta`

## Properties

### css

> `readonly` **css**: [`Annotation`](Annotation.md)[]

the component's CSS metadata.

***

### eventListeners?

> `readonly` `optional` **eventListeners**: [`ComponentMetadataEventListeners`](../interfaces/ComponentMetadataEventListeners.md)

the component metadata event listeners.

***

### icon?

> `readonly` `optional` **icon**: `ComponentType` \| `string`

the component icon or the icon name.

***

### initialJson?

> `readonly` `optional` **initialJson**: `string`

the JSON source for the component (instance of [ComponentStore](ComponentStore.md) class serialised to JSON).

***

### insertRestriction?

> `readonly` `optional` **insertRestriction**: [`InsertRestrictionFn`](../type-aliases/InsertRestrictionFn.md)

the function that restricts the insertion of a component into another component.

***

### modules

> `readonly` **modules**: [`Annotation`](Annotation.md)[]

common metadata for the component.

***

### properties

> `readonly` **properties**: [`Annotation`](Annotation.md)[]

the component's properties metadata.

***

### type

> `readonly` **type**: `string`

the component type name.

***

### valuedAn?

> `readonly` `optional` **valuedAn**: [`Annotation`](Annotation.md)

the metadata for the component value.

***

### wrapperCss

> `readonly` **wrapperCss**: [`Annotation`](Annotation.md)[]

the component's wrapper CSS metadata.
