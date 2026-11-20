---
description: 'Comprehensive form validation in FormEngine: built-in rules, Zod integration,
  async validation, custom validators, cross-field validation, and error handling.'
sidebar_class_name: formengine-core-essential
sidebar_label: Validation
sidebar_position: 30
slug: /formengine-core/validation
title: Form Validation Guide - Zod, Custom Rules & More
---

# Form Validation Guide - Zod, Custom Rules & More

FormEngine Core provides a powerful, flexible validation system built on the robust [Zod](https://zod.dev/) validation library. This guide
will help you understand how to implement validation in your forms, from simple required fields to complex conditional validation logic.

## What is Validation?

Validation is the process of ensuring that data entered by users meets your application's requirements. It's like a quality control system
for your forms that:

- Prevents invalid data from being submitted
- Provides immediate feedback to users
- Reduces errors and improves data quality
- Enhances user experience by guiding correct input

FormEngine Core's validation system is type-safe, extensible, and integrates seamlessly with both JSON form definitions and TypeScript APIs.

## How Validation Works

### Validation Flow

When the user interacts with a form field (component), FormEngine Core performs the following actions:

1. Checks whether automatic validation is enabled for this field (enabled by default).
2. If automatic validation is disabled for a field, then validation is not performed.
3. Executes all validators specified for this field in the order of their sequence in the JSON array.
4. If at least one of the validators returns a validation error, the validation error is localized (optionally) and displayed to the user.

## Field Validation

Field validation is the most common type of validation - applying rules to individual form fields.

### Adding Validation to Fields

You can add validation to fields using JSON configuration.

#### JSON Configuration

In JSON form definitions, add validation rules to
the [schema.validations](/api-reference/@react-form-builder/core/type-aliases/BoundValueSchema) array:

```json {12-34}
{
  "key": "email",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email Address"
    },
    "helperText": {
      "value": "Start typing"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required",
        "args": {
          "message": "Email is required"
        }
      },
      {
        "key": "email",
        "args": {
          "message": "Please enter a valid email address"
        }
      },
      {
        "key": "max",
        "args": {
          "limit": 20,
          "message": "Email cannot exceed 20 characters"
        }
      }
    ]
  }
}
```

In the example above, we have a description of a single component of type `MuiTextField`. `MuiTextField` is a component that has a property
bound to data of type `string`. There are three validators for this component: `required`, `email`, and `max`. When the user enters data,
validation occurs. FormEngine Core will find three validators with keys `required`, `email`, `max` associated with the `string` type. It
will call these validators and display an error.

### Live example

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email Address"
            },
            "helperText": {
              "value": "Start typing"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Email is required"
                }
              },
              {
                "key": "email",
                "args": {
                  "message": "Please enter a valid email address"
                }
              },
              {
                "key": "max",
                "args": {
                  "limit": 20,
                  "message": "Email cannot exceed 20 characters"
                }
              }
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Built-in Validators Based on Zod

FormEngine Core includes a comprehensive set of validators powered by Zod. These validators are organized by data type.

### String Validators

String validators work with text inputs, textareas, and any component that accepts text values.

Validators can accept arguments. A special argument for built-in validators is `message`, the error text that will be returned to the user.
The `message` argument is optional.

| Validator    | Description                                  | Example JSON                                                                                        |
| ------------ | -------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `required`   | Field must not be empty                      | `{"key": "required", "args": {"message": "This field is required"}}`                                |
| `nonEmpty`   | Field must not be empty (alias for required) | `{"key": "nonEmpty", "args": {"message": "Cannot be empty"}}`                                       |
| `min`        | Minimum length                               | `{"key": "min", "args": {"limit": 3, "message": "Must be at least 3 characters"}}`                  |
| `max`        | Maximum length                               | `{"key": "max", "args": {"limit": 100, "message": "Cannot exceed 100 characters"}}`                 |
| `length`     | Exact length                                 | `{"key": "length", "args": {"length": 10, "message": "Must be exactly 10 characters"}}`             |
| `email`      | Valid email format                           | `{"key": "email", "args": {"message": "Invalid email address"}}`                                    |
| `url`        | Valid URL format                             | `{"key": "url", "args": {"message": "Invalid URL"}}`                                                |
| `uuid`       | Valid UUID format                            | `{"key": "uuid", "args": {"message": "Invalid UUID"}}`                                              |
| `ip`         | Valid IP address (IPv4 or IPv6)              | `{"key": "ip", "args": {"message": "Invalid IP address"}}`                                          |
| `datetime`   | ISO datetime format                          | `{"key": "datetime", "args": {"message": "Invalid datetime format"}}`                               |
| `regex`      | Custom regular expression                    | `{"key": "regex", "args": {"regex": "^[A-Z][a-z]+$", "message": "Must start with capital letter"}}` |
| `includes`   | Contains substring                           | `{"key": "includes", "args": {"value": "example", "message": "Must contain 'example'"}}`            |
| `startsWith` | Starts with substring                        | `{"key": "startsWith", "args": {"value": "Mr.", "message": "Must start with 'Mr.'"}}`               |
| `endsWith`   | Ends with substring                          | `{"key": "endsWith", "args": {"value": ".com", "message": "Must end with '.com'"}}`                 |

