/**
 * Field with the form data.
 */
export interface Field {

  /**
   * Flag, false if nested form data show as nested object, true otherwise.
   */
  storeDataInParentForm?: boolean

  /**
   * Contains a field validation error if the field data is not valid.
   */
  error?: string

  /**
   * Flag, true, if the field is marked as touched.
   */
  touched: boolean

  /**
   * Value of the field.
   */
  value: unknown

  /**
   * The name of the component property that contains the field value.
   */
  valued: string

  /**
   * Sets the value of the field.
   * @param value the value.
   */
  setValue: (value: unknown) => void

  /**
   * Marks the field as touched.
   */
  setTouched: () => void

  /**
   * Validates the field value.
   */
  validate: () => void

  /**
   * Sets the field to its default value.
   */
  reset: () => void

  /**
   * Clears the data in the field.
   */
  clear: () => void
}
