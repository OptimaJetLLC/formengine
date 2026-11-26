import type {OnMount} from '@monaco-editor/react'
import {render, waitFor} from '@testing-library/react'
import type {editor} from 'monaco-editor'
import {useRef, useState} from 'react'
import {userEvent} from 'vitest/browser'
import {describe, expect, it, vi} from 'vitest'
import {UnconstrainedCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/UnconstrainedCodeEditor'
import {isBrowserMode} from '../config/isBrowserMode'
import loginForm from './forms/login-form.json'

const coldOpenMinified = '{"toolbar":["bold","italic"]}'
const coldOpenParsed = JSON.parse(coldOpenMinified) as unknown
const loginMinified = JSON.stringify(loginForm)

type RealMonacoHarnessProps = {
  initialValue: string
  modelPath: string
  autoformat?: boolean
  onEditor?: (ed: editor.IStandaloneCodeEditor) => void
}

/**
 * Mirrors JsonView: mount with language json via an explicit model (Edit JSON path).
 */
const RealMonacoJsonHarness = ({initialValue, modelPath, autoformat, onEditor}: RealMonacoHarnessProps) => {
  const [value] = useState(initialValue)
  const onChange = vi.fn()
  const modelPathRef = useRef(modelPath)

  const handleMount: OnMount = (ed, monacoApi) => {
    const model = monacoApi.editor.createModel(value, 'json', monacoApi.Uri.parse(modelPathRef.current))
    ed.setModel(model)
    onEditor?.(ed)
  }

  return (
    <div style={{height: 320, width: 640}}>
      <UnconstrainedCodeEditor language="json" initialValue={value} onChange={onChange} autoformat={autoformat} onMount={handleMount} />
    </div>
  )
}

describe('Code editor autoformat with real Monaco', () => {
  it('formats minified JSON on cold open once the formatter is ready', async () => {
    if (!isBrowserMode()) return

    let monacoEditor: editor.IStandaloneCodeEditor | undefined

    render(
      <RealMonacoJsonHarness
        initialValue={coldOpenMinified}
        modelPath="file:///autoformat-cold-open.json"
        autoformat
        onEditor={ed => {
          monacoEditor = ed
        }}
      />
    )

    await waitFor(() => {
      expect(monacoEditor).toBeDefined()
      expect(monacoEditor!.getModel()?.getLanguageId()).toBe('json')
    })

    await waitFor(
      () => {
        const value = monacoEditor!.getValue()
        expect(value).toContain('\n')
        expect(JSON.parse(value)).toEqual(coldOpenParsed)
      },
      {timeout: 15_000}
    )
  })

  it('formats compact login-form JSON after a real clipboard paste', async () => {
    if (!isBrowserMode()) return

    let monacoEditor: editor.IStandaloneCodeEditor | undefined

    render(
      <RealMonacoJsonHarness
        initialValue='{"keep":"me"}'
        modelPath="file:///autoformat-paste.json"
        autoformat
        onEditor={ed => {
          monacoEditor = ed
        }}
      />
    )

    await waitFor(() => {
      expect(monacoEditor).toBeDefined()
      expect(monacoEditor!.getModel()?.getLanguageId()).toBe('json')
    })

    await waitFor(
      () => {
        expect(monacoEditor!.getValue()).toContain('\n')
      },
      {timeout: 15_000}
    )

    const editorDom = document.querySelector('.monaco-editor')
    expect(editorDom).toBeTruthy()
    await userEvent.click(editorDom!)
    monacoEditor!.focus()
    await navigator.clipboard.writeText(loginMinified)

    const model = monacoEditor!.getModel()
    expect(model).toBeTruthy()
    monacoEditor!.setSelection(model!.getFullModelRange())
    await userEvent.keyboard('{ControlOrMeta>}v{/ControlOrMeta}')

    await waitFor(
      () => {
        const value = monacoEditor!.getValue()
        expect(value).toContain('\n')
        expect(value.split('\n').length).toBeGreaterThan(1)
        expect(JSON.parse(value)).toEqual(loginForm)
      },
      {timeout: 15_000}
    )
  })
})
