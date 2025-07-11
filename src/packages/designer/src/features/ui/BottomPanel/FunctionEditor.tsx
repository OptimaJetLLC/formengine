import type {BaseCompilationResult} from '@react-form-builder/core'
import type {GenericCodeEditorProps} from '../../calculation/GenericCodeEditor'
import {GenericCodeEditor} from '../../calculation/GenericCodeEditor'
import {Header} from './Header'

interface FunctionEditorProps extends Omit<GenericCodeEditorProps, 'compact' | 'onCompile'> {
  /**
   * The function editor header.
   */
  header: string

  /**
   * The callback function called at compile time.
   * @param sourceCode the source code.
   * @returns the compilation result.
   */
  onCompile: (sourceCode: string) => BaseCompilationResult
}

/**
 * The code editor for the function property type.
 * @param props the React component properties.
 * @returns the React element.
 */
export const FunctionEditor = (props: FunctionEditorProps) => {
  const {header, ...codeEditorProps} = props

  return <>
    <Header>{header}</Header>
    <GenericCodeEditor {...codeEditorProps} compact/>
  </>
}