### Number Validators

Number validators work with numeric inputs and selectors.

| Validator    | Description                 | Example JSON                                                                        |
| ------------ | --------------------------- | ----------------------------------------------------------------------------------- |
| `required`   | Field must contain a number | `{"key": "required", "args": {"message": "This field is required"}}`                |
| `min`        | Minimum value               | `{"key": "min", "args": {"limit": 18, "message": "Must be at least 18"}}`           |
| `max`        | Maximum value               | `{"key": "max", "args": {"limit": 120, "message": "Cannot exceed 120"}}`            |
| `lessThan`   | Less than value             | `{"key": "lessThan", "args": {"value": 100, "message": "Must be less than 100"}}`   |
| `moreThan`   | Greater than value          | `{"key": "moreThan", "args": {"value": 0, "message": "Must be greater than 0"}}`    |
| `integer`    | Must be an integer          | `{"key": "integer", "args": {"message": "Must be a whole number"}}`                 |
| `multipleOf` | Multiple of value           | `{"key": "multipleOf", "args": {"value": 5, "message": "Must be a multiple of 5"}}` |

### Date Validators

Date validators work with date pickers and date inputs.

| Validator  | Description               | Example JSON                                                                          |
| ---------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `required` | Field must contain a date | `{"key": "required", "args": {"message": "Date is required"}}`                        |
| `min`      | Minimum date              | `{"key": "min", "args": {"value": "2024-01-01", "message": "Cannot be before 2024"}}` |
| `max`      | Maximum date              | `{"key": "max", "args": {"value": "2024-12-31", "message": "Cannot be after 2024"}}`  |

### Array Validators

Array validators work with multi-selects, checkboxes, and repeaters.

| Validator  | Description             | Example JSON                                                                         |
| ---------- | ----------------------- | ------------------------------------------------------------------------------------ |
| `required` | Array must not be empty | `{"key": "required", "args": {"message": "At least one item is required"}}`          |
| `nonEmpty` | Array must not be empty | `{"key": "nonEmpty", "args": {"message": "Cannot be empty"}}`                        |
| `min`      | Minimum array length    | `{"key": "min", "args": {"limit": 1, "message": "Select at least one item"}}`        |
| `max`      | Maximum array length    | `{"key": "max", "args": {"limit": 5, "message": "Cannot select more than 5 items"}}` |
| `length`   | Exact array length      | `{"key": "length", "args": {"length": 3, "message": "Must select exactly 3 items"}}` |

### Boolean Validators

Boolean validators work with checkboxes and switches.

| Validator  | Description              | Example JSON                                             |
| ---------- | ------------------------ | -------------------------------------------------------- |
| `required` | Must be true (checked)   | `{"key": "required", "message": "This must be checked"}` |
| `truthy`   | Must be true (checked)   | `{"key": "truthy", "message": "This must be checked"}`   |
| `falsy`    | Must be true (unchecked) | `{"key": "falsy", "message": "This must be unchecked"}`  |

### Time Validators

Time validators work with components whose data is time.

| Validator  | Description               | Example JSON                                         |
| ---------- | ------------------------- | ---------------------------------------------------- |
| `required` | Field must contain a time | `{"key": "required", "message": "Time is required"}` |

## Form Validation

Form validation allows you to validate the entire form or groups of fields together.

### Form-Level Validation

You can validate the entire form using the `validate` action:

```json {11-17}
{
  "type": "MuiButton",
  "key": "submitButton",
  "props": {
    "children": {
      "value": "Submit"
    }
  },
  "events": {
    "onClick": [
      {
        "name": "validate",
        "type": "common",
        "args": {
          "failOnError": true
        }
      },
      {
        "name": "onSubmit",
        "type": "custom"
      }
    ]
  }
}
```

