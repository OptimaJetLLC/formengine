import type {ComponentProperty} from '@react-form-builder/core'

/**
 * Writes an annotation value into an external property bag.
 * @param context the property bag.
 * @param key the annotation key.
 * @param value the next value.
 * @param asProperty true when the value is stored on a component property object.
 */
export const writeAnnotationValue = (context: Record<string, any>, key: string, value: unknown, asProperty: boolean) => {
  if (asProperty) {
    context[key] ??= {}
    context[key].value = value
    return
  }
  context[key] = value
}

/**
 * Removes an annotation key from an external property bag.
 * @param context the property bag.
 * @param key the annotation key.
 */
export const deleteAnnotationKey = (context: Record<string, any>, key: string) => {
  delete context[key]
}

/**
 * Merges a patch into an annotation property.
 * @param context the property bag.
 * @param key the annotation key.
 * @param patch the property fields to merge.
 */
export const patchAnnotationProperty = (context: Record<string, any>, key: string, patch: ComponentProperty) => {
  context[key] = Object.assign(context[key] ?? {}, patch)
}
