import type {OnMount} from '@monaco-editor/react'
import {act, render, waitFor} from '@testing-library/react'
import {useEffect, useRef, useState} from 'react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {MonacoCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor'
import {UnconstrainedCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/UnconstrainedCodeEditor'
import {
  FORMATTER_READY_TIMEOUT_MS,
  useMonacoAutoformat,
} from '../../../packages/designer/src/features/components/CodeEditor/useMonacoAutoformat'
import bookingForm from './forms/booking-form.json'
import designerForm from './forms/designer-form.json'
import loginForm from './forms/login-form.json'

type AutoformatHarnessProps = {
  initialValue: string
  autoformat?: boolean
  onMount?: OnMount
}

/**
 * Thin surface over useMonacoAutoformat without UnconstrainedCodeEditor's initialValue sync effect.
 */
const AutoformatHarness = ({initialValue, autoformat, onMount}: AutoformatHarnessProps) => {
  const {monacoOptions, onMount: autoformatOnMount} = useMonacoAutoformat(autoformat, undefined, onMount)
  return (
    <MonacoCodeEditor
      onMount={autoformatOnMount}
      defaultValue={initialValue}
      height="100%"
      width="100%"
      language="json"
      options={monacoOptions}
    />
  )
}

type MonacoEditorProps = {
  className?: string
  defaultValue?: string
  options?: Record<string, unknown>
  onMount?: OnMount
}

let lastMonacoOptions: Record<string, unknown> | undefined
let contentListenerDisposeCount = 0
let formatRunCount = 0
let formatSourceSnapshots: string[] = []
/** Remaining `isSupported()` calls that return false before the formatter becomes ready. */
let unsupportedFormatChecksRemaining = 0
let formatIsSupportedCallCount = 0
/** When true, `formatDocument` rejects (simulates disposed model / invalid buffer). */
let formatRunShouldReject = false
let updateOptionsCalls: Record<string, unknown>[] = []
let pasteListeners: Array<() => void> = []

type FakeMonacoEditor = {
  getAction: (id: string) => {run: () => Promise<void>; isSupported: () => boolean} | null
  onDidChangeModelContent: (listener: (event: {isFlush: boolean}) => void) => {dispose: () => void}
  onDidPaste: (listener: () => void) => {dispose: () => void}
  onDidDispose: (listener: () => void) => {dispose: () => void}
  updateOptions: (options: Record<string, unknown>) => void
  getValue: () => string
  setValue: (next: string) => void
  /**
   * Simulates JsonView `setModel` content swap without `isFlush`, so post-mount format must come from the microtask.
   */
  applyModelValue: (next: string) => void
  /**
   * Fires registered Monaco paste listeners (dual-path paste format contract).
   */
  firePaste: () => void
}

/**
 * Fake Monaco surface that runs formatDocument by pretty-printing JSON.
 */
vi.mock('../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor', () => ({
  MonacoCodeEditor: ({className, defaultValue, options, onMount}: MonacoEditorProps) => {
    const [value, setValue] = useState(defaultValue ?? '')
    const valueRef = useRef(value)
    valueRef.current = value
    lastMonacoOptions = options

    useEffect(() => {
      const contentListeners: Array<(event: {isFlush: boolean}) => void> = []
      const disposeListeners: Array<() => void> = []
      pasteListeners = []

      const formatDocument = () => {
        formatRunCount += 1
        formatSourceSnapshots.push(valueRef.current)
        try {
          const next = JSON.stringify(JSON.parse(valueRef.current), null, 2)
          valueRef.current = next
          setValue(next)
        } catch {
          // leave non-JSON buffers unchanged
        }
        contentListeners.forEach(listener => listener({isFlush: false}))
      }

      const editor: FakeMonacoEditor = {
        getAction: (id: string) =>
          id === 'editor.action.formatDocument'
            ? {
                run: async () => {
                  if (formatRunShouldReject) {
                    throw new Error('formatDocument rejected')
                  }
                  formatDocument()
                },
                isSupported: () => {
                  formatIsSupportedCallCount += 1
                  if (unsupportedFormatChecksRemaining > 0) {
                    unsupportedFormatChecksRemaining -= 1
                    return false
                  }
                  return true
                },
              }
            : null,
        onDidChangeModelContent: (listener: (event: {isFlush: boolean}) => void) => {
          contentListeners.push(listener)
          return {
            dispose: () => {
              const index = contentListeners.indexOf(listener)
              if (index >= 0) {
                contentListeners.splice(index, 1)
                contentListenerDisposeCount += 1
              }
            },
          }
        },
        onDidPaste: (listener: () => void) => {
          pasteListeners.push(listener)
          return {
            dispose: () => {
              const index = pasteListeners.indexOf(listener)
              if (index >= 0) pasteListeners.splice(index, 1)
            },
          }
        },
        updateOptions: (next: Record<string, unknown>) => {
          updateOptionsCalls.push(next)
        },
        onDidDispose: (listener: () => void) => {
          disposeListeners.push(listener)
          return {
            dispose: () => {
              const index = disposeListeners.indexOf(listener)
              if (index >= 0) disposeListeners.splice(index, 1)
            },
          }
        },
        getValue: () => valueRef.current,
        setValue: (next: string) => {
          valueRef.current = next
          setValue(next)
          contentListeners.forEach(listener => listener({isFlush: true}))
        },
        applyModelValue: (next: string) => {
          valueRef.current = next
          setValue(next)
        },
        firePaste: () => {
          for (const listener of [...pasteListeners]) {
            listener()
          }
        },
      }

      onMount?.(editor as never, {} as never)
      return () => {
        // Copy: dispose callbacks may remove themselves from disposeListeners (3R-A).
        for (const listener of [...disposeListeners]) {
          listener()
        }
      }
    }, [onMount])

    return (
      <pre className={['monaco-editor', className].filter(Boolean).join(' ')} data-testid="autoformat-monaco">
        {value}
      </pre>
    )
  },
}))

const formExamples = [
  {name: 'login-form', form: loginForm},
  {name: 'designer-form', form: designerForm},
  {name: 'booking-form', form: bookingForm},
] as const

describe('Code editor autoformat with real form definitions', () => {
  beforeEach(() => {
    lastMonacoOptions = undefined
    contentListenerDisposeCount = 0
    formatRunCount = 0
    formatSourceSnapshots = []
    unsupportedFormatChecksRemaining = 0
    formatIsSupportedCallCount = 0
    formatRunShouldReject = false
    updateOptionsCalls = []
    pasteListeners = []
  })

  it.each(formExamples)('formats minified $name JSON on mount when autoformat is enabled', async ({form}) => {
    const minified = JSON.stringify(form)
    const pretty = JSON.stringify(form, null, 2)
    const onChange = vi.fn()

    const {findByTestId} = render(<UnconstrainedCodeEditor language="json" initialValue={minified} onChange={onChange} autoformat />)

    const editor = await findByTestId('autoformat-monaco')
    await waitFor(() => {
      expect(editor.textContent).toBe(pretty)
    })
    expect(lastMonacoOptions).toMatchObject({
      formatOnPaste: true,
      formatOnType: true,
    })
    expect(lastMonacoOptions).not.toHaveProperty('autoIndent')
  })

  it('does not format minified form JSON when autoformat is disabled', async () => {
    const minified = JSON.stringify(loginForm)
    const onChange = vi.fn()

    const {findByTestId} = render(<UnconstrainedCodeEditor language="json" initialValue={minified} onChange={onChange} />)

    const editor = await findByTestId('autoformat-monaco')
    expect(editor.textContent).toBe(minified)
    expect(lastMonacoOptions?.formatOnPaste).toBe(false)
  })

  it('formats flushed form JSON replacements when autoformat is enabled', async () => {
    const onChange = vi.fn()
    const {findByTestId, rerender} = render(
      <UnconstrainedCodeEditor language="json" initialValue={JSON.stringify(loginForm)} onChange={onChange} autoformat />
    )

    await findByTestId('autoformat-monaco')
    onChange.mockClear()

    rerender(<UnconstrainedCodeEditor language="json" initialValue={JSON.stringify(designerForm)} onChange={onChange} autoformat />)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(JSON.stringify(designerForm, null, 2))
    })
  })

  it('disposes the flush autoformat listener when the editor unmounts', async () => {
    const {findByTestId, unmount} = render(<AutoformatHarness initialValue={JSON.stringify(loginForm)} autoformat />)

    await findByTestId('autoformat-monaco')
    expect(contentListenerDisposeCount).toBe(0)

    unmount()

    expect(contentListenerDisposeCount).toBe(1)
  })

  it('formats the post-onMount model value once, not the pre-swap defaultValue', async () => {
    const minifiedLogin = JSON.stringify(loginForm)
    const minifiedDesigner = JSON.stringify(designerForm)
    const prettyDesigner = JSON.stringify(designerForm, null, 2)

    const onMount: OnMount = editor => {
      ;(editor as unknown as FakeMonacoEditor).applyModelValue(minifiedDesigner)
    }

    const {findByTestId} = render(<AutoformatHarness initialValue={minifiedLogin} onMount={onMount} autoformat />)

    const editor = await findByTestId('autoformat-monaco')
    await waitFor(() => {
      expect(editor.textContent).toBe(prettyDesigner)
    })

    expect(formatRunCount).toBe(1)
    expect(formatSourceSnapshots).toEqual([minifiedDesigner])
  })

  it('formats once when onMount flushes via setValue (skips mount microtask)', async () => {
    const minifiedLogin = JSON.stringify(loginForm)
    const minifiedDesigner = JSON.stringify(designerForm)
    const prettyDesigner = JSON.stringify(designerForm, null, 2)

    const onMount: OnMount = editor => {
      editor.setValue(minifiedDesigner)
    }

    const {findByTestId} = render(<AutoformatHarness initialValue={minifiedLogin} onMount={onMount} autoformat />)

    const editor = await findByTestId('autoformat-monaco')
    await waitFor(() => {
      expect(editor.textContent).toBe(prettyDesigner)
    })

    expect(formatRunCount).toBe(1)
    expect(formatSourceSnapshots).toEqual([minifiedDesigner])
  })

  it('enables formatting when autoformat flips from false to true on a mounted editor', async () => {
    const minifiedLogin = JSON.stringify(loginForm)
    const minifiedDesigner = JSON.stringify(designerForm)
    const prettyDesigner = JSON.stringify(designerForm, null, 2)

    const {findByTestId, rerender} = render(<UnconstrainedCodeEditor language="json" initialValue={minifiedLogin} onChange={vi.fn()} />)

    const editor = await findByTestId('autoformat-monaco')
    expect(editor.textContent).toBe(minifiedLogin)
    expect(lastMonacoOptions?.formatOnPaste).toBe(false)

    rerender(<UnconstrainedCodeEditor language="json" initialValue={minifiedDesigner} onChange={vi.fn()} autoformat />)

    await waitFor(() => {
      expect(editor.textContent).toBe(prettyDesigner)
    })
    expect(lastMonacoOptions).toMatchObject({
      formatOnPaste: true,
      formatOnType: true,
    })
    expect(lastMonacoOptions).not.toHaveProperty('autoIndent')
  })

  it('disables formatting replacements when autoformat flips from true to false', async () => {
    const onChange = vi.fn()
    const {findByTestId, rerender} = render(
      <UnconstrainedCodeEditor language="json" initialValue={JSON.stringify(loginForm)} onChange={onChange} autoformat />
    )

    await findByTestId('autoformat-monaco')
    onChange.mockClear()

    rerender(<UnconstrainedCodeEditor language="json" initialValue={JSON.stringify(designerForm)} onChange={onChange} />)

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(JSON.stringify(designerForm))
    })
    expect(onChange).not.toHaveBeenCalledWith(JSON.stringify(designerForm, null, 2))
    expect(lastMonacoOptions).toMatchObject({
      formatOnPaste: false,
      formatOnType: false,
    })
  })

  it('formats once after the formatter becomes supported (cold-open readiness)', async () => {
    unsupportedFormatChecksRemaining = 4
    const minified = JSON.stringify(loginForm)
    const pretty = JSON.stringify(loginForm, null, 2)

    const {findByTestId} = render(<AutoformatHarness initialValue={minified} autoformat />)

    const editor = await findByTestId('autoformat-monaco')
    expect(editor.textContent).toBe(minified)

    await waitFor(() => {
      expect(editor.textContent).toBe(pretty)
    })
    expect(formatRunCount).toBe(1)
  })

  it('formats only once when paste fires while still waiting for the formatter', async () => {
    unsupportedFormatChecksRemaining = 6
    const minified = JSON.stringify(loginForm)
    const pretty = JSON.stringify(loginForm, null, 2)
    let editorApi: FakeMonacoEditor | undefined

    const {findByTestId} = render(
      <AutoformatHarness
        initialValue={minified}
        autoformat
        onMount={ed => {
          editorApi = ed as unknown as FakeMonacoEditor
        }}
      />
    )

    await findByTestId('autoformat-monaco')
    expect(pasteListeners.length).toBeGreaterThan(0)
    editorApi!.firePaste()

    await waitFor(() => {
      expect(formatRunCount).toBe(1)
    })
    await new Promise(resolve => setTimeout(resolve, 150))
    expect(formatRunCount).toBe(1)
    expect((await findByTestId('autoformat-monaco')).textContent).toBe(pretty)
  })

  it('stops polling when the formatter never becomes supported', async () => {
    unsupportedFormatChecksRemaining = Number.POSITIVE_INFINITY

    const {findByTestId} = render(<AutoformatHarness initialValue={JSON.stringify(loginForm)} autoformat />)
    await findByTestId('autoformat-monaco')
    await waitFor(() => {
      expect(formatIsSupportedCallCount).toBeGreaterThan(1)
    })

    await new Promise(resolve => setTimeout(resolve, FORMATTER_READY_TIMEOUT_MS + 100))
    const checksAfterTimeout = formatIsSupportedCallCount
    await new Promise(resolve => setTimeout(resolve, 200))

    expect(formatIsSupportedCallCount).toBe(checksAfterTimeout)
    expect(formatRunCount).toBe(0)
  })

  it('formats when onDidPaste fires after the formatter is ready', async () => {
    const minified = JSON.stringify(loginForm)
    const pretty = JSON.stringify(loginForm, null, 2)
    let editorApi: FakeMonacoEditor | undefined

    const {findByTestId} = render(
      <AutoformatHarness
        initialValue='{"keep":true}'
        autoformat
        onMount={ed => {
          editorApi = ed as unknown as FakeMonacoEditor
        }}
      />
    )

    await waitFor(() => {
      expect(formatRunCount).toBe(1)
    })
    formatRunCount = 0

    await act(async () => {
      editorApi!.applyModelValue(minified)
      editorApi!.firePaste()
    })

    await waitFor(() => {
      expect(formatRunCount).toBe(1)
    })
    expect((await findByTestId('autoformat-monaco')).textContent).toBe(pretty)
  })

  it('does not leave an unhandled rejection when formatDocument rejects', async () => {
    formatRunShouldReject = true
    const unhandled: unknown[] = []
    const onUnhandled = (reason: unknown) => {
      unhandled.push(reason)
    }
    process.on('unhandledRejection', onUnhandled)

    const {findByTestId} = render(<AutoformatHarness initialValue={JSON.stringify(loginForm)} autoformat />)
    await findByTestId('autoformat-monaco')
    await new Promise(resolve => setTimeout(resolve, 50))

    process.off('unhandledRejection', onUnhandled)
    expect(unhandled).toEqual([])
  })

  it('does not override Monaco autoIndent via autoformat option updates', async () => {
    const {findByTestId, rerender} = render(
      <UnconstrainedCodeEditor language="json" initialValue={JSON.stringify(loginForm)} onChange={vi.fn()} autoformat />
    )

    await findByTestId('autoformat-monaco')
    expect(updateOptionsCalls.every(call => !('autoIndent' in call))).toBe(true)

    rerender(<UnconstrainedCodeEditor language="json" initialValue={JSON.stringify(loginForm)} onChange={vi.fn()} />)

    await waitFor(() => {
      expect(lastMonacoOptions).toMatchObject({
        formatOnPaste: false,
        formatOnType: false,
      })
    })
    expect(updateOptionsCalls.every(call => !('autoIndent' in call))).toBe(true)
  })
})
