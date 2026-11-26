import type {OnMount} from '@monaco-editor/react'
import {render, waitFor} from '@testing-library/react'
import {useEffect, useRef, useState} from 'react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {MonacoCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/MonacoCodeEditor'
import {UnconstrainedCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/UnconstrainedCodeEditor'
import {useMonacoAutoformat} from '../../../packages/designer/src/features/components/CodeEditor/useMonacoAutoformat'
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

type FakeMonacoEditor = {
  getAction: (id: string) => {run: () => Promise<void>; isSupported: () => boolean} | null
  onDidChangeModelContent: (listener: (event: {isFlush: boolean}) => void) => {dispose: () => void}
  onDidDispose: (listener: () => void) => {dispose: () => void}
  getValue: () => string
  setValue: (next: string) => void
  /**
   * Simulates JsonView `setModel` content swap without `isFlush`, so post-mount format must come from the microtask.
   */
  applyModelValue: (next: string) => void
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
                run: async () => formatDocument(),
                isSupported: () => true,
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
      autoIndent: 'advanced',
    })
  })

  it('does not format minified form JSON when autoformat is disabled', async () => {
    const minified = JSON.stringify(loginForm)
    const onChange = vi.fn()

    const {findByTestId} = render(<UnconstrainedCodeEditor language="json" initialValue={minified} onChange={onChange} />)

    const editor = await findByTestId('autoformat-monaco')
    expect(editor.textContent).toBe(minified)
    expect(lastMonacoOptions?.formatOnPaste).toBeUndefined()
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
})
