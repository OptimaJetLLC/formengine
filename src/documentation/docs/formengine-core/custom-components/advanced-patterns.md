---
sidebar_position: 6
title: Advanced Component Patterns
description: This guide covers advanced patterns for creating sophisticated custom components that handle complex scenarios, including composite components, context access, performance optimization
---

# Advanced Component Patterns

This guide covers advanced patterns for creating sophisticated custom components that handle complex scenarios, including composite
components, context access, performance optimization, and cross-component communication.

## Composite Components (Components with Children)

Composite components can contain other components, enabling complex layouts and reusable patterns.

Use the [node](/api-reference/@react-form-builder/core/variables/node) annotation to describe a component property that may contain child
components. By default, the children property is considered a property that contains child components.

### Example: Card Container

```tsx
import {boolean, define, node, object, oneOf} from '@react-form-builder/core'

const Card = ({
                title,
                children,
                bordered,
                shadow,
                size,
                bodyStyle
              }: any) => {
  return (
    <div className={`card card--${size} ${bordered ? 'card--bordered' : ''} ${shadow ? 'card--shadow' : ''}`}>
      {title && (
        <div className="card__header">
          {title}
        </div>
      )}
      <div className="card__body" style={bodyStyle}>
        {children}
      </div>
    </div>
  )
}

export const card = define(Card, 'Card')
  .props({
    children: node, // ← Enables child components!
    title: node, // ← Enables child components!
    bordered: boolean.default(true),
    shadow: boolean.default(false),
    size: oneOf('small', 'medium', 'large').default('medium'),
    bodyStyle: object,
  })
  .build()
```

**Usage in JSON:**

```json {13}
{
  "key": "userCard",
  "type": "Card",
  "props": {
    "shadow": {
      "value": true
    }
  },
  "children": [
    {
      "key": "Header",
      "type": "MuiTypography",
      "slot": "title",
      "props": {
        "variant": {
          "value": "h4"
        },
        "children": {
          "value": "User Information"
        }
      }
    },
    {
      "key": "userName",
      "type": "MuiTextField",
      "props": {
        "label": {
          "value": "Full Name"
        }
      }
    },
    {
      "key": "userEmail",
      "type": "MuiTextField",
      "props": {
        "label": {
          "value": "Email Address"
        }
      }
    }
  ]
}
```

#### Live Example

```jsx live
function App() {
  const Card = ({
                  title,
                  children,
                  bordered,
                  shadow,
                  size,
                  bodyStyle
                }) => {
    return (
      <div className={`card card--${size} ${bordered ? 'card--bordered' : ''} ${shadow ? 'card--shadow' : ''}`}>
        {title && (
          <div className="card__header">
            {title}
          </div>
        )}
        <div className="card__body" style={bodyStyle}>
          {children}
        </div>
      </div>
    )
  }

  const card = define(Card, 'Card')
    .props({
      children: node,
      title: node,
      bordered: boolean.default(true),
      shadow: boolean.default(false),
      size: oneOf('small', 'medium', 'large').default('medium'),
      bodyStyle: object,
    })
    .build()

  const view = muiView
  view.define(card.model)

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "userCard",
          "type": "Card",
          "props": {
            "shadow": {
              "value": true
            }
          },
          "children": [
            {
              "key": "Header",
              "type": "MuiTypography",
              "slot": "title",
              "props": {
                "variant": {
                  "value": "h4"
                },
                "children": {
                  "value": "User Information"
                }
              }
            },
            {
              "key": "userName",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Full Name"
                }
              }
            },
            {
              "key": "userEmail",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Email Address"
                }
              }
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

## Accessing Form Context

Components can access the form data and other context.
The [useComponentData](/api-reference/@react-form-builder/core/variables/useComponentData) hook returns component data, which is used by
FormEngine Core to render the component. You can get the form data, component value, and other data using this hook.

```tsx
import {define, string, useComponentData} from '@react-form-builder/core'

const ContextAwareComponent = ({value, onChange}: any) => {
  // Get component-specific data
  const componentData = useComponentData()
  const field = componentData.field
  const currentValue = '' + (field?.value ?? '')

  // Get all form data
  const formData = componentData.root.data

  // Check validation state
  const hasErrors = componentData.root.hasErrors

  return (
    <div className="context-aware">
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={hasErrors}
      />
      <p>Value: {currentValue}</p>
      <p>Form data ({hasErrors ? 'invalid' : 'valid'}):</p>
      <pre>
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  )
}

export const contextAwareComponent = define(ContextAwareComponent, 'ContextAwareComponent')
  .props({
    value: string.valued.uncontrolledValue('')
  })
  .build()
```

### Live Example

```jsx live
function App() {
  const ContextAwareComponent = ({value, onChange}) => {
    // Get component-specific data
    const componentData = useComponentData()
    const field = componentData.field
    const currentValue = '' + (field?.value ?? '')

    // Get all form data
    const formData = componentData.root.data

    // Check validation state
    const hasErrors = componentData.root.hasErrors

    return (
      <div className="context-aware">
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          disabled={hasErrors}
        />
        <p>Value: {currentValue}</p>
        <p>Form data ({hasErrors ? 'invalid' : 'valid'}):</p>
        <pre>
        {JSON.stringify(formData, null, 2)}
      </pre>
      </div>
    )
  }

  const contextAwareComponent = define(ContextAwareComponent, 'ContextAwareComponent')
    .props({
      value: string.valued.uncontrolledValue('')
    })
    .build()

  const view = muiView
  view.define(contextAwareComponent.model)

  const formJson = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "contextAwareComponent",
          "type": "ContextAwareComponent"
        },
        {
          "key": "Header",
          "type": "MuiTypography",
          "slot": "title",
          "props": {
            "variant": {
              "value": "h4"
            },
            "children": {
              "value": "User Information"
            }
          }
        },
        {
          "key": "userName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Full Name"
            }
          }
        },
        {
          "key": "userEmail",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email Address"
            }
          },
          "schema": {
            "type": "string",
            "validations": [
              {
                "key": "email"
              },
              {
                "key": "required"
              }
            ]
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

## Summary

Advanced component patterns enable you to:

- Create reusable, composite components
- Access and manipulate form context

Key takeaways:

- Use `.node` for container components
- Access component data with `useComponentData()`

**Next Steps:**

- Explore [Styling Custom Components](styling-custom-components) for visual customization

Happy advanced component building! 🚀
