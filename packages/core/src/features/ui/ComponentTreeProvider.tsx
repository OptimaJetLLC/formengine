import {ComponentType} from 'react'
import {createNamedContext} from '../../utils/createNamedContext'

export const [useComponentTree, ComponentTreeProvider] = createNamedContext<ComponentType<any>>('ComponentTreeContext')
