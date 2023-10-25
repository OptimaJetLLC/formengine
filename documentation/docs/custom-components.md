---
sidebar_position: 5
title: Custom components
slug: /custom-components
---

# Custom components

## Overview

Custom components in Form Builder are regular React components that are described using the Form Builder API. Describing a component using
the API makes it clear to the Form Builder designer which properties of the component can be edited and with which property editors.

To add a custom component to the Form Builder tool, you must do the following:

1. Have a custom component (obviously).
2. Describe your custom component using the Form Builder API.
3. Connect your component to the Form Builder designer.

Component description consists of defining meta-information about the component - component name, component type, component properties.
Meta-information on component properties in Form Builder is called an annotation.

Form Builder has the following APIs for describing a component:

1. [define](/api-reference/modules/react_form_builder_core#define) - is the primary method for defining a component.
2. [string](/api-reference/modules/react_form_builder_core#string) - annotation builder for properties of type `string`.
3. [boolean](/api-reference/modules/react_form_builder_core#boolean) - annotation builder for properties of type `boolean`.
4. [number](/api-reference/modules/react_form_builder_core#number) - annotation builder for properties of type `number`.
5. [size](/api-reference/modules/react_form_builder_core#size) - annotation builder for properties of type 'CSS unit'.
6. [date](/api-reference/modules/react_form_builder_core#date) - annotation builder for properties of type `Date`.
7. [array](/api-reference/modules/react_form_builder_core#array) - annotation builder for properties of type `array`.
8. [color](/api-reference/modules/react_form_builder_core#color) - annotation builder for properties of type `color`.
9. [className](/api-reference/modules/react_form_builder_core#classname) - annotation builder for properties containing the CSS class name.
10. [event](/api-reference/modules/react_form_builder_core#event) - annotation builder for properties of type `event`.
11. [node](/api-reference/modules/react_form_builder_core#node) - annotation builder for properties of type `ReactNode`.
12. [oneOf](/api-reference/modules/react_form_builder_core#oneof) - annotation builder for properties of type `enum`, the property value can
    only be one of enum.
13. [someOf](/api-reference/modules/react_form_builder_core#someof) - annotation builder for properties of type `enum`, the property value
    can contain multiple enum values.
14. There are other APIs for describing component properties, you can find them in the documentation, these APIs deal with describing
    synthetic properties of a component (e.g. a set of arbitrary HTML attributes).

## Example of a custom component definition

Well, let's describe some existing component from the popular [MUI](https://mui.com/) library. As an example, let's take a
[Button](https://mui.com/material-ui/api/button/):

```typescript
import {Button} from '@mui/material'
import {boolean, define, event, oneOf, string} from '@react-form-builder/core'

// Let's call our component matButton, using the prefix 'mat' to make it easy to understand
// from the name that the component belongs to the MUI library.
//
// Here we call the define function and pass it two parameters - the Button component
// and the unique name of the component type.
export const matButton = define(Button, 'MatButton')
  // component name displayed in the component panel in the designer
  .name('Button')
  // define the component properties that we want to edit in the designer
  .props({
    // button text
    children: string.named('Caption').default('Button'),
    // button color
    color: oneOf('inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'),
    // button disable flag
    disabled: boolean,
    // сallback fired when the button is clicked.
    onClick: event,
  })
```

## Example of an application with a custom component

Let's create a React application from scratch and connect this button to the application.

We will use [Create React App](https://create-react-app.dev/) to create the application. Open a shell and run the following commands:

### Creating an application that displays Form Builder

```bash
npx create-react-app my-app --template typescript
cd my-app
```

Then install the Form Builder dependencies:

```bash
npm install @react-form-builder/core @react-form-builder/designer
```

- @react-form-builder/core - this package is needed to define components and display them.
- @react-form-builder/designer - this package is the actual Form Builder designer.

Then open the file `src/index.tsx` and copy and paste the following contents into it (we have removed the styles imported from
the `index.css` file):

```tsx title='src/index.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
```

Now open the file `src/App.tsx` and copy and paste the following contents there:

```tsx title='src/App.tsx'
import React from 'react'
// highlight-next-line
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

// highlight-next-line
const builderView = new BuilderView([])

function App() {
  // highlight-next-line
  return <FormBuilder view={builderView}/>
}

export default App
```

Open a shell and run the application using the following command:

```bash
npm run start
```

Once the application is compiled, the Form Builder should appear on the web page:

![Custom components 01](/assets/custom-components/custom-components-01.png)

Now let's break down what we did.

1. Imported [BuilderView](/api-reference/classes/react_form_builder_core.BuilderView),
   [FormBuilder](/api-reference/modules/react_form_builder_designer#formbuilder) from `@react-form-builder/designer` package.
2. Created a `builderView` variable of type `BuilderView`. We passed an empty array as a parameter to the `BuilderView` constructor - this
   is an empty array with the component's metadata.
3. In the React component `App`, we rendered the `FormBuilder` component with the component metadata from the `builderView` variable.

### Adding a custom component

Open the shell and stop the application (Ctrl+C). Then add the `@mui/material` library with the following command:

```bash
npm install @mui/material
```

Create a file `src/MatButton.tsx` with the following contents (similar to the one discussed earlier in this article):

```tsx title='src/MatButton.tsx'
import {Button} from '@mui/material'
import {boolean, define, oneOf, string} from '@react-form-builder/core'

// Let's call our component matButton, using the prefix 'mat' to make it easy to understand
// from the name that the component belongs to the MUI library.
//
// Here we call the define function and pass it two parameters - the Button component
// and the unique name of the component type.
export const matButton = define(Button, 'MatButton')
  // component name displayed in the component panel in the designer
  .name('Button')
  // define the component properties that we want to edit in the designer
  .props({
    // button text
    children: string.named('Caption').default('Button'),
    // button color
    color: oneOf('inherit', 'primary', 'secondary', 'success', 'error', 'info', 'warning'),
    // button disable flag
    disabled: boolean,
    // сallback fired when the button is clicked.
    onClick: event,
  })
```

And now we only need to connect our custom component to `BuilderView`. To do this, we need to import our custom component into the
`src/App.tsx` file and add it to the array in the `BuilderView` constructor parameter. Take a look at the modified `src/App.tsx` file:

```tsx title='src/App.tsx'
import React from 'react'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
// highlight-next-line
import {matButton} from './MatButton'

// highlight-next-line
const builderView = new BuilderView([matButton.build()])

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

We use the `matButton.build()` method because the `matButton` variable is the component's metadata builder. After calling
the [build](/api-reference/classes/react_form_builder_core.Definer#build) method, we will
get an instance of [BuilderComponent](/api-reference/interfaces/react_form_builder_core.BuilderComponent), which contains the metadata
needed at design time and at runtime.

Now it's time to check how our component looks in the designer. Launch the application using the command:

```bash
npm run start
```

You will see in your browser that the component has appeared in the list of components on the left:

![Custom components 02](/assets/custom-components/custom-components-02.png)

Drag the component onto the form from the panel on the left, or add it using the "+" button. In the right pane, you can see that the
component properties we defined are available for editing:

![Custom components 03](/assets/custom-components/custom-components-03.png)

Now you can work with a custom component in the same way as inbuilt components, based on React Suite. By changing the properties of the
component we can see how the component changes on the form:

![Custom components 04](/assets/custom-components/custom-components-04.png)

### Form with custom component

After creating a form in the designer, you can copy (or download) the form code and pass the form code to
the [FormViewer](/api-reference/modules/react_form_builder_core#formviewer), a component for displaying forms. Here is an example of a form
with a custom component:

```json
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "MatButton 1",
        "type": "MatButton",
        "props": {
          "children": {
            "value": "Hello World!"
          },
          "color": {
            "value": "warning"
          }
        },
        "events": {
          "onClick": [
            {
              "name": "log",
              "type": "common"
            }
          ]
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

Let's display this form in the `FormViewer` component. Copy and paste the following code into the `src/App.tsx` file:

```tsx title='src/App.tsx'
// highlight-next-line
import {createView, FormViewer} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import React from 'react'
import {matButton} from './MatButton'

const builderView = new BuilderView([matButton.build()])

// highlight-next-line
const view = createView([matButton.build().model])

// highlight-start
const form = {
  'version': '1',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'MatButton 1',
        'type': 'MatButton',
        'props': {
          'children': {
            'value': 'Hello World!'
          },
          'color': {
            'value': 'warning'
          }
        },
        'events': {
          'onClick': [
            {
              'name': 'log',
              'type': 'common'
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
}

// highlight-end

function App() {
  // highlight-start
  // return <FormBuilder view={builderView}/>
  return <FormViewer view={view} getForm={() => JSON.stringify(form)}/>
  // highlight-end
}

export default App
```

Let's take a look at what has changed in the application:

1. Imported createView, [FormViewer](/api-reference/modules/react_form_builder_core#formviewer) from @react-form-builder/core package.
2. Created a set of metadata for `FormViewer` and saved it to a view variable. The `FormViewer` component does not need all the metadata of
   the component, what is in the `model` field is enough. The [createView](/api-reference/modules/react_form_builder_core#createview)
   function creates a [View](/api-reference/classes/react_form_builder_core.View) object that contains information about the components
   required to display the form.
3. Added a form and saved it to the `form` variable.
4. Finally, instead of the FormBuilder component, we rendered the FormViewer component, passing `view` and the `getForm` function to it.
   The `getForm` function should return a string containing the JSON of the form.

Opening the application in a browser you can see a simple form with a custom component. When you click on the component, the event is logged
to the console.

![Custom components 05](/assets/custom-components/custom-components-05.png)

### Custom component containing data

Okay, but what if we need a component that contains data? For that, we must also define a component, but we must also apply
the [valued](/api-reference/classes/react_form_builder_core.Annotation#valued) method to one of the component's properties. Once we do this,
Form Builder will realise that this property of the component contains its value. The component must also have an `onChange` property, which
must take the value of the component as a parameter.

To summarise, you need to:

1. Define one of the component properties as [valued](/api-reference/classes/react_form_builder_core.Annotation#valued).
2. Define a `onChange` functional property in the component, such as this:
   ```typescript
   onChange?: (value: any) => void
   ```

Let's add the [Input](https://mui.com/material-ui/api/input/) component to the designer. Note that this component already has a
[onChange](https://mui.com/material-ui/api/input-base/#InputBase-prop-onChange) property, and its signature doesn't fit Form Builder:

```typescript
function onChange(event: React.ChangeEvent): void
```

Well, we can just make a wrapper component and define everything we need in it. Create a file `src/MatInput.tsx` and add the following
content to it:

```tsx title='src/MatInput.tsx'
import {Input, InputProps} from '@mui/material'
import {define, string} from '@react-form-builder/core'

// highlight-start
type MatInputProps = InputProps & {
  onChange?: (value: any) => void
}
// highlight-end

const MatInput = (props: MatInputProps) => {
  const {onChange, ...otherProps} = props
  // highlight-start
  return <Input {...otherProps} onChange={event => {
    onChange?.(event.target.value)
  }}/>
  // highlight-end
}

export const matInput = define(MatInput, 'MatInput')
  .name('Input')
  .props({
    // highlight-next-line
    value: string.valued.default('')
  })
```

From the code above, you can see that:

1. We defined the `MatInputProps` type, which extends `InputProps` with the required `onChange` method.
2. We defined a `MatInput` component where we set the required behaviour for the `onChange` property.
3. We described the component by adding the `value` property as a string containing a value and having the default value of an empty string
   (this is to prevent React from writing errors about uncontrolled value to the console).

Now you can add this component to `src/App.tsx`. For simplicity only the code for the designer is shown:

```tsx
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import React from 'react'
import {matButton} from './MatButton'
// highlight-next-line
import {matInput} from './MatInput'

// highlight-next-line
const builderView = new BuilderView([matButton.build(), matInput.build()])

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

By launching the application and adding Input to the form, you can enter data into the Input component and observe how the data on the form
changes:

![Custom components 06](/assets/custom-components/custom-components-06.png)

## Conclusion

This article showed how to easily connect a custom component to use it in the designer. And also how a custom component is connected and
displayed on a form.
