---
sidebar_position: 10
sidebar_class_name: formengine-core-essential
title: Rendering Forms
description: FormEngine Core provides a flexible and powerful system for rendering forms defined in JSON format
---

# Rendering Forms

FormEngine Core provides a flexible and powerful system for rendering forms defined in JSON format. This document covers the fundamentals of
form rendering, from basic setup to advanced configuration options.

## Overview

Form rendering in FormEngine Core follows a simple yet powerful pattern:

1. Define your form structure in JSON.
2. Configure a view with UI components.
3. Render the form using `FormViewer`.
4. Handle form data and events.

The system is designed to be:

- **UI-Agnostic**: Works with any React UI library.
- **Declarative**: Define forms in JSON, not imperative code.
- **Reactive**: Automatic updates when data changes.
- **Extensible**: Customize every aspect of form behavior.

## Basic Form Rendering

### The FormViewer Component

The `FormViewer` component is the core of form rendering in FormEngine. It takes a form definition and renders it using the specified UI
components.

```tsx
import {FormViewer} from '@react-form-builder/core'
import {view as muiView} from '@react-form-builder/components-material-ui'

const form = {/* your form here */}
const getForm = useCallback(() => JSON.stringify(form), [form])

const App = () => (
  <FormViewer
    view={muiView}
    getForm={getForm}
  />
)
```

### Main Properties

| Property      | Type            | Description                               | Required |
|---------------|-----------------|-------------------------------------------|----------|
| `view`        | `View`          | UI component configuration                | Yes      |
| `getForm`     | `() => string`  | Function returning form JSON, stringified | Yes      |
| `actions`     | `CustomActions` | Custom action handlers                    | No       |
| `initialData` | `FormData`      | Initial form data                         | No       |
| `language`    | `string`        | Language code for localization            | No       |

## Form JSON Structure

### Basic Form Definition

Forms are defined as JSON objects with a specific structure:

```json
{
  "version": "1",
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "firstName",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "First name"
          },
          "helperText": {
            "value": "Enter your first name"
          }
        }
      },
      {
        "key": "lastName",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Last name"
          }
        }
      }
    ]
  },
  "localization": {},
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

### Key Sections

1. **`version`**: Form definition version (currently "1", optional).
2. **`errorType`**: Error display component type.
3. **`form`**: Root form structure with components.
4. **`localization`**: Translation strings (optional).
5. **`languages`**: Supported languages (optional).
6. **`defaultLanguage`**: Default language code (optional).

### Component Structure

Each component in the form has:

```json
{
  "key": "uniqueComponentId",
  "dataKey": "formComponentKey",
  "type": "ComponentType",
  "props": {
    "propertyName": {
      "value": "propertyValue"
    }
  },
  "children": [],
  "events": {},
  "schema": {},
  "css": {}
}
```

1. **`key`**: The unique identifier of the component on the form.
2. **`dataKey`**: The key of the component in the form (optional), if not specified, the key field is used.
3. **`type`**: The component type.
4. **`props`**: The component properties (optional).
5. **`children`**: The component children (optional).
6. **`events`**: Mapping component events to event handlers (optional).
7. **`schema`**: Validators used by the component (optional).
8. **`css`**: Component Styles (optional).

## View Configuration

### What is a View?

A view is a collection of UI components that FormEngine uses to render forms. It maps component types (like "MuiTextField") to actual React
components.

### Using Pre-Built Views

FormEngine provides pre-built views for popular UI libraries:

```typescript
// React Suite components
import {viewWithCss} from '@react-form-builder/components-rsuite'

// Material UI components
import {view as muiView} from '@react-form-builder/components-material-ui'

// Material UI components (custom configuration)
import {muiView} from './custom-views/mui-view'

// Ant Design components (custom configuration)
import {antdView} from './custom-views/antd-view'
```

### Creating Custom Views

You can create custom views by combining components:

```typescript
import {createView} from '@react-form-builder/core'
import {myInput} from './components/MyInput'
import {myButton} from './components/MyButton'

