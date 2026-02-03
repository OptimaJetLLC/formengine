---
sidebar_position: 80
sidebar_class_name: formengine-core-additional
---

# Disabled and Read-Only Components

Many component libraries expose `disabled` and `readOnly` flags. `disabled` usually blocks interaction, while `readOnly` allows viewing
without editing. FormEngine Core supports these flags out of the box and propagates them through the component tree so you can lock down
sections consistently without wiring every field.

In this guide, you'll learn:

- How `disabled` and `readOnly` are computed and propagated
- Where to set the flags in `FormViewer` and form JSON
- Which components receive the flags and why
- How UI components apply the flags

## Overview

`disabled` and `readOnly` are boolean flags that move down the component tree. FormEngine Core treats both as propagated state and leaves
the actual interaction behavior to the UI component, so you can define intent once and let each component decide how to react.

## Where to Set the Flags

Set the flags at the highest level that matches your intent. Because the flags always propagate down, a higher-level setting affects every
component beneath it.

| Source                     | How to set                                                                 | Scope                 |
|----------------------------|----------------------------------------------------------------------------|-----------------------|
| FormViewer props           | [readOnly][formviewer-readonly]<br/>[disabled][formviewer-disabled]        | Entire component tree |
| Screen props               | [readOnly][screen-readonly]<br/>[disabled][screen-disabled]                | Screen subtree        |
| Templates / embedded forms | [readOnly][embedded-readonly]<br/>[disabled][embedded-disabled]            | Template subtree      |
| Container components       | `readOnly` or `disabled` props<br/>See the [API reference][api-reference]. | Container subtree     |
| Component props            | `readOnly` or `disabled` props<br/>See the [API reference][api-reference]. | Component subtree     |

- **FormViewer props** apply across the tree and are part of the public API. See
  [FormViewerProps](/api-reference/@react-form-builder/core/interfaces/FormViewerProps).
- **Container components** are any components that render children. If they declare these annotations, the flags apply to all descendants.
  Not every container exposes these flags, so check the component API reference.
- **Component props** are the most direct way to set flags, but not every component supports them. Check the component API reference.
- **Custom prop mapping** is supported. If a component maps the flag to a custom key, set that key in form JSON (for example, `isLocked`).

[formviewer-readonly]: /api-reference/@react-form-builder/core/interfaces/FormViewerProps#readonly
[formviewer-disabled]: /api-reference/@react-form-builder/core/interfaces/FormViewerProps#disabled
[screen-readonly]: /api-reference/@react-form-builder/core/interfaces/ScreenProps#readonly
[screen-disabled]: /api-reference/@react-form-builder/core/interfaces/ScreenProps#disabled
[embedded-readonly]: /api-reference/@react-form-builder/core/interfaces/EmbeddedFormProps#readonly
[embedded-disabled]: /api-reference/@react-form-builder/core/interfaces/EmbeddedFormProps#disabled
[api-reference]: /api-reference

### FormViewer props examples

**Read-only**

1. Define a form with a single `MuiTextField`.
2. Pass `readOnly` to `FormViewer`.

#### Live example

```jsx live
function App() {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Name',
            },
            value: {
              value: 'FormEngine'
            }
          },
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      readOnly
    />
  )
}
```

**Disabled**

1. Define a form with a single `MuiTextField`.
2. Pass `disabled` to `FormViewer`.

#### Live example

```jsx live
function App() {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Name',
            },
            value: {
              value: 'FormEngine'
            }
          },
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      disabled
    />
  )
}
```

### Screen props examples

**Read-only**

1. Set `readOnly` on the `Screen` props in the form JSON.
2. Render the form with `FormViewer`.

#### Live example

```jsx live
function App() {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {
        readOnly: {
          value: true,
        },
      },
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Name',
            },
            value: {
              value: 'FormEngine'
            }
          },
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
    />
  )
}
```

**Disabled**

1. Set `disabled` on the `Screen` props in the form JSON.
2. Render the form with `FormViewer`.

#### Live example

```jsx live
function App() {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {
        disabled: {
          value: true,
        },
      },
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Name',
            },
            value: {
              value: 'FormEngine'
            }
          },
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
    />
  )
}
```

### Embedded forms example

1. Define a single embedded form with one `MuiTextField`.
2. In the parent form, render two `EmbeddedForm` components that share the same `formName`.
3. Add labels in the parent form and set `readOnly` on one embedded form and `disabled` on the other.
4. Use `getForm` to return the embedded form when `formName` is provided.

