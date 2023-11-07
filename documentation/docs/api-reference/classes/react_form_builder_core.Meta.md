---
id: "react_form_builder_core.Meta"
title: "Class: Meta"
sidebar_label: "Meta"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).Meta

Component metadata for the form builder.

## Constructors

### constructor

• **new Meta**(`type`, `properties`, `css`, `modules`, `customPreview?`, `valuedAn?`, `kind?`)

Creates the component metadata for the form builder.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `type` | `string` | `undefined` | the component type name. |
| `properties` | [`Annotation`](react_form_builder_core.Annotation.md)[] | `undefined` | the component's properties metadata. |
| `css` | [`Annotation`](react_form_builder_core.Annotation.md)[] | `undefined` | the component's CSS metadata. |
| `modules` | [`Annotation`](react_form_builder_core.Annotation.md)[] | `undefined` | common metadata for the component. |
| `customPreview?` | `ReactNode` | `undefined` | the custom ReactNode to be drawn on the toolbar. |
| `valuedAn?` | [`Annotation`](react_form_builder_core.Annotation.md) | `undefined` | the metadata for the component value. |
| `kind` | [`ComponentKind`](../modules/react_form_builder_core.md#componentkind) | `'component'` | the component kind. |

## Properties

### css

• `Readonly` **css**: [`Annotation`](react_form_builder_core.Annotation.md)[]

the component's CSS metadata.

___

### customPreview

• `Optional` `Readonly` **customPreview**: `ReactNode`

the custom ReactNode to be drawn on the toolbar.

___

### kind

• `Readonly` **kind**: [`ComponentKind`](../modules/react_form_builder_core.md#componentkind) = `'component'`

the component kind.

___

### modules

• `Readonly` **modules**: [`Annotation`](react_form_builder_core.Annotation.md)[]

common metadata for the component.

___

### properties

• `Readonly` **properties**: [`Annotation`](react_form_builder_core.Annotation.md)[]

the component's properties metadata.

___

### type

• `Readonly` **type**: `string`

the component type name.

___

### valuedAn

• `Optional` `Readonly` **valuedAn**: [`Annotation`](react_form_builder_core.Annotation.md)

the metadata for the component value.