### Live example

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email Address"
            },
            "helperText": {
              "value": "Start typing"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "email",
                "args": {
                  "message": "Please enter a valid email address"
                }
              }
            ]
          }
        },
        {
          "type": "MuiButton",
          "key": "submitButton",
          "props": {
            "children": {
              "value": "Submit"
            }
          },
          "events": {
            "onClick": [
              {
                "name": "validate",
                "type": "common",
                "args": {
                  "failOnError": true
                }
              },
              {
                "name": "onSubmit",
                "type": "custom"
              }
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const actions = {
    onSubmit: () => {
      alert('Form validation is successful!')
    }
  }

  return <FormViewer
    view={muiView}
    getForm={getForm}
    actions={actions}
  />
}
```

The `validate` action with `failOnError: true` will prevent the `onSubmit` action from running if any validation errors exist.

## Conditional Validation

Conditional validation allows you to apply validation rules only when certain conditions are met.

### Using validateWhen Property

The `validateWhen` property accepts a JavaScript expression that determines when the validation should run. An expression is essentially a
JavaScript statement that returns `true` or `false`. As input, it receives
the [form](/api-reference/@react-form-builder/core/interfaces/IFormData) parameter with all the information from the form.

```json {20-22}
{
  "key": "phone",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Phone"
    },
    "helperText": {
      "value": "This field must be filled in only if the phone is selected as the contact method"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "regex",
        "args": {
          "regex": "^[\\+\\d\\s\\-\\(\\)]{10,15}$",
          "message": "Invalid phone number format"
        },
        "validateWhen": {
          "value": "form.data.contactMethod === 'phone'"
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "contactMethod",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "email",
                  "label": "Email"
                },
                {
                  "value": "phone",
                  "label": "Phone"
                }
              ]
            },
            "label": {
              "value": "Contact method"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required"
              }
            ]
          }
        },
        {
          "key": "phone",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Phone"
            },
            "helperText": {
              "value": "This field must be filled in only if the phone is selected as the contact method"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "regex",
                "args": {
                  "regex": "^[\\+\\d\\s\\-\\(\\)]{10,15}$",
                  "message": "Invalid phone number format"
                },
                "validateWhen": {
                  "value": "form.data.contactMethod === 'phone'"
                }
              }
            ]
          }
        },
        {
          "key": "submit",
          "type": "MuiButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

### Complex Conditional Validation

You can create complex validation logic that depends on multiple fields:

```json
{
  "key": "businessAddress",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Business address"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required",
        "args": {
          "message": "Business address is required for corporate accounts"
        },
        "validateWhen": {
          "value": "form.data.accountType === 'corporate' && form.data.hasPhysicalLocation === true"
        }
      },
      {
        "key": "min",
        "args": {
          "limit": 10,
          "message": "Address must be at least 10 characters"
        },
        "validateWhen": {
          "value": "form.data.accountType === 'corporate' && form.data.businessAddress && form.data.businessAddress.length > 0"
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "accountType",
          "type": "MuiSelect",
          "props": {
            "label": {
              "value": "Account type"
            },
            "items": {
              "value": [
                {
                  "value": "corporate",
                  "label": "Corporate"
                },
                {
                  "value": "personal",
                  "label": "Personal"
                }
              ]
            },
            "value": {
              "value": "corporate"
            }
          }
        },
        {
          "key": "hasPhysicalLocation",
          "type": "MuiFormControlLabel",
          "props": {
            "control": {
              "value": "Switch"
            },
            "label": {
              "value": "Has physical location"
            }
          }
        },
        {
          "key": "businessAddress",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Business address"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Business address is required for corporate accounts"
                },
                "validateWhen": {
                  "value": "form.data.accountType === 'corporate' && form.data.hasPhysicalLocation === true"
                }
              },
              {
                "key": "min",
                "args": {
                  "limit": 10,
                  "message": "Address must be at least 10 characters"
                },
                "validateWhen": {
                  "value": "form.data.accountType === 'corporate' && form.data.businessAddress && form.data.businessAddress.length > 0"
                }
              }
            ]
          }
        },
        {
          "key": "validate",
          "type": "MuiButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

## Code Validation

Code validation allows you to write custom validation logic using JavaScript code. This is the most flexible validation option. The function
body of this validator is stored in JSON.

### Code Validation Parameters

The `code` validator has access to these parameters:

- `value`: The current field value
- `form`: The complete [form](/api-reference/@react-form-builder/core/interfaces/IFormData) data object

The function should return `true` if validation passes, or `false` if validation fails.

### Basic Code Validation

For example, we want to add a date validator so that the value in the field is greater than the current date. Here is a sample code:

```javascript
/**
 * @param {string} value the validated value.
 * @param {IFormData} form the form.
 * @return {boolean} the validation result.
 */
async (value, form) => {
  if (!value) return true;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = new Date(value);
  selected.setHours(0, 0, 0, 0);

  if (selected < today) {
    return false;
  }

  return true;
}
```

Add a `code` validator with custom JavaScript logic:

```json {18-23}
{
  "key": "checkInDate",
  "type": "RsDatePicker",
  "props": {
    "label": {
      "value": "Check-in date"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required",
        "args": {
          "message": "Check-in date is required"
        }
      },
      {
        "key": "code",
        "args": {
          "message": "Check-in date cannot be in the past",
          "code": "    if (!value) return true;\n\n    const today = new Date();\n    today.setHours(0, 0, 0, 0);\n    const selected = new Date(value);\n    selected.setHours(0, 0, 0, 0);\n\n    if (selected < today) {\n        return false;\n    }\n\n    return true;"
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "errorType": "RsErrorMessage",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "checkInDate",
          "type": "RsDatePicker",
          "props": {
            "label": {
              "value": "Check-in date"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Check-in date is required"
                }
              },
              {
                "key": "code",
                "args": {
                  "message": "Check-in date cannot be in the past",
                  "code": "    if (!value) return true;\n\n    const today = new Date();\n    today.setHours(0, 0, 0, 0);\n    const selected = new Date(value);\n    selected.setHours(0, 0, 0, 0);\n\n    if (selected < today) {\n        return false;\n    }\n\n    return true;"
                }
              }
            ]
          }
        },
        {
          "key": "validate",
          "type": "RsButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={rSuiteView}
    getForm={getForm}
  />
}
```

### Cross-Field Validation with Code

Validate relationships between multiple fields:

```javascript
/**
 * @param {string} value the validated value.
 * @param {IFormData} form the form.
 * @return {boolean} the validation result.
 */
async (value, form) => {
  if (!value) return true;

  const checkIn = new Date(form.data.checkInDate);
  checkIn.setHours(0, 0, 0, 0);
  const checkOut = new Date(value);
  checkOut.setHours(0, 0, 0, 0);

  return checkOut > checkIn
}
```

```javascript
/**
 * @param {string} value the validated value.
 * @param {IFormData} form the form.
 * @return {boolean} the validation result.
 */
async (value, form) => {
  if (!value) return true;

  const checkIn = new Date(form.data.checkInDate);
  checkIn.setHours(0, 0, 0, 0);
  const checkOut = new Date(value);
  checkOut.setHours(0, 0, 0, 0);

  // Maximum 30-day stay
  const maxStay = new Date(checkIn);
  maxStay.setDate(maxStay.getDate() + 30);

  return checkOut <= maxStay
}
```

```json
{
  "key": "checkOutDate",
  "type": "RsDatePicker",
  "props": {
    "label": {
      "value": "Check-out date"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required",
        "args": {
          "message": "Check-out date is required"
        }
      },
      {
        "key": "code",
        "args": {
          "message": "Check-out date must be after check-in date",
          "code": "    if (!value) return true;\n\n    const checkIn = new Date(form.data.checkInDate);\n    checkIn.setHours(0, 0, 0, 0);\n    const checkOut = new Date(value);\n    checkOut.setHours(0, 0, 0, 0);\n\n    return checkOut > checkIn"
        }
      },
      {
        "key": "code",
        "args": {
          "message": "Maximum stay is 30 days",
          "code": "    if (!value) return true;\n\n    const checkIn = new Date(form.data['checkInDate']);\n    checkIn.setHours(0, 0, 0, 0);\n    const checkOut = new Date(value);\n    checkOut.setHours(0, 0, 0, 0);\n\n    // Maximum 30-day stay\n    const maxStay = new Date(checkIn);\n    maxStay.setDate(maxStay.getDate() + 30);\n\n    return checkOut <= maxStay"
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "errorType": "RsErrorMessage",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "checkInDate",
          "type": "RsDatePicker",
          "props": {
            "label": {
              "value": "Check-in date"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Check-in date is required"
                }
              },
              {
                "key": "code",
                "args": {
                  "message": "Invalid check-in date",
                  "code": "    if (!value) return true;\n\n    const today = new Date();\n    today.setHours(0, 0, 0, 0);\n    const selected = new Date(value);\n    selected.setHours(0, 0, 0, 0);\n\n    if (selected < today) {\n        return false;\n    }\n\n    return true;"
                }
              }
            ]
          }
        },
        {
          "key": "checkOutDate",
          "type": "RsDatePicker",
          "props": {
            "label": {
              "value": "Check-out date"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Check-out date is required"
                }
              },
              {
                "key": "code",
                "args": {
                  "message": "Check-out date must be after check-in date",
                  "code": "    if (!value) return true;\n\n    const checkIn = new Date(form.data.checkInDate);\n    checkIn.setHours(0, 0, 0, 0);\n    const checkOut = new Date(value);\n    checkOut.setHours(0, 0, 0, 0);\n\n    return checkOut > checkIn"
                }
              },
              {
                "key": "code",
                "args": {
                  "message": "Maximum stay is 30 days",
                  "code": "    if (!value) return true;\n\n    const checkIn = new Date(form.data.checkInDate);\n    checkIn.setHours(0, 0, 0, 0);\n    const checkOut = new Date(value);\n    checkOut.setHours(0, 0, 0, 0);\n\n    // Maximum 30-day stay\n    const maxStay = new Date(checkIn);\n    maxStay.setDate(maxStay.getDate() + 30);\n\n    return checkOut <= maxStay"
                }
              }
            ]
          }
        },
        {
          "key": "validate",
          "type": "RsButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={rSuiteView}
    getForm={getForm}
  />
}
```

## Custom Validation

Custom validation allows you to create reusable validators that can be registered and used across your application. Custom validators are
passed to the [FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer) component's props via
prop [validators](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#validators), and custom validators are connected to
form components as well as embedded validators via JSON forms, but with the addition of the `custom` type.

### Registering Custom Validators

Register custom validators when initializing FormEngine Core:

```tsx {6-31,55}
import {view} from '@react-form-builder/components-material-ui'
import type {FormViewerProps} from '@react-form-builder/core'
import {FormViewer} from '@react-form-builder/core'
import {useCallback} from 'react'

const validators: FormViewerProps['validators'] = {
  string: {
    strongPassword: {
      validate: (value, store, args, formData) => {
        if (!value) return false

        const hasUpperCase = /[A-Z]/.test(value)
        if (!hasUpperCase) return 'Must contain at least one uppercase letter'

        const hasLowerCase = /[a-z]/.test(value)
        if (!hasLowerCase) return 'Must contain at least one lowercase letter'

        const hasNumbers = /\d/.test(value)
        if (!hasNumbers) return 'Must contain at least one number'

        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value)
        if (!hasSpecialChars) return 'Must contain at least one special character'

        const isLongEnough = value.length >= 8
        if (!isLongEnough) return 'Must be at least 8 characters long'

        return true
      }
    }
  }
}

