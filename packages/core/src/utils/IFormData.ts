/**
 * The interface for accessing the form data.
 */
export interface IFormData {
  /**
   * @returns the {@link Record} with all the form data.
   */
  get data(): Record<string, unknown>

  /**
   * @returns the {@link Record} with all validation error messages.
   */
  get errors(): Record<string, unknown>

  /**
   * true if the form contains errors, otherwise false.
   */
  get hasErrors(): boolean

  /**
   * Sets the validation error message for all form data fields.
   * @param message the validation error message.
   */
  setAllErrors: (message?: string) => void

  /**
   * Validates the data in the form.
   */
  validate: () => Promise<void>

  /**
   * If true, then validation is in progress.
   */
  get isValidating(): boolean

  /**
   * Sets the form to its default value.
   */
  reset: () => void

  /**
   * Clears the form data.
   */
  clear: () => void
}

/**
 * Description of the form data for the code editor.
 */
export const IFormDataDeclaration = `declare interface IFormData {
  /**
   * @returns the {@link Record} with all the form data.
   */
  get data(): Record<string, unknown>

  /**
   * @returns the {@link Record} with all validation error messages.
   */
  get errors(): Record<string, unknown>

  /**
   * true if the form contains errors, otherwise false.
   */
  get hasErrors(): boolean

  /**
   * Sets the validation error message for all form data fields.
   * @param message the validation error message.
   */
  setAllErrors(message?: string): void

  /**
   * Validates the data in the form.
   */
  validate(): Promise<void>

  /**
   * If true, then validation is in progress.
   */
  get isValidating(): boolean

  /**
   * Sets the form to its default value.
   */
  reset(): void

  /**
   * Clears the form data.
   */
  clear(): void
}`
