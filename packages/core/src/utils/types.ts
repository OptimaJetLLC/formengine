import {ReactNode} from 'react'
import {ComponentData} from './contexts/ComponenDataContext'

export enum InsertPosition {
  Before,
  After,
  Inner
}
export type WrapperProps = { children: ReactNode }
export type ComponentMove = Omit<ComponentData, 'model'>
