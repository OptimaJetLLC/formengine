---
id: "Meta"
title: "Class: Meta"
sidebar_label: "Meta"
sidebar_position: 0
custom_edit_url: null
---

Component metadata for the form builder.

## Constructors

### constructor

• **new Meta**(`type`, `properties`, `css`, `modules`, `customPreview?`, `valuedAn?`)

Creates the component metadata for the form builder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` | the component type name. |
| `properties` | [`Annotation`](Annotation.md)[] | the component's properties metadata. |
| `css` | [`Annotation`](Annotation.md)[] | the component's CSS metadata. |
| `modules` | [`Annotation`](Annotation.md)[] | common metadata for the component. |
| `customPreview?` | `ReactNode` | the custom ReactNode to be drawn on the toolbar. |
| `valuedAn?` | [`Annotation`](Annotation.md) | the metadata for the component value. |

## Properties

### css

• `Readonly` **css**: [`Annotation`](Annotation.md)[]

the component's CSS metadata.

___

### customPreview

• `Optional` `Readonly` **customPreview**: `ReactNode`

the custom ReactNode to be drawn on the toolbar.

___

### modules

• `Readonly` **modules**: [`Annotation`](Annotation.md)[]

common metadata for the component.

___

### properties

• `Readonly` **properties**: [`Annotation`](Annotation.md)[]

the component's properties metadata.

___

### type

• `Readonly` **type**: `string`

the component type name.

___

### valuedAn

• `Optional` `Readonly` **valuedAn**: [`Annotation`](Annotation.md)

the metadata for the component value.