#### Live example

```jsx live
function App() {
  const embeddedForm = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'name',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Embedded name',
            },
          },
        },
      ],
    },
  }

  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'readOnlyLabel',
          type: 'MuiTypography',
          props: {
            children: {
              value: 'Read-only embedded form',
            },
          },
        },
        {
          key: 'readOnlyEmbedded',
          type: 'EmbeddedForm',
          props: {
            formName: {
              value: 'profile',
            },
            readOnly: {
              value: true,
            },
          },
        },
        {
          key: 'disabledLabel',
          type: 'MuiTypography',
          props: {
            children: {
              value: 'Disabled embedded form',
            },
          },
        },
        {
          key: 'disabledEmbedded',
          type: 'EmbeddedForm',
          props: {
            formName: {
              value: 'profile',
            },
            disabled: {
              value: true,
            },
          },
        },
      ],
    },
  }

  const getForm = useCallback((name) => {
    if (!name) return JSON.stringify(form)
    if (name === 'profile') return JSON.stringify(embeddedForm)
    return JSON.stringify({form: {key: 'Screen', type: 'Screen', children: []}})
  }, [form, embeddedForm])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
    />
  )
}
```

### Container components example

1. Wrap each `MuiTextField` in its own `MuiBox` container and add a label with `MuiTypography`.
2. Set `readOnly` on one container and `disabled` on the other.
3. Render the form with `FormViewer`.

#### Live example

```jsx live
function App() {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'readOnlyContainer',
          type: 'MuiBox',
          props: {
            readOnly: {
              value: true,
            },
          },
          children: [
            {
              key: 'readOnlyLabel',
              type: 'MuiTypography',
              props: {
                children: {
                  value: 'Read-only container',
                },
              },
            },
            {
              key: 'readOnlyInput',
              type: 'MuiTextField',
              props: {
                label: {
                  value: 'Name',
                },
              },
            },
          ],
        },
        {
          key: 'disabledContainer',
          type: 'MuiBox',
          props: {
            disabled: {
              value: true,
            },
          },
          children: [
            {
              key: 'disabledLabel',
              type: 'MuiTypography',
              props: {
                children: {
                  value: 'Disabled container',
                },
              },
            },
            {
              key: 'disabledInput',
              type: 'MuiTextField',
              props: {
                label: {
                  value: 'Name',
                },
              },
            },
          ],
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
    />
  )
}
```

### Component props example

1. Define two `MuiTextField` components in the form.
2. Set `readOnly` on one component and `disabled` on the other.
3. Render the form with `FormViewer`.

#### Live example

```jsx live
function App() {
  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'readOnlyInput',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Read-only name',
            },
            readOnly: {
              value: true,
            },
          },
        },
        {
          key: 'disabledInput',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Disabled name',
            },
            disabled: {
              value: true,
            },
          },
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
    />
  )
}
```

## Propagation Rules

For each component, the core computes `isDisabled` and `isReadOnly` from three sources:

- `FormViewer` props
- The parent component state
- The component's own mapped flag

```typescript
const isDisabled = viewer.disabled || parent.isDisabled || self.disabled
const isReadOnly = viewer.readOnly || parent.isReadOnly || self.readOnly
```

`self` refers to the component's own flag (or mapped prop key). Propagation uses the parent component state, not raw parent props, so
descendants inherit the already computed flag. A `true` value at any level applies to the entire subtree. There is no override to turn a
child back on if an ancestor is disabled or read-only.

## Which Components Receive the Flags

Only components that declare `disabled` or `readOnly` in their metadata receive the computed flags as props. If a component does not opt in,
the core does not inject these flags for it.

Use the special boolean annotations when defining your component metadata:

- **Declare the flag** in `.props()` using the `readOnly` or `disabled` annotation.
- **Map to your prop name** by choosing the key that matches your component API (for example, `isLocked` or `isDisabled`).
- **Remember containers**: container components can also declare these annotations to propagate the flags to their children.

Short examples:

```tsx
export const simpleField = define(SimpleField, 'SimpleField')
  .props({
    readOnly: readOnly,
    disabled: disabled,
  })
  .build()
```

```tsx
export const customField = define(CustomField, 'CustomField')
  .props({
    isLocked: readOnly,
    isDisabled: disabled,
  })
  .build()
```

## Example: Simple Read-Only Component

