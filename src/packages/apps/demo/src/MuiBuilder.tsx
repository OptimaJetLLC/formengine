import {builderView} from '@react-form-builder/components-material-ui'
import {isUndefined} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {IndexedDbFormStorage} from '@react-form-builder/indexed-db-form-storage'
import {useEffect, useState} from 'react'
import {MuiForm} from '../forms'
import {customization} from './customization'
import {getFormFromJson} from './utils/getFormFromJson'
import {generatedLicenseKey} from './utils/license'

const indexedDbExists = !!globalThis.indexedDB
const formStorage = indexedDbExists ? new IndexedDbFormStorage('mui-form-builder-store', 'form-store') : undefined

const sampleFormName = 'MuiForm'

async function getForm(name?: string): Promise<string> {
  if (!formStorage) throw new Error('IndexedDB not supported')
  if (isUndefined(name)) throw new Error('Form name is not defined')
  return await formStorage.getForm(name)
}

// tests don't wait for promises now
const getFormFn = (formName?: string) => {
  const name = formName ?? sampleFormName
  return indexedDbExists ? getForm(name) : getFormFromJson(name)
}

/**
 * @returns the MUI Form builder.
 */
export const MuiBuilder = () => {
  const [indexedDbInitialized, setIndexedDbInitialized] = useState(false)

  useEffect(() => {
    if (!formStorage) {
      setIndexedDbInitialized(true)
      return
    }
    formStorage
      .init({MuiForm})
      .then(() => setIndexedDbInitialized(true))
      .catch(e => console.error(e))
  }, [])

  if (!indexedDbInitialized) {
    return null
  }

  return (
    <FormBuilder
      persistFormName={false}
      customization={customization}
      licenseKey={generatedLicenseKey}
      getForm={getFormFn}
      formName={sampleFormName}
      view={builderView}
      formStorage={formStorage}
    />
  )
}
