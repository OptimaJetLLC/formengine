---
description: 'Master form data handling in FormEngine: state management, data binding,
  form submission, validation, and integration with APIs. Complete guide with examples.'
sidebar_class_name: formengine-core-essential
sidebar_label: Handling Form Data
sidebar_position: 20
slug: /formengine-core/handling-form-data
title: Form Data Management - FormEngine Core Guide
---

# Form Data Management - FormEngine Core Guide

Form data management is at the heart of every form application. FormEngine Core provides multiple ways to work with form data, from simple
data binding to complex data manipulation scenarios. This guide will walk you through all aspects of form data handling, starting from basic
concepts and progressing to advanced techniques.

In this guide, you'll learn:

- How to pre-fill forms with initial data
- How to track form changes in real time
- How to access form data imperatively with viewer references
- How to update form data from your application
- How to work with form data in actions
- Best practices and common pitfalls

## Understanding Form Data Flow

Before diving into specific APIs, let's understand how form data flows in FormEngine:

1. **Initialization**: When `FormViewer` mounts, it populates form fields with values from the `initialData` prop
2. **User Interaction**: As users interact with the form, data changes trigger validation and events
3. **Data Access**: You can access current data through multiple channels
4. **Data Updates**: You can update form data from outside the form

This flow ensures that your form data is always synchronized and accessible.

## Basic Concepts: initialData, data, and errors

### The initialData Prop

