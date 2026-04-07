import {ltrCssLoader, RsLocalizationWrapper, rSuiteComponents, rtlCssLoader} from '@react-form-builder/components-rsuite'
import type {ComponentLocalizer, IFormViewer, Validators} from '@react-form-builder/core'
import {ActionDefinition, BiDi, createView, FormViewer} from '@react-form-builder/core'
import {useCallback, useRef} from 'react'
import formObj from './user.form.json'

const form = JSON.stringify(formObj)

// Here you can pass the metadata of your components
const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)

const view = createView(componentsMetadata)
  // The following parameters are required for correct CSS loading in LTR and RTL modes
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

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

const formName = 'Example'

function getFormFn(name?: string) {
  if (name === formName) return form
  throw new Error(`Form '${name}' is not found.`)
}

/**
 * @returns Rect Component
 */
export const Viewer = () => {
  const ref = useRef<IFormViewer>(null)

  const setRef = useCallback((viewer: IFormViewer | null) => {
    if (viewer) {
      // if you want to work with the internal FormViewer component in an imperative style
      ref.current = viewer
      console.log(ref.current)
    }
  }, [])

  // custom function for localizing component properties
  const localizeFn = useCallback<ComponentLocalizer>((componentStore, language) => {
    // localizes only the component whose key has the value "password"
    return componentStore.key === 'submit' && language.code === 'en'
      ? {'children': `Submit`}
      : {}
  }, [])

  // useLayoutEffect(() => {
  //   document.title = 'Form Viewer'
  // }, [])

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
      viewerRef={setRef}
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
