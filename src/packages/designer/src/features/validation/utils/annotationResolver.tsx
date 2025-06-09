import type {Annotation, ResolvedValidator, Store} from '@react-form-builder/core'
import {isPromise} from '@react-form-builder/core'
import {isEmpty} from 'lodash-es'

const isDate = (value: any) => value instanceof Date

/**
 * Creates a validator for the specified metadata properties of the component.
 * @param data the function parameters.
 * @param data.annotation the component property metadata.
 * @param data.store the form viewer settings.
 * @returns the validation function.
 */
export const annotationResolver = ({annotation, store}: { annotation: Annotation, store: Store }): ResolvedValidator => {
  const checkRequired = (value: any) => {
    if (annotation.required) {
      if (typeof value === 'number') return
      if (isDate(value) || !isEmpty(value)) return
      return [{
        settings: {key: 'required_property'},
        message: 'This property is required!',
        annotation: annotation
      }]
    }
  }

  const checkValidator = async (value: any) => {
    const result = annotation.validator?.(value, store)
    const success = isPromise(result) ? await result : result
    if (success === false) {
      return [{
        settings: {key: 'property_validator'},
        message: annotation.errorMap?.message,
        annotation: annotation
      }]
    }
  }

  return async value => checkRequired(value) ?? await checkValidator(value)
}
