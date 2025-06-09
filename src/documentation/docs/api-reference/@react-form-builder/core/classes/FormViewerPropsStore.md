# Class: FormViewerPropsStore

Represents the props passed to the FormViewer Store. **Internal use only.**

## Constructors

### new FormViewerPropsStore()

> **new FormViewerPropsStore**(`formViewerProps`?): [`FormViewerPropsStore`](FormViewerPropsStore.md)

Constructs a new FormViewerPropsStore from the given FormViewerProps.

#### Parameters

• **formViewerProps?**: [`FormViewerProps`](../interfaces/FormViewerProps.md)

the FormViewer props.

#### Returns

[`FormViewerPropsStore`](FormViewerPropsStore.md)

the FormViewerPropsStore.

## Properties

### actions?

> `optional` **actions**: [`ActionValues`](../type-aliases/ActionValues.md)

Custom actions for the form viewer.

***

### errorWrapper?

> `optional` **errorWrapper**: `ComponentType`\<[`ErrorWrapperProps`](../interfaces/ErrorWrapperProps.md)\>

The default error wrapper used when errorType is not specified in the form.

***

### formValidators?

> `optional` **formValidators**: [`FormValidators`](../type-aliases/FormValidators.md)

The set of functions that validate the form data.

***

### initialData

> **initialData**: `Record`\<`string`, `unknown`\> = `{}`

The initial form data.

***

### localizer?

> `optional` **localizer**: [`ComponentLocalizer`](../type-aliases/ComponentLocalizer.md)

The function to localize the properties of a component.

***

### propsLanguage?

> `optional` **propsLanguage**: \`$\{string\}-$\{string\}\`

The full language code passed in the FormViewer properties, e.g. 'en-US'.

***

### readOnly?

> `optional` **readOnly**: `boolean`

If true, the form is read-only.

***

### showAllValidationErrors?

> `optional` **showAllValidationErrors**: `boolean`

If true, all validation errors will be displayed.

***

### validators?

> `optional` **validators**: `Partial`\<`Record`\<keyof [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md), [`CustomValidationRules`](../type-aliases/CustomValidationRules.md)\>\>

The set of metadata of validation rules, grouped by the type of value being validated.

***

### view

> **view**: [`View`](View.md)

The metadata of the form viewer components.

## Methods

### applyProps()

> **applyProps**(`formViewerProps`): `void`

Applies the given FormViewerProps.

#### Parameters

• **formViewerProps**: [`FormViewerProps`](../interfaces/FormViewerProps.md)

the properties to apply.

#### Returns

`void`

***

### clone()

> **clone**(): [`FormViewerPropsStore`](FormViewerPropsStore.md)

Returns the clone of the FormViewerPropsStore object.

#### Returns

[`FormViewerPropsStore`](FormViewerPropsStore.md)

the clone of the FormViewerPropsStore object.
