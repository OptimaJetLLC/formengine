import type {ComponentType} from 'react'
import type {ComponentTreeProps} from '../../ComponentTreeProps'
import {createNonNullableContext} from '../../utils/createNonNullableContext'

export const [useComponentTreeContext, ComponentTreeContextProvider] =
  createNonNullableContext<ComponentType<ComponentTreeProps>>('ComponentTreeContext')
