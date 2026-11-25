import type {OnMount} from '@monaco-editor/react'
import type {editor} from 'monaco-editor'
import {useCallback, useMemo, useRef} from 'react'

const autoFormatOptions: editor.IStandaloneEditorConstructionOptions = {
  autoIndent: 'advanced',
  formatOnPaste: true,
  formatOnType: true,
}

/**
 * Builds Monaco options and an onMount handler that apply optional document autoformat.
 * @param autoformat whether autoformat is enabled.
 * @param options the caller Monaco construction options.
 * @param onMount the optional mount callback from the caller.
 * @returns the merged Monaco options and mount handler.
 */
export const useMonacoAutoformat = (
  autoformat: boolean | undefined,
  options: editor.IStandaloneEditorConstructionOptions | undefined,
  onMount?: OnMount
) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null)

  const formatDocument = useCallback(() => {
    void editorRef.current?.getAction('editor.action.formatDocument')?.run()
  }, [])

  const monacoOptions = useMemo(
    () => ({
      wordWrap: 'on' as const,
      ...options,
      ...(autoformat ? autoFormatOptions : {}),
    }),
    [autoformat, options]
  )

  const handleMount: OnMount = useCallback(
    (monacoEditor, monaco) => {
      editorRef.current = monacoEditor

      if (autoformat) {
        // Monaco formats after language config / layout settle; flush covers setValue replacements.
        monacoEditor.onDidChangeModelLanguageConfiguration(formatDocument)
        monacoEditor.onDidLayoutChange(formatDocument)
        monacoEditor.onDidChangeModelContent(({isFlush}) => {
          if (isFlush) formatDocument()
        })
      }

      onMount?.(monacoEditor, monaco)
    },
    [autoformat, formatDocument, onMount]
  )

  return {monacoOptions, onMount: handleMount}
}
