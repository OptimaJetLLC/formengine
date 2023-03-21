import {ComponentData} from 'fb-core'

export enum InsertPosition {
  Before,
  After,
  Inner
}

export type ComponentMove = Omit<ComponentData, 'model' | 'key'>

export type BuilderMode = 'builder' | 'viewer'

export type BuilderTheme = 'dark' | 'light'
