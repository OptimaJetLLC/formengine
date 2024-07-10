# Class: Meta

Component metadata for the form builder.

## Constructors

### new Meta()

> **new Meta**(`type`, `properties`, `css`, `wrapperCss`, `modules`, `customPreview`?, `valuedAn`?, `kind`?): [`Meta`](Meta.md)

Creates the component metadata for the form builder.

#### Parameters

• **type**: `string`

the component type name.

• **properties**: [`Annotation`](Annotation.md)[]

the component's properties metadata.

• **css**: [`Annotation`](Annotation.md)[]

the component's CSS metadata.

• **wrapperCss**: [`Annotation`](Annotation.md)[]

the component's wrapper CSS metadata.

• **modules**: [`Annotation`](Annotation.md)[]

common metadata for the component.

• **customPreview?**: `ReactNode`

the custom ReactNode to be drawn on the toolbar.

• **valuedAn?**: [`Annotation`](Annotation.md)

the metadata for the component value.

• **kind?**: [`ComponentKind`](../type-aliases/ComponentKind.md) = `'component'`

the component kind.

#### Returns

[`Meta`](Meta.md)

## Properties

### css

> `readonly` **css**: [`Annotation`](Annotation.md)[]

the component's CSS metadata.

***

### customPreview?

> `readonly` `optional` **customPreview**: `ReactNode`

the custom ReactNode to be drawn on the toolbar.

***

### kind

> `readonly` **kind**: [`ComponentKind`](../type-aliases/ComponentKind.md) = `'component'`

the component kind.

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
