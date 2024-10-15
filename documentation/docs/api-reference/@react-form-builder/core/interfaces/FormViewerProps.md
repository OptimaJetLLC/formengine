# Interface: FormViewerProps

Form viewer React component properties.

## Properties

### actions?

> `optional` **actions**: [`CustomActions`](../type-aliases/CustomActions.md)

Custom actions for the form viewer.

***

### componentWrapper?

> `optional` **componentWrapper**: `ComponentType`\<`any`\>

The React component that wraps every component in a form. **Internal use only.**

***

### computeChildren?

> `optional` **computeChildren**: [`ComputeChildren`](../type-aliases/ComputeChildren.md)

Function that calculates all child properties of a component. **Internal use only.**

***

### erroneous?

> `optional` **erroneous**: `boolean`

If true, the component will not be wrapped by the error display component.
**Attention! Don't use it! Unstable API.**

***

### errorWrapper?

> `optional` **errorWrapper**: `ComponentType`\<[`ErrorWrapperProps`](ErrorWrapperProps.md)\>

The default error wrapper used when errorType is not specified in the form.

***

### event()?

> `optional` **event**: (`stream`) => `void`

The function for processing form events. **Internal use only.**

#### Parameters

• **stream**: [`EventStream`](../classes/EventStream.md)

the event stream of the form viewer.

#### Returns

`void`

***

### formName?

> `optional` **formName**: `string`

The form name.

***

### formValidators?

> `optional` **formValidators**: [`FormValidators`](../type-aliases/FormValidators.md)

The set of functions that validate the form data.

***

### getForm()?

> `optional` **getForm**: (`name`?) => `string` \| `Promise`\<`string`\>

Loads the form.

#### Parameters

• **name?**: `string`

the form name.

#### Returns

`string` \| `Promise`\<`string`\>

the string or Promise with the form.

***

### initialData?

> `optional` **initialData**: `Record`\<`string`, `unknown`\>

The initial data of the form.

***

### language?

> `optional` **language**: [`Language`](../classes/Language.md)

The language of form.

***

### licenseKey?

> `optional` **licenseKey**: `string`

The FormEngine license key.

***

### localize?

> `optional` **localize**: [`ComponentLocalizer`](../type-aliases/ComponentLocalizer.md)

The function to localize the properties of a component.

***

### onFormDataChange()?

> `optional` **onFormDataChange**: (`data`) => `void`

The event is called whenever a form data changes.

#### Parameters

• **data**: [`IFormData`](IFormData.md)

the [IFormData](IFormData.md) with all the form data.

#### Returns

`void`

***

### readOnly?

> `optional` **readOnly**: `boolean`

If true, the form is read-only.

***

### validators?

> `optional` **validators**: `Partial`\<`Record`\<keyof [`SchemaTypeMap`](../type-aliases/SchemaTypeMap.md), [`CustomValidationRules`](../type-aliases/CustomValidationRules.md)\>\>

The set of metadata of validation rules, grouped by the type of value being validated.

***

### view

> **view**: [`View`](../classes/View.md)

All the metadata of the components of the form viewer.

***

### viewMode?

> `optional` **viewMode**: [`ViewMode`](../type-aliases/ViewMode.md)

Display resolution type.

***

### viewerRef?

> `optional` **viewerRef**: `ForwardedRef`\<[`IFormViewer`](IFormViewer.md)\>

The reference to [IFormViewer](IFormViewer.md).
