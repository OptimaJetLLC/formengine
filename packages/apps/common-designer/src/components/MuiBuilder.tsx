import {getFormFromJson, MuiForm} from '@react-form-builder/apps-common'
import '../utils/muiLocalizations'
import {
  components,
  MuiLocalizationProvider,
  MuiViewerWrapper,
  materialUiComponentsDescriptions,
} from '@react-form-builder/components-material-ui'
import {BuilderView, namedObserver} from '@react-form-builder/core'
import type {IFormBuilder} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {useCallback, useEffect, useRef} from 'react'
import {licenseKey} from '../utils/licenseKey'
import type {FormBuilderAppProps} from '../utils/types'
import {useIndexedDbStorage} from '../utils/useIndexedDbStorage'
import {useUrlFormBootstrap} from '../utils/useUrlFormBootstrap'
import {useSetBuilderRef} from './BuilderRefContext'

const builderView = new BuilderView(components)
  .withViewerWrapper(MuiViewerWrapper)
  .withViewerWrapper(MuiLocalizationProvider)
  .withComponentLibraryDescription(materialUiComponentsDescriptions)

const sampleFormName = 'MuiForm'
const forms = {MuiForm}

const RawMuiBuilder = ({appName = 'form-builder', ...props}: FormBuilderAppProps) => {
  const dbName = `${appName}-mui-db`
  const storeName = `${appName}-store`
  const builderRef = useRef<IFormBuilder>(null)
  const setBuilderRef = useSetBuilderRef()

  useEffect(() => {
    setBuilderRef?.(builderRef)
  }, [setBuilderRef])

  const {formStorage, initialized, indexedDbExists} = useIndexedDbStorage(dbName, storeName, forms)
  const getBundledForm = useCallback((name: string) => getFormFromJson(name), [])
  const urlBootstrap = useUrlFormBootstrap({
    formStorage,
    storageReady: initialized,
    getBundledForm,
  })

  const getFormFn = useCallback(
    (formName?: string) => {
      const name = formName ?? urlBootstrap.formName ?? sampleFormName
      if (formStorage) {
        return formStorage.getForm(name).catch(() => {
          if (urlBootstrap.bootstrap?.form?.mode === 'named' || !urlBootstrap.bootstrap?.form) {
            return getFormFromJson(name)
          }
          throw new Error(`Unable to load form '${name}'`)
        })
      }
      if (!indexedDbExists) {
        return getFormFromJson(name)
      }
      return Promise.reject(new Error(`Unable to load form '${name}'`))
    },
    [formStorage, indexedDbExists, urlBootstrap.bootstrap?.form, urlBootstrap.formName]
  )

  if (!initialized || !urlBootstrap.ready) {
    return null
  }

  return (
    <FormBuilder
      licenseKey={licenseKey}
      getForm={getFormFn}
      formName={urlBootstrap.formName ?? sampleFormName}
      persistFormName={urlBootstrap.persistFormName}
      localStoragePrefix={`${appName}-mui`}
      view={builderView}
      formStorage={formStorage}
      builderRef={builderRef}
      {...props}
    />
  )
}

export const MuiBuilder = namedObserver('MuiBuilder', RawMuiBuilder)
