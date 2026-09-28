/**
 * The editable form validator.
 */
export class EditableFormValidator {
  /**
   * Creates an editor for the form validator.
   * @param editorKey the unique code editor key.
   * @param code the form validator code.
   * @param onSave the callback function called when data should be saved.
   * @param onValidate the optional callback function called when data should be validated.
   */
  constructor(
    readonly editorKey: string,
    readonly code: string,
    readonly onSave: (value: string) => void,
    readonly onValidate?: (value: string) => void
  ) {}
}
