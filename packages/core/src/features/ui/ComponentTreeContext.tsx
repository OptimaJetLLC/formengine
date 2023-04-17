import {ComponentType} from 'react'
import {ComponentTreeProps} from '../../types'
import {createNonNullableContext} from '../../utils/createNonNullableContext'

export const [useComponentTree, ComponentTreeProvider] = createNonNullableContext<ComponentType<ComponentTreeProps>>('ComponentTreeContext')
