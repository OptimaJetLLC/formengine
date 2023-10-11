import type {Theme} from '@monaco-editor/react'
import {editor} from 'monaco-editor'

/**
 * The properties of the UnconstrainedCodeEditor React component.
 */
export interface UnconstrainedCodeEditorProps {
  initialValue: string
  onChange: (value: string) => void
  /**
   * @default 'javascript'
   */
  language?: 'javascript' | 'json' | 'scss' | 'fluent'
  height?: string | number
  width?: string | number
  className?: string
  options?: editor.IStandaloneEditorConstructionOptions
  /**
   * The theme for the monaco.
   */
  theme?: Theme | string;
}

/**
 * Properties for adding constraints to the code editor.
 */
export interface ConstrainedProps {
  /**
   * Read only line for adding context to a code. Automatically adds the "}" symbol to the end.
   * Especially useful to add jsdoc for typing before.
   * @example
   * '... jsdoc ...
   * function abc(name) {'
   */
  beginContextLine?: string
  endContextLine?: string
  canEditBeginContextLine?: boolean
}

/**
 * The properties of the CodeEditor React component.
 */
export interface CodeEditorProps extends UnconstrainedCodeEditorProps, ConstrainedProps {
}
