---
sidebar_position: 3
title: Usage
description: Examples of Designer and Viewer usage.
slug: /usage
---

# Usage

## Designer

:::info

Don't let the large code example scare you. This example is large because everything is placed in one file for clarity.

:::

To add dependencies for the example below, install the packages using the following command:

```bash
npm install @react-form-builder/core @react-form-builder/components-rsuite @react-form-builder/designer
```

You can simply copy and paste the below code into your project and use the `Designer` component in your application:

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

## Viewer

:::info

Don't let the large code example scare you. This example is large because everything is placed in one file for clarity.

:::

To add dependencies for the example below, install the packages using the following command:

```bash
npm install @react-form-builder/core @react-form-builder/components-rsuite
```

:::tip

If your package manager does not support automatic installation of peer dependencies, for example you use the `--legacy-peer-deps` flag in
npm, then you need to install peer dependencies manually.

```bash
npm install @emotion/cache@11.10.5 @emotion/css@11.10.5 @emotion/react@11.10.5 @emotion/styled@11.10.5 mobx@6.9.0 mobx-react@7.6.0 rxjs@7.8.0 stylis-plugin-rtl@2.1.1 @rsuite/icons@1.0.2 react-number-format@5.1.4 rsuite@5.38.0 --save-exact
```

:::

The code below passes almost the same properties as the example for the [designer](#designer). The difference is that you can pass
additional properties to the properties of the `FormBuilder` component that are needed only in the form design mode.

You can simply copy and paste the below code into your project and use the `Viewer` component in your application:

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
