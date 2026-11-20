---
description: Build dynamic forms with conditional rendering in FormEngine. Show/hide
  fields based on user input, create multi-step flows, and implement complex form
  logic.
sidebar_class_name: formengine-core-additional
sidebar_label: Conditional rendering
sidebar_position: 50
slug: /formengine-core/conditional-rendering
title: Dynamic Forms with Conditional Logic & Field Dependencies
---

# Dynamic Forms with Conditional Logic & Field Dependencies

Conditional rendering lets you show or hide components as the user fills out a form. In FormEngine Core, the primary mechanism is the
[renderWhen][cs-renderwhen] field on a component.

In this guide, you'll learn:

- What [renderWhen][cs-renderwhen] evaluates and when it renders
- How to write expression-based and function-based conditions
- Short, practical patterns for progressive disclosure and optional sections
- How to keep data consistent when hiding fields

## Overview

[renderWhen][cs-renderwhen] is an optional [ComponentProperty][t-componentproperty] that lives alongside `props`, `children`, and other
component settings. When it is present, FormEngine Core evaluates the condition against the current form state and renders the component
only when the result is boolean `true`.

The condition runs with access to the `form` variable (type [IFormData][t-iformdata]), so you can read `form.data`, `form.errors`,
`form.state`, and other form metadata.

Conditional rendering is most useful for:

- Progressive disclosure (show extra questions only when relevant)
- Optional sections (billing details, business information, marketing consent)
- Contextual hints or confirmations

## Writing conditions

Conditions run against the current form state. In both expressions and functions, you can read the `form` object (see the
[IFormData reference](/api-reference/@react-form-builder/core/interfaces/IFormData)) to access data, validation, and context.

| Available path    | Type                                   | What it provides                            |
| ----------------- | -------------------------------------- | ------------------------------------------- |
| `form.data`       | `Record<string, unknown>`              | Current form values keyed by data key.      |
| `form.errors`     | `Record<string, unknown>`              | Validation errors keyed by data key.        |
| `form.hasErrors`  | `boolean`                              | True when the form has validation errors.   |
| `form.state`      | `Record<string, unknown>`              | Shared custom state for your workflow.      |
| `form.parentData` | `Record<string, unknown> \| undefined` | Parent item data when inside array items.   |
| `form.rootData`   | `Record<string, unknown>`              | Root-level form data.                       |
| `form.index`      | `number \| undefined`                  | Index of the current item inside repeaters. |

### Expression-based conditions

Use the `value` field on [renderWhen][cs-renderwhen] for short expressions. Do not include the `return` keyword.

```json {27} title='BusinessAccountForm.json'
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "businessAccount",
        "type": "MuiFormControlLabel",
        "props": {
          "control": {
            "value": "Checkbox"
          },
          "label": {
            "value": "Business account"
          }
        }
      },
      {
        "key": "companyName",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Company name"
          }
        },
        "renderWhen": {
          "value": "form.data.businessAccount === true"
        }
      }
    ]
  }
}
```

### Function-based conditions

Set `computeType` to `"function"` on [renderWhen][cs-renderwhen] and provide the function body in `fnSource` instead of `value` when the
logic is easier to read as a full function. The function must return a boolean.

```json {29} title='CheckoutForm.json'
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "acceptTerms",
        "type": "MuiFormControlLabel",
        "props": {
          "control": {
            "value": "Checkbox"
          },
          "label": {
            "value": "I accept the terms"
          }
        }
      },
      {
        "key": "readyMessage",
        "type": "MuiTypography",
        "props": {
          "children": {
            "value": "Thanks! You can submit the form now."
          }
        },
        "renderWhen": {
          "computeType": "function",
          "fnSource":
            "const accepted = form.data.acceptTerms === true\nreturn accepted && form.hasErrors === false"
        }
      }
    ]
  }
}
```

## Live examples

### Expression toggle

