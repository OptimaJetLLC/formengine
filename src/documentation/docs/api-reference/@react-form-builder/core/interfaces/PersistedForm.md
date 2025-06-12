# Interface: PersistedForm

The format for saving a form designed in Form Builder.

## Properties

### actions?

> `optional` **actions**: [`ActionValues`](../type-aliases/ActionValues.md)

Represents a set of action definitions.

***

### defaultLanguage

> **defaultLanguage**: `string`

The default form language.

***

### errorProps?

> `optional` **errorProps**: `any`

Properties of the component displaying the error.

***

### errorType?

> `optional` **errorType**: `string`

Name of the type of component displaying the error.

***

### form

> **form**: [`ComponentStore`](../classes/ComponentStore.md)

Settings for components that display the form.

***

### formValidator?

> `optional` **formValidator**: `string`

The form validator.

***

### languages

> **languages**: [`Language`](../classes/Language.md)[]

Form languages.

***

### localization

> **localization**: [`LocalizationValue`](../type-aliases/LocalizationValue.md)

Localization of the form.

***

### tooltipType?

> `optional` **tooltipType**: `string`

Name of the type of component that displays the tooltip.

***

### version?

> `optional` **version**: [`version1`](../enumerations/PersistedFormVersion.md#version1)

The version of the saved form.
