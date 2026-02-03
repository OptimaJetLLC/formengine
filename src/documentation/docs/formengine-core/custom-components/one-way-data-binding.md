---
sidebar_position: 4
---

# One-Way Data Binding

While valued components provide powerful two-way data binding, there are scenarios where you only need to display data without allowing user
modifications. One-way data binding enables components to read from form data without writing back to it, making them perfect for read-only
displays, calculated fields, and data presentation.

## What Is One-Way Data Binding?

One-way data binding allows components to:

- ✅ Read data from the form store
- ❌ Write data back to the form store
- ✅ React to data changes automatically
- ✅ Display computed or derived values
- ✅ Show read-only representations of form data

**Common Use Cases:**

- Read-only text displays
- Calculated fields (totals, averages, derived values)
- Data visualization components
- Summary panels
- Status indicators
- Preview components

## One-Way vs Two-Way Binding

| Feature             | One-Way Binding | Two-Way Binding (Valued) |
|---------------------|-----------------|--------------------------|
| Reads from store    | ✅ Yes           | ✅ Yes                    |
| Writes to store     | ❌ No            | ✅ Yes                    |
| User can modify     | ❌ No            | ✅ Yes                    |
| Triggers validation | ❌ No            | ✅ Yes                    |
| Tracks dirty state  | ❌ No            | ✅ Yes                    |
| Uses `dataBound`    | ✅ Yes           | ❌ No                     |
| Uses `valued`       | ❌ No            | ✅ Yes                    |

## Creating One-Way Bound Components

