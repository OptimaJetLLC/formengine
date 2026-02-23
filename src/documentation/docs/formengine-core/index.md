---
description: FormEngine Core is a free, MIT-licensed React library for rendering JSON-driven
  forms. Built-in validation, state management, and support for any UI library.
sidebar_label: FormEngine Core
sidebar_position: -50
slug: /formengine-core
title: FormEngine Core - React Form Library Documentation
---

# FormEngine Core - React Form Library Documentation

**@react-form-builder/core** is a free, open-source tool that helps you create beautiful, functional forms using Material UI
components without writing complex code. Build forms visually using simple JSON configuration and get fully functional, validated forms in
minutes.

## Why Choose FormEngine Core?

### 🎯 Perfect for Material UI

FormEngine Core is designed to work seamlessly with **@mui/material** components. If you're already using Material UI in
your React project, FormEngine Core will feel like a natural extension:

- Use familiar Material UI components (TextField, Button, Select, etc.)
- Maintain Material Design aesthetics automatically
- Consistent look and feel with your existing application

### ❤️ Perfect for your components library

FormEngine Core is designed to work seamlessly with **your custom component library**. Whether you use Chakra UI, Ant Design, Tailwind CSS
components, or your own design system, FormEngine Core provides the flexibility and extensibility you need:

- **Use any React component**: Integrate custom buttons, inputs, selects, and layouts from your existing library
- **Extensible type system**: Define custom component types with full TypeScript support and auto-completion
- **Preserve your design system**: Maintain consistent styling, spacing, and behavior across all forms
- **Full control over behavior**: Customize validation, event handling, and state management for each component
- **Future-proof architecture**: Easily adapt to new component libraries or design system updates

No need to rewrite your components - FormEngine Core works with what you already have while providing powerful form-building capabilities.

### ⚡ Build Forms Faster

Stop writing repetitive form code. With FormEngine Core, you can:

- Create complex forms in minutes, not hours
- Use simple JSON to define entire forms
- Automatically get validation, error handling, and state management
- Reuse components across multiple forms
- Update forms instantly without redeploying code

### ✅ Key Benefits

**For Developers:**

- Reduce development time
- Eliminate repetitive form boilerplate
- Built-in validation and error handling
- Type-safe with TypeScript support
- Easy to maintain and update

**For Your Users:**

- Smooth, responsive forms that work on any device
- Real-time validation provides instant feedback
- Accessible and user-friendly interface
- Fast loading and great performance

**For Your Business:**

- Completely free and open-source
- No licensing fees or restrictions
- Commercial-use friendly
- Active community support
- Full control over your forms

## What Can You Build?

FormEngine Core is incredibly versatile. Here are just a few examples:

### 📝 Contact Forms

Create beautiful contact forms with validation in under 5 minutes:

```jsx live
function App() {
  const contactForm = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "name",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Name"}
          },
          "schema": {
            "validations": [{"key": "required"}]
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Email address"}
          },
          "schema": {
            "validations": [
              {"key": "required"},
              {"key": "email"}
            ]
          }
        },
        {
          "key": "sendButton",
          "type": "MuiButton",
          "props": {
            "children": {"value": "Send message"}
          },
          "events": {
            "onClick": [
              {"name": "validate", "type": "common", "args": {"failOnError": true}},
              {"name": "onSubmit", "type": "custom"}
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(contactForm), [contactForm])

  const actions = useMemo(() => {
    return {
      onSubmit: (e) => {
        // submit the form to the backend
        alert('Form data: ' + JSON.stringify(e.data))
      },
    }
  }, [])

  return <FormViewer
    view={muiView}
    getForm={getForm}
    actions={actions}
  />
}
```

### 🛒 E-commerce Forms

Build order forms, checkout processes, and product configurators with complex logic:

- Dynamic pricing calculations
- Product customization options

### 📊 Business Applications

Create powerful data entry forms for internal tools:

- Employee onboarding forms
- Inventory management
- Project tracking
- Report generation

## How It Works

FormEngine Core uses a simple three-step process. FormEngine Core is designed to work with any React component library. The core engine
handles form state, validation, and logic, while the rendering is delegated to an external component library. This means you can use:

- Material UI
- React Suite
- Mantine
- Your custom component library

The component library can be any React component library, including your own custom components. This flexibility allows you to maintain your
design system while leveraging FormEngine Core's powerful form-building capabilities.

### 1. Define Your Form Structure

Create a JSON object that describes your form. Think of it as a blueprint:

```json
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "children": [
      {
        "key": "muiBox1",
        "type": "MuiBox",
        "props": {},
        "children": [
          {
            "key": "muiTextField1",
            "type": "MuiTextField",
            "props": {
              "label": {
                "value": "First name"
              }
            }
          }
        ]
      }
    ]
  }
}
```

### 2. Render Your Form

Use the FormViewer component to display your form:

```jsx
import {FormViewer} from '@react-form-builder/core'
import {view as muiView} from '@react-form-builder/components-material-ui'
import {myForm} from './myForm.json'

function MyApp() {
  return <FormViewer view={muiView} getForm={() => JSON.stringify(myForm)}/>
}
```

The `view` parameter is a component library adapter that maps JSON component types to actual React components. FormEngine Core is designed
to work with any React component library:

- Material UI: Beautiful Material Design forms
- React Suite: Enterprise-ready forms with React Suite
- Mantine: Modern forms with Mantine components
- Your Custom Components: Forms with your own design system

You can use pre-built adapters for popular UI libraries or create your own adapter to integrate with any component library, including your
company's design system.

### 3. That's It! 🎉

Your form is now live with:

- Automatic state management
- Built-in validation
- Responsive design
- Material UI styling
- Multi-Language Support

## Powerful Features Made Simple

### 📱 Responsive Design (Works on Any Device)

