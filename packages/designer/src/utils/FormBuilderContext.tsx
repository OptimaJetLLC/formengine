import {createNonNullableContext} from '@react-form-builder/core'
import type {IFormBuilder} from './types'

const [
  /**
   * The hook to get the form builder settings.
   */
  useFormBuilder,
  FormBuilderProvider,
] = createNonNullableContext<IFormBuilder>('BuildManagerContext')

export {FormBuilderProvider, useFormBuilder}
