// https://constrained-editor-plugin.vercel.app/docs/TypeDefinitions/available-type-definitions
declare module 'constrained-editor-plugin' {

  // eslint-disable-next-line import/no-extraneous-dependencies
  import {Monaco} from '@monaco-editor/react'
  // eslint-disable-next-line import/no-extraneous-dependencies
  import {editor, Range} from 'monaco-editor'

  /**
   * The range of the editable area, all numbers must be positive integers.
   */
  export type ConstraintRange = [startLine: number, startColumn: number, endLine: number, endColumn: number]

  /**
   * Info about the edit location.
   */
  export type Info = {
    /**
     * true if the content to be edited is on the end line of the range, false otherwise.
     */
    endLineOfRange: boolean,
    /**
     * true if the content to be edited is on the start line of the range, false otherwise.
     */
    startLineOfRange: boolean
  }

  /**
   * This callback can be used to validate the value entered in the editable area.
   * If returned false, then that content will not be added to the editable area.
   * Returning undefined will not be considered as a falsy value here.
   * Only false can prevent the content addition, all other values will be considered as truthy.
   * @param currentValue the current value with the edited content.
   * @param currentRange the new range with the edited content.
   * @param info the info about the edit location.
   * @returns false if the content is not to be added to the editable area.
   */
  export type ValidateCallback = (currentValue: string, currentRange: any, info: Info) => boolean | undefined

  /**
   * The object with settings for the editing restrictions plugin.
   */
  export type RangeRestrictionObject = {
    /**
     * The range of the editable area.
     */
    range: ConstraintRange
    /**
     * This field is used to tell the plugin whether or not to allow the '\n' character in a newline.
     */
    allowMultiline?: boolean
    /**
     * Treat this label as a unique identifier and do not declare two constraints with the same label.
     */
    label?: string
    /**
     * This callback can be used to check the value entered in the editable area.
     * If false is returned, this content will not be added to the editable area.
     */
    validate?: ValidateCallback
  }

  /**
   * The value of the editable range.
   */
  export type EditableRangeValue = {
    /**
     * This field is used to tell the plugin whether or not to allow the '\n' character in a newline.
     */
    allowMultiline: boolean
    /**
     * The monaco editor range of the editable area.
     */
    range: Range
    /**
     * The range of the editable area.
     */
    originalRange: ConstraintRange
  }

  /**
   * The value of the editable ranges.
   */
  export type EditableRangeObject = Record<string, EditableRangeValue>

  /**
   * The values in the editable ranges.
   */
  export type ValueInEditableRanges = Record<string, string>

  /**
   * CSS classes for highlighting.
   */
  export type CssClasses = {
    /**
     * The CSS class to highlight a single line.
     */
    cssClassForSingleLine: string
    /**
     * The CSS class to highlight multiple lines.
     */
    cssClassForMultiLine: string
  }

  /**
   * Constrained Editor Plugin instance.
   */
  export type ConstrainedInstance = {

    /**
     * This API is used to add the necessary functions to monaco editor instance to facilitate the constraints.
     * @param editor the monaco editor instance.
     * @returns true, if the instance is properly initialized.
     */
    initializeIn: (editor: editor.IStandaloneCodeEditor) => boolean

    /**
     * This API is used to add the restrictions to the constrained editor instance.
     * This should be called after the initialization of the constrained editor.
     * @param model the monaco text model.
     * @param ranges the object with settings for the editing restrictions plugin.
     * @returns the model after addition of the constraints.
     */
    addRestrictionsTo: (model: editor.ITextModel, ranges: RangeRestrictionObject[]) => ConstrainedMonacoEditorModel

    /**
     * This API is used to remove all restrictions from the model.
     * This will completely remove all restrictions and at present, there is no provision for removing a particular restriction.
     * @param model the monaco text model.
     * @returns true, if all the restrictions are removed.
     */
    removeRestrictionsIn: (model: editor.ITextModel) => boolean

    /**
     * This will dispose all the functions added to the editor instance.
     * The editor instance will revert back to normal state as it was before initialization.
     */
    disposeConstrainer: () => void

    /**
     * This API can be used during development. This will add an entry in the context menu to expose the selected range,
     * which can be used in the range objects. While enabled, the context menu will have a new entry named "Show Range in console",
     * on clicking it, it will display the selected range in console.
     *
     * This can be used to add in the range restriction object.
     */
    toggleDevMode: () => void
  }

  /**
   * Callback function for the 'onDidChangeContentInEditableRange' method.
   */
  export type OnDidChangeContentInEditableRangeCallback = (currentlyChangedContent: ValueInEditableRanges,
                                                           allValuesInEditableRanges: ValueInEditableRanges,
                                                           currentEditableRangeObject: EditableRangeObject) => void

  /**
   * Constrained Editor Plugin model.
   */
  export type ConstrainedEditorModel = {

    /**
     * This method will give the current value of the editable ranges.
     */
    getCurrentEditableRanges: () => EditableRangeObject

    /**
     * This method will return the current value in the Editable Ranges.
     */
    getValueInEditableRanges: () => ValueInEditableRanges

    /**
     * This method is used to remove all restrictions from the model.
     */
    disposeRestrictions: () => void

    /**
     * This method is used to add the callback for listening the changes happened inside the editable ranges.
     * @param callback the callback called when data in the editor changed.
     */
    onDidChangeContentInEditableRange: (callback: OnDidChangeContentInEditableRangeCallback) => void

    /**
     * This method can be used update the contents inside the editable ranges.
     * @param currentValuesAsObject the value to be set.
     */
    updateValueInEditableRanges: (currentValuesAsObject: ValueInEditableRanges) => void

    /**
     * This method can be used to change the entire restrictions of the model.
     * @param newRestrictions the new restrictions to set.
     */
    updateRestrictions: (newRestrictions: RangeRestrictionObject[]) => void

    /**
     * This method is mostly useful during development, this can be used to visually see the editable ranges.
     * @param cssClasses CSS classes for highlighting.
     */
    toggleHighlightOfEditableAreas: (cssClasses: CssClasses) => void
  }

  /**
   * Constrained Editor Plugin monaco editor model.
   */
  export type ConstrainedMonacoEditorModel = ConstrainedEditorModel & editor.ITextModel

  export function constrainedEditor(monaco: Monaco): ConstrainedInstance
}
