---
description: Build complex forms with nested sub-forms in FormEngine. Create repeatable
  sections, form arrays, and hierarchical form structures for advanced use cases.
sidebar_class_name: formengine-core-advanced
sidebar_label: Embedded forms
sidebar_position: 330
slug: /formengine-core/embedded-forms
title: Nested Forms - Embed Forms Within Forms
---

# Nested Forms - Embed Forms Within Forms

Embedded forms let you include one form as a component inside another form. In FormEngine Core, you use the `EmbeddedForm` component
together with the `getForm` callback to load and display a nested form at runtime.

In this guide, you'll learn:

- How the `EmbeddedForm` component works with `getForm`
- When to use embedded forms versus other composition techniques
- How to control data storage with `storeDataInParentForm`
- Practical patterns for reusable form sections and multi-step workflows

## Overview

An embedded form is a complete FormEngine form that renders inside a parent form. The parent form supplies the nested form's JSON definition
through the `getForm` function, and the two forms share the same React context, event system, and validation lifecycle.

Embedded forms are useful for:

- **Reusable form sections** (address blocks, contact information, payment details)
- **Conditional form parts** that load only when needed
- **Multi-step workflows** where each step is a separate form definition
- **Dynamic form composition** based on user choices or external data

The `EmbeddedForm` component is the container. It doesn't define the nested form itself, instead, it asks your `getForm` function for the
form JSON, using either a `formName` string or an `options` object you provide.

## How embedded forms work

### The getForm function

[getForm][fv-getform] is a callback that receives a `formName` and `options` and returns a form JSON string. When you place an
`EmbeddedForm` component in your form, FormEngine Core calls `getForm` with the embedded form's [formName][efp-formname] and
[options][efp-options] props, expecting back the JSON for the nested form.

```typescript title='getForm signature'
type GetForm = (formName?: string, options?: any) => string | Promise<string>
```

### Basic flow

1. The parent form renders and encounters an `EmbeddedForm` component.
2. FormEngine Core extracts the `formName` and/or `options` from the component's props.
3. It calls `getForm(formName, options)`.
4. Your implementation returns the JSON string for the nested form.
5. FormEngine Core parses that JSON and renders the nested form inside the `EmbeddedForm` container.
6. Validation, events, and data changes in the nested form bubble up to the parent form according to the `storeDataInParentForm` setting.

### Data storage options

Embedded forms can store their data in two ways, controlled by the `storeDataInParentForm` property:

- **`storeDataInParentForm: true` (default)**: The nested form's field values appear as top‑level keys in the parent form's data object.
  This is useful when you want all fields in a single flat structure.
- **`storeDataInParentForm: false`**: The nested form's data is kept as a nested object under the embedded form's `dataKey`. This keeps the
  nested form's data separate and is easier to extract as a unit.

### EmbeddedFormProps properties

The `EmbeddedForm` component accepts the following props:

| Prop                    | Type      | Default | Description                                                                                                                                                                                  |
|-------------------------|-----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `storeDataInParentForm` | `boolean` | `true`  | If `false`, the nested form's data is stored as a nested object under the embedded form's `dataKey`. If `true`, the nested form's fields appear as top‑level keys in the parent form's data. |
| `formName`              | `string`  | —       | The name passed to `getForm` to identify which form to load. You have to provide at least one of `formName` or `options`.                                                                    |
| `options`               | `any`     | —       | An arbitrary object passed to `getForm`. Useful when you need to parameterize the nested form (for example, load different fields based on user type).                                       |
| `disabled`              | `boolean` | `false` | If `true`, the entire nested form is disabled.                                                                                                                                               |
| `readOnly`              | `boolean` | `false` | If `true`, the entire nested form is read‑only.                                                                                                                                              |

:::info

You have to specify either `formName` or `options` (or both). If neither is provided, the `EmbeddedForm` renders nothing.

:::

## Examples

### Basic embedded form

A parent form that includes a reusable address block as an embedded form.

