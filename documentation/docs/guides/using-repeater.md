---
sidebar_position: 130
title: Using Repeater
description: Learn how to use the Repeater component in your project.
slug: /using-repeater
---

# Using Repeater

In this guide, we will look at how to work with the Repeater component, show you how to work with the component data that is inside the
Repeater. You can find a description of the component properties on [this page](/components-library/structure-components/repeater).

The Repeater component differs from other components in that it displays differently in designer mode and form view mode. In designer mode
Repeater displays child components like a normal container, but in view mode Repeater displays an array of components based on the value
from the `Value` property. If the `Value` property does not contain data (or contains an empty array), the component will not display child
components. The data in the `Value` property is an array of objects. Each object in the array is the data of one Repeater row/column.

Let's move on to a Repeater use case where we show how data is handled inside Repeater and how actions, validation, localization and
calculated fields are handled.

## Repeater example

Take a look at the form below, JSON below (you can upload this form to our [demo](https://demo.formengine.io/) to see how it works):

<details>
  <summary>Example of a booking form</summary>

```json
{
  "version": "1",
  "actions": {
    "addRepeaterElement": {
      "body": "    const data = e.data[args.name] ?? []\n    if (typeof args.max !== 'undefined') {\n        if (data.length >= args.max) return\n    }\n    data.push({})\n    e.data[args.name] = [...data]",
      "params": {
        "name": "string",
        "max": "number"
      }
    },
    "increment": {
      "body": "    let value = e.data[args.item] + 1\n    value = value > args.max ? args.max : value\n    e.data[args.item] = value",
      "params": {
        "item": "string",
        "max": "number"
      }
    },
    "decrement": {
      "body": "    let value = e.data[args.item] - 1\n    value = value < args.min ? args.min : value\n    e.data[args.item] = value",
      "params": {
        "item": "string",
        "min": "number"
      }
    },
    "removeChildAge": {
      "body": "    const data = e.data.childrenAges ?? []\n    const length = e.data.childrenAges.length\n    if (length) {\n        e.data.childrenAges = data.toSpliced(length - 1)\n    }",
      "params": {}
    },
    "removeParentRepeaterItem": {
      "body": "  const data = e.parentData[args.name]\n  e.parentData[args.name] = data.toSpliced(e.index, 1)",
      "params": {
        "name": "string"
      }
    },
    "removeRepeaterElement": {
      "body": "  const data = e.data[args.name]\n  if (data.length <= args.min) return\n  e.data[args.name] = data.toSpliced(data.length - 1, 1)",
      "params": {
        "name": "string",
        "min": "number"
      }
    }
  },
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "header",
        "type": "RsHeader",
        "props": {
          "content": {
            "value": "Hotel booking"
          }
        }
      },
      {
        "key": "date",
        "type": "RsDatePicker",
        "props": {
          "editable": {
            "value": false
          },
          "oneTap": {
            "value": true
          },
          "label": {
            "value": "Date"
          }
        }
      },
      {
        "key": "rsContainer1",
        "type": "RsContainer",
        "props": {},
        "children": [
          {
            "key": "bookButton",
            "type": "RsButton",
            "props": {
              "children": {
                "value": "Button",
                "computeType": "localization"
              },
              "appearance": {
                "value": "primary"
              },
              "color": {
                "value": "green"
              }
            },
            "events": {
              "onClick": [
                {
                  "name": "addRepeaterElement",
                  "type": "code",
                  "args": {
                    "name": "rooms"
                  }
                }
              ]
            }
          }
        ]
      },
      {
        "key": "rooms",
        "type": "Repeater",
        "props": {
          "value": {
            "value": []
          }
        },
        "children": [
          {
            "key": "rsContainer7",
            "type": "RsContainer",
            "props": {},
            "css": {
              "any": {
                "object": {
                  "flexDirection": "row"
                }
              }
            },
            "children": [
              {
                "key": "rsContainer6",
                "type": "RsContainer",
                "props": {},
                "children": [
                  {
                    "key": "roomType",
                    "type": "RsDropdown",
                    "props": {
                      "cleanable": {
                        "value": false
                      },
                      "data": {
                        "value": [
                          {
                            "value": "standart",
                            "label": "Standart"
                          },
                          {
                            "value": "luxe",
                            "label": "Luxe"
                          }
                        ]
                      },
                      "label": {
                        "value": "Room"
                      }
                    },
                    "schema": {
                      "validations": [
                        {
                          "key": "required"
                        }
                      ]
                    },
                    "wrapperCss": {
                      "any": {
                        "object": {}
                      }
                    }
                  },
                  {
                    "key": "removeRoomButton",
                    "type": "RsButton",
                    "props": {
                      "children": {
                        "value": "Remove room",
                        "computeType": "function",
                        "fnSource": "    const index = (form.index ?? 0) + 1\n    return `Remove room #${index}`"
                      }
                    },
                    "events": {
                      "onClick": [
                        {
                          "name": "removeParentRepeaterItem",
                          "type": "code",
                          "args": {
                            "name": "rooms"
                          }
                        }
                      ]
                    }
                  },
                  {
                    "key": "rsStaticContent1",
                    "type": "RsStaticContent",
                    "props": {
                      "content": {
                        "computeType": "localization"
                      }
                    }
                  }
                ]
              },
              {
                "key": "rsContainer5",
                "type": "RsContainer",
                "props": {},
                "children": [
                  {
                    "key": "rsContainer2",
                    "type": "RsContainer",
                    "props": {},
                    "css": {
                      "any": {
                        "object": {
                          "flexDirection": "row"
                        }
                      }
                    },
                    "children": [
                      {
                        "key": "minusAdultButton",
                        "type": "RsButton",
                        "props": {
                          "children": {
                            "value": "-"
                          }
                        },
                        "wrapperCss": {
                          "any": {
                            "object": {
                              "marginTop": "auto"
                            }
                          }
                        },
                        "events": {
                          "onClick": [
                            {
                              "name": "decrement",
                              "type": "code",
                              "args": {
                                "item": "adults",
                                "min": 1
                              }
                            },
                            {
                              "name": "removeRepeaterElement",
                              "type": "code",
                              "args": {
                                "name": "names",
                                "min": 1
                              }
                            }
                          ]
                        }
                      },
                      {
                        "key": "adults",
                        "type": "RsNumberFormat",
                        "props": {
                          "allowNegative": {
                            "value": false
                          },
                          "label": {
                            "value": "Adults"
                          },
                          "value": {
                            "value": 1
                          },
                          "disabled": {
                            "value": true
                          }
                        },
                        "schema": {
                          "validations": []
                        },
                        "wrapperCss": {
                          "any": {
                            "object": {
                              "marginTop": "auto"
                            }
                          }
                        },
                        "tooltipProps": {
                          "text": {
                            "computeType": "function",
                            "fnSource": "    const index = form.index ?? 0\n    return `Adults in room #${index + 1}`"
                          }
                        }
                      },
                      {
                        "key": "plusAdultButton",
                        "type": "RsButton",
                        "props": {
                          "children": {
                            "value": "+"
                          }
                        },
                        "wrapperCss": {
                          "any": {
                            "object": {
                              "marginTop": "auto"
                            }
                          }
                        },
                        "events": {
                          "onClick": [
                            {
                              "name": "increment",
                              "type": "code",
                              "args": {
                                "item": "adults",
                                "max": 5
                              }
                            },
                            {
                              "name": "addRepeaterElement",
                              "type": "code",
                              "args": {
                                "name": "names"
                              }
                            }
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "key": "rsContainer4",
                    "type": "RsContainer",
                    "props": {},
                    "css": {
                      "any": {
                        "object": {
                          "flexDirection": "row"
                        }
                      }
                    },
                    "children": [
                      {
                        "key": "minusChildButton",
                        "type": "RsButton",
                        "props": {
                          "children": {
                            "value": "-"
                          }
                        },
                        "wrapperCss": {
                          "any": {
                            "object": {
                              "marginTop": "auto"
                            }
                          }
                        },
                        "events": {
                          "onClick": [
                            {
                              "name": "decrement",
                              "type": "code",
                              "args": {
                                "item": "children",
                                "min": 0
                              }
                            },
                            {
                              "name": "removeChildAge",
                              "type": "code"
                            }
                          ]
                        }
                      },
                      {
                        "key": "children",
                        "type": "RsNumberFormat",
                        "props": {
                          "allowNegative": {
                            "value": false
                          },
                          "label": {
                            "value": "Children"
                          },
                          "value": {
                            "value": 0
                          },
                          "disabled": {
                            "value": true
                          }
                        },
                        "schema": {
                          "validations": []
                        }
                      },
                      {
                        "key": "plusChildButton",
                        "type": "RsButton",
                        "props": {
                          "children": {
                            "value": "+"
                          }
                        },
                        "wrapperCss": {
                          "any": {
                            "object": {
                              "marginTop": "auto"
                            }
                          }
                        },
                        "events": {
                          "onClick": [
                            {
                              "name": "increment",
                              "type": "code",
                              "args": {
                                "item": "children",
                                "max": 7
                              }
                            },
                            {
                              "name": "addRepeaterElement",
                              "type": "code",
                              "args": {
                                "name": "childrenAges",
                                "max": 7
                              }
                            }
                          ]
                        }
                      }
                    ]
                  },
                  {
                    "key": "rsContainer3",
                    "type": "RsContainer",
                    "props": {},
                    "css": {
                      "any": {
                        "object": {
                          "flexDirection": "column"
                        }
                      }
                    },
                    "children": [
                      {
                        "key": "childrenAges",
                        "type": "Repeater",
                        "props": {},
                        "children": [
                          {
                            "key": "childAge",
                            "type": "RsDropdown",
                            "props": {
                              "data": {
                                "value": [
                                  {
                                    "value": "none",
                                    "label": "Age needed"
                                  },
                                  {
                                    "value": "0",
                                    "label": "0 years old"
                                  },
                                  {
                                    "value": "1",
                                    "label": "1 year old"
                                  },
                                  {
                                    "value": "2",
                                    "label": "2 years old"
                                  },
                                  {
                                    "value": "3",
                                    "label": "3 years old"
                                  },
                                  {
                                    "value": "4",
                                    "label": "4 years old"
                                  },
                                  {
                                    "value": "5",
                                    "label": "5 years old"
                                  },
                                  {
                                    "value": "6",
                                    "label": "6 years old"
                                  },
                                  {
                                    "value": "7",
                                    "label": "7 years old"
                                  },
                                  {
                                    "value": "8",
                                    "label": "8 years old"
                                  },
                                  {
                                    "value": "9",
                                    "label": "9 years old"
                                  },
                                  {
                                    "value": "10",
                                    "label": "10 years old"
                                  },
                                  {
                                    "value": "11",
                                    "label": "11 years old"
                                  },
                                  {
                                    "value": "12",
                                    "label": "12 years old"
                                  },
                                  {
                                    "value": "13",
                                    "label": "13 years old"
                                  },
                                  {
                                    "value": "14",
                                    "label": "14 years old"
                                  },
                                  {
                                    "value": "15",
                                    "label": "15 years old"
                                  },
                                  {
                                    "value": "16",
                                    "label": "16 years old"
                                  },
                                  {
                                    "value": "17",
                                    "label": "17 years old"
                                  }
                                ]
                              },
                              "cleanable": {
                                "value": false
                              },
                              "value": {
                                "value": "none"
                              },
                              "label": {
                                "value": ""
                              }
                            },
                            "schema": {
                              "validations": [
                                {
                                  "key": "code",
                                  "args": {
                                    "code": "  return value !== 'none'"
                                  }
                                }
                              ]
                            },
                            "css": {
                              "any": {
                                "string": ""
                              }
                            },
                            "tooltipProps": {
                              "text": {
                                "computeType": "function",
                                "fnSource": "    const index = form.index ?? 0\n    const date = form.rootData.date?.toISOString() ?? 'unknown'\n    const room = form.parentData?.roomType ?? 'unknown'\n    return `Child #${index + 1} in room ${room}, date: ${date}`"
                              }
                            }
                          }
                        ],
                        "css": {
                          "any": {
                            "object": {},
                            "string": "  flex-wrap: wrap;\n  border: 1px silver dashed;"
                          }
                        },
                        "wrapperCss": {
                          "any": {
                            "object": {
                              "flexDirection": "row"
                            }
                          }
                        }
                      }
                    ],
                    "wrapperCss": {
                      "any": {
                        "object": {
                          "marginTop": "auto"
                        }
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            "key": "names",
            "type": "Repeater",
            "props": {
              "value": {
                "value": [
                  {}
                ]
              }
            },
            "children": [
              {
                "key": "rsContainer9",
                "type": "RsContainer",
                "props": {},
                "css": {
                  "any": {
                    "object": {
                      "flexDirection": "row"
                    },
                    "string": "  border: 1px orchid dashed;"
                  }
                },
                "children": [
                  {
                    "key": "firstName",
                    "type": "RsInput",
                    "props": {
                      "label": {
                        "value": "First name"
                      }
                    },
                    "schema": {
                      "validations": [
                        {
                          "key": "required"
                        }
                      ],
                      "autoValidate": false
                    }
                  },
                  {
                    "key": "lastName",
                    "type": "RsInput",
                    "props": {
                      "label": {
                        "value": "Last name"
                      }
                    },
                    "schema": {
                      "validations": [
                        {
                          "key": "required"
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ],
        "css": {
          "any": {
            "object": {
              "flexDirection": "column"
            },
            "string": "  border: 1px darkorange dashed;"
          }
        }
      },
      {
        "key": "validateButton",
        "type": "RsButton",
        "props": {
          "appearance": {
            "value": "primary"
          },
          "children": {
            "value": "Validate"
          }
        },
        "events": {
          "onClick": [
            {
              "name": "validate",
              "type": "common"
            }
          ]
        }
      }
    ]
  },
  "localization": {
    "en-US": {
      "bookButton": {
        "component": {
          "children": " Book a room"
        }
      },
      "rsStaticContent1": {
        "component": {
          "content": "Room {$roomType}"
        }
      }
    },
    "de-DE": {
      "bookButton": {
        "component": {
          "children": " Zimmer buchen"
        }
      },
      "rsStaticContent1": {
        "component": {
          "content": "Zimmer {$roomType}"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    },
    {
      "code": "de",
      "dialect": "DE",
      "name": "Deutsch",
      "description": "German",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

</details>

For example, we will take a simplified hotel booking form. There are three elements of type Repeater in the form:

1. Rooms
2. Names
3. Children's ages

For illustrative purposes, these elements are circled with dashed lines of different colors.

There are also the following fields on the form:

- field for entering the date of booking
- fields for selecting room type (standard/suite)
- button for deleting the added room
- static element for displaying the selected room type
- buttons to increase/decrease the number of adults
- buttons to increase/decrease the number of children
- fields for selecting the age of children (if children are indicated)
- fields for entering the first and last name of adults
- button for validating the whole form

This is how the form looks like in designer mode:

![Repeater](/assets/guides/using-repeater/using-repeater-01.png "Booking form")

And this is how the form looks like in view mode (English):

![Repeater](/assets/guides/using-repeater/using-repeater-02.png "Booking form (English)")

And this is how the form might look in German:

![Repeater](/assets/guides/using-repeater/using-repeater-03.png "Booking form (Deutsch)")

## Explanation

When you work with the Repeater component in designer mode, it appears as a regular container on the screen. However, when you switch to
view the form, things change. In this mode, the Repeater uses an array that is populated from the `Value` property (which is reflected in
the form data) and displays your components multiple times, depending on how many elements are in the array. By modifying the form data, you
can manipulate the number of items in the Repeater.

There is another important difference in the behavior of the components that are inside the Repeater. The data of these components is
isolated, as it were. You can think of a single Repeater element as one mini-form with its own data set.

Let's look at how you can add and remove items in the Repeater.

### Adding items to the Repeater

If we look at the "Book a room" button, then the [Action](/actions) `addRepeaterElement` is linked to this button. This action has a fairly
general code that can be used in other forms too. The action parameters `name` and `max` define the name of the Repeater property in the
form data and the maximum number of elements that can be added to the repeater, respectively.

The action code is pretty straightforward, it gets the current repeater data from the form data and then adds a new element to the data
array if the number of elements is lower than the maximum.

After changing the data, the Repeater component will automatically display the set of components on the form. In our case, a set of
components for booking a room will be added.

```javascript title='addRepeaterElement'
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {{name: string, max: number}} args - the action parameters arguments.
 */
async function Action(e, args) {
  const data = e.data[args.name] ?? []
  if (typeof args.max !== 'undefined') {
    if (data.length >= args.max) return
  }
  data.push({})
  e.data[args.name] = [...data]
}
```

The `plusAdultButton` and `plusChildButton` buttons that increase the number of elements in the Repeaters to specify the names of residents
and specify the ages of children also use this action.

### Removing items from the Repeater

Removing items from Repeater is similar to the add operation, you need to modify the array in the form data by removing items from the
array.

There is a `removeParentRepeaterItem` action bound to the `removeRoomButton` to remove a room. This action has a `name` parameter that also
defines the name of the property in the form data that stores the Repeater data array.

The code of this action contains only a few lines, it basically just removes an element from the array in the form data by a certain key.
Pay attention to the features:

1. The code operates on the data in [e.parentData](/api-reference/@react-form-builder/core/classes/ActionEventArgs#parentdata).
2. The code uses the index from [e.index](/api-reference/@react-form-builder/core/classes/ActionEventArgs#index).

```javascript title='removeParentRepeaterItem'
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {{name: string}} args - the action parameters arguments.
 */
async function Action(e, args) {
  const data = e.parentData[args.name]
  e.parentData[args.name] = data.toSpliced(e.index, 1)
}
```

Since the button is inside the Repeater component, the data
in [e.data](/api-reference/@react-form-builder/core/classes/ActionEventArgs#data) will be different, this property will contain the data
that is in this Repeater element. The [e.index](/api-reference/@react-form-builder/core/classes/ActionEventArgs#index) property will contain
the index of the element in the Repeater data array. You can access the data of the parent form through
the [e.parentData](/api-reference/@react-form-builder/core/classes/ActionEventArgs#parentdata) property.
And through the [e.rootData](/api-reference/@react-form-builder/core/classes/ActionEventArgs#rootdata) property, you can get the data of the
entire form.

When the component to remove elements from the Repeater is outside the Repeater, you need to operate `e.data` as the `removeRepeaterElement`
action on the `minusAdultButton` does.

```javascript title='removeRepeaterElement'
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {{name: string, min: number}} args - the action parameters arguments.
 */
async function Action(e, args) {
  const data = e.data[args.name]
  if (data.length <= args.min) return
  e.data[args.name] = data.toSpliced(data.length - 1, 1)
}
```

### Computed properties

In [computed properties](/computed-properties) you have the same data available to you as in actions.

For example, you can look at the `childAge` component (the field for selecting the child's age), which has the tooltip text set as a
calculated field.

```javascript title='childAge.Text tooltip text'
/**
 * @param {IFormData} form
 * @return {string}
 */
function Calculation(form) {
  const index = form.index ?? 0
  const date = form.rootData.date?.toISOString() ?? 'unknown'
  const room = form.parentData?.roomType ?? 'unknown'
  return `Child #${index + 1} in room ${room}, date: ${date}`
```

The tooltip text is glued together from these components, which are at different levels:

- Date, found at the topmost level of the form `form.rootData.date`.
- The room type `form.parentData?.roomType`, located in the Repeater element a level above.
- The actual index of the component in the Repeater.

### Validation

[Validating](/validation) the value of a component that is inside the Repeater is not different from normal validation. The validation
function also operates on the value of the component. Validation messages can also be localized.

The data of the components inside the Repeater will be organized into an array. Component validation errors will also be in the
corresponding array elements. The following are examples.

```json title='An example of JSON with data'
{
  "date": "2024-12-03T21:00:00.000Z",
  "rooms": [
    {
      "roomType": "luxe",
      "adults": 1,
      "children": 2,
      "childrenAges": [
        {
          "childAge": "none"
        },
        {
          "childAge": "none"
        }
      ],
      "names": [
        {}
      ]
    }
  ]
}
```

```json title='An example of JSON with errors'
{
  "rooms": [
    {
      "childrenAges": [
        {},
        {
          "childAge": "Invalid input"
        }
      ],
      "names": [
        {
          "lastName": "Required"
        }
      ]
    }
  ]
}
```

### Localization

In [localization](/localization), only the data of the current element inside the Repeater is available to you. This is how the localization
of the `Content` property for the `rsStaticContent1` component looks like:

```text title='EN'
rsStaticContent1_content =Room {$roomType}
```

```text title='DE'
rsStaticContent1_content =Zimmer {$roomType}
```

You can only use properties that are on the first data level of a given Repeater element. I.e., you cannot write expressions using `.`, this
is the current limitation.