export const App = () => {

  const getForm = useCallback(() => {
    // your form here
    return JSON.stringify({
      form: {
        key: 'Screen',
        type: 'Screen'
      }
    })
  }, [])

  return <FormViewer view={view}
                     getForm={getForm}
                     validators={validators}
  />
}
```

### Using Custom Validators

Use registered custom validators in your form JSON:

```json {14-17}
{
  "key": "password",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Password"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required"
      },
      {
        "key": "strongPassword",
        "type": "custom"
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const validators = {
    string: {
      strongPassword: {
        validate: (value, store, args, formData) => {
          if (!value) return false

          const hasUpperCase = /[A-Z]/.test(value)
          if (!hasUpperCase) return 'Must contain at least one uppercase letter'

          const hasLowerCase = /[a-z]/.test(value)
          if (!hasLowerCase) return 'Must contain at least one lowercase letter'

          const hasNumbers = /\d/.test(value)
          if (!hasNumbers) return 'Must contain at least one number'

          const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value)
          if (!hasSpecialChars) return 'Must contain at least one special character'

          const isLongEnough = value.length >= 8
          if (!isLongEnough) return 'Must be at least 8 characters long'

          return true
        }
      }
    }
  }

  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "password",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Password"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required"
              },
              {
                "key": "strongPassword",
                "type": "custom"
              }
            ]
          }
        },
        {
          "key": "submit",
          "type": "MuiButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
    validators={validators}
  />
}
```

### Custom Validator with Parameters

Create parameterized custom validators:

```typescript {17-29}
// Register validator with parameters
const validators: FormViewerProps['validators'] = {
  string: {
    matchesField: {
      validate: (value, store, args, formData) => {
        if (!value || !args?.fieldName) return false

        const fieldName = args.fieldName as string
        const otherValue = formData?.data[fieldName]

        if (value !== otherValue) {
          return (args?.message as string) || `Must match ${fieldName}`
        }

        return true
      },
      params: [
        {
          key: 'fieldName',
          type: 'string',
          required: true
        },
        {
          key: 'message',
          type: 'string',
          required: true,
          default: 'Fields do not match'
        }
      ]
    }
  }
}
```

```json {15-22}
{
  "key": "confirmPassword",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Confirm password"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required",
        "message": "Please confirm your password"
      },
      {
        "key": "matchesField",
        "type": "custom",
        "args": {
          "fieldName": "password",
          "message": "Passwords do not match"
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const validators = {
    string: {
      matchesField: {
        validate: (value, store, args, formData) => {
          if (!value || !args?.fieldName) return false

          const fieldName = args.fieldName
          const otherValue = formData?.data[fieldName]

          if (value !== otherValue) {
            return args?.message || `Must match ${fieldName}`
          }

          return true
        },
        params: [
          {
            key: 'fieldName',
            type: 'string',
            required: true
          },
          {
            key: 'message',
            type: 'string',
            required: true,
            default: 'Fields do not match'
          }
        ]
      }
    }
  }

  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "password",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Password"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required"
              }
            ]
          }
        },
        {
          "key": "confirmPassword",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Confirm password"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "message": "Please confirm your password"
              },
              {
                "key": "matchesField",
                "type": "custom",
                "args": {
                  "fieldName": "password",
                  "message": "Passwords do not match"
                }
              }
            ]
          }
        },
        {
          "key": "submit",
          "type": "MuiButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
    validators={validators}
  />
}
```

## Automatic Validation

### How Automatic Validation Works

By default, FormEngine Core performs automatic field validation when the value of this field changes.

### Disabling Automatic Validation

You can disable automatic validation for specific fields using
the [autoValidate](/api-reference/@react-form-builder/core/type-aliases/BoundValueSchema#autovalidate) property:

```json {22}
{
  "key": "searchQuery",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Search"
    }
  },
  "schema": {
    "validations": [
      {
        "key": "required"
      },
      {
        "key": "min",
        "args": {
          "limit": 3,
          "message": "Search query must be at least 3 characters"
        }
      }
    ],
    "autoValidate": false
  }
}
```

With `autoValidate: false`, the field will only be validated when explicitly triggered (e.g., during `validate` action).

## Validation Error Display

### Default Error Display

FormEngine Core automatically displays validation errors next to the corresponding field.

To display errors in the form, FormEngine Core uses the component specified in the JSON file of the form in the
[errorType](/api-reference/@react-form-builder/core/interfaces/PersistedForm#errortype) field. An example for MUI components:

```json {2}
{
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen"
  }
}
```

### Custom Error Display

You can configure the error display by specifying
the [errorProps](/api-reference/@react-form-builder/core/interfaces/PersistedForm#errorprops) field in JSON. This field describes the
properties that will be passed to the component specified in the `errorType` field.

```json {2-7}
{
  "errorProps": {
    "placement": {
      "value": "bottomEnd"
    }
  },
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen"
  }
}
```

import DocCard from '@theme/DocCard';

<DocCard item={{
type: 'link',
docId: 'formengine-core/custom-components/custom-error-component',
label: 'How to add your own component to display the error',
href: '/formengine-core/custom-components/custom-error-component'
}}/>

### Showing All Validation Errors

By default, FormEngine Core displays the first validation error for a component, even if the component has multiple validators specified.
You can configure `FormViewer` so that it displays all validation errors for the component at once. To do this, set the value of the
[showAllValidationErrors](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#showallvalidationerrors) property to `true`.

```tsx {4}
<FormViewer
  view={muiView}
  getForm={getForm}
  showAllValidationErrors={true}