Show a phone number field only when the user prefers phone contact.

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'contactByPhone',
          type: 'MuiFormControlLabel',
          props: {
            control: {
              value: 'Checkbox'
            },
            label: {
              value: 'Contact me by phone'
            }
          }
        },
        {
          key: 'phoneNumber',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Phone number'
            },
            helperText: {
              value: '+1 555 0100'
            }
          },
          renderWhen: {
            value: 'form.data.contactByPhone === true'
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

### Function toggle

Confirm eligibility for priority support based on a company email and an opt-in checkbox.

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'teamEmail',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Work email'
            },
            helperText: {
              value: 'name@company.com'
            }
          }
        },
        {
          key: 'prioritySupport',
          type: 'MuiFormControlLabel',
          props: {
            control: {
              value: 'Checkbox'
            },
            label: {
              value: 'Enable priority support'
            }
          }
        },
        {
          key: 'supportWarning',
          type: 'MuiTypography',
          props: {
            children: {
              value: 'Priority support is only available for company email addresses.'
            }
          },
          css: {
            any: {
              string: '  color: #d32f2f;'
            }
          },
          renderWhen: {
            computeType: 'function',
            fnSource: `const email = String(form.data.teamEmail ?? '')
                       const enabled = form.data.prioritySupport === true
                       return enabled && !email.endsWith('@company.com')`
          }
        },
        {
          key: 'supportSuccess',
          type: 'MuiTypography',
          props: {
            children: {
              value: 'Priority support will be enabled for this account.'
            }
          },
          css: {
            any: {
              string: '  color: #2e7d32;'
            }
          },
          renderWhen: {
            computeType: 'function',
            fnSource: `const email = String(form.data.teamEmail ?? '')
                       const enabled = form.data.prioritySupport === true
                       return enabled && email.endsWith('@company.com')`
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

### Cascading conditions

Reveal a promo checkbox and promo code field only when the order total qualifies.

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'orderTotal',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Order total (promo available for 100+)'
            },
            helperText: {
              value: '100'
            }
          }
        },
        {
          key: 'promoOptIn',
          type: 'MuiFormControlLabel',
          props: {
            control: {
              value: 'Checkbox'
            },
            label: {
              value: 'I have a promo code'
            }
          },
          renderWhen: {
            value: 'Number(form.data.orderTotal ?? 0) >= 100'
          }
        },
        {
          key: 'promoCode',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Promo code'
            }
          },
          renderWhen: {
            computeType: 'function',
            fnSource: `const total = Number(form.data.orderTotal ?? 0)
                       const optedIn = form.data.promoOptIn === true
                       return total >= 100 && optedIn`
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

### Container block toggle

Show an entire billing address block only when a different billing address is needed.

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'includeBilling',
          type: 'MuiFormControlLabel',
          props: {
            control: {
              value: 'Checkbox'
            },
            label: {
              value: 'Use a different billing address'
            }
          }
        },
        {
          key: 'billingBlock',
          type: 'MuiStack',
          props: {
            useFlexGap: {
              value: true
            }
          },
          css: {
            any: {
              string: '  gap: 12px;'
            }
          },
          renderWhen: {
            value: 'form.data.includeBilling === true'
          },
          children: [
            {
              key: 'billingName',
              type: 'MuiTextField',
              props: {
                label: {
                  value: 'Billing name'
                }
              }
            },
            {
              key: 'billingAddress',
              type: 'MuiTextField',
              props: {
                label: {
                  value: 'Billing address'
                }
              }
            },
            {
              key: 'billingZip',
              type: 'MuiTextField',
              props: {
                label: {
                  value: 'ZIP code'
                }
              }
            }
          ]
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

## Best practices

- Keep conditions short and focused on the smallest set of data you need.
- Return a boolean `true` explicitly instead of relying on truthy values.
- Apply [renderWhen][cs-renderwhen] to container components to hide or show entire sections at once.
- Prefer expression-based conditions for clarity and use functions only when needed.

:::info[Important]
Keep [renderWhen][cs-renderwhen] conditions simple and readable. If your workflow requires clearing dependent values when a component is
hidden, reset those values explicitly when you hide the field.
:::

## Summary

- Use [renderWhen][cs-renderwhen] as the primary mechanism to show or hide components based on form state.
- Conditions run with access to `form` (type [IFormData][t-iformdata]) and must return boolean `true`.
- Conditional rendering works best for progressive disclosure and optional sections.
- Reset dependent values explicitly when hidden fields should not keep their data.

---

For more information:

- [Computed properties](/formengine-core/computed-properties)
- [Handling form data](/formengine-core/handling-form-data)
- [Actions and events](/formengine-core/actions-and-events)
- [Rendering forms](/formengine-core/rendering-forms)
- [ComponentStore renderWhen reference](/api-reference/@react-form-builder/core/classes/ComponentStore#renderwhen)
- [IFormData reference](/api-reference/@react-form-builder/core/interfaces/IFormData)

[cs-renderwhen]: /api-reference/@react-form-builder/core/classes/ComponentStore#renderwhen
[t-componentproperty]: /api-reference/@react-form-builder/core/interfaces/ComponentProperty
[t-iformdata]: /api-reference/@react-form-builder/core/interfaces/IFormData
