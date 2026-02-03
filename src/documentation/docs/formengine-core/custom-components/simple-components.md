---
sidebar_position: 2
---

# Simple Components

Simple components are display-only components that don't interact with form data. They're perfect for presenting information, creating
layout structures, or providing static UI elements. This guide covers creating simple components with various property types and
configurations.

## What Are Simple Components?

Simple components are React components that:

- ✅ Display information
- ✅ Accept configuration via props
- ✅ Can have visual styles
- ❌ Don't read or write form data
- ❌ Don't trigger validation
- ❌ Don't require data binding

**Use Cases:**

- Headers and text blocks
- Images and icons
- Layout containers
- Static buttons (for navigation)
- Informational panels
- Divider lines

## Basic Structure

Every simple component follows this pattern:

```tsx
import {boolean, define, string} from '@react-form-builder/core'

// 1. Create React component
const MyComponent = (props: any) => {
  return <div {...props}></div>
}

// 2. Define it for FormEngine
export const myComponent = define(MyComponent, 'MyComponent')
  .props({
    prop1: string,
    prop2: boolean
  })
  .build()
```

## Property Types

FormEngine provides several property type builders for different use cases.

### String Properties

For text values:

```tsx
import {define, string} from '@react-form-builder/core'

const Header = ({title, subtitle}: any) => (
  <div className="header">
    <h1>{title}</h1>
    {subtitle && <p>{subtitle}</p>}
  </div>
)

export const header = define(Header, 'Header')
  .props({
    title: string.default('Page Title'),
    subtitle: string.default('')
  })
  .build()
```

Usage in JSON:

```json
{
  "key": "pageHeader",
  "type": "Header",
  "props": {
    "title": {
      "value": "User Registration"
    },
    "subtitle": {
      "value": "Please fill in your details"
    }
  }
}
```

### Boolean Properties

For true/false flags:

```tsx
import {boolean, define, string} from '@react-form-builder/core'

const Card = ({title, children, bordered, shadow}: any) => (
  <div className={`card ${bordered ? 'card--bordered' : ''} ${shadow ? 'card--shadow' : ''}`}>
    {title && <h3 className="card__title">{title}</h3>}
    <div className="card__content">{children}</div>
  </div>
)

export const card = define(Card, 'Card')
  .props({
    title: string.default(''),
    bordered: boolean.default(true),
    shadow: boolean.default(false)
  })
  .build()
```

Usage in JSON:

```json
{
  "key": "infoCard",
  "type": "Card",
  "props": {
    "title": {
      "value": "Important Information"
    },
    "bordered": {
      "value": true
    },
    "shadow": {
      "value": true
    }
  }
}
```

### Number Properties

For numeric values:

```tsx
import {define, number} from '@react-form-builder/core'

const Spacer = ({height, width}: any) => (
  <div
    style={{
      height: `${height}px`,
      width: width ? `${width}px` : '100%'
    }}
  />
)

export const spacer = define(Spacer, 'Spacer')
  .props({
    height: number.default(16),
    width: number
  })
  .build()
```

Usage in JSON:

```json
{
  "key": "sectionSpacer",
  "type": "Spacer",
  "props": {
    "height": {
      "value": 32
    },
    "width": {
      "value": 200
    }
  }
}
```

### OneOf (Enum) Properties

For selecting from predefined options:

```tsx
import {define, oneOf, string} from '@react-form-builder/core'

const Badge = ({text, color, size}: any) => {
  const className = `badge badge--${color} badge--${size}`
  return <span className={className}>{text}</span>
}

export const badge = define(Badge, 'Badge')
  .props({
    text: string.default('New'),
    color: oneOf('primary', 'secondary', 'success', 'warning', 'danger').default('primary'),
    size: oneOf('small', 'medium', 'large').default('medium')
  })
  .build()
```

Usage in JSON:

```json
{
  "key": "statusBadge",
  "type": "Badge",
  "props": {
    "text": {
      "value": "Active"
    },
    "color": {
      "value": "success"
    },
    "size": {
      "value": "small"
    }
  }
}
```

### Array Properties

For lists of values:

```tsx
import {array, define, oneOf} from '@react-form-builder/core'

const TagList = ({tags, color}: any) => (
  <div className="tag-list">
    {tags.map((tag, index) => (
      <span key={index} className={`tag tag--${color}`}>
        {tag}&nbsp;
      </span>
    ))}
  </div>
)

export const tagList = define(TagList, 'TagList')
  .props({
    tags: array.default(['tag1', 'tag2']),
    color: oneOf('blue', 'green', 'gray').default('blue')
  })
  .build()
```

Usage in JSON:

```json
{
  "key": "skillTags",
  "type": "TagList",
  "props": {
    "tags": {
      "value": [
        "JavaScript",
        "React",
        "TypeScript",
        "Node.js"
      ]
    },
    "color": {
      "value": "blue"
    }
  }
}
```

### Object Properties