```tsx title='SimpleNote.tsx'
import type {ChangeEvent} from 'react'
import {define, disabled, readOnly, string} from '@react-form-builder/core'

interface SimpleNoteProps {
  value: string
  isLocked?: boolean
  isDisabled?: boolean
  onChange?: (value: string) => void
}

const baseStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #d1d5db',
  fontSize: 14,
  lineHeight: 1.4,
} as const

const getInputStyle = (isLocked?: boolean, isDisabled?: boolean) => ({
  ...baseStyle,
  backgroundColor: isDisabled ? '#f3f4f6' : isLocked ? '#f9fafb' : '#ffffff',
  color: isDisabled ? '#9ca3af' : isLocked ? '#6b7280' : '#111827',
})

const SimpleNote = ({value, isLocked, isDisabled, onChange}: SimpleNoteProps): JSX.Element => (
  <input
    value={value}
    readOnly={isLocked}
    disabled={isDisabled}
    onChange={(event: ChangeEvent<HTMLInputElement>) => onChange?.(event.target.value)}
    style={getInputStyle(isLocked, isDisabled)}
  />
)

export const simpleNote = define(SimpleNote, 'SimpleNote')
  .props({
    value: string.valued.uncontrolledValue(''),
    isLocked: readOnly,
    isDisabled: disabled,
  })
  .build()
```

#### Live example

```jsx live
function App() {
  const baseStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #d1d5db',
    fontSize: 14,
    lineHeight: 1.4,
  }

  const getInputStyle = (isLocked, isDisabled) => ({
    ...baseStyle,
    backgroundColor: isDisabled ? '#f3f4f6' : isLocked ? '#f9fafb' : '#ffffff',
    color: isDisabled ? '#9ca3af' : isLocked ? '#6b7280' : '#111827',
  })

  const SimpleNote = ({value, isLocked, isDisabled, onChange}) => (
    <input
      value={value}
      readOnly={isLocked}
      disabled={isDisabled}
      onChange={(event) => onChange?.(event.target.value)}
      style={getInputStyle(isLocked, isDisabled)}
    />
  )

  const simpleNote = define(SimpleNote, 'SimpleNote')
    .props({
      value: string.valued.uncontrolledValue(''),
      isLocked: readOnly,
      isDisabled: disabled,
    })
    .build()

  const view = muiView
  view.define(simpleNote.model)

  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'defaultContainer',
          type: 'MuiBox',
          children: [
            {
              key: 'defaultNote',
              type: 'SimpleNote',
              props: {
                value: {
                  value: 'Editable',
                },
              },
            },
          ],
        },
        {
          key: 'readOnlyContainer',
          type: 'MuiBox',
          props: {
            readOnly: {
              value: true,
            },
          },
          children: [
            {
              key: 'readOnlyNote',
              type: 'SimpleNote',
              props: {
                value: {
                  value: 'Read-only',
                },
              },
            },
          ],
        },
        {
          key: 'disabledContainer',
          type: 'MuiBox',
          props: {
            disabled: {
              value: true,
            },
          },
          children: [
            {
              key: 'disabledNote',
              type: 'SimpleNote',
              props: {
                value: {
                  value: 'Disabled',
                },
              },
            },
          ],
        },
      ],
    },
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={view} getForm={getForm}/>
}
```

## How UI Components Apply the Flags

FormEngine Core injects `disabled` and `readOnly` alongside calculated values and events, but it does not block interaction on its own. Each
UI component must apply the flags, for example by mapping to native props when supported or guarding event handlers like `onChange` and
`onClick`.

:::info note
Form actions and calculations can still read and update form data even when components are disabled or read-only. The flags only influence
how the UI behaves.
:::

## Summary

- `disabled` and `readOnly` are computed from `FormViewer` props, parent state, and the component's own mapped flag.
- Only components that declare these annotations receive the flags as props.
- The core injects the flags into rendered props, while UI components decide how to enforce them.
- You can set the flags on `FormViewer`, screens, embedded forms/templates, containers, or individual components.

---

For more information:

- [Custom components: disabled and read-only](/formengine-core/custom-components/disabled-and-read-only)
- [Embedded forms and templates](/formengine-core/embedded-forms)
- [FormViewer props API](/api-reference/@react-form-builder/core/interfaces/FormViewerProps)
- [Disabled annotation](/api-reference/@react-form-builder/core/variables/disabled)
- [ReadOnly annotation](/api-reference/@react-form-builder/core/variables/readOnly)
