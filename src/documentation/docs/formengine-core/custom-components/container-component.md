---
sidebar_position: 30
title: Container Components
description: Container components are special components in FormEngine Core that can hold and render child components. Unlike regular components that primarily display their own content, container components
---

# Container Components

Container components are special components in FormEngine Core that can hold and render child components. Unlike regular components that
primarily display their own content, container components provide layout and structure by nesting other components inside them.

## What Are Container Components?

Container components are React components that:

- ✅ Can contain child components
- ✅ Provide layout structure
- ✅ Support flexible styling
- ✅ Manage nested component relationships
- ❌ Typically don't have interactive form data (but can have other props)

**Common Use Cases:**

- Layout wrappers (Grid, Flex containers)
- Cards with dynamic content
- Tabs and accordions
- Modal dialogs
- Form sections and groups
- Custom layout structures

## Basic Container Component Structure

Every container component follows this pattern:

```tsx {18,20}
import {define} from '@react-form-builder/core'
import type {ReactNode} from 'react'

interface MyContainerProps {
  children?: ReactNode
  // Additional props can be added here
}

const MyContainer = ({children}: MyContainerProps) => {
  return (
    <div className="my-container">
      {children}
    </div>
  )
}

export const myContainer = define(MyContainer, 'MyContainer')
  .kind('container')  // This marks it as a container
  .build()
```

The key differences from regular components:

1. Use `.kind('container')` to mark it as a container
2. Accept `children` prop in the React component

## Defining Container Kind

The `.kind('container')` method is essential for container components:

```tsx
export const myContainer = define(MyContainer, 'MyContainer')
  .kind('container')           // Mark as container component
  .build()
```

**Available Component Kinds:**

- `'container'` - Can contain child components
- `'component'` - Regular component (default)

## The Children Property

Container components use the `node` annotation for the children property:

```tsx
import {define, node, string} from '@react-form-builder/core'

const CardContainer = ({title, children}: any) => (
  <div className="card">
    {title && <h3>{title}</h3>}
    <div className="card-content">
      {children}
    </div>
  </div>
)

export const cardContainer = define(CardContainer, 'CardContainer')
  .kind('container')
  .props({
    title: string.default(''),    // Regular property
    children: node                // Container property for child components
  })
  .build()
```

## Rendering Differences

The key difference between container components and regular components lies in how FormEngine Core wraps them during rendering.

### How FormEngine Core Renders Components

FormEngine Core uses a rendering pipeline that adds functionality through wrapper components. Here's what happens internally:

**For regular components (kind: 'component'):**

```tsx
return <Tooltip>
  <Wrapper className={wrapperClassName} {...containerStyle}>
    <Erroneous>{component}</Erroneous>
  </Wrapper>
</Tooltip>
```

**For container components (kind: 'container'):**

```tsx
if (kind === 'container') {
  return <ContainerComponent key={key} {...otherProps} className={className} {...containerStyle}/>
}
```

### Regular Component Wrappers

When a regular component renders, it receives three wrapper layers:

1. **Tooltip Wrapper** - Adds tooltip functionality if the component has `tooltipProps` configured
2. **Default Wrapper** - Provides consistent styling, layout, and component isolation
3. **Error Wrapper** - Handles validation errors, displays error messages, and manages error states

These wrappers enable essential form functionality but add additional DOM elements to the output.

### Container Component Rendering

Container components render **directly without any wrappers**:

```tsx {12}
import {define, node, string} from '@react-form-builder/core'

// Container component definition
const Section = ({title, children}) => (
  <section>
    {title && <h2>{title}</h2>}
    <div>{children}</div>
  </section>
)

export const section = define(Section, 'Section')
  .kind('container')  // This tells FormEngine Core to skip wrappers
  .props({
    title: string.default(''),
    children: node
  })
  .build()
```

### Why This Design Makes Sense

**Containers are structural elements:**

- They organize layout and group other components
- They don't typically hold form data that needs validation
- They don't need tooltips (users don't hover over layout sections)
- They benefit from cleaner DOM output for CSS styling

**Regular components are interactive form controls:**

- They need validation error display
- They benefit from tooltips for user guidance
- They require consistent styling through wrappers
- They often have form data that needs error handling

### When to Choose Container vs Regular Components

**Use kind: 'container' when:**

- Creating layout structures (grids, flex containers, cards)
- Grouping related form fields visually
- Building complex nested component hierarchies
- You don't need validation or tooltips for the container itself

