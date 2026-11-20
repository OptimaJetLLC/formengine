---
sidebar_position: 8
title: Styling Custom Components
description: Styling is a crucial aspect of creating visually appealing and consistent custom components in FormEngine Core
---

# Styling Custom Components

Styling is a crucial aspect of creating visually appealing and consistent custom components in FormEngine Core. This guide covers various
approaches to styling custom components using the FormEngine Core API.

## Overview

FormEngine Core provides multiple mechanisms for styling custom components:

1. **CSS Classes**: Styles are passed through the `className` prop
2. **Inline Styles**: Dynamic styles are passed through the `style` prop
3. **`css` annotation**: Structured CSS property definitions that FormEngine Core can apply to components
4. **Component Wrapping**: Understanding how FormEngine Core structures components for styling

## Basic Styling with CSS Classes

The fundamental approach to styling in FormEngine Core is accepting a `className` prop and passing it to the rendered element. FormEngine
Core automatically generates and passes CSS class names to your components.

```tsx
import {define, string} from '@react-form-builder/core'
import type {ReactNode} from 'react'

interface CardProps {
  title?: string
  children?: ReactNode
  className?: string  // FormEngine Core passes styles via this prop
}

const Card = ({title, children, className}: CardProps) => (
  <div className={className}>
    <div className="my-card">
      {title && <h3 className="card__title">{title}</h3>}
      <div className="card__content">{children}</div>
    </div>
  </div>
)

export const card = define(Card, 'Card')
  .props({
    title: string.default('')
  })
  .build()
```

### Live Example

```jsx live
function App() {
  const Card = ({title, children, className}) => (
    <div className={className}>
      <div className="my-card">
        {title && <h3 className="card__title">{title}</h3>}
        <div className="card__content">{children}</div>
      </div>
    </div>
  )

  const card = define(Card, 'Card')
    .props({
      title: string.default('')
    })
    .build()

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "card",
          "type": "Card",
          "props": {
            "title": {
              "value": "My card"
            }
          },
          "css": {
            "any": {
              "string": "font-size: 24px;\n  padding: 20px;\n  color: rgba(0, 2, 4, 0.596);\n  background: linear-gradient(0.29turn, #3f87a6, #ebf8e1, #f69d3c);"
            }
          }
        }
      ]
    }
  }
  
  const view = createView([card.model])

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

When FormEngine Core renders your component, it will pass generated CSS class names through the `className` prop. Your component should
merge these with its own base classes.

## Understanding Component Wrapping

FormEngine Core applies styles through a structured component hierarchy. Understanding this structure helps you design components that work
well with the styling system:

```tsx
// Standard component structure in FormEngine Core
<Wrapper className="wrapperCss">
  <Tooltip>
    <ErrorWrapper>
      <Component className="componentCss"/>
    </ErrorWrapper>
  </Tooltip>
</Wrapper>

// Container component structure (no wrapper)
<Container className="css">
  {children}
</Container>
```

This structure means:

- **Wrapper styles** affect positioning, sizing, padding, and layout
- **Component styles** affect the actual component's visual appearance
- **Container components** receive all styles directly through the `className` prop

Your custom components should be designed to work within this structure by properly accepting and applying the `className` prop.

## Using the css Annotation for Structured Styling

The [css](/api-reference/@react-form-builder/core/interfaces/Definer#css) method allows you to define structured CSS properties that
FormEngine Core can apply to your components. This creates a type-safe interface for styling configuration.

### Basic css Annotation Usage

```tsx
import {color, define, number, oneOf, size, string} from '@react-form-builder/core'

const StyledBox = ({children, className}: any) => (
  <div className={className}>{children}</div>
)

export const styledBox = define(StyledBox, 'StyledBox')
  .name('Styled Box')
  .props({
    content: string.default('Styled content')
  })
  .css({
    // Define CSS properties with type safety
    backgroundColor: color.default('#ffffff'),
    textAlign: oneOf('left', 'center', 'right', 'justify').default('left'),
    fontSize: number.default(16),
    padding: size.default('10px'),
    borderWidth: size.default('1px'),
    borderStyle: oneOf('solid', 'dashed', 'dotted', 'none').default('solid'),
    borderColor: color.default('#cccccc'),
    borderRadius: size.default('4px')
  })
  .build()
