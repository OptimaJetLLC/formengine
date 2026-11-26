import type {OnMount} from '@monaco-editor/react'
import type {editor, IDisposable} from 'monaco-editor'
import {useCallback, useMemo, useRef} from 'react'

const autoFormatOptions: editor.IStandaloneEditorConstructionOptions = {
  autoIndent: 'advanced',
  formatOnPaste: true,
  formatOnType: true,
}

/**
 * Merges optional autoformat Monaco options and an onMount handler that formats on open / value flush.
 * Does not own unrelated editor defaults (e.g. wordWrap); callers merge those into `options`.
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
      ...options,
      ...(autoformat ? autoFormatOptions : {}),
    }),
    [autoformat, options]
  )

  const handleMount: OnMount = useCallback(
    (monacoEditor, monaco) => {
      if (!autoformat) {
        onMount?.(monacoEditor, monaco)
        return
      }

      editorRef.current = monacoEditor

      const disposables: IDisposable[] = []
      let formattedFromFlushDuringMount = false

      disposables.push(
        monacoEditor.onDidChangeModelContent(({isFlush}) => {
          if (!isFlush) return
          formattedFromFlushDuringMount = true
          formatDocument()
        })
      )
      // Editor-scoped: dispose listeners with the editor so remounts (e.g. Edit JSON modal) do not leak.
      disposables.push(
        monacoEditor.onDidDispose(() => {
          for (const disposable of disposables) {
            disposable.dispose()
          }
          disposables.length = 0
        })
      )

      // Caller onMount may swap the model (JsonView) or setValue (flush). Format after that.
      // Skip the microtask when a flush already formatted during onMount (one trigger).
      // Avoid onDidLayoutChange: formatDocument can change layout and loop.
      onMount?.(monacoEditor, monaco)
      if (!formattedFromFlushDuringMount) {
        queueMicrotask(formatDocument)
      }
    },
    [autoformat, formatDocument, onMount]
  )

  return {monacoOptions, onMount: handleMount}
}
