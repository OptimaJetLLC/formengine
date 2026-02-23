---
description: 'Create custom form components for FormEngine: integrate third-party
  libraries, build specialized inputs, and extend FormEngine with your own React components.'
sidebar_label: Custom Components
title: Build Custom Form Components - Extend FormEngine
---

# Build Custom Form Components - Extend FormEngine

Custom components are the heart of FormEngine Core's extensibility. They allow you to create reusable UI elements that integrate seamlessly
with the form system, providing custom functionality while leveraging FormEngine's powerful features like data binding, validation, and
event handling.

## What Are Custom Components?

Custom components are React components that you wrap with FormEngine's [define](/api-reference/@react-form-builder/core/variables/define)
function to make them available in the form viewer. Once defined, they can be used in JSON form definitions just like built-in components.

**Example: Simple Custom Button**

```tsx
import {define, event, string} from '@react-form-builder/core'

// simple custom button component
const MyButton = (props: any) => (
  <button {...props}/>
)

// defining the metadata of a simple button via the define function
const myButton = define(MyButton, 'MyButton')
  .props({
    children: string.default('Click Me'),
    onClick: event
  })
  .build()
```

Now you can use it in your form JSON:

```json
{
  "key": "submitButton",
  "type": "MyButton",
  "props": {
    "children": {
      "value": "Submit Form"
    }
  }
}
```

```jsx live
function App() {
  // simple custom button component
  const MyButton = (props) => (
    <button {...props}/>
  )

  // defining the metadata of a simple button via the define function
  const myButton = define(MyButton, 'MyButton')
    .props({
      children: string.default('Click Me'),
      onClick: event
    })
    .build()
  
  // creating a view, set of components for displaying a form
  const myView = createView([myButton.model])

  const form = {
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'submitButton',
          type: 'MyButton',
          props: {
            children: {
              value: 'Submit Form'
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={myView}
    getForm={getForm}
  />
}
```

## Why Create Custom Components?

### 1. Unique UI Requirements

Your application may need specialized UI elements that aren't available in standard component libraries.

```tsx
// A signature pad component for digital signatures
const SignaturePad = ({value, onChange}) => {
  const canvasRef = useRef()

  // Signature drawing logic...
  return <canvas ref={canvasRef}/>
}

export const signaturePad = define(SignaturePad, 'SignaturePad')
  .props({
    value: string.valued, // Data binding support
    onChange: event
  })
```

### 2. Business Logic Encapsulation

Embed business logic directly in components for consistency.

```tsx
// A product selector that fetches products from your API
const ProductSelector = ({category, onProductSelect}) => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`/api/products?category=${category}`)
      .then(res => res.json())
      .then(setProducts);
  }, [category])

  return (
    <select onChange={e => onProductSelect(e.target.value)}>
      {products.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  )
}
```

### 3. Third-Party Integration

Wrap third-party React components to use them in your forms.

```tsx
import {DatePicker} from 'some-date-library'

const WrappedDatePicker = ({value, onChange, ...props}) => (
  <DatePicker
    value={value}
    onDateChange={onChange}
    {...props}
  />
)

export const customDatePicker = define(WrappedDatePicker, 'CustomDatePicker')
  .props({
    value: date.valued,
    onChange: event,
    minDate: string,
    maxDate: string
  })
```

### 4. Consistent Branding

Ensure all form elements match your design system.

```tsx
// A branded button that matches your company's design
const BrandedButton = ({children, variant, ...props}) => (
  <button
    className={`branded-btn branded-btn--${variant}`}
    {...props}
  >
    <span className="branded-btn__icon">🔷</span>
    {children}
  </button>
);

export const brandedButton = define(BrandedButton, 'BrandedButton')
  .props({
    children: string,
    variant: oneOf('primary', 'secondary', 'danger').default('primary')
  });
```

## Component Development Journey

This guide will walk you through creating custom components of increasing complexity:

### 📖 Section 1: Getting Started

- Setting up your development environment
- Creating your first simple component
- Understanding the `define()` function
- Adding components to your view

### 📖 Section 2: Simple Components

- Components without data binding
- Working with basic props (string, number, boolean)
- Adding visual customization (CSS, styling)
- Component categories and organization

### 📖 Section 3: Valued Components (Data Binding)

- Understanding data binding concepts
- Creating components that read/write form data
- Using `valued` properties
- Two-way data synchronization

### 📖 Section 4: Components with Events

- Handling user interactions
- Creating custom events
- Event parameters and data
- Common action integration

### 📖 Section 5: Components with Validation

- Adding validation rules to components
- Displaying validation errors
- Custom validation logic
- Validation schemas

### 📖 Section 6: Advanced Patterns

- Composite components (components with children)
- Accessing form context
- Cross-component communication
- Performance optimization techniques

### 📖 Section 7: Component Lifecycle

- Mount/unmount events
- Data change detection
- Cleanup and resource management
- Using React hooks with FormEngine

### 📖 Section 8: Styling Custom Components

- Inline styles vs CSS classes
- Responsive design
- Theme integration
- CSS-in-JS approaches

### 📖 Section 9: Testing

- Unit testing components
- Integration testing with forms
- Mocking form context
- Test utilities and helpers

## Prerequisites

Before creating custom components, you should be familiar with:

- [React fundamentals](https://react.dev/learn) (components, props, hooks)
- [TypeScript basics](https://www.typescriptlang.org/docs/handbook/intro.html) (types, interfaces)
- [FormEngine Core concepts](/formengine-core) (forms, views, data binding)

## Getting Help

If you get stuck:

- Check the [API Reference](/api-reference) for detailed API documentation
- Review [Component Library](/components-library) for built-in component examples
- Look at the [source code on GitHub](https://github.com/optimajet/formengine)
- Ask questions in [GitHub Discussions](https://github.com/optimajet/formengine/discussions)

## Next Steps

Ready to start? Jump to [Getting Started](getting-started) to create your first custom component!

---

**Documentation Structure:**

- **Getting Started** → Basic setup and first component
- **Simple Components** → Static, display-only components
- **Valued Components** → Components with data binding
- **Components with Events** → Interactive components
- **Components with Validation** → Validated components
- **Advanced Patterns** → Complex component patterns
- **Component Lifecycle** → Lifecycle management
- **Styling** → Visual customization
- **Testing** → Quality assurance

Let's build something amazing! 🚀