```

The properties defined in `css` become part of the component's type definition, allowing FormEngine Core to apply these styles
appropriately.

#### Live Example

```jsx live
function App() {
  const StyledBox = ({children, className}) => (
    <div className={className}>{children}</div>
  )

  const styledBox = define(StyledBox, 'StyledBox')
    .name('Styled Box')
    .props({
      content: string.default('Styled content')
    })
    .css({
      // Define CSS properties with type safety
      backgroundColor: color.default('#ffffff'),
      textAlign: oneOf('left', 'center', 'right', 'justify').default('left'),
      fontSize: number.default(16),
      padding: size.default('10px'),
      borderWidth: size.default('1px'),
      borderStyle: oneOf('solid', 'dashed', 'dotted', 'none').default('solid'),
      borderColor: color.default('#cccccc'),
      borderRadius: size.default('4px')
    })
    .build()

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "styledBox",
          "type": "StyledBox"
        }
      ]
    }
  }
  
  const view = createView([styledBox.model])

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### Available CSS Property Types

FormEngine Core provides several type helpers for defining CSS properties:

| Type                                                                 | Description                                    | Example                                     |
| -------------------------------------------------------------------- | ---------------------------------------------- | ------------------------------------------- |
| [color](/api-reference/@react-form-builder/core/variables/color)     | Color values (hex, rgb, rgba, hsl, hsla)       | `color.default('#ff0000')`                  |
| [size](/api-reference/@react-form-builder/core/variables/size)       | CSS size values (px, em, rem, %, vw, vh, etc.) | `size.default('16px')`                      |
| [number](/api-reference/@react-form-builder/core/variables/number)   | Numeric values                                 | `number.default(1)`                         |
| [oneOf](/api-reference/@react-form-builder/core/variables/oneOf)     | Enumerated values                              | `oneOf('solid', 'dashed').default('solid')` |
| [cssSize](/api-reference/@react-form-builder/core/variables/cssSize) | Special size type with validation              | `cssSize.setup({default: '100%'})`          |

### Complete Example: Styled Button Component

```tsx
import {boolean, color, define, event, number, oneOf, size, string} from '@react-form-builder/core'

interface StyledButtonProps {
  label: string
  variant?: string
  disabled?: boolean
  onClick?: () => void
  className?: string
}

const StyledButton = ({label, variant, disabled, onClick, className}: StyledButtonProps) => {
  const baseClasses = `btn ${variant || 'primary'} ${disabled ? 'disabled' : ''}`

  return (
    <button
      className={`${baseClasses} ${className || ''}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export const styledButton = define(StyledButton, 'StyledButton')
  .props({
    label: string.default('Click me'),
    variant: oneOf('primary', 'secondary', 'outline', 'ghost').default('primary'),
    disabled: boolean.default(false),
    onClick: event
  })
  .css({
    // Background and border
    backgroundColor: color.default('#007bff'),
    borderColor: color.default('#0056b3'),
    borderWidth: size.default('1px'),
    borderStyle: oneOf('solid', 'none', 'dashed').default('solid'),
    borderRadius: size.default('4px'),

    // Text
    color: color.default('#ffffff'),
    fontSize: number.default(14),
    fontWeight: oneOf('normal', 'bold', 'lighter').default('normal'),
    textAlign: oneOf('left', 'center', 'right').default('center'),

    // Sizing
    padding: size.default('8px 16px'),
    width: size.default('auto'),
    height: size.default('auto'),

    // Effects
    boxShadow: oneOf('none', 'small', 'medium', 'large').default('none'),
    opacity: number.default(1)
  })
  .build()
