import {ltrCssLoader, RsLocalizationWrapper, rSuiteComponents, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {ActionDefinition, BiDi, ComponentLocalizer, createView, ExternalValidators, FormViewer, IFormViewer} from '@react-form-builder/core'
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

// You can define external validators for form fields
const externalValidators: ExternalValidators = {
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

export const Viewer = () => {
  const ref = useRef<IFormViewer>(null)

  useEffect(() => {
    if (ref.current) {
      // if you want to work with the internal FormViewer component in an imperative style
      console.log('Viewer', ref.current)
    }
  }, [ref.current])

  // external function for localizing component properties
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
      onDataChange={({data, errors}) => {
        console.log('onDataChange', {data, errors})
      }}
      viewerRef={ref}
      externalValidators={externalValidators}
      externalActions={{
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
