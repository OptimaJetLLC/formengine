---
sidebar_position: 20
title: Functional Properties
description: Functional properties allow you to define component properties that execute custom JavaScript functions at runtime to transform or compute values based on form data
---

# Functional Properties

Functional properties allow you to define component properties that execute custom JavaScript functions at runtime to transform or compute
values based on form data. Unlike regular properties that store static values, functional properties contain function definitions that are
executed when the component renders, returning dynamic values that can be used for display, styling, or logic.

## What Are Functional Properties?

Functional properties are special component properties that:

- ✅ Contain JavaScript function definitions that execute at runtime
- ✅ Receive the current form data as input
- ✅ Return computed values (strings, numbers, objects, arrays, booleans)
- ✅ Are evaluated each time the component renders
- ✅ Enable dynamic data transformation and computation

**Key Characteristics:**

- **Not React Components**: Functional properties return data values, not React elements
- **Form Data Access**: Functions receive the complete form data as a parameter
- **Dynamic Execution**: Functions run during component rendering
- **Flexible Return Types**: Can return any JavaScript value except React nodes

**Common Use Cases:**

- Transforming raw data into display formats
- Calculating derived values from form inputs
- Implementing conditional styling logic
- Formatting dates, numbers, or currency
- Filtering or sorting data arrays

## Basic Usage

To define a functional property, use the [fn](/api-reference/@react-form-builder/core/functions/fn) annotation:

```tsx
import {define, fn, number, string} from '@react-form-builder/core'
import {useMemo} from 'react'

interface DataDisplayProps {
  label: string
  data?: number
  format: (data?: number) => string
}

const DataDisplay = ({label, data, format}: DataDisplayProps) => {
  const formattedValue = useMemo(() => {
    if (format) return format(data)
    return typeof data === 'number' ? `${data}` : ''
  }, [data, format])

  return <div>
    <span>{label} </span>{formattedValue}
  </div>
}

export const dataDisplay = define(DataDisplay, 'DataDisplay')
  .props({
    label: string.default('Value:'),
    data: number.dataBound,
    format: fn(`/**
 * @param {number} data
 * @returns {string}
 */