```

#### Live Example

```jsx live
function App() {
  const StyledButton = ({label, variant, disabled, onClick, className}) => {
    const baseClasses = `btn ${variant || 'primary'} ${disabled ? 'disabled' : ''}`

    return (
      <button
        className={`${baseClasses} ${className || ''}`}
        disabled={disabled}
        onClick={onClick}
      >
        {label}
      </button>
    )
  }

  const styledButton = define(StyledButton, 'StyledButton')
    .props({
      label: string.default('Click me'),
      variant: oneOf('primary', 'secondary', 'outline', 'ghost').default('primary'),
      disabled: boolean.default(false),
      onClick: event
    })
    .css({
      // Background and border
      backgroundColor: color.default('#007bff'),
      borderColor: color.default('#0056b3'),
      borderWidth: size.default('1px'),
      borderStyle: oneOf('solid', 'none', 'dashed').default('solid'),
      borderRadius: size.default('4px'),

      // Text
      color: color.default('#ffffff'),
      fontSize: number.default(14),
      fontWeight: oneOf('normal', 'bold', 'lighter').default('normal'),
      textAlign: oneOf('left', 'center', 'right').default('center'),

      // Sizing
      padding: size.default('8px 16px'),
      width: size.default('auto'),
      height: size.default('auto'),

      // Effects
      boxShadow: oneOf('none', 'small', 'medium', 'large').default('none'),
      opacity: number.default(1)
    })
    .build()

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "styledButton",
          "type": "StyledButton",
          "props": {
            "label": {
              "value": "Button"
            }
          }
        }
      ]
    }
  }
  
  const view = createView([styledButton.model])

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Advanced Styling Patterns

### Reusable Style Objects

Create reusable style objects for consistency across your component library:

```typescript title='commonStyles.ts'
import {color, number, oneOf, size} from '@react-form-builder/core'

export const textStyles = {
  fontSize: number.default(16),
  fontWeight: oneOf('normal', 'bold', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900').default('normal'),
  color: color.default('#333333'),
  textAlign: oneOf('left', 'center', 'right', 'justify').default('left'),
  lineHeight: number.default(1.5)
}

export const containerStyles = {
  padding: size.default('16px'),
  margin: size.default('0'),
  backgroundColor: color.default('#ffffff'),
  borderWidth: size.default('1px'),
  borderStyle: oneOf('solid', 'dashed', 'dotted', 'none').default('solid'),
  borderColor: color.default('#e0e0e0'),
  borderRadius: size.default('8px')
}
```

```tsx title='InfoCard.tsx'
import {define, string} from '@react-form-builder/core'
import {containerStyles, textStyles} from './commonStyles'

const InfoCard = ({title, content, className}: any) => (
  <div className={className}>
    <h3>{title}</h3>
    <p>{content}</p>
  </div>
)

export const infoCard = define(InfoCard, 'InfoCard')
  .props({
    title: string.default('Card Title'),
    content: string.default('Card content goes here...')
  })
  .css({
    ...containerStyles,
    ...textStyles
  })
  .build()
```

### Conditional Styling Based on Props

Combine component props with CSS properties for dynamic styling behavior:

```tsx
import {boolean, color, define, number, oneOf, size, string} from '@react-form-builder/core'

interface AlertProps {
  message: string
  type?: 'success' | 'warning' | 'error' | 'info'
  dismissible?: boolean
  className?: string
}

const Alert = ({message, type, dismissible, className}: AlertProps) => {
  const typeClass = `alert-${type || 'info'}`
  const dismissibleClass = dismissible ? 'alert-dismissible' : ''

  return (
    <div className={`alert ${typeClass} ${dismissibleClass} ${className || ''}`}>
      {message}
      {dismissible && <button className="alert-close">&times;</button>}
    </div>
  )
}

export const alert = define(Alert, 'Alert')
  .props({
    message: string.default('Alert message'),
    type: oneOf('success', 'warning', 'error', 'info').default('info'),
    dismissible: boolean.default(false)
  })
  .css({
    // Style properties that FormEngine Core can apply
    backgroundColor: color.default('#d1ecf1'),
    borderColor: color.default('#bee5eb'),
    color: color.default('#0c5460'),
    padding: size.default('12px'),
    borderRadius: size.default('4px'),
    fontSize: number.default(14),
    fontWeight: oneOf('normal', 'bold').default('normal')
  })
  .build()
```

## Inline Styles

In addition to CSS classes, FormEngine Core can also pass styles through the `style` prop. This is useful for:

- Components that don't support `className` prop
- Dynamic styling that needs runtime calculation
- Situations where both `className` and `style` props are needed

### Using Inline Styles

