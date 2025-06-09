---
sidebar_position: 120
title: Writing values via actions and computed properties
description: How to manipulate values using actions and computed properties.
slug: /writing-values-via-actions
---

# Writing values via actions and computed properties

In certain scenarios it might be necessary to create values that are dynamic and dependent on user interactions or other values provided by
your users. This functionality can be useful for combining input values, validating user input, or updating values based on changes, and so
on.

By defining actions and computed properties, you can create values that can be updated dynamically. Therefore, you can define a function
that can receive a value from one input, process this value, and return in within another component. This allows you to create more complex
and interactive forms that adapt to user interactions.

The following introduces an example that showcases how to create a dynamic value that combines the values of two input fields by using
[computed properties](/computed-properties) and an [action](/actions) that passes a value from one component to another.

## Creating dynamic values

The example below consists of a form with two input fields for the __First Name__ and __Last Name__. This form also provides another input
field with computed properties that combines first and last name values dynamically. In addition, the form includes a text area that also
reflects the value in the first name input using an [action](/actions).

```json
{
  "version": "1",
  "actions": {
    "action1": {
      "body": "  e.data.textArea = e.args[0]",
      "params": {}
    }
  },
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsContainer 1",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "firstName",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "First name"
              }
            },
            "events": {
              "onChange": [
                {
                  "name": "action1",
                  "type": "code"
                }
              ]
            }
          },
          {
            "key": "lastName",
            "type": "RsInput",
            "props": {
              "label": {
                "value": "Last name"
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
      },
      {
        "key": "RsInput 1",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "first_name_and_last_name"
          },
          "value": {
            "computeType": "function",
            "fnSource": "  return `${form.data.firstName ?? ''} ${form.data.lastName ?? ''}`.trim()"
          }
        }
      },
      {
        "key": "textArea",
        "type": "RsTextArea",
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

The action that passes the value from one component to another is called `action1` and it is defined within the `onChange` event. Therefore,
when the first name is defined within the corresponding input, its value is passed to the text area component. The action code is simple,
the value is set for the component with the `textArea` key:

```javascript {6} title='action1'
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action(e, args) {
  e.data.textArea = e.args[0]
}
```

![Action](/assets/guides/writing-values-via-actions/writing-values-via-actions-01.png)

The input component called `first_name_and_last_name` has the `Value` property defined as a computed property. The value is calculated as a
combination of the values from the _first name_ and _last name_ inputs. The combined value is trimmed using a JavaScript method:

```javascript {6}
/**
 * @param {IFormData} form
 * @return {string}
 */
function Calculation(form) {
  return `${form.data.firstName ?? ''} ${form.data.lastName ?? ''}`.trim()
}
```

![Computed property](/assets/guides/writing-values-via-actions/writing-values-via-actions-02.png)

By following this example, you can learn how to use actions and computed properties to create your own dynamic values and take advantage of
the benefits of interactive and responsive forms.

![Result](/assets/guides/writing-values-via-actions/writing-values-via-actions-03.png)
