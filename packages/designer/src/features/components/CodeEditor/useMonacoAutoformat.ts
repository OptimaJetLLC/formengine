import type {OnMount} from '@monaco-editor/react'
import type {editor, IDisposable} from 'monaco-editor'
import {useCallback, useMemo, useRef} from 'react'

const FORMAT_DOCUMENT_ACTION = 'editor.action.formatDocument'
const FORMATTER_POLL_MS = 25

const autoFormatOptions: editor.IStandaloneEditorConstructionOptions = {
  autoIndent: 'advanced',
  formatOnPaste: true,
  formatOnType: true,
}

/**
 * Forces Monaco's FormatOnPaste contribution to (re)attach its paste listener.
 * That contribution can initialize after options, model, and formatter are already ready; in that
 * case it registers change handlers without calling `_update`, so paste formatting never arms.
 * @param monacoEditor the mounted editor.
 */
const rearmFormatOnPaste = (monacoEditor: editor.IStandaloneCodeEditor) => {
  monacoEditor.updateOptions({formatOnPaste: false})
  monacoEditor.updateOptions({formatOnPaste: true})
}

/**
 * Runs format-document once Monaco reports the action as supported for the active model.
 * JSON language support (and its formatter) loads asynchronously; an early run is a silent no-op.
 * @param monacoEditor the mounted editor.
 * @param rearmPaste when true, re-arm Monaco formatOnPaste after the formatter is ready.
 * @returns a disposable that cancels a pending wait.
 */
const scheduleFormatWhenReady = (monacoEditor: editor.IStandaloneCodeEditor, rearmPaste = false): IDisposable => {
  let cancelled = false
  let intervalId: ReturnType<typeof setInterval> | undefined

  const tryFormat = () => {
    if (cancelled) return true
    const action = monacoEditor.getAction(FORMAT_DOCUMENT_ACTION)
    if (!action?.isSupported()) return false
    if (rearmPaste) rearmFormatOnPaste(monacoEditor)
    void action.run()
    return true
  }

  if (!tryFormat()) {
    intervalId = setInterval(() => {
      if (tryFormat() && intervalId !== undefined) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    }, FORMATTER_POLL_MS)
  }

  return {
    dispose: () => {
      cancelled = true
      if (intervalId !== undefined) {
        clearInterval(intervalId)
        intervalId = undefined
      }
    },
  }
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
      let disposed = false
      let formattedFromFlushDuringMount = false

      const formatWhenReady = () => {
        if (disposed) return
        // Rearm paste whenever the formatter becomes ready: FormatOnPaste may have missed its listener.
        disposables.push(scheduleFormatWhenReady(monacoEditor, true))
      }

      disposables.push(
        monacoEditor.onDidChangeModelContent(({isFlush}) => {
          if (!isFlush) return
          formattedFromFlushDuringMount = true
          formatWhenReady()
        })
      )
      // Own paste path: Monaco's formatOnPaste contribution may miss its listener (see rearmFormatOnPaste).
      disposables.push(
        monacoEditor.onDidPaste(() => {
          formatWhenReady()
        })
      )
      // Editor-scoped: dispose listeners with the editor so remounts (e.g. Edit JSON modal) do not leak.
      disposables.push(
        monacoEditor.onDidDispose(() => {
          disposed = true
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
        queueMicrotask(formatWhenReady)
      }
    },
    [autoformat, onMount]
  )

  return {monacoOptions, onMount: handleMount}
}