function format(data) {`)
  })
  .build()
```

**Note:** In the component definition, functional properties only declare the function signature. The actual function body is defined in the
form JSON configuration, allowing the same component to be reused with different transformation logic.

### Live Example

```jsx live
function App() {
  const DataDisplay = ({label, data, format}) => {
    const formattedValue = useMemo(() => {
      if (format) return format(data)
      return typeof data === 'number' ? `${data}` : ''
    }, [data, format])

    return <div>
      <span>{label} </span>{formattedValue}
    </div>
  }

  const dataDisplay = define(DataDisplay, 'DataDisplay')
    .props({
      label: string.default('Value:'),
      data: number.dataBound,
      format: fn(`/**
 * @param {number} data
 * @returns {string}
 */
function format(data) {`)
    })
    .build()

  const view = createView([dataDisplay.model])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "dataDisplay1",
          "type": "DataDisplay",
          "props": {
            "data": {
              "value": 1212
            },
            "format": {
              "computeType": "function",
              "fnSource": "return (/**\n * @param {number} data\n * @returns {string}\n */\nfunction formattedValue(data) {return 'data is ' + data})"
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

## The fn Annotation

### Function Signature

The `fn` annotation accepts two parameters:

```typescript
function fn(fnDescriptionBegin: string, fnDescriptionEnd = '}')
```

- `fnDescriptionBegin`: The beginning of the function definition, including JSDoc comments and function signature
- `fnDescriptionEnd`: The ending of the function definition (defaults to `}`)

### Function Definition Format

Your function definition should follow this pattern:

```typescript
// Template
fn(`/**
  * JSDoc comments describing the function
  * @param {ParamType} paramaName The parameter descritopn
  * @returns {ReturnType} Description of return value
  */
function functionName(formData) {`)

// Example
const formatCurrency = fn(`/**
  * Formats a numeric value as currency
  * @param {number} value
  * @returns {string} Formatted currency string
  */
function formatCurrency(value) {`)
```

**Important:** The function body will be defined in the form JSON, so the annotation only provides the function signature and documentation.

## Function Execution Context

### The form Parameter

When your function executes, it receives one implicit parameter: `form`. This object contains all form field values keyed by their component
keys. The full context of the function looks like this:

```typescript
/** @type {IFormData} */
var form;

/**
 * @param {number} data
 * @returns {string}
 */
function format(data) {
  return 'data is ' + data
}
```

### Return Values

Functional properties can return any JavaScript value except React elements:

- **Strings**: For text display, labels, formatted values
- **Numbers**: For calculations, metrics, scores
- **Booleans**: For conditional logic, flags, toggles
- **Objects**: For configuration, styles, complex data
- **Arrays**: For lists, collections, filtered data
- **null/undefined**: When no value should be returned

## Practical Examples

**Important:** The following examples show complete function bodies for illustration purposes. In actual usage, these function bodies would
be defined in the form JSON configuration, not in the component definition itself. The component only declares the function signature using
the `fn` annotation.

### Example 1: Data Formatting and Transformation

Transform raw data into user-friendly formats:

```tsx
import {define, fn, string} from '@react-form-builder/core'

const FormattedDisplay = ({
                            title,
                            containerStyle,
                            formattedDate,
                            formattedCurrency,
                            percentage
                          }: any) => {
  return (
    <div className="display-container">
      <h3>{title}</h3>
      <div style={containerStyle?.()}>
        <p>Formatted Date: {formattedDate?.()}</p>
        <p>Formatted Currency: {formattedCurrency?.()}</p>
        <p>Percentage: {percentage?.()}</p>
      </div>
    </div>
  )
}

export const formattedDisplay = define(FormattedDisplay, 'FormattedDisplay')
  .props({
    title: string.default('Formatted Values'),

    formattedDate: fn(`/**
 * Formats a date string or timestamp
 * @returns {string}
 */
function formattedDate() {`),

    formattedCurrency: fn(`/**
 * Formats a number as currency
 * @returns {string}
 */
function formattedCurrency() {`),

    percentage: fn(`/**
 * Calculates and formats a percentage
 * @returns {string}
 */
function percentage() {`),

    containerStyle: fn(`/**
 * Dynamic styling based on data
 * @returns {object}
 */
function containerStyle() {`)
  })
  .build()
```

**Usage:**

```json
{
  "key": "formattedDisplay1",
  "type": "FormattedDisplay",
  "props": {
    "formattedDate": {
      "computeType": "function",
      "fnSource": "return (/**\n * Formats a date string or timestamp\n * @returns {string}\n */\nfunction formattedDate() {    const rawDate = form.data.dateField\n    if (!rawDate) return 'No date provided'\n\n    try {\n        const date = rawDate instanceof Date ? rawDate : new Date(rawDate)\n        return date.toLocaleDateString('en-US', {\n            weekday: 'long',\n            year: 'numeric',\n            month: 'long',\n            day: 'numeric'\n        })\n    } catch {\n        return 'Invalid date'\n    }})",
      "value": "    const rawDate = form.data.dateField\n    if (!rawDate) return 'No date provided'\n\n    try {\n        const date = rawDate instanceof Date ? rawDate : new Date(rawDate)\n        return date.toLocaleDateString('en-US', {\n            weekday: 'long',\n            year: 'numeric',\n            month: 'long',\n            day: 'numeric'\n        })\n    } catch {\n        return 'Invalid date'\n    }"
    },
    "formattedCurrency": {
      "computeType": "function",
      "fnSource": "return (/**\n * Formats a number as currency\n * @returns {string}\n */\nfunction formattedCurrency() {    const amount = parseFloat(form.data.amountField ?? 0) || 0\n    return new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: 'USD',\n        minimumFractionDigits: 2\n    }).format(amount)})",
      "value": "    const amount = parseFloat(form.data.amountField ?? 0) || 0\n    return new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: 'USD',\n        minimumFractionDigits: 2\n    }).format(amount)"
    },
    "percentage": {
      "computeType": "function",
      "fnSource": "return (/**\n * Calculates and formats a percentage\n * @returns {string}\n */\nfunction percentage() {    const value = parseFloat(form.data.valueField) || 0\n    const total = parseFloat(form.data.totalField) || 1\n    const percent = (value / total) * 100\n\n    return `${percent.toFixed(1)}%`})",
      "value": "    const value = parseFloat(form.data.valueField) || 0\n    const total = parseFloat(form.data.totalField) || 1\n    const percent = (value / total) * 100\n\n    return `${percent.toFixed(1)}%`"
    }
  }
}
```

#### Live Example

```jsx live
function App() {
  const FormattedDisplay = ({
                              title,
                              containerStyle,
                              formattedDate,
                              formattedCurrency,
                              percentage
                            }) => {
    return (
      <div className="display-container">
        <h3>{title}</h3>
        <div style={containerStyle?.()}>
          <p>Formatted Date: {formattedDate?.()}</p>
          <p>Formatted Currency: {formattedCurrency?.()}</p>
          <p>Percentage: {percentage?.()}</p>
        </div>
      </div>
    )
  }

  const formattedDisplay = define(FormattedDisplay, 'FormattedDisplay')
    .props({
      title: string.default('Formatted Values'),

      formattedDate: fn(`/**
 * Formats a date string or timestamp
 * @returns {string}
 */
function formattedDate() {`),

      formattedCurrency: fn(`/**
 * Formats a number as currency
 * @returns {string}
 */
function formattedCurrency() {`),

      percentage: fn(`/**
 * Calculates and formats a percentage
 * @returns {string}
 */
function percentage() {`),

      containerStyle: fn(`/**
 * Dynamic styling based on data
 * @returns {object}
 */
function containerStyle() {`)
    })
    .build()

  const view = createView([formattedDisplay.model])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "formattedDisplay",
          "type": "FormattedDisplay",
          "props": {
            "formattedDate": {
              "computeType": "function",
              "fnSource": "return (/**\n * Formats a date string or timestamp\n * @returns {string}\n */\nfunction formattedDate() {    const rawDate = form.data.dateField\n    if (!rawDate) return 'No date provided'\n\n    try {\n        const date = rawDate instanceof Date ? rawDate : new Date(rawDate)\n        return date.toLocaleDateString('en-US', {\n            weekday: 'long',\n            year: 'numeric',\n            month: 'long',\n            day: 'numeric'\n        })\n    } catch {\n        return 'Invalid date'\n    }})",
              "value": "    const rawDate = form.data.dateField\n    if (!rawDate) return 'No date provided'\n\n    try {\n        const date = rawDate instanceof Date ? rawDate : new Date(rawDate)\n        return date.toLocaleDateString('en-US', {\n            weekday: 'long',\n            year: 'numeric',\n            month: 'long',\n            day: 'numeric'\n        })\n    } catch {\n        return 'Invalid date'\n    }"
            },
            "formattedCurrency": {
              "computeType": "function",
              "fnSource": "return (/**\n * Formats a number as currency\n * @returns {string}\n */\nfunction formattedCurrency() {    const amount = parseFloat(form.data.amountField ?? 0) || 0\n    return new Intl.NumberFormat('en-US', {\n        style: 'currency',\n        currency: 'USD',\n        minimumFractionDigits: 2\n    }).format(amount)})"
            },
            "percentage": {
              "computeType": "function",
              "fnSource": "return (/**\n * Calculates and formats a percentage\n * @returns {string}\n */\nfunction percentage() {    const value = parseFloat(form.data.valueField) || 0\n    const total = parseFloat(form.data.totalField) || 1\n    const percent = (value / total) * 100\n\n    return `${percent.toFixed(1)}%`})"
            },
            "containerStyle": {
              "computeType": "function",
              "fnSource": "return (/**\n * Dynamic styling based on data\n * @returns {object}\n */\nfunction containerStyle() {    const amount = parseFloat(form.data.amountField) || 0\n\n    return {\n        padding: 20,\n        border: '2px solid',\n        borderColor: amount > 1000 ? '#28a745' : '#6c757d',\n        backgroundColor: amount > 1000 ? '#d4edda' : '#f8f9fa',\n        borderRadius: 8,\n        marginTop: 10\n    }})"
            }
          }
        }
      ]
    }
  }
  
  const initiadData = {
    dateField: "2026-01-05T21:00:00.000Z",
    valueField: 23,
    totalField: 52,
    amountField: 1302.56
  }

  return (
    <FormViewer
      view={view}
      initialData={initiadData}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### Example 2: Conditional Logic and Business Rules

Implement business logic that changes based on form data:

```tsx
import {define, fn} from '@react-form-builder/core'

const EligibilityIndicator = (props: any) => {
  const requirements = props.requirements?.() ?? []

  return (
    <div style={props.indicatorStyle?.()}>
      <h4>{props.statusTitle?.()}</h4>
      <p>{props.statusMessage?.()}</p>
      {requirements && (
        <ul>
          {requirements.map((req: string, index: number) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export const eligibilityIndicator = define(EligibilityIndicator, 'EligibilityIndicator')
  .props({
    statusTitle: fn(`/**
 * Determines eligibility status title
 * @returns {string}
 */
function statusTitle() {`),

    statusMessage: fn(`/**
 * Generates detailed status message
 * @returns {string}
 */
function statusMessage() {`),

    requirements: fn(`/**
 * Lists missing requirements
 * @returns {array}
 */
function requirements() {`),

    indicatorStyle: fn(`/**
 * Dynamic styling based on eligibility
 * @returns {object}
 */
function indicatorStyle() {`)
  })
  .build()
```

We will use the following code as function values:

```javascript title='statusTitle'
/**
 * Determines eligibility status title
 * @returns {string}
 */
function statusTitle() {
  const age = parseInt(form.data.age) || 0
  const income = parseInt(form.data.annualIncome) || 0
  const creditScore = parseInt(form.data.creditScore) || 0

  if (age >= 18 && income >= 30000 && creditScore >= 650) {
    return '✅ Eligible for Premium Account'
  } else if (age >= 18 && income >= 20000) {
    return '⚠️ Eligible for Basic Account'
  } else {
    return '❌ Not Eligible'
  }
}
```

```javascript title='statusMessage'
/**
 * Generates detailed status message
 * @returns {string}
 */
function statusMessage() {
  const age = parseInt(form.data.age) || 0
  const income = parseInt(form.data.annualIncome) || 0
  const creditScore = parseInt(form.data.creditScore) || 0

  if (age < 18) {
    return 'Must be at least 18 years old.'
  } else if (income < 20000) {
    return 'Minimum annual income requirement not met.'
  } else if (creditScore < 650 && income < 30000) {
    return 'Credit score too low for this income level.'
  } else {
    return 'All requirements satisfied.'
  }
}
```

```javascript title='requirements'
/**
 * Lists missing requirements
 * @returns {array}
 */
function requirements() {
  const age = parseInt(form.data.age) || 0
  const income = parseInt(form.data.annualIncome) || 0
  const creditScore = parseInt(form.data.creditScore) || 0
  const missing = []

  if (age < 18) missing.push('Must be 18 years or older')
  if (income < 20000) missing.push('Minimum income: $20,000')
  if (creditScore < 650 && income < 30000) {
    missing.push('Credit score of 650+ required for income under $30,000')
  }

  return missing
}
```

```javascript title='indicatorStyle'
/**
 * Dynamic styling based on eligibility
 * @returns {object}
 */
function indicatorStyle() {
  const age = parseInt(form.data.age) || 0
  const income = parseInt(form.data.annualIncome) || 0
  const creditScore = parseInt(form.data.creditScore) || 0

  const isEligible = age >= 18 && income >= 30000 && creditScore >= 650
  const isBasicEligible = age >= 18 && income >= 20000

  let backgroundColor, borderColor

  if (isEligible) {
    backgroundColor = '#d4edda'
    borderColor = '#28a745'
  } else if (isBasicEligible) {
    backgroundColor = '#fff3cd'
    borderColor = '#ffc107'
  } else {
    backgroundColor = '#f8d7da'
    borderColor = '#dc3545'
  }

  return {
    padding: 15,
    border: `2px solid \${borderColor}`,
    backgroundColor: backgroundColor,
    borderRadius: 6,
    margin: '10px 0'
  }
}
```

#### Live Example

```jsx live
function App() {
  const EligibilityIndicator = (props) => {
    const requirements = props.requirements?.() ?? []

    return (
      <div style={props.indicatorStyle?.()}>
        <h4>{props.statusTitle?.()}</h4>
        <p>{props.statusMessage?.()}</p>
        {requirements && (
          <ul>
            {requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  const eligibilityIndicator = define(EligibilityIndicator, 'EligibilityIndicator')
    .props({
      statusTitle: fn(`/**
 * Determines eligibility status title
 * @returns {string}
 */
function statusTitle() {`),

      statusMessage: fn(`/**
 * Generates detailed status message
 * @returns {string}
 */
function statusMessage() {`),

      requirements: fn(`/**
 * Lists missing requirements
 * @returns {array}
 */
function requirements() {`),

      indicatorStyle: fn(`/**
 * Dynamic styling based on eligibility
 * @returns {object}
 */
function indicatorStyle() {`)
    })
    .build()
  
  const view = createView([eligibilityIndicator.model])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "eligibilityIndicator",
          "type": "EligibilityIndicator",
          "props": {
            "statusTitle": {
              "computeType": "function",
              "fnSource": "return (/**\n * Determines eligibility status title\n * @returns {string}\n */\nfunction statusTitle() {    const age = parseInt(form.data.age) || 0\n    const income = parseInt(form.data.annualIncome) || 0\n    const creditScore = parseInt(form.data.creditScore) || 0\n\n    if (age >= 18 && income >= 30000 && creditScore >= 650) {\n        return '✅ Eligible for Premium Account'\n    } else if (age >= 18 && income >= 20000) {\n        return '⚠️ Eligible for Basic Account'\n    } else {\n        return '❌ Not Eligible'\n    }})"
            },
            "statusMessage": {
              "computeType": "function",
              "fnSource": "return (/**\n * Generates detailed status message\n * @returns {string}\n */\nfunction statusMessage() {    const age = parseInt(form.data.age) || 0\n    const income = parseInt(form.data.annualIncome) || 0\n    const creditScore = parseInt(form.data.creditScore) || 0\n\n    if (age < 18) {\n        return 'Must be at least 18 years old.'\n    } else if (income < 20000) {\n        return 'Minimum annual income requirement not met.'\n    } else if (creditScore < 650 && income < 30000) {\n        return 'Credit score too low for this income level.'\n    } else {\n        return 'All requirements satisfied.'\n    }})"
            },
            "requirements": {
              "computeType": "function",
              "fnSource": "return (/**\n * Lists missing requirements\n * @returns {array}\n */\nfunction requirements() {    const age = parseInt(form.data.age) || 0\n    const income = parseInt(form.data.annualIncome) || 0\n    const creditScore = parseInt(form.data.creditScore) || 0\n    const missing = []\n\n    if (age < 18) missing.push('Must be 18 years or older')\n    if (income < 20000) missing.push('Minimum income: $20,000')\n    if (creditScore < 650 && income < 30000) {\n        missing.push('Credit score of 650+ required for income under $30,000')\n    }\n\n    return missing})"
            },
            "indicatorStyle": {
              "computeType": "function",
              "fnSource": "return (/**\n * Dynamic styling based on eligibility\n * @returns {object}\n */\nfunction indicatorStyle() {    const age = parseInt(form.data.age) || 0\n    const income = parseInt(form.data.annualIncome) || 0\n    const creditScore = parseInt(form.data.creditScore) || 0\n\n    const isEligible = age >= 18 && income >= 30000 && creditScore >= 650\n    const isBasicEligible = age >= 18 && income >= 20000\n\n    let backgroundColor, borderColor\n\n    if (isEligible) {\n        backgroundColor = '#d4edda'\n        borderColor = '#28a745'\n    } else if (isBasicEligible) {\n        backgroundColor = '#fff3cd'\n        borderColor = '#ffc107'\n    } else {\n        backgroundColor = '#f8d7da'\n        borderColor = '#dc3545'\n    }\n\n    return {\n        padding: 15,\n        border: `2px solid \\${borderColor}`,\n        backgroundColor: backgroundColor,\n        borderRadius: 6,\n        margin: '10px 0'\n    }})"
            }
          }
        }
      ]
    }
  }
  
  const initiadData = {
    age: 24,
    annualIncome: 142000,
    creditScore: 1020
  }

  return (
    <FormViewer
      view={view}
      initialData={initiadData}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

## Form JSON Representation

When you define a component with functional properties, the function bodies are specified in the form JSON. Here's how functional properties
appear in form JSON:

```json
{
  "key": "userDisplay",
  "type": "DataDisplay",
  "props": {
    "label": {
      "value": "User Information:"
    },
    "formattedValue": {
      "computeType": "function",
      "fnSource": "return (/**\n * @param {number} data\n * @returns {string}\n */\nfunction formattedValue(data) {return 'data is ' + data})"
    }
  }
}
```

**JSON Structure for Functional Properties:**

```json
{
  "props": {
    "propertyName": {
      "computeType": "function",
      "fnSource": "return (// JavaScript function body\nreturn someValue;)"
    }
  }
}
```

**Important Notes:**

1. The `fnSource` field contains the complete JavaScript function body
2. The function body should return a value
3. Access form data using the `form` parameter

## Summary

Functional properties using the `fn` annotation provide a powerful way to add dynamic behavior to your form components:

- **Dynamic Values**: Compute values based on current form data
- **Data Transformation**: Transform raw data into display-ready formats
- **Business Logic**: Implement complex rules and calculations
- **Flexible Return Types**: Return strings, numbers, objects, arrays, or booleans
- **Form JSON Integration**: Function bodies defined in form configuration

**When to use functional properties:**

- When you need values that change based on form data
- For data formatting and transformation
- To implement business rules and calculations
- When you need dynamic configuration or styling

**When not to use functional properties:**

- For static values (use regular properties)
- When returning React elements (use component rendering)
- For extremely performance-sensitive operations
- When simple conditional rendering suffices

By mastering functional properties, you can create highly dynamic and responsive forms that adapt to user input in real-time, providing rich
interactive experiences while maintaining clean separation between data and presentation logic.
