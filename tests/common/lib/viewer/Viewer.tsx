import {ltrCssLoader, RsViewWrapper, rSuiteComponents, rtlCssLoader} from '@react-form-builder/components-rsuite'
import {sortableListComponent} from '@react-form-builder/components-sortable-list'
import type {ComponentLocalizer, IFormViewer, Validators} from '@react-form-builder/core'
import {ActionDefinition, BiDi, createView, FormViewer} from '@react-form-builder/core'
import {useCallback, useMemo, useRef} from 'react'
import sortableListFormObj from './sortable-list.form.json'
import formObj from './user.form.json'

const defaultForm = JSON.stringify(formObj)
const sortableListForm = JSON.stringify(sortableListFormObj)

const componentsMetadata = [...rSuiteComponents.map(definer => definer.build().model), sortableListComponent.build().model]

const view = createView(componentsMetadata)
  .withViewerWrapper(RsViewWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

const customValidators: Validators = {
  string: {
    isHex: {
      validate: value => /^[0-9A-F]*$/i.test(value),
    },
    isHappy: {
      params: [],
      validate: value => value === 'Happy',
    },
    equals: {
      params: [
        {key: 'value', type: 'string', required: false, default: 'Ring'},
        {key: 'message', type: 'string', required: false, default: 'Value must be equals to '},
      ],
      validate: (value, _, args) => {
        const errorMessage = args?.['message'] as string
        const checkedValue = args?.['value'] as string
        const errorResult = errorMessage ? errorMessage + checkedValue : false
        return value !== args?.['value'] ? errorResult : true
      },
    },
  },
  number: {},
  boolean: {
    onlyTrue: {
      validate: value => value === true,
    },
  },
}

const forms: Record<string, string> = {
  Example: defaultForm,
  'sortable-list': sortableListForm,
}

function getFormFn(name?: string) {
  const form = name ? forms[name] : undefined
  if (form) return form
  throw new Error(`Form '${name}' is not found.`)
}

function resolveFormName() {
  if (typeof window === 'undefined') return 'Example'
  return new URLSearchParams(window.location.search).get('form') ?? 'Example'
}

/**
 * @returns Rect Component
 */
export const Viewer = () => {
  const ref = useRef<IFormViewer>(null)
  const formName = useMemo(() => resolveFormName(), [])

  const setRef = useCallback((viewer: IFormViewer | null) => {
    if (viewer) {
      ref.current = viewer
      console.log(ref.current)
    }
  }, [])

  const localizeFn = useCallback<ComponentLocalizer>((componentStore, language) => {
    return componentStore.key === 'submit' && language.code === 'en' ? {children: `Submit`} : {}
  }, [])

  return (
    <FormViewer
      view={view}
      getForm={getFormFn}
      formName={formName}
      initialData={{}}
      localize={localizeFn}
      onFormDataChange={({data, errors}) => {
        console.log('onFormDataChange', {data, errors})
      }}
      viewerRef={setRef}
      validators={customValidators}
      actions={{
        logEventArgs: e => console.log(e),
        assertArgs: ActionDefinition.functionalAction(
          (e, args) => {
            console.log(e, args)
          },
          {
            p1: 'string',
            p2: 'boolean',
            p3: 'number',
          }
        ),
      }}
    />
  )
}
