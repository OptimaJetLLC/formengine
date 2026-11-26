import type {OnMount} from '@monaco-editor/react'
import {render, waitFor} from '@testing-library/react'
import type {editor} from 'monaco-editor'
import {useState} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {UnconstrainedCodeEditor} from '../../../packages/designer/src/features/components/CodeEditor/UnconstrainedCodeEditor'
import {isBrowserMode} from '../config/isBrowserMode'

const coldOpenMinified = '{"toolbar":["bold","italic"]}'
const coldOpenParsed = JSON.parse(coldOpenMinified) as unknown

type RealMonacoHarnessProps = {
  initialValue: string
  autoformat?: boolean
  onEditor?: (ed: editor.IStandaloneCodeEditor) => void
}

/**
 * Mirrors JsonView: mount with language json via an explicit model (Edit JSON path).
 */
const RealMonacoJsonHarness = ({initialValue, autoformat, onEditor}: RealMonacoHarnessProps) => {
  const [value] = useState(initialValue)
  const onChange = vi.fn()

  const handleMount: OnMount = (ed, monacoApi) => {
    const model = monacoApi.editor.createModel(value, 'json', monacoApi.Uri.parse('file:///autoformat-test.json'))
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
})
