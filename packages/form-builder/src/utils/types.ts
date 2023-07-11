import {ComponentData} from '@react-form-builder/core'

/**
 * The position of an inserted component relative to another component.
 */
export enum InsertPosition {
  Before,
  After,
  Inner
}

/**
 * The type of drag-and-drop component in the form builder.
 */
export type ComponentMove = Omit<ComponentData, 'model' | 'key'>

/**
 * Form builder mode. Builder or viewer.
 */
export type BuilderMode = 'builder' | 'viewer'

/**
 * Browser theme. Dark or light.
 */
export type BuilderTheme = 'dark' | 'light'
