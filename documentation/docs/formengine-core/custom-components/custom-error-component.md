---
sidebar_position: 40
title: Custom Error Components
description: Custom error components allow you to create tailored error message displays that match your application's design system
---

# Custom Error Components

Custom error components allow you to create tailored error message displays that match your application's design system while maintaining
all the accessibility and validation features of FormEngine Core. By creating custom error components, you can control exactly how
validation errors are presented to users, ensuring consistent user experience across your forms.

## What Are Custom Error Components?

Custom error components are special-purpose React components that:

- Display validation error messages for form fields
- Integrate with FormEngine's validation system
- Follow accessibility standards (ARIA attributes)
- Can be styled to match your design system
- Support internationalization and localization

Error components are automatically rendered by FormEngine when field validation fails, wrapping the problematic form field with your custom
error display.

## The componentRole('error-message') Feature

The key to creating error components in FormEngine is the `.componentRole('error-message')` method. This tells FormEngine that a component
should be treated as an error wrapper, enabling:

- Automatic integration with form field validation
- Proper accessibility attribute handling
- Error message prop injection
- Consistent error display behavior

```typescript {7}
import {define} from '@react-form-builder/core'

export const myErrorComponent = define(MyErrorComponent, 'MyErrorComponent')
  .props({
    // Component properties here
  })
  .componentRole('error-message') // ← This is crucial!
  .build()
```

## The ErrorWrapperProps Interface

All error components must accept props that extend or implement
the [ErrorWrapperProps](/api-reference/@react-form-builder/core/interfaces/ErrorWrapperProps) interface. This interface provides the
essential properties needed for error display:

```typescript
import type {ReactNode} from 'react'

/**
 * Properties of the React component that wraps the form view component and displays validation errors.
 */
export interface ErrorWrapperProps {
  /**
   * The error text (validation message)
   */
  error?: string
  /**
   * The wrapped form field component
   */
  children?: ReactNode
  /**
   * The CSS class name
   */
  className?: string
}
```

**Key Props:**

- `error`: The validation error message (provided by FormEngine when validation fails)
- `children`: The form field component that needs error wrapping
- `className`: Additional CSS classes for styling

## Creating a Basic Error Component

Here's a minimal example of a custom error component:

```tsx
import type {ErrorWrapperProps} from '@react-form-builder/core'
import {define, string} from '@react-form-builder/core'

const SimpleErrorWrapper = ({error, children, className}: ErrorWrapperProps) => {
  return (
    <div className={`error-wrapper ${className || ''}`}>
      {children}
      {error && (
        <div className="error-message" role="alert">
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

export const simpleErrorWrapper = define(SimpleErrorWrapper, 'SimpleErrorWrapper')
  .componentRole('error-message')
  .build()
```

### Live Example

```jsx live
function App() {
  const CustomInput = ({value, onChange, placeholder}) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )

  const customInput = define(CustomInput, 'CustomInput')
    .props({
      value: string.valued.uncontrolledValue(''),
      placeholder: string.default('Enter text...')
    })
    .build()
  
  const SimpleErrorWrapper = ({error, children, className}) => {
    return (
      <div className={`error-wrapper ${className || ''}`} style={{display: 'flex', flexDirection: 'column'}}>
        {children}
        {error && (
          <div className="error-message" role="alert">
            ⚠️ {error}
          </div>
        )}
      </div>
    )
  }

  const simpleErrorWrapper = define(SimpleErrorWrapper, 'SimpleErrorWrapper')
    .componentRole('error-message')
    .build()

  const view = muiView
  view.define(simpleErrorWrapper.model)
  view.define(customInput.model)

  const formJson = {
    "errorType": "SimpleErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "input",
          "type": "CustomInput",
          "props": {
            "placeholder": {
              "value": "Name"
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
          "key": "validateButton",
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

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Advanced Error Component with Accessibility

For production use, it's important to include proper accessibility attributes. FormEngine provides utilities to help with this:

```tsx
import type {ErrorWrapperProps} from '@react-form-builder/core'
import {define, useAriaErrorMessage} from '@react-form-builder/core'

