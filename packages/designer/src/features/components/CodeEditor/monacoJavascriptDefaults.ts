import {ActionEventArgsDeclaration, IFormDataDeclaration} from '@react-form-builder/core'

/**
 * The additional source file to the language service.
 */
type MonacoExtraLib = {

  /**
   * The file content.
   */
  content: string

  /**
   * The optional file path.
   */
  filePath?: string
}

export const monacoJavascriptDefaults: MonacoExtraLib[] = [
  {content: ActionEventArgsDeclaration, filePath: 'ActionEventArgs'},
  {content: IFormDataDeclaration, filePath: 'Form'}
]
