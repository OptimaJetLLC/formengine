---
sidebar_position: 80
title: Building forms via code
description: How to create a form using code.
slug: /building-forms-via-code
---

# Building forms via code

## Introduction

Building a form using code is an alternative to building a form through the graphical user interface. With code-based form creation, you
have full control over the form structure and fields, allowing you to create complex and customized forms efficiently.

This approach provides a more flexible and efficient way to create forms, allowing you to define a complex form with multiple fields and
conditions in a single, self-contained object. Additionally, you can use this method to create a form from scratch or edit existing forms,
giving you full control over the form's structure and behavior.

In the following sections, we will explore the process of building forms using code, providing an example to guide you through the form
creation process.

## Example Form

In this example, we define a simple form with three components: a name input field, a password input field, and a submit button. Each
component is created using a specific class, which allows us to define the properties and behavior of each form element.

```typescript
import {ComponentStore, PersistedForm} from '@react-form-builder/core'

const createSimpleForm = (): ComponentStore => {
  const nameInput = new ComponentStore('name', 'RsInput')
  // value - simple value of the prop, the prop value can also be a localized value or a calculated value
  nameInput.props.placeholder = {value: 'Enter you name'}
  nameInput.props.label = {value: 'Name'}
  // make this field required
  nameInput.schema = {
    validations: [{key: 'required'}],
  }
  // set the properties of the tooltip
  nameInput.tooltipProps = {
    text: {value: 'Name'}
  }

  const passwordInput = new ComponentStore('password', 'RsInput')
  passwordInput.props = {
    placeholder: {value: 'Enter you password'},
    label: {value: 'Password'},
    passwordMask: {value: true},
  }
  passwordInput.tooltipProps = {
    text: {value: 'Password'},
    placement: {value: 'top'},
  }

  const submitButton = new ComponentStore('submit', 'RsButton')
  submitButton.props = {
    children: {value: 'Login'},
    color: {value: 'blue'},
    appearance: {value: 'primary'},
  }
  // add a validate action
  submitButton.events = {
    onClick: [
      {
        name: 'validate',
        type: 'common',
      }
    ]
  }

  // root element of the form, always screen
  const root = new ComponentStore('screen', 'Screen')
  root.children = [
    nameInput,
    passwordInput,
    submitButton,
  ]
  return root
}

const createForm = (): PersistedForm => {
  // main object
  return {
    defaultLanguage: 'en-US',
    form: createSimpleForm(),
    languages: [],
    localization: {},
    // type of component that displays the tooltip
    tooltipType: 'RsTooltip',
    // type of component that displays the error
    errorType: 'RsErrorMessage',
  }
}

export const codeGeneratedForm = (): string => {
  const persistedForm = createForm()
  return JSON.stringify(persistedForm)
}
```

The `createSimpleForm` function creates the form structure by defining the properties for each component. We set properties such as
placeholder, label, validation rules, and event handlers for the form elements.

The `createForm` function creates the main form object, which includes the form structure, default language, localization settings, and
tooltip/error component types.

Finally, the `codeGeneratedForm` function returns the JSON representation of the form object using `JSON.stringify`. This allows you to
easily generate the form code and use it in your application.
