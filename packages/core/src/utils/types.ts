import {ReactNode} from 'react'
import {ComponentData} from './contexts/ComponenDataContext'

export type WrapperProps = { children: ReactNode }
export type ComponentMove = Omit<ComponentData, 'model'>
