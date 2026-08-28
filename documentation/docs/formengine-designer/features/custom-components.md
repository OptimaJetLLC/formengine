---
sidebar_position: 1
title: Custom components
slug: /formengine-designer/features/custom-components
description: Custom components in Form Builder are regular React components that are described using the Form Builder API
---

:::info For form authors

Custom palette items are built by developers-see [Custom components overview](designer-guide:advanced-topics/custom-components-overview/).
:::

## Custom components

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

1. [define](/api-reference/@react-form-builder/core/variables/define): is the primary method for defining a component.
2. [string](/api-reference/@react-form-builder/core/variables/string): annotation builder for properties of type `string`.
3. [boolean](/api-reference/@react-form-builder/core/variables/boolean): annotation builder for properties of type `boolean`.
4. [number](/api-reference/@react-form-builder/core/variables/number): annotation builder for properties of type `number`.
5. [size](/api-reference/@react-form-builder/core/variables/size): annotation builder for properties of type 'CSS unit'.
6. [date](/api-reference/@react-form-builder/core/variables/date): annotation builder for properties of type `Date`.
7. [time](/api-reference/@react-form-builder/core/variables/time): annotation builder for properties of type `Time`.
8. [array](/api-reference/@react-form-builder/core/variables/array): annotation builder for properties of type `array`.
9. [color](/api-reference/@react-form-builder/core/variables/color): annotation builder for properties of type `color`.
10. [className](/api-reference/@react-form-builder/core/variables/className): annotation builder for properties containing the CSS class
    name.
11. [event](/api-reference/@react-form-builder/core/variables/event): annotation builder for properties of type `event`.
12. [node](/api-reference/@react-form-builder/core/variables/node): annotation builder for properties of type `ReactNode`.
13. [oneOf](/api-reference/@react-form-builder/core/variables/oneOf): annotation builder for properties of type `enum`, the property value
    can only be one of enum.
14. [someOf](/api-reference/@react-form-builder/core/variables/someOf): annotation builder for properties of type `enum`, the property
    value can contain multiple enum values.
15. [readOnly](/api-reference/@react-form-builder/core/variables/readOnly): annotation builder for `boolean` properties that make a
    component read-only.
16. [required](/api-reference/@react-form-builder/core/variables/required): annotation builder for `boolean` properties that mark a field as
    required.
17. [fn](/api-reference/@react-form-builder/core/functions/fn): annotation builder for `function` properties.
18. There are other APIs for describing component properties, you can find them in the documentation, these APIs deal with describing
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
    // callback fired when the button is clicked.
    onClick: event,
  })
```

## Define a custom component from own component library

The definition from your own component is completely similar to the example. You can use any React component.

```tsx
import {define, event, string} from '@react-form-builder/core'

const MyButton = ({children, disabled, ...props}: ComponentProps<any>) => {
  return <button {...props} disabled={disabled}>{children}</button>
}

