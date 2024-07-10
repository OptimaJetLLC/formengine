---
sidebar_position: 5
title: Validation
slug: /validation
---

# Validation

## Overview

There are two types of validation in FormBuilder:

1. Field validation - this type of validator will validate only one form field, obviously.
2. Form validation - this type of validator validates the whole form.

When validating a form, all validators are executed as asynchronous functions. The validators for fields are called first, then the
validators for the form are called.

## Field validation

Field validators come in different types:

1. Built-in FormBuilder. There are a number of predefined validators for different data types (string, number, etc.).
2. Defined by code inside the FormBuilder.
3. Passed externally to the FormBuilder/FormViewer component via
   the [validators](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#validators) parameter.

In the simplest case, a validator is a function that returns `true` or `false` or an error text. Field validators are grouped by the type of
value being validated (string, number, etc.), i.e. a validator for the string type will not be available in the designer interface for a
numeric value, etc.

### Built-in validators

To add a validator to a component - select the component in the designer and go to the "Rules" tab as in the screenshot below:

![Validation 01](/assets/validation/validation-01.png)

If the "Auto validate" flag is enabled, validators for the component will be automatically called when the value of the field changes, i.e.,
essentially immediately upon data entry.

To add a validator, you can click the "Add a validation rule" button:

![Validation 02](/assets/validation/validation-02.png)

For example, we added a "Min" validator that checks that the field value contains at least 5 letters (set in the "Limit" parameter). We left
the "Message" parameter blank - if the validation fails, the standard text provided by the built-in validator will be used. If you fill in
the "Message" parameter, this value will be used, which can be localized using Fluent!

![Validation 03](/assets/validation/validation-03.png)

We can switch to form view mode and start entering data to see how the validator works:

![Validation 04](/assets/validation/validation-04.png)

### Code validator

This type of validation is defined for data of type string. To use this validator - select "Code" from the drop-down menu.

![Validation 05](/assets/validation/validation-05.png)

Then click the "Edit code" button to edit the validation function code. Paste the highlighted lines into the code editor.

```javascript
/**
 * @param {string} value the validated value.
 * @return {boolean} the validation result.
 */
async (value) => {
  // highlight-next-line
  return value !== 'test'
}
```

Also add the text "no test, please" to the "Message" parameter of the validator as shown in the screenshot below:

![Validation 06](/assets/validation/validation-06.png)

As you can see from the code - the validator should return true in case of validation success, in case of error - false. The error text will
be taken from the "Message" parameter, as in the case with built-in validators.

Click the "Save" button, and go into form preview mode (the "Preview" button), to test how our validator works. If you re-enter the "test"
value in the field, you will see two error messages separated by a space. There are two messages because two validators have been
triggered - the minimum field length validator and the validator defined by the code.

![Validation 07](/assets/validation/validation-07.png)

### User-defined validators

This kind of validators is passed through the [validators](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#validators)
property and works the same way as the built-in validators. You can see an example in [this](/usage#viewer) section of the
documentation.

Once validators are connected via a property, they will be available for selection in the designer and can be handled in the same way as
built-in validators. A simple example of validators:

```typescript
// You can define custom validators for form fields
const customValidators: Validators = {
  'string': {
    'isHex': {
      validate: value => /^[0-9A-F]*$/i.test(value)
    },
    'isHappy': {
      params: [],
      validate: value => value === 'Happy'
    },
    'equals': {
      params: [
        {key: 'value', type: 'string', required: false, default: 'Ring'},
        {key: 'message', type: 'string', required: false, default: 'Value must be equals to '}
      ],
      validate: (value, _, args) => {
        const errorMessage = args?.['message'] as string
        const checkedValue = args?.['value'] as string
        const errorResult = errorMessage ? errorMessage + checkedValue : false
        return value !== args?.['value'] ? errorResult : true
      }
    }
  },
  'number': {},
  'boolean': {
    'onlyTrue': {
      validate: value => value === true
    }
  },
}
```

## Form validation

Whole form validation can be implemented if validators have been passed to the FormBuilder/FormViewer properties in
the [formValidators](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#formvalidators) property.

[FormValidators](/api-reference/@react-form-builder/core/type-aliases/FormValidators) is an array of
the [validation function](/api-reference/@react-form-builder/core/type-aliases/FormValidator). Each form validation
function is an asynchronous function that takes form data as input and returns an object with form field validation errors, or an empty
object if the form validation is successful.

Below is a simple example of validating a form by checking the "login" and "agreeCheckbox" fields:

```typescript
const formValidators: FormValidators = [
  async (data) => {
    const result: any = {}
    if (data.login === 'sun') {
      result.login = 'Login already exists - sun'
    }
    if (data.agreeCheckbox === false) {
      result.agreeCheckbox = 'Agree checkbox must be checked'
    }
    return result
  }
]
```