const AccessibleErrorWrapper = ({error, children, className}: ErrorWrapperProps) => {
  const ariaAttributes = useAriaErrorMessage()

  return (
    <div className={`accessible-error-wrapper ${className || ''}`}>
      {children}
      {error && (
        <div
          id={ariaAttributes['aria-errormessage']}
          className="error-message"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
    </div>
  )
}

export const accessibleErrorWrapper = define(AccessibleErrorWrapper, 'AccessibleErrorWrapper')
  .componentRole('error-message')
  .build()
```

### Live Example

```jsx live
function App() {
  const CustomInput = ({value, onChange, placeholder}) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
    />
  )

  const customInput = define(CustomInput, 'CustomInput')
    .props({
      value: string.valued.uncontrolledValue(''),
      placeholder: string.default('Enter text...')
    })
    .build()

  const AccessibleErrorWrapper = ({error, children, className}) => {
    const ariaAttributes = useAriaErrorMessage()

    return (
      <div className={`accessible-error-wrapper ${className || ''}`} style={{display: 'flex', flexDirection: 'column'}}>
        {children}
        {error && (
          <div
            id={ariaAttributes['aria-errormessage']}
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            {error}
          </div>
        )}
      </div>
    )
  }

  const accessibleErrorWrapper = define(AccessibleErrorWrapper, 'AccessibleErrorWrapper')
    .componentRole('error-message')
    .build()

  const view = muiView
  view.define(accessibleErrorWrapper.model)
  view.define(customInput.model)

  const formJson = {
    "errorType": "AccessibleErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "input",
          "type": "CustomInput",
          "props": {
            "placeholder": {
              "value": "Name"
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
          "key": "validateButton",
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

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Displaying Validation Errors Inside Custom Components

If you need to display validation error messages directly inside your custom components (rather than using an external error wrapper), you
can use the [useErrorMessage](/api-reference/@react-form-builder/core/functions/useErrorMessage) hook. This hook returns the validation
error message for the current component if there is one, making it
ideal for custom field components that want to handle their own error display.

The [useErrorMessage](/api-reference/@react-form-builder/core/functions/useErrorMessage) hook is particularly useful when:

- You want to integrate error messages directly into your component's layout
- Your custom component has a unique design that doesn't work well with external error wrappers
- You need fine-grained control over when and how errors are displayed

### Using the useErrorMessage Hook

Here's an example of a custom input component that uses `useErrorMessage` to display validation errors:

```tsx
import {define, event, string, useErrorMessage} from '@react-form-builder/core'
import {ChangeEvent, useCallback} from 'react'

interface CustomInputWithErrorProps {
  value: string
  placeholder?: string
  onChange?: (value: string) => void
}

const CustomInputWithError = ({
                                value,
                                placeholder,
                                onChange
                              }: CustomInputWithErrorProps) => {
  const error = useErrorMessage()

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }, [onChange])

  return (
    <div className="custom-input-container">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={error ? 'error' : ''}
        aria-invalid={!!error}
        aria-describedby={error ? 'error-message' : undefined}
      />
      {error && (
        <div
          id="error-message"
          className="error-message"
          role="alert"
          aria-live="polite"
        >
          ⚠️ {error}
        </div>
      )}
    </div>
  )
}

export const customInputWithError = define(CustomInputWithError, 'CustomInputWithError')
  .props({
    value: string.valued.uncontrolledValue(''),
    placeholder: string.default('Enter text...'),
    onChange: event,
  })
  .build()
```

:::warning

Important. Each component with data is wrapped in an ErrorWrapper, so you need the ErrorWrapper for your form not to show an error,
otherwise there will be a double error.

:::

#### Live Example

```jsx live
function App() {
  const CustomInputWithError = ({
                                  value,
                                  placeholder,
                                  onChange
                                }) => {
    const error = useErrorMessage()

    const handleChange = useCallback(e => {
      onChange?.(e.target.value)
    }, [onChange])

    return (
      <div className="custom-input-container" style={{display: 'flex', flexDirection: 'column'}}>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={error ? 'error' : ''}
          aria-invalid={!!error}
          aria-describedby={error ? 'error-message' : undefined}
        />
        {error && (
          <div
            id="error-message"
            className="error-message"
            role="alert"
            aria-live="polite"
          >
            ⚠️ {error}
          </div>
        )}
      </div>
    )
  }

  const customInputWithError = define(CustomInputWithError, 'CustomInputWithError')
    .props({
      value: string.valued.uncontrolledValue(''),
      placeholder: string.default('Enter text...'),
      onChange: event,
    })
    .build()
  
  const CustomErrorWrapper = ({error, children, className}) => {
    return (
      <div className={className} style={{display: 'flex', flexDirection: 'column'}}>
        {children}
      </div>
    )
  }

  const customErrorWrapper = define(CustomErrorWrapper, 'CustomErrorWrapper')
    .componentRole('error-message')
    .build()

  const view = muiView
  view.define(customErrorWrapper.model)
  view.define(customInputWithError.model)

  const formJson = {
    "errorType": "CustomErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "input",
          "type": "CustomInputWithError",
          "props": {
            "placeholder": {
              "value": "Enter a minimum of 10 characters"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "min",
                "args": {
                  "limit": 10
                }
              }
            ]
          }
        },
        {
          "key": "validateButton",
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

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### Key Features of useErrorMessage

1. **Automatic Error Retrieval**: The hook automatically retrieves the current validation error for the component, if any.
2. **Reactive Updates**: The error value updates reactively when validation state changes.

### Comparison with useAriaErrorMessage

While `useErrorMessage` returns only the error message string, you can also use the `useAriaErrorMessage` hook to get proper ARIA attributes
for accessibility. The two hooks can be used together:

```tsx
const error = useErrorMessage()
const ariaAttributes = useAriaErrorMessage()

// Use both:
// - error for the message text
// - ariaAttributes for accessibility attributes
```

### When to Use useErrorMessage vs Error Wrappers

| Approach                 | Best For                                               | Example Use Case                                  |
|--------------------------|--------------------------------------------------------|---------------------------------------------------|
| `useErrorMessage`        | Custom components that handle their own error display  | Custom form fields with integrated error messages |
| Error Wrapper Components | Reusable error display across multiple component types | Consistent error styling for all form fields      |

### Accessibility Considerations

When using `useErrorMessage` inside your custom components, remember to:

1. Set `aria-invalid={!!error}` on the input element when there's an error
2. Use `aria-describedby` to associate the error message with the input
3. Include `role="alert"` and `aria-live="polite"` on the error message element
4. Ensure error messages are properly announced by screen readers

### Integration with Existing Components

The `useErrorMessage` hook works seamlessly with FormEngine's validation system. When validation fails for your component, the hook will
automatically return the corresponding error message. When validation passes or no validation rules are defined, it returns `undefined`.

## Integrating Error Components with Your View

Once you've created your error component, you need to integrate it with your view configuration. There are several ways to do this:

### Method 1: Add to Existing View

```typescript
import {view as baseView} from './baseView'
import {customErrorWrapper} from './components/custom-error-wrapper'

// Add error component to view
export const viewWithErrors = baseView
viewWithErrors.define(customErrorWrapper.model)
```

### Method 2: Create New View with Error Component

```typescript
import {createView, View} from '@react-form-builder/core'
import {customErrorWrapper} from './components/custom-error-wrapper'
// Import other components...

// Create new view
export const customView = createView([
  customErrorWrapper.model,
  // Add other components...
  // otherComponent1.model
  // otherComponent2.model
])
```

### Method 3: Configure as Default Error Wrapper

You can also configure your error component as the default error wrapper for the entire form:

```tsx
import {createView, FormViewer} from '@react-form-builder/core'
import {CustomErrorWrapper} from './CustomErrorWrapper'

const view = createView([
  // Add components...
  // component1.model
  // component2.model
])

const MyForm = () => {
  return (
    <FormViewer
      view={view}
      errorWrapper={CustomErrorWrapper} // Set as default error wrapper
      // ... other props
    />
  )
}
```

## Best Practices

### 1. Always Include Accessibility Features

Use [useAriaErrorMessage](/api-reference/@react-form-builder/core/functions/useAriaErrorMessage) hook to get proper ARIA attributes:

```typescript
const ariaAttributes = useAriaErrorMessage()
// Use: id={ariaAttributes['aria-errormessage']}
```

### 2. Handle Empty Error State Gracefully

Always check if `error` prop exists before rendering error message:

```tsx
{
  error && <div className="error-message">{error}</div>
}
```

### 3. Support Custom Styling

Include `className` prop and pass it to your wrapper element:

```tsx
const MyErrorWrapper = ({error, children, className}: ErrorWrapperProps) => {
  return (
    <div className={`my-error-wrapper ${className || ''}`}>
      {children}
      {/* ... */}
    </div>
  )
}
```

### 4. Use useErrorMessage for Integrated Error Display

If you need to display validation error messages directly inside your custom component (rather than using an external error wrapper), use
the `useErrorMessage` hook. This hook returns the validation error message for the current component if validation has failed, allowing you
to integrate error display directly into your component's layout.

```tsx
const CustomField = () => {
  const error = useErrorMessage() // Returns error message if validation failed

  return (
    <div>
      <input className={error ? 'error' : ''}/>
      {error && <div className="error-message">{error}</div>}
    </div>
  )
}
```

**Key benefits:**

- Direct integration of error messages within component layout
- Full control over error display styling and positioning
- Works seamlessly with FormEngine's validation system

## Common Issues and Solutions

### Error Component Not Showing

**Problem:** Error messages don't appear when validation fails.

**Solutions:**

- Verify `.componentRole('error-message')` is set
- Check that error component is added to the view
- Ensure `errorType` is specified in form JSON or `errorWrapper` prop is set

### Incorrect Error Placement

**Problem:** Error message appears in wrong location relative to field.

**Solutions:**

- Ensure your component properly wraps `children` prop
- Check CSS styles for positioning
- Verify the component structure matches your UI library's expectations

### Accessibility Issues

**Problem:** Screen readers don't announce errors.

**Solutions:**

- Use `useAriaErrorMessage()` hook
- Include `role="alert"` or `aria-live` attributes
- Ensure error messages have proper `id` attributes

## Summary

Custom error components in FormEngine Core provide powerful, flexible ways to display validation errors that match your application's design
system. By following the patterns outlined in this guide, you can:

1. Create accessible, styled error components for any UI library
2. Integrate error components seamlessly with FormEngine's validation system
3. Provide consistent, user-friendly error displays across all forms

Remember the key requirements:

- Extend or implement `ErrorWrapperProps` interface
- Use `.componentRole('error-message')` to register as an error component
- Include proper accessibility attributes
- Add the component to your view configuration

With custom error components, you can transform validation errors from simple text messages into rich, contextual feedback that enhances
user experience and improves form completion rates.

## Next Steps

- Explore [FormEngine Core Validation API](/formengine-core/validation) for built-in validation features
- Learn about [custom tooltip components](/formengine-core/custom-components/custom-tooltip-component) for additional user guidance