export const myCustomView = createView([myInput, myButton]);
```

## Rendering Modes

### Basic Rendering

The simplest way to render a form:

```jsx live
function SimpleForm() {
  const formJson = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "firstName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "First name"
            },
            "helperText": {
              "value": "Enter your first name"
            }
          }
        },
        {
          "key": "lastName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Last name"
            }
          }
        }
      ]
    },
    "localization": {},
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }

  return (
    <FormViewer
      view={muiView}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

### With Initial Data

Pre-populate form fields with data:

```jsx live
function SimpleForm() {
  const formJson = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "firstName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "First name"
            },
            "helperText": {
              "value": "Enter your first name"
            }
          }
        },
        {
          "key": "lastName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Last name"
            }
          }
        }
      ]
    },
    "localization": {},
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }

  const initialData = {
    firstName: 'John',
    lastName: 'Doe',
  }

  return (
    <FormViewer
      view={muiView}
      getForm={() => JSON.stringify(formJson)}
      initialData={initialData}
    />
  )
}
```

### With Custom Actions

Add interactive behavior to forms:

```jsx live
function SimpleForm() {
  const formJson = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "firstName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "First name"
            },
            "helperText": {
              "value": "Enter your first name"
            }
          }
        },
        {
          "key": "lastName",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Last name"
            }
          }
        },
        {
          "key": "muiButtonGroup1",
          "type": "MuiButtonGroup",
          "props": {},
          "css": {
            "any": {
              "string": "  gap: 10px;"
            }
          },
          "children": [
            {
              "key": "submitButton",
              "type": "MuiButton",
              "props": {
                "children": {
                  "value": "Submit"
                },
                "color": {
                  "value": "primary"
                }
              },
              "events": {
                "onClick": [
                  {
                    "name": "onSubmit",
                    "type": "custom"
                  }
                ]
              }
            },
            {
              "key": "resetButton",
              "type": "MuiButton",
              "props": {
                "color": {
                  "value": "secondary"
                },
                "disableElevation": {
                  "value": false
                },
                "children": {
                  "value": "Reset"
                }
              },
              "events": {
                "onClick": [
                  {
                    "name": "reset",
                    "type": "common"
                  }
                ]
              }
            }
          ]
        }
      ]
    },
    "localization": {},
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }

  const customActions = {
    onSubmit: (event) => {
      console.log('Form data:', JSON.stringify(event.data))
      alert('Form submitted!')
    }
  }

  return (
    <FormViewer
      view={muiView}
      getForm={() => JSON.stringify(formJson)}
      actions={customActions}
    />
  )
}
```

## Programmatic Form Building

### Using the Builder API

Instead of writing JSON manually, you can use the builder API:

```jsx live
function SimpleForm() {
  const formJson = buildForm({errorType: 'MuiErrorWrapper'})
    .component('firstName', 'MuiTextField')
    .prop('label', 'First name')
    .prop('helperText', 'Enter first name')
    .validation('required')

    .component('lastName', 'MuiTextField')
    .prop('label', 'Last name')
    .prop('helperText', 'Enter last name')
    .validation('required')

    .component('submit', 'MuiButton')
    .prop('children', 'Submit')
    .event('onClick')
    .commonAction('validate').args({failOnError: true})
    .customAction('onSubmit')

    .json()

  const customActions = {
    onSubmit: (event) => {
      console.log('Form data:', JSON.stringify(event.data))
      alert('Form submitted!')
    }
  };

  return (
    <FormViewer
      view={muiView}
      getForm={() => formJson}
      actions={customActions}
    />
  )
}
```

### Dynamic Form Generation

Generate forms based on dynamic data:

```typescript
const generateFormFromSchema = (schema) => {
  const builder = buildForm({errorType: 'MuiErrorWrapper'});

  schema.fields.forEach((field) => {
    builder.component(field.id, field.type)
      .prop('label', field.label)
      .prop('helperText', field.placeholder);

    if (field.required) {
      builder.validation('required');
    }
  });

  return builder.json();
};
```

## Advanced Rendering Concepts

### Conditional Rendering

Show/hide components based on conditions. The example below uses the `renderWhen` property to conditionally draw a group of components. If
`form.data.showGroupSwitch` is set to `true`, then the components are displayed.

```jsx live
function SimpleForm() {
  const form = {
    "tooltipType": "MuiTooltip",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "showGroupSwitch",
          "type": "MuiFormControlLabel",
          "props": {
            "control": {
              "value": "Switch"
            },
            "label": {
              "value": "Click me"
            }
          }
        },
        {
          "key": "muiStack1",
          "type": "MuiStack",
          "props": {
            "useFlexGap": {
              "value": true
            }
          },
          "children": [
            {
              "key": "muiTypography1",
              "type": "MuiTypography",
              "props": {
                "children": {
                  "value": "This group of components is visible only if the switch is on"
                }
              }
            },
            {
              "key": "progress",
              "type": "MuiLinearProgress",
              "props": {}
            }
          ],
          "css": {
            "any": {
              "string": "  gap: 10px;"
            }
          },
          "renderWhen": {
            "value": "form.data.showGroupSwitch"
          }
        }
      ]
    },
    "localization": {},
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }

  return (
    <FormViewer
      view={muiView}
      getForm={() => JSON.stringify(form)}
    />
  )
}
```

### Computed Properties

Dynamically compute property values. The children property of the `muiTypography1` component is calculated on the fly using a JavaScript
function.

```jsx live
function SimpleForm() {
  const form = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "required"
              },
              {
                "key": "email"
              }
            ]
          }
        },
        {
          "key": "checkbox",
          "type": "MuiFormControlLabel",
          "props": {
            "control": {
              "value": "Checkbox"
            },
            "label": {
              "value": "Checkbox"
            }
          }
        },
        {
          "key": "muiTypography1",
          "type": "MuiTypography",
          "props": {
            "children": {
              "computeType": "function",
              "fnSource": "  const email = form.data.email ?? ''\n  const checked = form.data.checkbox === true\n  return `Your email: '${email}', checkbox is ${checked ? 'checked' : 'unchecked'}`"
            }
          }
        }
      ]
    },
    "localization": {},
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }

  return (
    <FormViewer
      view={muiView}
      getForm={() => JSON.stringify(form)}
    />
  )
}
```

### Multiple Fields with Same Data Key

Demonstrate how multiple form fields can be bound to the same data key, enabling synchronized data updates across multiple components. In
this example, two text fields and a typography component share the same `dataKey` "sharedText". Changing either text field updates the
shared value, which is reflected in both fields and the typography display.

```jsx live
function SimpleForm() {
  const form = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "primaryInput",
          "dataKey": "sharedText",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Primary Input"
            },
            "helperText": {
              "value": "Changes here update both fields"
            }
          }
        },
        {
          "key": "secondaryInput",
          "dataKey": "sharedText",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Secondary Input"
            },
            "helperText": {
              "value": "Also bound to sharedText"
            }
          }
        },
        {
          "key": "display",
          "dataKey": "sharedText",
          "type": "MuiTypography"
        }
      ]
    }
  }

  return (
    <FormViewer
      view={muiView}
      getForm={() => JSON.stringify(form)}
    />
  )
}
```

**How it works:**

1. **Data Binding**: Each component's `dataKey` property links it to a specific key in the form's data model (`sharedText` in this case).
2. **Synchronization**: When a user types in either text field, the form engine updates the shared data value, which automatically
   propagates to all components bound to that key.
3. **Use Cases**: This pattern is useful for creating mirrored inputs, summary displays, or when multiple UI elements need to reflect the
   same underlying data.

## Integration Examples

### With React State Management

```jsx live
function SimpleForm() {
  const form = useMemo(() => ({
    'tooltipType': 'MuiTooltip',
    'errorType': 'MuiErrorWrapper',
    'form': {
      'key': 'Screen',
      'type': 'Screen',
      'props': {},
      'children': [
        {
          'key': 'firstName',
          'type': 'MuiTextField',
          'props': {
            'label': {
              'value': 'First name'
            },
            'helperText': {
              'value': 'Enter your first name'
            }
          }
        },
        {
          'key': 'lastName',
          'type': 'MuiTextField',
          'props': {
            'label': {
              'value': 'Last name'
            }
          }
        },
        {
          'key': 'submitButton',
          'type': 'MuiButton',
          'props': {
            'children': {
              'value': 'Submit'
            },
            'loading': {
              'computeType': 'function',
              'fnSource': 'return form.state.isSubmitting === true'
            }
          },
          'events': {
            'onClick': [
              {
                'name': 'onSubmit',
                'type': 'custom'
              }
            ]
          }
        }
      ]
    },
    'localization': {},
    'languages': [
      {
        'code': 'en',
        'dialect': 'US',
        'name': 'English',
        'description': 'American English',
        'bidi': 'ltr'
      }
    ],
    'defaultLanguage': 'en-US'
  }), [])

  const [formData, setFormData] = useState({})

  const wait = useCallback(async (ms) => {
    await new Promise((res) => setTimeout(res, ms))
  }, [])

  const submitFormData = useCallback(async (data) => {
    console.info('Submitting...', JSON.stringify(data))
    await wait(1000)
    console.info('The data has been sent')
    return {firstName: 'All', lastName: 'OK'}
  }, [wait])

  const handleSubmit = useCallback(async (event) => {
    const userState = event.store.formData.state
    userState.isSubmitting = true

    try {
      const response = await submitFormData(event.data)
      setFormData(response)
    } catch (error) {
      console.error('Submission failed:', error)
    } finally {
      userState.isSubmitting = false
    }
  }, [submitFormData])

  const customActions = useMemo(() => ({
    onSubmit: handleSubmit,
  }), [handleSubmit])

  const onFormDataChange = (formData) => {
    const {data, errors} = formData
    console.log('onFormDataChanged:\n', 'data: ', data, '\n', 'errors: ', errors)
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return (
    <FormViewer
      view={muiView}
      getForm={getForm}
      actions={customActions}
      initialData={formData}
      onFormDataChange={onFormDataChange}
    />
  )
}
```

### With Routing Libraries

```tsx
import {useNavigate} from 'react-router-dom';

const RoutedForm = () => {
  const navigate = useNavigate();

  const customActions = {
    onSubmit: (event) => {
      // Save form data
      saveFormData(event.data);
      // Navigate to success page
      navigate('/success');
    },
    onCancel: () => {
      navigate('/dashboard');
    }
  };

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(form)}
      actions={customActions}
    />
  );
};
```

### With External APIs

```tsx
const ApiIntegratedForm = () => {
  const [formConfig, setFormConfig] = useState(null);

  useEffect(() => {
    // Load form configuration from API
    fetch('/api/form-config')
      .then(res => res.json())
      .then(setFormConfig);
  }, []);

  if (!formConfig) return <div>Loading form configuration...</div>;

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formConfig)}
      actions={apiActions}
    />
  );
};
```

## Troubleshooting

### Common Issues

1. **Form Not Rendering**

- Make sure that the `getForm` function returns the correct string JSON.
- Verify the view contains all required component types.
- Ensure form JSON has proper structure.

2. **Components Not Appearing**

- Verify component types exist in the view.
- Check for visibility conditions.
- Ensure components have required properties.

3. **Events Not Firing**

- Confirm event names match component prop names.
- Check that actions are properly defined.
- Verify no validation errors are blocking events.

### Debugging Tips

```typescript
// Add debug logging to actions
const debugActions = {
  logFormState: (event) => {
    console.log('Form data:', event.data);
  }
};

// Use React DevTools to inspect component props
// Check browser console for FormEngine warnings
```

### Getting Help

If you encounter issues:

1. **Check the documentation** for your specific use case.
2. **Review form JSON** for syntax errors.
3. **Test with minimal example** to isolate the issue.
4. **Consult the community** on GitHub discussions.
5. **File an issue** with reproducible example.


---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Handling form data](/formengine-core/handling-form-data)
- [Validation](/formengine-core/validation)
- [Actions and events](/formengine-core/actions-and-events)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Styling components and forms](/formengine-core/styling-components-and-forms)
