---
sidebar_position: 60
---

# Custom Modal Component

Modal components in FormEngine Core are special UI elements that display content in a dialog window on top of the current form. Unlike
regular components, modal components can host nested forms, creating a hierarchical form structure that's ideal for complex workflows, data
entry dialogs, and confirmation screens.

## What is a Modal Component?

In FormEngine Core, a modal component is a React component that:

- **Displays content in an overlay dialog** that appears above the main form
- **Hosts nested forms** - essentially displaying a child form within the modal
- **Manages its own open/close state** through props provided by the framework
- **Integrates with form actions** like `openModal` and `closeModal`
- **Can pass data** between the parent form and the modal form

The modal component itself is a wrapper - when you define a custom modal component, you're creating the dialog container that will host the
nested form content.

## The CustomModalProps Interface

All custom modal components have to implement the `CustomModalProps` interface. This interface defines the minimal properties that
FormEngine Core provides to modal components:

```typescript
interface CustomModalProps {
  /**
   * Flag if true, the modal window should be displayed, false otherwise.
   */
  open?: boolean

  /**
   * The function that should be called when the modal window is closed.
   */
  handleClose?: () => void
}
```

Your custom modal component should extend this interface to add additional properties, but it must at minimum accept these two props.

## Creating a Basic Custom Modal Component

Let's create a simple modal component using plain HTML and CSS:

```tsx {118}
import {define, oneOf, string} from '@react-form-builder/core'
import type {ReactNode} from 'react'
import {useCallback, useEffect, useMemo} from 'react'

interface SimpleModalProps {
  /** Modal open state */
  open?: boolean
  /** Close handler */
  handleClose?: () => void
  /** Modal title */
  title?: string
  /** Modal size */
  size?: 'small' | 'medium' | 'large'
  /** Modal content */
  children?: ReactNode
}

const titleStyle = {margin: 0, fontSize: 18, fontWeight: 600} as const

const mainDivStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
} as const

const sizeClasses = {
  small: {width: 400},
  medium: {width: 600},
  large: {width: 800}
}

const innerDivStyle = {
  backgroundColor: 'white',
  borderRadius: 8,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
} as const

const modalHeaderStyle = {
  padding: '16px 24px',
  borderBottom: '1px solid #e5e7eb',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
} as const

const buttonStyle = {
  background: 'none',
  border: 'none',
  fontSize: '24px',
  cursor: 'pointer',
  color: '#6b7280'
} as const

const modalContentStyle = {padding: 24} as const

const SimpleModal = (props: SimpleModalProps) => {
  const {open, handleClose, title, size = 'medium', children} = props

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = ''
      }
    }
  }, [open])

  const divStyle = useMemo(() => {
    return {
      ...innerDivStyle,
      ...sizeClasses[size]
    } as const
  }, [size])

  const handleClick = useCallback(() => {
    handleClose?.()
  }, [handleClose])

  if (!open) return null

  return (
    <div style={mainDivStyle}>
      <div style={divStyle}>
        {/* Modal header */}
        <div style={modalHeaderStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <button
            onClick={handleClick}
            style={buttonStyle}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Modal content - this is where the nested form will be rendered */}
        <div style={modalContentStyle}>
          {children}
        </div>
      </div>
    </div>
  )
}

export const simpleModal = define(SimpleModal, 'SimpleModal')
  .props({
    title: string.default('Modal Title'),
    size: oneOf('small', 'medium', 'large').default('medium')
  })
  .componentRole('modal') // This is crucial!
  .build()
```

## The componentRole('modal') Method

The `.componentRole('modal')` method is essential for modal components. It tells FormEngine Core that:

1. **This component can be used as a modal container** in form settings
2. **It will receive the `open` and `handleClose` props** automatically
3. **It can host nested forms** that will be rendered as its children
4. **It integrates with modal actions** like `openModal` and `closeModal`

Without this method, FormEngine Core won't recognize your component as a valid modal component.

## Live Example