The [initialData](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#initialdata) prop allows you to pre-fill form fields
when the form loads. This is useful for edit forms, form wizards, or any scenario where you need to load existing data.

#### Live example

```jsx live
function App() {
  const form = useMemo(() => ({
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "name",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Full Name"},
            "helperText": {"value": "Enter your name"}
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Email Address"},
            "helperText": {"value": "Enter your email"}
          }
        }
      ]
    }
  }), [])

  // Pre-fill form with initial data
  const initialData = {
    name: "John Doe",
    email: "john@example.com"
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <div>
      <h3>Form Pre-filled with Initial Data</h3>
      <FormViewer
        view={muiView}
        getForm={getForm}
        initialData={initialData}
      />
    </div>
  )
}
```

### Current Form Data (data)

The current form data represents the values of all form fields at any given moment. You can access it through several methods that we'll
explore in this guide.

### Validation Errors (errors)

When form validation fails, error messages are stored in the `errors` object. Each key in the errors object corresponds to a field key, and
the value is the error message.

## Subscribing to Form Changes with onFormDataChange

The simplest way to track form data changes is by subscribing to
the [onFormDataChange](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#onformdatachange) callback. This function receives
the updated form data and any validation errors each time a field changes.

### Basic Subscription Example

#### Live example

```jsx live
function App() {
  const [formData, setFormData] = useState({})
  const [formErrors, setFormErrors] = useState({})

  const form = useMemo(() => ({
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "productName",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Product Name"},
            "helperText": {"value": "Enter product name"}
          }
        },
        {
          "key": "price",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Price"},
            "helperText": {"value": "Enter price"},
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const handleFormDataChange = (formData) => {
    const { data, errors } = formData
    setFormData(data)
    setFormErrors(errors)
    
    console.log('Form data changed:', data)
    console.log('Form errors:', errors)
  }

  const divStyle = useMemo(() => (
    {marginTop: '20px', padding: '10px', background: '#f5f5f5'}
  ), [])

  return (
    <div>
      <h3>Form with Real-time Data Tracking</h3>
      <FormViewer
        view={muiView}
        getForm={getForm}
        onFormDataChange={handleFormDataChange}
      />
      
      <div style={divStyle}>
        <h4>Current Form Data:</h4>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
        
        <h4>Current Errors:</h4>
        <pre>{JSON.stringify(formErrors, null, 2)}</pre>
      </div>
    </div>
  )
}
```

### Advanced: Debouncing Form Changes

For performance optimization, you might want to debounce form change events:

```tsx
import {debounce} from 'lodash-es'
import {useState, useMemo, useEffect} from 'react'

const FormComponent = () => {
  const [formData, setFormData] = useState({})

  // Debounce form changes to avoid excessive updates
  const handleFormDataChange = useMemo(
    () => debounce((formData) => {
      setFormData(formData.data)
      // Send to backend or update app state
    }, 300),
    []
  )

  useEffect(() => {
    return () => {
      handleFormDataChange.cancel()
    }
  }, [handleFormDataChange])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      onFormDataChange={handleFormDataChange}
    />
  )
}
```

## Imperative Data Access with viewerRef

Sometimes you need to access form data imperatively - for example, when a button is clicked or at specific points in your application flow.
This is where [viewerRef](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#viewerref) comes in handy.

### Setting Up a Viewer Reference

#### Live example

```jsx live
function App() {
  const viewerRef = useRef(null)
  const [currentData, setCurrentData] = useState({})

  const form = useMemo(() => ({
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "username",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Username"},
            "helperText": {"value": "Enter username"}
          }
        },
        {
          "key": "password",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Password"},
            "type": {"value": "password"},
            "helperText": {"value": "Enter password"}
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const handleGetData = useCallback(() => {
    const viewer = viewerRef.current
    if (viewer) {
      const formData = viewer.formData
      const { data, errors } = formData
      
      setCurrentData(data)
      
      console.log('Current form data:', data)
      console.log('Current errors:', errors)
      
      // Get validation result
      formData.getValidationResult().then(validationResult => {
        console.log('Validation result:', validationResult)
      })
    }
  }, [])

  return (
    <div>
      <h3>Imperative Data Access Example</h3>
      <FormViewer
        view={muiView}
        getForm={getForm}
        viewerRef={viewerRef}
      />
      
      <div style={{marginTop: '20px'}}>
        <button 
          onClick={handleGetData}
          style={{
            padding: '10px 20px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Get Current Form Data
        </button>
        
        {Object.keys(currentData).length > 0 && (
          <div style={{marginTop: '10px', padding: '10px', background: '#f5f5f5'}}>
            <h4>Retrieved Data:</h4>
            <pre>{JSON.stringify(currentData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
```

### Getting Validation Results

The [`getValidationResult`](/api-reference/@react-form-builder/core/classes/ComponentData#getvalidationresult) function performs silent
validation - it validates the form data without displaying errors on the form itself. This is useful when you want to check validation
programmatically before taking action like form submission.

Validation results provide more detailed information than just error messages:

#### Live example

```jsx live
function App() {
  const viewerRef = useRef(null)
  const [result, setResult] = useState(null)

  const form = useMemo(() => ({
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Email"},
            "helperText": {"value": "Enter email"}
          },
          "schema": {
            "autoValidate": false,
            "validations": [
              {
                "key": "required",
                "args": {"message": "Required"}
              },
              {
                "key": "email",
                "args": {"message": "Invalid email"}
              }
            ]
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const validate = async () => {
    const viewer = viewerRef.current
    if (viewer) {
      const validationResult = await viewer.formData.getValidationResult()
      setResult(validationResult)
      console.log("Silent validation result:", validationResult)
    }
  }

  return (
    <div>
      <FormViewer view={muiView} getForm={getForm} viewerRef={viewerRef} />
      <button onClick={validate}>Run Silent Validation</button>
      {result && (
        <pre>{JSON.stringify(result, null, 2)}</pre>
      )}
    </div>
  )
}
```

## Updating Form Data

When you update the `initialData` prop, FormViewer automatically updates the form fields. This is the recommended approach for most use
cases.

### Live example

```jsx live
function App() {
  const [initialData, setInitialData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const form = {
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "firstName",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "First Name"},
            "helperText": {"value": "Enter first name"}
          }
        },
        {
          "key": "lastName",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Last Name"},
            "helperText": {"value": "Enter last name"}
          }
        },
        {
          "key": "age",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Age"},
            "helperText": {"value": "Enter age"}
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const loadSampleData = () => {
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setInitialData({
        firstName: "Alice",
        lastName: "Johnson",
        age: "28"
      })
      setIsLoading(false)
    }, 1000)
  }

  const clearForm = () => {
    setInitialData({})
  }

  return (
    <div>
      <h3>Reactive Data Updates via initialData</h3>
      
      <div style={{marginBottom: '20px'}}>
        <button 
          onClick={loadSampleData}
          disabled={isLoading}
          style={{
            padding: '10px 20px',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          {isLoading ? 'Loading...' : 'Load Sample Data'}
        </button>
        
        <button 
          onClick={clearForm}
          style={{
            padding: '10px 20px',
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Form
        </button>
      </div>
      
      <FormViewer
        view={muiView}
        getForm={getForm}
        initialData={initialData}
      />
      
      <div style={{marginTop: '10px', color: '#666'}}>
        <small>Current initialData: {JSON.stringify(initialData)}</small>
      </div>
    </div>
  )
}
```
## Working with Form Data in Actions

Actions provide a powerful way to manipulate form data from within the form itself. You can access and modify form data directly in action
handlers.

### Accessing Data in Code Actions

#### Live example

```jsx live
function App() {
  const form = {
    "actions": {
      "logFormData": {
        "body": "// Access current form data in code action\nconsole.log('Current form data in action:', JSON.stringify(e.data))\n\n// You can modify form data directly\ne.data['lastUpdated'] = new Date().toISOString()\n\n// Show success message\nalert('Form data logged successfully!')"
      },
      "calculateTotal": {
        "body": "// Calculate total from quantity and price\nconst quantity = parseInt(e.data.quantity || 0)\nconst price = parseFloat(e.data.price || 0)\nconst total = quantity * price\n\n// Update form data with calculated value\ne.data.total = total.toFixed(2)\n\n// Show calculation result\nalert(`Total calculated: $${total.toFixed(2)}`)"
      }
    },
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "quantity",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Quantity"
            },
            "helperText": {
              "value": "Enter quantity"
            },
            "type": {
              "value": "number"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Quantity is required"
                }
              }
            ]
          }
        },
        {
          "key": "price",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Price per unit"
            },
            "helperText": {
              "value": "Enter price"
            },
            "type": {
              "value": "number"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required",
                "args": {
                  "message": "Price is required"
                }
              }
            ]
          }
        },
        {
          "key": "total",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Total"
            },
            "helperText": {
              "value": "Will be calculated"
            },
            "readOnly": {
              "value": true
            }
          }
        },
        {
          "key": "calculateButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "value": "Calculate Total"
            }
          },
          "events": {
            "onClick": [
              {
                "name": "calculateTotal",
                "type": "code"
              }
            ]
          }
        },
        {
          "key": "logButton",
          "type": "MuiButton",
          "props": {
            "children": {
              "value": "Log Form Data"
            }
          },
          "events": {
            "onClick": [
              {
                "name": "logFormData",
                "type": "code"
              }
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <div>
      <h3>Form Data Manipulation in Code Actions</h3>
      <FormViewer
        view={muiView}
        getForm={getForm}
      />
      <div style={{marginTop: '20px', fontSize: '14px', color: '#666'}}>
        <p><strong>Try this:</strong></p>
        <ol>
          <li>Enter a quantity (e.g., 5)</li>
          <li>Enter a price (e.g., 10.50)</li>
          <li>Click "Calculate Total" to see the calculation</li>
          <li>Click "Log Form Data" to see the data in console</li>
        </ol>
      </div>
    </div>
  )
}
```

### Code Actions with Data Access

You can also use inline JavaScript code actions to work with form data:

```json
{
  "actions": {
    "logFormData": {
      "body": "// Access current form data in code action\nconsole.log('Current form data in action:', JSON.stringify(e.data))\n\n// You can modify form data directly\ne.data['lastUpdated'] = new Date().toISOString()\n\n// Show success message\nalert('Form data logged successfully!')"
    }
  }
}
```

```javascript title='logFormData Action example'
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action(e, args) {
  // Access current form data in code action
  console.log('Current form data in action:', JSON.stringify(e.data))

  // You can modify form data directly
  e.data['lastUpdated'] = new Date().toISOString()

  // Show success message
  alert('Form data logged successfully!')
}
```

## Practical Examples and Patterns

### Example 1: Form with Save Draft Functionality

```jsx live
function App() {
  const viewerRef = useRef(null)
  const [autoSaveTimer, setAutoSaveTimer] = useState()
  const [initialData, setInitialData] = useState({})

  const form = useMemo(() => ({
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "username",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Username"},
            "helperText": {"value": "Enter username"}
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Email"},
            "type": {"value": "email"},
            "helperText": {"value": "Enter email"}
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => {
    return JSON.stringify(form)
  }, [form])

  const saveDraft = useCallback(async (data) => {
    try {
      localStorage.setItem('formDraft', JSON.stringify(data))
      console.log('Draft saved successfully')
    } catch (error) {
      console.error('Failed to save draft:', error)
    }
  }, [])

  const handleFormDataChange = useCallback((formData) => {
    // Debounce auto-save
    if (autoSaveTimer) {
      clearTimeout(autoSaveTimer)
    }

    const timer = setTimeout(() => {
      saveDraft(formData.data).catch(console.error)
    }, 1000)

    setAutoSaveTimer(timer)
  }, [autoSaveTimer, saveDraft])

  const loadDraft = useCallback(async () => {
    try {
      const draft = localStorage.getItem('formDraft')
      if (draft) {
        return JSON.parse(draft)
      }
    } catch (error) {
      console.error('Failed to load draft:', error)
    }
    return {}
  }, [])

  // Load draft on component mount
  useEffect(() => {
    loadDraft().then(draftData => {
      // Set initialData with loaded draft
      setInitialData(draftData)
    })
  }, [loadDraft])

  return (
    <FormViewer
      view={muiView}
      initialData={initialData}
      getForm={getForm}
      viewerRef={viewerRef}
      onFormDataChange={handleFormDataChange}
    />
  )
}
```

### Example 2: Multi-Step Form with Data Persistence

```jsx live
function MultiStepForm () {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const viewerRef = useRef(null)

  const step1 = useMemo(() => ({
    form: {
      key: "Screen",
      type: "Screen",
      children: [
        {
          key: "firstName",
          type: "MuiTextField",
          props: {
            label: {value: "First Name"}
          }
        },
        {
          key: "lastName",
          type: "MuiTextField",
          props: {
            label: {value: "Last Name"}
          }
        }
      ]
    }
  }), [])

  const step2 = useMemo(() => ({
    form: {
      key: "Screen",
      type: "Screen",
      children: [
        {
          key: "email",
          type: "MuiTextField",
          props: {
            label: {value: "Email"}
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback((name) => {
    const form = name === 'Step1' ? step1 : step2
    return JSON.stringify(form)
  }, [step1, step2])

  const initialData = useMemo(() => {
    return formData?.[`step${currentStep}`]
  }, [currentStep, formData])

  const saveStep = useCallback(() => {
    const viewer = viewerRef.current
    if (viewer) {
      const stepKey = `step${currentStep}`
      let result = {}
      setFormData(prev => {
        result = {...prev, [stepKey]: viewer.formData.data}
        return result
      })
      return result
    }
  }, [currentStep])

  const changeStep = useCallback((step) => {
    saveStep()
    setCurrentStep(step)
  }, [saveStep])

  const handleSubmit = useCallback(async () => {
    const data = saveStep()
    // Combine all step data

    // Submit to backend
    alert(`Data submitted: ${JSON.stringify(data)}`)
  }, [saveStep])

  return (
    <div>
      <FormViewer
        view={muiView}
        formName={`Step${currentStep}`}
        getForm={getForm}
        initialData={initialData}
        viewerRef={viewerRef}
      />

      <div>
        <button onClick={() => changeStep(1)}>Step 1</button>
        <button onClick={() => changeStep(2)}>Step 2</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}
```

## Common Pitfalls and Solutions

### Pitfall 1: Missing Field Keys

**Problem**: Data doesn't bind to fields because keys don't match.

**Solution**: Ensure field keys in `initialData` match the `key` (or `dataKey`) property in your form JSON.

```tsx
// Form JSON
const data = {
  "key": "emailField",  // This must match
  "type": "MuiTextField"
}

// initialData
const initialData = {
  emailField: "user@example.com"  // Key matches
}
```

### Pitfall 2: Data Type Mismatch

**Problem**: Form expects a string but receives a number.

**Solution**: Convert data to the expected type:

```tsx
const initialData = {
  age: user.age.toString(),  // Convert number to string
  isActive: user.active ? "true" : "false"  // Convert boolean to string
}
```

## Summary

FormEngine Core provides a comprehensive set of tools for form data management:

1. [initialData](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#initialdata) – For pre-filling and reactive updates
2. [onFormDataChange](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#onformdatachange) – For real-time data tracking
3. [viewerRef](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#viewerref) – For imperative data access and manipulation
4. [actions](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#actions) – For data manipulation within form logic

---

For more information:

- [Validation guide](/formengine-core/validation)
- [Actions and Events guide](/formengine-core/actions-and-events)
- [FormEngine Core API reference](/api-reference/@react-form-builder/core)
