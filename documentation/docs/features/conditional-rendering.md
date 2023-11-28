---
sidebar_position: 8
title: Conditional rendering
slug: /conditional-rendering
---

# Conditional rendering

## Overview

FormBuilder out of the box supports conditional rendering for components. For this purpose, a special component
property [renderWhen](/api-reference/classes/react_form_builder_core.ComponentStore#renderwhen) is used.

The value of the property is treated as an expression that should return `true` when the component needs to be rendered. The expression in
this case is the function text, without the `return` keyword. A `form` variable of
type [IFormData](/api-reference/interfaces/react_form_builder_core.IFormData) is available in the body of the expression, just as it is
in [computed properties](/computed-properties).

You can also make the property computed if you want to write a full function that calculates whether the component should be displayed.

## Example

Create a simple form with two controls:

1. A checkbox with the `checkbox` key.
2. Button (the key of this component does not matter for us).

And the Button component will only be rendered if the checkbox is checked.

![Conditional rendering 01](/assets/conditional-rendering/conditional-rendering-01.png)

Here is the JSON of the form:

```json {9,31-33} title='SampleForm.json' showLineNumbers
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "checkbox",
        "type": "RsCheckbox",
        "props": {
          "children": {
            "value": "I agree to receive emails from the subscription."
          }
        }
      },
      {
        "key": "subscribeButton",
        "type": "RsButton",
        "props": {
          "children": {
            "value": "Subscribe"
          },
          "appearance": {
            "value": "primary"
          },
          "color": {
            "value": "green"
          }
        },
        "renderWhen": {
          "value": "form.data.checkbox"
        }
      }
    ]
  },
  "localization": {},
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

You can upload this form to our [public demo](https://demo.formengine.io/) to check how it works. Switch to "Preview" mode and click on the
checkbox component. The button will only be displayed if the value of the checkbox component is equivalent to `true`. The button will not
render if the value is not `true`. The button will also not be in the DOM tree.

![Conditional rendering 02](/assets/conditional-rendering/conditional-rendering-02.png)

You can achieve the same behavior by making the property computable:

![Conditional rendering 03](/assets/conditional-rendering/conditional-rendering-03.png)
