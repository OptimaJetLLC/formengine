import type {ValidationRuleParameter} from '@react-form-builder/core'
import {coerceIfDate, createAnnotation, createProperty} from '@react-form-builder/core'

/**
 * The annotation that defines the validateWhen parameter.
 */
export const validateWhen = createProperty('string').typed('boolean').calculable(true).build('validateWhen')

/**
 * Converts a ValidationRuleParameter to an annotation.
 * @param parameter the validation rule parameter object to convert.
 * @returns the generated annotation.
 */
function convertValidationRuleParameterToAnnotation(parameter: ValidationRuleParameter) {
  const annotationType = parameter.editorType === 'code' ? 'customValidator' : parameter.type
  let annotationBuilder = createAnnotation(annotationType).typed(parameter.type).calculable(false)
  if (parameter.required) {
    annotationBuilder = annotationBuilder.required
  }
  if (parameter.default) {
    annotationBuilder = annotationBuilder.default(coerceIfDate(parameter.type, parameter.default))
  }
  annotationBuilder = parameter.key === 'message' ? annotationBuilder.localize : annotationBuilder.notLocalize

  return annotationBuilder.build(parameter.key)
}

/**
 * Converts an array of validation rule parameters to annotations.
 * @param parameters the array of validation rule parameters to convert.
 * @returns the array of annotations generated from the conversion.
 */
export function convertValidationRuleParametersToAnnotations(parameters: ValidationRuleParameter[]) {
  return parameters.map(convertValidationRuleParameterToAnnotation).sort((a, b) => {
    if (a.required === b.required || a.required) return -1
    if (a.key === 'message') return 1
    return 0
  })
}
