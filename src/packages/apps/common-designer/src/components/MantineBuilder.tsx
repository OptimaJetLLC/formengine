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
import {useSetBuilderRef} from './BuilderRefContext'

const sampleFormName = 'MantineForm'
const forms = {MantineForm}

const RawMantineBuilder = ({appName = 'form-builder', getForm, ...props}: FormBuilderAppProps) => {
  const dbName = `${appName}-mantine-db`
  const storeName = `${appName}-store`
  const builderRef = useRef<IFormBuilder>(null)
  const setBuilderRef = useSetBuilderRef()
  const {formStorage, initialized, indexedDbExists} = useIndexedDbStorage(dbName, storeName, forms)
  const getFormFn = useCallback(
    (formName?: string) => {
      const name = formName ?? sampleFormName
      if (!indexedDbExists || !formStorage) {
        return getFormFromJson(name)
      }

      return formStorage.getForm(name).catch(() => getFormFromJson(name))
    },
    [formStorage, indexedDbExists]
  )
  const storage = getForm ? undefined : formStorage

  useEffect(() => {
    setBuilderRef?.(builderRef)
  }, [setBuilderRef])

  if (!initialized) {
    return null
  }

  return (
    <FormBuilder
      licenseKey={licenseKey}
      getForm={getForm ?? getFormFn}
      formName={sampleFormName}
      localStoragePrefix={`${appName}-mantine`}
      view={builderView}
      formStorage={storage}
      builderRef={builderRef}
      {...props}
    />
  )
}

export const MantineBuilder = namedObserver('MantineBuilder', RawMantineBuilder)
