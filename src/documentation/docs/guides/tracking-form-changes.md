---
sidebar_position: 50
title: Tracking form changes
slug: /tracking-form-changes
description: How to track changes to data on a form in real time
---

# Tracking form changes

Detecting and tracking changes to data that is submitted to your form can be a crucial aspect of your form management. To detect changes to
your provided form, the [onFormDataChange](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#onformdatachange) function is
available for working with forms. You can use this function to detect unsaved changes.

## How onFormDataChange works

The `onFormDataChange` function is used to track changes to form data. This can include changes to input or text fields, drop-down menus,
checkboxes, and other form components that require user interaction. When form data changes, the `onFormDataChange` function is called to
allow custom code to be executed. For example, if you have a _Save_ button to save form data, you can disable it if the data on the form is
the same as it was originally.

## Example workflow

The following provides an example that showcases how the `onFormDataChange` functionality is used to track changes.

### Form configuration

Define the logic for the `onFormDataChange` function and define input fields, dropdown lists, or other form components that require
interactions from users. The following snippet provides an example of implemented `onFormDataChange` and a simple form in JSON format:

```tsx {62-66,92-95,104-108}
import {
  formEngineRsuiteCssLoader,
  ltrCssLoader,
  RsLocalizationWrapper,
  rSuiteComponents,
  rtlCssLoader,
} from '@react-form-builder/components-rsuite'
import {BiDi, createView, FormViewer} from '@react-form-builder/core'

// Here you can pass the metadata of your components
const componentsMetadata = rSuiteComponents.map(
  (definer) => definer.build().model,
)

const view = createView(componentsMetadata)
  // The following parameters are required for correct CSS loading in LTR and RTL modes
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
  .withCssLoader('common', formEngineRsuiteCssLoader)

// Example form, in JSON format
const emptyForm = `
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "firstName",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "First name"
          }
        }
      },
      {
        "key": "lastName",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Last Name"
          }
        }
      },
      {
        "key": "rsButton1",
        "type": "RsButton",
        "props": {
          "appearance": {
            "value": "primary"
          },
          "children": {
            "value": "Save"
          },
          "color": {
            "value": "blue"
          },
          "disabled": {
            "value": false,
            "computeType": "function",
            "fnSource": "  return form.state.dataChanged !== true;"
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
`

const formName = 'Example'

async function getFormFn(name?: string) {
  if (name === formName) return emptyForm
  throw new Error(`Form '${name}' is not found.`)
}

const initialData = {
  firstName: 'Mars',
  lastName: 'Jupiter',
}

const App = () => {
  return (
    <FormViewer
      view={view}
      getForm={getFormFn}
      formName={formName}
      initialData={initialData}
      onFormDataChange={({data, state}) => {
        const sourceData = JSON.stringify(initialData)
        const currentData = JSON.stringify(data)
        state.dataChanged = sourceData !== currentData
      }}
    />
  )
}

export default App
```

Here, initial form data is defined within `initialData`. The `onFormDataChange` function compares initial data with the current form data
(i.e., `data`). Both initial data and current data are stringified to facilitate the comparison process.

The comparison results are saved within a user defined key-value observable storage called `state`. Learn more about the state storage by
using [the API-reference](/api-reference/@react-form-builder/core/interfaces/IFormData#state)
and [the article in FAQ](/formengine-designer/faq/storing-user-defined-data).

### Previewing form

Once your form is configured and the logic for `onFormDataChange` is defined, you can preview the form and the workflow by using the
corresponding __Preview__ button.

The example form includes the _Save_ button component with the functional __Disabled__ property that switches on and off depending on the
user data state:

![Functional_disable](/assets/guides/tracking-form-changes/disable-button.png)

Therefore, in case the current provided data equals to the initial stored data, the __Save__ button will be disabled. Consequently, users
will be able to track changes and save the input only if changes and updates are provided.  
