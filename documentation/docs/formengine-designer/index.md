---
description: Visual form builder for React. Drag & drop interface to create forms
  without code. Export to JSON for FormEngine Core. Embed in your applications.
sidebar_label: FormEngine Designer
sidebar_position: -25
slug: /formengine-designer
title: FormEngine Designer - Visual Drag & Drop Form Builder
---

# FormEngine Designer - Visual Drag & Drop Form Builder

:::info[For form authors]

If you design forms in the visual UI **without writing code**, use the **[Form Author Guide](designer-guide:)** for step-by-step help: workspace tour, fields, validation, preview, and export.

:::

Form Builder is a client-side library for creating web forms. The library allows you to map a form from JSON to a dynamic HTML form and send
the results to your server. The library has no built-in visual components to display the form. Instead, it is made to display your
components. However, if you don't have your component set, there is a ready-made component set based on [React Suite](/components-library/)
to work with.

## Key features

- **UI-Agnostic Components:** Works seamlessly with any UI
  library ([MUI](https://mui.com/), [Ant Design](https://ant.design/), [shadcn/ui](https://ui.shadcn.com/)
  and [others](/formengine-designer/features/custom-components)).
- **Pre-Built React Suite Integration:** Includes a ready-to-use component
  library – [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite).
- Framework Support:
  - **Next.js Integration**: Seamlessly works with [Next.js](/usage-with-nextjs).
  - **Remix Compatibility**: Fully supports [Remix](/usage-with-remix).
  - **Framework-Agnostic**: Can also be used [without any framework](/formengine-designer/getting-started/installation#cdn) via CDN.
- **Multi-Database Support:** Compatible with MySQL, PostgreSQL, MongoDB, SQLite, and more.
- **Built-in Validation with Zod:** Includes pre-configured validation rules powered by [Zod](https://github.com/colinhacks/zod).
- **Extensible Validation Support:** Works
  with [Yup](https://github.com/jquense/yup), [AJV](https://github.com/ajv-validator/ajv), [Zod](https://github.com/colinhacks/zod),
  [Superstruct](https://github.com/ianstormtaylor/superstruct),
  [Joi](https://github.com/hapijs/joi), and other custom validation libraries.
- **Localization** - Powerful capabilities for localizing forms using [Fluent.js](https://projectfluent.org).
- **Responsive Layouts**: Build forms that automatically [adapt](/formengine-designer/features/adaptive-layout) to all screen sizes.
- **Custom Actions**: Enhance forms with interactive logic through [custom JavaScript code](/formengine-designer/features/actions).
- **Dynamic Properties**: Implement real-time component changes with [MobX](https://github.com/mobxjs/mobx)-powered reactive properties.
- **Flexible Storage Options**:
  - Store complete form definitions as JSON.
  - Programmatically generate forms [via code](/building-forms-via-code).

## Quick start

Let's create a sample form application from scratch. We will need to do the following:

- Create the application itself.
- Install the library.
- Add the form to the page.
- Run the application.
- Submit the form.

In the end, we will get a simple web form:

![Form example](/assets/landing/landing-01.png)

Let's create an application and install dependencies.

import Tracking from '@site/src/components/Tracking';

<Tracking eventData='{"code_block_click": "landing_install_viewer_npm_code_block"}'>

```bash
npx create-vite formbuilder-app --template react-ts
cd formbuilder-app
npm install @react-form-builder/core @react-form-builder/components-rsuite
```

</Tracking>

So now we have a Vite application. Let's add a form to the application.

### Form description

Each form is just JSON with a description of the form. The library takes care of form rendering and event handling.

Each form element is a component described by a unique key and type, and a set of properties. They can also describe how the component
should be validated and what CSS styles should be applied. You can create form's JSON using the builder:

<Tracking eventData='{"code_block_click": "landing_form_code_block"}'>

```typescript {2,6,11,17,22}
const simpleForm = buildForm({errorType: 'RsErrorMessage'})
  .component('container', 'RsContainer')
  .style({flexDirection: 'row'})
  .children((builder) =>
    builder
      .component('firstName', 'RsInput')
      .prop('placeholder', 'Enter your first name')
      .prop('label', 'First Name')
      .validation('required')

      .component('lastName', 'RsInput')
      .prop('placeholder', 'Enter your last name')
      .prop('label', 'Last Name')
      .validation('required')
  )

  .component('birthDate', 'RsDatePicker')
  .prop('label', 'Birth Date')
  .prop('oneTap', true)
  .validation('min').args({value: '1900-01-07T12:25:37.000Z'})

  .component('submit', 'RsButton')
  .prop('children', 'Submit')
  .prop('color', 'blue')
  .prop('appearance', 'primary')
  .event('onClick')
  .commonAction('validate').args({failOnError: true})
  .customAction('onSubmit')
  .json()
```

</Tracking>

### Add the form to the page

The component that displays forms is called `FormViewer`. It is necessary to pass to this component the `getForm` function to get the JSON
of the form and the `view` property, this is the set of components for rendering the form. In this example, we will use `viewWithCss` for a
[React Suite library](/components-library/).

You can also pass your custom actions to the `actions` property to submit the form to the backend. In this example, we will simply call the
`alert` function.

<Tracking eventData='{"code_block_click": "landing_viewer_app_code_block"}'>

```jsx live
function App() {
  const simpleForm = useMemo(() => {
    return buildForm({errorType: 'RsErrorMessage'})
      .component('container', 'RsContainer')
      .style({flexDirection: 'row'})
      .children((builder) =>
        builder
          .component('firstName', 'RsInput')
          .prop('placeholder', 'Enter your first name')
          .prop('label', 'First Name')
          .validation('required')

          .component('lastName', 'RsInput')
          .prop('placeholder', 'Enter your last name')
          .prop('label', 'Last Name')
          .validation('required')
      )

      .component('birthDate', 'RsDatePicker')
      .prop('label', 'Birth Date')
      .prop('oneTap', true)
      .validation('min').args({value: '1900-01-07T12:25:37.000Z'})

      .component('submit', 'RsButton')
      .prop('children', 'Submit')
      .prop('color', 'blue')
      .prop('appearance', 'primary')
      .event('onClick')
      .commonAction('validate').args({failOnError: true})
      .customAction('onSubmit')
      .json()
  }, [])

  const getForm = useCallback(() => simpleForm, [simpleForm])

  const actions = useMemo(() => {
    return {
      onSubmit: (e) => {
        // submit the form to the backend
        alert('Form data: ' + JSON.stringify(e.data))
      },
    }
  }, [])

  return <FormViewer
    view={viewWithCss}
    getForm={getForm}
    actions={actions}
  />
}
```

</Tracking>

Modify the contents of the `src/App.tsx` file as in the example above to finalize the application.

### Run the application

Now we can run the application. In the terminal, run:

<Tracking eventData='{"code_block_click": "landing_run_vite_app_code_block"}'>

```bash
npm run dev
```

</Tracking>

Open your browser and go to [http://localhost:5173](http://localhost:5173) (your port may be different). You should see the form we created.

![Form example](/assets/landing/landing-01.png)

You can click on the _Submit_ button without filling out the form, and you will see an error message.

![Form example](/assets/landing/landing-02.png)

If you fill out the form and click _Submit_, you will see an alert with the form data.

![Form example](/assets/landing/landing-03.png)

## Creating a form using Designer

Creating forms using JSON may not be as convenient as creating them visually in the Form Designer. Let's run the Form Designer locally. To
do this, it is enough to install the package with the designer and connect components to it.

<Tracking eventData='{"code_block_click": "landing_install_designer_npm_code_block"}'>

```bash
npm install @react-form-builder/designer @react-form-builder/components-rsuite
```

</Tracking>

In the simplest configuration, the `FormBuilder` component has one mandatory `view` property, a visual description of the components. We
will use the ready-made React Suite, you can use your own components.

<Tracking eventData='{"code_block_click": "landing_designer_app_code_block"}'>

```tsx title='src/Designer.tsx'
import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'

import '@react-form-builder/core/assets/styles.css'

/**
 * @returns the Designer element.
 */
export const Designer = () => {
  return <FormBuilder view={builderViewWithCss}/>
}
```

</Tracking>

Below is an example of how to connect the [form storage](/formengine-designer/features/form-storage) to the designer. A separate tab for
managing forms and a save button appear in the designer.

```tsx title='Designer with built-in form storage'
import {buildForm} from '@react-form-builder/core'
import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState} from 'react'

import '@react-form-builder/core/assets/styles.css'

const formStorage = new IndexedDbFormStorage('example-db', 'example-store')

function MyDesignerApp() {
  const [ready, setReady] = useState<boolean>(false)

  useEffect(() => {
    formStorage.init({
      example: buildForm().json()
    }).then(() => {
      setReady(true)
    }).catch(console.error)
  }, [])

  if (!ready) return null

  return <FormBuilder view={builderViewWithCss} formStorage={formStorage} formName="example"/>
}
```

When you launch the Designer, you'll see roughly the following:

![Form example](/assets/landing/landing-04.png)

Now you can create a form right on the page, customize components, and more.

For a more complete example, see [the link](/formengine-designer/getting-started/usage#designer).

## Further reading

- [Form Author Guide](designer-guide:) - step-by-step documentation for form authors (no code required).
- [FormEngine Designer for developers](/formengine-designer/getting-started/for-developers) - packages, architecture, and integration for React developers.
- Component styling [using CSS](/formengine-designer/features/component-styling).
- [Validation](/formengine-designer/features/validation).
- Connecting [form storage](/formengine-designer/features/form-storage) to Designer.
- Using with [Next.js](/usage-with-nextjs).
- Using with [Remix](/usage-with-remix).
- Using without any framework [via CDN](/formengine-designer/getting-started/installation#cdn).