**Use kind: 'component' (default) when:**

- Creating form fields (inputs, selects, checkboxes)
- Building interactive controls that need validation
- Components should display tooltips for user guidance
- You need consistent styling through the wrapper system

### Performance Considerations

Container components render faster because:

- Fewer React components in the tree
- Less wrapper prop passing and context consumption
- Cleaner DOM output for browser rendering
- No unnecessary error or tooltip logic execution

This design allows FormEngine Core to optimize rendering performance while maintaining full functionality for form controls.

## Real-World Examples

### Example 1: Flex Layout Container

```tsx
import styled from '@emotion/styled'
import {color, define, node, oneOf, size} from '@react-form-builder/core'

const FlexContainer = styled.div`
  display: flex;
`

const FlexContainerComponent = ({children, className, style}: any) => (
  <FlexContainer className={className} style={style}>
    {children}
  </FlexContainer>
)

export const flexContainer = define(FlexContainerComponent, 'FlexContainer')
  .kind('container')
  .props({
    children: node
  })
  .css({
    flexDirection: oneOf('row', 'column', 'row-reverse', 'column-reverse').default('row'),
    justifyContent: oneOf(
      'flex-start', 'flex-end', 'center', 'space-between',
      'space-around', 'space-evenly'
    ).default('flex-start'),
    alignItems: oneOf('stretch', 'flex-start', 'flex-end', 'center', 'baseline').default('stretch'),
    flexWrap: oneOf('nowrap', 'wrap', 'wrap-reverse').default('nowrap'),
    gap: size.default('8px'),
    padding: size.default('0px'),
    backgroundColor: color.default('transparent')
  })
 .build()
```

**Usage in JSON:**

```json
{
  "key": "buttonGroup",
  "type": "FlexContainer",
  "css": {
    "any": {
      "object": {
        "gap": 10,
        "backgroundColor": "cornsilk"
      }
    }
  },
  "children": [
    {
      "key": "cancelBtn",
      "type": "MuiButton",
      "props": {
        "children": {
          "value": "Cancel"
        }
      }
    },
    {
      "key": "submitBtn",
      "type": "MuiButton",
      "props": {
        "children": {
          "value": "Submit"
        }
      }
    }
  ]
}
```

#### Live Example

```jsx live
function App() {
  const FlexContainerComponent = ({children, className, style}) => (
    <div className={className} style={style}>
      {children}
    </div>
  )

  const flexContainer = define(FlexContainerComponent, 'FlexContainer')
    .kind('container')
    .props({
      children: node
    })
    .css({
      display: string.default('flex'),
      flexDirection: oneOf('row', 'column', 'row-reverse', 'column-reverse').default('row'),
      justifyContent: oneOf(
        'flex-start', 'flex-end', 'center', 'space-between',
        'space-around', 'space-evenly'
      ).default('flex-start'),
      alignItems: oneOf('stretch', 'flex-start', 'flex-end', 'center', 'baseline').default('stretch'),
      flexWrap: oneOf('nowrap', 'wrap', 'wrap-reverse').default('nowrap'),
      gap: size.default('8px'),
      padding: size.default('0px'),
      backgroundColor: color.default('transparent')
    })
    .build()

  const view = muiView
  view.define(flexContainer.model)

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "buttonGroup",
          "type": "FlexContainer",
          "css": {
            "any": {
              "object": {
                "gap": 10,
                "backgroundColor": "cornsilk"
              }
            }
          },
          "children": [
            {
              "key": "cancelBtn",
              "type": "MuiButton",
              "props": {
                "children": {
                  "value": "Cancel"
                }
              }
            },
            {
              "key": "submitBtn",
              "type": "MuiButton",
              "props": {
                "children": {
                  "value": "Submit"
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

### Example 2: Card Container with Header

```tsx
import {color, define, node, oneOf, size, string} from '@react-form-builder/core'
import type {CSSProperties, ReactNode} from 'react'

interface CardProps {
  title: string
  subtitle?: string
  children?: ReactNode
  className?: string
  style?: CSSProperties
}

const Card = ({title, subtitle, children, className, style}: CardProps) => (
  <div className={className} style={style}>
    <div className="card-header">
      <h3 className="card-title">{title}</h3>
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
    </div>
    <div className="card-body">
      {children}
    </div>
  </div>
)

