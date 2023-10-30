---
sidebar_position: 4
title: Viewer
slug: /viewer
---

# Viewer

The [FormViewer](/api-reference/modules/react_form_builder_core#formviewer) component is responsible for displaying the form in Form
Builder. The [FormBuilder](/api-reference/modules/react_form_builder_designer#formbuilder) uses the `FormViewer` component to display
the form in the center panel.

The `FormViewer` component receives as input the properties described in the
type [FormViewerProps](/api-reference/interfaces/react_form_builder_core.FormViewerProps).

Let's look at an example of a simple application using a `FormViewer` component with a set of components from the React Suite library:

```tsx title='App.tsx'
import React from 'react'
import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'

const form = `{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsInput 1",
        "type": "RsInput",
        "props": {}
      }
    ]
  }
}`

function App() {
  return <FormViewer view={view} getForm={_ => form}/>
}

export default App
```

This code sample creates a `form` variable that contains a JSON form string, there is one input field on the form. In the component
`FormViewer` is passed the mandatory [view](/api-reference/interfaces/react_form_builder_core.FormViewerProps#view) property, which is a set
of component metadata for the React Suite library. As well as
the [getForm](/api-reference/interfaces/react_form_builder_core.FormViewerProps#getform) property, which accepts a function that returns the
value of the `form` variable.

## FormViewer code example

:::info

Don't let the large code example scare you. This example is large because everything is placed in one file for clarity.

:::

The code below passes almost the same properties as the example from the [designer article](/designer#formbuilder-code-example). The
difference is that you can pass additional properties to the properties of the `FormBuilder` component that are needed only in the form
design mode.

```tsx title='Viewer.tsx'
import {ltrCssLoader, RsLocalizationWrapper, rSuiteComponents, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {ActionDefinition, BiDi, ComponentLocalizer, createView, FormViewer, IFormViewer, Validators} from '@react-form-builder/core'
import {useCallback, useEffect, useRef} from 'react'

// highlight-start
// Here you can pass the metadata of your components
const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)
// highlight-end

// highlight-start
const view = createView(componentsMetadata)
  // The following parameters are required for correct CSS loading in LTR and RTL modes
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)
// highlight-end

// You can define custom validators for form fields
const customValidators: Validators = {
  'string': {
    'isHex': {
      validate: value => /^[0-9A-F]*$/i.test(value)
    },
    'isHappy': {
      params: [],
      validate: value => value === 'Happy'
    },
    'equals': {
      params: [
        {key: 'value', type: 'string', required: false, default: 'Ring'},
        {key: 'message', type: 'string', required: false, default: 'Value must be equals to '}
      ],
      validate: (value, _, args) => {
        const errorMessage = args?.['message'] as string
        const checkedValue = args?.['value'] as string
        const errorResult = errorMessage ? errorMessage + checkedValue : false
        return value !== args?.['value'] ? errorResult : true
      }
    }
  },
  'number': {},
  'boolean': {
    'onlyTrue': {
      validate: value => value === true
    }
  },
}

// Example form, in JSON format
const emptyForm = `
{
  "version": "1",
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "name",
        "type": "RsInput",
        "props": {
          "placeholder": {
            "value": "Enter you name"
          },
          "label": {
            "value": "Name"
          }
        },
        "schema": {
          "validations": [
            {
              "key": "required"
            }
          ]
        },
        "tooltipProps": {
          "text": {
            "value": "Name"
          }
        }
      },
      {
        "key": "password",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Password"
          },
          "passwordMask": {
            "value": true
          }
        },
        "schema": {
          "validations": [
            {
              "key": "required"
            }
          ]
        },
        "tooltipProps": {
          "text": {
            "value": "Password"
          },
          "placement": {
            "value": "left"
          }
        }
      },
      {
        "key": "submit",
        "type": "RsButton",
        "props": {
          "children": {
            "value": "Login"
          },
          "color": {
            "value": "blue"
          },
          "appearance": {
            "value": "primary"
          }
        },
        "events": {
          "onClick": [
            {
              "name": "validate",
              "type": "common"
            },
            {
              "name": "logEventArgs",
              "type": "custom"
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
`

const formName = 'Example'

async function getFormFn(name?: string) {
  if (name === formName) return emptyForm
  throw new Error(`Form '${name}' is not found.`)
}

export const Viewer = () => {
  const ref = useRef<IFormViewer>(null)

  useEffect(() => {
    if (ref.current) {
      // if you want to work with the internal FormViewer component in an imperative style
      console.log('Viewer', ref.current)
    }
  }, [ref.current])

  // custom function for localizing component properties
  const localizeFn = useCallback<ComponentLocalizer>((componentStore, language) => {
    // localizes only the component whose key has the value "password"
    return componentStore.key === 'submit' && language.code === 'en'
      ? {'children': `Submit`}
      : {}
  }, [])

  // highlight-start
  return (
    <FormViewer
      view={view}
      getForm={getFormFn}
      formName={formName}
      initialData={({})}
      localize={localizeFn}
      onFormDataChange={({data, errors}) => {
        console.log('onFormDataChange', {data, errors})
      }}
      viewerRef={ref}
      validators={customValidators}
      actions={{
        logEventArgs: e => console.log(e),
        assertArgs: ActionDefinition.functionalAction((e, args) => {
          console.log(e, args)
        }, {
          p1: 'string',
          p2: 'boolean',
          p3: 'number'
        })
      }}
    />
  )
  // highlight-end
}
```
