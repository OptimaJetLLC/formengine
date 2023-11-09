---
sidebar_position: 6
title: Computed properties
slug: /computed-properties
---

# Computed properties

When designing a form in the designer, you can set the values of the component properties in the right pane. Opposite the component
properties there is a button that allows you to set a calculated value for the property.

There are the following types of calculated properties - localization and function. You can read about localization
in [this section](/localization) of the documentation.

## A simple example

Let's take the simplest form that contains an input field and a button. Below is the JSON of this form, you can upload it to
the [public demo](https://demo.formengine.io/) via Menu => Upload.

```json
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "name",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Name"
          },
          "placeholder": {
            "value": "Enter your name"
          }
        }
      },
      {
        "key": "submitButton",
        "type": "RsButton",
        "props": {}
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

Once the form is loaded - select the button in the designer and then click on the button with the pen icon as in the screenshot below.

![Computed properties 01](/assets/computed-properties/computed-properties-01.png)

A panel with the property editor appears at the bottom of the screen. Here you can select:

1. Calculable value - to set the value of the property via JavaScript function.
2. Fluent localization - to set the property value via the fluent localization library.
3. Simple value - if you select this option, the property value will no longer be calculable.

![Computed properties 02](/assets/computed-properties/computed-properties-02.png)

Select "Calculated Value" and enter the highlighted string into the code editor as shown below:

```javascript
/**
 * @param {IFormData} form
 * @return {string}
 */
function Calculation(form) {
  // highlight-next-line
  return form.data.name ? `Hello, ${form.data.name}` : 'Submit'
}
```

![Computed properties 03](/assets/computed-properties/computed-properties-03.png)

Let's break down our function. The function receives the `form` parameter
of [IFormData](/api-reference/interfaces/react_form_builder_core.IFormData) type and should return a `string`. Inside the
function we get the data entered in the input field through the `form.data.name` construct.
[form.data](/api-reference/interfaces/react_form_builder_core.IFormData#data) is an object through which we can get and set the form
data, `name` is the value of the `key` field of our input field.

And then everything is simple, if there is data in the input field, the result of the function will be a string with a greeting
like `Hello, World`, where `World` is the entered value in the input field. If there is no data in the input field, the function will
return `Submit`.

Also, to the right of the code editor, you can see a panel with the test data of the form. You can enter the test data into the editor and
click "Run" to test what the function will return. Or you can use the "Autorun" checkbox to automatically test the function when the code
changes. You can see an example in the screenshot above.

Let's test the form in action. Click the "Save" button, the text on the button will change to "Submit".

Now click on the "Preview" button to preview the form. And start entering data in the input box. The text on the button will automatically
change.

![Computed properties 04](/assets/computed-properties/computed-properties-04.png)

Here we have made the simplest computable property.

## How it's stored in JSON

When editing a form, the values of component properties are set, which are then stored in JSON format. A component property in JSON format
is described by the type [ComponentProperty](/api-reference/interfaces/react_form_builder_core.ComponentProperty).

Below is an example of the created form:

```json {24-27}
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "name",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Name"
          },
          "placeholder": {
            "value": "Enter your name"
          }
        }
      },
      {
        "key": "submitButton",
        "type": "RsButton",
        "props": {
          "children": {
            "computeType": "function",
            "fnSource": "  return form.data.name ? `Hello, ${form.data.name}` : 'Submit'"
          }
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

Note the highlighted lines. There is a `children` property. Yes, yes, in reality this React component has text written in the `children`
property, it's just that in the designer this property is given the name `Content`. The property is set to `"computeType": "function"`, and
the body of the function is described in the `fnSource` property.

That's it. That's it. Try to set the property to a simple value and see the resulting JSON.
