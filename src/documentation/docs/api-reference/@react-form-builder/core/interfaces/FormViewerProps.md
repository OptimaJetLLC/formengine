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

### disabled?

> `optional` **disabled**: `boolean`

If true, the form is disabled.

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

### errors?

> `optional` **errors**: `Record`\<`string`, `unknown`\>

The form validation errors.

***

### formName?

> `optional` **formName**: `string`

The form name.
Updating the value triggers the [FormViewerProps.getForm](FormViewerProps.md#getform) function.

***

### formOptions?

> `optional` **formOptions**: `any`

The form options. Used to transfer any options to the [FormViewerProps.getForm](FormViewerProps.md#getform) function.
Updating the value triggers the [FormViewerProps.getForm](FormViewerProps.md#getform) function.

***

### formValidators?

> `optional` **formValidators**: [`FormValidators`](../type-aliases/FormValidators.md)

The set of functions that validate the form data.

***

### getForm()?

> `optional` **getForm**: (`name`?, `options`?) => `string` \| `Promise`\<`string`\>

Loads the form.

#### Parameters

• **name?**: `string`

the form name.

• **options?**: `any`

the form options.

#### Returns

`string` \| `Promise`\<`string`\>

the string or Promise with the form.

***

### initialData?

> `optional` **initialData**: `Record`\<`string`, `unknown`\>

The initial data of the form.

***

### language?

> `optional` **language**: \`$\{string\}-$\{string\}\`

The language of the form, e.g. 'en-US'.

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

### showAllValidationErrors?

> `optional` **showAllValidationErrors**: `boolean`

If true, all validation errors will be displayed.

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