FormEngine Core can pass styles through the `style` prop when configured appropriately. Your component should accept both `className` and `style` props:

```tsx
import {color, define, number, size, string} from '@react-form-builder/core'
import type {CSSProperties} from 'react'

interface InlineStyledComponentProps {
  content: string
  className?: string
  style?: CSSProperties
}

const InlineStyledComponent = ({content, className, style}: InlineStyledComponentProps) => (
  <div className={className} style={style}>
    {content}
  </div>
)

export const inlineStyledComponent = define(InlineStyledComponent, 'InlineStyledComponent')
  .props({
    content: string.default('Content')
  })
  .css({
    backgroundColor: color.default('#f8f9fa'),
    padding: size.default('16px'),
    fontSize: number.default(14)
  })
  .build()
```

#### Live Example

```jsx live
function App() {
  const InlineStyledComponent = ({content, className, style}) => (
    <div className={className} style={style}>
      {content}
    </div>
  )

  const inlineStyledComponent = define(InlineStyledComponent, 'InlineStyledComponent')
    .props({
      content: string.default('Content')
    })
    .css({
      backgroundColor: color.default('#f8f9fa'),
      padding: size.default('16px'),
      fontSize: number.default(14)
    })
    .build()

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "inlineStyledComponent",
          "type": "InlineStyledComponent",
          "style": {
            "any": {
              "string": "font-weight: bold; font-family: monospace; color: #feb751"
            }
          }
        }
      ]
    }
  }
  
  const view = createView([inlineStyledComponent.model])

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### Combining ClassName and Inline Styles

For maximum flexibility, design your components to handle both styling approaches:

```tsx
import {color, define, node, oneOf, size} from '@react-form-builder/core'
import type {CSSProperties, ReactNode} from 'react'

interface FlexibleComponentProps {
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

const FlexibleComponent = ({children, className, style}: FlexibleComponentProps) => {
  return (
    <div
      className={`base-component ${className || ''}`}
      style={style}
    >
      {children}
    </div>
  )
}

export const flexibleComponent = define(FlexibleComponent, 'FlexibleComponent')
  .props({
    children: node
  })
  .css({
    backgroundColor: color.default('#ffffff'),
    padding: size.default('16px'),
    borderWidth: size.default('1px'),
    borderStyle: oneOf('solid', 'dashed', 'none').default('solid'),
    borderColor: color.default('#e0e0e0')
  })
  .build()
```

#### Live Example

```jsx live
function App() {
  const FlexibleComponent = ({children, className, style}) => {
    return (
      <div
        className={`base-component ${className || ''}`}
        style={style}
      >
        {children}
      </div>
    )
  }

  const flexibleComponent = define(FlexibleComponent, 'FlexibleComponent')
    .props({
      children: node
    })
    .css({
      backgroundColor: color.default('#ffffff'),
      padding: size.default('16px'),
      borderWidth: size.default('1px'),
      borderStyle: oneOf('solid', 'dashed', 'none').default('solid'),
      borderColor: color.default('#e0e0e0')
    })
    .build()

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "flexibleComponent",
          "type": "FlexibleComponent",
          "css": {
            "any": {
              "string": "background: #e071c7"
            }
          },
          "style": {
            "any": {
              "string": "margin: 20px"
            }
          },
          "children": [
            {
              "key": "flexibleChild",
              "type": "FlexibleComponent",
              "css": {
                "any": {
                  "string": "background: #a716b9"
                }
              },
              "style": {
                "any": {
                  "string": "margin: 40px"
                }
              }
            }
          ]
        }
      ]
    }
  }


  const view = createView([flexibleComponent.model])

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Best Practices

### 1. Always Accept className and style Props

Design your components to accept both styling mechanisms:

```tsx
interface ComponentProps {
  className?: string
  style?: React.CSSProperties
  // ... other props
}

const Component = ({className, style, ...props}: ComponentProps) => (
  <div className={className} style={style} {...props} />
)
```

### 2. Use Structured CSS Properties

