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

  /**
   * Deletes the currently selected components from the form.
   */
  deleteSelected: () => void

  /**
   * Clones the selected component when exactly one component is selected.
   */
  cloneSelected: () => void

  /**
   * Saves the current form to form storage without showing the designer toast.
   * Built-in Ctrl/Cmd+S and the Save menu still show success/error toasts via the UI layer.
   * @param formName the optional form name. When omitted, the active form name is used.
   * @returns the promise that resolves when the form is saved.
   */
  save: (formName?: string) => Promise<void>

  /**
   * Prints the form (switches to viewer mode for printing when needed).
   */
  print: () => void

  /**
   * Undoes the last form edit.
   */
  undo: () => void

  /**
   * Redoes the last undone form edit.
   */
  redo: () => void
}