/>
```

#### Live example

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "url",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "URL"
            },
            "helperText": {
              "value": "Example: https://google.com"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required"
              },
              {
                "key": "url"
              }
            ]
          }
        },
        {
          "key": "submit",
          "type": "MuiButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
    showAllValidationErrors={true}
  />
}
```

## Advanced Form Validation

Advanced form validation allows you to validate the entire form data with custom logic that can check relationships between multiple fields,
perform complex business rules, and validate data consistency across the entire form.

### Form Validator in JSON (formValidator)

You can define a form-level validator directly in the JSON form definition using
the [formValidator](/api-reference/@react-form-builder/core/interfaces/PersistedForm#formvalidator) field. This validator runs JavaScript
code that has access to all form data and returns validation errors for any field. The form validation function accepts the `formData`
argument as input, which is an object with form data. Below is an example of such a function (only the function body is stored in JSON):

```javascript
/**
 * @param {Record<string, unknown>} formData the form data.
 * @returns {Record<string, string> | undefined} the validation result.
 */
async (formData) => {
  const result = {};
  if (!formData.email || !formData.email.includes('@')) {
    result.email = 'Invalid email format';
  }
  if (!formData.password || formData.password.length < 8) {
    result.password = 'Password must be at least 8 characters';
  }
  if (formData.confirmPassword !== formData.password) {
    result.confirmPassword = 'Passwords do not match';
  }
  return result;
}
```

#### Basic Example

```json {2}
{
  "formValidator": "  const result = {};\n  if (!formData.email || !formData.email.includes('@')) {\n    result.email = 'Invalid email format';\n  }\n  if (!formData.password || formData.password.length < 8) {\n    result.password = 'Password must be at least 8 characters';\n  }\n  if (formData.confirmPassword !== formData.password) {\n    result.confirmPassword = 'Passwords do not match';\n  }\n  return result;",
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Email"
          }
        }
      },
      {
        "key": "password",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Password"
          },
          "type": {
            "value": "password"
          }
        }
      },
      {
        "key": "confirmPassword",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Confirm Password"
          },
          "type": {
            "value": "password"
          }
        }
      },
      {
        "key": "submit",
        "type": "MuiButton",
        "props": {
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
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    "formValidator": "  const result = {};\n  if (!formData.email || !formData.email.includes('@')) {\n    result.email = 'Invalid email format';\n  }\n  if (!formData.password || formData.password.length < 8) {\n    result.password = 'Password must be at least 8 characters';\n  }\n  if (formData.confirmPassword !== formData.password) {\n    result.confirmPassword = 'Passwords do not match';\n  }\n  return result;",
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            }
          }
        },
        {
          "key": "password",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Password"
            },
            "type": {
              "value": "password"
            }
          }
        },
        {
          "key": "confirmPassword",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Confirm Password"
            },
            "type": {
              "value": "password"
            }
          }
        },
        {
          "key": "submit",
          "type": "MuiButton",
          "props": {
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
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

#### Form Validator Function Signature

The `formValidator` code should be a JavaScript function body that:

1. Receives a `formData` parameter containing all form field values

2. Returns an object where:
   - Keys are field names
   - Values are error messages for those fields

3. Returns an empty object `{}` or `undefined` if validation passes

```javascript
// Example formValidator function
async function validateForm(formData) {
  const errors = {};

  // Validate email
  if (!formData.email || !formData.email.includes('@')) {
    result.email = 'Invalid email format';
  }

  // Validate password strength
  if (!formData.password || formData.password.length < 8) {
    result.password = 'Password must be at least 8 characters';
  }

  // Validate password confirmation
  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Complex business rule: age must be 18+ for registration
  if (formData.age && formData.age < 18) {
    errors.age = 'You must be at least 18 years old';
  }

  // Return errors object (empty if validation passes)
  return Object.keys(errors).length > 0 ? errors : undefined;
}
```

### External Form Validators via FormViewer (formValidators)

For more complex validation scenarios or when you need to reuse validation logic across multiple forms, you can provide external form
validators through the [formValidators](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#validators) property of the
[FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer) component.

#### Registering External Form Validators

```tsx {8-57,63}
import {view as muiView} from '@react-form-builder/components-material-ui'
import {type FormValidator, FormViewer} from '@react-form-builder/core'

const formJson = {
  // your form
}

// Define external form validators
const validators: FormValidator[] = [
  async (formData) => {
    const errors: Record<string, string> = {}

    if (!formData.username) {
      errors.username = 'Please provide the username'
    }

    // Check if username is already taken (simulate async check)
    if (formData.username === 'admin') {
      errors.username = 'Username "admin" is reserved'
    }

    if (!formData.password) {
      errors.password = 'Please provide the password'
    }

    // Validate password strength
    if (formData.password) {
      const hasUpperCase = /[A-Z]/.test(formData.password as string)
      const hasLowerCase = /[a-z]/.test(formData.password as string)
      const hasNumbers = /\d/.test(formData.password as string)

      if (!hasUpperCase) errors.password = 'Must contain uppercase letter'
      if (!hasLowerCase) errors.password = 'Must contain lowercase letter'
      if (!hasNumbers) errors.password = 'Must contain number'
    }

    return errors
  },

  async (formData) => {
    // Second validator: check age requirements
    const errors: Record<string, string> = {}

    if (formData.age) {
      const age = Number(formData.age)
      if (age < 13) {
        errors.age = 'You must be at least 13 years old'
      } else if (age > 120) {
        errors.age = 'Please enter a valid age'
      }
    } else {
      errors.age = 'Please enter an age'
    }

    return errors
  }
]

const App = () => {
  return (
    <FormViewer
      view={muiView}
      formValidators={validators}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

##### Live example

```jsx live
function App() {
  const formJson = {
    "errorType": "MuiErrorWrapper",
    "tooltipType": "MuiTooltip",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "username",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Username"
            }
          }
        },
        {
          "key": "password",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Password"
            },
            "type": {
              "value": "password"
            }
          }
        },
        {
          "key": "age",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Age"
            }
          }
        },
        {
          "key": "validate",
          "type": "MuiButton",
          "props": {
            "children": {
              "value": "Validate",
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
    }
  }

  // Define external form validators
  const registrationValidators = [
    async (formData) => {
      const errors = {}

      if (!formData.username) {
        errors.username = 'Please provide the username'
      }

      // Check if username is already taken (simulate async check)
      if (formData.username === 'admin') {
        errors.username = 'Username "admin" is reserved'
      }

      if (!formData.password) {
        errors.password = 'Please provide the password'
      }

      // Validate password strength
      if (formData.password) {
        const hasUpperCase = /[A-Z]/.test(formData.password)
        const hasLowerCase = /[a-z]/.test(formData.password)
        const hasNumbers = /\d/.test(formData.password)

        if (!hasUpperCase) errors.password = 'Must contain uppercase letter'
        if (!hasLowerCase) errors.password = 'Must contain lowercase letter'
        if (!hasNumbers) errors.password = 'Must contain number'
      }

      return errors
    },

    async (formData) => {
      // Second validator: check age requirements
      const errors = {}

      if (formData.age) {
        const age = Number(formData.age)
        if (age < 13) {
          errors.age = 'You must be at least 13 years old'
        } else if (age > 120) {
          errors.age = 'Please enter a valid age'
        }
      } else {
        errors.age = 'Please enter an age'
      }

      return errors
    }
  ]

  return (
    <FormViewer
      view={muiView}
      formValidators={registrationValidators}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

#### Combining JSON Form Validator with External Validators

When both `formValidator` (in JSON) and `formValidators` (external) are provided, FormEngine Core runs all validators and combines their
results:

```typescript
// External validator
const externalValidator: FormValidator = async (formData) => {
  const errors: Record<string, string> = {}

  // Business rule: premium users must provide company name
  if (formData.accountType === 'premium' && !formData.companyName) {
    errors.companyName = 'Company name is required for premium accounts'
  }

  return errors
}
```

```json {2}
{
  "formValidator": "  const errors = {};\n  if (!formData.email) {\n    errors.email = 'Email is required';\n  }\n  if (!formData.password) {\n    errors.password = 'Password is required';\n  }\n  return errors;",
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen"
  }
}
```

### Form Validator Execution Order

When form validation is triggered (e.g., by the `validate` action), FormEngine Core executes validators in this order:

1. **Field-level validators**: Each field's individual validators run
2. **JSON formValidator**: The validator defined in the JSON `formValidator` field runs
3. **External formValidators**: All validators in the `formValidators` array run

Errors from all sources are combined. If multiple validators return errors for the same field, the errors are concatenated (unless
[showAllValidationErrors](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#showallvalidationerrors) is `false`, in which
case only the first error is shown).

#### Live example

```jsx live
function App() {
  const formJson = {
    "formValidator": "  const errors = {};\n  if (!formData.email) {\n    errors.email = 'Email is required';\n  }\n  if (!formData.password) {\n    errors.password = 'Password is required';\n  }\n  return errors;",
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            }
          }
        },
        {
          "key": "password",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Password"
            }
          }
        },
        {
          "key": "accountType",
          "type": "MuiSelect",
          "props": {
            "items": {
              "value": [
                {
                  "value": "free",
                  "label": "Free"
                },
                {
                  "value": "premium",
                  "label": "Premium"
                }
              ]
            },
            "label": {
              "value": "Account Type"
            }
          }
        },
        {
          "key": "companyName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Company Name"
            }
          }
        },
        {
          "key": "validate",
          "type": "MuiButton",
          "props": {
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
    }
  }

  // External validator
  const externalValidator = async (formData) => {
    const errors = {}

    // Business rule: premium users must provide company name
    if (formData.accountType === 'premium' && !formData.companyName) {
      errors.companyName = 'Company name is required for premium accounts'
    }

    return errors
  }

  const formValidators = [externalValidator]

  return (
    <FormViewer
      view={muiView}
      formValidators={formValidators}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### Error Handling in Form Validators

Form validators should handle errors gracefully:

```javascript
// Good: Returns error object with specific messages
async function validateForm(formData) {
  try {
    const errors = {}

    // Your validation logic
    if (!formData.email) {
      errors.email = 'Email is required'
    }

    // Async validation example
    if (formData.email) {
      const isAvailable = await checkEmailAvailability(formData.email)
      if (!isAvailable) {
        errors.email = 'Email is already registered'
      }

      return Object.keys(errors).length > 0 ? errors : undefined;
    }
  } catch (error) {
    // Log error but don't crash the form
    console.error('Form validation error:', error);
  }
}
```

### Best Practices for Form Validators

1. **Keep validators focused**: Each validator should check a specific aspect of the form
2. **Use async validators for server-side checks**: Email availability, username uniqueness, etc.
3. **Provide clear error messages**: Tell users exactly what needs to be fixed
4. **Validate early**: Use field-level validation for simple checks, form-level for complex relationships
5. **Test edge cases**: Empty forms, partial data, invalid types
6. **Performance considerations**: Avoid expensive operations in synchronous validators

## Best Practices

### 1. Provide Clear Error Messages

- **Do**: "Password must be at least 8 characters and include a number"
- **Don't**: "Invalid password"

### 2. Validate Early and Often

- Use `autoValidate: true` (default) for real-time feedback

### 3. Use Appropriate Validator Types

- Use built-in validators when possible (more efficient)
- Use `code` validators for complex business logic
- Use custom validators for reusable validation patterns

### 4. Test Edge Cases

- Empty values
- Null/undefined values
- Extremely long values
- Special characters
- Boundary conditions (min/max values)

### 5. Performance Considerations

- Avoid complex calculations in `validateWhen` conditions

## Troubleshooting

### Validation Not Working

1. **Check schema type**: Ensure `schema.type` matches the field's data type
2. **Verify validator keys**: Check for typos in validator `key` names
3. **Check autoValidate**: If `autoValidate: false`, validation only triggers manually

### Custom Validators Not Recognized

1. **Verify registration**: Ensure custom validators are registered before form rendering
2. **Check type**: Custom validators need `"type": "custom"` in JSON
3. **Verify parameters**: Ensure required parameters are provided

### Conditional Validation Not Executing

1. **Check `validateWhen` syntax**: Ensure JavaScript expression is valid
2. **Verify field references**: Use `form.data['fieldName']` to reference other fields
3. **Test condition separately**: Log the condition result to debug

### Error Messages Not Displaying

1. **Check error wrapper**: Ensure ErrorWrapper components are properly configured
2. **Verify CSS**: Custom error styles might conflict with default styles
3. **Check form configuration**: `showAllValidationErrors` might affect display

---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Actions and events](/formengine-core/actions-and-events)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Localization](/formengine-core/localization)
- [Handling form data](/formengine-core/handling-form-data)
