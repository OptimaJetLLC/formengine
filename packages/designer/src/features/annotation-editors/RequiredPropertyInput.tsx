import {ComponentStore, namedObserver, useComponentData} from '@react-form-builder/core'
import {useCallback} from 'react'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {BooleanInput} from './BooleanInput'

/**
 * The property editor for the required property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawRequiredPropertyInput = (props: AnnotationEditorProps) => {
  const {store} = useComponentData()
  const value = ComponentStore.hasValidationRule(store, 'required') || undefined

  const handleChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        ComponentStore.addValidationRule(store, 'required')
        return
      }
      ComponentStore.removeValidationRule(store, 'required')
    },
    [store]
  )

  const handleClean = useCallback(() => {
    ComponentStore.removeValidationRule(store, 'required')
  }, [store])

  return <BooleanInput {...props} value={value} onChange={handleChange} onClean={handleClean} />
}

export const RequiredPropertyInput = namedObserver('RequiredPropertyInput', RawRequiredPropertyInput)
