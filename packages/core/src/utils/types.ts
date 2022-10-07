import {ComponentType} from 'react'
import {ComponentData} from './contexts/ComponenDataContext'

export interface WrapperProps {
  View: ComponentType<any>
  viewProps: Record<string, any>
}

export type Wrapper = ComponentType<WrapperProps>
export type ComponentMove = Omit<ComponentData, 'model'>
