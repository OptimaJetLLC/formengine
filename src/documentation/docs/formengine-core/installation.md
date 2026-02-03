---
sidebar_position: 0
sidebar_class_name: formengine-core-essential
title: Installation
description: Get FormEngine Core up and running in your React project in under 5 minutes with our simple installation guide
---

# Installation

Get FormEngine Core up and running in your React project in under 5 minutes. Whether you're starting a new project or adding it to an
existing one, we've got you covered.

## Quick Start

### Step 0: Create a new application (optional)

```bash
npm create vite@latest my-formengine-core-app -- --template react-ts
cd my-formengine-core-app
npm install
```

### Step 1: Install the Package

First, install FormEngine Core:

```bash
npm install @react-form-builder/core
```

### Step 2: Install Material UI

FormEngine Core works beautifully with Material UI components. If you want to use them (and we highly recommend you do!), install these
packages:

```bash
npm install @react-form-builder/components-material-ui @emotion/react @emotion/styled
```

### Step 3: Create Your First Form

Now for the fun part! Create a simple contact form by adding this code to your React component:

```jsx live
function App() {
  const form = useMemo(() => ({
    "actions": {
      "submitForm": {
        "body": "alert('Thank you for your message! ' + JSON.stringify(e.data));",
        "params": {}
      }
    },
    "tooltipType": "MuiTooltip",
    "errorType": "MuiErrorWrapper",
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "muiStack1",
          "type": "MuiStack",
          "props": {
            "spacing": {
              "value": "10px"
            }
          },
          "children": [
            {
              "key": "name",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Your name"
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
              "key": "email",
              "type": "MuiTextField",
              "props": {
                "label": {
                  "value": "Email address"
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
              "key": "message",
              "type": "MuiTextField",
              "props": {
                "multiline": {
                  "value": true
                },
                "label": {
                  "value": "Message"
                }
              }
            },
            {
              "key": "submit",
              "type": "MuiButton",
              "props": {
                "variant": {
                  "value": "contained"
                },
                "children": {
                  "value": "Send message"
                }
              },
              "events": {
                "onClick": [
                  {
                    "name": "validate",
                    "type": "common",
                    "args": {
                      "failOnError": true
                    }
                  },
                  {
                    "name": "submitForm",
                    "type": "code"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer
    view={muiView}
    getForm={getForm}
  />
}
```

### Step 4: Run Your Application

Start your development server:

```bash
npm run dev
```

Open your browser and navigate to http://localhost:5173/. You should see your beautiful, fully functional contact form! 🎉

## Framework-Specific Guides

FormEngine Core works with all popular React frameworks and build tools:

### Next.js

FormEngine Core is fully compatible with Next.js (both pages and app router):

1. Install FormEngine Core:
   ```bash
   npm install @react-form-builder/core
   ```
2. Install components library, for example Material UI:
   ```bash
   npm install @react-form-builder/components-material-ui @emotion/react @emotion/styled
   ```
3. Create your form component (client component):
   ```tsx
   'use client';
   
   import { view } from '@react-form-builder/components-material-ui';
   import { FormViewer } from '@react-form-builder/core';
   import { useCallback, useMemo } from 'react';
   
   export default function ContactForm() {
     const form = useMemo(() => ({
       // your form definition
     }), [])
   
     const getForm = useCallback(() => JSON.stringify(form), [form])
   
     return <FormViewer
       view={view}
       getForm={getForm}
     />
   }
   ```
4. Use it in your pages:
   ```tsx
   import ContactForm from "./ContactForm";
   
   export default function Home() {
     return <ContactForm/>
   }
   ```

### Remix (React Router)

FormEngine Core supports Remix seamlessly (Remix v2 is now part of the React Router):

1. Install FormEngine Core:
   ```bash
   npm install @react-form-builder/core
   ```
2. Install components library, for example Material UI:
   ```bash
   npm install @react-form-builder/components-material-ui @emotion/react @emotion/styled
   ```
3. Create your form component:
   ```tsx
   import { view } from '@react-form-builder/components-material-ui';
   import { FormViewer } from '@react-form-builder/core';
   import { useCallback, useMemo } from 'react';
   
   export default function MyForm() {
     const form = useMemo(() => ({
       // your form
     }), [])
   
     const getForm = useCallback(() => JSON.stringify(form), [form])
   
     return <FormViewer
       view={view}
       getForm={getForm}
     />
   }
   ```
4. Use it on your page:
   ```tsx
   import MyForm from "./MyForm";
   
   export function Welcome() {
     return <MyForm />;
   }
   ```

## Troubleshooting Installation

### Common Issues

**"Module not found" errors**

- Make sure you've installed all peer dependencies
- Try clearing your node_modules and reinstalling:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

**Material UI styles not applying**

- Ensure you have the Emotion packages installed:
  ```bash
  npm install @emotion/react @emotion/styled
  ```
- Check that you're using compatible versions of Material UI and React

**Form not rendering**

- Verify your JSON schema is valid
- Check the browser console for errors
- Make sure you're passing the `view` prop to FormViewer

**TypeScript errors**

- Ensure you're using TypeScript 5.3 or higher
- Check that your `tsconfig.json` includes `"jsx": "react-jsx"`

### Getting Help

If you're stuck, we're here to help:

- 🐛 **Open an issue on [GitHub](https://github.com/optimajet/formengine/issues)** for bugs
- 📧 **Email us at support@formengine.com** for personalized support
