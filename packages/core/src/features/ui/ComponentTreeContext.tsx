import {ComponentType} from 'react'
import {ComponentTreeProps} from '../../types'
import {createNamedContext} from '../../utils/createNamedContext'

export const [useComponentTree, ComponentTreeProvider] = createNamedContext<ComponentType<ComponentTreeProps>>('ComponentTreeContext')
