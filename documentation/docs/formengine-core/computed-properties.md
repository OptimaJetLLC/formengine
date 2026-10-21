---
description: 'Create dynamic calculated fields in FormEngine: auto-compute totals,
  percentages, dates, and derived values based on other form fields in real-time.'
sidebar_class_name: formengine-core-advanced
sidebar_label: Computed Properties
sidebar_position: 320
slug: /formengine-core/computed-properties
title: Dynamic Form Fields - Computed Values & Calculations
---

# Dynamic Form Fields - Computed Values & Calculations

Computed properties let you make component settings dynamic, they recalculate automatically whenever the form state changes. In FormEngine
Core, you turn a static property into a computed one by setting `computeType: "function"` and providing the calculation logic in `fnSource`.

In this guide, you'll learn:

- How computed properties differ from static values
- When to use `computeType` and `fnSource`
- Practical patterns for dynamic labels, helper text, and validation messages
- How to avoid infinite loops and performance pitfalls

## Overview

A computed property is a [ComponentProperty][t-componentproperty] whose value is determined by a JavaScript function that runs inside the
form's execution context. The function receives the current [IFormData][t-iformdata] (as the `form` parameter) and can read `form.data`,
`form.errors`, `form.state`, and other form metadata.

Computed properties are useful for:

- **Dynamic labels and hints** that change based on other field values
- **Conditional formatting** (colors, visibility hints)
- **Real‑time validation feedback** beyond the built‑in schema validation
- **Derived values** that you want to display but not store as
  form data

:::warning[Advanced feature]

Computed properties are a powerful but advanced mechanism. Because they run on every form change, careless use can create **infinite update
loops** or **performance bottlenecks**. Use them sparingly and always test the interaction chain between computed properties and the data
they depend on.

:::

## How computed properties work

Inside a component's `props`, any property can be either a static value or a computed one. The structure is the same as
for [conditional rendering][guide-conditional] and [localization][guide-localization], but with [computeType][t-computetype] `"function"`.

### Property value shapes

Static property (fixed value):

```json
{
  "props": {
    "label": {
      "value": "Email"
    }
  }
}
```

Computed property (dynamic function):

```json {5} title='DynamicHelperText.json'
{
  "props": {
    "helperText": {
      "computeType": "function",
      "fnSource": "return form.data.email ? 'Looks good' : 'Enter your email';"
    }
  }
}
```

The `fnSource` field contains the **body** of a JavaScript function that receives `form` (type [IFormData][t-iformdata]) and returns the
property value. Do not wrap the body in `function(form) { ... }`, write the code that would appear inside the function.

### Execution context

Inside `fnSource` you have access to:

| Variable      | Type                      | Purpose                                                 |
|---------------|---------------------------|---------------------------------------------------------|
| `form`        | [IFormData][t-iformdata]  | The current form state, errors, and metadata.           |
| `form.data`   | `Record<string, unknown>` | Values of all fields keyed by their `dataKey` / `key`.  |
| `form.errors` | `Record<string, unknown>` | Validation errors keyed by `dataKey` / `key`.           |
| `form.state`  | `Record<string, unknown>` | Custom state you can set via actions or event handlers. |
| `form.index`  | `number \| undefined`     | Index of the current item inside repeaters.             |

The function runs **after** the form data changes and **before** the component renders. If the result differs from the previous computed
value, the component updates.

## Examples

### Dynamic helper text

Show a hint that adapts to the user’s input.

```json {11-14} title='PasswordStrength.json'
{
  "key": "password",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Password"
    },
    "type": {
      "value": "password"
    },
    "helperText": {
      "computeType": "function",
      "fnSource": "const pwd = String(form.data.password || '');\nif (pwd.length === 0) return 'Enter a password';\nif (pwd.length < 8) return 'Too short, use at least 8 characters';\nreturn 'Strong password';"
    }
  }
}
```

### Conditional label

Change a label based on a checkbox selection.

```json {5-8} title='BillingLabel.json'
{
  "key": "address",
  "type": "MuiTextField",
  "props": {
    "label": {
      "computeType": "function",
      "fnSource": "const isBusiness = form.data.accountType === 'business';\nreturn isBusiness ? 'Business address' : 'Home address';"
    },
    "helperText": {
      "value": "Street, City, ZIP"
    }
  }
}
```

### Real‑time validation feedback

Provide immediate feedback beyond schema validation.

:::tip[info]

This example is made for illustrative purposes. If you need to show validation data, use [the form validation mechanisms][validation].

:::

```json {8-11} title='EmailFeedback.json'
{
  "key": "email",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email"
    },
    "helperText": {
      "computeType": "function",
      "fnSource": "const email = String(form.data.email || '').trim();\nif (!email) return '';\nconst isValid = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);\nif (!isValid) return 'Please enter a valid email address';\nconst isCompany = email.endsWith('@company.com');\nreturn isCompany ? 'Company email detected' : 'Personal email';"
    }
  }
}
```

## Live examples

### Dynamic character counter

