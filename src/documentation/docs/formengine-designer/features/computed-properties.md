---
sidebar_position: 6
title: Computed properties
slug: /formengine-designer/features/computed-properties
---

# Computed properties

When designing a form in the designer, you can set the values of the component properties in the right pane. Opposite the component
properties there is a button that allows you to set a calculated value for the property.

There are the following types of calculated properties - localization and function. You can read about localization
in [this section](/formengine-designer/features/designer-localization) of the documentation.

## A simple example

Let's take a simple form containing two input fields, the values of which we need to multiply and display the result. Below is the JSON of
this form, you can upload it to the [public demo](https://demo.formengine.io/) via Menu => Upload.

```json
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "Container",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "Input 1",
            "type": "RsNumberFormat",
            "props": {
              "label": {
                "value": "Amount"
              }
            }
          },
          {
            "key": "Input 2",
            "type": "RsNumberFormat",
            "props": {
              "label": {
                "value": "Fee"
              }
            }
          },
          {
            "key": "Input 3",
            "type": "RsNumberFormat",
            "props": {
              "label": {
                "value": "Total"
              },
              "readOnly": {
                "value": true
              }
            }
          }
        ],
        "css": {
          "any": {
            "object": {
              "flexDirection": "row"
            }
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

As soon as the form is loaded, select the input field with the label "Amount" and set the key "amount" for it so that we can then access the
field value using this key. After that, set the keys for the "Fee" and "Total" fields ("fee" and "total" respectively) in the same way.

![Computed properties 01](/assets/computed-properties/computed-properties-01.png)

Now select the "Total" field and click on the button with the pen icon located near the "Value" property.

![Computed properties 02](/assets/computed-properties/computed-properties-02.png)

A panel with the property editor appears at the bottom of the screen. Here you can select:

1. Calculable value - to set the value of the property via JavaScript function.
2. Simple value - if you select this option, the property value will no longer be calculable.

![Computed properties 03](/assets/computed-properties/computed-properties-03.png)

Select "Calculated Value" and enter the highlighted lines into the code editor as shown below:

```javascript
/**
 * @param {IFormData} form
 * @return {string}
 */
function Calculation(form) {
  // highlight-start
  const {amount, fee} = form.data
  if (amount && fee) return amount * fee
  // highlight-end
}
```

![Computed properties 04](/assets/computed-properties/computed-properties-04.png)

Let's break down our function. The function receives the `form` parameter
of [IFormData](/api-reference/@react-form-builder/core/interfaces/IFormData) type and should return a `number`. Inside the
function we get the data entered in the input field through the `form.data.name` construct.
[form.data](/api-reference/@react-form-builder/core/interfaces/IFormData#data) is an object through which we can get and set the form
data, `name` is the value of the `key` field of our input field.

And then everything is simple, if there is data in the input fields and the data is not zero, the result of the function will be their
product. Otherwise, the function returns nothing (undefined).

![Computed properties 05](/assets/computed-properties/computed-properties-05.png)

Also, to the right of the code editor, you can see a panel with the test data of the form. You can enter the test data into the editor and
click "Run" to test what the function will return. Or you can use the "Autorun" checkbox to automatically test the function when the code
changes. You can see an example in the screenshot above.

![Computed properties 06](/assets/computed-properties/computed-properties-06.png)

Let's test the form in action. Click the "Save" button in the code editor, and then click on "Preview" in the page header to view the form.

Now, if you enter numeric values in the Amount and Fee fields, the value in the Total field will be automatically updated.

![Computed properties 07](/assets/computed-properties/computed-properties-07.png)

Here we have made the simplest computable property.

## How it's stored in JSON

When editing a form, the values of component properties are set, which are then stored in JSON format. A component property in JSON format
is described by the type [ComponentProperty](/api-reference/@react-form-builder/core/interfaces/ComponentProperty).

Below is an example of the created form:

```json {41-44}
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "Container",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "amount",
            "type": "RsNumberFormat",
            "props": {
              "label": {
                "value": "Amount"
              }
            }
          },
          {
            "key": "fee",
            "type": "RsNumberFormat",
            "props": {
              "label": {
                "value": "Fee"
              }
            }
          },
          {
            "key": "total",
            "type": "RsNumberFormat",
            "props": {
              "label": {
                "value": "Total"
              },
              "readOnly": {
                "value": true
              },
              "value": {
                "computeType": "function",
                "fnSource": "  const {amount, fee} = form.data\n  if (amount && fee) return amount * fee"
              }
            }
          }
        ],
        "css": {
          "any": {
            "object": {
              "flexDirection": "row"
            }
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

Note the highlighted lines. There is a `value` property. The property is set to `"computeType": "function"`, and
the body of the function is described in the `fnSource` property.

That's it. Try to set the property to a simple value and see the resulting JSON.
