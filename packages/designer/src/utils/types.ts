import type {BuilderMode, ViewMode} from '@react-form-builder/core'

/**
 * The position of an inserted component relative to another component.
 */
export type InsertPosition = 'before' | 'after' | 'inner'

/**
 * Display resolution type of the form builder.
 */
export type Device = 'any' | ViewMode

/**
 * The form builder settings interface.
 */
export interface IFormBuilder {
  /**
   * @returns the current form builder mode. Builder or viewer.
   */
  get builderMode(): BuilderMode

  /**
   * Sets the form builder mode. Builder or viewer.
   */
  set builderMode(mode: BuilderMode)

  /**
   * @returns the current form serialized to JSON.
   */
  get formAsString(): string

  /**
   * Sets the form serialized in JSON as the current form.
   * @param text the form serialized in JSON.
   */
  parseForm: (text: string) => void

  /**
   * Updates the form list on the Forms tab.
   */
  reloadFormList: () => void
}