One-way bound components use the [dataBound](/api-reference/@react-form-builder/core/classes/TypedBuilder#databound) method to create
read-only connections to form data. Unlike [valued](/api-reference/@react-form-builder/core/classes/TypedBuilder#valued), `dataBound`
props receive data from the store but cannot write back to it.

### Example: Read-Only Display Component

```tsx
import {define, string} from '@react-form-builder/core'

interface DisplayProps {
  /** The value to display */
  value: string;

  /** Optional label */
  label?: string;

  /** Formatting variant */
  variant?: 'text' | 'email' | 'phone' | 'currency';
}

const ReadOnlyDisplay = ({value, label, variant}: DisplayProps) => {
  const formatValue = (val: string) => {
    switch (variant) {
      case 'email':
        return <a href={`mailto:${val}`}>{val}</a>
      case 'phone':
        return <a href={`tel:${val}`}>{val}</a>
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(Number(val))
      default:
        return val
    }
  }

  return (
    <div className="read-only-display">
      {label && <label className="read-only-display__label">{label}</label>}
      <div className="read-only-display__value">
        {formatValue(value)}
      </div>
    </div>
  )
}

export const readOnlyDisplay = define(ReadOnlyDisplay, 'ReadOnlyDisplay')
  .props({
    value: string.dataBound, // Use dataBound for one-way binding!
    label: string,
    variant: string.default('text')
  })
  .build()
```

### Using the Read-Only Component

```json
{
  "key": "userEmailDisplay",
  "dataKey": "userEmail",
  "type": "ReadOnlyDisplay",
  "props": {
    "label": {
      "value": "User Email"
    },
    "variant": {
      "value": "email"
    }
  }
}
```

**Key Points:**

- The `value` prop uses `dataBound` to receive data from the form
- No `onChange` handler is needed or provided
- The component re-renders automatically when `form.data.userEmail` changes
- Users cannot edit the displayed value
- No validation or dirty state tracking occurs

### Live Example

```jsx live
function App() {
  const ReadOnlyDisplay = ({value, label, variant}) => {
    const formatValue = (val) => {
      switch (variant) {
        case 'email':
          return <a href={`mailto:${val}`}>{val}</a>
        case 'phone':
          return <a href={`tel:${val}`}>{val}</a>
        case 'currency':
          return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(Number(val))
        default:
          return val
      }
    }

    return (
      <div className="read-only-display">
        {label && <label className="read-only-display__label">{label}</label>}
        <div className="read-only-display__value">
          {formatValue(value)}
        </div>
      </div>
    )
  }

  const readOnlyDisplay = define(ReadOnlyDisplay, 'ReadOnlyDisplay')
    .props({
      value: string.dataBound,
      label: string,
      variant: string.default('text')
    })
    .build()

  const view = muiView
  muiView.define(readOnlyDisplay.model)

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "userEmailDisplay",
          "dataKey": "userEmail",
          "type": "ReadOnlyDisplay",
          "props": {
            "label": {
              "value": "User Email"
            },
            "variant": {
              "value": "email"
            }
          }
        },
        {
          "key": "textField",
          "type": "MuiTextField",
          "dataKey": "userEmail",
          "props": {
            "helperText": {
              "value": "Enter your email"
            }
          }
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      initialData={{userEmail: 'test@example.com'}}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Real-World Examples

### Example 1: Progress Indicator

```tsx
import {define, number} from '@react-form-builder/core'

interface ProgressProps {
  current: number
  total: number
}

const ProgressIndicator = ({current, total}: ProgressProps) => {
  const percentage = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="progress-indicator">
      <div className="progress-indicator__bar">
        <div
          className="progress-indicator__fill"
          style={{width: `${percentage}%`}}
        />
      </div>
      <div className="progress-indicator__text">
        {current} of {total} completed ({percentage.toFixed(1)}%)
      </div>
    </div>
  )
}

export const progressIndicator = define(ProgressIndicator, 'ProgressIndicator')
  .props({
    current: number.dataBound.default(0),
    total: number.default(100)
  })
  .build()
```

**Usage:**

```json
{
  "key": "progressIndicator",
  "dataKey": "progressIndicator",
  "type": "ProgressIndicator"
}
```

#### Live Example

```jsx live
function App() {
  const ProgressIndicator = ({current, total}) => {
    const percentage = total > 0 ? (current / total) * 100 : 0

    return (
      <div className="progress-indicator">
        <div className="progress-indicator__bar">
          <div
            className="progress-indicator__fill"
            style={{width: `${percentage}%`}}
          />
        </div>
        <div className="progress-indicator__text">
          {current} of {total} completed ({percentage.toFixed(1)}%)
        </div>
      </div>
    )
  }

  const progressIndicator = define(ProgressIndicator, 'ProgressIndicator')
    .props({
      current: number.dataBound.default(0),
      total: number.default(100)
    })
    .build()

  const view = muiView
  muiView.define(progressIndicator.model)

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "progressIndicator",
          "dataKey": "progressIndicator",
          "type": "ProgressIndicator"
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      initialData={{progressIndicator: 24}}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### Example 2: Data Visualization Component

```tsx
import {array, define, string} from '@react-form-builder/core'

interface ChartProps {
  data: Array<{ label: string; value: number }>
  title?: string
}

const SimpleBarChart = ({data, title}: ChartProps) => {
  const items = data ?? []
  const maxValue = Math.max(...items.map(d => d.value), 1)

  return (
    <div className="simple-chart">
      {title && <h4>{title}</h4>}
      <div className="simple-chart__bars" style={{maxWidth: 200}}>
        {items.map((item, index) => (
          <div
            key={index}
            className="simple-chart__bar-container"
            style={{
              width: `${(item.value / maxValue) * 100}%`,
              backgroundColor: `hsl(${index * 40}, 70%, 50%)`
            }}
            title={`${item.label}: ${item.value}`}
          >
            <span className="simple-chart__label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export const simpleBarChart = define(SimpleBarChart, 'SimpleBarChart')
  .props({
    data: array.dataBound.default([]),
    title: string,
    type: string.default('bar')
  })
  .build()
```

**Usage:**

```json
{
  "key": "salesChart",
  "dataKey": "salesData",
  "type": "SimpleBarChart",
  "props": {
    "title": {
      "value": "Monthly Sales"
    }
  }
}
```

#### Live Example

```jsx live
function App() {
  const SimpleBarChart = ({data, title}) => {
    const items = data ?? []
    const maxValue = Math.max(...items.map(d => d.value), 1)

    return (
      <div className="simple-chart">
        {title && <h4>{title}</h4>}
        <div className="simple-chart__bars" style={{maxWidth: 200}}>
          {items.map((item, index) => (
            <div
              key={index}
              className="simple-chart__bar-container"
              style={{
                width: `${(item.value / maxValue) * 100}%`,
                backgroundColor: `hsl(${index * 40}, 70%, 50%)`
              }}
              title={`${item.label}: ${item.value}`}
            >
              <span className="simple-chart__label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const simpleBarChart = define(SimpleBarChart, 'SimpleBarChart')
    .props({
      data: array.dataBound.default([]),
      title: string,
      type: string.default('bar')
    })
    .build()

  const view = muiView
  muiView.define(simpleBarChart.model)

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "salesChart",
          "dataKey": "salesData",
          "type": "SimpleBarChart",
          "props": {
            "title": {
              "value": "Monthly Sales"
            }
          }
        }
      ]
    }
  }
  
  const initialData = {
    salesData: [
      {
        label: 'Item 1',
        value: 56
      },
      {
        label: 'Item 2',
        value: 23
      },
      {
        label: 'Item 3',
        value: 14
      }
    ]
  }

  return (
    <FormViewer
      view={view}
      initialData={initialData}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Best Practices

### 1. Use One-Way Binding for Read-Only Data

When a component should only display information, use `dataBound` to prevent accidental data modification and reduce complexity.

**Good:**

```tsx
// Read-only display with dataBound
import {define, object} from '@react-form-builder/core'

const UserInfo = ({info}: any) => (
  <div>
    <p>{info?.name}</p>
    <p>{info?.email}</p>
  </div>
)

export const userInfo = define(UserInfo, 'UserInfo')
  .props({
    info: object.dataBound
  })
  .build()
```

**Avoid:**

```tsx
// Don't use valued props if you don't need two-way binding
import {define, object} from '@react-form-builder/core'

const UserInfo = ({info}: any) => (
  <div>
    <p>{info?.name}</p>
    <p>{info?.email}</p>
  </div>
)

export const userInfo = define(UserInfo, 'UserInfo')
  .props({
    info: object.valued // Wrong: enables two-way binding unnecessarily
  })
  .build()
```

### 2. Combine with Valued Components

One-way and two-way components work together seamlessly:

```json
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "name",
        "type": "MuiTextField",
        "props": {
          "helperText": {
            "value": "Enter your name"
          },
          "label": {
            "value": "Name"
          }
        }
      },
      {
        "key": "muiTypography1",
        "type": "MuiTypography",
        "props": {
          "children": {
            "value": "Your name is:"
          },
          "variant": {
            "value": "h5"
          }
        }
      },
      {
        "key": "muiTypography2",
        "dataKey": "name",
        "type": "MuiTypography",
        "props": {
          "variant": {
            "value": "h5"
          }
        }
      }
    ]
  }
}
```

#### Live Example

```jsx live
function App() {
  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "name",
          "type": "MuiTextField",
          "props": {
            "helperText": {
              "value": "Enter your name"
            },
            "label": {
              "value": "Name"
            }
          }
        },
        {
          "key": "muiTypography1",
          "type": "MuiTypography",
          "props": {
            "children": {
              "value": "Your name is:"
            },
            "variant": {
              "value": "h5"
            }
          }
        },
        {
          "key": "muiTypography2",
          "dataKey": "name",
          "type": "MuiTypography",
          "props": {
            "variant": {
              "value": "h5"
            }
          }
        }
      ]
    }
  }

  return (
    <FormViewer
      view={muiView}
      initialData={{name: 'Michael'}}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### 3. Performance Benefits

One-way bound components are more performant because:

- No validation overhead
- No dirty state tracking
- No event handlers for data updates
- Simpler re-render logic
- Explicit read-only contract with `dataBound`

## Summary

One-way data binding with `dataBound` is a powerful pattern for creating read-only components that react to form data changes. Use it when:

- Displaying computed or derived values
- Creating summary panels
- Building data visualization components
- Showing read-only representations of form data
- Implementing progress indicators or status displays

Remember: one-way components use `dataBound` to receive data explicitly as read-only, don't provide `onChange` handlers, and are optimized
for presentation without the overhead of two-way binding.
