---
sidebar_position: 3
title: Designer
slug: /designer
---

# Designer

The form designer in Form Builder is represented by the React
component [FormBuilder](/api-reference/modules/react_form_builder_designer#formbuilder). The `FormBuilder` component is located in the
package [@react-form-builder/designer](https://www.npmjs.com/package/@react-form-builder/designer).

Below is sample code for embedding the `FormBuilder` component into your application:

```tsx title='App.tsx'
import React from 'react'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

const builderView = new BuilderView([])

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

You can find a description of the component properties in
the [FormBuilderProps](/api-reference/interfaces/react_form_builder_designer.FormBuilderProps) API. The only mandatory property
is [view](/api-reference/interfaces/react_form_builder_designer.FormBuilderProps#view),
which is a description of the component [metadata](/api-reference/classes/react_form_builder_core.BuilderView) used to design the form.

You can use the pre-built components found in
the [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite) package to start a form
designer with a populated set of components:

```tsx title='App.tsx'
import React from 'react'
// highlight-next-line
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

// highlight-next-line
const components = rSuiteComponents.map(c => c.build())
// highlight-next-line
const builderView = new BuilderView(components)

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

This is the minimal React component code with which you can add a form designer to your application.

## FormBuilder code example

:::info

Don't let the large code example scare you. This example is large because everything is placed in one file for clarity.

:::

```tsx title='Designer.tsx'
import {
  ltrCssLoader,
  rsErrorMessage,
  RsLocalizationWrapper,
  rsTooltip,
  rSuiteComponents,
  rtlCssLoader
} from '@react-form-builder/components-rsuite'
import {ActionDefinition, BiDi, ComponentLocalizer, IFormViewer, Validators} from '@react-form-builder/core'
import {BuilderView, FormBuilder, IFormStorage} from '@react-form-builder/designer'
import {useCallback, useEffect, useRef} from 'react'

// Here you can pass the metadata of your components
const componentsMetadata = rSuiteComponents.map(definer => definer.build())

const builderView = new BuilderView(componentsMetadata)
  // You can pass multiple components to display error messages by calling the withErrorMeta function multiple times
  .withErrorMeta(rsErrorMessage.build())
  // You can pass multiple components to display tooltip messages by calling the withTooltipMeta function multiple times
  .withTooltipMeta(rsTooltip.build())
  // Pass an array of template names to the withTemplates function to display them in the designer
  .withTemplates([])
  // The following parameters are required for correct CSS loading in LTR and RTL modes
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

// This is where you can define the custom storage for the designer
const formStorage: IFormStorage | undefined = undefined

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
        return value !== args?.['value'] ? errorMessage ?? false : true
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
              "type": "external"
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

export const Designer = () => {
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

  return (
    <FormBuilder
      view={builderView}
      getForm={getFormFn}
      formName={formName}
      initialData={({})}
      formStorage={formStorage}
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
}
```
