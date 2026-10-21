---
title: Validation
description: In this article, you will learn how to validate fields and the entire form
sidebar_position: 5
slug: /formengine-designer/features/validation
---

:::info[For form authors]

Add **Required** and built-in rules on the **Rules** tab, then test messages in **Preview**.

[Full guide →](designer-guide:behavior-and-validation/validation-basics/)
:::

## Validation

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

### Conditional validation

If you want the [built-in](#built-in-validators) or [custom](#user-defined-validators) validation to be executed only when certain
conditions are met, then you can use the _Validate when_ property.

:::info
Automatic validation is triggered only when the value of its field is changed. For example, if the form data has been changed, but the field
with conditional validation has not changed, then automatic conditional validation for the field will not be triggered.
:::

![Validation 08](/assets/validation/validation-08.png)

It is located in the list of parameters of each validation rule and allows you to set the condition in two ways:

* Simplified, through the input field, where you can specify a one-line expression, for example `form.data.check1 === true`.
* Through the code editor, which can be opened by clicking on the pen icon to the left of the _Validate when_ label.

![Validation 09](/assets/validation/validation-09.png)

#### Example

1. Create a simple form with three controls: `Checkbox`, `Input` and `Button`.
2. Set the `check1` key to the checkbox.

   ![Validation 15](/assets/validation/validation-15.png)

3. For the button, add the action `validate`.

   ![Validation 10](/assets/validation/validation-10.png)

4. For the input field, add the validation `Required`.

   ![Validation 11](/assets/validation/validation-11.png)

5. Set the _Validate when_ property for the `Required` validator to `form.data.check1`.

   ![Validation 12](/assets/validation/validation-12.png)

6. Now, go to the `Preview` mode and press the checkbox to the off position.
7. Click the validation button. You'll notice that no validation is triggered, despite the email field being empty.

   ![Validation 13](/assets/validation/validation-13.png)

8. If you check the checkbox and then click on the validation button, validation will be triggered.

   ![Validation 14](/assets/validation/validation-14.png)

### Code validator

This type of validation is defined for data of type string. To use this validator - select "Code" from the drop-down menu.

![Validation 05](/assets/validation/validation-05.png)

Then click the "Edit code" button to edit the validation function code. Paste the highlighted lines into the code editor.

```javascript
/**
 * @param {string} value the validated value.
 * @param {IFormData} form the form.
 * @return {boolean} the validation result.
 */
async (value, form) => {
  // highlight-next-line
  return value !== 'test' && value !== form.data.lastName
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
property and works the same way as the built-in validators. You can see an example
in [this](/formengine-designer/getting-started/usage#viewer) section of the documentation.

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

### Form validator editor

When editing a form in the designer, you can set a code that will validate the entire form. To do this, go to the **Settings** tab and click
the **Edit code** button at the **Form validator** property.

![Validation 16](/assets/validation/validation-16.png)

In the edit window, write your validation function, which receives form data as input and returns the result in object format, where the key
is the field key and the value is the error text. You can also return an empty object or `undefined` if validation is successful.

Example:

```ts
/**
 * @param {Record<string, unknown>} formData the form data.
 * @returns {Record<string, string> | undefined} the validation result.
 */
async (formData) => {
  const result = {}
  if (formData.input0 !== 'input0') result.input0 = 'invalid input0'
  if (formData.input2 !== 'input2') result.input2 = 'invalid input2'
  return result
}
```

### External

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
