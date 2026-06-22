import {createAnnotation} from '@react-form-builder/core'

/**
 * The annotation for the 'disableDataBinding' property of the component.
 */
export const disableDataBinding = createAnnotation('disableDataBinding')
  .typed('boolean')
  .calculable(false)
  .build('disableDataBinding')
