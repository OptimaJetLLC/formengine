import {ComponentStore, useComponentData} from '@react-form-builder/core'
import {useCallback, useState} from 'react'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {BooleanInput} from './BooleanInput'

/**
 * The property editor for the required property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const RequiredPropertyInput = (props: AnnotationEditorProps) => {
  const {store} = useComponentData()
  const hasRule = ComponentStore.hasValidationRule(store, 'required') || undefined
  const [value, setValue] = useState<boolean | undefined>(hasRule)

  const handleChange = useCallback(
    (checked: boolean) => {
      setValue(checked)
      if (checked) {
        ComponentStore.addValidationRule(store, 'required')
        return
      }
      ComponentStore.removeValidationRule(store, 'required')
    },
    [store]
  )

  const handleClean = useCallback(() => {
    setValue(undefined)
    ComponentStore.removeValidationRule(store, 'required')
  }, [store])

  return <BooleanInput {...props} value={value} onChange={handleChange} onClean={handleClean} />
}