```jsx live
function App() {
  const titleStyle = {margin: 0, fontSize: 18, fontWeight: 600}

  const mainDivStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }

  const sizeClasses = {
    small: {width: 400},
    medium: {width: 600},
    large: {width: 800}
  }

  const innerDivStyle = {
    backgroundColor: 'white',
    borderRadius: 8,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
  }

  const modalHeaderStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const buttonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#6b7280'
  }

  const modalContentStyle = {padding: 24}

  const SimpleModal = (props) => {
    const {open, handleClose, title, size = 'medium', children} = props

    // Prevent body scrolling when modal is open
    useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = ''
        }
      }
    }, [open])

    const divStyle = useMemo(() => {
      return {
        ...innerDivStyle,
        ...sizeClasses[size]
      }
    }, [size])

    const handleClick = useCallback(() => {
      handleClose?.()
    }, [handleClose])

    if (!open) return null

    return (
      <div style={mainDivStyle}>
        <div style={divStyle}>
          {/* Modal header */}
          <div style={modalHeaderStyle}>
            <h3 style={titleStyle}>{title}</h3>
            <button
              onClick={handleClick}
              style={buttonStyle}
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>

          {/* Modal content - this is where the nested form will be rendered */}
          <div style={modalContentStyle}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  const simpleModal = define(SimpleModal, 'SimpleModal')
    .props({
      title: string.default('Modal Title'),
      size: oneOf('small', 'medium', 'large').default('medium')
    })
    .componentRole('modal')
    .build()

  const view = muiView
  view.define(simpleModal.model)
  
  const modalForm = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "muiTypography1",
          "type": "MuiTypography",
          "props": {
            "variant": {
              "value": "subtitle1"
            },
            "children": {
              "value": "Modal content"
            }
          }
        },
        {
          "key": "switch",
          "type": "MuiFormControlLabel",
          "props": {
            "control": {
              "value": "Switch"
            },
            "label": {
              "value": "Switch"
            }
          }
        }
      ]
    }
  }
  
  const mainForm = {
    "modalType": "SimpleModal",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "modal",
          "type": "Modal",
          "props": {
            "modalTemplate": {
              "value": "Template:modal-content"
            }
          }
        },
        {
          "key": "muiButton1",
          "type": "MuiButton",
          "props": {
            "children": {
              "value": "Open modal"
            }
          },
          "events": {
            "onClick": [
              {
                "name": "openModal",
                "type": "common",
                "args": {
                  "modalKey": "modal"
                }
              }
            ]
          }
        }
      ]
    }
  }
  
  const getForm = (name) => {
    const form = name === 'modal-content' ? modalForm : mainForm
    return JSON.stringify(form)
  }

  return (
    <FormViewer
      view={view}
      getForm={getForm}
    />
  )
}
```

## How Modal Components Work with Nested Forms

When you use a modal component in a form, FormEngine Core automatically:

1. **Renders your modal component** with the `open` and `handleClose` props
2. **Passes a nested form as children** to your modal component
3. **Manages the modal state** through form actions
4. **Handles data passing** between parent and child forms

## Best Practices for Custom Modal Components

### 1. Always Implement CustomModalProps

Ensure your component accepts at minimum the `open` and `handleClose` props.

### 2. Use componentRole('modal')

Without this, FormEngine Core won't recognize your component as a modal.

### 3. Handle Accessibility

- Add ARIA attributes: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`
- Support keyboard navigation (Escape to close, Tab trapping)
- Manage focus (focus on first interactive element when opening, return focus when closing)

### 4. Prevent Body Scroll

When modal is open, prevent scrolling on the underlying page:

```typescript
useEffect(() => {
  if (open) {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }
}, [open])
```

### 5. Support Nested Forms

Remember that your modal component will receive nested forms as children. Ensure your component's content area can properly render React
children.

### 6. Test with Different UI Libraries

If supporting multiple UI libraries, ensure consistency in prop names and behavior.

## Troubleshooting Common Issues

### Issue: Modal doesn't open

- **Check:** Did you call `.componentRole('modal')`?
- **Check:** Is the modal component registered in the form's `modalType` setting?
- **Check:** Are you using the correct `modalKey` in the `openModal` action?

### Issue: handleClose not working

- **Check:** Are you calling `props.handleClose()` in your close button handler?
- **Check:** Does your modal component properly pass the `handleClose` prop to the underlying UI component?

### Issue: Nested form not displaying

- **Check:** Does your modal component render its `children` prop?

### Issue: Modal state not updating

- **Check:** Are you using the `open` prop to control visibility?
- **Check:** Are you overriding the `open` prop with local state? (Don't do this - use the prop directly)

## Conclusion

Custom modal components in FormEngine Core are powerful tools for creating complex, nested form interfaces. By implementing the
`CustomModalProps` interface and using the `.componentRole('modal')` method, you can create modal dialogs that:

- Host nested forms
- Integrate with form actions
- Pass data between forms
- Work with any UI library
- Provide rich user experiences

Remember that modal components are wrappers - they provide the container, while FormEngine Core handles the nested form rendering and state
management. This separation of concerns makes it easy to create consistent, accessible modal experiences across your application.

## Next Steps

- Learn about [modal actions and events](/formengine-core/actions-and-events) for advanced modal workflows
- Explore [nested forms and data passing](/formengine-core/embedded-forms) for complex form hierarchies
