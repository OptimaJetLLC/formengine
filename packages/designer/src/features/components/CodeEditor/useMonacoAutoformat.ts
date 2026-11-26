import type {OnMount} from '@monaco-editor/react'
import type {editor, IDisposable} from 'monaco-editor'
import {useCallback, useEffect, useMemo, useRef} from 'react'

const FORMAT_DOCUMENT_ACTION = 'editor.action.formatDocument'
const FORMATTER_POLL_MS = 25

const autoFormatOptions: editor.IStandaloneEditorConstructionOptions = {
  autoIndent: 'advanced',
  formatOnPaste: true,
  // Effective only when the language registers an on-type formatting provider (JSON does not).
  formatOnType: true,
}

/** Explicit clears so Monaco `updateOptions` merges do not leave stale true values. */
const disabledAutoFormatOptions: editor.IStandaloneEditorConstructionOptions = {
  formatOnPaste: false,
  formatOnType: false,
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
 * Attaches flush/paste autoformat listeners for a mounted editor.
 * @param monacoEditor the mounted editor.
 * @returns disposables and a flag updated when a flush formats during the initial attach window.
 */
const attachAutoformatListeners = (monacoEditor: editor.IStandaloneCodeEditor) => {
  const disposables: IDisposable[] = []
  let disposed = false
  let formattedFromFlushDuringAttach = false

  const formatWhenReady = () => {
    if (disposed) return
    disposables.push(scheduleFormatWhenReady(monacoEditor, true))
  }

  disposables.push(
    monacoEditor.onDidChangeModelContent(({isFlush}) => {
      if (!isFlush) return
      formattedFromFlushDuringAttach = true
      formatWhenReady()
    })
  )
  disposables.push(
    monacoEditor.onDidPaste(() => {
      formatWhenReady()
    })
  )

  const disposeAll = () => {
    disposed = true
    for (const disposable of disposables) {
      disposable.dispose()
    }
    disposables.length = 0
  }

  return {
    formatWhenReady,
    disposeAll,
    get formattedFromFlushDuringAttach() {
      return formattedFromFlushDuringAttach
    },
  }
}

/**
 * Merges optional autoformat Monaco options and an onMount handler that formats on open / value flush.
 * Does not own unrelated editor defaults (e.g. wordWrap); callers merge those into `options`.
 * Keeps listeners and effective options in sync when `autoformat` changes on a mounted editor.
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
  const onMountRef = useRef(onMount)
  onMountRef.current = onMount
  const autoformatRef = useRef(autoformat)
  autoformatRef.current = autoformat
  const detachRef = useRef<(() => void) | null>(null)

  const monacoOptions = useMemo(
    () => ({
      ...options,
      ...(autoformat ? autoFormatOptions : disabledAutoFormatOptions),
    }),
    [autoformat, options]
  )

  const detachAutoformat = useCallback(() => {
    detachRef.current?.()
    detachRef.current = null
  }, [])

  const enableAutoformat = useCallback(
    (monacoEditor: editor.IStandaloneCodeEditor, formatAfterAttach: boolean) => {
      detachAutoformat()
      monacoEditor.updateOptions(autoFormatOptions)
      const attachment = attachAutoformatListeners(monacoEditor)
      detachRef.current = attachment.disposeAll

      if (formatAfterAttach && !attachment.formattedFromFlushDuringAttach) {
        queueMicrotask(attachment.formatWhenReady)
      }
    },
    [detachAutoformat]
  )

  const handleMount: OnMount = useCallback(
    (monacoEditor, monaco) => {
      editorRef.current = monacoEditor

      monacoEditor.onDidDispose(() => {
        detachAutoformat()
        editorRef.current = null
      })

      if (autoformatRef.current) {
        // Attach before caller onMount so setValue flushes during mount are observed.
        detachAutoformat()
        monacoEditor.updateOptions(autoFormatOptions)
        const attachment = attachAutoformatListeners(monacoEditor)
        detachRef.current = attachment.disposeAll
        onMountRef.current?.(monacoEditor, monaco)
        if (!attachment.formattedFromFlushDuringAttach) {
          queueMicrotask(attachment.formatWhenReady)
        }
      } else {
        monacoEditor.updateOptions(disabledAutoFormatOptions)
        onMountRef.current?.(monacoEditor, monaco)
      }
    },
    [detachAutoformat]
  )

  useEffect(() => {
    const monacoEditor = editorRef.current
    if (!monacoEditor) return

    if (autoformat) {
      // handleMount may already have attached; avoid dispose/reattach churn on first paint.
      if (!detachRef.current) {
        enableAutoformat(monacoEditor, true)
      } else {
        monacoEditor.updateOptions(autoFormatOptions)
      }
      return detachAutoformat
    }

    detachAutoformat()
    monacoEditor.updateOptions(disabledAutoFormatOptions)
    return undefined
  }, [autoformat, detachAutoformat, enableAutoformat])

  return {monacoOptions, onMount: handleMount}
}
