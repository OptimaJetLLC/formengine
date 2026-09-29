import type {OnMount, Theme} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'

/**
 * Supported languages formatting.
 */
export type CodeEditorLanguage = 'javascript' | 'json' | 'fluent' | 'css'

/**
 * The properties of the UnconstrainedCodeEditor React component.
 */
export interface UnconstrainedCodeEditorProps {
  /**
   * The initial source code.
   */
  initialValue: string
  /**
   * The callback function that is called when the source code is changed.
   * @param value the source code.
   */
  onChange: (value: string) => void
  /**
   * The code editor language.
   * @default 'javascript'
   */
  language?: CodeEditorLanguage
  /**
   * The code editor height.
   */
  height?: string | number
  /**
   * The code editor width.
   */
  width?: string | number
  /**
   * The code editor CSS class name.
   */
  className?: string
  /**
   * The options for creating a monaco editor.
   */
  options?: editor.IStandaloneEditorConstructionOptions
  /**
   * The theme for the monaco.
   */
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  theme?: Theme | string
  /**
   * Callback function called when the Monaco editor is mounted.
   */
  onMount?: OnMount
}

/**
 * Properties for adding constraints to the code editor.
 */
interface ConstrainedProps {
  /**
   * Context line before the source code. Automatically adds the "}" symbol to the end.
   * Especially useful to add jsdoc for typing before.
   * @example
   * '... jsdoc ...
   * function abc(name) {'
   */
  beginContextLine?: string
  /**
   * Context line after the source code.
   */
  endContextLine?: string
  /**
   * Flag, if true then the context string before the source code is editable, false otherwise.
   */
  canEditBeginContextLine?: boolean
  /**
   * Callback function called when the Monaco editor is mounted.
   */
  onMount?: OnMount
}

/**
 * The properties of the CodeEditor React component.
 */
export interface CodeEditorProps extends UnconstrainedCodeEditorProps, ConstrainedProps {}
