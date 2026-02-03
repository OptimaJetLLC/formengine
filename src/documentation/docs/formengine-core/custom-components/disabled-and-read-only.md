---
sidebar_position: 10
---

# Disabled and Read-Only Components

FormEngine Core provides a powerful mechanism for handling disabled and read-only states in custom components. Using
the [disabled](/api-reference/@react-form-builder/core/variables/disabled) and
[readOnly](/api-reference/@react-form-builder/core/variables/readOnly) property annotations, you can create components that automatically
respect and propagate these states throughout the component hierarchy.

## Understanding Disabled and Read-Only Properties

The [disabled](/api-reference/@react-form-builder/core/variables/disabled)
and [readOnly](/api-reference/@react-form-builder/core/variables/readOnly) annotations are special boolean properties that enable automatic
state propagation. When a component is marked as disabled or read-only, all its descendant components automatically receive the same state.

These annotations are built on top of the standard [boolean](/api-reference/@react-form-builder/core/variables/boolean) annotation with
additional metadata that tells FormEngine to treat them as special state properties. The key difference between them is:

- **disabled**: Completely prevents user interaction with the component
- **readOnly**: Allows viewing but not editing of component values

## Creating a Component with Disabled Support

To create a custom component that supports the disabled state, use the `disabled` annotation. Here's an example of a custom button
component:

```tsx
import {define, disabled, event, string} from '@react-form-builder/core'

interface CustomButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton = ({
                        label,
                        disabled,
                        onClick
                      }: CustomButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        backgroundColor: disabled ? '#cccccc' : '#007bff',
        color: disabled ? '#666666' : '#ffffff',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  )
}

export const customButton = define(CustomButton, 'CustomButton')
  .props({
    label: string.default('Click me'),
    disabled: disabled,
    onClick: event,
  })
  .build()
```

In this example:
- The `disabled` annotation marks this property as a special state property
- The component receives the `disabled` prop and applies appropriate styling
- The `onClick` event is automatically prevented when the component is disabled

### Live Example

```jsx live
function App() {
  const CustomButton = ({
                          label,
                          disabled,
                          onClick
                        }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        style={{
          padding: '10px 20px',
          backgroundColor: disabled ? '#cccccc' : '#007bff',
          color: disabled ? '#666666' : '#ffffff',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.6 : 1,
        }}
      >
        {label}
      </button>
    )
  }

  const customButton = define(CustomButton, 'CustomButton')
    .props({
      label: string.default('Click me'),
      disabled: disabled,
      onClick: event,
    })
    .build()

  const view = createView([customButton.model])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "enabledButton",
          "type": "CustomButton",
          "props": {
            "label": {
              "value": "Enabled"
            }
          }
        },
        {
          "key": "disabledButton",
          "type": "CustomButton",
          "props": {
            "label": {
              "value": "Disabled"
            },
            "disabled": {
              "value": true
            }
          }
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Creating a Component with Read-Only Support

For components that should support read-only mode, use the [readOnly](/api-reference/@react-form-builder/core/variables/readOnly)
annotation. Here's an example of a custom text input component:

```tsx
import {define, event, readOnly, string} from '@react-form-builder/core'
import type {ChangeEvent} from 'react'

interface CustomTextInputProps {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

const CustomTextInput = ({
                           value,
                           placeholder,
                           readOnly,
                           onChange
                         }: CustomTextInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!readOnly && onChange) {
      onChange(e.target.value)
    }
  }

  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={handleChange}
      style={{
        padding: '8px 12px',
        border: `1px solid ${readOnly ? '#cccccc' : '#007bff'}`,
        borderRadius: '4px',
        backgroundColor: readOnly ? '#f5f5f5' : '#ffffff',
        color: readOnly ? '#666666' : '#333333',
        cursor: readOnly ? 'default' : 'text',
      }}
    />
  )
}

export const customTextInput = define(CustomTextInput, 'CustomTextInput')
  .props({
    value: string.valued.uncontrolledValue(''),
    placeholder: string.default('Enter text...'),
    readOnly: readOnly,
    onChange: event,
  })
  .build()