**Parent form JSON:**

```json {15-26} title='ParentForm.json'
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "name",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Full name"
          }
        }
      },
      {
        "key": "addressBlock",
        "type": "EmbeddedForm",
        "props": {
          "formName": {
            "value": "address-form"
          },
          "storeDataInParentForm": {
            "value": false
          }
        }
      }
    ]
  }
}
```

**Implementation of `getForm`:**

```typescript title='App.tsx'
const getForm = useCallback((formName?: string) => {
  if (formName === 'address-form') {
    return JSON.stringify({
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'street',
            type: 'MuiTextField',
            props: {label: {value: 'Street'}}
          },
          {
            key: 'city',
            type: 'MuiTextField',
            props: {label: {value: 'City'}}
          },
          {
            key: 'zip',
            type: 'MuiTextField',
            props: {label: {value: 'ZIP code'}}
          }
        ]
      }
    })
  }
  // Return parent form JSON for the default case
  return JSON.stringify(parentFormJson)
}, [])
```

## Live examples

### Simple address block

A form with an embedded address section. The address fields are defined separately and loaded via `getForm`.

#### Live example

```jsx live
function App() {
  const parentForm = useMemo(() => ({
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'fullName',
          type: 'MuiTextField',
          props: {
            label: {value: 'Full name'}
          }
        },
        {
          key: 'address',
          type: 'EmbeddedForm',
          props: {
            formName: {value: 'address-form'},
            storeDataInParentForm: {value: false}
          }
        }
      ]
    }
  }), [])

  const addressForm = useMemo(() => ({
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'street',
          type: 'MuiTextField',
          props: {
            label: {value: 'Street address'}
          }
        },
        {
          key: 'city',
          type: 'MuiTextField',
          props: {
            label: {value: 'City'}
          }
        },
        {
          key: 'state',
          type: 'MuiTextField',
          props: {
            label: {value: 'State'}
          }
        },
        {
          key: 'zipCode',
          type: 'MuiTextField',
          props: {
            label: {value: 'ZIP code'}
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback((formName) => {
    if (formName === 'address-form') {
      return JSON.stringify(addressForm)
    }
    return JSON.stringify(parentForm)
  }, [parentForm, addressForm])

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

### Slot component

Slot is a placeholder component that allows you to define dynamic areas within an embedded form. When you use an `EmbeddedForm`, you can
include `Slot` components in its definition, and then fill those slots with content from the parent form.

#### How Slot works

The `Slot` component displays child components for a nested form. Each slot is identified by its own `key`. Parent form you can embed child
components to a nested form by specifying slot keys.

#### Example: Form with slot

**Embedded form definition (with slot):**

```json {15-19} title='FormWithSlot.json'
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "header",
        "type": "MuiTypography",
        "props": {
          "children": {
            "value": "Form header"
          }
        }
      },
      {
        "key": "contentSlot",
        "type": "Slot",
        "props": {}
      },
      {
        "key": "footer",
        "type": "MuiTypography",
        "props": {
          "children": {
            "value": "Form footer"
          }
        }
      }
    ]
  }
}
```

**Parent form using the embedded form:**

```json {26} title='ParentFormWithSlotContent.json'
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "mainForm",
        "type": "EmbeddedForm",
        "props": {
          "formName": {
            "value": "form-with-slot"
          }
        },
        "children": [
          {
            "key": "muiTypography1",
            "type": "MuiTypography",
            "props": {
              "children": {
                "value": "Form content"
              },
              "variant": {
                "value": "h2"
              }
            },
            "slot": "contentSlot"
          }
        ]
      }
    ]
  }
}
```

#### Slot use cases

1. **Template systems**: Create reusable form templates with customizable areas.
2. **Dynamic layouts**: Allow different content in the same layout structure.
3. **Component injection**: Inject specific components based on business logic.

#### Slot properties

The `Slot` component has no configurable properties. It serves as a pure placeholder that renders content from the parent form.

:::info

Slots only work within `EmbeddedForm` components. The parent form have to provide content for slots through the embedded form's childrens.

:::

### Best practices

1. **Keep `getForm` fast:** The `getForm` function runs during rendering. Avoid heavy computations or synchronous network requests inside
   it. If you need to load form definitions from an API, cache them or load them upfront.
2. **Use meaningful `formName` values:** Choose `formName` strings that clearly identify the nested form's purpose (e.g.,
   `'billing-address'`, `'emergency-contact'`). This makes debugging and maintenance easier.
3. **Choose the right data storage mode:**
   - Use `storeDataInParentForm: true` (default) when you want all fields flattened into the parent form's data object.
   - Use `storeDataInParentForm: false` when the nested form's data should be kept together as a logical unit.
4. **Parameterize with `options`:** When a nested form needs to vary based on runtime conditions, pass those conditions via the `options`
   object rather than creating many separate form definitions.
5. **Reuse form definitions:** Embedded forms excel at reusing the same form JSON in multiple places. Define common sections (address,
   contact info) once and embed them wherever needed.
6. **Test both modes:** Verify that your embedded forms work correctly with both `storeDataInParentForm: true` and `false`, because the data
   structure changes affect validation, submission, and data retrieval.

## Troubleshooting

### The embedded form doesn't appear

- **Check `getForm`:** Ensure your `getForm` function returns valid JSON for the requested `formName` or `options`. Add console logging to
  verify it's being called with the expected arguments.
- **Verify props:** The `EmbeddedForm` component requires either `formName` or `options` (or both). If neither is provided, it renders
  nothing in viewer mode.
- **Inspect errors:** Open the browser's developer console. FormEngine Core logs warnings when `getForm` returns invalid JSON or when the
  nested form fails to parse.

### Nested form data doesn't appear in parent form data

- **Check `storeDataInParentForm`:** When `storeDataInParentForm: true`, nested fields appear as top‑level keys in `form.data`. When
  `false`, they're nested under the embedded form's `dataKey`.
- **Verify `dataKey`:** If using `storeDataInParentForm: false`, ensure the embedded form component has a `key` / `dataKey` property set, or
  the nested data won't have a place to live.

### Validation doesn't cross the embedded boundary

- Embedded forms validate independently, but their validation errors bubble up to the parent form.
- If a nested field has a validation error, the parent form's `form.hasErrors` will be `true`.
- To see nested errors, inspect `form.errors`, they will be keyed by the full path (either the field's own `key` / `dataKey` or the
  nested object path).

### Performance issues with many embedded forms

- Each `EmbeddedForm` creates a separate FormEngine instance. If you have dozens of embedded forms, consider whether you truly need separate
  instances or could use repeaters, conditional rendering, or a different composition pattern.
- Use `disabled` and `readOnly` props to prevent unnecessary re‑renders when the nested form isn't interactive.

## Summary

- Embedded forms let you nest complete FormEngine forms inside other forms using the `EmbeddedForm` component.
- The nested form's JSON is supplied via the `getForm` callback, which receives a `formName` and `options`.
- Control data storage with `storeDataInParentForm`: `true` flattens fields into the parent's data; `false` keeps them as a nested object.
- Embedded forms share the parent's context, events, and validation lifecycle while maintaining their own definition and rendering.
- Use embedded forms for reusable sections, conditional form parts, multi‑step workflows, and dynamic form composition.

---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Computed properties](/formengine-core/computed-properties)
- [EmbeddedFormProps reference](/api-reference/@react-form-builder/core/interfaces/EmbeddedFormProps)
- [FormViewerProps.getForm reference](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#getform)

[fv-getform]: /api-reference/@react-form-builder/core/interfaces/FormViewerProps#getform
[efp-formname]: /api-reference/@react-form-builder/core/interfaces/EmbeddedFormProps#formname
[efp-options]: /api-reference/@react-form-builder/core/interfaces/EmbeddedFormProps#options
