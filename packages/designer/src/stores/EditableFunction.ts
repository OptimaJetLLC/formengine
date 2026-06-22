import type {BaseCompilationResult} from '@react-form-builder/core'

/**
 * The properties of the function being edited.
 */
export class EditableFunction {
  /**
   * Constructor.
   * @param header the function editor header.
   * @param onSave the callback function called when the source code is saved.
   * @param onClose the callback function called when the editor is closed.
   * @param onCompile the callback function called at compile time.
   * @param source the source code.
   * @param beginContextLine the context line before the source code.
   * @param endContextLine the context line after the source code.
   */
  constructor(public header: string,
              public onSave: (value: string) => void,
              public onClose: () => void,
              public onCompile: (sourceCode: string) => BaseCompilationResult,
              public source: string,
              public beginContextLine: string,
              public endContextLine: string,
  ) {
  }
}
