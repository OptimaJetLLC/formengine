/**
 * The position of an inserted component relative to another component.
 */
export enum InsertPosition {
  Before,
  After,
  Inner
}

/**
 * Form builder mode. Builder or viewer.
 */
export type BuilderMode = 'builder' | 'viewer'

/**
 * Browser theme. Dark or light.
 */
export type BuilderTheme = 'dark' | 'light'