Show a remaining‑character count below a text field.

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
          key: 'bio',
          type: 'MuiTextField',
          props: {
            label: {value: 'Bio'},
            multiline: {value: true},
            maxRows: {value: 4},
            helperText: {
              computeType: 'function',
              fnSource: `const text = String(form.data.bio || '');
                         const length = text.length;
                         const remaining = 100 - length;
                         if (remaining < 0) return '❌ ' + Math.abs(remaining) + ' characters over limit';
                         if (remaining < 20) return '⚠️ ' + remaining + ' characters left';
                         return '✓ ' + remaining + ' characters left';`
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

### Price calculator

Compute a total price based on quantity and unit price, and display it as helper text.

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
          key: 'quantity',
          type: 'MuiTextField',
          props: {
            label: {value: 'Quantity'},
            type: {value: 'number'},
            helperText: {value: 'Number of items'}
          }
        },
        {
          key: 'unitPrice',
          type: 'MuiTextField',
          props: {
            label: {value: 'Unit price ($)'},
            type: {value: 'number'},
            helperText: {value: 'Price per item'}
          }
        },
        {
          key: 'total',
          type: 'MuiTypography',
          props: {
            children: {
              computeType: 'function',
              fnSource: `const q = Number(form.data.quantity || 0);
                         const p = Number(form.data.unitPrice || 0);
                         const total = q * p;
                         if (total <= 0) return 'Enter quantity and price';
                         if (total > 1000) return '💵 Total: $' + total.toFixed(2) + ' (bulk discount available)';
                         return '💰 Total: $' + total.toFixed(2);`
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

### Conditional styling via computed property

Makes the button accessible if the checkbox is checked.

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
          key: 'acceptTerms',
          type: 'MuiFormControlLabel',
          props: {
            control: {value: 'Checkbox'},
            label: {value: 'I accept the terms and conditions'}
          }
        },
        {
          key: 'submitButton',
          type: 'MuiButton',
          props: {
            children: {value: 'Submit'},
            disabled: {
              computeType: 'function',
              fnSource: 'return form.data.acceptTerms !== true;'
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

## Pitfalls and precautions

### Infinite update loops

The most dangerous risk with computed properties is creating a circular dependency: a computed property writes to `form.data` (directly or
via an action), which triggers recomputation, which writes again, and so on.

```json title='DangerousExample.json'
{
  "props": {
    "value": {
      "computeType": "function",
      "fnSource": "// NEVER DO THIS: writing to the same field you read from\nform.data.someField = form.data.someField + 1;\nreturn form.data.someField;"
    }
  }
}
```

:::warning

**Never modify `form.data` inside a computed property.** Treat `form` as read‑only. If you need to update the form based on a calculation,
use an [action][guide-actions] or an event handler instead.

Also, do not return new objects from the computed property as a result. FormEngine Core will assume that the value of the computed property
changes every time and will cause an infinite loop of form rendering.

:::

### Performance impact

Computed properties run on **every** form change. If you have many computed properties or complex logic inside them, the form may feel
sluggish.

**Do:**

- Keep the logic inside `fnSource` short and fast.
- Use computed properties only for properties that truly need to be dynamic.

**Don’t:**

- Perform network requests, large array operations, or synchronous heavy computations inside `fnSource`.
- Create chains where property A depends on B, B depends on C, and C depends on A.

### Error handling

If the function throws an exception, FormEngine Core catches it and logs a warning to the console. The property will keep its previous
value (or fall back to the component’s default). Always test your computed functions with edge cases: `null`, `undefined`, empty strings,
unexpected types.

## Best practices

1. **Keep functions pure:** A computed property should be a pure function of `form`. No side effects, no modifications to `form`.
2. **Use for display, not storage:** Prefer computed properties for labels, helper text, colors, and read‑only displays. For values that
   should be saved as form data, use regular data‑bound fields.
3. **Leverage `form.hasErrors`:** When you want to reflect validation state, check `form.hasErrors` and `form.errors` rather than
   re‑implementing validation logic.
4. **Test the dependency chain:** Before deploying, verify that changing any field doesn’t cause unexpected recomputation loops.

## Summary

- Computed properties let you define component settings that recalculate automatically when the form state changes.
- Set `computeType: "function"` and provide the JavaScript function body in `fnSource`.
- The function receives `form` (type [IFormData][t-iformdata]) and must return the property value.
- Use with caution: Avoid modifying `form.data`, keep functions lightweight, and watch for circular dependencies.
- Ideal for dynamic labels, real‑time feedback, conditional formatting, and derived display values.

---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Localization](/formengine-core/localization)
- [Handling form data](/formengine-core/handling-form-data)
- [Actions and events](/formengine-core/actions-and-events)
- [ComponentProperty reference][t-componentproperty]
- [IFormData reference][t-iformdata]

[t-componentproperty]: /api-reference/@react-form-builder/core/interfaces/ComponentProperty
[t-computetype]: /api-reference/@react-form-builder/core/type-aliases/ComponentPropertyComputeType
[t-iformdata]: /api-reference/@react-form-builder/core/interfaces/IFormData
[guide-conditional]: /formengine-core/conditional-rendering
[guide-localization]: /formengine-core/localization
[guide-actions]: /formengine-core/actions-and-events
[validation]: /formengine-core/validation