For structured configuration:

```tsx
import {define, number, object} from '@react-form-builder/core'

const ProgressBar = ({progress, style}: any) => (
  <div className="progress-bar">
    <div
      className="progress-bar__fill"
      style={{
        width: `${progress}%`,
        backgroundColor: style.color,
        height: style.height
      }}
    />
    <span className="progress-bar__label">{progress}%</span>
  </div>
)

export const progressBar = define(ProgressBar, 'ProgressBar')
  .props({
    progress: number.default(0),
    style: object
  })
  .build()
```

Usage in JSON:

```json
{
  "key": "uploadProgress",
  "type": "ProgressBar",
  "props": {
    "progress": {
      "value": 75
    },
    "style": {
      "value": {
        "color": "#28a745",
        "height": 10
      }
    }
  }
}
```

## Real-World Examples

### Example 1: Icon Component

```tsx
import {define, number, oneOf, string} from '@react-form-builder/core'

const Icon = ({name, size, color}: any) => {
  // Map icon names to actual icon components or SVGs
  const iconMap = {
    user: '👤',
    email: '📧',
    phone: '📞',
    home: '🏠',
    settings: '⚙️'
  }

  const style = {
    fontSize: `${size}px`,
    color: color
  }

  return <span style={style} aria-hidden="true">{iconMap[name]}</span>
}

export const icon = define(Icon, 'Icon')
  .props({
    name: oneOf('user', 'email', 'phone', 'home', 'settings').default('user'),
    size: number.default(24),
    color: string.default('#333333')
  })
  .build()
```

Usage:

```json
{
  "key": "userIcon",
  "type": "Icon",
  "props": {
    "name": {
      "value": "user"
    },
    "size": {
      "value": 32
    },
    "color": {
      "value": "#007bff"
    }
  }
}
```

### Example 2: Divider with Text

```tsx
import {define, oneOf, string} from '@react-form-builder/core'

const DividerWithText = ({text, position, lineStyle}: any) => {
  return (
    <div className={`divider divider--${position}`}>
      <div className={`divider__line divider__line--${lineStyle}`}/>
      {text && <span className="divider__text">{text}</span>}
      <div className={`divider__line divider__line--${lineStyle}`}/>
    </div>
  )
}

export const dividerWithText = define(DividerWithText, 'DividerWithText')
  .props({
    text: string.default('OR'),
    position: oneOf('center', 'left', 'right').default('center'),
    lineStyle: oneOf('solid', 'dashed', 'dotted').default('solid')
  })
  .build()
```

Usage:

```json
{
  "key": "sectionDivider",
  "type": "DividerWithText",
  "props": {
    "text": {
      "value": "Continue with"
    },
    "position": {
      "value": "center"
    },
    "lineStyle": {
      "value": "dashed"
    }
  }
}
```

### Example 3: Stat Card

```tsx
import {define, oneOf, string} from '@react-form-builder/core'

const StatCard = ({title, value, label, trend, color}: any) => {
  const trendIcon = trend === 'up' ? '📈' : trend === 'down' ? '📉' : '➡️'

  return (
    <div className={`stat-card stat-card--${color}`}>
      <h3 className="stat-card__title">{title}</h3>
      <div className="stat-card__value">{value}</div>
      <div className="stat-card__footer">
        <span className="stat-card__label">{label}</span>
        <span className="stat-card__trend">{trendIcon}</span>
      </div>
    </div>
  )
}

export const statCard = define(StatCard, 'StatCard')
  .props({
    title: string.default('Metric'),
    value: string.default('0'),
    label: string.default('Total'),
    trend: oneOf('up', 'down', 'neutral').default('neutral'),
    color: oneOf('blue', 'green', 'orange', 'red', 'purple').default('blue')
  })
  .build()
```

Usage:

```json
{
  "key": "userStats",
  "type": "StatCard",
  "props": {
    "title": {
      "value": "Active Users"
    },
    "value": {
      "value": "1,234"
    },
    "label": {
      "value": "This month"
    },
    "trend": {
      "value": "up"
    },
    "color": {
      "value": "green"
    }
  }
}
```

## When to Use Simple vs. Valued Components

### Use Simple Components When

- Displaying static information
- Creating layout structures
- Showing read-only data
- Implementing decorative elements
- Building navigation elements

### Use Valued Components When

- User input is required
- Data needs to be submitted
- Validation is necessary
- The component modifies form state
- Two-way data binding is needed

## Summary

Simple components are the foundation of custom component development in FormEngine Core. They allow you to:

- Create reusable UI elements
- Encapsulate presentation logic
- Maintain consistent styling
- Build complex layouts

Key takeaways:

- Use `string`, `boolean`, `number`, `oneOf`, `array`, and `object` for props
- Test components in isolation before using in forms
- Keep components reusable and configurable

Ready to add interactivity? Next, learn about [Valued Components](valued-components) to create components that can read and write form data!
🚀
