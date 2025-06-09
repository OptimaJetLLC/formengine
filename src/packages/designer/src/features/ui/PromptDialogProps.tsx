import type {Component, ForwardedRef} from 'react'

/**
 * The type of the input field.
 */
export interface PromptField {
  /**
   * The name of the field.
   */
  name: string
  /**
   * The component of the field.
   */
  component?: ForwardedRef<any> | Component
  /**
   * The label of the field.
   */
  label?: string
  /**
   * The value of the field.
   */
  value?: unknown
  /**
   * The placeholder for the field.
   */
  placeholder?: string
  /**
   * The props for the field component.
   */
  props?: Record<string, any>
}

/**
 * The result of the validation of the prompt dialog fields.
 */
export type PromptValidationResult = Record<string, string | undefined> | undefined

/**
 * Properties of the modal dialog for data entry.
 */
export interface PromptDialogProps {
  /**
   * When set to true, the Modal will display the background when it is opened.
   * Clicking on the background will close the Modal.
   * If you do not want to close the Modal, set it to 'static'.
   */
  backdrop?: boolean | 'static';
  /**
   * The title.
   */
  title: string
  /**
   * The placeholder for the input field.
   */
  placeholder?: string
  /**
   * The text of the confirmation button.
   */
  okText?: string
  /**
   * The text of the cancel button.
   */
  cancelText?: string
  /**
   * The value for the input field.
   */
  value?: Record<string, any>
  /**
   * The callback function called when the confirmation button is pressed.
   * @param value the value of the input field.
   */
  onOk: (value: Record<string, any>) => void
  /**
   * The fields for the input.
   */
  fields?: PromptField[]
  /**
   * The callback function called when the cancel button is pressed.
   */
  onCancel?: () => void
  /**
   * The callback function called when a modal dialog is closed.
   */
  onClose?: () => void

  /**
   * The function for validating the entered value.
   * @param value the value for validation.
   * @returns the string with an error or undefined if validation was successful.
   */
  validate?: (value: Record<string, any>) => Promise<PromptValidationResult>
}
