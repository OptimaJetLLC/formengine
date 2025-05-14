---
sidebar_position: 1
title: Form Builder
slug: /
---

# Form Builder

Form Builder is a client-side library for creating web forms. The library allows you to map a form from JSON to a dynamic HTML form and send
the results to your server. The library has no built-in visual components to display the form. Instead, it is made to display your
components. However, if you don't have your component set, there is a ready-made component set based on [React Suite](/components-library)
to work with.

## Key features

- **UI-Agnostic Components:** Works seamlessly with any UI
  library ([MUI](https://mui.com/), [Ant Design](https://ant.design/), [shadcn/ui](https://ui.shadcn.com/)
  and [others](/custom-components))
- **Pre-Built React Suite Integration:** Includes a ready-to-use component
  library – [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite).
- Framework Support:
  - **Next.js Integration**: Seamlessly works with [Next.js](/usage-with-nextjs).
  - **Remix Compatibility**: Fully supports [Remix](/usage-with-remix).
  - **Framework-Agnostic**: Can also be used [without any framework](/installation#cdn) via CDN.
- **Multi-Database Support:** Compatible with MySQL, PostgreSQL, MongoDB, SQLite, and more.
- **Built-in Validation with Zod:** Includes pre-configured validation rules powered by [Zod](https://github.com/colinhacks/zod).
- **Extensible Validation Support:** Works
  with [Yup](https://github.com/jquense/yup), [AJV](https://github.com/ajv-validator/ajv), [Zod](https://github.com/colinhacks/zod),
  [Superstruct](https://github.com/ianstormtaylor/superstruct),
  [Joi](https://github.com/hapijs/joi), and other custom validation libraries.
- **Responsive Layouts**: Build forms that automatically [adapt](/adaptive-layout) to all screen sizes.
- **Custom Actions**: Enhance forms with interactive logic through [custom JavaScript code](/actions).
- **Dynamic Properties**: Implement real-time component changes with [MobX](https://github.com/mobxjs/mobx)-powered reactive properties.
- **Flexible Storage Options**:
  - Store complete form definitions as JSON.
  - Programmatically generate forms [via code](/building-forms-via-code).

## Paid features

- **Drag & Drop Form Designer**: intuitive form building with easy drag-and-drop functionality. [Demo](https://demo.formengine.io/).
- **Customizable Designer**: tailor the form builder to match your workflow and [branding](/designer-customization).
- **Templates**: create [reusable components](/nested-components#templates) from your forms.
- **Signature Component**: capture [digital signatures](/components-library/fields-components/signature) directly in your forms.
- **QR Code Component**: generate and embed [QR codes](/components-library/static-components/qr-code) dynamically.
- **Table Component** _(in development)_: structured data display and input.
- **Preset Componens**: save and reuse [custom-configured form elements](/presets-components).
- **i18n Support**: built-in multilingual form [localization](/localization).
- **Repeater Component**: create [repeatable](/components-library/structure-components/repeater) sections for dynamic form fields.

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

```bash
npx create-vite formbuilder-app --template react-ts
cd formbuilder-app
npm install @react-form-builder/core @react-form-builder/components-rsuite
```

So now we have a Vite application. Let's add a form to the application.

### Form description

Each form is just JSON with a description of the form. The library takes care of form rendering and event handling.

Each form element is a component described by a unique key and type, and a set of properties. They can also describe how the component
should be validated and what CSS styles should be applied. You can create form's JSON using the builder:

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

### Add the form to the page

The component that displays forms is called `FormViewer`. It is necessary to pass to this component the `getForm` function to get the JSON
of the form and the `view` property, this is the set of components for rendering the form. In this example, we will use `viewWithCss` for a
[React Suite library](/components-library/).

You can also pass your custom actions to the `actions` property to submit the form to the backend. In this example, we will simply call the
`alert` function.

```tsx title='src/App.tsx' {1-2,31,38-47} src/App.tsx showLineNumbers
import {viewWithCss} from '@react-form-builder/components-rsuite'
import {buildForm, FormViewer} from '@react-form-builder/core'

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

/**
 * @returns the App element.
 */
export const App = () => {
  return <FormViewer
    view={viewWithCss}
    getForm={() => simpleForm}
    actions={{
      onSubmit: (e) => {
        // submit the form to the backend
        alert('Form data: ' + JSON.stringify(e.data))
      },
    }}
  />
}
```

Modify the contents of the `src/App.tsx` file as in the example above to finalize the application.

### Run the application

Now we can run the application. In the terminal, run:

```bash
npm run dev
```

Open your browser and go to [http://localhost:5173](http://localhost:5173) (your port may be different). You should see the form we created.

![Form example](/assets/landing/landing-01.png)

You can click on the _Submit_ button without filling out the form, and you will see an error message.

![Form example](/assets/landing/landing-02.png)

If you fill out the form and click _Submit_, you will see an alert with the form data.

![Form example](/assets/landing/landing-03.png)

## Creating a form using Designer

Creating forms using JSON may not be as convenient as creating them visually in the Form Designer. Let's run the Form Designer locally. To
do this, it is enough to install the package with the designer and connect components to it.

<div onClick={() => {
    dataLayer?.push({ event: "button_click", action: "install_designer_npm" });
  }}>

```bash
npm install @react-form-builder/designer
```

</div>

In the simplest configuration, the `FormBuilder` component has one mandatory `view` property, a visual description of the components. We
will use the ready-made React Suite, you can use your own components.

```tsx title='src/Designer.tsx'
import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'

/**
 * @returns the Designer element.
 */
export const Designer = () => {
  return <FormBuilder view={builderViewWithCss}/>
}
```

When you launch the Designer, you'll see roughly the following:

![Form example](/assets/landing/landing-04.png)

Now you can create a form right on the page, customize components, and more.

For a more complete example, see [the link](/usage#designer).

## Further reading

- Component styling [using CSS](/component-styling).
- [Validation](/validation).
- Connecting [form storage](/form-storage) to Designer.
- Using with [Next.js](/usage-with-nextjs).
- Using with [Remix](/usage-with-remix).
- Using without any framework [via CDN](/installation#cdn).
