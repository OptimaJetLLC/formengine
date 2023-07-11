/**
 * Interface for storing forms in an external storage.
 */
export interface FormStorage {

  /**
   * @returns the {@link Promise} with an array of form names.
   */
  getFormNames: () => Promise<string[]>

  /**
   * Removes the form by form name.
   * @param formName the form name.
   * @returns the {@link Promise} with the result of removal.
   */
  removeForm: (formName: string) => Promise<any>

  /**
   * Returns the form serialized in JSON by the form name.
   * @param formName the form name.
   * @returns the {@link Promise} with the form serialized in JSON.
   */
  getForm: (formName: string) => Promise<string>

  /**
   * Saves the form serialized in JSON.
   * @param formName the form name.
   * @param formValue the form serialized in JSON.
   * @returns the {@link Promise} with the result of saving the form.
   */
  saveForm: (formName: string, formValue: string) => Promise<any>
}
