import {getFormFromJson, MantineForm} from '@react-form-builder/apps-common'
import {builderView} from '@react-form-builder/components-mantine'
import {namedObserver} from '@react-form-builder/core'
import type {IFormBuilder} from '@react-form-builder/designer'
import {FormBuilder} from '@react-form-builder/designer'
import {useCallback, useEffect, useRef} from 'react'
import '@mantine/core/styles.css'
import '@mantine/dates/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/tiptap/styles.css'
import {licenseKey} from '../utils/licenseKey'
import type {FormBuilderAppProps} from '../utils/types'
import {useIndexedDbStorage} from '../utils/useIndexedDbStorage'
import {useUrlFormBootstrap} from '../utils/useUrlFormBootstrap'
import {useSetBuilderRef} from './BuilderRefContext'

const sampleFormName = 'MantineForm'
const forms = {MantineForm}

const RawMantineBuilder = ({appName = 'form-builder', getForm, ...props}: FormBuilderAppProps) => {
  const dbName = `${appName}-mantine-db`
  const storeName = `${appName}-store`
  const builderRef = useRef<IFormBuilder>(null)
  const setBuilderRef = useSetBuilderRef()
  const {formStorage, initialized, indexedDbExists} = useIndexedDbStorage(dbName, storeName, forms)
  const getBundledForm = useCallback((name: string) => getFormFromJson(name), [])
  const urlBootstrap = useUrlFormBootstrap({
    formStorage: getForm ? undefined : formStorage,
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
  const storage = getForm ? undefined : formStorage

  useEffect(() => {
    setBuilderRef?.(builderRef)
  }, [setBuilderRef])

  if (!initialized || !urlBootstrap.ready) {
    return null
  }

  return (
    <FormBuilder
      licenseKey={licenseKey}
      getForm={getForm ?? getFormFn}
      formName={urlBootstrap.formName ?? sampleFormName}
      persistFormName={urlBootstrap.persistFormName}
      localStoragePrefix={`${appName}-mantine`}
      view={builderView}
      formStorage={storage}
      builderRef={builderRef}
      {...props}
    />
  )
}

export const MantineBuilder = namedObserver('MantineBuilder', RawMantineBuilder)
