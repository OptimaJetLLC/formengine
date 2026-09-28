import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'
import {useMemo, useState} from 'react'
import {customization} from './customization'
import {FormsContext} from './FormsProvider'
import type {CurrentFormOptions} from './FormsStorage'
import {FormStorage} from './FormsStorage'
import {licenseKey} from './utils/license'

type FormManagerProps = {
  onLoadForm?: (options?: CurrentFormOptions) => void
  initialFormOptions?: CurrentFormOptions
}

/**
 * Designer with simple form versioning.
 * @param props the form manager props.
 * @returns the Designer element.
 */
export const FormManager = (props: FormManagerProps) => {
  const [formName, setFormName] = useState<string>(props.initialFormOptions?.formName ?? 'a')
  const [formVersion, setFormVersion] = useState<number | undefined>(props.initialFormOptions?.formVersion ?? 1)

  const formOptions = useMemo<CurrentFormOptions | undefined>(() => {
    return {formName: formName, formVersion: formVersion}
  }, [formName, formVersion])

  const formStorage = useMemo(() => {
    const onLoadForm = (options?: CurrentFormOptions) => {
      if (options) {
        setFormName(options?.formName)
        setFormVersion(options?.formVersion)
      }
      props.onLoadForm?.(options)
    }
    return new FormStorage(onLoadForm)
  }, [props])

  return (
    <FormsContext.Provider value={{formName, formVersion, formStorage, setFormVersion}}>
      <FormBuilder
        view={builderViewWithCss}
        formName={formName}
        getForm={formStorage.getForm}
        formStorage={formStorage}
        customization={customization}
        formOptions={formOptions}
        licenseKey={licenseKey}
      />
    </FormsContext.Provider>
  )
}