```

### Live Example

```jsx live
function App() {
  const CustomTextInput = ({
                             value,
                             placeholder,
                             readOnly,
                             onChange
                           }) => {
    const handleChange = (e) => {
      if (!readOnly && onChange) {
        onChange(e.target.value)
      }
    }

    return (
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={handleChange}
        style={{
          padding: '8px 12px',
          border: `1px solid ${readOnly ? '#cccccc' : '#007bff'}`,
          borderRadius: '4px',
          backgroundColor: readOnly ? '#f5f5f5' : '#ffffff',
          color: readOnly ? '#666666' : '#333333',
          cursor: readOnly ? 'default' : 'text',
        }}
      />
    )
  }

  const customTextInput = define(CustomTextInput, 'CustomTextInput')
    .props({
      value: string.valued.uncontrolledValue(''),
      placeholder: string.default('Enter text...'),
      readOnly: readOnly,
      onChange: event,
    })
    .build()

  const view = createView([customTextInput.model])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "enabledInput",
          "type": "CustomTextInput"
        },
        {
          "key": "disabledInput",
          "type": "CustomTextInput",
          "props": {
            "placeholder": {
              "value": "Disabled input"
            },
            "readOnly": {
              "value": true
            }
          }
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

In this example:
- The `readOnly` annotation marks this property as a special state property
- The component conditionally prevents user input when in read-only mode
- Visual styling changes to indicate the read-only state

## Automatic Property Propagation

One of the most powerful features of FormEngine Core is the automatic propagation of `disabled` and `readOnly` states. When a parent
component is disabled or set to read-only, all its children automatically inherit these states.

### Example: Container with Child Components

```tsx
import {define, disabled, node, readOnly, string} from '@react-form-builder/core'
import type {ReactNode} from 'react'

interface CustomContainerProps {
  title: string
  disabled?: boolean
  readOnly?: boolean
  children?: ReactNode
}

const CustomContainer = ({
                           title,
                           disabled,
                           readOnly,
                           children
                         }: CustomContainerProps) => {
  const containerStyle = {
    border: `2px solid ${disabled ? '#cccccc' : readOnly ? '#e6e6e6' : '#007bff'}`,
    padding: '20px',
    margin: '10px 0',
    backgroundColor: disabled ? '#f9f9f9' : '#ffffff',
    opacity: disabled ? 0.7 : 1,
  }

  const titleStyle = {
    color: disabled ? '#999999' : '#333333',
    marginBottom: '15px',
    fontWeight: 'bold',
  }

  return (
    <div style={containerStyle}>
      <div style={titleStyle}>{title}</div>
      <div>{children}</div>
    </div>
  )
}

export const customContainer = define(CustomContainer, 'CustomContainer')
  .props({
    title: string.default('Container'),
    disabled: disabled,
    readOnly: readOnly,
  })
  .build()
```

When you use this container in a form:
- If the container is `disabled: true`, all child components inside it will automatically receive `disabled: true`
- If the container is `readOnly: true`, all child components inside it will automatically receive `readOnly: true`

### Live Example

```jsx live
function App() {
  const CustomContainer = ({
                             title,
                             disabled,
                             readOnly,
                             children
                           }) => {
    const containerStyle = {
      border: `2px solid ${disabled ? '#cccccc' : readOnly ? '#e6e6e6' : '#007bff'}`,
      padding: '20px',
      margin: '10px 0',
      backgroundColor: disabled ? '#f9f9f9' : '#ffffff',
      opacity: disabled ? 0.7 : 1,
    }

    const titleStyle = {
      color: disabled ? '#999999' : '#333333',
      marginBottom: '15px',
      fontWeight: 'bold',
    }

    return (
      <div style={containerStyle}>
        <div style={titleStyle}>{title}</div>
        <div>{children}</div>
      </div>
    )
  }

  const customContainer = define(CustomContainer, 'CustomContainer')
    .props({
      title: string.default('Container'),
      disabled: disabled,
      readOnly: readOnly,
    })
    .build()

  const view = muiView
  view.define(customContainer.model)

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "disabledContainer",
          "type": "CustomContainer",
          "props": {
            "title": {
              "value": "Disabled container"
            },
            "disabled": {
              "value": true
            }
          },
          "children": [
            {
              "key": "firstName",
              "type": "MuiTextField"
            },
            {
              "key": "lastName",
              "type": "MuiTextField"
            }
          ]
        },
        {
          "key": "readOnlyContainer",
          "type": "CustomContainer",
          "props": {
            "title": {
              "value": "Read-only container"
            },
            "readOnly": {
              "value": true
            }
          },
          "children": [
            {
              "key": "firstName2",
              "type": "MuiTextField"
            },
            {
              "key": "lastName2",
              "type": "MuiTextField"
            }
          ]
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Best Practices

1. **Always handle both states**: Even if your component primarily uses one state, handle both for consistency.
2. **Use appropriate visual feedback**: Clearly indicate disabled/read-only states through styling changes like opacity, cursor changes, or
   background colors.
3. **Document component behavior**: Clearly document how your component responds to disabled and read-only states.

## Summary

The `disabled` and `readOnly` annotations provide a powerful way to create components that seamlessly integrate with FormEngine's state
management system. By using these special annotations:

- Your components automatically participate in state propagation
- Complex form states can be managed at the container level
- User experience remains consistent across all components

Remember that these properties work together with FormEngine's other features like events and validation to create robust, interactive forms
with minimal boilerplate code.