export const card = define(Card, 'Card')
  .kind('container')
  .props({
    title: string.default('Card Title'),
    subtitle: string.default(''),
    children: node
  })
  .css({
    backgroundColor: color.default('#ffffff'),
    padding: size.default('24px'),
    borderRadius: size.default('8px'),
    borderWidth: size.default('1px'),
    borderStyle: oneOf('solid', 'none').default('solid'),
    borderColor: color.default('#e0e0e0'),
    boxShadow: string.default('0 2px 4px rgba(0,0,0,0.1)'),
    gap: size.default('16px')
  })
  .build()
```

**Usage in JSON:**

```json
{
  "key": "userProfileCard",
  "type": "Card",
  "props": {
    "title": {
      "value": "User Profile"
    },
    "subtitle": {
      "value": "Complete your profile information"
    }
  },
  "css": {
    "any": {
      "object": {
        "backgroundColor": "#f8f9fa",
        "borderRadius": 12,
        "boxShadow": "0 4px 6px rgba(0,0,0,0.05)"
      }
    }
  },
  "children": [
    {
      "key": "nameField",
      "type": "MuiTextField",
      "props": {
        "label": {
          "value": "Full Name"
        },
        "helperText": {
          "value": "Enter your name"
        }
      }
    },
    {
      "key": "emailField",
      "type": "MuiTextField",
      "props": {
        "label": {
          "value": "Email Address"
        },
        "helperText": {
          "value": "Enter your email"
        }
      }
    }
  ]
}
```

#### Live Example

```jsx live
function App() {
  const Card = ({title, subtitle, children, className, style}) => (
    <div className={className} style={style}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  )

  const card = define(Card, 'Card')
    .kind('container')
    .props({
      title: string.default('Card Title'),
      subtitle: string.default(''),
      children: node
    })
    .css({
      backgroundColor: color.default('#ffffff'),
      padding: size.default('24px'),
      borderRadius: size.default('8px'),
      borderWidth: size.default('1px'),
      borderStyle: oneOf('solid', 'none').default('solid'),
      borderColor: color.default('#e0e0e0'),
      boxShadow: string.default('0 2px 4px rgba(0,0,0,0.1)'),
      gap: size.default('16px')
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
          "key": "userProfileCard",
          "type": "Card",
          "props": {
            "title": {
              "value": "User Profile"
            },
            "subtitle": {
              "value": "Complete your profile information"
            }
          },
          "css": {
            "any": {
              "object": {
                "backgroundColor": "#f8f9fa",
                "borderRadius": 12,
                "boxShadow": "0 4px 6px rgba(0,0,0,0.05)"
              }
            }
          },
          "children": [
            {
              "key": "nameField",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Full Name"
                },
                "helperText": {
                  "value": "Enter your name"
                }
              }
            },
            {
              "key": "emailField",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Email Address"
                },
                "helperText": {
                  "value": "Enter your email"
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

## Best Practices

### 1. Always Accept className and style Props

```tsx
interface ContainerProps {
  children?: ReactNode
  className?: string
  style?: React.CSSProperties
}

const Container = ({children, className, style}: ContainerProps) => (
  <div className={className} style={style}>
    {children}
  </div>
)
```

### 2. Define Sensible Defaults for CSS Properties

```tsx
const myContainer = define(MyContainer, 'MyContainer')
  .css({
    padding: size.default('16px'),
    gap: size.default('8px'),
    backgroundColor: color.default('#ffffff')
  })
```

### 3. Use Appropriate Property Types

- Use `node` for children
- Use `size` for dimensions (padding, margin, etc.)
- Use `color` for color values
- Use `oneOf` for enumerated values (flexDirection, etc.)

### 4. Document Your Container's Purpose

```tsx
/**
 * A flexible grid container for arranging child components.
 * @param children child components to arrange in grid
 * @param columns number of columns in the grid
 * @param spacing spacing between grid items
 */
const GridContainer = ({children, columns, spacing}) => {
    // Implementation
  }
```

## Summary

Container components are powerful building blocks in FormEngine Core that enable complex layouts and nested component structures. Key
takeaways:

- Use `.kind('container')` to mark a component as a container
- Include a `children` property with the `node` annotation
- Design components to accept both `className` and `style` props
- Define CSS properties using the `.css()` method
- Configure styles through the `css` property in form JSON

By mastering container components, you can create flexible, reusable layout structures that can be configured entirely through JSON forms.

For more advanced patterns, see [Advanced Patterns](../custom-components/advanced-patterns) documentation.
