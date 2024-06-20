---
id: "react_form_builder_core.FormViewerPropsStore"
title: "Class: FormViewerPropsStore"
sidebar_label: "FormViewerPropsStore"
custom_edit_url: null
---

[@react-form-builder/core](../modules/react_form_builder_core.md).FormViewerPropsStore

Represents the props passed to the FormViewer Store. **Internal use only.**

## Constructors

### constructor

• **new FormViewerPropsStore**(`formViewerProps?`)

Constructs a new FormViewerPropsStore from the given FormViewerProps.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formViewerProps?` | [`FormViewerProps`](../interfaces/react_form_builder_core.FormViewerProps.md) | the FormViewer props. |

## Properties

### actions

• `Optional` **actions**: [`ActionValues`](../modules/react_form_builder_core.md#actionvalues)

Custom actions for the form viewer.

___

### errorWrapper

• `Optional` **errorWrapper**: `ComponentType`<[`ErrorWrapperProps`](../interfaces/react_form_builder_core.ErrorWrapperProps.md)\>

The default error wrapper used when errorType is not specified in the form.

___

### formValidators

• `Optional` **formValidators**: [`FormValidators`](../modules/react_form_builder_core.md#formvalidators)

The set of functions that validate the form data.

___

### initialData

• **initialData**: `Record`<`string`, `unknown`\> = `{}`

The initial form data.

___

### localizer

• `Optional` **localizer**: [`ComponentLocalizer`](../modules/react_form_builder_core.md#componentlocalizer)

The function to localize the properties of a component.

___

### propsLanguage

• `Optional` **propsLanguage**: [`Language`](react_form_builder_core.Language.md)

The full language code passed in the FormViewer properties.

___

### validators

• `Optional` **validators**: `Partial`<`Record`<keyof [`SchemaTypeMap`](../modules/react_form_builder_core.md#schematypemap), [`CustomValidationRules`](../modules/react_form_builder_core.md#customvalidationrules)\>\>

The set of metadata of validation rules, grouped by the type of value being validated.

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