Prefer [css](/api-reference/@react-form-builder/core/interfaces/Definer#css) for type-safe styling definitions:

```tsx
// ✅ Good - structured properties
const myComponent = define(MyComponent, 'MyComponent')
  .css({
    backgroundColor: color.default('#ffffff'),
    fontSize: number.default(16),
    padding: size.default('16px')
  })
```

### 3. Group Related Styles

Organize CSS properties logically for better maintainability:

```tsx
const myComponent = define(MyComponent, 'MyComponent')
  .css({
    // Layout
    display: oneOf('block', 'flex', 'grid', 'inline-block').default('block'),
    width: size.default('100%'),
    height: size.default('auto'),

    // Spacing
    margin: size.default('0'),
    padding: size.default('16px'),

    // Appearance
    backgroundColor: color.default('#ffffff'),
    borderWidth: size.default('1px'),
    borderStyle: oneOf('solid', 'none').default('solid'),
    borderColor: color.default('#e0e0e0'),
    borderRadius: size.default('8px'),

    // Text
    fontSize: number.default(16),
    fontWeight: oneOf('normal', 'bold').default('normal'),
    color: color.default('#333333'),
    textAlign: oneOf('left', 'center', 'right').default('left')
  })
```

### 4. Set Sensible Defaults

Provide appropriate default values for CSS properties:

```tsx
// ✅ Good
const myComponent = define(MyComponent, 'MyComponent')
  .css({
    fontSize: number.default(16),
    color: color.default('#333333'),
    padding: size.default('8px')
  })
```

### 5. Use Type-Safe Enums

Use `oneOf` for properties with limited valid values:

```tsx
// ✅ Good
const myComponent = define(MyComponent, 'MyComponent')
  .css({
    textAlign: oneOf('left', 'center', 'right', 'justify').default('left'),
    borderStyle: oneOf('solid', 'dashed', 'dotted', 'none').default('solid'),
  })
```

### 6. Test with Different Styling Approaches

Test your components with various styling configurations to ensure robustness.

## Real-World Example: Complete Styled Card Component

```tsx
import {define, string, node, color, size, number, oneOf} from '@react-form-builder/core'

interface CardProps {
  title?: string
  children?: React.ReactNode
  variant?: 'default' | 'elevated' | 'outlined'
  className?: string
  style?: React.CSSProperties
}

const Card = ({title, children, variant, className, style}: CardProps) => {
  const variantClass = `card--${variant || 'default'}`
  
  return (
    <div className={`card ${variantClass} ${className || ''}`} style={style}>
      {title && <h3 className="card__title">{title}</h3>}
      <div className="card__content">{children}</div>
    </div>
  )
}

export const card = define(Card, 'Card')
  .name('Card')
  .category('Layout')
  .props({
    title: string.default(''),
    children: node,
    variant: oneOf('default', 'elevated', 'outlined').default('default')
  })
  .css({
    // Layout
    display: oneOf('block', 'inline-block').default('block'),
    width: size.default('100%'),
    
    // Spacing
    margin: size.default('0'),
    padding: size.default('24px'),
    
    // Background and border
    backgroundColor: color.default('#ffffff'),
    borderWidth: size.default('1px'),
    borderStyle: oneOf('solid', 'none').default('solid'),
    borderColor: color.default('#e0e0e0'),
    borderRadius: size.default('12px'),
    
    // Shadow
    boxShadow: oneOf('none', 'small', 'medium', 'large').default('none'),
    
    // Text
    fontSize: number.default(14),
    lineHeight: number.default(1.6),
    color: color.default('#333333')
  })
  .build()
```

## Summary

Styling custom components in FormEngine Core involves several key concepts:

- **CSS Classes**: The primary mechanism for styling, passed via the `className` prop
- **Inline Styles**: Additional styling through the `style` prop for dynamic or component-specific needs
- **The `css` annotation**: Structured, type-safe CSS property definitions that integrate with FormEngine Core
- **Component Structure**: Understanding wrapper vs. component styling for proper implementation

Key takeaways:

1. Always design components to accept `className` and optionally `style` props
2. The `css` annotation for structured, maintainable styling definitions
3. Provide sensible defaults for CSS properties
4. Use type-safe enums (`oneOf`) for properties with limited valid values
5. Test components with various styling approaches

By following these guidelines, you can create custom components that work seamlessly with FormEngine Core's styling system while providing
flexibility and type safety.
