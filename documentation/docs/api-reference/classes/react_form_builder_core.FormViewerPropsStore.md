---
id: "react_form_builder_core.FormViewerPropsStore"
title: "Class: FormViewerPropsStore"
sidebar_label: "FormViewerPropsStore"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).FormViewerPropsStore

Represents the props passed to the FormViewer Store.

## Constructors

### constructor

• **new FormViewerPropsStore**(`formViewerProps?`)

Constructs a new FormViewerPropsStore from the given FormViewerProps.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formViewerProps?` | [`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md) | the FormViewer props. |

## Properties

### externalActions

• `Optional` **externalActions**: [`ActionValues`](../modules/react_form_builder_core.md#actionvalues)

The set of external actions

___

### externalFormValidators

• `Optional` **externalFormValidators**: [`ExternalFormValidators`](../modules/react_form_builder_core.md#externalformvalidators)

The set of functions that validate the form data.

___

### externalLocalizer

• `Optional` **externalLocalizer**: [`ComponentLocalizer`](../modules/react_form_builder_core.md#componentlocalizer)

The function to localize the properties of a component

___

### externalValidators

• `Optional` **externalValidators**: `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap), [`ExternalValidationRules`](../modules/react_form_builder_core.md#externalvalidationrules)\>\>

The set of metadata of external validation rules, grouped by the type of value being validated.

___

### initialData

• **initialData**: `Record`<`string`, `unknown`\> = `{}`

The initial form data.

___

### propsLanguage

• `Optional` **propsLanguage**: [`Language`](react_form_builder_core.Language.md)

The full language code passed in the FormViewer properties.

___

### view

• **view**: [`View`](react_form_builder_core.View.md)

The metadata of the form viewer components.

## Methods

### applyProps

▸ **applyProps**(`formViewerProps`): `void`

Applies the given FormViewerProps.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formViewerProps` | [`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md) | the properties to apply. |

#### Returns

`void`

___

### clone

▸ **clone**(): [`FormViewerPropsStore`](react_form_builder_core.FormViewerPropsStore.md)

Returns the clone of the FormViewerPropsStore object.

#### Returns

[`FormViewerPropsStore`](react_form_builder_core.FormViewerPropsStore.md)

the clone of the FormViewerPropsStore object.
