import type {ComponentType} from 'react'
import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {createNonNullableContext} from '../../utils/createNonNullableContext'

export const [
  /**
   * **Internal use only.**
   */
  useComponentTreeContext,
  /**
   * **Internal use only.**
   */
  ComponentTreeContextProvider] =
  createNonNullableContext<ComponentType<ComponentTreeProps>>('ComponentTreeContext')