export const myButton = define(MyButton, 'MyButton')
  .name('My Button')
  .category('Custom')
  .props({
    // button text
    children: string.named('Caption').default('Button'),
    // callback fired when the button is clicked.
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

1. Imported [BuilderView](/api-reference/@react-form-builder/core/classes/BuilderView),
   [FormBuilder](/api-reference/@react-form-builder/designer/variables/FormBuilder) from `@react-form-builder/designer` package.
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
import {boolean, define, oneOf, string, event} from '@react-form-builder/core'

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
    // callback fired when the button is clicked.
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
the [build](/api-reference/@react-form-builder/core/interfaces/Definer#build) method, we will
get an instance of [BuilderComponent](/api-reference/@react-form-builder/core/interfaces/BuilderComponent), which contains the metadata
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
the [FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer), a component for displaying forms. Here is an example of a
form with a custom component:

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

1. Imported createView, [FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer) from @react-form-builder/core package.
2. Created a set of metadata for `FormViewer` and saved it to a view variable. The `FormViewer` component does not need all the metadata of
   the component, what is in the `model` field is enough. The [createView](/api-reference/@react-form-builder/core/variables/createView)
   function creates a [View](/api-reference/@react-form-builder/core/classes/View) object that contains information about the components
   required to display the form.
3. Added a form and saved it to the `form` variable.
4. Finally, instead of the FormBuilder component, we rendered the FormViewer component, passing `view` and the `getForm` function to it.
   The `getForm` function should return a string containing the JSON of the form.

Opening the application in a browser you can see a simple form with a custom component. When you click on the component, the event is logged
to the console.

![Custom components 05](/assets/custom-components/custom-components-05.png)

### Custom component containing data

Okay, but what if we need a component that contains data? For that, we must also define a component, but we must also apply
the [valued](/api-reference/@react-form-builder/core/classes/Annotation#valued) method to one of the component's properties. Once we do
this, Form Builder will realise that this property of the component contains its value. The component must also have an `onChange` property,
which must take the value of the component as a parameter.

To summarise, you need to:

1. Define one of the component properties as [valued](/api-reference/@react-form-builder/core/classes/Annotation#valued).
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

```tsx title='src/MatInput.tsx' {6-8,13-15,17,23}
import type {InputProps} from '@mui/material'
import {Input} from '@mui/material'
import {define, string} from '@react-form-builder/core'
import {useCallback} from 'react'

type MatInputProps = InputProps & {
  onChange?: (value: any) => void
}

const MatInput = (props: MatInputProps) => {
  const {onChange, ...otherProps} = props

  const handleChange = useCallback((event: any) => {
    onChange?.(event.target.value)
  }, [onChange])

  return <Input {...otherProps} onChange={handleChange}/>
}

export const matInput = define(MatInput, 'MatInput')
  .name('Input')
  .props({
    value: string.valued.uncontrolledValue('')
  })
```

From the code above, you can see that:

1. We defined the `MatInputProps` type, which extends `InputProps` with the required `onChange` method.
2. We defined a `MatInput` component where we set the required behaviour for the `onChange` property.
3. We described the component by adding the `value` property as a string containing a value and having the default value of an empty string
   (this is to prevent React from writing errors about uncontrolled value to the console).

### Displaying errors inside a custom component

By default, FormEngine [wraps](/formengine-designer/features/component-styling#structure) each component in an
external [error wrapper](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#errorwrapper), responsible for displaying
validation messages. If you want the error to appear inside the component itself rather than outside, you can disable this mechanism and
implement your own error display.

1. To remove the external wrapper, provide a custom `errorWrapper` that simply renders nothing.
2. Inside a custom component, FormEngine provides the [useErrorMessage](/api-reference/@react-form-builder/core/functions/useErrorMessage)
   hook. It returns the error message associated with the current field.

Example:

```tsx
import {define, string, useErrorMessage} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import type {ChangeEvent, InputHTMLAttributes, LabelHTMLAttributes} from 'react'
import {useCallback, useMemo} from 'react'

type MyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (value: string) => void
}

const MyInput = ({onChange, ...props}: MyInputProps) => {
// highlight-next-line
  const error = useErrorMessage()

  const style = useMemo(() => {
    return error ? {color: 'red'} : undefined
  }, [error])

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }, [onChange])

  return <div style={style}>
    <input onChange={handleChange} {...props}/>
    {!!error && <div>{error}</div>}
  </div>
}

const myInput = define(MyInput, 'MyInput')
  .props({
    value: string.valued.uncontrolledValue('')
  })

const builderView = new BuilderView([myInput.build()])
// highlight-next-line
const NoErrorWrapper = (props: ErrorWrapperProps) => <div {...props}/>

function App() {
  return <FormBuilder view={builderView} errorWrapper={NoErrorWrapper}/>
}
```

Now `MyInput` manages its own error display, and the external `errorWrapper` does not interfere:

![Displaying errors inside a custom component](/assets/custom-components/custom-components-11.png)

### Override event handlers

An alternative way is to [define event handlers](/api-reference/@react-form-builder/core/interfaces/Definer#overrideeventhandlers) in the
component description:

```tsx title='src/MatInput.tsx' {8,10-19}
import {Input} from '@mui/material'
import type {ActionEventArgs} from '@react-form-builder/core'
import {define, string} from '@react-form-builder/core'

export const matInput = define(Input, 'MatInput')
  .name('Input')
  .props({
    value: string.valued.uncontrolledValue('')
  })
  .overrideEventHandlers({
    onChange: (e: ActionEventArgs) => {
      const value = e.args[0].target.value
      e.sender.field?.setValue(value)
    },
    // optional, to track the touched field property
    onBlur: (e: ActionEventArgs) => {
      e.sender.field?.setTouched()
    },
  })
```

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

### One-way data binding

Sometimes you just need to bind one of the component properties to the form data, but in such a way that the component cannot change the
form data. In this case, the [valued](/api-reference/@react-form-builder/core/classes/BaseBuilder#valued) method may not be suitable for
you. Then you can use the [dataBound](/api-reference/@react-form-builder/core/classes/BaseBuilder#databound) method, which binds the
component property to the form data. For binding, you also need to define the
component's [dataKey](/api-reference/@react-form-builder/core/classes/ComponentStore#datakey) property to specify which form field the
binding will be made to.

:::tip

Binding of a component property to the form data can also be done
using [computed properties](/formengine-designer/features/computed-properties).

Using the Designer, you can also create [presets](/formengine-designer/features/presets-components) for components.

:::

Here is a simple example of two components, one of which uses one-way binding:

```typescript jsx {26,27,33,34}
import {define, string} from '@react-form-builder/core'
import type {ChangeEvent, InputHTMLAttributes, LabelHTMLAttributes} from 'react'
import {useCallback} from 'react'

type MyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange?: (value: string) => void
}

const MyInput = (props: MyInputProps) => {
  const {onChange, ...otherProps} = props

  const onChangeHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value)
  }, [onChange])

  return <input {...otherProps} onChange={onChangeHandler} />
}

const MyLabel = (props: LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props} />
}

export const myInput = define(MyInput, 'MyInput')
  .name('My input')
  .props({
    // two-way data binding
    value: string.valued
  })

export const myLabel = define(MyLabel, 'MyLabel')
  .name('My label')
  .props({
    // one-way data binding
    children: string.default('Label').dataBound
  })
```

Using the components above, we can create a form with an input field and two components displaying the data of this input field, as shown in
the screenshot below:

![A one-way data binding form](/assets/custom-components/custom-components-08.png "A one-way data binding form")

```json title='Example of a one-way data binding form' {9,10,18-20,29-31}
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "input",
        "type": "MyInput",
        "props": {
          "value": {
            "value": "test"
          }
        }
      },
      {
        "key": "myLabel1",
        "type": "MyLabel",
        "dataKey": "input",
        "props": {},
        "css": {
          "any": {
            "string": "  color: blue;"
          }
        }
      },
      {
        "key": "myLabel2",
        "dataKey": "input",
        "type": "MyLabel",
        "props": {},
        "css": {
          "any": {
            "string": "  color: green;"
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

### Functional properties

There are [rare cases](https://rsuitejs.com/components/auto-complete/#code-lt-auto-complete-gt-code) where a component takes a function as a
property value. In such a case, you can define the component property as a [function](/api-reference/@react-form-builder/core/functions/fn)
and describe the function parameters to edit the function code in the Designer. See the example below:

```typescript jsx title='Functional property example' {1-4,6-11,16}
interface RsAutoCompleteProps {
  /** Custom filter function to determine whether the item will be displayed */
  filterBy?: (value: string, item: ItemDataType) => boolean;
}

const filterByFnDescriptionBegin = `/**
 * @param {string} value
 * @param {ItemDataType} item
 * @return {boolean}
 */
function filterBy(value, item) {`

export const rsAutoComplete = define(RsAutoComplete, 'RsAutoComplete')
  .props({
    label: string.default('Input'),
    filterBy: fn(filterByFnDescriptionBegin),
    value: string.valued.uncontrolledValue(''),
  })
```

![Functional property](/assets/custom-components/custom-components-09.png "Functional property")

### Kind of a component

Also, in some cases, you may need to set the [`kind`](/api-reference/@react-form-builder/core/interfaces/Definer#kind) of the component.
This is a property that shows [how to render](/formengine-designer/features/component-styling#structure) the component. For regular components, it is set to `'component'` by
default. You can the `kind` value to `'container'` in case you need the component to be only a container, for its children, without having
its own wrappers.

```typescript
const myContainer = define(MyContainer)
  .type('MyContainer')
  .name('Container')
  // highlight-next-line
  .kind('container')
  .props({children: node})
  .css({
    flexDirection: flexDirection.default('column'),
    gap: gap.default('10px')
  })
```

:::info

To ensure proper behavior of the container in designer mode, the component must support refs. Wrap it with `React.forwardRef` (for React
versions below 19) and attach the received ref to the outermost DOM element of the component.

:::

```tsx
const MyContainer = forwardRef((props: ComponentProps, ref: ForwardedRef) => {
  const {children, ...otherProps} = props
  return <div {...otherProps} ref={ref}>
    {children}
  </div>
})
```

### Component role

There are several components that play a special [role](/api-reference/@react-form-builder/core/type-aliases/ComponentRole) in the form. For
example, a tooltip component or a component that displays an error message. To indicate that a custom component performs a specific role,
you can use the [componentRole](/api-reference/@react-form-builder/core/interfaces/Definer#componentrole) function. The tooltip components
and error-displaying components will also be available when configuring the form in the Designer.

```typescript {13,21} title='Example of a component role'
export const rsTooltip = define(RsTooltip, 'RsTooltip')
  .name('Tooltip')
  .props({
    text: string.required.default('Tooltip message...').hinted('Tooltip text').dataBound,
    children: node,
    placement: oneOf('top', 'bottom', 'right', 'left', 'bottomStart', 'bottomEnd',
      'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd', 'auto',
      'autoVertical', 'autoVerticalStart', 'autoVerticalEnd', 'autoHorizontal', 'autoHorizontalStart')
      .required.default('bottom'),
    trigger: someOf('click', 'hover', 'focus', 'active', 'contextMenu')
      .required.default(['hover'])
  })
  .componentRole('tooltip')

export const rsErrorMessage = define(RsErrorMessage, 'RsErrorMessage')
  .name('Error message')
  .props({
    placement: placement.default('bottomStart'),
    className: string,
  })
  .componentRole('error-message')
```

![Custom components 10](/assets/custom-components/custom-components-10.png "Tooltip picker")

### Hidden component

You may want to hide some components from the component palette. You can mark a component as hidden in the component definition:

```typescript
export const rsErrorMessage = define(RsErrorMessage, 'RsErrorMessage')
  .name('Error message')
  .props({
    placement: placement.default('bottomStart'),
    className: string,
  })
  .componentRole('error-message')
  .hideFromComponentPalette()
```

You can also hide components or entire categories of components using
the [filter](/api-reference/@react-form-builder/core/classes/BuilderView#withpalettefilter) function
in [BuilderView](/api-reference/@react-form-builder/core/classes/BuilderView). Example:

```typescript
const view = new BuilderView(components)
  .withPaletteFilter(({category, model}) => {
    return !(category === 'templates' || model.type === 'RsAutoComplete')
  })
```

### Disable component remove

You may want to prevent some components from being removed from the form. You can mark a component as non-removable in the component
definition using the [disableRemove](/api-reference/@react-form-builder/core/interfaces/Definer#disableremove) function:

```typescript
export const rsHeader = define(MyHeader, 'MyHeader')
  .name('Header')
  .props({
    className: string
  })
  .disableRemove()
```

### Component icon

If you want to change the component icon that is displayed next to the component name, it is quite easy to do so. Just call
the [icon](/api-reference/@react-form-builder/core/interfaces/Definer#icon) method when selecting a component and pass React `ComponentType`
to it, which will draw the icon.

Illustrating example:

```typescript jsx {1-5,14} title='Component icon example' showLineNumbers
const MyIcon = () => {
  return <span style={
    {width: 16, height: 16, backgroundColor: 'rgba(150,130,20,0.5)', borderRadius: 8}
  }/>
}

const MyButton = (props: ComponentProps<any>) => {
  return <button>{props.children}</button>
}

const myButton = define(MyButton, 'MyButton')
  .name('My Button')
  .category('Custom')
  .icon(MyIcon)
```

This simple example shows how to connect an icon to a component. On lines 1-5, the React component `MyIcon` that displays the icon is
defined - in our case, it's just a circle. On line 14, the `MyIcon` component is connected as an icon for the `MyButton` component.

Once the component is connected to the designer, the component icon will be displayed next to the text:

![Custom components 07](/assets/custom-components/custom-components-07.png)

### Internationalization of components for the Designer

You can connect descriptions of components, their properties, and categories in various languages using
the [withComponentLibraryDescription](/api-reference/@react-form-builder/core/classes/BuilderView#withcomponentlibrarydescription)
function:

```typescript
const components = [/*your custom components/*/]

const componentsDescriptions = {
  'en-US': {
    categories: {
      myCategory: {
        name: 'My category',
      }
    },
    components: {
      MyComponent: {
        name: 'My component',
        props: {
          property: {
            name: 'My property',
            description: 'My property description',
          }
        }
      }
    }
  }
}

const view = new BuilderView(components)
  .withComponentLibraryDescription(componentsDescriptions)
```

## Conclusion

This article showed how to easily connect a custom component to use it in the designer. And also how a custom component is connected and
displayed on a form.
