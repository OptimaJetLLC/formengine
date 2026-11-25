import type {OnMount} from '@monaco-editor/react'
import {render, waitFor} from '@testing-library/react'
import {useEffect, useRef, useState} from 'react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {UnconstrainedCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/UnconstrainedCodeEditor'
import bookingForm from './forms/booking-form.json'
import designerForm from './forms/designer-form.json'
import loginForm from './forms/login-form.json'

type MonacoEditorProps = {
  className?: string
  defaultValue?: string
  options?: Record<string, unknown>
  onMount?: OnMount
}

let lastMonacoOptions: Record<string, unknown> | undefined

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

      const formatDocument = () => {
        try {
          const next = JSON.stringify(JSON.parse(valueRef.current), null, 2)
          valueRef.current = next
          setValue(next)
        } catch {
          // leave non-JSON buffers unchanged
        }
        contentListeners.forEach(listener => listener({isFlush: false}))
      }

      const editor = {
        getAction: (id: string) => (id === 'editor.action.formatDocument' ? {run: async () => formatDocument()} : null),
        onDidChangeModelContent: (listener: (event: {isFlush: boolean}) => void) => {
          contentListeners.push(listener)
          return {dispose: () => {}}
        },
        getValue: () => valueRef.current,
        setValue: (next: string) => {
          valueRef.current = next
          setValue(next)
          contentListeners.forEach(listener => listener({isFlush: true}))
        },
      }

      onMount?.(editor as never, {} as never)
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
})