Forms automatically adapt to desktops, tablets, and mobile phones. No extra work needed!

```json
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "css": {
      "desktop": {
        "string": "padding: 30px;"
      },
      "mobile": {
        "string": "padding: 10px;"
      },
      "any": {
        "string": "padding: 20px;"
      }
    }
  }
}
```

### 🌍 Multi-Language Support

Easily create forms in multiple languages. Perfect for international applications:

```jsx live
function App() {
  const form = {
    "tooltipType": "MuiTooltip",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "muiTextField1",
          "type": "MuiTextField",
          "props": {
            "label": {
              "computeType": "localization"
            }
          }
        }
      ]
    },
    "localization": {
      "en-US": {
        "muiTextField1": {
          "component": {
            "label": "Name"
          }
        }
      },
      "es-ES": {
        "muiTextField1": {
          "component": {
            "label": "Nombre"
          }
        }
      },
      "fr-FR": {
        "muiTextField1": {
          "component": {
            "label": "Nom"
          }
        }
      }
    },
    "languages": [
      {
        "code": "en",
        "dialect": "US",
        "name": "English",
        "description": "American English",
        "bidi": "ltr"
      },
      {
        "code": "fr",
        "dialect": "FR",
        "name": "Français",
        "description": "French",
        "bidi": "ltr"
      },
      {
        "code": "es",
        "dialect": "ES",
        "name": "Español",
        "description": "Spanish",
        "bidi": "ltr"
      }
    ],
    "defaultLanguage": "en-US"
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
    language={'es-ES'}
  />
}
```

### ✅ Smart Validation

Add validation rules using build-in rules powered by Zod:

```jsx live
function App() {
  const form = {
    "errorType": "MuiErrorWrapper",
    "tooltipType": "MuiTooltip",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "muiTextField1",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Email"
            }
          },
          "schema": {
            "validations": [
              {
                "key": "email"
              }
            ]
          }
        },
        {
          "key": "validateButton",
          "type": "MuiButton",
          "props": {
            "children": {"value": "Validate"}
          },
          "events": {
            "onClick": [
              {"name": "validate", "type": "common"}
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

### 🎨 Beautiful Material UI Styling

All forms use Material UI components, ensuring they look professional and modern:

- Consistent with Google's Material Design
- Smooth animations and transitions
- Professional color schemes
- Accessible and user-friendly

### ⚡ Dynamic Behavior

Create smart forms that respond to user input:

```jsx live
function App() {
  const form = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "props": {},
      "children": [
        {
          "key": "hasDiscount",
          "type": "MuiFormControlLabel",
          "props": {
            "control": {
              "value": "Switch"
            },
            "label": {
              "value": "Has discount"
            }
          }
        },
        {
          "key": "muiTextField1",
          "type": "MuiTextField",
          "props": {
            "label": {
              "value": "Discount code"
            }
          },
          "renderWhen": {
            "value": "form.data.hasDiscount === true"
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

### 🎯 Event Handling

Easily handle form submissions and user interactions:

```jsx live
function App() {
  const contactForm = {
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "name",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Name"}
          },
          "schema": {
            "validations": [{"key": "required"}]
          }
        },
        {
          "key": "email",
          "type": "MuiTextField",
          "props": {
            "label": {"value": "Email address"}
          },
          "schema": {
            "validations": [
              {"key": "required"},
              {"key": "email"}
            ]
          }
        },
        {
          "key": "sendButton",
          "type": "MuiButton",
          "props": {
            "children": {"value": "Send message"}
          },
          "events": {
            "onClick": [
              {"name": "validate", "type": "common", "args": {"failOnError": true}},
              {"name": "onSubmit", "type": "custom"}
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(contactForm), [contactForm])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const actions = useMemo(() => {
    return {
      onSubmit: async (e) => {
        // wait for 1000 ms
        await sleep(1000)
        // submit the form to the backend
        alert('Form data: ' + JSON.stringify(e.data))
      },
    }
  }, [])

  return <FormViewer
    view={muiView}
    getForm={getForm}
    actions={actions}
  />
}
```

## Perfect for Material UI Projects

If you're already using **@mui/material**, FormEngine Core is the perfect companion. Just use ready-made components
**@react-form-builder/components-material-ui**.

### Maintain Material Design

Your forms will automatically inherit:

- Material UI's color system
- Typography settings
- Spacing and layout
- Component variants (outlined, filled, standard)
- Dark mode support

## What's Included

### 📦 Lightweight & Fast

- Small bundle size
- Tree-shakeable
- Only loads what you use

### 🔒 Reliable & Tested

- Comprehensive test coverage
- Production-ready
- Active maintenance
- Community support

### 📚 Complete Documentation

- Step-by-step guides
- Real-world examples
- API reference

## Who Is Using FormEngine Core?

FormEngine Core is trusted by:

- **Startups** building MVPs quickly
- **Enterprises** modernizing legacy systems
- **Agencies** delivering client projects faster
- **Developers** who value productivity
- **Teams** who need maintainable code

## Support & Community

- 📖 **[Documentation](/formengine-core)** - Get started with step-by-step guides
- 💬 **[GitHub Discussions](https://github.com/optimajet/formengine/discussions)** - Ask questions, share ideas
- 🐛 **[Issue Tracker](https://github.com/optimajet/formengine/issues)** - Report bugs, request features
- ⭐ **[Star on GitHub](https://github.com/optimajet/formengine)** - Show your support

## License

**Completely Free** - FormEngine Core is open-source and free for commercial use (MIT). No hidden costs, no restrictions, no attribution
required.

---

## Ready to Build Amazing Forms?

Start with the **[Installation Guide](/formengine-core/installation)** and create your first form in minutes!

import DocCardList from '@theme/DocCardList';

<DocCardList />
